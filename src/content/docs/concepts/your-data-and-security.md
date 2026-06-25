---
title: Your data & security
description: How Brainstorm protects your vault — encryption, a key only you hold, a signed identity, and a sandbox that fails closed.
---

Brainstorm's security model exists so you can run apps and agents over your most important knowledge without giving anything ambient access to it.

## A key only you hold

Each vault is protected by a **master key** that never leaves your machine in plaintext. You choose where it's stored:

- in your **operating system keychain**, or
- derived from a **passphrase** you supply.

The key is held in memory only while the vault is open and is wiped when you close it. There's no Brainstorm account that can unlock your vault for you — and equally, no one else can.

## Your identity

Each vault carries a cryptographic **identity** — a keypair that signs the changes you make. Collaborators can verify that an edit genuinely came from you, and your private signing key never crosses an app boundary or leaves the device.

## The sandbox and the ledger

Apps are sandboxed and isolated from each other and the system. Everything sensitive an app can do is mediated by the [capability ledger](/concepts/apps-and-permissions/), which **fails closed**: if a permission can't be confirmed, the action is denied. There's no path by which an app quietly gains access you didn't grant.

## Encryption at rest and in transit

- **In transit:** when you sync, content is end-to-end encrypted before leaving your device; the relay can't read it. See [Local-first & sync](/concepts/local-first-and-sync/).
- **At rest:** your vault is stored locally under your control, protected by your master key.

## What Brainstorm does *not* do

- It does not phone your content home. There is no server that holds your vault.
- It does not give apps blanket access "to be convenient."
- It does not lock your data in a proprietary format — your knowledge is structured, portable, and yours.

## Next steps

- [Apps & permissions](/concepts/apps-and-permissions/) — the capability model in detail
- [Vaults](/concepts/vaults/) — how a vault is created and protected
