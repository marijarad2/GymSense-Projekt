# Projektdokumentation - GymSense

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage
Die steigende Popularität von Fitness und Krafttraining führt dazu, dass immer mehr Personen regelmässig ins Fitnessstudio gehen. Dabei besteht jedoch häufig das Problem, dass Trainings nicht systematisch dokumentiert werden. Viele Trainings werden spontan durchgeführt, ohne klare Struktur oder Nachverfolgung des Fortschritts.

Zudem fällt es insbesondere Einsteiger:innen schwer, den Überblick über ihre Trainingsentwicklung zu behalten. Ohne eine klare Dokumentation ist es schwierig zu erkennen, ob Fortschritte erzielt werden oder ob Anpassungen notwendig sind. Ein weiteres Problem besteht darin, dass Übungen oft nicht korrekt ausgeführt werden, was das Verletzungsrisiko erhöht und die Effektivität des Trainings reduziert.

Bestehende Fitness-Apps bieten zwar zahlreiche Funktionen, sind jedoch häufig komplex, überladen oder nicht auf die tatsächlichen Bedürfnisse von Nutzer:innen zugeschnitten. Viele Anwendungen fokussieren sich stark auf zusätzliche Features wie Social Sharing oder umfangreiche Statistiken, während einfache und verständliche Workflows in den Hintergrund geraten.

Aus diesen Gründen besteht Bedarf nach einer übersichtlichen und nutzerfreundlichen Anwendung, welche das Training strukturiert erfasst, Fortschritte sichtbar macht und gleichzeitig bei der korrekten Ausführung von Übungen unterstützt.

## 2. Lösungsidee
Die Lösung ist **GymSense** – eine schlanke Web-Applikation zur strukturierten Erfassung und Nachverfolgung von Krafttrainings. Im Zentrum steht ein einfacher, schnell bedienbarer Workflow, der auch direkt im Fitnessstudio genutzt werden kann.

- **Kernfunktionalität:**
  - **Training starten & erfassen** (`/training`): Nutzer:innen wählen Übungen aus, fügen Sätze hinzu und tragen pro Satz Gewicht und Wiederholungen ein. Eine Live-Zusammenfassung (Anzahl Übungen, Sätze, Gesamtvolumen in kg) zeigt den Trainingsumfang in Echtzeit.
  - **Trainingspläne** (`/plans`): Vordefinierte Pläne (z. B. nach Level und Ziel) können ausgewählt und direkt als Vorlage für ein Training gestartet werden. GymSense zeigt eine personalisierte Planempfehlung an.
  - **Fortschritt verfolgen** (`/progress`): Pro Übung wird die Gewichtsentwicklung über Zeit visualisiert. Persönliche Rekorde (PR) werden automatisch erkannt und hervorgehoben. Bei Fortschritt erscheint eine Toast-Benachrichtigung.
  - **Übungsbibliothek** (`/exercises`): Alle Übungen mit Muskelgruppe, Beschreibung, Ausführungstipps und eingebetteten Videoanleitungen. Filterbar nach Name und Muskelgruppe. Nutzer:innen können eine Lieblingsübung speichern.
  - **Profil & Dashboard** (`/profile`): Übersicht über Gesamttrainings, letztes Training, Lieblingsübung, höchstes Gewicht, Persönliche Rekorde, Trainings-Streak, Wochenziel (konfigurierbar) und ein interaktiver Trainingskalender.
  - **Benutzerkonto** (`/login`, `/register`, `/logout`): Registrierung und Login ermöglichen eine personalisierte, persistente Datenspeicherung pro Nutzer:in.

- **Annahmen:**
  - Nutzer:innen trainieren primär mit freien Gewichten und Maschinen (Krafttraining).
  - Das Gerät während des Trainings ist ein Smartphone oder Tablet.
  - Nutzer:innen sind motiviert, ihr Training festzuhalten, sofern der Aufwand minimal ist.
  - Fortschritt ist ein zentraler Motivationsfaktor – dessen Sichtbarkeit steigert die Nutzungstreue.

- **Abgrenzung:**
  - Kein Social-Feature (kein Teilen, kein Feed, kein Freundesvergleich).
  - Kein Ernährungstracking.
  - Kein automatisierter KI-Coach innerhalb der App.
  - Keine nativen Mobile-Apps (nur Web).

