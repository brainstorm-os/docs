---
title: Applications & permissions
description: Chaque application s'exécute en sandbox derrière un registre de capacités et ne peut toucher que ce que vous autorisez explicitement.
---

Brainstorm est entièrement bâti à partir d'**applications**, et chaque application s'exécute **en sandbox**. Une application ne peut pas, d'elle-même, atteindre vos données, votre réseau ou une autre application — elle ne peut faire que ce que vous lui avez accordé via le **registre de capacités**.

## Le modèle de capacités

Une capacité est une permission précise et étroite : *lire des notes*, *écrire des fichiers*, *joindre cet unique hôte réseau*, *afficher une notification*. Les applications déclarent les capacités dont elles ont besoin ; vous les accordez ou les refusez.

Deux principes rendent cela digne de confiance :

- **Rien n'est ambiant.** Il n'existe pas de « laisse simplement l'application tout faire ». Chaque action sensible correspond à une capacité accordée pour une raison.
- **Ça échoue en position fermée.** Si une vérification de permission ne peut pas être satisfaite — ou si quoi que ce soit se passe mal lors de son évaluation — l'action est refusée, jamais autorisée en silence.

Parce que l'accès est explicite et révocable, il est sûr de faire tourner des applications tierces, et plus tard des agents d'IA autonomes, même sur vos données les plus importantes.

## Accorder et révoquer

Lorsqu'une application a besoin d'une capacité pour la première fois, Brainstorm demande. Vous pouvez :

- L'**accorder**, éventuellement délimitée (par exemple à un seul type d'objet).
- La **refuser** — l'application continue de fonctionner, sans cette capacité.
- La **révoquer** ultérieurement depuis les paramètres de permissions du coffre.

Les autorisations sont enregistrées par coffre, de sorte qu'une application en laquelle vous avez confiance dans votre coffre professionnel n'a aucun droit dans votre coffre personnel.

## Isolation entre applications

Les applications sont isolées les unes des autres tout comme du système. Une application ne peut pas lire l'état privé d'une autre application ni s'introduire dans sa fenêtre. Lorsque des applications partagent des données, cela se fait via la couche d'objets commune que vous pouvez voir et contrôler — pas par des canaux détournés. Voir [Objets](/fr/concepts/objects/).

## Les agents sont aussi des applications

Les agents d'IA dans Brainstorm se placent derrière le même registre. Un agent opère sous un plafond de capacités que vous fixez ; il ne peut jamais s'octroyer plus d'accès que ce que vous avez autorisé. Le modèle de permissions qui garde les applications honnêtes est le même que celui qui régit l'automatisation.

## Étapes suivantes

- [Objets](/fr/concepts/objects/) — les données partagées que les applications lisent et écrivent
- [Vos données & sécurité](/fr/concepts/your-data-and-security/) — les garanties sous-jacentes
