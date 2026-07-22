---
title: Rezepte & Anti-Patterns
description: Die Muster, die eine App mit der Plattform konsistent halten, und die Fehler, die im Review abgelehnt werden.
sidebar:
  label: Rezepte & Anti-Patterns
  order: 6
---

Brainstorm-Apps teilen sich einen kleinen Satz an Konventionen. Ihnen zu folgen ist, was eine Drittanbieter-App nativ wirken lässt statt aufgesetzt — dasselbe Tastaturmodell, dasselbe Theming, dieselbe Barrierefreiheit, dieselbe Datendisziplin. Das sind die Muster zum Kopieren und die Fehler, die im Review auffallen.

## Muster zum Kopieren

### Listen aus einer Live-Abfrage rendern

Alles, was eine Liste von Objekten zeigt, sollte neu rendern, wenn sich diese Objekte ändern — irgendwo, auf jedem Gerät. Treibe es aus dem Live-Hook an:

```tsx
import { useVaultEntities } from "@brainstorm/react-yjs";

const { entities } = useVaultEntities(window.brainstorm.services.vaultEntities);
const items = entities.filter((e) => e.type === MY_TYPE);
```

### Fähigkeiten im Kontext anfordern

Fordere eine Fähigkeit in dem Moment an, in dem das Feature genutzt wird, mit einem Grund, den der Nutzer sehen wird — keine Wand aus Abfragen beim Start.

```ts
await bs.services.capabilities.request(
  "network.connect:wss://relay.example.com",
  "to sync your board with the team",
);
```

### Degradieren, wenn eine Erlaubnis fehlt

Eine verweigerte oder widerrufene Fähigkeit ist ein normaler Zustand. Fange sie ab und blende das Feature aus oder deaktiviere es, statt eine Exception zu werfen.

```ts
try {
  render(await bs.services.search.query(q));
} catch (err) {
  if (err.name === "CapabilityDenied") return showHint("Grant search to use this.");
  throw err;
}
```

### Öffne das SDK, bevor du baust

Brauchst du ein Menü, Popover, Picker, Icon, Datumsformatierer, eine Eigenschaftszelle oder einen Leerzustand? Es ist fast sicher in `@brainstorm/sdk`. Importiere es. Siehe [SDK & Laufzeit](/de/build/the-sdk/).

### Nutze den Standard-Header

Jede App nutzt das gemeinsame `.app-header`-Chrome mit `app-header__title` auf dem Titel und dem Überlauf-`⋯`-Menü zuletzt in `app-header__right`. Style den Header nicht um.

## Anti-Patterns zum Vermeiden

### Baue Reaktivität nicht selbst

Der mit Abstand häufigste Fehler. Das Änderungssignal selbst zu lesen, implementiert die Reaktivitätsschicht pro App neu und driftet.

```ts
// ✗ abgelehnt — App-eigene Änderungsschleife
service.onChange(() => setItems(service.list()));

// ✓ der eine Reaktivitäts-Stack
const { entities } = useVaultEntities(service);
```

Das wird im Shell-Repo erzwungen. Aller Live-Zustand fließt durch `@brainstorm/react-yjs`.

### Baue Menüs nicht von Hand

Ein `<div>`, ein natives `<select>` oder eine absolut positionierte Liste, die für ein Menü einspringt, verliert das gemeinsame Tastaturmodell, das Ankern, das Theming und die Barrierefreiheit.

```ts
// ✗ abgelehnt — selbstgebautes Menü-Chrome / natives select
// ✓ die gemeinsame Laufzeit
import { openObjectMenu } from "@brainstorm/sdk/object-menu";
import { SelectMenu } from "@brainstorm/sdk/select-menu";
```

### Fordere nicht standardmäßig breite Scopes an

`entities.read:*` bittet, den gesamten Vault des Nutzers zu lesen, und die Abfrage sagt das. Bitte um den engsten Scope, der die Aufgabe erledigt, z. B. `entities.read:io.brainstorm.tasks/Task/v1`. Breite Scopes werden stark abgefragt und kosten Vertrauen.

### Leg keinen Inhalt in geräte-spezifische Einstellungen

`settings` ist für gerätelokalen UI-Zustand (eine Panel-Breite, der offene Tab) — es synchronisiert nicht. Echter Inhalt kommt in Entities; app-privater Inhalt, der mit dem Vault reisen soll, kommt in `storage`. Diese zu verwechseln bedeutet Daten, die dem Nutzer still nicht folgen, oder Geräteeinstellungen, die über Rechner hinweg streiten. Siehe [Mit Daten arbeiten](/de/build/working-with-data/).

### Lass keine Strings ungewickelt

Jeder für den Nutzer sichtbare String läuft durch die Übersetzungsfunktion deiner App (`createT` aus `@brainstorm/sdk/i18n`); Plurale laufen durch den gemeinsamen `plural()`-Helfer, nie durch einen `count === 1 ?`-Zweig. Blanker JSX-Text wird abgelehnt.

### Greif nicht aus der Sandbox hinaus

Es gibt keinen stillschweigenden Zugriff auf Dateisystem, Netzwerk oder andere Apps. Wenn du dir einen Pfad oder einen direkten Aufruf einer anderen App wünschst, ist die Antwort eine Fähigkeit und ein Dienst: `files` für Dateien, `network` für das Netzwerk, `intents` für andere Apps.

## Weiter

- [Überblick](/de/build/overview/) — das Modell, aus dem diese Konventionen kommen.
- [Konzepte](/de/concepts/apps-and-permissions/) — das Sicherheits- und Objektmodell darunter.
