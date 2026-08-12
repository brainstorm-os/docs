---
title: Sharing & collaboration
description: Share an object or a whole collection with other people — end-to-end encrypted, with single-use invites, real roles, and revocation that actually takes effect.
---

Brainstorm lets you share individual objects — a note, a board, a chat channel, a whole collection — with other people, without a server ever seeing the content. Collaboration rides on the same [end-to-end encrypted sync](/concepts/local-first-and-sync) as your own devices: the relay stores and forwards ciphertext, and the keys move only between the people you invited.

## How sharing works

You share from the object itself: open its share dialog, and invite the person. Under the hood each shared object is encrypted with its own key, and that key is handed only to the people on the object — the relay can't read what it relays.

Edits merge conflict-free through [CRDTs](/concepts/local-first-and-sync#conflict-free-editing-with-crdts), so two people can work in the same note or on the same whiteboard at the same time. Apps with live surfaces show presence — remote cursors on the [Whiteboard](/apps/whiteboard), shared cursors and range comments in [Notes](/apps/notes).

## Invites are single use

An invite code opens exactly one thing, once, and it expires. There's no standing link that can leak and keep working — if an invite is intercepted after it's been used, it's worthless.

## Roles

Each person on a shared object has a role:

- **Owner** — the person who shared it; manages members and roles.
- **Editor** — can change the object.
- **Viewer** — can read it, and only read it. Viewer is enforced end-to-end, not just hidden in the UI.

## People, not keys

Everyone on a shared object appears **by name**, with their key fingerprint beside it. Names travel with the object itself, so there is no user directory anywhere and the relay learns nothing new. Because a name is only what someone calls themselves, the fingerprint is what tells two people apart — check it out-of-band for anything sensitive.

Every change is signed by its author's [vault identity](/concepts/your-data-and-security#your-identity), so collaborators can verify an edit genuinely came from you.

## Revoking access

Removing someone takes effect immediately: their invite can't be reused, and the object's key is rotated so what they held no longer opens new changes.

## Next steps

- [Local-first & sync](/concepts/local-first-and-sync) — the transport collaboration rides on
- [Your data & security](/concepts/your-data-and-security) — identity, keys, and the threat model