## 3. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define
- **Zielgruppenverständnis:** Die primäre Zielgruppe umfasst Einsteiger:innen und Fortgeschrittene im Krafttraining, die ihr Training selbstständig dokumentieren möchten – ohne Personal Trainer oder teure Abonnements. Typischerweise sind dies Personen zwischen 18 und 35 Jahren, die regelmässig ein Fitnessstudio besuchen und ihr Smartphone als Alltagsbegleiter nutzen. Sie wollen während des Trainings möglichst wenig Zeit mit der App verbringen und trotzdem alle relevanten Daten festhalten.

- **Wesentliche Erkenntnisse:**
  - Spontanes, unstrukturiertes Training ist weit verbreitet – vor allem bei Einsteiger:innen.
  - Ohne Dokumentation ist Fortschritt nur schwer wahrnehmbar, was die Motivation langfristig senkt.
  - Bestehende Apps überfordern durch zu viele Funktionen und komplizierte Onboarding-Prozesse.
  - Eine einfache, schnelle Erfassung (Übung → Sätze → Gewicht/Wiederholungen) deckt den grössten Teil des Bedarfs ab.
  - Hinweise zur korrekten Übungsausführung (inkl. Video) sind besonders für Einsteiger:innen wertvoll.
  - Persönliche Rekorde und sichtbarer Fortschritt sind starke Motivationsfaktoren.

### 3.2 Sketch
- **Variantenüberblick:** _[Folgt – Skizzen werden ergänzt]_
- **Skizzen:** _[Folgt – mehrere Varianten mit dokumentierten Unterschieden werden ergänzt]_

### 3.3 Decide
- **Gewählte Variante & Begründung:** _[Folgt – Entscheidkriterien werden ergänzt]_
- **End-to-End-Ablauf:**
  1. Nutzer:in öffnet GymSense – die Landingpage erklärt den Mehrwert der App.
  2. Registrierung oder Login mit E-Mail und Passwort (inkl. Passwort-Stärke-Prüfung bei Registrierung).
  3. Unter „Übungen" können alle Übungen eingesehen werden (Beschreibung, Tipps, Video) – auch ohne Login.
  4. Unter „Trainingspläne" wählt die Nutzer:in einen passenden Plan; GymSense zeigt eine personalisierte Empfehlung.
  5. Über „Plan starten" wird das Training mit vordefinierten Übungen geöffnet.
  6. Im Training werden Sätze erfasst (Gewicht + Wiederholungen); die Live-Zusammenfassung aktualisiert sich automatisch.
  7. Nach dem Speichern ist das Training unter „Fortschritt" sichtbar – Gewichtsentwicklung und PR werden visualisiert.
  8. Im Profil sieht die Nutzer:in alle Statistiken, den Trainingskalender und kann das Wochenziel anpassen.
- **Mockup:** _[Folgt – Figma-URL und Screenshots werden ergänzt]_

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.

- **Informationsarchitektur:**
  GymSense ist als Multi-Page-Applikation (MPA) in SvelteKit strukturiert. Die Navigation erfolgt über eine persistente Navbar. Nicht eingeloggte Nutzer:innen sehen nur „Startseite" und „Übungen"; nach dem Login erscheinen zusätzlich „Trainingspläne", „Training", „Fortschritt" und „Profil" (inkl. Name der Nutzer:in).

  Seitenstruktur:
  - `/` – Startseite (Hero-Section, Vorteile, Funktionsübersicht, Warum GymSense)
  - `/exercises` – Übungsbibliothek (öffentlich; Such- und Muskelgruppen-Filter; Videos; Favorit setzen)
  - `/plans` – Trainingspläne (Planauswahl mit Empfehlung; Plan direkt starten)
  - `/training` – Aktives Training erfassen (Übungen, Sätze, Live-Zusammenfassung; Plan als Vorlage ladbar)
  - `/progress` – Fortschrittsübersicht (Gewichtsverlauf pro Übung als Balkendiagramm; PR-Badge; Toast)
  - `/profile` – Benutzerprofil (Statistiken, Persönliche Rekorde, Streak, Wochenziel, Trainingskalender)
  - `/login` – Anmeldung
  - `/register` – Registrierung (mit Passwort-Stärke-Anzeige und Validierungsregeln)
  - `/logout` – Abmeldung (Form Action)
  - `/api` – Interne API-Endpunkte (z. B. Trainingsplan-Daten für das Training)

