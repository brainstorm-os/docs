---
title: Was ist Brainstorm?
description: Brainstorm ist ein lokal-first, KI-natives Betriebssystem für Wissensarbeit — eine Desktop-Shell, die Sandbox-Apps über deinen eigenen Daten hostet.
---

Brainstorm ist ein **lokal-first, KI-natives Betriebssystem für Wissensarbeit**. Es sieht aus und verhält sich wie ein Desktop-OS — eine Shell, die kleine, fokussierte Apps hostet — nur dass der „Computer" dein Wissen ist und alles auf deinem eigenen Rechner läuft.

Drei Ideen definieren es:

## Apps statt Funktionen

Die Shell selbst tut fast nichts. Sie hostet **Apps**: Notizen, Datenbank, Dateien, Graph, einen Kalender, einen Code-Editor und mehr. Du fügst die hinzu, die du willst, und ignorierst den Rest. Jede App läuft in einer Sandbox und aktualisiert sich für sich, sodass das Produkt wächst, ohne zu einem einzigen wuchernden Monolithen zu werden.

## Deine Daten, deine Festplatte

Dein Wissen lebt in einem **Vault** — einem Ordner mit Dateien auf deiner eigenen Festplatte, nicht einer Zeile in der Datenbank eines anderen. Brainstorm ist lokal-first: Es funktioniert vollständig offline, öffnet sofort und braucht nie einen Server, um deine eigenen Inhalte zu lesen oder zu schreiben. Wenn du dich entscheidest, über Geräte hinweg zu synchronisieren, ist der Verkehr Ende-zu-Ende-verschlüsselt und das Relay sieht deine Daten nie. Siehe [Lokal-first & Synchronisierung](/de/concepts/local-first-and-sync/).

## Berechtigungen, die du erteilst

Jede App und jeder KI-Agent läuft hinter einem **Fähigkeiten-Hauptbuch**. Eine App kann nur die Daten und Dienste berühren, die du ausdrücklich erlaubt hast — eine Notiz lesen, eine Datei speichern, das Netzwerk erreichen. Nichts ist stillschweigend gegeben. Genau das macht es sicher, Apps von Drittanbietern und autonome Agenten über deinen wichtigsten Daten laufen zu lassen. Siehe [Apps & Berechtigungen](/de/concepts/apps-and-permissions/).

## Auf offenen Fundamenten gebaut

Brainstorm ist auf offenen Bausteinen aufgebaut, nicht auf einem proprietären Format:

- **Block Protocol** für interoperable, typisierte Daten.
- **Yjs** (CRDTs) für konfliktfreie Echtzeit-Zusammenarbeit und Offline-Bearbeitung.
- **Lexical** für Rich Text.

Das bedeutet, deine Inhalte sind strukturiert, portabel und nicht an einen Anbieter gebunden.

:::note
Brainstorm ist in offener Beta und in aktiver Entwicklung. Einige in dieser Doku beschriebene Funktionen werden noch ausgerollt. [Lade die Beta herunter](https://getbrainstorm.online/de/downloads), um es heute auszuprobieren.
:::

## Nächste Schritte

- [Brainstorm installieren](/de/start-here/install/)
- [Schnellstart](/de/start-here/quickstart/) — einen Vault erstellen und deine erste App öffnen
- [Konzepte](/de/concepts/vaults/) — das Modell hinter dem Produkt
