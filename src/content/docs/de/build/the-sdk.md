---
title: SDK & Laufzeit
description: Die gemeinsame Komponentenbibliothek, aus der du Apps baust, und die window.brainstorm-Laufzeit, die die Shell injiziert, um jeden Systemaufruf zu vermitteln.
sidebar:
  label: SDK & Laufzeit
  order: 4
---

Du baust eine Brainstorm-App aus zwei Dingen: dem **SDK** (`@brainstorm/sdk` und `@brainstorm/react-yjs`), einer gemeinsamen Bibliothek von Komponenten, Hooks und Helfern; und der **Laufzeit** (`window.brainstorm`), dem Objekt, das die Shell in jede App injiziert, um Systemaufrufe zu vermitteln.

Die Regel, die beide bestimmt: **Prüfe das SDK, bevor du irgendetwas schreibst.** Wenn ein Menü, Popover, Picker, Icon, Formatierer oder Daten-Hook existiert, importierst du ihn. Eine selbstgebaute Kopie driftet vom gemeinsamen Tastaturmodell, Theming und der Barrierefreiheit ab — und wird im Review abgelehnt. Zu viel selbst zu bauen ist der häufigste Fehler bei neuen Apps.

## Die Laufzeit

`window.brainstorm` ist verfügbar, sobald deine App lädt. Sie trägt Identität, Kontext und die Service-Namensräume:

```ts
window.brainstorm.app            // { id, version, sdkVersion }
window.brainstorm.capabilities   // string[] der erteilten Fähigkeiten
window.brainstorm.launch         // warum die App geöffnet wurde (reason, entityId?, file?, …)
window.brainstorm.locale         // BCP-47-Tag
window.brainstorm.services.*     // die Host-Dienste, die du aufrufst, um zu arbeiten
window.brainstorm.on(event, fn)  // Lebenszyklus: ready, intent, capability-changed, suspend, resume, close
```

Jeder `services.*`-Aufruf wird in einen strukturierten IPC-Umschlag verpackt, gegen deine erteilten [Fähigkeiten](/de/build/capabilities/) geprüft und an einen Shell-Dienst weitergeleitet. Ein Aufruf, für den dir die Fähigkeit fehlt, wird abgelehnt — er wird nie stillschweigend erteilt.

### Service-Namensräume

Die Dienste, die eine App am häufigsten aufruft:

| Dienst | Was er tut |
| --- | --- |
| `entities` | [Objekte](/de/concepts/objects/) erstellen, lesen, aktualisieren, löschen und abfragen; ihre Dokumente laden und synchronisieren. |
| `vaultEntities` | Ein Live-Schnappschuss der Vault-Objekte — die Quelle hinter dem `useVaultEntities`-Hook. |
| `files` | Dateien wählen, lesen, schreiben und beobachten, die der Nutzer aussucht (keine rohen Dateisystempfade). |
| `storage` | Der private Key/Value-Speicher deiner App, plus inhaltsadressierter Datei-Upload. |
| `settings` | Geräte-lokaler UI-Zustand — **nicht** über Geräte synchronisiert. |
| `intents` | Strukturierte Anfragen an andere Apps verschicken (`open`, `compose`, `share`, …). |
| `search` | Vault-weite Volltextsuche (nur lesend). |
| `properties` | Die Eigenschaftsdefinitionen für Entitätstypen. |
| `ui` | Benachrichtigungen und System-Öffnen/Speichern-Dialoge. |
| `identity` | Der lokale Nutzer und das Signieren (fähigkeitsgesteuert). |
| `capabilities` | Fähigkeiten zur Laufzeit prüfen und anfordern. |
| `theme` | Auf Theme-Änderungen reagieren; ein Theme in der Vorschau anzeigen. |

Weitere existieren für reichhaltigere Apps — `blocks` und `bp` (Block Protocol), `network`, `dashboard`, `selection`, `dnd`, `sharing`, `ai`, `automations`, `webView`. Siehe [Mit Daten arbeiten](/de/build/working-with-data/) für die, die du zuerst nutzen wirst.

## Reaktivität: baue nie selbst eine Änderungsschleife

Brainstorm-Objekte sind live — sie ändern sich von anderen Apps und anderen Geräten. Reaktiver Zustand fließt durch **einen** Stack, `@brainstorm/react-yjs`:

```tsx
import { useVaultEntities, useYDoc, useYMap, useYText } from "@brainstorm/react-yjs";

// eine Live-Liste von Vault-Objekten
const { entities } = useVaultEntities(window.brainstorm.services.vaultEntities);

// ein kollaboratives Dokument (Rich Text, strukturierter Körper)
const doc = useYDoc(entityId);
const props = useYMap(doc, "properties");
const body = useYText(doc, "body");
```

Schreibe **nicht** `vaultEntities.onChange → list() → setState`. Das implementiert die Reaktivitätsschicht pro App neu — genau die Drift, die dieser Stack verhindern soll. Lies den Live-Zustand über die Hooks und lass React ihn rendern. Das wird im Shell-Repo erzwungen; siehe [die Anti-Patterns](/de/build/recipes/#baue-reaktivität-nicht-selbst).

## Die Komponentenbibliothek

`@brainstorm/sdk` exportiert über Subpfade. Eine Auswahl dessen, was da ist — lies den Katalog, bevor du irgendetwas davon selbst baust:

```ts
import "@brainstorm/sdk/app-theme.css";          // Theme-Tokens + .app-header-Chrome (zuerst importieren)
import { mountMenuHost } from "@brainstorm/sdk/menus";
import { Icon } from "@brainstorm/sdk/icon";
import { Popover } from "@brainstorm/sdk/popover";
import { SelectMenu } from "@brainstorm/sdk/select-menu";
import { Searchbar } from "@brainstorm/sdk/searchbar";
import { EmptyState } from "@brainstorm/sdk/empty-state";
import { Checkbox } from "@brainstorm/sdk/checkbox";
import { useShortcut } from "@brainstorm/sdk/shortcut";
import { createT } from "@brainstorm/sdk/i18n";
import { openObjectMenu } from "@brainstorm/sdk/object-menu";
import { createFindController } from "@brainstorm/sdk/find-replace";
```

Es gibt viel mehr — Kalender und Datumsformatierer, Eigenschaftszellen und -panels, Drag-and-Drop, virtuelle Listen, Cover- und Icon-Picker, Export, Navigationshistorie. Das Prinzip gilt: **Wenn es im SDK existiert, importiere es.**

### Menüs und Dropdowns

Jedes Menü, Dropdown, Kontextmenü und „Wähle eins von N"-Popup läuft über die gemeinsame Menü-Laufzeit. Mounte sie einmal (`mountMenuHost()` in deinem Einstieg) und öffne Menüs über die gemeinsamen Opener (`openObjectMenu`, `openAnchoredMenu`, `openContextMenu`). Aufgezählte Auswahlen nutzen `@brainstorm/sdk/select-menu`, kein natives `<select>`. Ein selbstgebautes `<div>`, das für ein Menü einspringt, wird abgelehnt — es verliert das gemeinsame Tastaturmodell, das Ankern und die Barrierefreiheit.

## App-Chrome

Das App-Theme-Stylesheet besitzt den Header. Setze dieses Gerüst in jede App und deklariere sein CSS nicht neu:

```tsx
<div className="app">
  <header className="app-header">
    <div className="app-header__left">
      <h1 className="app-header__title">My App</h1>
    </div>
    <div className="app-header__right">
      {/* Inhaltsaktionen und Panel-Umschalter zuerst; das Objekt-⋯-Menü ZULETZT */}
    </div>
  </header>
  <main className="app-body">{/* deine UI */}</main>
</div>
```

Der Header ist eine Glasleiste mit fester Höhe und plattformkorrektem Padding (macOS-Ampeln, Windows-Steuerelemente), das für dich angewendet wird. Setze `app-header__title` auf dein Titelelement — bau kein eigenes Titelgesicht. Das Überlauf-`⋯`-Menü ist, wenn du eines hast, immer das **letzte** Element in `app-header__right`.

## Internationalisierung

Jeder für den Nutzer sichtbare String wird in einen Übersetzungsaufruf gewickelt. Apps nutzen das leichtgewichtige `createT` aus `@brainstorm/sdk/i18n` (das nur `{name}`-Interpolation macht — kein ICU). Für Plurale nutze den gemeinsamen `plural(t, count, "key.one", "key.other")`-Helfer statt eines `count === 1 ?`-Zweigs im Komponentencode. Füge neue String-IDs zum Katalog deiner App hinzu; setze nie blanken Text in JSX.

## Weiter

- [Mit Daten arbeiten](/de/build/working-with-data/) — die `entities`-, `storage`-, `intents`- und Dokument-APIs in der Praxis.
- [Rezepte & Anti-Patterns](/de/build/recipes/) — die Konventionen, die eine App mit der Plattform konsistent halten.