- **User Interface Design:**
  Das UI basiert auf Bootstrap 5 mit Bootstrap Icons. Das durchgehende Farbschema in Lila/Pink (`#b06eb0`, `#f7d1f8`) schafft eine klare, konsistente Markenwirkung. Alle Seiten sind vollständig responsiv und für Smartphone-Nutzung optimiert.

  Wichtige Screens:
  - **Startseite:** Hero-Section mit Slogan „Train smarter. Not just harder.", Vorteils-Grid (2×2), 3-Schritte-Erklärung, „Warum GymSense?"-Sektion.
  - **Übungen:** Filterzeile (Suche + Muskelgruppen-Dropdown), Übungskarten im Grid mit Tipps, Video-Embed und Favorit-Button.
  - **Training:** Übungsauswahl per Dropdown, Satz-Erfassung (Gewicht + Wiederholungen), Live-Zusammenfassungskarte.
  - **Fortschritt:** Karten pro Übung mit Vorher/Jetzt-Vergleich, Balkendiagramm der letzten Einträge, PR-Badge.
  - **Profil:** Stat-Grid (4 Karten), Dashboard-Grid (Wochenziel mit Fortschrittsbalken, Streak, Intelligenter Hinweis), Persönliche Rekorde, interaktiver Monatskalender mit Swipe-Unterstützung.
  - _[Screenshots der einzelnen Screens werden ergänzt]_

- **Designentscheidungen:**
  - **Bootstrap 5** als CSS-Framework für schnelle, responsive Layouts ohne eigenes Grid-System.
  - **Lila/Pink Farbpalette** (`#b06eb0`): Bewusst differenzierend gegenüber klassisch blauen Fitness-Apps; konsequent auf allen Seiten durchgezogen.
  - **Dark Mode**: Per Toggle-Button wählbar; Zustand wird im `localStorage` gespeichert und beim nächsten Besuch wiederhergestellt. Alle Komponenten (Navbar, Footer, Cards, Inputs, Buttons) sind vollständig für Dark Mode gestylt.
  - **Auth-abhängige Navigation**: Nicht eingeloggte Nutzer:innen sehen nur öffentliche Bereiche – kein unnötiger Overhead.
  - **Inline-Feedback**: Fehler- und Erfolgsmeldungen erscheinen direkt auf der jeweiligen Seite (kein separater Toast-Layer, ausser Fortschritts-Toast).

#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.

- **Technologie-Stack:**
  - **SvelteKit** (Frontend-Framework mit SSR)
  - **Svelte 5** (Runes-Syntax: `$props()`, `$state()`, `$derived`, `$derived.by()`, `$effect()`)
  - **Bootstrap 5** + **Bootstrap Icons** (via npm)
  - **TypeScript** (Server-seitige Dateien: `+layout.server.ts`, `+page.server.ts`)
  - **JavaScript** (Client-seitige Svelte-Komponenten)

- **Tooling:**
  - **Visual Studio Code** als Entwicklungsumgebung
  - **Git & GitHub** für Versionsverwaltung
  - _[Einsatz von KI-Tools: siehe Kapitel 6 KI-Deklaration]_

