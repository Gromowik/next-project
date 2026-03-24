import type { RfPrinciple } from "@/phenomenal/types/rf";

export const principles: RfPrinciple[] = [
  {
    id: "rf-proj-layers",
    title: "Prinzip: Schichten-Architektur",
    description: "Das Projekt ist in fünf Schichten unterteilt: app (Routing), core (Infrastruktur), phenomenal (Quiz-Engine), modules (Features), shared (Hilfsmittel). Jede Schicht hat eine klare Verantwortung.",
    tags: ["architektur", "schichten", "struktur"],
  },
  {
    id: "rf-proj-server-client",
    title: "Prinzip: Server vs. Client Components",
    description: "Server Components führen ohne JavaScript im Browser aus — ideal für Datenladen und SEO. Client Components (mit 'use client') nutzen React-State und Event-Handler. Die Wahl bestimmt, wo Code ausgeführt wird.",
    tags: ["nextjs", "server-component", "client-component", "rendering"],
  },
  {
    id: "rf-proj-server-action",
    title: "Prinzip: Server Actions",
    description: "Server Actions ('use server') sind serverseitige Funktionen, die direkt aus Client Components aufgerufen werden — ohne manuelles fetch(). Next.js serialisiert die Argumente und führt die Funktion auf dem Server aus.",
    tags: ["nextjs", "server-action", "use-server"],
  },
  {
    id: "rf-proj-engine",
    title: "Prinzip: Reine Funktionen als State Machine",
    description: "Die Quiz-Engine (start, answer, next, finish) besteht aus reinen Funktionen: Sie empfangen einen QuizState und geben einen neuen zurück, ohne Seiteneffekte. Das macht sie testbar, vorhersehbar und unabhängig vom UI.",
    tags: ["engine", "pure-functions", "state-machine", "phenomenal"],
  },
  {
    id: "rf-proj-auth",
    title: "Prinzip: Authentifizierung mit JWT und httpOnly-Cookie",
    description: "Passwörter werden mit bcrypt (12 Rounds) gehasht. Nach dem Login wird ein JWT-Token mit jose erstellt und in einem httpOnly-Cookie gespeichert — JavaScript im Browser kann es nicht lesen (XSS-Schutz).",
    tags: ["auth", "jwt", "bcrypt", "cookie", "sicherheit"],
  },
  {
    id: "rf-proj-db",
    title: "Prinzip: Datenbank mit Drizzle ORM und Transaktionen",
    description: "Drizzle ORM verbindet sich mit Neon PostgreSQL. Beim Speichern eines Quiz-Durchlaufs wird eine Transaktion verwendet: quiz_flows und quiz_flow_steps werden atomar geschrieben — entweder beide erfolgreich oder keiner.",
    tags: ["datenbank", "drizzle", "neon", "transaktion", "postgresql"],
  },
  {
    id: "rf-proj-fallback",
    title: "Prinzip: Graceful Degradation (Fallback)",
    description: "Wenn der Server Action fehlschlägt (nicht eingeloggt oder DB-Fehler), speichert QuizPage den Durchlauf im localStorage als Fallback. Die Anwendung bleibt funktionsfähig — nur ohne Persistenz in der Datenbank.",
    tags: ["fallback", "localstorage", "resilience", "ux"],
  },
];
