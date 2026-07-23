---
title: Travailler avec les données
description: Lire et écrire des objets, synchroniser des documents collaboratifs, stocker un état privé à l'application et intégrer d'autres applications via les intents.
sidebar:
  label: Travailler avec les données
  order: 5
---

Le vrai travail d'une application, ce sont les données : lire et écrire des [objets](/fr/concepts/objects/), synchroniser les documents qui les sous-tendent, conserver un peu d'état privé et confier du travail à d'autres applications. Brainstorm vous donne quatre stockages distincts, chacun pour une tâche différente — utiliser le bon est l'essentiel d'une bonne gestion des données.

| Utilité | Pour |
| --- | --- |
| **Entities** | Objets partagés, typés, synchronisés — le vrai contenu de votre application. |
| **Documents (Yjs)** | Le corps collaboratif d'un objet — texte enrichi, champs structurés édités en direct. |
| **Storage** | État clé/valeur privé à l'application et fichiers envoyés. |
| **Settings** | État d'interface propre à l'appareil qui ne doit *pas* se synchroniser (dernier onglet ouvert, largeurs de panneaux). |

## Objets : le service entities

Les objets sont des enregistrements typés dans le coffre. Créez, lisez, mettez à jour, supprimez et interrogez-les via `services.entities` :

```ts
const bs = window.brainstorm;

// créer — renvoie le nouvel objet
const note = await bs.services.entities.create(
  "io.brainstorm.notes/Note/v1",
  { title: "Untitled", body: "", createdAt: Date.now(), updatedAt: Date.now() },
);

// lire / mettre à jour / supprimer par id
const fetched = await bs.services.entities.get(note.id);
await bs.services.entities.update(note.id, { title: "Renamed" });
await bs.services.entities.delete(note.id);

// interroger — par type, prédicat, texte, avec une limite
const recent = await bs.services.entities.query({
  type: "io.brainstorm.notes/Note/v1",
  limit: 50,
});
```

Chacun d'eux est soumis à la [capacité](/fr/build/capabilities/) correspondante : `entities.read:<type>` pour lire, `entities.write:<type>` pour créer, mettre à jour ou supprimer.

Pour tout ce qui rend une liste, préférez le hook **en direct** à la `query` ponctuelle — il s'abonne, de sorte que l'UI se met à jour lorsque des objets changent où que ce soit :

```tsx
import { useVaultEntities } from "@brainstorm/react-yjs";

const { entities } = useVaultEntities(window.brainstorm.services.vaultEntities);
const notes = entities.filter((e) => e.type === "io.brainstorm.notes/Note/v1");
```

## Documents : corps collaboratifs

Le *corps* d'un objet — texte enrichi, ou tout champ édité en direct et synchronisé entre appareils et collaborateurs — vit dans un document Yjs. Lisez-le et éditez-le via `@brainstorm/react-yjs` plutôt que via les appels de synchronisation de bas niveau :

```tsx
import { useYDoc, useYMap, useYText } from "@brainstorm/react-yjs";

const doc = useYDoc(noteId);          // le document collaboratif de l'objet
const props = useYMap(doc, "properties");  // champs structurés
const body = useYText(doc, "body");        // corps en texte enrichi
```

Les modifications faites ici fusionnent proprement avec les modifications d'autres appareils et utilisateurs — c'est la couche CRDT qui fait son travail. Vous mutez les types partagés ; les changements se propagent. (Le runtime expose les `entities.loadDoc` / `applyDoc` de plus bas niveau pour les cas avancés, mais la plupart des applications n'y touchent jamais.)

## Stockage privé à l'application

Pour un état qui n'appartient qu'à vous — caches, brouillons, préférences d'application qui *doivent* voyager avec le coffre — utilisez `services.storage`, soumis à la capacité `storage.kv` accordée par défaut :

```ts
await bs.services.storage.put("draft:" + id, text);
const draft = await bs.services.storage.get("draft:" + id);
const keys = await bs.services.storage.list("draft:");
await bs.services.storage.delete("draft:" + id);
```

Pour amener un fichier dans le stockage adressé par contenu du coffre et récupérer une URL :

```ts
const { url } = await bs.services.storage.uploadFile(name, bytes, mime);
```

## Paramètres propres à l'appareil

L'état qui ne doit **pas** se synchroniser — quel onglet était ouvert, la largeur d'un panneau sur cet écran — va dans `services.settings`, pas dans le stockage :

```ts
await bs.services.settings.put("sidebar.width", 280);
const width = await bs.services.settings.get("sidebar.width");
```

La distinction compte : mettez l'état de vue local à l'appareil dans `settings` et il ne se disputera pas entre les machines ; mettez-y du vrai contenu et il ne suivra pas l'utilisateur. En cas de doute, demandez-vous « cela doit-il être identique sur mon ordinateur portable et mon téléphone ? » — oui signifie une entité ou le stockage, non signifie les paramètres.

## Fichiers

Votre application ne voit jamais de chemins de système de fichiers. Elle demande à l'utilisateur de choisir un fichier (ou une cible d'enregistrement), reçoit un handle opaque, et lit ou écrit à travers lui :

```ts
const handle = await bs.services.files.requestOpen({ mime: ["text/plain"] });
const bytes = await bs.services.files.read(handle);
// …
await bs.services.files.write(handle, newBytes);
```

Choisir nécessite un geste de l'utilisateur ; écrire nécessite `files.write`. Lorsque votre application est lancée *comme opener* pour un fichier (via un [opener](/fr/build/the-manifest/#enregistrements--sinsérer-dans-le-shell) du manifeste), le fichier arrive dans votre contexte `launch`.

## Parler à d'autres applications

Les applications se composent via les **intents** — des requêtes structurées envoyées par verbe, traitées par l'application qui s'est enregistrée pour cela. Votre application envoie sans connaître ni nommer le handler :

```ts
await bs.services.intents.dispatch({
  verb: "open",
  payload: { entityId: someId },
  source: bs.app.id,
});
```

Envoyer `open` est accordé par défaut ; les autres verbes sont soumis à `intents.dispatch:<verb>`. Pour *recevoir* des intents, enregistrez un handler dans votre [manifeste](/fr/build/the-manifest/#enregistrements--sinsérer-dans-le-shell) et écoutez :

```ts
bs.on("intent", (intent) => {
  if (intent.verb === "open") openObject(intent.payload.entityId);
});
```

C'est ainsi que tout l'espace de travail reste connecté : une note renvoie à une tâche, un clic dessus envoie `open`, et Tasks la traite — aucune application n'en code une autre en dur.

## Suivant

- [Recettes & anti-patterns](/fr/build/recipes/) — des motifs à copier et des erreurs à éviter.
- [SDK & runtime](/fr/build/the-sdk/) — la surface complète des services et la bibliothèque de composants.
