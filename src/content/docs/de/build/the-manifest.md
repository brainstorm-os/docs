---
title: Das Manifest
description: Jede App liefert ein Manifest, das ihre Identität, die Objekttypen, die sie besitzt, die Fähigkeiten, die sie braucht, und ihre Registrierung bei der Shell deklariert.
sidebar:
  label: Das Manifest
  order: 2
---

Jede App liefert eine `manifest.json`. Es ist der Vertrag der App mit der Shell: wer die App ist, welche Objekttypen sie besitzt, welche [Fähigkeiten](/de/build/capabilities/) sie braucht und wie sie sich in den Rest des Systems einklinkt (als Opener für einen Typ, als Widget auf dem Dashboard, als Handler für einen Intent). Die Shell liest es bei der Installation und erneut bei jedem Start.

## Ein echtes Manifest

Das ist die **Notizen**-App — die Erstanbieter-Referenz-App — für die Lesbarkeit gekürzt:

```json
{
  "id": "io.brainstorm.notes",
  "name": "Notes",
  "version": "0.1.0",
  "sdk": "1",
  "description": "Plain-text notes — the reference app demonstrating the full stack.",
  "icon": "icon.svg",
  "entry": "dist/index.html",
  "capabilities": [
    "storage.kv",
    "properties.read",
    "properties.write",
    "entities.read:io.brainstorm.notes/Note/v1",
    "entities.write:io.brainstorm.notes/Note/v1",
    "intents.dispatch:open",
    "files.write",
    "sharing.share"
  ],
  "registrations": {
    "entityTypes": [
      {
        "id": "io.brainstorm.notes/Note/v1",
        "schema": {
          "type": "object",
          "required": ["id", "title", "body", "createdAt", "updatedAt"],
          "properties": {
            "id": { "type": "string" },
            "title": { "type": "string" },
            "body": { "type": "string" },
            "createdAt": { "type": "number" },
            "updatedAt": { "type": "number" }
          }
        }
      }
    ],
    "openers": [
      { "kind": "primary", "entityType": "io.brainstorm.notes/Note/v1" },
      { "kind": "secondary", "mime": "text/plain" },
      { "kind": "secondary", "mime": "text/markdown" }
    ],
    "intents": [
      { "verb": "open", "entityType": "io.brainstorm.notes/Note/v1", "priority": "primary" },
      { "verb": "compose", "entityType": "io.brainstorm.notes/Note/v1", "priority": "primary" }
    ],
    "widgets": [
      { "id": "recent-notes", "name": "Recent Notes", "size": "medium" }
    ]
  }
}
```

## Identitätsfelder

| Feld | Erforderlich | Was es ist |
| --- | --- | --- |
| `id` | ja | Global eindeutige Reverse-DNS-ID, z. B. `io.brainstorm.notes`. Wird überall verwendet, wo die App referenziert wird. |
| `name` | ja | Anzeigename, der im Launcher und im Fenster gezeigt wird. |
| `version` | ja | Die eigene Semver-Version der App. |
| `sdk` | ja | Die SDK-API-Version, auf die die App zielt (ein String, z. B. `"1"`). |
| `entry` | ja | Pfad zum HTML-Einstiegsdokument, relativ zum App-Root — typischerweise `dist/index.html`. |
| `description` | nein | Einzeilige Beschreibung für Launcher und Listen. |
| `icon` | nein | Pfad zum App-Icon (SVG), relativ zum App-Root. |

## Objekttypen, die du besitzt

Entitätstyp-IDs folgen `<appId>/<Type>/<version>`, z. B. `io.brainstorm.notes/Note/v1`. Einen Typ unter `registrations.entityTypes` zu deklarieren, teilt dem Vault mit, dass dieser Typ existiert, und gibt ihm ein JSON-Schema:

```json
"entityTypes": [
  {
    "id": "io.brainstorm.notes/Note/v1",
    "schemaUrl": "https://brainstorm.io/schemas/notes/note/v1.json",
    "schema": { "type": "object", "required": ["id"], "properties": { } }
  }
]
```

Das `schema` validiert die Eigenschaften des Objekts. Das Versionssuffix (`/v1`) ist, wie du einen Typ weiterentwickelst, ohne Objekte zu brechen, die bereits in Vaults liegen — ein zukünftiges `/v2` ist ein eigener Typ mit eigenem Schema. Eine App liest und schreibt ihre eigenen Typen über `entities.write:<appId>/<Type>/<version>`; Typen zu lesen, die sie *nicht* besitzt, braucht die passende `entities.read`-Erlaubnis.

## Registrierungen — sich in die Shell einklinken

Alles unter `registrations` ist optional. Jeder Block ist, wie deine App mit dem Arbeitsbereich zusammenspielt, statt allein zu stehen.

- **`openers`** — deklariert deine App als eine Möglichkeit, etwas zu öffnen. `kind: "primary"` macht deine App zum Standard für einen Entitätstyp; `kind: "secondary"` registriert dich als Alternative, und `mime` lässt dich Dateien eines MIME-Typs öffnen. So leitet ein Doppelklick auf eine Notiz zu Notizen.
- **`intents`** — registriert deine App als Handler für ein [Verb](/de/build/working-with-data/#mit-anderen-apps-sprechen) auf einem Typ (`open`, `compose`, `share`, …) mit einer `priority`. Andere Apps verschicken diese Intents, ohne zu wissen, dass deine App existiert.
- **`widgets`** — Dashboard-Widgets, die deine App beisteuert, jedes mit einer `id`, einem `name` und einer `size` (`small`, `medium` oder `large`). Erfordert die Fähigkeit `widgets.publish`.
- **`blocks`** — Block-Protocol-Beiträge, die deine App bereitstellt (z. B. ein Inline-Aufgaben-Block), gebunden an die Entitätstypen, die sie rendern. Erfordert `blocks.provide:<blockId>`.

Weitere Manifest-Abschnitte, denen du begegnest, wenn die App wächst, sind `shortcuts` (deklarierte Tastenkürzel), `menus` (beigesteuerte Menüpunkte), `layouts` (wie dein Typ in einem gegebenen Kontext rendert) und `i18n` (die Quell-Locale und Übersetzungen). Füge diese hinzu, wenn Features sie brauchen — eine minimale App deklariert nur `entityTypes` und die Fähigkeiten, die sie nutzt.

## Weiter

- [Fähigkeiten](/de/build/capabilities/) — was jeder String im `capabilities`-Array gewährt und wie man zur Laufzeit um mehr bittet.
- [Mit Daten arbeiten](/de/build/working-with-data/) — die hier deklarierten Objekttypen lesen und schreiben.
