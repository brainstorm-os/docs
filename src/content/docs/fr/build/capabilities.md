---
title: Capacités
description: Les applications déclarent les permissions étroites dont elles ont besoin ; le shell accorde, demande ou refuse. Rien n'est ambiant et les vérifications échouent en position fermée.
sidebar:
  label: Capacités
  order: 3
---

Une application Brainstorm démarre avec presque aucun pouvoir. Elle peut rendre sa propre fenêtre et lire et écrire son propre stockage — c'est tout. Tout le reste — lire d'autres types d'objets, atteindre le réseau, poster une notification, signer une charge utile — est une **capacité** nommée que l'application déclare et que l'utilisateur accorde. C'est le même modèle décrit dans [Applications et permissions](/fr/concepts/apps-and-permissions/), vu du côté du développeur.

Deux invariants façonnent la manière dont vous écrivez des applications :

- **Rien n'est ambiant.** Il n'existe pas de « laisse l'application tout faire ». Chaque action sensible correspond à une capacité accordée pour une raison.
- **Cela échoue en position fermée.** Si une vérification de capacité ne peut pas être satisfaite — ou si quelque chose tourne mal lors de son évaluation — l'action est refusée, jamais autorisée en silence.

## La grammaire

Une capacité est `<service>.<verb>` avec un `:<scope>` optionnel :

```
storage.kv                                    # propre magasin clé/valeur
entities.read:io.brainstorm.notes/Note/v1     # lire un type d'entité
entities.write:io.brainstorm.notes/Note/v1    # écrire un type d'entité
entities.read:*                               # lire TOUS les types d'entités (fortement demandé)
files.write                                   # écrire les handles de fichiers choisis par l'utilisateur
network.connect:wss://sync.example.com        # se connecter à un hôte
network.connect:*                             # réseau large (fortement demandé)
intents.dispatch:open                         # envoyer des intents open
notifications.post                            # poster une notification
```

Le scope est ce qui garde les permissions significatives. Demander `entities.read:io.brainstorm.tasks/Task/v1` est une requête sur laquelle un utilisateur peut raisonner ; demander `entities.read:*` revient à demander à lire l'intégralité de son coffre, et la demande le dit. **Demandez le scope le plus étroit qui fait le travail** — les scopes larges sont fortement demandés et érodent la confiance.

## Les déclarer

Listez les capacités dont votre application a besoin dans le manifeste. L'utilisateur les examine à l'installation :

```json
"capabilities": [
  "storage.kv",
  "entities.read:io.brainstorm.tasks/Task/v1",
  "entities.write:io.brainstorm.tasks/Task/v1",
  "notifications.post"
]
```

L'ensemble accordé est aussi disponible pour l'application à l'exécution :

```ts
const granted = window.brainstorm.capabilities;   // string[]
if (granted.includes("notifications.post")) {
  // sûr d'appeler le chemin de notification
}
```

## Demander à l'exécution

Les capacités dont vous n'avez pas besoin d'emblée sont mieux demandées lorsque la fonctionnalité est utilisée pour la première fois, avec une raison que l'utilisateur voit dans la demande :

```ts
await window.brainstorm.services.capabilities.request(
  "network.connect:wss://sync.example.com",
  "to sync your board with the team relay",
);
```

Une raison claire et précise fait la différence entre une autorisation et un refus. Demandez dans le contexte — au moment où l'utilisateur clique sur la chose qui en a besoin — pas au lancement.

## Le modèle d'octroi

Les capacités se répartissent en trois bandes :

- **Octroi par défaut** — accordées sans demande car elles ne portent aucun risque inter-applications ou système : `storage.kv` (votre propre espace de clés), l'envoi d'intents `open` et le rendu de votre propre fenêtre. Vous pouvez compter sur leur existence.
- **Octroi sur demande** — le cas courant : l'utilisateur est interrogé, à l'installation ou à la première utilisation, et peut accorder, refuser ou restreindre l'octroi. La plupart des `entities.*`, `files.*`, `network.*` et `notifications.post` vivent ici.
- **Jamais octroyé aux applications en sandbox** — capacités privilégiées, internes au shell, qu'une application tierce ne peut pas du tout détenir.

Les permissions sont enregistrées **par coffre**, de sorte qu'une application de confiance dans votre coffre professionnel n'a aucun droit dans votre coffre personnel. L'utilisateur peut révoquer toute permission à tout moment ; la révocation prend effet au prochain appel de service hôte.

## Se dégrader avec élégance en cas de refus

Parce que l'utilisateur peut refuser ou révoquer plus tard, **une capacité refusée est un état d'exécution normal, pas un plantage**. Les appels de service qui rencontrent une capacité manquante sont rejetés ; interceptez-les et dégradez :

```ts
try {
  const hits = await window.brainstorm.services.search.query("budget");
  render(hits);
} catch (err) {
  if (err.name === "CapabilityDenied") {
    showInlineHint("Grant search access to find across your vault.");
    return;
  }
  throw err;
}
```

Écoutez les changements pour que l'UI suive l'ensemble des permissions en direct :

```ts
window.brainstorm.on("capability-changed", (caps) => {
  // réactiver ou masquer les fonctionnalités à mesure que les permissions changent
});
```

Une application qui masque ou désactive ce qu'elle ne peut pas faire actuellement — plutôt que de lever une exception — est une application à laquelle les utilisateurs font assez confiance pour accorder *davantage*.

## Ensuite

- [SDK et runtime](/fr/build/the-sdk/) — les services que ces capacités contrôlent.
- [Travailler avec les données](/fr/build/working-with-data/) — les appels `entities`, `files` et `intents` en pratique.
