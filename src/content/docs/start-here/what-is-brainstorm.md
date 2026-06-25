---
title: What is Brainstorm?
description: Brainstorm is a local-first, AI-native operating system for knowledge work — a desktop shell that hosts sandboxed apps over your own data.
---

Brainstorm is a **local-first, AI-native operating system for knowledge work**. It looks and behaves like a desktop OS — a shell that hosts small, focused apps — except the "computer" is your knowledge, and everything runs on your own machine.

Three ideas define it:

## Apps, not features

The shell itself does almost nothing. It hosts **apps**: Notes, Database, Files, Graph, a calendar, a code editor, and more. You add the ones you want and ignore the rest. Each app is sandboxed and updates on its own, so the product grows without turning into a single sprawling monolith.

## Your data, your disk

Your knowledge lives in a **vault** — a folder of files on your own disk, not a row in someone else's database. Brainstorm is local-first: it works fully offline, opens instantly, and never requires a server to read or write your own content. When you choose to sync across devices, traffic is end-to-end encrypted and the relay never sees your data. See [Local-first & sync](/concepts/local-first-and-sync/).

## Permissions you grant

Every app and every AI agent runs behind a **capability ledger**. An app can only touch the data and services you have explicitly allowed — reading a note, saving a file, reaching the network. Nothing is ambient. This is what makes it safe to run third-party apps and autonomous agents over your most important data. See [Apps & permissions](/concepts/apps-and-permissions/).

## Built on open foundations

Brainstorm is built on open building blocks rather than a proprietary format:

- **Block Protocol** for interoperable, typed data.
- **Yjs** (CRDTs) for conflict-free, real-time collaboration and offline editing.
- **Lexical** for rich text.

That means your content is structured, portable, and not locked to one vendor.

:::note
Brainstorm is in active development ahead of its public beta. Some features described in these docs are still rolling out. [Join the waitlist](https://getbrainstorm.online) to get early access.
:::

## Next steps

- [Install Brainstorm](/start-here/install/)
- [Quickstart](/start-here/quickstart/) — create a vault and open your first app
- [Concepts](/concepts/vaults/) — the model behind the product
