---
title: Objekte
description: Alles in einem Vault ist ein Objekt mit typisierten Eigenschaften, geteilt über jede App hinweg, statt in einer einzigen eingesperrt zu sein.
---

Alles, was du in Brainstorm erstellst, ist ein **Objekt**: eine Notiz, eine Aufgabe, ein Kontakt, eine Datei, ein Kalendertermin. Objekte sind die gemeinsame Substanz eines Vaults — Apps sind nur verschiedene Arten, sie zu betrachten.

## Ein Objekt, viele Sichten

Ein Objekt ist nicht in der App gefangen, die es erstellt hat. Eine Aufgabe, die du in einer Datenbank erstellst, kann im Kalender auftauchen, als Knoten im Graphen erscheinen und aus einer Notiz verlinkt werden — weil all diese Apps **dieselbe** Objektschicht lesen und schreiben.

Genau das lässt Brainstorm verbunden wirken statt wie einen Ordner voller unverbundener Werkzeuge: Es gibt einen gemeinsamen Raum von Objekten, und Apps sind Linsen darüber.

## Typisierte Eigenschaften

Objekte tragen **Eigenschaften** — typisierte Felder wie Text, Zahl, Datum, Kontrollkästchen, Link oder ein Wert aus einer definierten Menge. Eigenschaften werden auf Vault-Ebene definiert, sodass die Bedeutung von „Status" oder „Fälligkeitsdatum" über jede App hinweg konsistent ist, die ein Objekt berührt. Alles an einem Objekt, das nicht sein Hauptinhalt ist, ist eine Eigenschaft, bearbeitet über ein echtes, gemeinsames Eigenschaftssystem statt über eigenwillige Felder pro App.

## Links und Beziehungen

Objekte stehen zueinander in Beziehung:

- **Erwähnungen** — tippe `@` in Rich Text, um auf ein beliebiges Objekt zu verlinken. Der Link ist echt und bidirektional, sodass du alles sehen kannst, was auf ein bestimmtes Objekt verweist.
- **Sammlungen** — gruppiere Objekte in typisierte Mengen (eine Leseliste, die Aufgaben eines Projekts), ohne sie zu kopieren.

Die [Graph](/de/apps/graph/)-App visualisiert diese Beziehungen direkt.

## Auf dem Block Protocol gebaut

Unter der Haube folgen Objekte dem **Block Protocol** — einem offenen Standard für typisierte, interoperable Daten. Das hält deine Inhalte strukturiert und portabel statt an ein proprietäres Format gebunden, und deshalb können sich Blöcke und Daten sauber zwischen Apps bewegen.

## Nächste Schritte

- [Apps](/de/apps/) — die Linsen, mit denen du an Objekten arbeitest
- [Lokal-first & Synchronisierung](/de/concepts/local-first-and-sync/) — wie Objekte über Geräte hinweg konsistent bleiben
