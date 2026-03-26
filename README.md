# Next Learning — Phenomenal Quiz

Ein Lern- und Strukturierungswerkzeug auf Basis von **Next.js 16**, das das Prinzip des **phänomenalen Objekts** auf ein Software-Programm anwendet.

**Autor:** Gromowik Serge — [serge.gromowik@gmail.com](mailto:serge.gromowik@gmail.com)
**Repository:** [github.com/Gromowik/next-project](https://github.com/Gromowik/next-project)

---

## Was diese Anwendung ist

Diese Anwendung befindet sich im Zustand des **mittleren Schnitts**: das Programm ist vollständig als phänomenales Objekt (POP) beschrieben — mit GTC, Beacons, Terminologie und Quiz-Engine — und bereit zur individuellen Erweiterung durch eigene BD-Projektionen.

Das bedeutet praktisch:
- Das Programm versteht sich selbst als strukturiertes Objekt mit O, M+, R, GTC
- Es kann als Hülle (PEP) auf andere Programme angewendet werden
- Jeder kann es herunterladen, studieren und auf das eigene Projekt übertragen

---

## Seiten

| URL | Inhalt |
|-----|--------|
| `/` | Startseite mit Navigation |
| `/philosophy` | Grundphilosophie des Projekts — PEP, 1×1=1, Rf als Richtungsweiser |
| `/terms` | Detaillierte Terminologie — O, M, R, GTC, TDB, BD, POP, PEP, The Big Three |
| `/guide` | Anleitung: herunterladen, installieren, eigenes Programm als POP aufbauen |
| `/quiz` | Quiz-Engine — Fragen entlang des Beacon-Baums (M+) |
| `/passage` | Kernpassagen und Lektüre |
| `/todo` | Ideen & Planung |
| `/auth` | Registrieren / Anmelden |

---

## Kernkonzepte

| Begriff | Bedeutung |
|---------|-----------|
| `O` | Destilliertes Zentrum des Programms — das, was es wesentlich ist |
| `M+` | Beacon-Baum — Navigationspunkte durch das Programm |
| `R` | Alle Manifestationen — Code, Dateien, Funktionen |
| `Rf` | Fokussiertes Subset von R — das Wesentlichste, Prinzipien |
| `GTC` | General Tree of Connections — externer Navigationsbaum |
| `TDB` | Tree of Development Beacons — persönlicher Teilbaum |
| `BD` | Beacon of Development — subjektive Projektion eines GTC-Knotens |
| `POP` | Phänomenales Objekt Programm — Programm das sich selbst als O versteht |
| `PEP` | Phänomenales Entwicklungsprogramm — Hülle für andere Programme (1×1=1) |

> **GTC-Dokumentation:** Empfehlungen zum Aufbau des General Tree of Connections → [`Converter_GTC.md`](./Converter_GTC.md)

---

## Projektstruktur

```
next-learning/
  src/
    app/              → Next.js-Routen
      page.tsx        → Startseite
      philosophy/     → Philosophie-Seite
      terms/          → Terminologie-Seite
      guide/          → Anleitung-Seite
      quiz/           → Quiz-Engine
      passage/        → Lektüre
      todo/           → Planung
      auth/           → Authentifizierung
      actions/        → Server Actions ('use server')
      api/            → REST-Endpunkte
    core/             → Auth, DB-Client, Session, Env
    modules/          → Domänenmodule (auth, users)
    shared/           → UI-Komponenten, Hooks, Typen
    phenomenal/       → Quiz-Engine, Beacons, Fragen, Prinzipien
  Converter_GTC.md    → GTC-Regeln und -Empfehlungen
  README.md           → Diese Datei
```

---

## Setup & Start

```bash
git clone https://github.com/Gromowik/next-project.git
cd next-project
npm install
npm run dev       # → http://localhost:3000
```

### Umgebungsvariablen (für Quiz + Auth)

Datei `.env.local` im Projektstamm anlegen:

```
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

> Ohne Datenbank funktionieren `/philosophy`, `/terms` und `/guide` vollständig.

### Datenbank (Neon PostgreSQL)

```bash
npm run db:generate   # Drizzle-Schema → SQL generieren
npm run db:migrate    # Migrationen auf Neon anwenden
```

### Weitere Befehle

```bash
npm run build     # Produktions-Build
npm run lint      # ESLint prüfen
```

---

## Komponenten-Typen in Next.js

Next.js App Router unterscheidet drei Typen. Alle drei kommen im Projekt vor:

### 1. Server Component *(Standard — kein Directive)*

Wird auf dem Server gerendert. Kein `useState`, kein `useEffect`.

```tsx
// src/app/quiz/page.tsx — Server Component (kein 'use client')
import { QuizPage } from "@/phenomenal/ui/QuizPage";

export default function QuizRoutePage() {
  return <QuizPage />;
}
```

---

### 2. Client Component *(`'use client'` oben in der Datei)*

Läuft im Browser. Kann `useState`, `useEffect`, Event-Handler verwenden.

```tsx
// src/phenomenal/ui/QuizPage.tsx — Client Component
'use client';

import { useState, useEffect } from "react";
import { flowsApi } from "@/phenomenal/api/flows.api";

export function QuizPage() {
  const [savedFlows, setSavedFlows] = useState([]);

  useEffect(() => {
    flowsApi.list().then((r) => { if (r.ok) setSavedFlows(r.flows); });
  }, []);

  return <div>...</div>;
}
```

---

### 3. Server Action *(`'use server'` in der Funktion)*

Funktion, die auf dem Server läuft — direkt aus einer Client Component aufgerufen.

```ts
// src/app/actions/flows.actions.ts — Server Action
'use server';

export async function saveFlowAction(flow, sequence) {
  const session = await readSessionFromCookie();
  if (!session) return { ok: false, reason: "not_authenticated" };
  await saveFlowForUser({ userId: session.sub, flow, sequence });
  return { ok: true };
}
```

---

## Verbesserungen einsenden

Wer das Programm studiert und Vorschläge hat, kann diese an den Autor senden:

**E-Mail:** [serge.gromowik@gmail.com](mailto:serge.gromowik@gmail.com)

Jede Rückmeldung ist eine HF-Projektion, die das O des Systems verdichtet.


| Symbol | Bedeutung |
|--------|-----------|
| `M+` | Beacons — Baumknoten, die den Navigationspfad durch Fragen steuern |
| `R` | Fragen — konkrete Code-Fragen mit Antworten, Kommentaren, Gewichtung |
| `Rf` | Prinzipien — abstrakte Erklärungsebene, unabhängig vom konkreten Code |
| `flows` | Durchläufe — gespeicherte Schrittfolgen mit Ergebnis und Wichtigkeit |

---

## Projektstruktur

```
src/
  app/              → Next.js-Routen (page.tsx, layout.tsx, api/)
  app/actions/      → Server Actions ('use server')
  core/             → Auth, DB-Client, Session, Env
  modules/          → Domänenmodule (auth, users, dashboard)
  shared/           → UI-Komponenten, Hooks, Typen
  phenomenal/       → Quiz-Engine, Beacons, Fragen, Prinzipien
```

---

## Komponenten-Typen in Next.js

Next.js App Router unterscheidet drei Typen. Alle drei kommen im Projekt vor:

### 1. Server Component *(Standard — kein Directive)*

Wird auf dem Server gerendert. Kein `useState`, kein `useEffect`.

```tsx
// src/app/quiz/page.tsx — Server Component (kein 'use client')
import { QuizPage } from "@/phenomenal/ui/QuizPage";

export default function QuizRoutePage() {
  return <QuizPage />;
}
```

```tsx
// src/app/page.tsx — Server Component
import Link from "next/link";
import { Button } from "@/shared/ui";

export default function Home() {
  return (
    <main>
      <h1>Next Learning</h1>
      <Link href="/quiz"><Button>Quiz öffnen</Button></Link>
    </main>
  );
}
```

---

### 2. Client Component *(`'use client'` oben in der Datei)*

Läuft im Browser. Kann `useState`, `useEffect`, Event-Handler verwenden.

```tsx
// src/phenomenal/ui/QuizPage.tsx — Client Component
'use client';

import { useState, useEffect } from "react";
import { flowsApi } from "@/phenomenal/api/flows.api";

export function QuizPage() {
  const [savedFlows, setSavedFlows] = useState([]);

  useEffect(() => {
    flowsApi.list().then((r) => { if (r.ok) setSavedFlows(r.flows); });
  }, []);

  return <div>...</div>;
}
```

```tsx
// src/phenomenal/ui/Navbar.tsx — Client Component
'use client';

import { useState, useEffect } from "react";
import { authApi } from "@/modules/auth/api/auth.api";

export function Navbar() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    authApi.me().then((r) => { if (r.ok) setUserName(r.user.name); });
  }, []);

  return (
    <nav>
      {userName
        ? <button onClick={() => authApi.logout().then(() => setUserName(null))}>Abmelden</button>
        : <a href="/auth">Anmelden</a>}
    </nav>
  );
}
```

---

### 3. Server Action *(`'use server'` in der Funktion)*

Funktion, die auf dem Server läuft — direkt aus einer Client Component aufgerufen. Kein manuelles `fetch()` nötig.

```ts
// src/app/actions/flows.actions.ts — Server Action
'use server';

