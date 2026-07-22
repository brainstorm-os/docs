---
title: Auf Brainstorm entwickeln
description: Brainstorm besteht vollständig aus Sandbox-Apps über einer gemeinsamen Objektschicht. So baust du eine.
sidebar:
  label: Überblick
  order: 0
---

Brainstorm ist eine Desktop-Shell, die **Apps** hostet — und sonst nichts. Notizen, Datenbank, Graph, Kalender, das ganze Produkt sind Apps, die über einer gemeinsamen [Objektschicht](/de/concepts/objects/) laufen. Dasselbe Modell steht dir offen: Eine App, die du baust, ist ein Peer der eingebauten, mit demselben Zugriff auf Vault-Daten und demselben Platz im Launcher.

Dieser Abschnitt ist der Entwickler-Hub für den Bau dieser Apps. Er setzt voraus, dass du die [Konzepte](/de/concepts/vaults/) gelesen hast — besonders [Apps & Berechtigungen](/de/concepts/apps-and-permissions/) und [Objekte](/de/concepts/objects/) — denn die Garantien der Plattform *sind* ihre API.

:::note
Brainstorm ist vor seiner öffentlichen Beta in aktiver Entwicklung. App-Entwicklung geschieht heute innerhalb des Shell-Quellbaums (siehe [Deine erste App](/de/build/your-first-app/)). Ein eigenständig veröffentlichtes SDK und eine Pipeline zum Veröffentlichen von Drittanbieter-Apps stehen auf der Roadmap; diese Doku beschreibt das App-Modell und das SDK, wie sie jetzt existieren, und wird mit dieser Pipeline wachsen.
:::

## Was eine App ist

Eine App ist eine kleine Web-App — HTML, JavaScript, CSS — die in ihrem eigenen Sandbox-Renderer läuft. Sie kommt mit einem [Manifest](/de/build/the-manifest/), das erklärt, wer sie ist, welche Datentypen sie besitzt und welche [Fähigkeiten](/de/build/capabilities/) sie braucht. Die Shell installiert sie, gibt ihr ein Fenster und vermittelt jede Anfrage, die sie an das System stellt.

Drei Eigenschaften definieren das Modell:

- **In einer Sandbox.** Eine App kann von sich aus nicht auf das Dateisystem, das Netzwerk oder eine andere App zugreifen. Sie kann nur tun, was du über das Fähigkeiten-Hauptbuch erteilt hast. Das ist die Sicherheitsgrenze — sie macht es sicher, Drittanbieter-Apps und später autonome Agenten über deinen wichtigsten Daten laufen zu lassen.
- **Fähigkeitsgesteuert.** Jede sensible Aktion entspricht einer benannten Fähigkeit, die die App deklariert und du genehmigt hast. Nichts ist stillschweigend gegeben; Prüfungen scheitern geschlossen. Siehe [Fähigkeiten](/de/build/capabilities/).
- **Über gemeinsamen Objekten.** Apps besitzen keine privaten Silos. Sie lesen und schreiben typisierte [Objekte](/de/concepts/objects/) im Vault, sodass die Notiz, die du in einer App schreibst, dasselbe Objekt ist, das eine andere App verlinken, in einem Kalender anzeigen oder auf einem Graphen platzieren kann.

## Womit du baust

Jede Brainstorm-App ist eine **React-App**, gebaut auf einem gemeinsamen Werkzeugkasten:

- **`@brainstorm/sdk`** — die Komponenten- und Hilfsbibliothek: Menüs, Popovers, Icons, Picker, Eigenschafts-UI, Suche, Suchen-und-Ersetzen, Formatierung und das App-Chrome-Theme. Prüfe das [SDK & Laufzeit](/de/build/the-sdk/), bevor du irgendetwas schreibst; wenn eine Primitive existiert, importierst du sie, statt sie neu zu bauen.
- **`@brainstorm/react-yjs`** — die Reaktivitätsschicht. Live-Objektlisten und kollaborative Dokumente fließen durch Hooks wie `useVaultEntities` und `useYDoc`. Du baust nie selbst eine Änderungsschleife.
- **`window.brainstorm`** — die Laufzeit, die die Shell in jede App injiziert: deine Identität, deine erteilten Fähigkeiten, dein Startkontext und die [Service-Namensräume](/de/build/the-sdk/#die-laufzeit) (`entities`, `files`, `intents`, `storage`, `search`, …), die du aufrufst, um zu arbeiten.

## Die Form der Arbeit

Eine typische App besteht aus vier Dingen:

1. Einem **[Manifest](/de/build/the-manifest/)**, das die App, die Objekttypen, die sie besitzt, und die Fähigkeiten, die sie braucht, deklariert.
2. Einer **React-UI**, die in das App-Fenster gemountet wird, unter Verwendung des Standard-[Header-Chromes](/de/build/the-sdk/#app-chrome) und der SDK-Komponenten.
3. **[Datenzugriff](/de/build/working-with-data/)** — Objekte lesen und schreiben, Rich Text über Yjs synchronisieren, app-privaten Zustand speichern.
4. **[Integration](/de/build/working-with-data/#mit-anderen-apps-sprechen)** — sich als Opener für einen Typ registrieren, Intents verschicken, Widgets beitragen, sodass deine App mit dem Rest des Arbeitsbereichs zusammenspielt, statt allein zu stehen.

## Wohin als Nächstes

- **[Deine erste App](/de/build/your-first-app/)** — eine App scaffolden, ausführen und in der Shell sehen.
- **[Das Manifest](/de/build/the-manifest/)** — jedes Feld, mit einem echten Beispiel.
- **[Fähigkeiten](/de/build/capabilities/)** — die Berechtigungsgrammatik und wie man um Zugriff bittet.
- **[SDK & Laufzeit](/de/build/the-sdk/)** — der Werkzeugkasten und die `window.brainstorm`-Oberfläche.
- **[Mit Daten arbeiten](/de/build/working-with-data/)** — Objekte, Dokumente, Speicher und app-übergreifende Integration.
- **[Rezepte & Anti-Patterns](/de/build/recipes/)** — die Muster zum Kopieren und die Fehler zum Vermeiden.
