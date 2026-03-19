# Next Learning — Phenomenal Quiz

Lernprojekt auf Basis von **Next.js 16** mit App Router, modularer Architektur und eigenem Quiz-Engine.

**Ziel:** Eine phänomenale Wissensstruktur aufbauen und testen:

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