---
title: Deine Daten & Sicherheit
description: Wie Brainstorm deinen Vault schützt — Verschlüsselung, ein Schlüssel, den nur du hältst, eine signierte Identität und eine Sandbox, die geschlossen scheitert.
---

Brainstorms Sicherheitsmodell existiert, damit du Apps und Agenten über deinem wichtigsten Wissen laufen lassen kannst, ohne irgendetwas stillschweigenden Zugriff darauf zu geben.

## Ein Schlüssel, den nur du hältst

Jeder Vault ist durch einen **Hauptschlüssel** geschützt, der deinen Rechner nie im Klartext verlässt. Du entscheidest, wo er gespeichert wird:

- in deinem **Betriebssystem-Schlüsselbund**, oder
- abgeleitet aus einer **Passphrase**, die du angibst.

Der Schlüssel wird nur im Speicher gehalten, solange der Vault geöffnet ist, und wird gelöscht, wenn du ihn schließt. Es gibt kein Brainstorm-Konto, das deinen Vault für dich entsperren kann — und ebenso kann es niemand anderes.

## Deine Identität

Jeder Vault trägt eine kryptografische **Identität** — ein Schlüsselpaar, das die Änderungen signiert, die du machst. Mitwirkende können überprüfen, dass eine Bearbeitung wirklich von dir kam, und dein privater Signierschlüssel überschreitet nie eine App-Grenze oder verlässt das Gerät.

## Die Sandbox und das Hauptbuch

Apps laufen in einer Sandbox und sind voneinander und vom System isoliert. Alles Sensible, was eine App tun kann, wird durch das [Fähigkeiten-Hauptbuch](/de/concepts/apps-and-permissions/) vermittelt, das **geschlossen scheitert**: Wenn eine Berechtigung nicht bestätigt werden kann, wird die Aktion verweigert. Es gibt keinen Weg, auf dem sich eine App still einen Zugriff verschafft, den du nicht erteilt hast.

## Verschlüsselung im Ruhezustand und bei der Übertragung

- **Bei der Übertragung:** Wenn du synchronisierst, werden Inhalte Ende-zu-Ende-verschlüsselt, bevor sie dein Gerät verlassen; das Relay kann sie nicht lesen. Siehe [Lokal-first & Synchronisierung](/de/concepts/local-first-and-sync/).
- **Im Ruhezustand:** Dein Vault wird lokal unter deiner Kontrolle gespeichert, geschützt durch deinen Hauptschlüssel.

## Was Brainstorm *nicht* tut

- Es funkt deine Inhalte nicht nach Hause. Es gibt keinen Server, der deinen Vault hält.
- Es gibt Apps keinen pauschalen Zugriff „der Bequemlichkeit halber".
- Es sperrt deine Daten nicht in ein proprietäres Format — dein Wissen ist strukturiert, portabel und deins.

## Nächste Schritte

- [Apps & Berechtigungen](/de/concepts/apps-and-permissions/) — das Fähigkeiten-Modell im Detail
- [Vaults](/de/concepts/vaults/) — wie ein Vault erstellt und geschützt wird
