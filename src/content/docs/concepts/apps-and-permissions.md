---
title: Apps & permissions
description: Every app runs sandboxed behind a capability ledger and can only touch what you explicitly allow.
---

Brainstorm is built entirely out of **apps**, and every app runs **sandboxed**. An app can't reach your data, your network, or another app on its own — it can only do what you've granted it through the **capability ledger**.

## The capability model

A capability is a specific, narrow permission: *read notes*, *write files*, *reach this one network host*, *show a notification*. Apps declare the capabilities they need; you grant or deny them.

Two principles make this trustworthy:

- **Nothing is ambient.** There is no "just let the app do anything." Every sensitive action maps to a capability that was granted for a reason.
- **It fails closed.** If a permission check can't be satisfied — or anything goes wrong evaluating it — the action is denied, never silently allowed.

Because access is explicit and revocable, it's safe to run third-party apps, and later autonomous AI agents, over even your most important data.

## Granting and revoking

When an app first needs a capability, Brainstorm asks. You can:

- **Grant** it, optionally scoped (for example, to a single kind of object).
- **Deny** it — the app keeps working, minus that ability.
- **Revoke** it later from the vault's permission settings.

Grants are recorded per vault, so an app you trust in your work vault has no standing in your personal vault.

## Isolation between apps

Apps are isolated from each other as well as from the system. One app can't read another app's private state or reach into its window. When apps do share data, it's through the common object layer you can see and control — not through back channels. See [Objects](/concepts/objects/).

## Agents are apps too

AI agents in Brainstorm sit behind the same ledger. An agent operates under a ceiling of capabilities you set; it can never grant itself more access than you've allowed. The permission model that keeps apps honest is the same one that governs automation.

## Next steps

- [Objects](/concepts/objects/) — the shared data apps read and write
- [Your data & security](/concepts/your-data-and-security/) — the guarantees underneath
