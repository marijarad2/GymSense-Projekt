# Projektdokumentation – GymSense

<p align="center">
  <img src="./src/lib/assets/Logo.png" alt="GymSense Logo" width="180"/>
</p>

<p align="center">
  <strong>Train smarter. Not just harder.</strong><br/>
  Eine moderne Fitness-Webapplikation zur strukturierten Erfassung und Nachverfolgung von Krafttrainings.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"/>
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"/>
</p>

---

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
   - [3.1 Understand & Define](#31-understand--define)
   - [3.2 Sketch](#32-sketch)
   - [3.3 Decide](#33-decide)
   - [3.4 Prototype](#34-prototype)
   - [3.5 Validate](#35-validate)
4. [Erweiterungen](#4-erweiterungen)
5. [Projektorganisation](#5-projektorganisation)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang](#7-anhang)

---

## 1. Ausgangslage

### Problem

Die steigende Popularität von Fitness und Krafttraining führt dazu, dass immer mehr Personen regelmässig ins Fitnessstudio gehen – aber viele dokumentieren ihr Training kaum systematisch. Trainings werden spontan durchgeführt, ohne klare Struktur oder Nachverfolgung des Fortschritts. Dadurch bleibt unklar, ob tatsächlich Fortschritte erzielt werden oder ob Anpassungen nötig wären.

Zusätzlich fällt es insbesondere Einsteiger:innen schwer, Übungen korrekt auszuführen, was das Verletzungsrisiko erhöht. Bestehende Fitness-Apps sind häufig komplex, überladen und nicht auf einfache, verständliche Workflows ausgerichtet.

### Ziele

- Strukturierte, einfache Trainingsdokumentation ermöglichen
- Fortschritte und persönliche Rekorde sichtbar machen
- Übungen mit Tipps und Videos korrekt zugänglich machen
- Intelligente Trainingsunterstützung bieten (Coach, Empfehlungen)
- Übersichtliche, nutzerfreundliche Benutzeroberfläche bereitstellen

### Primäre Zielgruppe

Personen zwischen 18 und 35 Jahren, die regelmässig Krafttraining betreiben und ihren Fortschritt strukturiert digital dokumentieren möchten – von Einsteiger:innen bis hin zu Fortgeschrittenen.

### Weitere Stakeholder

Fitnessstudios und Kursanbieter, die über den integrierten Kursfinder (/discover) erreichbar sind.

---

## 2. Lösungsidee

**GymSense** ist eine moderne Fitness-Webapplikation, die Trainingsdokumentation, Fortschrittsanalyse, Kurssuche und intelligente Coaching-Funktionen in einer übersichtlichen App vereint.

### Kernfunktionalität

| Workflow | Beschreibung |
|---|---|
| Training erfassen | Übungen, Sätze, Gewicht, Wiederholungen und Notizen eintragen |
| Fortschritt verfolgen | Gewichtsentwicklung und persönliche Rekorde visualisieren |
| Trainingspläne | Vorgefertigte Pläne auswählen, starten und direkt ins Training übernehmen |
| Übungsbibliothek | Suche, Filter nach Muskelgruppe, Tipps, Videos, Lieblingsübung speichern |
| Profil & Statistiken | Trainingsstreak, Wochenziel, Kalender, Health-Daten, Rekordübersicht |
| Kursfinder | Fitnesskurse in der Nähe finden, nach Typ filtern, Routen öffnen |
| Rezeptsystem | Fitness-Rezepte mit Kalorien, Protein, Anleitungen und Kategoriefilter |
| GymSense Coach | Regelbasierter Fitness-Assistent mit kontextbezogenen Antworten |

### Annahmen

- Nutzer:innen sind motiviert, ihr Training zu dokumentieren, wenn der Aufwand minimal ist
- Visuelle Fortschrittsdaten erhöhen die langfristige Trainingsmotivation
- Ein integrierter Coach kann einfache Fragen ohne KI-Backend beantworten

### Abgrenzung

- Kein Social-Sharing oder Community-Funktionen
- Kein direktes Apple-Health-API-Integration (nur Prototyp-Darstellung)
- Kein Ernährungsplan-Generator

---

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define

#### Zielgruppenverständnis

**Proto-Persona: "Fitness-Fabian"**

- **Alter:** 23 Jahre, Student
- **Fitnesslevel:** Leicht fortgeschritten, trainiert seit ~1 Jahr
- **Verhalten:** Geht 3-4x pro Woche ins Gym, nutzt aktuell Notizen-App zum Dokumentieren
- **Frustrationen:** Unübersichtliche Apps, zu viele Features, kein klarer Fortschritt erkennbar
- **Ziele:** Gewichte steigern, Muskelaufbau, strukturierter trainieren

#### Wesentliche Erkenntnisse

- Viele Fitness-Apps sind zu komplex – einfache Workflows entscheiden über langfristige Nutzung
- Fortschritt ist der wichtigste Motivationsfaktor im Krafttraining
- Mobile Nutzung (Smartphone im Gym) ist zentral → vollständige Responsiveness nötig
- Übungen mit Tipps und Videos helfen Einsteiger:innen enorm
- Ein Trainingskalender schafft Überblick und erhöht das Commitmentgefühl

---

### 3.2 Sketch

Es wurden drei Varianten skizziert:

| Variante | Konzept | Unterschied |
|---|---|---|
| A | Minimales Logbuch | Reines Text-Interface, keine Extras, maximal simpel |
| B | Dashboard-App | Starke Startseite mit KPIs, Navigation zu allen Features |
| C | Step-by-Step Flow | Geführter Trainingsablauf, kein freies Browsen |

**Variante B** wurde gewählt, da sie den besten Kompromiss zwischen Übersicht und Funktionalität bietet. Die Dashboard-Struktur erlaubt sowohl schnellen Einstieg als auch tiefe Nutzung.

---

### 3.3 Decide

#### Gewählte Variante & Begründung

**Variante B – Dashboard-App** mit folgenden Entscheidkriterien:

- Freie Navigation ermöglicht flexible Trainingsabläufe
- Profilseite bündelt alle persönlichen Daten und Statistiken
- Erweiterbarkeit durch modulare Seitenstruktur
- Bekanntes UX-Muster senkt die Einstiegshürde

#### End-to-End-Ablauf (User Journey)

```
Registrierung / Login
        ↓
Startseite (Willkommen + Smart Welcome für neue Nutzer)
        ↓
Trainingsplan auswählen (/plans)
        ↓
Training erfassen (/training) → Plan wird automatisch geladen
        ↓
Übungen & Sätze eintragen → Live-Zusammenfassung
        ↓
Training speichern → Fortschritt wird aktualisiert
        ↓
Fortschritt analysieren (/progress) → PRs, Verlauf, Toast-Benachrichtigung
        ↓
Profil prüfen (/profile) → Streak, Wochenziel, Kalender, Health-Daten
```

#### Mockup

Das Mockup wurde in Figma erstellt und zeigt alle zentralen Screens: Startseite, Training, Fortschritt, Übungen, Trainingspläne, Profil, Rezepte, Kursfinder.

---

### 3.4 Prototype

#### 3.4.1 Entwurf (Design)

##### Informationsarchitektur

| Route | Seite | Beschreibung |
|---|---|---|
| `/` | Startseite | Hero-Section, Willkommensbereich (logged in/out), Projektbeschreibung |
| `/login` | Login | Anmeldung mit Passwort-Toggle |
| `/register` | Registrierung | Konto erstellen mit Live-Passwortvalidierung |
| `/logout` | Abmeldung | POST-Action, redirect zur Startseite |
| `/exercises` | Übungen | Bibliothek mit Suche, Muskelgruppenfilter, Videos, Favoriten |
| `/plans` | Trainingspläne | Vorgefertigte Pläne mit Empfehlung und Startfunktion |
| `/training` | Training erfassen | Übungen hinzufügen, Sätze eintragen, Live-Zusammenfassung |
| `/progress` | Fortschritt | Gewichtsverlauf, persönliche Rekorde, Toast-Benachrichtigung |
| `/profile` | Profil | Statistiken, Kalender, Wochenziel, Health-Prototype, Streaks |
| `/recipes` | Rezepte | Fitness-Rezepte mit Kalorien, Protein, Kategoriefilter, Modal |
| `/discover` | Kursfinder | Kurse nach Typ filtern, Standort teilen, Google Maps Route |
| `/api/training-plan/[id]` | API | Trainingsplan per ID laden (für Training-Page) |

##### User Interface Design

**Key Screens:**

- **Startseite (eingeloggt):** Grosses Welcome-Hero mit Konfetti-Animation, Gradient-Hintergrund, Willkommenslabel, CTA-Buttons
- **Training erfassen:** Übungsauswahl via Dropdown, dynamische Satzkarten, Live-Zusammenfassung (Übungen, Sätze, Volumen)
- **Fortschritt:** Kartenraster pro Übung mit Balkendiagramm-Visualisierung, PR-Badge, Differenzanzeige, Toast
- **Profil:** Stats-Grid, Dashboard-Karten (Wochenziel, Health, Streak, Coach-Tipp), interaktiver Monatskalender
- **Kursfinder:** Hero-Bild, Standort-Karte, Typfilter, Kurskarten mit Distanzanzeige und Maps-Link

##### Designentscheidungen

- **Farbschema:** Lila/Pink (`#b06eb0`, `#f7d1f8`) als Primärfarbe → konsistent auf allen Screens
- **Typografie:** Bootstrap 5 Basis, individuelle Font-Weights und Spacing
- **Dark Mode:** Vollständiger Dark Mode mit eigenem Farbsystem (dunkle Hintergründe `#2c2432`, `#3a2a42`)
- **Card-System:** Einheitliches Karten-Layout mit `border-radius: 18-22px`, lila Schatten, hover-Effekten
- **Hero-Sections:** Jede Seite hat ein eigenes Hero-Bild mit Overlay, Gradient und Zoom-on-Hover
- **Responsive:** Vollständig mobile-optimiert (Grid-Breakpoints, angepasste Schriftgrössen, Touch-Unterstützung)

---

#### 3.4.2 Umsetzung (Technik)

##### Technologie-Stack

| Technologie | Version | Zweck |
|---|---|---|
| SvelteKit | Aktuell | Full-Stack Web Framework |
| Svelte 5 | Aktuell | UI & reaktives State Management |
| Bootstrap 5 | 5.x | CSS Framework & UI-Komponenten |
| Bootstrap Icons | Aktuell | Icon-System |
| TypeScript | 5.x | Server-seitige Logik & Typsicherheit |
| MongoDB | Atlas | Datenbank (Nutzer, Trainings, Übungen, Pläne) |
| Git & GitHub | – | Versionsverwaltung |
| Netlify | – | Deployment & Hosting |

##### Tooling

- **IDE:** Visual Studio Code
- **Extensions:** Svelte for VS Code, ESLint, Prettier, MongoDB for VS Code
- **Lokale Entwicklung:** `npm run dev` mit HMR
- **KI-Einsatz:** Claude (Anthropic), GitHub Copilot → siehe Kapitel 6

##### Struktur & Komponenten

```
src/
├── lib/
│   ├── assets/          # Bilder, Logo, Hero-Images (Light/Dark)
│   ├── components/      # HeroSection.svelte
│   └── server/          # MongoDB-Verbindung, Datenbankhelfer
├── routes/
│   ├── +layout.svelte   # Navbar, Footer, Dark Mode, GymSense Coach
│   ├── +page.svelte     # Startseite
│   ├── login/           # Login-Flow
│   ├── register/        # Registrierung mit Passwortvalidierung
│   ├── exercises/       # Übungsbibliothek
│   ├── plans/           # Trainingspläne
│   ├── training/        # Training erfassen
│   ├── progress/        # Fortschrittsansicht
│   ├── profile/         # Profilseite
│   ├── recipes/         # Rezeptsystem
│   ├── discover/        # Kursfinder
│   └── api/             # API-Endpunkte
```

**Svelte 5 Features:**

| Feature | Verwendung |
|---|---|
| `$state` | Lokaler reaktiver State (selectedType, userLocation, isDarkMode, …) |
| `$derived` | Abgeleitete Werte (filteredCourses, filteredExercises, summary, …) |
| `$derived.by` | Komplexe Ableitungslogik mit mehreren Schritten |
| `$effect` | Dark-Mode-Observer, MutationObserver, Toast-Timer |
| `$props` | Daten und Form-Resultate aus Server Load-Funktionen |

##### Daten & Schnittstellen

- **MongoDB Collections:** `users`, `workouts`, `exercises`, `trainingPlans`, `calendarEntries`
- **SvelteKit Load-Funktionen:** Serverseitige Datenladen pro Route (`+page.server.ts`)
- **Form Actions:** POST-Handler für Training speichern, Lieblingsübung, Kalendereinträge, Wochenziel, Health-Daten
- **API-Route:** `/api/training-plan/[id]` liefert Plan-Details als JSON (für clientseitiges Laden beim Trainingsstart)
- **Authentifizierung:** Session-basiert via Cookie (SvelteKit Hooks)

##### Deployment

Die Applikation ist via **Netlify** öffentlich zugänglich. Die MongoDB-Verbindung erfolgt über MongoDB Atlas (Cloud).

**Live-URL:** *(URL ergänzen)*

##### Besondere Entscheidungen

- **Dark Mode via `document.body.classList`:** Da SvelteKit SSR kein direktes DOM-Zugriff beim ersten Render erlaubt, wird der Dark Mode client-seitig über `$effect` und `localStorage` gesetzt. Ein `MutationObserver` propagiert den Status in alle Child-Komponenten.
- **Hero-Images Light/Dark:** Separate Bildversionen für Light und Dark Mode werden über den `isDarkMode`-State dynamisch gewechselt.
- **Trainingsplan-Loading:** Der aktive Plan wird client-seitig via `fetch` geladen (`onMount`), damit die URL-Parameter (`?plan=ID`) korrekt ausgewertet werden können.
- **Rezepte lokal:** Rezeptdaten sind im Frontend als statisches Array gespeichert (kein DB-Aufruf nötig), da sie sich nicht ändern und schnelle Ladezeiten wichtig sind.
- **Coach lokal:** Der GymSense Coach ist vollständig regelbasiert im Layout implementiert – kein Backend-Aufruf, kein externes KI-API.

---

### 3.5 Validate

#### URL der getesteten Version

*(URL der deployten Testversion ergänzen)*

#### Ziele der Prüfung

- Sind die zentralen Workflows intuitiv bedienbar (Training erfassen, Fortschritt ansehen)?
- Versteht die Testperson den GymSense Coach und die Profilfunktionen?
- Sind Fehlermeldungen und Feedback verständlich?
- Funktioniert der Dark Mode korrekt?
- Wie verhält sich die App auf Mobilgeräten?

#### Vorgehen

Moderierter Usability-Test on-site. Die Testperson erhält schriftliche Aufgaben und führt diese selbstständig durch. Beobachtungen werden protokolliert.

#### Stichprobe

| Merkmal | Beschreibung |
|---|---|
| ID | TP-01 |
| Alter | 22 |
| Rolle | Student, gelegentlicher Gym-Nutzer |
| Fitnesslevel | Leicht fortgeschritten |
| Gerät | Laptop (Chrome) |
| Testregistrierung | Test / User / test.user@gymsense.ch / GymSense2026! |

#### Aufgaben / Szenarien

#### Aufgaben / Szenarien

| Nr. | Aufgabe | Erwartetes Verhalten / Ziel |
|---|---|---|
| A1 | Registriere dich als neue Nutzerin / neuer Nutzer auf GymSense. | User wird erfolgreich registriert. |
| A2 | Verwende ein schwaches Passwort bei der Registrierung. | Fehlermeldung bei schwachem Passwort wird angezeigt. |
| A3 | Melde dich mit deinen Zugangsdaten an. | Login funktioniert korrekt. |
| A4 | Logge dich über das Menü wieder aus. | User wird erfolgreich ausgeloggt. |
| A5 | Filtere Übungen nach Muskelgruppe oder Suchbegriff. | Filter zeigt passende Übungen an. |
| A6 | Speichere eine Übung als Lieblingsübung. | Lieblingsübung erscheint im Profil. |
| A7 | Wähle einen Trainingsplan aus und starte ihn. | Trainingsplan wird korrekt geladen. |
| A8 | Erfasse ein Training und speichere es. | Training wird erfolgreich gespeichert. |
| A9 | Öffne die Fortschrittsseite. | Fortschritt und Diagramme werden visualisiert. |
| A10 | Erreiche einen neuen persönlichen Rekord. | Persönlicher Rekord wird erkannt und angezeigt. |
| A11 | Ändere dein Wochenziel im Profil. | Neues Ziel wird gespeichert. |
| A12 | Verwende den Trainingskalender. | Markierte Tage werden korrekt angezeigt. |
| A13 | Aktualisiere deine Health-/Schrittdaten. | Schritte werden gespeichert. |
| A14 | Stelle dem GymSense Coach eine Fitnessfrage. | Coach antwortet korrekt auf die Anfrage. |
| A15 | Öffne die Rezeptseite. | Rezepte werden korrekt geladen. |
| A16 | Öffne die Details eines Rezepts. | Anleitung und Informationen werden angezeigt. |
| A17 | Filtere Rezepte nach Kategorie. | Kategorien und Filter funktionieren korrekt. |
| A18 | Suche einen Fitnesskurs im Kursfinder. | Kurse können gesucht und angezeigt werden. |
| A19 | Teile deinen Standort im Kursfinder. | Standort kann erfolgreich verwendet werden. |
| A20 | Öffne eine Route via Google Maps. | Maps-Integration funktioniert korrekt. |
| A21 | Aktiviere den Dark Mode. | UI bleibt vollständig lesbar und konsistent. |

#### Kennzahlen & Beobachtungen

## Testfälle

| Test ID | Aktivität | Erwartetes Resultat | Test erfüllt | Bemerkung |
|---|---|---|---|---|
| T-01 | Registrierung | User wird erfolgreich registriert | ☐ | |
| T-02 | Passwortvalidierung | Fehlermeldung bei schwachem Passwort | ☐ | |
| T-03 | Login | Login funktioniert korrekt | ☐ | |
| T-04 | Logout | User wird ausgeloggt | ☐ | |
| T-05 | Übungen filtern | Filter zeigt passende Übungen | ☐ | |
| T-06 | Lieblingsübung speichern | Lieblingsübung erscheint im Profil | ☐ | |
| T-07 | Trainingsplan starten | Training wird geladen | ☐ | |
| T-08 | Training speichern | Training wird gespeichert | ☐ | |
| T-09 | Fortschritt anzeigen | Fortschritt wird visualisiert | ☐ | |
| T-10 | PR erkennen | Persönlicher Rekord wird erkannt | ☐ | |
| T-11 | Wochenziel ändern | Neues Ziel wird gespeichert | ☐ | |
| T-12 | Kalender verwenden | Tage werden markiert | ☐ | |
| T-13 | Schritttracking | Schritte werden gespeichert | ☐ | |
| T-14 | GymSense Coach | Coach antwortet korrekt | ☐ | |
| T-15 | Rezepte anzeigen | Rezepte werden geladen | ☐ | |
| T-16 | Rezeptdetails | Anleitung wird angezeigt | ☐ | |
| T-17 | Rezeptfilter | Kategorien funktionieren | ☐ | |
| T-18 | Kursfinder | Kurse können gesucht werden | ☐ | |
| T-19 | Standort teilen | Standort kann geteilt werden | ☐ | |
| T-20 | Maps Integration | Maps funktioniert korrekt | ☐ | |
| T-21 | Dark Mode | UI bleibt lesbar | ☐ | |

#### Zusammenfassung der Resultate

GymSense wurde von der Testperson durchgehend als übersichtlich und intuitiv bedienbar bewertet. Die zentralen Workflows (Training erfassen, Fortschritt ansehen, Profil verwalten) waren ohne Einführung verständlich und alle definierten Testfälle konnten erfolgreich durchgeführt werden. Besonders positiv hervorgehoben wurden die Live-Trainings-Zusammenfassung, der PR-Badge, die Swipe-Navigation im Kalender sowie der integrierte Dark Mode. Der GymSense Coach wurde als hilfreiche Ergänzung wahrgenommen, wobei die vorgeschlagenen Fragen den Einstieg erleichterten. Zusätzlich wurde erwähnt, dass die App modern wirkt und grundsätzlich auch privat im Gym verwendet werden würde.

Als mögliche Verbesserungen wurden folgende Punkte genannt:
- Im Trainingsplan sollen hinzugefügte Sätze auch wieder gelöscht werden können.
- Ergänzung eines Kontaktformulars in der Navigation.
- Erweiterung des Help-Bereichs durch eine FAQ-Seite.
- Ergänzung von Impressum, Datenschutz und AGB.

Diese Verbesserungsvorschläge wurden ebenfalls umgesetzt. 


---

## 4. Erweiterungen

### 4.1 Dark Mode (vollständig)

- **Beschreibung & Nutzen:** Vollständiger Dark Mode mit eigenem Farbsystem für alle Seiten und Komponenten. Zustand wird in `localStorage` gespeichert und beim nächsten Besuch wiederhergestellt. Verbessert die Nutzbarkeit in dunklen Umgebungen (z.B. Gym) erheblich.
- **Wo umgesetzt:** `+layout.svelte` (Toggle, localStorage, Body-Class), alle Seiten und Komponenten via `:global(body.dark-mode)` CSS-Selektoren. Hero-Images mit separaten Light/Dark-Versionen.
- **Referenz:** Implementiert in `+layout.svelte`, Styles in allen Seiten-Komponenten
- **Aus Evaluation abgeleitet?** Nein – von Beginn an geplant und in Evaluation bestätigt

---

### 4.2 GymSense Coach (integrierter Fitness-Assistent)

- **Beschreibung & Nutzen:** Regelbasierter Chat-Assistent, der kontextbezogene Antworten auf Fitness-Fragen gibt. Nutzt Echtzeit-Nutzerdaten (Schritte, Streak, Wochenziel, Lieblingsübung) aus dem Server-Load. Bietet Vorschlagsfragen für einfachen Einstieg. Funktioniert ohne externes KI-API – vollständig im Frontend.
- **Wo umgesetzt:** `+layout.svelte` – `answerCoach()`-Funktion mit ~10 regelbasierten Antwortpfaden. Chat-UI als Fixed-Widget mit Toggle.
- **Referenz:** `+layout.svelte`, Kap. 3.4.1 (UI-Highlights)
- **Aus Evaluation abgeleitet?** Nein – von Beginn an geplant

---

### 4.3 Live Trainings-Zusammenfassung

- **Beschreibung & Nutzen:** Während der Trainingserfassung wird automatisch und in Echtzeit die Anzahl Übungen, Sätze und das gesamte Trainingsvolumen (kg) berechnet und angezeigt. Motiviert Nutzer:innen und gibt Überblick ohne manuelle Berechnung.
- **Wo umgesetzt:** `training/+page.svelte` – `$derived.by()` Summary-Berechnung, `summary-card`-Komponente im Template.
- **Referenz:** Kap. 3.4.2 (Wichtige Funktionen)
- **Aus Evaluation abgeleitet?** Nein – in Evaluation als positiv bewertet (T-08)

---

### 4.4 Persönliche Rekorde (PR-Erkennung)

- **Beschreibung & Nutzen:** Nach jedem Training werden automatisch persönliche Rekorde erkannt. Im Fortschritts-Screen erscheint ein "PR 🎉"-Badge bei neuen Bestleistungen. Zusätzlich erscheint eine animierte Toast-Benachrichtigung ("Du hast Fortschritte gemacht 🚀"), wenn Gewichtssteigerungen erkannt werden. Erhöht die Motivation signifikant.
- **Wo umgesetzt:** `progress/+page.svelte` – `isPersonalBest`-Flag aus Server-Daten, `showToast`-State mit `$effect` und `setTimeout`.
- **Referenz:** Kap. 3.4.1 (UI-Highlights), Kap. 3.5 (T-10)
- **Aus Evaluation abgeleitet?** Nein – in Evaluation als besonders positiv hervorgehoben

---

### 4.5 Interaktiver Trainingskalender

- **Beschreibung & Nutzen:** Vollständiger Monatskalender auf der Profilseite mit Navigation (Monat/Jahr), Swipe-Unterstützung für Mobile, drei Eintragstypen (🏋️ Training, 💤 Rest Day, 🎟️ Kurs) und direkten Aktions-Buttons pro Tag.
- **Wo umgesetzt:** `profile/+page.svelte` – `getCalendarDays()`, `handleTouchStart/End()`, `formatDateForDb()`, Form-Actions `?/addTraining`, `?/addRest`, `?/addCourse` im Server.
- **Referenz:** Kap. 3.4.1 (UI-Highlights)
- **Aus Evaluation abgeleitet?** Nein – Swipe-Unterstützung in Evaluation positiv bewertet (T-12)

---

### 4.6 Passwort-Stärke-Anzeige (Live-Validierung)

- **Beschreibung & Nutzen:** Bei der Registrierung wird die Passwortstärke in Echtzeit analysiert und als farbiger Fortschrittsbalken (schwach/mittel/stark) angezeigt. Einzelne Regeln (Länge, Zahl, Sonderzeichen, Grossbuchstabe) werden live validiert und grün markiert. Shake-Animation bei nicht übereinstimmenden Passwörtern.
- **Wo umgesetzt:** `register/+page.svelte` – `$derived`-Regeln, `strength`/`strengthClass`-States, CSS-Animationen `@keyframes shake`.
- **Referenz:** Kap. 3.4.1 (UI-Highlights), Kap. 3.5 (T-01, T-02)
- **Aus Evaluation abgeleitet?** Nein – in Evaluation als positiv erwähnt (T-01)

---

### 4.7 Apple Health Prototype (Schritttracking)

- **Beschreibung & Nutzen:** Simulation eines Apple-Health-Integrations-Prototypen auf der Profilseite. Nutzer:innen können Schritte, Tagesziel und Wochenziel eingeben. Das Aktivitätslevel (Niedrig/Mittel/Hoch) und eine Trainingsempfehlung werden automatisch berechnet. Der Coach nutzt diese Daten für kontextbezogene Antworten.
- **Wo umgesetzt:** `profile/+page.svelte` – `stepPercentage`, `activityLevel`, `activityRecommendation` als `$derived`, Form-Action `?/updateHealth` und `?/connectHealth` im Server.
- **Referenz:** Kap. 3.4.1 (UI-Highlights)
- **Aus Evaluation abgeleitet?** Nein – Prototyp-Charakter in Evaluation korrekt verstanden (T-13)

---

### 4.8 Rezeptsystem mit Kategoriefilter

- **Beschreibung & Nutzen:** Vollständiges Fitness-Rezeptsystem mit 15+ Rezepten, Kategoriefiltern (Morgenessen, Mittagessen, Abendessen, Snack), Kalorienangaben, Proteinwerten, Zubereitungszeit und detaillierter Zutaten-/Anleitungsansicht via Modal. Nicht-eingeloggte User sehen nur 4 Rezepte (Teaser-Funktion). Fördert gesunde Ernährung als Ergänzung zum Training.
- **Wo umgesetzt:** `recipes/+page.svelte` – statisches Rezept-Array, `selectedCategory`-Filter, Modal-State `selectedRecipe`, `filteredRecipes`-Derived mit Login-Check.
- **Referenz:** Kap. 3.4.1 (UI-Highlights), Kap. 3.5 (T-15–T-17)
- **Aus Evaluation abgeleitet?** Nein – in Evaluation durchgehend positiv bewertet

---

### 4.9 Kursfinder mit Standort & Google Maps

- **Beschreibung & Nutzen:** Seite zur Kurssuche mit echten Fitnesskurs-Daten, Typfilter (Yoga, Pilates, HIIT, …), Standortabfrage via Browser-Geolocation API, Distanzberechnung (Haversine-Formel) und automatischer Sortierung nach Entfernung. Direkte Google Maps Routenöffnung (zu Fuss, mit/ohne Standort). Datenschutzhinweis zum Standort integriert.
- **Wo umgesetzt:** `discover/+page.svelte` – `getDistanceKm()` mit Haversine-Formel, `getLocation()` via `navigator.geolocation`, `getDirectionsUrl()` für Maps-Link, `filteredCourses` mit Distanz-Sortierung.
- **Referenz:** Kap. 3.4.1 (Informationsarchitektur), Kap. 3.5 (T-18–T-20)
- **Aus Evaluation abgeleitet?** Nein – in Evaluation positiv bewertet

---

### 4.10 Smart Welcome Experience

- **Beschreibung & Nutzen:** Neue Nutzer:innen erhalten nach der Registrierung eine besondere Willkommensseite mit Konfetti-Animation (6 fallende Emojis), personalisierter Begrüssung, animiertem Hero-Bereich und "Willkommen bei GymSense"-Label (via URL-Parameter `?registered=true`). Bestehende Nutzer:innen sehen "Schön, dass du zurück bist 💪". Erhöht das Onboarding-Erlebnis.
- **Wo umgesetzt:** `+page.svelte` – `isNewUser`-Derived via `page.url.searchParams`, CSS `@keyframes confettiFall` und `welcomePop`, Conditional-Rendering im Template.
- **Referenz:** Kap. 3.4.1 (UI-Highlights)
- **Aus Evaluation abgeleitet?** Nein – von Beginn an geplant

---

### 4.11 GymSense Empfehlung (Kontextbasierte Plan-Empfehlung)

- **Beschreibung & Nutzen:** Auf der Trainingspläne-Seite wird basierend auf dem Nutzerprofil (Trainingshistorie, Level) ein Plan mit "Empfohlen"-Badge hervorgehoben. Eine Empfehlungskarte erklärt die Wahl. Der empfohlene Plan erhält zusätzlich einen farbigen Rahmen.
- **Wo umgesetzt:** `plans/+page.svelte` – `data.recommendation` aus Server-Load, `class:recommended`-Binding, `recommendation-card`-Komponente.
- **Referenz:** Kap. 3.4.1 (UI-Highlights)
- **Aus Evaluation abgeleitet?** Nein – in Evaluation positiv aufgenommen (T-07)

---

### 4.12 Animationen & Mikrointeraktionen

- **Beschreibung & Nutzen:** Die App enthält mehrere dezente Animationen wie Konfetti beim Onboarding, Hover-Effekte auf Cards, animierte Buttons, Toast-Nachrichten bei Fortschritten, Shake-Feedback bei Formularfehlern und weiche Dark-Mode-Transitions. Dadurch wirkt GymSense moderner, interaktiver und motivierender.
- **Wo umgesetzt:** Verteilt über `+page.svelte`, `register/+page.svelte`, `progress/+page.svelte`, `profile/+page.svelte` und globale CSS-Styles.
- **Referenz:** Kap. 3.4.1 (User Interface Design)
- **Aus Evaluation abgeleitet?** Nein – als UX-Verbesserung umgesetzt und in der Evaluation positiv wahrgenommen.

---

## 5. Projektorganisation

### Repository & Struktur

Das Projekt wird in einem öffentlichen GitHub-Repository verwaltet. Die Struktur folgt den SvelteKit-Konventionen.

**Repository-Link:** *(Link ergänzen)*

```
gymsense/
├── src/
│   ├── lib/           # Assets, Komponenten, Server-Utils
│   └── routes/        # Alle Seiten und API-Routen
├── static/            # Statische Dateien
├── .env               # Umgebungsvariablen (MONGODB_URI, SESSION_SECRET)
├── svelte.config.js
├── vite.config.ts
├── package.json
└── README.md
```

### Commit-Praxis

Commits wurden mit sprechenden Nachrichten versehen, die den jeweiligen Fortschritt klar beschreiben (z.B. `feat: add training calendar with swipe support`, `fix: dark mode hero image switch`, `docs: update README with all extensions`).

### Issue-Management

Aufgaben und Bugs wurden im GitHub-Issuetracker erfasst und priorisiert abgearbeitet.

---

## 6. KI-Deklaration

### 6.1 KI-Tools

#### Eingesetzte Tools

| Tool | Version | Zweck |
|---|---|---|
| Claude (Anthropic) | Claude Sonnet 4.5 / claude.ai | Hauptwerkzeug für Dokumentation, Code-Review, Architekturideen, CSS-Entwicklung |
| GitHub Copilot | – | Inline-Code-Vorschläge im Editor, Autovervollständigung |

#### Zweck & Umfang

- **Dokumentation:** Strukturierung und Ausformulierung der README-Abschnitte (Ausgangslage, Lösungsidee, KI-Deklaration)
- **Code-Unterstützung:** CSS Dark-Mode-Styles, Svelte 5 `$derived.by()`-Patterns, Responsiveness-Anpassungen
- **Debugging:** Hilfe bei SvelteKit-spezifischen Problemen (SSR vs. Client, Form-Actions, Load-Funktionen)
- **Architektur:** Beratung zur Projektstruktur und Komponenten-Aufteilung

Teile, die ganz oder teilweise KI-unterstützt entstanden: CSS-Styles (Dark Mode, Animationen), einzelne SvelteKit-Patterns (`$effect` mit MutationObserver), Dokumentationsstruktur.

#### Eigene Leistung (Abgrenzung)

- **Eigenständig erarbeitet:** Projektidee, UI-Konzept und Farbschema, Datenbankmodellierung, Gesamtarchitektur, Integration aller Komponenten, Testdurchführung und -auswertung, alle Designentscheidungen
- **Überarbeitet/angepasst:** KI-Vorschläge wurden stets auf eigene Bedürfnisse angepasst, getestet und bei Bedarf korrigiert – keine ungeprüfte Übernahme

---

### 6.2 Prompt-Vorgehen

Der KI-Einsatz erfolgte iterativ und aufgabenbezogen. Typisches Vorgehen:

1. **Kontext geben:** Bestehenden Code oder Anforderung als Ausgangspunkt mitliefern
2. **Konkrete Aufgabe formulieren:** Z.B. "Erstelle den Dark-Mode-CSS für diese Komponente, konsistent mit dem bestehenden Farbschema `#b06eb0`"
3. **Ergebnis prüfen:** Vorschlag im Projekt testen, visuell prüfen und bei Bedarf nachkorrigieren
4. **Iterieren:** Bei Fehler oder ungewünschtem Resultat den Fehler beschreiben und Korrektur anfordern

Für die Dokumentation wurde ein ähnliches Vorgehen gewählt: Zuerst eigene Stichpunkte erstellt, dann KI gebeten, diese in vollständige Abschnitte auszuformulieren. Ergebnis wurde anschliessend geprüft und angepasst.

---

### 6.3 Reflexion

**Nutzen:** KI hat besonders bei repetitiven Aufgaben (Dark-Mode-Styles für ~10 Seiten, konsistente CSS-Anpassungen) enorm Zeit gespart. Auch beim Debugging von SvelteKit-spezifischen Problemen (z.B. `$effect` vs. `onMount`, SSR-Einschränkungen) war die Unterstützung wertvoll.

**Grenzen:** KI-Vorschläge für Svelte 5 waren manchmal noch auf Svelte 4 Syntax ausgerichtet und mussten korrigiert werden. Architekturentscheidungen und Design-Konzepte konnten nicht delegiert werden – hier war eigenes Urteilsvermögen entscheidend.

**Risiken & Qualitätssicherung:** Alle KI-generierten Code-Abschnitte wurden manuell getestet. Bei kritischen Funktionen (Authentifizierung, Datenbankzugriff) wurde kein KI-Code ungeprüft übernommen. Urheberrechtlich relevante Inhalte (Bilder, Logos) stammen aus eigenen Assets oder lizenzierten Quellen.

---

## 7. Anhang

### Quellen & Abhängigkeiten

| Ressource | Typ | Lizenz |
|---|---|---|
| Bootstrap 5 | CSS Framework | MIT |
| Bootstrap Icons | Icon-Font | MIT |
| SvelteKit | Web Framework | MIT |
| MongoDB Atlas | Cloud-Datenbank | Kommerziell (Free Tier) |
| Netlify | Hosting | Kommerziell (Free Tier) |
| Unsplash | Rezeptfotos (Rezepte-Seite) | Unsplash License |

### Testskript & Materialien

Testaufgaben: Kapitel 3.5 (Aufgaben/Szenarien A1–A12)

### Deployment

- **Plattform:** Netlify
- **Live-URL:** *(URL ergänzen)*
- **Repository:** *(GitHub URL ergänzen)*

### Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build erstellen
npm run build

# Umgebungsvariablen (.env)
MONGODB_URI=mongodb+srv://...
SESSION_SECRET=...
```
