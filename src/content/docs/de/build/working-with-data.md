---
title: Mit Daten arbeiten
description: Objekte lesen und schreiben, kollaborative Dokumente synchronisieren, app-privaten Zustand speichern und über Intents mit anderen Apps integrieren.
sidebar:
  label: Mit Daten arbeiten
  order: 5
---

Die eigentliche Arbeit einer App sind Daten: [Objekte](/de/concepts/objects/) lesen und schreiben, die Dokumente dahinter synchronisieren, ein wenig privaten Zustand halten und Arbeit an andere Apps übergeben. Brainstorm gibt dir vier verschiedene Speicher, jeden für eine andere Aufgabe — den richtigen zu nutzen ist der Großteil dessen, Datenverarbeitung richtig zu machen.

| Nutzen | Für |
| --- | --- |
| **Entities** | Gemeinsame, typisierte, synchronisierte Objekte — der eigentliche Inhalt deiner App. |
| **Dokumente (Yjs)** | Der kollaborative Körper eines Objekts — Rich Text, strukturierte Felder, live bearbeitet. |
| **Storage** | App-privater Key/Value-Zustand und hochgeladene Dateien. |
| **Settings** | Geräte-lokaler UI-Zustand, der *nicht* synchronisieren soll (zuletzt geöffneter Tab, Panel-Breiten). |

## Objekte: der Entities-Dienst

Objekte sind typisierte Datensätze im Vault. Erstelle, lies, aktualisiere, lösche und frage sie über `services.entities` ab:

```ts
const bs = window.brainstorm;

// erstellen — gibt das neue Objekt zurück
const note = await bs.services.entities.create(
  "io.brainstorm.notes/Note/v1",
  { title: "Untitled", body: "", createdAt: Date.now(), updatedAt: Date.now() },
);

// lesen / aktualisieren / löschen per ID
const fetched = await bs.services.entities.get(note.id);
await bs.services.entities.update(note.id, { title: "Renamed" });
await bs.services.entities.delete(note.id);

// abfragen — nach Typ, Prädikat, Text, mit einem Limit
const recent = await bs.services.entities.query({
  type: "io.brainstorm.notes/Note/v1",
  limit: 50,
});
```

Jeder davon wird durch die passende [Fähigkeit](/de/build/capabilities/) gesteuert: `entities.read:<type>` zum Lesen, `entities.write:<type>` zum Erstellen, Aktualisieren oder Löschen.

Für alles, was eine Liste rendert, bevorzuge den **Live**-Hook gegenüber der einmaligen `query` — er abonniert, sodass die UI sich aktualisiert, wenn sich Objekte irgendwo ändern:

```tsx
import { useVaultEntities } from "@brainstorm/react-yjs";

const { entities } = useVaultEntities(window.brainstorm.services.vaultEntities);
const notes = entities.filter((e) => e.type === "io.brainstorm.notes/Note/v1");
```

## Dokumente: kollaborative Körper

Der *Körper* eines Objekts — Rich Text oder jedes Feld, das live bearbeitet und über Geräte und Mitwirkende synchronisiert wird — lebt in einem Yjs-Dokument. Lies und bearbeite ihn über `@brainstorm/react-yjs` statt über die Low-Level-Sync-Aufrufe:

```tsx
import { useYDoc, useYMap, useYText } from "@brainstorm/react-yjs";

const doc = useYDoc(noteId);          // das kollaborative Dokument des Objekts
const props = useYMap(doc, "properties");  // strukturierte Felder
const body = useYText(doc, "body");        // Rich-Text-Körper
```

Hier gemachte Bearbeitungen verschmelzen sauber mit Bearbeitungen von anderen Geräten und Nutzern — das ist die CRDT-Schicht bei der Arbeit. Du mutierst die geteilten Typen; die Änderungen breiten sich aus. (Die Laufzeit stellt für fortgeschrittene Fälle die tieferliegenden `entities.loadDoc` / `applyDoc` bereit, aber die meisten Apps rühren sie nie an.)

## App-privater Speicher

Für Zustand, der allein dir gehört — Caches, Entwürfe, App-Einstellungen, die mit dem Vault reisen *sollen* — nutze `services.storage`, gesteuert durch das standardmäßig erteilte `storage.kv`:

```ts
await bs.services.storage.put("draft:" + id, text);
const draft = await bs.services.storage.get("draft:" + id);
const keys = await bs.services.storage.list("draft:");
await bs.services.storage.delete("draft:" + id);
```

Um eine Datei in den inhaltsadressierten Speicher des Vaults zu bringen und eine URL zurückzubekommen:

```ts
const { url } = await bs.services.storage.uploadFile(name, bytes, mime);
```

## Geräte-spezifische Einstellungen

Zustand, der **nicht** synchronisieren soll — welcher Tab offen war, die Breite eines Panels auf diesem Bildschirm — kommt in `services.settings`, nicht in Storage:

```ts
await bs.services.settings.put("sidebar.width", 280);
const width = await bs.services.settings.get("sidebar.width");
```

Die Unterscheidung ist wichtig: Leg gerätelokalen Ansichtszustand in `settings`, und er streitet nicht über Rechner hinweg; leg echten Inhalt dorthin, und er folgt dem Nutzer nicht. Im Zweifel frag „sollte das auf meinem Laptop und meinem Handy gleich sein?" — ja bedeutet eine Entität oder Storage, nein bedeutet Settings.

## Dateien

Deine App sieht nie Dateisystempfade. Sie bittet den Nutzer, eine Datei (oder ein Speicherziel) zu wählen, bekommt ein undurchsichtiges Handle und liest oder schreibt darüber:

```ts
const handle = await bs.services.files.requestOpen({ mime: ["text/plain"] });
const bytes = await bs.services.files.read(handle);
// …
await bs.services.files.write(handle, newBytes);
```

Das Wählen erfordert eine Nutzergeste; das Schreiben erfordert `files.write`. Wenn deine App *als Opener* für eine Datei gestartet wird (über einen Manifest-[Opener](/de/build/the-manifest/#registrierungen--sich-in-die-shell-einklinken)), kommt die Datei in deinem `launch`-Kontext an.

## Mit anderen Apps sprechen

Apps spielen über **Intents** zusammen — strukturierte Anfragen, die nach Verb verschickt und von der App bearbeitet werden, die sich dafür registriert hat. Deine App verschickt, ohne den Handler zu kennen oder zu nennen:

```ts
await bs.services.intents.dispatch({
  verb: "open",
  payload: { entityId: someId },
  source: bs.app.id,
});
```

`open` zu verschicken ist standardmäßig erteilt; andere Verben werden durch `intents.dispatch:<verb>` gesteuert. Um Intents zu *empfangen*, registriere einen Handler in deinem [Manifest](/de/build/the-manifest/#registrierungen--sich-in-die-shell-einklinken) und höre zu:

```ts
bs.on("intent", (intent) => {
  if (intent.verb === "open") openObject(intent.payload.entityId);
});
```

So bleibt der ganze Arbeitsbereich verbunden: Eine Notiz verlinkt auf eine Aufgabe, ein Klick darauf verschickt `open`, und Aufgaben bearbeitet es — keine App codiert eine andere fest ein.

## Weiter

- [Rezepte & Anti-Patterns](/de/build/recipes/) — Muster zum Kopieren und Fehler zum Vermeiden.
- [SDK & Laufzeit](/de/build/the-sdk/) — die vollständige Dienstoberfläche und Komponentenbibliothek.
