---
title: Partage & collaboration
description: Partagez un objet ou une collection entière avec d'autres personnes — chiffré de bout en bout, avec des invitations à usage unique, de vrais rôles et une révocation qui prend réellement effet.
---

Brainstorm vous permet de partager des objets individuels — une note, un tableau, un canal de chat, une collection entière — avec d'autres personnes, sans qu'un serveur ne voie jamais le contenu. La collaboration repose sur la même [synchronisation chiffrée de bout en bout](/fr/concepts/local-first-and-sync/) que vos propres appareils : le relais stocke et transmet du texte chiffré, et les clés ne circulent qu'entre les personnes que vous avez invitées.

## Comment fonctionne le partage

Vous partagez depuis l'objet lui-même : ouvrez sa boîte de dialogue de partage et invitez la personne. Sous le capot, chaque objet partagé est chiffré avec sa propre clé, et cette clé n'est remise qu'aux personnes présentes sur l'objet — le relais ne peut pas lire ce qu'il relaie.

Les modifications fusionnent sans conflit grâce aux [CRDT](/fr/concepts/local-first-and-sync/#édition-sans-conflit-grâce-aux-crdt), si bien que deux personnes peuvent travailler dans la même note ou sur le même tableau blanc en même temps. Les applications avec des surfaces en direct affichent la présence — curseurs distants sur le [Tableau blanc](/fr/apps/whiteboard/), curseurs partagés et commentaires de plage dans [Notes](/fr/apps/notes/).

## Les invitations sont à usage unique

Un code d'invitation ouvre exactement une chose, une fois, et il expire. Il n'existe pas de lien permanent qui pourrait fuiter et continuer de fonctionner — si une invitation est interceptée après avoir été utilisée, elle ne vaut plus rien.

## Rôles

Chaque personne sur un objet partagé a un rôle :

- **Propriétaire** — la personne qui l'a partagé ; gère les membres et les rôles.
- **Éditeur** — peut modifier l'objet.
- **Lecteur** — peut le lire, et seulement le lire. Le rôle Lecteur est appliqué de bout en bout, pas seulement masqué dans l'interface.

## Des personnes, pas des clés

Chaque personne sur un objet partagé apparaît **par son nom**, avec son empreinte de clé à côté. Les noms voyagent avec l'objet lui-même, si bien qu'il n'existe aucun annuaire d'utilisateurs nulle part et que le relais n'apprend rien de nouveau. Parce qu'un nom n'est que ce que quelqu'un choisit de s'appeler, c'est l'empreinte qui distingue deux personnes — vérifiez-la par un autre canal pour tout ce qui est sensible.

Chaque modification est signée par l'[identité de coffre](/fr/concepts/your-data-and-security/#votre-identité) de son auteur, si bien que les collaborateurs peuvent vérifier qu'une modification provient réellement de vous.

## Révoquer l'accès

Retirer quelqu'un prend effet immédiatement : son invitation ne peut pas être réutilisée, et la clé de l'objet est renouvelée pour que ce qu'il détenait n'ouvre plus les nouvelles modifications.

## Étapes suivantes

- [Local-first & synchronisation](/fr/concepts/local-first-and-sync/) — le transport sur lequel repose la collaboration
- [Vos données & sécurité](/fr/concepts/your-data-and-security/) — identité, clés et modèle de menace
