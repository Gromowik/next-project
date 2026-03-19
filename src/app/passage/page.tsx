import Link from "next/link";

export default function PassagePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-indigo-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:px-10">

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-900">
            ← Zurück zur Startseite
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
            Passage · Durchlauf
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Simulierter Nutzerablauf
          </h1>
          <p className="mt-4 text-slate-600 leading-7">
            Ein realistischer End-to-End Ablauf durch die Anwendung — von der Registrierung
            bis zur DB-Speicherung. Jeder Schritt zeigt, welche Funktionen und Module beteiligt sind.
          </p>
        </div>

        <div className="space-y-5">

          <Step n={1} title="Startseite öffnen" route="/">
            <p>
              Der Nutzer landet auf <code className="code">/</code>. Er sieht den beschreibenden Text
              über das Modell (Baum statt flache Fragenliste) und navigiert zu <code className="code">/quiz</code>.
            </p>
          </Step>

          <Step n={2} title="Anmelden oder Registrieren" route="/auth">
            <p>
              Seite <code className="code">/auth</code> rendert <code className="code">AuthPanel</code> (Client Component).
              Der Nutzer wählt <strong>Login</strong> oder <strong>Registrierung</strong>.
            </p>
            <FnList items={[
              ["authApi.login(email, password)", "POST /api/auth/login → JWT in httpOnly Cookie nl_session"],
              ["authApi.signup(name, email, password)", "POST /api/auth/signup → bcrypt (12 Runden) + JWT"],
              ["readSessionFromCookie()", "Liest das JWT aus dem Cookie und prüft die Signatur mit jose"],
            ]} />
          </Step>

          <Step n={3} title="Quiz-Seite öffnen" route="/quiz">
            <p>
              <code className="code">QuizPage</code> (Client Component) mountet. Im <code className="code">useEffect</code> wird
              sofort die Liste der bisherigen Flows vom Server geladen.
            </p>
            <FnList items={[
              ["flowsApi.list()", "GET /api/flows → requireSessionUser() → listFlowsByUserId()"],
              ["setSavedFlows(result.flows)", "Top-5 Dashboard wird mit Server-Daten befüllt"],
              ["getSavedFlows()", "Fallback auf localStorage falls nicht eingeloggt (401)"],
            ]} />
          </Step>

          <Step n={4} title="Quiz starten">
            <p>
              Nutzer klickt <strong>Quiz starten</strong> im Navbar.
            </p>
            <FnList items={[
              ["startQuiz('weighted')", "Erzeugt initialen QuizState: currentBeacon = mplus-root, steps = []"],
              ["setState(initialState)", "QuizPage wechselt vom Startscreen zur Kartenansicht"],
            ]} />
          </Step>

          <Step n={5} title="Frage beantworten">
            <p>
              Nutzer wählt eine Antwort, setzt Wichtigkeit (1–10), optional Kommentar, klickt
              {" "}<strong>Antwort bestätigen</strong>.
            </p>
            <FnList items={[
              ["onAnswer(payload)", "Callback von QuizCard → QuizPage"],
              ["answerQuestion(state, payload)", "Schreibt Schritt in state.steps, aktualisiert importance in Beacon und Frage"],
              ["nextStep(afterAnswer)", "Wählt nächsten Kindknoten per weightedPick() → neuer currentBeacon"],
              ["setState(afterNext)", "Neue Karte erscheint unten, bisherige wird readonly"],
            ]} />
            <p className="mt-3 text-sm text-slate-500">
              Wenn <code className="code">nextBeacon === null</code> (kein Kind vorhanden): Fluss endet automatisch.
            </p>
          </Step>

          <Step n={6} title="Fluss manuell beenden (optional)">
            <p>
              Nutzer klickt <strong>Quizfluss beenden</strong> im Navbar vor dem letzten Schritt.
            </p>
            <FnList items={[
              ["onFinishFlow()", "Ruft completeFlow(state) mit aktuellem Stand auf"],
            ]} />
          </Step>

          <Step n={7} title="Abschluss & Speicherung">
            <p>
              Nach dem letzten Schritt (oder manuell) läuft <code className="code">completeFlow()</code>.
            </p>
            <FnList items={[
              ["finishQuiz(state)", "Berechnet score + importance, erstellt summary-Objekt"],
              ["saveFlowAction(flow, sequence)", "Server Action — kein fetch() nötig, Next.js serialisiert den Aufruf"],
              ["readSessionFromCookie()", "Liest Session direkt auf dem Server aus dem Cookie"],
              ["saveFlowForUser({ userId, flow, sequence })", "Drizzle-Transaction: INSERT in quiz_flows + quiz_flow_steps (Neon)"],
              ["flowsApi.list()", "Nach Erfolg: Flows vom Server neu laden → aktualisierte Top-5"],
              ["saveFlow(flow) + localStorage", "Fallback wenn nicht eingeloggt oder DB-Fehler"],
            ]} />
          </Step>

          <Step n={8} title="Ergebnis anzeigen">
            <p>
              <code className="code">FlowSummary</code> erscheint unten im Scroll-Bereich.
              Zeigt Richtige Antworten, Gesamtwichtigkeit, Anzahl gespeicherter Durchläufe.
              Nutzer klickt <strong>Fluss beenden</strong>.
            </p>
            <FnList items={[
              ["setState(null)", "Karten verschwinden, UI kehrt zu StartScreen zurück"],
              ["topFlows (useMemo)", "Top-5 Flows werden aus dem aktualisierten savedFlows neu berechnet"],
            ]} />
          </Step>

        </div>

        <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-7">
          <h2 className="font-bold text-slate-900">Qualitätskriterien</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>✓ In weniger als 2 Klicks vom Start zur ersten Frage</li>
            <li>✓ Jeder beantwortete Schritt bleibt im Verlauf sichtbar (readonly Cards)</li>
            <li>✓ Persistenzfehler blockieren nicht die UI — Fallback auf localStorage</li>
            <li>✓ Hydration-Mismatch ausgeschlossen — savedFlows startet als []</li>
            <li>✓ Abschluss erzeugt ein nachvollziehbares Ergebnisobjekt in der Neon DB</li>
          </ul>
        </div>

      </main>
    </div>
  );
}

function Step({ n, title, route, children }: {
  n: number;
  title: string;
  route?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          {n}
        </span>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {route && (
          <code className="rounded-md bg-slate-100 px-2 py-0.5 text-sm text-slate-700">{route}</code>
        )}
      </div>
      <div className="text-slate-600 leading-7">{children}</div>
    </div>
  );
}

function FnList({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-3 space-y-2 rounded-xl bg-slate-50 p-4">
      {items.map(([fn, desc]) => (
        <li key={fn} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-3">
          <code className="shrink-0 font-mono text-indigo-700">{fn}</code>
          <span className="text-slate-500">{desc}</span>
        </li>
      ))}
    </ul>
  );
}
