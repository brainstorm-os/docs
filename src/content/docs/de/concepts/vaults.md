---
title: Vaults
description: Ein Vault ist das Zuhause deines Wissens auf der Festplatte — ein Ordner mit Dateien, die dir gehören, geschützt durch einen Schlüssel, den nur du hältst.
---

Ein **Vault** ist der Ort, an dem dein Wissen lebt. Es ist ein Ordner auf deiner eigenen Festplatte — nicht eine Zeile in der Datenbank eines anderen — und es ist die Einheit, die Brainstorm öffnet, schützt und (optional) synchronisiert.

## Was in einem Vault steckt

Ein Vault enthält alles für einen Arbeitsbereich:

- **Deine Objekte** — Notizen, Datenbankzeilen, Dateien, Aufgaben und alles andere, was deine Apps erstellen.
- **Die Apps, die du** in diesen Vault installiert hast, und die **Berechtigungen**, die du ihnen erteilt hast.
- **Deine Identität** für diesen Vault — ein kryptografischer Schlüssel, der deine Änderungen signiert, damit Mitwirkende überprüfen können, wer was geschrieben hat.

Verschiedene Arbeitsbereiche können in verschiedenen Vaults leben — zum Beispiel ein privater Vault und ein Arbeits-Vault — jeder mit eigenen Apps, Berechtigungen und Synchronisierungseinstellungen.

## Wie ein Vault geschützt wird

Wenn du einen Vault erstellst, entscheidest du, wie sein Schlüssel gespeichert wird:

- **System-Schlüsselbund** — der Hauptschlüssel liegt im sicheren Schlüsselbund deines Betriebssystems und der Vault entsperrt sich, wenn du dich anmeldest.
- **Passphrase** — du gibst eine Passphrase an, aus der der Schlüssel abgeleitet wird. Ohne sie kann der Vault nicht geöffnet werden.

Der Hauptschlüssel verlässt deinen Rechner nie im Klartext und wird nur im Speicher gehalten, solange der Vault geöffnet ist. Siehe [Deine Daten & Sicherheit](/de/concepts/your-data-and-security/).

## Öffnen und Schließen

Es ist immer nur ein Vault „aktiv". Einen Vault zu öffnen lädt seine Daten und macht seine Apps verfügbar; ihn zu schließen gibt den Schlüssel aus dem Speicher frei. Der Wechsel zwischen Vaults ist sofortig und vermischt nie Daten zwischen ihnen — die Isolierung zwischen Vaults ist eine harte Grenze.

## Nächste Schritte

- [Apps & Berechtigungen](/de/concepts/apps-and-permissions/) — wie Apps beschränkten Zugriff auf einen Vault bekommen
- [Lokal-first & Synchronisierung](/de/concepts/local-first-and-sync/) — einen Vault auf viele Geräte bringen
