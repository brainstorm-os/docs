---
title: Recettes et anti-patterns
description: Les modèles qui gardent une application cohérente avec la plateforme, et les erreurs qui sont rejetées en revue.
sidebar:
  label: Recettes et anti-patterns
  order: 6
---

Les applications Brainstorm partagent un petit ensemble de conventions. Les suivre est ce qui fait qu'une application tierce paraît native plutôt que rapportée — même modèle de clavier, même theming, même accessibilité, même discipline de données. Voici les modèles à copier et les erreurs qui sont repérées en revue.

## Modèles à copier

### Rendre des listes depuis une requête en direct

Tout ce qui affiche une liste d'objets devrait se rendre à nouveau lorsque ces objets changent — n'importe où, sur n'importe quel appareil. Pilotez-le depuis le hook en direct :

```tsx
import { useVaultEntities } from "@brainstorm/react-yjs";

const { entities } = useVaultEntities(window.brainstorm.services.vaultEntities);
const items = entities.filter((e) => e.type === MY_TYPE);
```

### Demander des capacités dans le contexte

Demandez une capacité au moment où la fonctionnalité est utilisée, avec une raison que l'utilisateur verra — pas un mur de demandes au lancement.

```ts
await bs.services.capabilities.request(
  "network.connect:wss://relay.example.com",
  "to sync your board with the team",
);
```

### Se dégrader quand une permission manque

Une capacité refusée ou révoquée est un état normal. Interceptez-la et masquez ou désactivez la fonctionnalité plutôt que de lever une exception.

```ts
try {
  render(await bs.services.search.query(q));
} catch (err) {
  if (err.name === "CapabilityDenied") return showHint("Grant search to use this.");
  throw err;
}
```

### Ouvrir le SDK avant de construire

Besoin d'un menu, d'un popover, d'un picker, d'une icône, d'un formateur de dates, d'une cellule de propriété ou d'un état vide ? C'est presque certainement dans `@brainstorm/sdk`. Importez-le. Voir [SDK et runtime](/fr/build/the-sdk/).

### Utiliser l'en-tête standard

Chaque application utilise le chrome partagé `.app-header` avec `app-header__title` sur le titre et le menu de débordement `⋯` en dernier dans `app-header__right`. Ne restylez pas l'en-tête.

## Anti-patterns à éviter

### Ne construisez pas la réactivité à la main

L'erreur de loin la plus courante. Lire soi-même le signal de changement réimplémente la couche de réactivité par application et dérive.

```ts
// ✗ rejeté — boucle de changement par application
service.onChange(() => setItems(service.list()));

// ✓ le seul stack de réactivité
const { entities } = useVaultEntities(service);
```

C'est imposé dans le dépôt du shell. Tout l'état en direct passe par `@brainstorm/react-yjs`.

### Ne construisez pas de menus à la main

Un `<div>`, un `<select>` natif ou une liste positionnée en absolu qui remplace un menu perd le modèle de clavier partagé, l'ancrage, le theming et l'accessibilité.

```ts
// ✗ rejeté — chrome de menu maison / select natif
// ✓ le runtime partagé
import { openObjectMenu } from "@brainstorm/sdk/object-menu";
import { SelectMenu } from "@brainstorm/sdk/select-menu";
```

### Ne demandez pas de scopes larges par défaut

`entities.read:*` demande à lire l'intégralité du coffre de l'utilisateur, et la demande le dit. Demandez le scope le plus étroit qui fait le travail, p. ex. `entities.read:io.brainstorm.tasks/Task/v1`. Les scopes larges sont fortement demandés et coûtent de la confiance.

### Ne mettez pas de contenu dans les réglages par appareil

`settings` est destiné à l'état d'UI local à l'appareil (une largeur de panneau, l'onglet ouvert) — il ne se synchronise pas. Le vrai contenu va dans les entités ; le contenu app-privé qui doit voyager avec le coffre va dans `storage`. Les confondre signifie des données qui ne suivront pas l'utilisateur en silence, ou des préférences d'appareil qui se disputent d'une machine à l'autre. Voir [Travailler avec les données](/fr/build/working-with-data/).

### Ne laissez pas de chaînes non enveloppées

Chaque chaîne visible par l'utilisateur passe par la fonction de traduction de votre application (`createT` de `@brainstorm/sdk/i18n`) ; les pluriels passent par l'utilitaire partagé `plural()`, jamais par une branche `count === 1 ?`. Le texte JSX brut est rejeté.

### Ne sortez pas de la sandbox

Il n'y a aucun accès ambiant au système de fichiers, au réseau ou aux autres applications. Si vous vous surprenez à vouloir un chemin ou un appel direct à une autre application, la réponse est une capacité et un service : `files` pour les fichiers, `network` pour le réseau, `intents` pour les autres applications.

## Ensuite

- [Aperçu](/fr/build/overview/) — le modèle d'où viennent ces conventions.
- [Concepts](/fr/concepts/apps-and-permissions/) — le modèle de sécurité et d'objets sous-jacent.
