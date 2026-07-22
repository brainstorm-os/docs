---
title: Fähigkeiten
description: Apps deklarieren die eng gefassten Berechtigungen, die sie brauchen; die Shell erteilt, fragt nach oder verweigert. Nichts ist stillschweigend gegeben, und Prüfungen scheitern geschlossen.
sidebar:
  label: Fähigkeiten
  order: 3
---

Eine Brainstorm-App startet mit fast keiner Macht. Sie kann ihr eigenes Fenster rendern und ihren eigenen Speicher lesen und schreiben — das war's. Alles andere — andere Objekttypen lesen, das Netzwerk erreichen, eine Benachrichtigung senden, eine Nutzlast signieren — ist eine benannte **Fähigkeit**, die die App deklariert und der Nutzer erteilt. Das ist dasselbe Modell, das in [Apps & Berechtigungen](/de/concepts/apps-and-permissions/) beschrieben ist, von der Seite des Entwicklers aus gesehen.

Zwei Invarianten prägen, wie du Apps schreibst:

- **Nichts ist stillschweigend gegeben.** Es gibt kein „lass die App alles machen". Jede sensible Aktion entspricht einer Fähigkeit, die aus einem Grund erteilt wurde.
- **Es scheitert geschlossen.** Wenn eine Fähigkeitsprüfung nicht erfüllt werden kann — oder bei ihrer Auswertung etwas schiefgeht — wird die Aktion verweigert, nie stillschweigend erlaubt.

## Die Grammatik

Eine Fähigkeit ist `<service>.<verb>` mit einem optionalen `:<scope>`:

```
storage.kv                                    # eigener Key/Value-Speicher
entities.read:io.brainstorm.notes/Note/v1     # einen Entitätstyp lesen
entities.write:io.brainstorm.notes/Note/v1    # einen Entitätstyp schreiben
entities.read:*                               # ALLE Entitätstypen lesen (stark abgefragt)
files.write                                   # vom Nutzer gewählte Datei-Handles schreiben
network.connect:wss://sync.example.com        # sich mit einem Host verbinden
network.connect:*                             # breites Netzwerk (stark abgefragt)
intents.dispatch:open                         # Open-Intents verschicken
notifications.post                            # eine Benachrichtigung senden
```

Der Scope ist, was Erlaubnisse bedeutsam hält. Um `entities.read:io.brainstorm.tasks/Task/v1` zu bitten, ist eine Anfrage, über die ein Nutzer nachdenken kann; um `entities.read:*` zu bitten, heißt, um das Lesen ihres gesamten Vaults zu bitten, und die Abfrage sagt das. **Fordere den engsten Scope an, der die Aufgabe erledigt** — breite Scopes werden stark abgefragt und untergraben das Vertrauen.

## Sie deklarieren

Liste die Fähigkeiten, die deine App braucht, im Manifest auf. Der Nutzer überprüft sie bei der Installation:

```json
"capabilities": [
  "storage.kv",
  "entities.read:io.brainstorm.tasks/Task/v1",
  "entities.write:io.brainstorm.tasks/Task/v1",
  "notifications.post"
]
```

Die erteilte Menge ist der App auch zur Laufzeit verfügbar:

```ts
const granted = window.brainstorm.capabilities;   // string[]
if (granted.includes("notifications.post")) {
  // der Benachrichtigungspfad kann sicher aufgerufen werden
}
```

## Zur Laufzeit anfordern

Fähigkeiten, die du nicht von Anfang an brauchst, werden besser angefordert, wenn das Feature zum ersten Mal genutzt wird, mit einem Grund, den der Nutzer in der Abfrage sieht:

```ts
await window.brainstorm.services.capabilities.request(
  "network.connect:wss://sync.example.com",
  "to sync your board with the team relay",
);
```

Ein klarer, konkreter Grund ist der Unterschied zwischen einer Erteilung und einer Verweigerung. Frag im Kontext — in dem Moment, in dem der Nutzer auf das klickt, was es braucht — nicht beim Start.

## Das Erteilungsmodell

Fähigkeiten fallen in drei Bänder:

- **Standard-Erteilung** — ohne Abfrage gegeben, weil sie kein app-übergreifendes oder Systemrisiko tragen: `storage.kv` (dein eigener Keyspace), das Verschicken von `open`-Intents und das Rendern deines eigenen Fensters. Auf diese kannst du dich verlassen.
- **Abfrage-Erteilung** — der häufige Fall: Der Nutzer wird gefragt, bei der Installation oder bei der ersten Nutzung, und kann erteilen, verweigern oder die Erteilung einschränken. Die meisten `entities.*`, `files.*`, `network.*` und `notifications.post` leben hier.
- **Nie an Sandbox-Apps erteilen** — privilegierte, Shell-interne Fähigkeiten, die eine Drittanbieter-App überhaupt nicht halten kann.

Erlaubnisse werden **pro Vault** festgehalten, sodass eine App, der du in deinem Arbeits-Vault vertraust, in deinem privaten Vault keine Rechte hat. Der Nutzer kann jede Erlaubnis jederzeit widerrufen; der Widerruf wird beim nächsten Host-Service-Aufruf wirksam.

## Elegant degradieren, wenn verweigert

Weil der Nutzer verweigern oder später widerrufen kann, ist **eine verweigerte Fähigkeit ein normaler Laufzeitzustand, kein Absturz**. Service-Aufrufe, die auf eine fehlende Fähigkeit stoßen, werden abgelehnt; fange sie ab und degradiere:

```ts
try {
  const hits = await window.brainstorm.services.search.query("budget");
  render(hits);
} catch (err) {
  if (err.name === "CapabilityDenied") {
    showInlineHint("Grant search access to find across your vault.");
    return;
  }
  throw err;
}
```

Höre auf Änderungen, damit die UI der Live-Erlaubnismenge folgt:

```ts
window.brainstorm.on("capability-changed", (caps) => {
  // Features wieder aktivieren oder ausblenden, wenn sich Erlaubnisse ändern
});
```

Eine App, die ausblendet oder deaktiviert, was sie derzeit nicht tun kann — statt eine Exception zu werfen — ist eine, der Nutzer genug vertrauen, um *mehr* zu erteilen.

## Weiter

- [SDK & Laufzeit](/de/build/the-sdk/) — die Dienste, die diese Fähigkeiten steuern.
- [Mit Daten arbeiten](/de/build/working-with-data/) — die `entities`-, `files`- und `intents`-Aufrufe in der Praxis.
