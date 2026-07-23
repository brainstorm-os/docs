---
title: Le manifeste
description: Chaque application livre un manifeste qui déclare son identité, les types d'objets qu'elle possède, les capacités qu'elle nécessite et la manière dont elle s'enregistre auprès du shell.
sidebar:
  label: Le manifeste
  order: 2
---

Chaque application livre un `manifest.json`. C'est le contrat de l'application avec le shell : qui est l'application, quels types d'objets elle possède, quelles [capacités](/fr/build/capabilities/) elle nécessite et comment elle s'insère dans le reste du système (comme opener pour un type, comme widget sur le tableau de bord, comme handler pour un intent). Le shell le lit à l'installation puis à chaque lancement.

## Un manifeste réel

Voici l'application **Notes** — l'application de référence propriétaire — abrégée pour la lisibilité :

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

## Champs d'identité

| Champ | Requis | Ce que c'est |
| --- | --- | --- |
| `id` | oui | ID reverse-DNS globalement unique, p. ex. `io.brainstorm.notes`. Utilisé partout où l'application est référencée. |
| `name` | oui | Nom d'affichage montré dans le lanceur et la fenêtre. |
| `version` | oui | La version semver propre à l'application. |
| `sdk` | oui | La version de l'API SDK que l'application cible (une chaîne, p. ex. `"1"`). |
| `entry` | oui | Chemin vers le document HTML d'entrée, relatif à la racine de l'application — typiquement `dist/index.html`. |
| `description` | non | Description d'une ligne pour le lanceur et les listes. |
| `icon` | non | Chemin vers l'icône de l'application (SVG), relatif à la racine de l'application. |

## Types d'objets que vous possédez

Les ID de types d'entités suivent `<appId>/<Type>/<version>`, p. ex. `io.brainstorm.notes/Note/v1`. Déclarer un type sous `registrations.entityTypes` indique au coffre que ce type existe et lui donne un JSON Schema :

```json
"entityTypes": [
  {
    "id": "io.brainstorm.notes/Note/v1",
    "schemaUrl": "https://brainstorm.io/schemas/notes/note/v1.json",
    "schema": { "type": "object", "required": ["id"], "properties": { } }
  }
]
```

Le `schema` valide les propriétés de l'objet. Le suffixe de version (`/v1`) est la manière dont vous faites évoluer un type sans casser les objets déjà présents dans les coffres — un futur `/v2` est un type distinct avec son propre schéma. Une application lit et écrit ses propres types via `entities.write:<appId>/<Type>/<version>` ; lire des types qu'elle ne possède *pas* nécessite la permission `entities.read` correspondante.

## Enregistrements — s'insérer dans le shell

Tout ce qui se trouve sous `registrations` est optionnel. Chaque bloc est la manière dont votre application se compose avec l'espace de travail au lieu de rester isolée.

- **`openers`** — déclare votre application comme un moyen d'ouvrir quelque chose. `kind: "primary"` fait de votre application l'application par défaut pour un type d'entité ; `kind: "secondary"` vous enregistre comme alternative, et `mime` vous permet d'ouvrir des fichiers d'un type MIME. C'est ainsi qu'un double-clic sur une note est acheminé vers Notes.
- **`intents`** — enregistre votre application comme handler pour un [verbe](/fr/build/working-with-data/#parler-à-dautres-applications) sur un type (`open`, `compose`, `share`, …) avec une `priority`. D'autres applications envoient ces intents sans savoir que votre application existe.
- **`widgets`** — widgets de tableau de bord que votre application contribue, chacun avec un `id`, un `name` et une `size` (`small`, `medium` ou `large`). Nécessite la capacité `widgets.publish`.
- **`blocks`** — contributions Block-Protocol que votre application fournit (p. ex. un bloc de tâche en ligne), liées aux types d'entités qu'elles rendent. Nécessite `blocks.provide:<blockId>`.

Parmi les autres sections du manifeste que vous rencontrerez à mesure que l'application grandit figurent `shortcuts` (raccourcis clavier déclarés), `menus` (éléments de menu contribués), `layouts` (comment votre type se rend dans un contexte donné) et `i18n` (la locale source et les traductions). Ajoutez-les lorsque des fonctionnalités en ont besoin — une application minimale ne déclare que `entityTypes` et les capacités qu'elle utilise.

## Ensuite

- [Capacités](/fr/build/capabilities/) — ce que chaque chaîne du tableau `capabilities` accorde, et comment demander davantage à l'exécution.
- [Travailler avec les données](/fr/build/working-with-data/) — lire et écrire les types d'objets que vous avez déclarés ici.
