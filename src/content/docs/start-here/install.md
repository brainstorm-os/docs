---
title: Install
description: How to get Brainstorm running on macOS, Windows, and Linux.
---

Brainstorm is a desktop application for **macOS, Windows, and Linux**.

:::note[Beta]
Brainstorm is in open beta. Grab the build for your platform from the [downloads page](https://getbrainstorm.online/downloads) — every release is posted there.
:::

## System requirements

- **macOS** 12 (Monterey) or later — Apple Silicon and Intel.
- **Windows** 10 or later (64-bit).
- **Linux** — a recent 64-bit distribution (AppImage / `.deb`).
- ~400 MB of disk for the app, plus whatever your vaults hold.

## Installing

Download the build for your platform from [getbrainstorm.online/downloads](https://getbrainstorm.online/downloads), then:

1. **macOS** — open the `.dmg` and drag Brainstorm to Applications. On first launch, right-click → Open to clear Gatekeeper.
2. **Windows** — run the installer and follow the prompts.
3. **Linux** — mark the AppImage executable (`chmod +x`) and run it, or install the `.deb` with your package manager.

## First launch

On first launch Brainstorm asks you to **create a vault** — the on-disk home for your knowledge. Pick a folder, choose how to protect it (system keychain or a passphrase), and you're in. The full walkthrough is in the [Quickstart](/start-here/quickstart/).

## Updating

Apps inside Brainstorm update independently of the shell. The shell itself checks for updates on launch and applies them in the background; your vaults are never touched by an update.

## Next steps

- [Quickstart](/start-here/quickstart/) — your first vault and app
- [Vaults](/concepts/vaults/) — what a vault is and how it's protected
