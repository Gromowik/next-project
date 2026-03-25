import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-white to-orange-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:px-10">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-900">
            ← Zurück zur Startseite
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-3xl border border-amber-100 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">
            Anleitung · Mittlerer Schnitt
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Wie man diese Anwendung nutzt
          </h1>
          <p className="mt-4 text-slate-600 leading-7">
            Diese Anwendung ist im Zustand des <strong>mittleren Schnitts</strong> — ein
            vollständig beschriebenes phänomenales Objekt (POP), bereit zur individuellen
            Erweiterung durch eigene BD-Bäume und Projektionen.
          </p>
        </div>

        <div className="space-y-6">

          {/* ── SCHRITT 1: Download ── */}
          <Section number="1" title="Anwendung herunterladen">
            <p>
              Der aktuelle Stand des mittleren Schnitts ist öffentlich verfügbar auf GitHub:
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 px-5 py-4 text-sm text-slate-200 font-mono">
              https://github.com/Gromowik/next-project.git
            </div>
            <p className="mt-4">
              Zum Herunterladen benötigt man <strong>Git</strong>. Im Terminal (oder in der
              Eingabeaufforderung) folgenden Befehl ausführen:
            </p>
            <Pre>{`git clone https://github.com/Gromowik/next-project.git
cd next-project/next-learning`}</Pre>
          </Section>

          {/* ── SCHRITT 2: Installation ── */}
          <Section number="2" title="Installation und Start">
            <p>
              Voraussetzungen: <strong>Node.js</strong> (Version 18 oder höher) und{" "}
              <strong>npm</strong> müssen installiert sein.
            </p>
            <p className="mt-3">Abhängigkeiten installieren und die Anwendung starten:</p>
            <Pre>{`npm install
npm run dev`}</Pre>
            <p className="mt-3">
              Danach ist die Anwendung unter{" "}
              <code className="rounded bg-amber-50 px-1.5 text-amber-800">http://localhost:3000</code>{" "}
              erreichbar.
            </p>
            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Hinweis:</strong> Für den vollen Funktionsumfang (Quiz, Flows, Auth) wird
              eine Datenbankverbindung benötigt. Die Terminologie- und Philosophie-Seiten
              funktionieren auch ohne Datenbank.
            </div>
          </Section>

          {/* ── SCHRITT 3: Eigenes Programm als POP ── */}
          <Section number="3" title="Das eigene Programm als phänomenales Objekt aufbauen — der Samen (Seed)">
            <p>
              Das Ziel: das eigene Programm in einen <strong>Samen (Seed)</strong> verwandeln —
              in ein phänomenales Objekt (POP), das sich selbst versteht, navigierbar macht und
              wachsen kann. Dazu dient der <strong>GTC-Konvertor</strong>.
            </p>

            <h3 className="mt-6 font-semibold text-slate-800">Schritt 3.1 — GTC aufbauen</h3>
            <p className="mt-2">
              Die Datei{" "}
              <code className="rounded bg-amber-50 px-1.5 text-amber-800">Converter_GTC.md</code>{" "}
              im Wurzelverzeichnis enthält alle Regeln und Empfehlungen, um den GTC des eigenen
              Programms zu beschreiben. Das Grundformat ist einfach:
            </p>
            <Pre>{`LEVEL TYPE LABEL (Kommentar)

Beispiel:
1 function saveFlowAction
2 input
3 param userId (string)
2 body
3 call readSession → session
3 branch if !session
4 return { ok: false }
2 output
3 case success (ResultType)`}</Pre>
            <p className="mt-3">
              Jede Zeile = ein Knoten. Die Ziffer am Anfang bestimmt die Tiefe im Baum.
              Abstieg nur +1 pro Schritt. Aufstieg beliebig.
            </p>
            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Probebeispiel (verkürzter GTC):</strong> Diese Anwendung enthält bereits
              ein funktionierendes Beispiel eines verkürzten GTC — die Funktion{" "}
              <code className="rounded bg-amber-100 px-1">saveFlowAction</code> aus dem
              eigenen Quellcode, vollständig beschrieben mit <code className="rounded bg-amber-100 px-1">input / body / output</code>,
              Verzweigungen (<code className="rounded bg-amber-100 px-1">branch if / try / catch</code>)
              und typisierten Rückgabepfaden (<code className="rounded bg-amber-100 px-1">case</code>).
              Diese Struktur findet sich in{" "}
              <code className="rounded bg-amber-100 px-1">Converter_GTC.md</code> — als
              Referenz und Ausgangspunkt für den eigenen GTC.
            </div>

            <h3 className="mt-6 font-semibold text-slate-800">Schritt 3.2 — Das Objekt beschreiben</h3>
            <p className="mt-2">
              Nach dem GTC das phänomenale Objekt in seiner Grundstruktur anlegen. Die Terminologie
              dazu befindet sich auf der{" "}
              <Link href="/terms" className="text-amber-700 underline underline-offset-2 hover:text-amber-900">
                Terminologie-Seite
              </Link>
              :
            </p>
            <Pre>{`{
  M: {
    id:          'mein-programm-id',
    O: {
      name:        'Name des Programms',
      description: 'Worum geht es?'
    },
    type:        ['web-app', 'learning-tool'],
    inclusions:  []
  },
  L: [
    { 'M+': [ /* Beacons = GTC-Knoten */ ] },
    { Flows:  [ /* Durchläufe */         ] },
    { R:      [ /* alle Dateien/Funkt.  */ ] },
    { Rf:     [ /* das Wesentlichste */ ] },
    { HF:     [ /* externe Vergleiche */ ] },
  ]
}`}</Pre>

            <h3 className="mt-6 font-semibold text-slate-800">Schritt 3.3 — BD-Bäume anlegen</h3>
            <p className="mt-2">
              Für jeden Bereich, den man verstehen oder verbessern möchte, einen eigenen
              Beacon of Development (BD) anlegen: Kontext → Frage → Antwort → R-Element.
              Jede Iteration verfeinert das Verständnis und präzisiert O.
            </p>
            <Pre>{`Kontext (TDB-Struktur)  →  BD  →  Frage/Vorschlag
                                    →  Antwort/Präzisierung
                                    →  R-Element (Code)`}</Pre>
          </Section>

          {/* ── SCHRITT 4: Seiten anpassen ── */}
          <Section number="4" title="Die Seiten auf das eigene Programm anpassen">
            <p>
              Die vorhandenen Seiten sind Vorlagen — sie können direkt angepasst werden:
            </p>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["/philosophy", "src/app/philosophy/page.tsx", "Philosophie und Grundprinzipien des eigenen Projekts"],
                ["/terms", "src/app/terms/page.tsx", "Terminologie und Begriffsdefinitionen"],
                ["/todo", "src/app/todo/page.tsx", "Ideen, Planung und nächste Schritte"],
                ["/passage", "src/app/passage/page.tsx", "Lektüre und Kernpassagen"],
              ].map(([route, file, desc]) => (
                <div key={route} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <code className="shrink-0 text-amber-700 font-medium">{route}</code>
                  <div>
                    <p className="text-slate-700">{desc}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{file}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── SCHRITT 5: Verbesserungen einsenden ── */}
          <Section number="5" title="Das Programm studieren und Verbesserungen einsenden">
            <p>
              Diese Anwendung ist ein lebendiges phänomenales Objekt — sie wächst durch externe
              Projektionen. Wer das Programm studiert, Fragen stellt oder eigene Erfahrungen
              damit macht, kann aktiv zu seiner Entwicklung beitragen.
            </p>
            <p className="mt-3">
              Verbesserungsvorschläge, Fragen, Ideen oder Erweiterungen bitte an den Autor senden:
            </p>
            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-5 py-4">
              <p className="font-semibold text-slate-800">Gromowik Serge</p>
              <p className="mt-1 text-slate-600">
                E-Mail:{" "}
                <a
                  href="mailto:serge.gromowik@gmail.com"
                  className="text-amber-700 underline underline-offset-2 hover:text-amber-900"
                >
                  serge.gromowik@gmail.com
                </a>
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Jede Rückmeldung ist eine HF-Projektion, die das O des Systems verdichtet.
                Feedback, das zu einer Verbesserung führt, fließt als Rf-Element zurück in das
                gemeinsame Programm.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white px-5 py-4 flex items-start gap-4">
              <div>
                <p className="font-semibold text-slate-800">Quellcode auf GitHub</p>
                <p className="mt-1 text-sm text-slate-500">
                  Wer Verbesserungen direkt im Code vorschlägt, kann einen Pull Request öffnen:
                </p>
                <a
                  href="https://github.com/Gromowik/next-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-amber-700 underline underline-offset-2 hover:text-amber-900"
                >
                  github.com/Gromowik/next-project →
                </a>
              </div>
            </div>
          </Section>

        </div>

        {/* Footer card */}
        <div className="mt-10 rounded-2xl border border-amber-100 bg-amber-50 p-7 text-sm text-slate-600 leading-7">
          <p className="font-bold text-slate-900 mb-3">Kurzübersicht — Was diese Anwendung ist</p>
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Ein Lern- und Strukturierungswerkzeug auf Basis des <strong>phänomenalen Objekt</strong>-Modells</li>
            <li>Im Zustand des <strong>mittleren Schnitts</strong>: vollständige Objektstruktur, bereit für BD-Projektionen</li>
            <li>Gebaut mit <strong>Next.js 16</strong>, App Router, TypeScript, Tailwind v4</li>
            <li>Offen für Erweiterung: Quiz-Engine, Flows, Beacons, GTC-Konvertor</li>
            <li>Kann auf jede Codebasis angewendet werden — als PEP-Hülle für eigene Programme</li>
          </ul>
        </div>

      </main>
    </div>
  );
}

/* ── Components ─────────────────────────────────────────────── */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start gap-4">
        <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
          {number}
        </span>
        <h2 className="text-base font-bold text-slate-900 leading-6 pt-0.5">{title}</h2>
      </div>
      <div className="text-slate-600 leading-7 text-sm space-y-3">{children}</div>
    </div>
  );
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 px-5 py-4 text-xs text-slate-200 leading-6 whitespace-pre">
      {children}
    </pre>
  );
}
