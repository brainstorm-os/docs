---
title: Vaults
description: A vault is the on-disk home for your knowledge — a folder of files you own, protected by a key only you hold.
---

A **vault** is where your knowledge lives. It's a folder on your own disk — not a row in someone else's database — and it's the unit Brainstorm opens, protects, and (optionally) syncs.

## What's in a vault

A vault holds everything for one body of work:

- **Your objects** — notes, database rows, files, tasks, and anything else your apps create.
- **The apps you've installed** into that vault and the **permissions** you've granted them.
- **Your identity** for that vault — a cryptographic key that signs your changes, so collaborators can verify who wrote what.

Different bodies of work can live in different vaults — for example, a personal vault and a work vault — each with its own apps, permissions, and sync settings.

## How a vault is protected

When you create a vault you choose how its key is stored:

- **System keychain** — the master key lives in your operating system's secure keychain and the vault unlocks when you log in.
- **Passphrase** — you supply a passphrase to derive the key. Without it, the vault can't be opened.

The master key never leaves your machine in plaintext and is held in memory only while the vault is open. See [Your data & security](/concepts/your-data-and-security/).

## Opening and closing

Only one vault is "active" at a time. Opening a vault loads its data and makes its apps available; closing it releases the key from memory. Switching vaults is instant and never mixes data between them — cross-vault isolation is a hard boundary.

## Next steps

- [Apps & permissions](/concepts/apps-and-permissions/) — how apps get scoped access to a vault
- [Local-first & sync](/concepts/local-first-and-sync/) — putting one vault on many devices