- **Struktur & Komponenten:**

  ```
  src/
  ├── lib/
  │   ├── assets/
  │   │   └── Logo.png
  │   └── components/
  │       └── HeroSection.svelte
  ├── routes/
  │   ├── +layout.svelte          # Globales Layout: Navbar, Footer, Dark Mode
  │   ├── +layout.server.ts       # Lädt user aus locals für alle Routen
  │   ├── +page.svelte            # Startseite (Landing Page)
  │   ├── +page.server.ts         # Lädt user für Startseite
  │   ├── api/
  │   │   └── training-plan/[id]/ # API-Endpunkt: Trainingsplan per ID laden
  │   ├── exercises/              # Übungsbibliothek (Filter, Video, Favorit)
  │   ├── login/                  # Anmeldung (Passwort-Toggle)
  │   ├── logout/                 # Abmeldung (Form Action)
  │   ├── plans/                  # Trainingspläne (Empfehlung, Plan starten)
  │   ├── profile/                # Profil (Stats, Rekorde, Kalender, Wochenziel)
  │   ├── progress/               # Fortschritt (Balkendiagramm, PR, Toast)
  │   ├── register/               # Registrierung (Stärke-Anzeige, Validierung)
  │   └── training/               # Training erfassen (Live-Summary, Plan laden)
  ```

  Wichtige Komponenten und Patterns:
  - **`+layout.svelte`**: Globale Navbar mit auth-abhängiger Navigation, Dark-Mode-Toggle, Footer. Nutzt `$state()` und `$effect()` (Svelte 5 Runes).
  - **`+layout.server.ts`**: Gibt `locals.user` an alle Kind-Routen weiter – zentrales Auth-Guard-Pattern.
  - **`exercises/+page.svelte`**: Echtzeit-Filter via `$derived.by()` (kein Server-Request nötig); Favorit setzen via Form Action.
  - **`training/+page.svelte`**: Dynamische Übungsliste mit Satz-Verwaltung; lädt Trainingsplan asynchron via `fetch` auf `/api/training-plan/[id]`; Live-Summary mit `$derived.by()`.
  - **`progress/+page.svelte`**: Balkendiagramm mit relativer Höhenberechnung; automatische PR-Erkennung; Toast via `$effect()` mit `setTimeout`.
  - **`profile/+page.svelte`**: Interaktiver Monatskalender mit Touch-Swipe-Unterstützung (`ontouchstart`/`ontouchend`); Monats-/Jahresnavigation; Kalendereinträge (Training/Rest) via Form Actions.
  - **`register/+page.svelte`**: Live-Passwort-Stärke-Anzeige (schwach/mittel/stark) und Validierungsregeln (Länge, Zahl, Sonderzeichen, Grossbuchstabe) via `$derived`.

- **Daten & Schnittstellen:**
  - Nutzerdaten werden serverseitig über `locals.user` bereitgestellt (Session-/Cookie-basierte Authentifizierung).
  - Trainingsdaten, Übungen, Fortschritt, Kalendereinträge und Profil-Statistiken werden über SvelteKit `load`-Funktionen (`+page.server.ts`) serverseitig geladen.
  - Trainingsplan-Daten sind über `/api/training-plan/[id]` als JSON-API abrufbar (genutzt vom Training-Screen via `fetch`).
  - Mutationen (Training speichern, Favorit setzen, Kalendereintrag, Wochenziel) erfolgen über SvelteKit Form Actions (`method="POST"`).
  - Dark-Mode-Präferenz wird clientseitig im `localStorage` gespeichert.
  - _[Details zur Datenbank (Typ, Verbindung, Schema) werden ergänzt]_

- **Deployment:** _[Folgt – URL wird nach Deployment ergänzt]_

- **Besondere Entscheidungen:**
  - **Svelte 5 Runes** (`$state`, `$derived`, `$effect`) statt klassischer Svelte-Reaktivität: Explizitere, besser nachvollziehbare State-Verwaltung.
  - **SSR + Form Actions** statt clientseitiger API-Calls für Mutationen: Bessere Kompatibilität, kein separates API-Layer nötig, progressive Enhancement.
  - **Clientseitiger Filter** in der Übungsbibliothek via `$derived.by()`: Sofortige Filterung ohne Server-Roundtrip.
  - **Fetch-basiertes Plan-Laden** im Training-Screen: Der Trainingsplan wird erst bei Bedarf (URL-Parameter `?plan=`) geladen – keine unnötige Datenlast beim normalen Trainingsstart.

### 3.5 Validate
- **URL der getesteten Version:** _[Folgt – separate Deploy-URL wird ergänzt]_
- **Ziele der Prüfung:** _[Folgt – weitere Informationen werden ergänzt]_
- **Vorgehen:** _[Folgt – weitere Informationen werden ergänzt]_
- **Stichprobe:** _[Folgt – weitere Informationen werden ergänzt]_
- **Aufgaben/Szenarien:** _[Folgt – weitere Informationen werden ergänzt]_
- **Kennzahlen & Beobachtungen:** _[Folgt – weitere Informationen werden ergänzt]_
- **Zusammenfassung der Resultate:** _[Folgt – weitere Informationen werden ergänzt]_
- **Abgeleitete Verbesserungen:** _[Folgt – weitere Informationen werden ergänzt]_

