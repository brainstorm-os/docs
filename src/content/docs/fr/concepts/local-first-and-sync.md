---
title: Local-first & synchronisation
description: "Brainstorm fonctionne hors ligne sur votre disque et se synchronise entre appareils, chiffré de bout en bout via un relais incapable de lire vos données."
---

Brainstorm est **local-first** : votre coffre est sur votre disque, l'application le lit et l'écrit directement, et rien de votre propre contenu ne nécessite un serveur. La synchronisation est une option que vous activez — pas une dépendance dont vous dépendez.

## Le local-first en pratique

- **Instantané.** Ouvrir un coffre et éditer des objets se fait à la vitesse du disque local — aucun aller-retour.
- **Hors ligne par défaut.** Tout fonctionne sans aucun réseau. Vous n'êtes jamais bloqué par un serveur en panne ou inaccessible.
- **Durable.** Vos données sont de simples fichiers qui vous appartiennent. Si vous cessiez d'utiliser Brainstorm demain, votre coffre serait toujours là, sur le disque.

## Édition sans conflit grâce aux CRDT

Brainstorm stocke le contenu modifiable sous forme de **CRDT** (via [Yjs](https://yjs.dev)). Un CRDT permet à deux appareils — ou deux personnes — d'éditer le même objet en même temps et de fusionner les résultats automatiquement, sans boîte de dialogue « quelle version l'emporte ? ». C'est ce qui fait fonctionner à la fois les éditions hors ligne et la collaboration en temps réel sans perdre de modifications.

## Une synchronisation qui ne peut pas lire vos données

Lorsque vous activez la synchronisation, Brainstorm connecte vos appareils via un **relais** — mais le relais est *aveugle* :

- Vos modifications sont **chiffrées de bout en bout** sur votre appareil avant d'être envoyées.
- Le relais ne fait que stocker et transmettre le trafic CRDT chiffré. Il ne détient jamais vos clés et ne peut pas lire votre contenu.
- Le serveur de synchronisation est **auto-hébergeable** si vous préférez faire tourner le vôtre.

Vous obtenez ainsi la synchronisation et la collaboration multi-appareils sans confier votre savoir à un tiers.

## Synchronisation sur votre réseau local

Deux appareils sur le même Wi-Fi peuvent aussi se synchroniser **directement, sans aucun serveur**. Activez-la sous **Paramètres → Synchronisation** : les appareils se découvrent sur le réseau local, s'apparient via une poignée de main liée à l'appareil, et échangent des modifications chiffrées de bout en bout, de pair à pair. C'est opt-in, et cela se combine avec le relais — utilisez l'un, l'autre, ou les deux.

## Les pièces jointes vous suivent

Les fichiers et images attachés à vos notes et entités voyagent avec votre coffre. Les vignettes sont toujours synchronisées, si bien que les aperçus apparaissent instantanément sur chaque appareil ; le fichier complet se télécharge dès que vous l'ouvrez — rien n'attend, et rien n'encombre votre disque.

## Restaurer un appareil

Comme l'historique chiffré réside sur le relais (ou votre propre serveur), configurer un nouvel appareil restaure votre coffre depuis la synchronisation — vous vous authentifiez, et vos objets se reconstruisent localement à partir du flux chiffré.

## Étapes suivantes

- [Partage & collaboration](/fr/concepts/sharing-and-collaboration) — travailler sur les mêmes objets avec d'autres personnes
- [Vos données & sécurité](/fr/concepts/your-data-and-security) — clés, identité et modèle de menace
- [Coffres](/fr/concepts/vaults) — la chose qui est synchronisée
