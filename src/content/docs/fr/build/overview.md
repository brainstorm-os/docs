---
title: Développer sur Brainstorm
description: Brainstorm est entièrement constitué d'applications en sandbox au-dessus d'une couche d'objets partagée. Voici comment en construire une.
sidebar:
  label: Aperçu
  order: 0
---

Brainstorm est un shell de bureau qui héberge des **applications** — et rien d'autre. Notes, Base de données, Graphe, Calendrier, tout le produit est constitué d'applications qui s'exécutent au-dessus d'une [couche d'objets](/fr/concepts/objects/) partagée. Le même modèle vous est ouvert : une application que vous construisez est un pair des applications intégrées, avec le même accès aux données du coffre et la même place dans le lanceur.

Cette section est le hub développeur pour la construction de ces applications. Elle suppose que vous avez lu les [Concepts](/fr/concepts/vaults/) — en particulier [Applications et permissions](/fr/concepts/apps-and-permissions/) et [Objets](/fr/concepts/objects/) — car les garanties de la plateforme *sont* son API.

:::note
Brainstorm est en développement actif avant sa bêta publique. Le développement d'applications se fait aujourd'hui à l'intérieur de l'arborescence source du shell (voir [Votre première application](/fr/build/your-first-app/)). Un SDK publié de manière autonome et un pipeline de publication d'applications tierces figurent sur la feuille de route ; cette documentation décrit le modèle d'application et le SDK tels qu'ils existent aujourd'hui, et grandira avec ce pipeline.
:::

## Ce qu'est une application

Une application est une petite application web — HTML, JavaScript, CSS — qui s'exécute dans son propre renderer en sandbox. Elle est accompagnée d'un [manifeste](/fr/build/the-manifest/) qui déclare qui elle est, quels types de données elle possède et quelles [capacités](/fr/build/capabilities/) elle nécessite. Le shell l'installe, lui donne une fenêtre et arbitre chaque requête qu'elle adresse au système.

Trois propriétés définissent le modèle :

- **En sandbox.** Une application ne peut pas atteindre d'elle-même le système de fichiers, le réseau ou une autre application. Elle ne peut faire que ce que vous avez accordé via le registre de capacités. C'est la frontière de sécurité — c'est ce qui rend sûr le fait d'exécuter des applications tierces, et plus tard des agents autonomes, au-dessus de vos données les plus importantes.
- **Contrôlée par capacités.** Chaque action sensible correspond à une capacité nommée que l'application a déclarée et que vous avez approuvée. Rien n'est ambiant ; les vérifications échouent en position fermée. Voir [Capacités](/fr/build/capabilities/).
- **Au-dessus d'objets partagés.** Les applications ne possèdent pas de silos privés. Elles lisent et écrivent des [objets](/fr/concepts/objects/) typés dans le coffre, de sorte que la note que vous écrivez dans une application est le même objet qu'une autre application peut lier, afficher dans un calendrier ou placer sur un graphe.

## Ce avec quoi vous construisez

Chaque application Brainstorm est une **application React** construite sur une boîte à outils partagée :

- **`@brainstorm/sdk`** — la bibliothèque de composants et d'utilitaires : menus, popovers, icônes, pickers, UI de propriétés, recherche, rechercher-et-remplacer, formatage et le thème du chrome d'application. Consultez le [SDK et runtime](/fr/build/the-sdk/) avant d'écrire quoi que ce soit ; si une primitive existe, vous l'importez au lieu de la reconstruire.
- **`@brainstorm/react-yjs`** — la couche de réactivité. Les listes d'objets en direct et les documents collaboratifs passent par des hooks comme `useVaultEntities` et `useYDoc`. Vous ne construisez jamais vous-même une boucle de changement.
- **`window.brainstorm`** — le runtime que le shell injecte dans chaque application : votre identité, vos capacités accordées, votre contexte de lancement et les [espaces de noms de services](/fr/build/the-sdk/#le-runtime) (`entities`, `files`, `intents`, `storage`, `search`, …) que vous appelez pour travailler.

## La forme du travail

Une application typique se compose de quatre choses :

1. Un **[manifeste](/fr/build/the-manifest/)** déclarant l'application, les types d'objets qu'elle possède et les capacités qu'elle nécessite.
2. Une **UI React** montée dans la fenêtre de l'application, utilisant le [chrome d'en-tête](/fr/build/the-sdk/#chrome-de-lapplication) standard et les composants du SDK.
3. **[Accès aux données](/fr/build/working-with-data/)** — lire et écrire des entités, synchroniser du texte enrichi via Yjs, stocker un état app-privé.
4. **[Intégration](/fr/build/working-with-data/#parler-à-dautres-applications)** — s'enregistrer comme opener pour un type, envoyer des intents, contribuer des widgets, de sorte que votre application se compose avec le reste de l'espace de travail au lieu de rester isolée.

## Où aller ensuite

- **[Votre première application](/fr/build/your-first-app/)** — échafauder, exécuter et voir une application dans le shell.
- **[Le manifeste](/fr/build/the-manifest/)** — chaque champ, avec un exemple réel.
- **[Capacités](/fr/build/capabilities/)** — la grammaire des permissions et comment demander l'accès.
- **[SDK et runtime](/fr/build/the-sdk/)** — la boîte à outils et la surface `window.brainstorm`.
- **[Travailler avec les données](/fr/build/working-with-data/)** — entités, documents, stockage et intégration inter-applications.
- **[Recettes et anti-patterns](/fr/build/recipes/)** — les modèles à copier et les erreurs à éviter.