## 4. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### 4.1 Dark Mode
- **Beschreibung & Nutzen:** Die Applikation bietet einen vollständigen Dark Mode, der per Toggle-Button in der Navbar umgeschaltet werden kann. Die gewählte Präferenz wird im `localStorage` gespeichert und beim nächsten Seitenbesuch automatisch wiederhergestellt. Alle Bereiche der App (Navbar, Footer, alle Cards, Inputs, Buttons, Kalender) sind für den Dark Mode vollständig gestylt. Dies verbessert die Bedienbarkeit bei schlechten Lichtverhältnissen, z. B. in einem schwach beleuchteten Fitnessstudio.
- **Wo umgesetzt:**
  - **Frontend:** `+layout.svelte` (globaler Toggle, `$state(isDarkMode)`, `$effect()` für localStorage-Initialisierung); alle Seiten-Komponenten enthalten `:global(body.dark-mode)`-CSS-Regeln für ihre eigenen Elemente.
- **Referenz:** Beschreibung in Kap. 3.4.1 (Designentscheidungen)
- **Aus Evaluation abgeleitet?:** Nein – von Beginn an als sinnvolle Erweiterung konzipiert.

### 4.2 Live-Trainings-Zusammenfassung
- **Beschreibung & Nutzen:** Während der Trainingserfassung berechnet GymSense in Echtzeit die Anzahl Übungen, Sätze und das Gesamtvolumen (Gewicht × Wiederholungen über alle Sätze). Die Zusammenfassung erscheint als eigene Karte sobald mindestens eine Übung hinzugefügt wurde. Nutzer:innen bekommen so einen sofortigen Überblick über ihren Trainingsumfang, ohne die Daten selbst aufaddieren zu müssen.
- **Wo umgesetzt:**
  - **Frontend:** `training/+page.svelte` – `summary`-Objekt via `$derived.by()`, berechnet `exerciseCount`, `setCount` und `totalVolume`.
- **Referenz:** Beschreibung in Kap. 3.4.1 (Wichtige Screens – Training)
- **Aus Evaluation abgeleitet?:** Nein – als Qualitätsmerkmal für besseres Nutzerfeedback von Beginn an geplant.

### 4.3 Persönliche Rekorde (PR) mit automatischer Erkennung
- **Beschreibung & Nutzen:** Der Fortschritts-Screen erkennt automatisch, ob ein neuer Höchstwert bei einer Übung erreicht wurde, und markiert diesen mit einem „PR 🎉"-Badge. Zusätzlich erscheint eine animierte Toast-Benachrichtigung, wenn Fortschritte erzielt wurden. Dies schafft einen starken Motivationsanreiz direkt nach dem Training.
- **Wo umgesetzt:**
  - **Frontend:** `progress/+page.svelte` – `isPersonalBest`-Flag aus Server-Daten; Toast via `$effect()` mit `setTimeout` (3 Sekunden, dann automatisch ausgeblendet).
  - **Backend:** PR-Berechnung erfolgt serverseitig in der `load`-Funktion.
- **Referenz:** Beschreibung in Kap. 3.4.1 (Wichtige Screens – Fortschritt)
- **Aus Evaluation abgeleitet?:** Nein – Teil der initialen Konzeption für motivierende Nutzererfahrung.

### 4.4 Interaktiver Trainingskalender mit Touch-Unterstützung
- **Beschreibung & Nutzen:** Das Profil enthält einen vollständigen Monatskalender, in dem Tage als Trainingstag (🏋️) oder Ruhetag (💤) markiert werden können. Der Kalender unterstützt Monats- und Jahresnavigation per Button sowie Swipe-Gesten auf Touchscreens (links/rechts wischen = Monat wechseln). Dies macht den Kalender besonders auf dem Smartphone intuitiv bedienbar.
- **Wo umgesetzt:**
  - **Frontend:** `profile/+page.svelte` – Kalenderlogik mit `getCalendarDays()`, Monats-/Jahresnavigation, `handleTouchStart`/`handleTouchEnd` für Swipe (Schwellwert: 60px). Kalendereinträge via Form Actions (`?/addTraining`, `?/addRest`).
