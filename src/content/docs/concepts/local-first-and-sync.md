---
title: Local-first & sync
description: Brainstorm works fully offline on your own disk, and syncs across devices with end-to-end encryption through a relay that can't read your data.
---

Brainstorm is **local-first**: your vault is on your disk, the app reads and writes it directly, and nothing about your own content requires a server. Sync is an option you turn on — not a dependency you depend on.

## Local-first, in practice

- **Instant.** Opening a vault and editing objects is local disk speed — no round-trips.
- **Offline by default.** Everything works with no network at all. You're never blocked by a server being down or unreachable.
- **Durable.** Your data is plain files you own. If you stopped using Brainstorm tomorrow, your vault is still right there on disk.

## Conflict-free editing with CRDTs

Brainstorm stores editable content as **CRDTs** (via [Yjs](https://yjs.dev)). A CRDT lets two devices — or two people — edit the same object at the same time and merge the results automatically, with no "which version wins?" dialog. This is what makes offline edits and real-time collaboration both work without losing changes.

## Sync that can't read your data

When you enable sync, Brainstorm connects your devices through a **relay** — but the relay is *blind*:

- Your changes are **end-to-end encrypted** on your device before they're sent.
- The relay only stores and forwards encrypted CRDT traffic. It never holds your keys and cannot read your content.
- The sync server is **self-hostable** if you'd rather run your own.

So you get multi-device sync and collaboration without handing your knowledge to a third party.

## Restoring a device

Because the encrypted history lives on the relay (or your own server), setting up a new device restores your vault from sync — you authenticate, and your objects rebuild locally from the encrypted stream.

## Next steps

- [Your data & security](/concepts/your-data-and-security/) — keys, identity, and the threat model
- [Vaults](/concepts/vaults/) — the thing being synced
