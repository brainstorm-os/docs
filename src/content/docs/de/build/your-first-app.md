---
title: Deine erste App
description: Scaffolde eine Brainstorm-App, führe sie in der Shell aus und sieh eine Live-Liste deiner eigenen Objekte.
sidebar:
  label: Deine erste App
  order: 1
---

Diese Anleitung scaffoldet eine funktionierende App, führt sie in der Shell aus und zeigt, wie sie eine Live-Liste von Objekten aus deinem Vault rendert. Sie dauert etwa zehn Minuten.

:::note
Apps werden derzeit innerhalb des Brainstorm-Shell-Quellbaums gebaut — am selben Ort, an dem die Erstanbieter-Apps leben. Ein eigenständiges SDK-Paket und ein Veröffentlichungsablauf für Drittanbieter stehen auf der Roadmap; bis dahin bedeutet „eine App bauen", im Shell-Repo zu arbeiten. Das hier gezeigte App-Modell und SDK sind stabil und werden unverändert weitergeführt.
:::

## Scaffolden

Aus dem Shell-Repo erzeugt das Scaffold eine vollständige, konforme React-App:

```sh
bun run new-app field-notes "Field Notes"
```

Das erste Argument ist die App-ID (kebab-case); das zweite ist der Anzeigename. Du bekommst:

```
apps/field-notes/
├── manifest.json        # die App-Deklaration
├── package.json         # Abhängigkeiten: @brainstorm/sdk, @brainstorm/react-yjs, react
├── tsconfig.json
├── vite.config.ts
├── icon.svg             # aus den Initialen der App generiert
└── src/
    ├── index.html       # Einstiegsdokument (liefert eine strikte Content-Security-Policy)
    ├── main.tsx         # React-Root-Mount
    ├── app.tsx          # deine Root-Komponente — eine Live-Objektliste
    ├── runtime.ts       # typsicherer Zugriff auf window.brainstorm
    └── styles.css       # App-Styles, vom SDK gethemt
```

Das Scaffold ist bewusst keine leere Seite — es mountet eine echte `useVaultEntities`-Liste und das Standard-Header-Chrome, sodass du von einer konformen App aus startest, statt die Konventionen später nachzurüsten.

## Was dir das Scaffold gibt

**`manifest.json`** deklariert die App und den einen Objekttyp, den sie besitzt:

```json
{
  "id": "io.brainstorm.field-notes",
  "name": "Field Notes",
  "version": "0.1.0",
  "sdk": "1",
  "entry": "dist/index.html",
  "icon": "icon.svg",
  "capabilities": [
    "storage.kv",
    "entities.read:*",
    "entities.write:io.brainstorm.field-notes/Item/v1"
  ],
  "registrations": {
    "entityTypes": [
      {
        "id": "io.brainstorm.field-notes/Item/v1",
        "schema": {
          "type": "object",
          "required": ["id", "title", "createdAt", "updatedAt"]
        }
      }
    ]
  }
}
```

Siehe [Das Manifest](/de/build/the-manifest/) für jedes Feld und [Fähigkeiten](/de/build/capabilities/) für die Bedeutung dieser Fähigkeits-Strings.

**`src/main.tsx`** mountet React. Zwei Importe sind Pflicht und kommen zuerst — das App-Theme-Stylesheet (das das gemeinsame `.app-header`-Chrome und die Theme-Tokens trägt) und der Menü-Host:

```tsx
import "@brainstorm/sdk/app-theme.css";
import { mountMenuHost } from "@brainstorm/sdk/menus";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FieldNotesApp } from "./app";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("field-notes: #root not found");
mountMenuHost();
createRoot(root).render(
  <StrictMode>
    <FieldNotesApp />
  </StrictMode>,
);
```

**`src/app.tsx`** ist deine UI. Das Scaffold rendert eine live, reaktive Liste deines eigenen Objekttyps:

```tsx
import { useVaultEntities } from "@brainstorm/react-yjs";
import { useMemo } from "react";
import { getBrainstorm } from "./runtime";

const APP_TYPE = "io.brainstorm.field-notes/Item/v1";

export function FieldNotesApp() {
  const service = getBrainstorm()?.services?.vaultEntities ?? null;
  const { entities } = useVaultEntities(service);
  const items = useMemo(
    () => entities.filter((e) => e.type === APP_TYPE),
    [entities],
  );

  return (
    <div className="app">
      <header className="app-header" data-testid="app-header">
        <div className="app-header__left">
          <h1 className="app-header__title">Field Notes</h1>
        </div>
        <div className="app-header__right" />
      </header>
      <main className="app-body">
        {items.length === 0 ? (
          <p>Nothing here yet.</p>
        ) : (
          <ul className="app-list">
            {items.map((item) => (
              <li key={item.id}>{String(item.properties.title ?? item.id)}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
```

Die Liste ist **live**: `useVaultEntities` abonniert den Vault, sodass die Liste neu rendert, wenn ein Objekt dieses Typs erstellt oder geändert wird — von deiner App, einer anderen App oder einem anderen Gerät. Du schreibst nie eine manuelle `onChange → setState`-Schleife; das ist [die Reaktivitätsregel](/de/build/recipes/#nutze-die-reaktivitätsschicht).

## Registrieren und ausführen

Eine neue App wird bei der Shell registriert, damit der Dev-Seeder sie beim Start installiert (füge sie zur Liste der Erstanbieter-Apps hinzu, gemäß dem Contributor-Leitfaden des Repos). Dann:

```sh
bun run dev
```

Die Shell baut Erstanbieter-Apps beim Booten neu und installiert sie neu, sodass ein **vollständiger Shell-Neustart** deine Änderungen ausliefert — ein Fenster neu zu laden liefert den vorigen Build. Du siehst deine App im Launcher; öffne sie, und sie rendert die (leere) Liste.

:::tip
Jede App protokolliert `[app:<id>] build <sha>` in ihrer eigenen DevTools-Konsole, und die Shell protokolliert `[shell] launch … build <sha>`. Wenn du glaubst, eine Änderung sei nicht angekommen, prüfe, ob diese Shas übereinstimmen — ein veralteter Sha bedeutet, dass die Shell nicht neu gestartet wurde.
:::

## Lass sie etwas tun

Erstelle aus der App ein Objekt deines Typs und beobachte, wie sich die Liste selbst aktualisiert:

```tsx
const bs = getBrainstorm();
await bs.services.entities.create(APP_TYPE, {
  title: "First field note",
  createdAt: Date.now(),
  updatedAt: Date.now(),
});
```

Kein Refresh, kein Neuladen — die Live-Abfrage, die diesen Typ bereits abonniert hat, rendert neu. Von hier aus:

- [Mit Daten arbeiten](/de/build/working-with-data/) — Abfragen, Bearbeiten, Rich Text und app-privater Speicher.
- [SDK & Laufzeit](/de/build/the-sdk/) — die Komponenten und Dienste, aus denen du den Rest der UI baust.
- [Rezepte & Anti-Patterns](/de/build/recipes/) — die Konventionen, die eine App mit der Plattform konsistent halten.
