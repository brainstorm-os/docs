---
title: Teilen & Zusammenarbeit
description: Teile ein Objekt oder eine ganze Sammlung mit anderen — Ende-zu-Ende-verschlüsselt, mit Einmal-Einladungen, echten Rollen und Widerruf, der wirklich greift.
---

Mit Brainstorm kannst du einzelne Objekte — eine Notiz, ein Board, einen Chat-Kanal, eine ganze Sammlung — mit anderen Menschen teilen, ohne dass ein Server je den Inhalt sieht. Zusammenarbeit läuft über dieselbe [Ende-zu-Ende-verschlüsselte Synchronisierung](/de/concepts/local-first-and-sync/) wie deine eigenen Geräte: Das Relay speichert und leitet Chiffretext weiter, und die Schlüssel bewegen sich nur zwischen den Personen, die du eingeladen hast.

## Wie Teilen funktioniert

Du teilst vom Objekt selbst aus: Öffne seinen Teilen-Dialog und lade die Person ein. Unter der Haube ist jedes geteilte Objekt mit einem eigenen Schlüssel verschlüsselt, und dieser Schlüssel wird nur den Personen auf dem Objekt ausgehändigt — das Relay kann nicht lesen, was es weiterleitet.

Bearbeitungen führen sich konfliktfrei über [CRDTs](/de/concepts/local-first-and-sync/#konfliktfreie-bearbeitung-mit-crdts) zusammen, sodass zwei Personen gleichzeitig in derselben Notiz oder auf demselben Whiteboard arbeiten können. Apps mit Live-Oberflächen zeigen Präsenz — Remote-Cursor auf dem [Whiteboard](/de/apps/whiteboard/), geteilte Cursor und Bereichskommentare in [Notizen](/de/apps/notes/).

## Einladungen gelten einmal

Ein Einladungscode öffnet genau eine Sache, einmal, und er läuft ab. Es gibt keinen dauerhaften Link, der durchsickern und weiter funktionieren kann — wird eine Einladung nach ihrer Nutzung abgefangen, ist sie wertlos.

## Rollen

Jede Person auf einem geteilten Objekt hat eine Rolle:

- **Owner** — die Person, die geteilt hat; verwaltet Mitglieder und Rollen.
- **Editor** — kann das Objekt ändern.
- **Viewer** — kann es lesen, und nur lesen. Viewer wird Ende-zu-Ende durchgesetzt, nicht bloß in der UI versteckt.

## Menschen, nicht Schlüssel

Alle auf einem geteilten Objekt erscheinen **mit Namen**, mit ihrem Schlüssel-Fingerabdruck daneben. Namen reisen mit dem Objekt selbst, es gibt also nirgendwo ein Nutzerverzeichnis, und das Relay erfährt nichts Neues. Weil ein Name nur das ist, wie sich jemand nennt, ist der Fingerabdruck das, was zwei Personen unterscheidet — prüfe ihn für alles Sensible über einen anderen Kanal.

Jede Änderung ist von der [Vault-Identität](/de/concepts/your-data-and-security/#deine-identität) ihres Autors signiert, sodass Mitwirkende überprüfen können, dass eine Bearbeitung wirklich von dir kam.

## Zugriff widerrufen

Jemanden zu entfernen greift sofort: Seine Einladung kann nicht wiederverwendet werden, und der Schlüssel des Objekts wird rotiert, sodass das, was er hatte, keine neuen Änderungen mehr öffnet.

## Nächste Schritte

- [Lokal-first & Synchronisierung](/de/concepts/local-first-and-sync/) — der Transport, auf dem Zusammenarbeit läuft
- [Deine Daten & Sicherheit](/de/concepts/your-data-and-security/) — Identität, Schlüssel und das Bedrohungsmodell
