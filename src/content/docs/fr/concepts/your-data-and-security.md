---
title: Vos données & sécurité
description: Comment Brainstorm protège votre coffre — chiffrement, une clé que vous seul détenez, une identité signée et une sandbox qui échoue en position fermée.
---

Le modèle de sécurité de Brainstorm existe pour que vous puissiez faire tourner des applications et des agents sur votre savoir le plus important sans donner à quoi que ce soit un accès ambiant.

## Une clé que vous seul détenez

Chaque coffre est protégé par une **clé maîtresse** qui ne quitte jamais votre machine en clair. Vous choisissez où elle est stockée :

- dans le **trousseau de votre système d'exploitation**, ou
- dérivée d'une **phrase secrète** que vous fournissez.

La clé n'est conservée en mémoire que tant que le coffre est ouvert et est effacée lorsque vous le fermez. Il n'existe aucun compte Brainstorm capable de déverrouiller votre coffre à votre place — et, de la même manière, personne d'autre ne le peut.

## Votre identité

Chaque coffre porte une **identité** cryptographique — une paire de clés qui signe les modifications que vous effectuez. Les collaborateurs peuvent vérifier qu'une modification provient réellement de vous, et votre clé de signature privée ne franchit jamais une frontière d'application ni ne quitte l'appareil.

## La sandbox et le registre

Les applications sont isolées les unes des autres et du système. Tout ce qu'une application peut faire de sensible passe par le [registre de capacités](/fr/concepts/apps-and-permissions/), qui **échoue en position fermée** : si une permission ne peut pas être confirmée, l'action est refusée. Il n'existe aucun chemin par lequel une application obtiendrait discrètement un accès que vous n'avez pas accordé.

## Chiffrement au repos et en transit

- **En transit :** lors de la synchronisation, le contenu est chiffré de bout en bout avant de quitter votre appareil ; le relais ne peut pas le lire. Voir [Local-first & synchronisation](/fr/concepts/local-first-and-sync/).
- **Au repos :** votre coffre est stocké localement sous votre contrôle, protégé par votre clé maîtresse.

## Ce que Brainstorm ne fait *pas*

- Il ne renvoie pas votre contenu vers ses serveurs. Il n'existe aucun serveur qui détient votre coffre.
- Il ne donne pas aux applications un accès général « par commodité ».
- Il n'enferme pas vos données dans un format propriétaire — votre savoir est structuré, portable et vous appartient.

## Étapes suivantes

- [Applications & permissions](/fr/concepts/apps-and-permissions/) — le modèle de capacités en détail
- [Coffres](/fr/concepts/vaults/) — comment un coffre est créé et protégé
