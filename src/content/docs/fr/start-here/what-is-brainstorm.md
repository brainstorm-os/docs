---
title: Qu'est-ce que Brainstorm ?
description: Brainstorm est un système d'exploitation local-first et natif de l'IA pour le travail intellectuel — une coque de bureau qui héberge des applications en sandbox par-dessus vos propres données.
---

Brainstorm est un **système d'exploitation local-first et natif de l'IA pour le travail intellectuel**. Il a l'apparence et le comportement d'un OS de bureau — une coque qui héberge de petites applications ciblées — sauf que l'« ordinateur » est votre savoir, et tout tourne sur votre propre machine.

Trois idées le définissent :

## Des applications, pas des fonctionnalités

La coque elle-même ne fait presque rien. Elle héberge des **applications** : Notes, Base de données, Fichiers, Graph, un calendrier, un éditeur de code et plus encore. Vous ajoutez celles que vous voulez et ignorez le reste. Chaque application est en sandbox et se met à jour de son côté, si bien que le produit grandit sans devenir un unique monolithe tentaculaire.

## Vos données, votre disque

Votre savoir vit dans un **coffre** — un dossier de fichiers sur votre propre disque, pas une ligne dans la base de données de quelqu'un d'autre. Brainstorm est local-first : il fonctionne entièrement hors ligne, s'ouvre instantanément et ne requiert jamais un serveur pour lire ou écrire votre propre contenu. Lorsque vous choisissez de synchroniser entre appareils, le trafic est chiffré de bout en bout et le relais ne voit jamais vos données. Voir [Local-first & synchronisation](/fr/concepts/local-first-and-sync/).

## Des permissions que vous accordez

Chaque application et chaque agent d'IA s'exécute derrière un **registre de capacités**. Une application ne peut toucher que les données et services que vous avez explicitement autorisés — lire une note, enregistrer un fichier, atteindre le réseau. Rien n'est ambiant. C'est ce qui rend sûr le fait de faire tourner des applications tierces et des agents autonomes sur vos données les plus importantes. Voir [Applications & permissions](/fr/concepts/apps-and-permissions/).

## Bâti sur des fondations ouvertes

Brainstorm est construit sur des briques ouvertes plutôt que sur un format propriétaire :

- **Block Protocol** pour des données typées et interopérables.
- **Yjs** (CRDT) pour une collaboration en temps réel sans conflit et l'édition hors ligne.
- **Lexical** pour le texte enrichi.

Cela signifie que votre contenu est structuré, portable et non lié à un seul fournisseur.

:::note
Brainstorm est en bêta ouverte et en développement actif. Certaines fonctionnalités décrites dans cette documentation sont encore en cours de déploiement. [Téléchargez la bêta](https://getbrainstorm.online/fr/downloads) pour l'essayer dès aujourd'hui.
:::

## Étapes suivantes

- [Installer Brainstorm](/fr/start-here/install/)
- [Démarrage rapide](/fr/start-here/quickstart/) — créer un coffre et ouvrir votre première application
- [Concepts](/fr/concepts/vaults/) — le modèle derrière le produit
