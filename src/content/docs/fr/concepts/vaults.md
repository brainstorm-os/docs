---
title: Coffres
description: Un coffre est le foyer sur disque de votre savoir — un dossier de fichiers qui vous appartient, protégé par une clé que vous seul détenez.
---

Un **coffre** est l'endroit où vit votre savoir. C'est un dossier sur votre propre disque — pas une ligne dans la base de données de quelqu'un d'autre — et c'est l'unité que Brainstorm ouvre, protège et (facultativement) synchronise.

## Ce que contient un coffre

Un coffre contient tout ce qui relève d'un domaine de travail :

- **Vos objets** — notes, lignes de base de données, fichiers, tâches et tout ce que vos applications créent.
- **Les applications que vous avez installées** dans ce coffre et les **permissions** que vous leur avez accordées.
- **Votre identité** pour ce coffre — une clé cryptographique qui signe vos modifications, afin que les collaborateurs puissent vérifier qui a écrit quoi.

Différents domaines de travail peuvent vivre dans différents coffres — par exemple un coffre personnel et un coffre professionnel — chacun avec ses propres applications, permissions et paramètres de synchronisation.

## Comment un coffre est protégé

Lorsque vous créez un coffre, vous choisissez comment sa clé est stockée :

- **Trousseau du système** — la clé maîtresse réside dans le trousseau sécurisé de votre système d'exploitation et le coffre se déverrouille lorsque vous vous connectez.
- **Phrase secrète** — vous fournissez une phrase secrète pour dériver la clé. Sans elle, le coffre ne peut pas être ouvert.

La clé maîtresse ne quitte jamais votre machine en clair et n'est conservée en mémoire que tant que le coffre est ouvert. Voir [Vos données & sécurité](/fr/concepts/your-data-and-security/).

## Ouvrir et fermer

Un seul coffre est « actif » à la fois. Ouvrir un coffre charge ses données et rend ses applications disponibles ; le fermer libère la clé de la mémoire. Basculer d'un coffre à l'autre est instantané et ne mélange jamais les données entre eux — l'isolation entre coffres est une frontière stricte.

## Étapes suivantes

- [Applications & permissions](/fr/concepts/apps-and-permissions/) — comment les applications obtiennent un accès délimité à un coffre
- [Local-first & synchronisation](/fr/concepts/local-first-and-sync/) — placer un même coffre sur plusieurs appareils