import { readSessionFromCookie } from "@/core/auth/session";
import { saveFlowForUser } from "@/core/db/flows";

export async function saveFlowAction(flow, sequence) {
  const session = await readSessionFromCookie();
  if (!session) return { ok: false, reason: "not_authenticated" };

  await saveFlowForUser({ userId: session.sub, flow, sequence });
  return { ok: true };
}
```

```tsx
// Aufruf aus QuizPage.tsx (Client Component):
import { saveFlowAction } from "@/app/actions/flows.actions";

void saveFlowAction(flow, sequence).then((result) => {
  if (result.ok) { /* Flows neu laden */ }
});
```

**Server Action vs API Route:**

| | Server Action | API Route |
|---|---|---|
| Direktive | `'use server'` | keins (Datei in `app/api/`) |
| Aufruf im Client | `await saveFlowAction(data)` | `fetch('/api/flows', ...)` |
| Explizites HTTP | Nein (Next.js verbirgt es) | Ja |
| Geeignet für | Funktionen aus Komponenten | REST-Schnittstellen |

---

## Setup & Start

```bash
npm install       # Abhängigkeiten installieren
npm run dev       # Entwicklungsserver starten → http://localhost:3000
npm run build     # Produktions-Build
npm run lint      # ESLint prüfen
```

### Umgebungsvariablen

Datei `.env.local` im Projektstamm anlegen (siehe `env.md`):

```
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

### Datenbank (Neon PostgreSQL)

```bash
npm run db:generate   # Drizzle-Schema → SQL generieren
npm run db:migrate    # Migrationen auf Neon anwenden
```

---

## Wichtige Seiten

| URL | Beschreibung |
|-----|-------------|
| `/` | Startseite |
| `/quiz` | Quiz starten |
| `/auth` | Registrieren / Anmelden |
| `/steps/components.md` | Ausführliche Komponentendoku |
| `/API.md` | API-Architektur-Übersicht |
| `/db.md` | Neon-Datenbankeinrichtung |

---

## Quiz testen

1. `/quiz` öffnen → **Quiz öffnen** klicken
2. Fragen beantworten, Kommentar ausfüllen, Wichtigkeit setzen
3. Durchlauf abschließen → Ergebnis prüfen
4. Seite neu laden → gespeicherte Flows erscheinen (aus Neon DB oder localStorage)
5. Im Dev-Modus: **Seed Check** klicken → Validierungsbericht prüfen