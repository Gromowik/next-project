import Link from "next/link";

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-lime-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:px-10">

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900">
            ← Zurück zur Startseite
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Planung & Ideen
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Ideen & geplante Erweiterungen
          </h1>
          <p className="mt-4 text-slate-600">
            Die Kernideen hinter dem Projekt und was als Nächstes kommt.
          </p>
        </div>

        {/* Core insight */}
        <section className="mb-6 rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">🌳 Kernidee: Das Programm ist selbst ein Baum</h2>
          <p className="mt-3 text-slate-600 leading-7">
            Jedes Programm hat einen Einstiegspunkt (Wurzel), verzweigt sich in Funktionen und Bedingungen,
            und gibt an den Blättern ein Ergebnis zurück. Diese Struktur ist exakt das, was{" "}
            <code className="rounded bg-emerald-50 px-1.5 py-0.5 text-sm text-emerald-800">M+</code> abbildet:
            ein Baum von Beacons, wobei jeder Knoten einen Codeabschnitt und eine Frage trägt.
          </p>
          <p className="mt-3 text-slate-600 leading-7">
            Ein Quiz-Durchlauf ist kein zufälliges Abfragen — es ist ein{" "}
            <strong className="text-slate-900">Schnitt durch den Verständnisbaum</strong>, von der Wurzel
            bis zum Blatt, genau wie ein Aufruf im echten Programm von oben nach unten läuft und
            unten ein Ergebnis zurückgibt.
          </p>
        </section>

        {/* Done */}
        <section className="mb-6 rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">✅ Abgeschlossen</h2>
          <ul className="mt-4 space-y-3">
            {[
              ["Quiz-Engine mit Baum-Navigation", "Start → Antwort → Nächster Knoten → Abschluss"],
              ["Authentifizierung", "Registrierung + Login mit JWT (httpOnly Cookie), bcrypt (12 Runden)"],
              ["Neon PostgreSQL", "Flows werden serverseitig gespeichert: quiz_flows + quiz_flow_steps"],
              ["Server Action", "saveFlowAction() speichert direkt in die DB ohne manuelles fetch()"],
              ["API Routes", "GET/POST /api/flows für Flows, /api/auth/* für Auth"],
              ["Top-5 Dashboard", "Startscreen zeigt die wichtigsten Beacons, Fragen und Flows nach Durchlauf"],
              ["Hydration-Fix", "savedFlows startet als [] — kein Mismatch zwischen Server- und Client-Render"],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 text-emerald-600">✓</span>
                <div>
                  <span className="font-medium text-slate-900">{title}</span>
                  <span className="ml-2 text-sm text-slate-500">{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Planned flows */}
        <section className="mb-6 rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">🌿 Geplant: Neue Durchlaufmodi</h2>
          <p className="mt-3 text-slate-600 leading-7">
            Aktuell gibt es nur einen Modus: <strong>root-to-leaf</strong> (von der Wurzel bis zum Blatt,
            gewichtet nach <code className="rounded bg-slate-100 px-1 text-sm">importance</code>).
            Vorgesehen sind weitere Modi:
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Nach distance-Ebene</p>
              <p className="mt-1 text-sm text-slate-600">
                Zeige alle Beacons auf Ebene 2, dann Ebene 3 — so lernt man das Programm
                Schicht für Schicht, wie man eine API erst von außen, dann von innen versteht.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Nach Frequenz (f)</p>
              <p className="mt-1 text-sm text-slate-600">
                Knoten, die selten vorkamen, werden häufiger. Gezieltes Auffüllen von Wissenslücken
                statt Wiederholung des bereits Bekannten.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-medium text-slate-900">Eltern-zu-Kindern als Fluss</p>
              <p className="mt-1 text-sm text-slate-600">
                Ein beliebiger Knoten wird als Ausgangspunkt gewählt — seine Kinder bilden den
                Durchlauf. Das erlaubt fokussiertes Üben eines Teilbaums.
              </p>
            </div>
          </div>
        </section>

        {/* Adaptive */}
        <section className="mb-6 rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">🌱 Geplant: Adaptive Analyse</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="flex gap-3">
              <span className="text-slate-400">→</span>
              <span>Nutzerprofil: Schwache Knoten pro Nutzer erkennen und gezielt wiederholen.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-400">→</span>
              <span>Dashboard-Seite mit Verlaufsdiagrammen — Wichtigkeit über Zeit, Score-Entwicklung.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-400">→</span>
              <span>Mehrere Wissensbäume: verschiedene Themen (DOM, Async, TypeScript) als separate M+-Bäume.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-400">→</span>
              <span>Entwicklungsfaktor <code className="rounded bg-slate-100 px-1 text-sm">d</code> (Strebung): wie nah ist der Nutzer dem vollständigen Verständnis eines Knotens.</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}
