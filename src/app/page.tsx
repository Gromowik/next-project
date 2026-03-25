import Link from "next/link";
import { Button, Card } from "@/shared/ui";
import { TreeVisualization } from "./_components/TreeVisualization";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-lime-50">
      <main className="mx-auto w-full max-w-300 px-4 py-16 md:px-10">
        <section className="mb-10 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Next Learning / Phenomenal Tree Quiz
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Lernen entlang eines Verstehensbaums statt in flachen Frage-Listen
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
            In <code className="rounded bg-emerald-50 px-1.5 text-base text-emerald-800">src/phenomenal</code> wird
            Wissen als Baum organisiert: Beacons (<code className="rounded bg-emerald-50 px-1 text-sm text-emerald-800">M+</code>) bilden
            den Pfad, Fragen (<code className="rounded bg-emerald-50 px-1 text-sm text-emerald-800">R</code>) konkretisieren
            Knoten, Prinzipien (<code className="rounded bg-emerald-50 px-1 text-sm text-emerald-800">Rf</code>) liefern
            die abstrakte Ebene. Ein Quiz-Durchlauf ist ein Schnitt durch diese Struktur —
            von der Wurzel bis zum Blatt, genau wie ein Aufruf im echten Programm von oben nach
            unten läuft und ein Ergebnis zurückgibt.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quiz">
              <Button size="lg" variant="primary">Quiz öffnen</Button>
            </Link>
            <Link href="/todo">
              <Button size="lg" variant="secondary">Ideen & Planung</Button>
            </Link>
            <Link href="/passage">
              <Button size="lg" variant="secondary">Passage lesen</Button>
            </Link>
            <Link href="/philosophy">
              <Button size="lg" variant="secondary">Philosophie</Button>
            </Link>
            <Link href="/terms">
              <Button size="lg" variant="secondary">Terminologie</Button>
            </Link>
            <Link href="/guide">
              <Button size="lg" variant="secondary">Anleitung</Button>
            </Link>
          </div>
        </section>

        <TreeVisualization />

        <section className="mb-10 grid gap-5 md:grid-cols-4">
          <Card hover>
            <h2 className="text-xl font-semibold text-slate-900">M+ (Beacons)</h2>
            <p className="mt-2 text-sm text-slate-600">
              Baumknoten mit Distanz, Häufigkeit und Wichtigkeit. Sie steuern die
              Navigationsrichtung des Quiz-Flusses.
            </p>
          </Card>

          <Card hover>
            <h2 className="text-xl font-semibold text-slate-900">R (Fragen)</h2>
            <p className="mt-2 text-sm text-slate-600">
              Konkrete Code-Fragen mit Antworten, Kommentaren und Lerngewicht.
              Sie sind direkt an Beacons gekoppelt.
            </p>
          </Card>

          <Card hover>
            <h2 className="text-xl font-semibold text-slate-900">Rf (Prinzipien)</h2>
            <p className="mt-2 text-sm text-slate-600">
              Generalisierte Erklärungsebene: Wie funktioniert etwas im Prinzip,
              unabhängig vom konkreten Codeausschnitt.
            </p>
          </Card>

          <Card hover>
            <h2 className="text-xl font-semibold text-slate-900">flows (Durchläufe)</h2>
            <p className="mt-2 text-sm text-slate-600">
              Gespeicherte Quiz-Durchläufe mit Score, Wichtigkeit und Schrittverlauf.
              Persistiert in Neon PostgreSQL pro Nutzerprofil.
            </p>
          </Card>
        </section>

        <section className="mb-10 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Aktuelle Kinetik des Systems</h2>
          <p className="mt-3 text-slate-600 leading-7">
            Der Quiz-Modus erzeugt Flüsse als vertikale Durchläufe vom Wurzelknoten bis zum Blatt.
            Der Verlauf wird als Spalte von Karten dargestellt — mit Schritt-Kommentaren, Wichtigkeit
            und readonly-Ansicht der beantworteten Karten. Am Ende speichert eine{" "}
            <strong className="text-slate-800">Server Action</strong> den Durchlauf direkt in Neon PostgreSQL.
            Das System kehrt dann in den Startzustand zurück und zeigt aktualisierte Top-5 Karten.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Auth", "JWT + httpOnly Cookie, bcrypt, Neon users-Tabelle"],
              ["Server Action", "saveFlowAction() — kein fetch() nötig, direkt in DB"],
              ["Dashboard", "Top-5 Beacons, Flows und Fragen nach Durchlauf"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-900">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Geplante Erweiterungen</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="flex gap-3">
              <span className="mt-0.5 text-slate-400">→</span>
              <span>Neue Durchlaufmodi nach <code className="rounded bg-slate-100 px-1 text-sm">distance</code>-Ebenen — Knoten einer Tiefe als fokussierter Durchlauf.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-slate-400">→</span>
              <span>Adaptive Navigation: Knoten mit hoher Frequenz (<code className="rounded bg-slate-100 px-1 text-sm">f</code>) seltener zeigen, schwache Stellen gezielt wiederholen.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-slate-400">→</span>
              <span>Dashboard-Seite mit Score-Verlauf, Wichtigkeitsentwicklung und Nutzerprofil-Analyse.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-slate-400">→</span>
              <span>Mehrere Wissensbäume: verschiedene Themen (DOM, Async, TypeScript) als separate M+-Strukturen.</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
