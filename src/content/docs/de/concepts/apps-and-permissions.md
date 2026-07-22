---
title: Apps & Berechtigungen
description: Jede App läuft in einer Sandbox hinter einem Fähigkeiten-Hauptbuch und kann nur berühren, was du ausdrücklich erlaubst.
---

Brainstorm besteht vollständig aus **Apps**, und jede App läuft in einer **Sandbox**. Eine App kann von sich aus nicht auf deine Daten, dein Netzwerk oder eine andere App zugreifen — sie kann nur tun, was du ihr über das **Fähigkeiten-Hauptbuch** erteilt hast.

## Das Fähigkeiten-Modell

Eine Fähigkeit ist eine konkrete, eng gefasste Berechtigung: *Notizen lesen*, *Dateien schreiben*, *diesen einen Netzwerk-Host erreichen*, *eine Benachrichtigung anzeigen*. Apps deklarieren die Fähigkeiten, die sie brauchen; du erteilst oder verweigerst sie.

Zwei Prinzipien machen das vertrauenswürdig:

- **Nichts ist stillschweigend gegeben.** Es gibt kein „lass die App einfach alles machen". Jede sensible Aktion entspricht einer Fähigkeit, die aus einem Grund erteilt wurde.
- **Es scheitert geschlossen.** Wenn eine Berechtigungsprüfung nicht erfüllt werden kann — oder bei ihrer Auswertung etwas schiefgeht — wird die Aktion verweigert, nie stillschweigend erlaubt.

Weil der Zugriff ausdrücklich und widerrufbar ist, ist es sicher, Apps von Drittanbietern und später autonome KI-Agenten über selbst deinen wichtigsten Daten laufen zu lassen.

## Erteilen und Widerrufen

Wenn eine App zum ersten Mal eine Fähigkeit braucht, fragt Brainstorm. Du kannst:

- Sie **erteilen**, optional beschränkt (zum Beispiel auf eine einzige Art von Objekt).
- Sie **verweigern** — die App funktioniert weiter, nur ohne diese Fähigkeit.
- Sie später in den Berechtigungseinstellungen des Vaults **widerrufen**.

Erlaubnisse werden pro Vault festgehalten, sodass eine App, der du in deinem Arbeits-Vault vertraust, in deinem privaten Vault keine Rechte hat.

## Isolierung zwischen Apps

Apps sind sowohl voneinander als auch vom System isoliert. Eine App kann den privaten Zustand einer anderen App nicht lesen oder in ihr Fenster greifen. Wenn Apps Daten teilen, geschieht das über die gemeinsame Objektschicht, die du sehen und steuern kannst — nicht über Hintertüren. Siehe [Objekte](/de/concepts/objects/).

## Agenten sind auch Apps

KI-Agenten in Brainstorm sitzen hinter demselben Hauptbuch. Ein Agent arbeitet unter einer Obergrenze von Fähigkeiten, die du festlegst; er kann sich nie mehr Zugriff verschaffen, als du erlaubt hast. Das Berechtigungsmodell, das Apps ehrlich hält, ist dasselbe, das die Automatisierung regelt.

## Nächste Schritte

- [Objekte](/de/concepts/objects/) — die gemeinsamen Daten, die Apps lesen und schreiben
- [Deine Daten & Sicherheit](/de/concepts/your-data-and-security/) — die Garantien darunter