- **Referenz:** Beschreibung in Kap. 3.4.1 (Wichtige Screens – Profil)
- **Aus Evaluation abgeleitet?:** Nein – als Erweiterung des Profil-Dashboards konzipiert.

### 4.5 Passwort-Stärke-Anzeige bei Registrierung
- **Beschreibung & Nutzen:** Beim Registrierungsformular wird die Passwortstärke live angezeigt (schwach / mittel / stark) inklusive visuellem Fortschrittsbalken und einer Checkliste der Anforderungen (Länge ≥ 11 Zeichen, Zahl, Sonderzeichen, Grossbuchstabe). Passwörter stimmen nicht überein wird sofort mit einer Shake-Animation angezeigt. Dies erhöht die Sicherheit der Benutzerkonten und gibt klares Feedback.
- **Wo umgesetzt:**
  - **Frontend:** `register/+page.svelte` – alle Regeln via `$derived` (Svelte 5), Stärke-Klassen (`strength-weak`, `strength-medium`, `strength-strong`), Shake-Animation via CSS `@keyframes`.
- **Referenz:** Beschreibung in Kap. 3.4.1 (Wichtige Screens – Registrierung)
- **Aus Evaluation abgeleitet?:** Nein – Qualitätsmerkmal für sichere Authentifizierung.

### 4.6 GymSense Empfehlung & intelligente Hinweise
- **Beschreibung & Nutzen:** Auf der Trainingsplan-Seite zeigt GymSense eine personalisierte Planempfehlung basierend auf dem Nutzerprofil. Im Profil-Dashboard gibt es zusätzlich eine „Intelligenter Hinweis"-Karte, die kontextbezogene Tipps liefert (z. B. zur Lieblingsübung oder zum höchsten Gewicht). Dies simuliert eine smarte Trainingsbegleitung ohne KI-Abhängigkeit.
- **Wo umgesetzt:**
  - **Frontend:** `plans/+page.svelte` (Empfehlung-Karte, `recommended`-Klasse auf Plan-Karten); `profile/+page.svelte` (Smart-Hint-Card im Dashboard-Grid).
  - **Backend:** Empfehlungslogik und Hint-Berechnung in den jeweiligen `+page.server.ts`-Dateien.
- **Referenz:** Beschreibung in Kap. 3.4.1 (Wichtige Screens)
- **Aus Evaluation abgeleitet?:** Nein – Teil der initialen Produktvision „Train smarter".

## 5. Projektorganisation [Optional]
- **Repository & Struktur:** _[Folgt – GitHub-URL wird ergänzt]_
- **Issue-Management:** _[Folgt – weitere Informationen werden ergänzt]_
- **Commit-Praxis:** _[Folgt – weitere Informationen werden ergänzt]_

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools
- **Eingesetzte Tools**: _[Folgt – z. B. Claude (Anthropic), GitHub Copilot, ChatGPT; Version/Variante wenn bekannt]_
- **Zweck & Umfang**: _[Folgt – z. B. Codevorschläge, Komponentenstruktur, CSS, Debugging, Dokumentation; Ausmass wird ergänzt]_
- **Eigene Leistung (Abgrenzung):** _[Folgt – eigenständig erarbeitete und überarbeitete Teile werden ergänzt]_

### 6.2 Prompt-Vorgehen
_[Folgt – Beschreibung der grundlegenden Vorgehensweise beim Prompting wird ergänzt]_

### 6.3 Reflexion
_[Folgt – Nutzen, Grenzen, Risiken und Qualitätssicherung werden ergänzt]_

## 7. Anhang [Optional]
- **Quellen:** Bootstrap 5 (MIT Licence), Bootstrap Icons (MIT Licence), SvelteKit (MIT Licence)
- **Testskript & Materialien:** _[Folgt]_
- **Rohdaten/Auswertung:** _[Folgt]_
