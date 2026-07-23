---
title: Objets
description: Tout dans un coffre est un objet doté de propriétés typées, partagé entre toutes les applications plutôt qu'enfermé dans une seule.
---

Tout ce que vous créez dans Brainstorm est un **objet** : une note, une tâche, un contact, un fichier, un événement de calendrier. Les objets sont la substance commune d'un coffre — les applications ne sont que différentes manières de les regarder.

## Un objet, plusieurs vues

Un objet n'est pas prisonnier de l'application qui l'a créé. Une tâche que vous créez dans une base de données peut apparaître dans le calendrier, figurer comme nœud dans le graphe et être liée depuis une note — parce que toutes ces applications lisent et écrivent la **même** couche d'objets.

C'est précisément ce qui donne à Brainstorm une impression de cohésion plutôt que celle d'un dossier rempli d'outils déconnectés : il existe un espace partagé d'objets, et les applications sont des lentilles posées dessus.

## Propriétés typées

Les objets portent des **propriétés** — des champs typés comme texte, nombre, date, case à cocher, lien ou une valeur tirée d'un ensemble défini. Les propriétés sont définies au niveau du coffre, de sorte que le sens de « Statut » ou de « Date d'échéance » reste cohérent dans toutes les applications qui touchent un objet. Tout ce qui, dans un objet, n'est pas son contenu principal est une propriété, éditée via un véritable système de propriétés partagé plutôt que via des champs arbitraires propres à chaque application.

## Liens et relations

Les objets entretiennent des relations entre eux :

- **Mentions** — tapez `@` dans du texte enrichi pour créer un lien vers n'importe quel objet. Le lien est réel et bidirectionnel, si bien que vous pouvez voir tout ce qui référence un objet donné.
- **Collections** — regroupez des objets en ensembles typés (une liste de lecture, les tâches d'un projet) sans les copier.

L'application [Graph](/fr/apps/graph/) visualise ces relations directement.

## Bâti sur le Block Protocol

Sous le capot, les objets suivent le **Block Protocol** — un standard ouvert pour des données typées et interopérables. Cela garde votre contenu structuré et portable plutôt que lié à un format propriétaire, et c'est pourquoi les blocs et les données peuvent circuler proprement entre les applications.

## Étapes suivantes

- [Applications](/fr/apps/) — les lentilles avec lesquelles vous travaillez sur les objets
- [Local-first & synchronisation](/fr/concepts/local-first-and-sync/) — comment les objets restent cohérents entre les appareils
