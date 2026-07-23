---
title: Votre première application
description: Générez une application Brainstorm, exécutez-la dans le shell et voyez une liste en direct de vos propres objets.
sidebar:
  label: Votre première application
  order: 1
---

Ce guide génère une application fonctionnelle, l'exécute dans le shell et montre comment elle rend une liste en direct d'objets de votre coffre. Cela prend environ dix minutes.

:::note
Les applications sont actuellement construites à l'intérieur de l'arborescence source du shell Brainstorm — au même endroit que les applications propriétaires (first-party). Un paquet SDK autonome et un flux de publication pour les tiers sont dans la feuille de route ; jusque-là, « construire une application » signifie travailler dans le dépôt du shell. Le modèle d'application et le SDK présentés ici sont stables et seront repris sans changement.
:::

## Générer le squelette

Depuis le dépôt du shell, le scaffold génère une application React complète et conforme :

```sh
bun run new-app field-notes "Field Notes"
```

Le premier argument est l'id de l'application (kebab-case) ; le second est le nom d'affichage. Vous obtenez :

```
apps/field-notes/
├── manifest.json        # la déclaration de l'application
├── package.json         # dépendances : @brainstorm/sdk, @brainstorm/react-yjs, react
├── tsconfig.json
├── vite.config.ts
├── icon.svg             # généré à partir des initiales de l'application
└── src/
    ├── index.html       # document d'entrée (fournit une Content-Security-Policy stricte)
    ├── main.tsx         # montage de la racine React
    ├── app.tsx          # votre composant racine — une liste d'objets en direct
    ├── runtime.ts       # accès typé à window.brainstorm
    └── styles.css       # styles de l'application, thématisés par le SDK
```

Le scaffold n'est délibérément pas une page vide — il monte une véritable liste `useVaultEntities` et le chrome de header standard, de sorte que vous partez d'une application conforme plutôt que d'ajouter les conventions après coup.

## Ce que le scaffold vous donne

**`manifest.json`** déclare l'application et le seul type d'objet qu'elle possède :

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

Voir [Le manifeste](/fr/build/the-manifest/) pour chaque champ et [Capacités](/fr/build/capabilities/) pour la signification de ces chaînes de capacité.

**`src/main.tsx`** monte React. Deux imports sont obligatoires et viennent en premier — la feuille de style du thème d'application (qui porte le chrome `.app-header` partagé et les tokens de thème) et l'hôte de menus :

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

**`src/app.tsx`** est votre UI. Le scaffold rend une liste en direct et réactive de votre propre type d'objet :

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

La liste est **en direct** : `useVaultEntities` s'abonne au coffre, de sorte que la liste se re-rend lorsqu'un objet de ce type est créé ou modifié — par votre application, une autre application ou un autre appareil. Vous n'écrivez jamais de boucle manuelle `onChange → setState` ; c'est [la règle de réactivité](/fr/build/recipes/#ne-construisez-pas-la-réactivité-à-la-main).

## Enregistrer et exécuter

Une nouvelle application est enregistrée auprès du shell afin que le seeder de dev l'installe au lancement (ajoutez-la à la liste des applications propriétaires, conformément au guide des contributeurs du dépôt). Ensuite :

```sh
bun run dev
```

Le shell reconstruit et réinstalle les applications propriétaires au démarrage, de sorte qu'un **redémarrage complet du shell** est ce qui déploie vos changements — recharger une fenêtre sert le build précédent. Vous verrez votre application dans le lanceur ; ouvrez-la et elle rend la liste (vide).

:::tip
Chaque application journalise `[app:<id>] build <sha>` dans sa propre console DevTools, et le shell journalise `[shell] launch … build <sha>`. Si vous pensez qu'un changement n'a pas pris, vérifiez que ces shas correspondent — un sha obsolète signifie que le shell n'a pas été redémarré.
:::

## Faites-lui faire quelque chose

Créez un objet de votre type depuis l'application, et regardez la liste se mettre à jour d'elle-même :

```tsx
const bs = getBrainstorm();
await bs.services.entities.create(APP_TYPE, {
  title: "First field note",
  createdAt: Date.now(),
  updatedAt: Date.now(),
});
```

Aucun rafraîchissement, aucun rechargement — la requête en direct déjà abonnée à ce type se re-rend. À partir d'ici :

- [Travailler avec les données](/fr/build/working-with-data/) — interroger, éditer, texte enrichi et stockage privé à l'application.
- [SDK & runtime](/fr/build/the-sdk/) — les composants et services à partir desquels vous construisez le reste de l'UI.
- [Recettes & anti-patterns](/fr/build/recipes/) — les conventions qui gardent une application cohérente avec la plateforme.
