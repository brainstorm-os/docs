---
title: SDK & runtime
description: La bibliothèque de composants partagée à partir de laquelle vous construisez des applications, et le runtime window.brainstorm que le shell injecte pour arbitrer chaque appel système.
sidebar:
  label: SDK & runtime
  order: 4
---

Vous construisez une application Brainstorm à partir de deux choses : le **SDK** (`@brainstorm/sdk` et `@brainstorm/react-yjs`), une bibliothèque partagée de composants, de hooks et d'utilitaires ; et le **runtime** (`window.brainstorm`), l'objet que le shell injecte dans chaque application pour arbitrer les appels système.

La règle qui régit les deux : **vérifiez le SDK avant d'écrire quoi que ce soit.** Si un menu, un popover, un sélecteur (picker), une icône, un formateur ou un hook de données existe, vous l'importez. Une copie faite à la main s'écarte du modèle clavier partagé, du theming et de l'accessibilité — et est rejetée en revue. Trop en construire soi-même est l'erreur la plus fréquente des nouvelles applications.

## Le runtime

`window.brainstorm` est disponible dès que votre application se charge. Il porte l'identité, le contexte et les espaces de noms de services :

```ts
window.brainstorm.app            // { id, version, sdkVersion }
window.brainstorm.capabilities   // string[] des capacités accordées
window.brainstorm.launch         // pourquoi l'application s'est ouverte (reason, entityId?, file?, …)
window.brainstorm.locale         // étiquette BCP-47
window.brainstorm.services.*     // les services hôtes que vous appelez pour travailler
window.brainstorm.on(event, fn)  // cycle de vie : ready, intent, capability-changed, suspend, resume, close
```

Chaque appel `services.*` est empaqueté dans une enveloppe IPC structurée, vérifié par rapport aux [capacités](/fr/build/capabilities/) qui vous sont accordées, et transmis à un service du shell. Un appel pour lequel la capacité vous manque est rejeté — elle n'est jamais accordée silencieusement.

### Espaces de noms de services

Les services qu'une application appelle le plus :

| Service | Ce qu'il fait |
| --- | --- |
| `entities` | Créer, lire, mettre à jour, supprimer et interroger des [objets](/fr/concepts/objects/) ; charger et synchroniser leurs documents. |
| `vaultEntities` | Un instantané en direct des objets du coffre — la source derrière le hook `useVaultEntities`. |
| `files` | Choisir, lire, écrire et surveiller les fichiers que l'utilisateur sélectionne (pas de chemins de système de fichiers bruts). |
| `storage` | Le stockage clé/valeur privé de votre application, plus l'envoi de fichiers adressé par contenu. |
| `settings` | État d'interface propre à l'appareil — **non** synchronisé entre les appareils. |
| `intents` | Envoyer des requêtes structurées à d'autres applications (`open`, `compose`, `share`, …). |
| `search` | Recherche plein texte à l'échelle du coffre (en lecture seule). |
| `properties` | Les définitions de propriétés pour les types d'entités. |
| `ui` | Notifications et boîtes de dialogue système d'ouverture/d'enregistrement. |
| `identity` | L'utilisateur local, et la signature (soumise aux capacités). |
| `capabilities` | Vérifier et demander des capacités à l'exécution. |
| `theme` | Réagir aux changements de thème ; prévisualiser un thème. |

D'autres existent pour des applications plus riches — `blocks` et `bp` (Block Protocol), `network`, `dashboard`, `selection`, `dnd`, `sharing`, `ai`, `automations`, `webView`. Voir [Travailler avec les données](/fr/build/working-with-data/) pour ceux que vous utiliserez en premier.

## Réactivité : ne codez jamais une boucle de changement à la main

Les objets Brainstorm sont en direct — ils changent depuis d'autres applications et d'autres appareils. L'état réactif circule par **une seule** pile, `@brainstorm/react-yjs` :

```tsx
import { useVaultEntities, useYDoc, useYMap, useYText } from "@brainstorm/react-yjs";

// une liste en direct d'objets du coffre
const { entities } = useVaultEntities(window.brainstorm.services.vaultEntities);

// un document collaboratif (texte enrichi, corps structuré)
const doc = useYDoc(entityId);
const props = useYMap(doc, "properties");
const body = useYText(doc, "body");
```

N'écrivez **pas** `vaultEntities.onChange → list() → setState`. Cela réimplémente la couche de réactivité pour chaque application — précisément la dérive que cette pile existe pour empêcher. Lisez l'état en direct via les hooks et laissez React le rendre. C'est imposé dans le dépôt du shell ; voir [les anti-patterns](/fr/build/recipes/#ne-construisez-pas-la-réactivité-à-la-main).

## La bibliothèque de composants

`@brainstorm/sdk` exporte via des sous-chemins. Un échantillon de ce qui s'y trouve — lisez le catalogue avant de construire l'un d'eux vous-même :

```ts
import "@brainstorm/sdk/app-theme.css";          // tokens de thème + chrome .app-header (importer en premier)
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

Il y a bien plus — calendriers et formateurs de dates, cellules et panneaux de propriétés, glisser-déposer, listes virtuelles, sélecteurs de couverture et d'icône, export, historique de navigation. Le principe tient : **si cela existe dans le SDK, importez-le.**

### Menus et listes déroulantes

Chaque menu, liste déroulante, menu contextuel et popup « choisir un parmi N » passe par le runtime de menus partagé. Montez-le une fois (`mountMenuHost()` dans votre point d'entrée) et ouvrez les menus via les ouvreurs partagés (`openObjectMenu`, `openAnchoredMenu`, `openContextMenu`). Les choix énumérés utilisent `@brainstorm/sdk/select-menu`, pas un `<select>` natif. Un `<div>` fait à la main qui remplace un menu est rejeté — il perd le modèle clavier partagé, l'ancrage et l'accessibilité.

## Chrome de l'application

La feuille de style du thème d'application possède le header. Placez ce squelette dans chaque application et ne redéclarez pas son CSS :

```tsx
<div className="app">
  <header className="app-header">
    <div className="app-header__left">
      <h1 className="app-header__title">My App</h1>
    </div>
    <div className="app-header__right">
      {/* actions de contenu et bascules de panneau d'abord ; le menu objet ⋯ EN DERNIER */}
    </div>
  </header>
  <main className="app-body">{/* votre UI */}</main>
</div>
```

Le header est une barre de verre à hauteur fixe avec un padding correct selon la plateforme (feux tricolores macOS, contrôles Windows) appliqué pour vous. Placez `app-header__title` sur votre élément de titre — ne construisez pas votre propre habillage de titre. Le menu de débordement `⋯`, quand vous en avez un, est toujours le **dernier** élément dans `app-header__right`.

## Internationalisation

Chaque chaîne visible par l'utilisateur est enveloppée dans un appel de traduction. Les applications utilisent le `createT` léger de `@brainstorm/sdk/i18n` (qui fait uniquement l'interpolation `{name}` — pas d'ICU). Pour les pluriels, utilisez l'utilitaire partagé `plural(t, count, "key.one", "key.other")` plutôt qu'une branche `count === 1 ?` dans le code du composant. Ajoutez de nouveaux identifiants de chaîne au catalogue de votre application ; ne mettez jamais de texte brut dans le JSX.

## Suivant

- [Travailler avec les données](/fr/build/working-with-data/) — les API `entities`, `storage`, `intents` et de documents en pratique.
- [Recettes & anti-patterns](/fr/build/recipes/) — les conventions qui gardent une application cohérente avec la plateforme.
