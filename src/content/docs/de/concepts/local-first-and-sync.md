---
title: Lokal-first & Synchronisierung
description: Brainstorm funktioniert vollständig offline auf deiner eigenen Festplatte und synchronisiert über Geräte hinweg mit Ende-zu-Ende-Verschlüsselung durch ein Relay, das deine Daten nicht lesen kann.
---

Brainstorm ist **lokal-first**: Dein Vault liegt auf deiner Festplatte, die App liest und schreibt ihn direkt, und nichts an deinen eigenen Inhalten braucht einen Server. Die Synchronisierung ist eine Option, die du einschaltest — keine Abhängigkeit, auf die du angewiesen bist.

## Lokal-first in der Praxis

- **Sofortig.** Einen Vault zu öffnen und Objekte zu bearbeiten läuft in lokaler Festplattengeschwindigkeit — keine Round-Trips.
- **Standardmäßig offline.** Alles funktioniert ganz ohne Netzwerk. Du wirst nie durch einen Server blockiert, der ausfällt oder nicht erreichbar ist.
- **Beständig.** Deine Daten sind einfache Dateien, die dir gehören. Würdest du Brainstorm morgen nicht mehr nutzen, wäre dein Vault immer noch genau dort auf der Festplatte.

## Konfliktfreie Bearbeitung mit CRDTs

Brainstorm speichert bearbeitbare Inhalte als **CRDTs** (über [Yjs](https://yjs.dev)). Ein CRDT lässt zwei Geräte — oder zwei Personen — dasselbe Objekt zur gleichen Zeit bearbeiten und die Ergebnisse automatisch zusammenführen, ohne einen „Welche Version gewinnt?"-Dialog. Genau das lässt sowohl Offline-Bearbeitungen als auch Echtzeit-Zusammenarbeit funktionieren, ohne Änderungen zu verlieren.

## Synchronisierung, die deine Daten nicht lesen kann

Wenn du die Synchronisierung aktivierst, verbindet Brainstorm deine Geräte über ein **Relay** — aber das Relay ist *blind*:

- Deine Änderungen werden auf deinem Gerät **Ende-zu-Ende-verschlüsselt**, bevor sie gesendet werden.
- Das Relay speichert und leitet nur verschlüsselten CRDT-Verkehr weiter. Es hält nie deine Schlüssel und kann deine Inhalte nicht lesen.
- Der Sync-Server ist **selbst hostbar**, falls du lieber deinen eigenen betreibst.

So bekommst du Synchronisierung und Zusammenarbeit über mehrere Geräte, ohne dein Wissen an einen Dritten zu übergeben.

## Ein Gerät wiederherstellen

Weil die verschlüsselte Historie auf dem Relay (oder deinem eigenen Server) liegt, stellt das Einrichten eines neuen Geräts deinen Vault aus der Synchronisierung wieder her — du authentifizierst dich, und deine Objekte bauen sich lokal aus dem verschlüsselten Strom neu auf.

## Nächste Schritte

- [Deine Daten & Sicherheit](/de/concepts/your-data-and-security/) — Schlüssel, Identität und das Bedrohungsmodell
- [Vaults](/de/concepts/vaults/) — das, was synchronisiert wird
