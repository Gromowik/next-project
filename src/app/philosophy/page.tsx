import Link from "next/link";

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-violet-50 via-white to-purple-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:px-10">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:text-violet-900">
            ← Zurück zur Startseite
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-violet-600">
            Philosophie · Grundgedanke
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Das Programm als sein eigenes Lernfeld
          </h1>
          <p className="mt-4 text-slate-600 leading-7">
            Ein Lernprogramm, das auf sich selbst angewendet wird, ist mehr als ein Werkzeug —
            es wird zu einem lebendigen Objekt, das durch den Prozess des Studierens wächst.
            Diese Seite beschreibt die zwei Kerngedanken, die dem Projekt zugrunde liegen.
          </p>
        </div>

        <div className="space-y-5">

          {/* Block 1: PEP / 1×1=1 */}
          <Block n={1} title="PEP — Phänomenales Entwicklungsprogramm (1×1=1)" label="Selbstreferenz">
            <p>
              Ein Lernprogramm, das zum Thema seines eigenen Unterrichts wird, verhält sich wie
              die mathematische Einheit: <strong>1×1=1</strong>. Das Anwenden des Programms auf
              sich selbst verändert weder das Programm fundamental noch die Methode — aber es
              bringt ein tieferes Verständnis hervor.
            </p>
            <p className="mt-3">
              Der Nutzer lädt das öffentliche Repository herunter und bekommt nicht nur Code,
              sondern einen <strong>Eingang in O</strong> — das phänomenale Objekt des Projekts.
              Die Beacon-Struktur (M+-Baum) leitet ihn von einfach nach komplex. Jeder Knoten
              ist ein Schritt im Verstehen, nicht nur eine Codezeile.
            </p>
            <Highlight>
              Das Programm entwickelt sich nicht durch externe Steuerung, sondern durch
              das angesammelte Verständnis derer, die es studiert haben.
            </Highlight>
            <p className="mt-3">
              Daraus entstehen zwei Arten von MR-Bäumen:
            </p>
            <TreeList items={[
              ["Learning Trees", "Leiten zum Verständnis des bestehenden Programms — von der Wurzel bis zum aktuellen Zustand. Dies sind die heutigen Quiz-Durchläufe (Auth-Flow, Quiz-Engine usw.)"],
              ["Development Trees", "Werden von denen erstellt, die die Learning Trees abgeschlossen haben. Ihr Ziel: das Programm zu erweitern. Sie öffnen den nächsten Level — das, was noch nicht existiert."],
            ]} />
            <p className="mt-4">Die Schleife schließt sich:</p>
            <CodeBlock>{`O (Programm)
  → MR-Bäume (Lernen)
    → Verständnis des Nutzers
      → Beitrag des Nutzers
        → neue MR-Bäume (Entwicklung)
          → aktualisiertes O`}</CodeBlock>
            <p className="mt-3">
              Jeder abgeschlossene Durchlauf ist nicht nur eine Nutzerbewertung —
              er ist ein potenzieller Leuchtturm für den nächsten.
            </p>
          </Block>

          {/* Block 2: Two Modes */}
          <Block n={2} title="Zwei Modi des Zugangs" label="Architektur">
            <p>
              Es gibt zwei grundlegend verschiedene Wege, wie ein Nutzer in O eintreten kann.
              Sie sind keine Alternativen, bei denen man eine wählt — sie sind zwei Eingänge
              in dieselbe Struktur.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <ModeCard
                title="Starrer Modus"
                subtitle="über Git-Geschichte"
                color="indigo"
                items={[
                  "Jeder Commit ist ein Leuchtturm",
                  "Alle Teilnehmer gehen denselben Weg",
                  "Code ist bei allen identisch",
                  "Wettbewerb ist präzise möglich: Wer ist weiter, wer versteht tiefer?",
                  "Das Git-Repository ist selbst der erste MR-Baum",
                ]}
              />
              <ModeCard
                title="Generativer Modus"
                subtitle="über Richtungsweiser (Rf)"
                color="violet"
                items={[
                  "Richtungsweiser sind KI-Anfragen, die die Programmlogik Schritt für Schritt nachbauen",
                  "Jeder Nutzer erhält eine etwas andere Implementierung",
                  "Die Struktur des Verstehens bleibt gleich — die Syntax nicht",
                  "Funktioniert sprachunabhängig: TypeScript, Python, Rust…",
                  "Wettbewerb erfolgt über das Verständnis von Rf, nicht über den Code",
                ]}
              />
            </div>

            <p className="mt-5">
              Der generative Modus löst das Wettbewerbsproblem so: Quiz-Fragen sind
              sprachinvariant. Sie fragen nicht nach Syntax, sondern nach Logik —
              <em> „Warum httpOnly?"</em>, <em>„Was passiert bei einem Race Condition im useEffect?"</em>.
              Diese Fragen haben eine richtige Antwort unabhängig davon, in welcher
              Programmiersprache das Projekt implementiert wurde.
            </p>

            <p className="mt-4 font-medium text-slate-700">
              Schema — Zwei Eingänge, ein O:
            </p>
            <CodeBlock>{`OLB — Objekt-Leuchtturm-Baum  (russ. ОДС)
  │
  ├── Starrer Pfad: Git-Commits
  │     → MR-Bäume sind fixiert
  │     → Wettbewerb nach Code-Stand
  │
  └── Richtungsweiser (Rf): KI-Anfragen
        → MR-Bäume werden generiert
        → Wettbewerb nach Verständnis`}</CodeBlock>
          </Block>

          {/* Block 3: Directions as Rf */}
          <Block n={3} title="Richtungsweiser als Rf des Projekts" label="Konzept">
            <p>
              <strong>Richtungsweiser</strong> (russ. <em>направляющие</em>) sind gemeinsam mit
              der KI ausgearbeitete Anfragen — so formuliert, dass die KI dem Nutzer Schritt für
              Schritt den Aufbau des Programms rekonstruiert. Sie sind das <strong>Rf</strong> des
              Entwicklungsprozesses: das generalisierte Prinzip, das über der konkreten
              Implementierung steht.
            </p>
            <p className="mt-3">
              Ein Rf beschreibt nicht, wie etwas im Einzelnen aussieht — er beschreibt, wie die
              Teile zueinander in Relation stehen. Dasselbe Rf kann auf TypeScript, Python oder
              jede andere Sprache angewendet werden, solange die Struktur der Beziehungen erhalten bleibt.
            </p>
            <Highlight>
              Richtungsweiser = Rf der Entwicklung. Sie stehen über dem Code und ermöglichen,
              dass dieselbe Programmidee in verschiedenen Kontexten rekonstruiert werden kann.
            </Highlight>
            <p className="mt-3">
              Die Verbindung zum Quiz: Wer Richtungsweiser versteht, versteht Rf.
              Wer Rf versteht, kann das Programm nicht nur reproduzieren, sondern weiterentwickeln.
              Das ist der Übergang von Learning Trees zu Development Trees.
            </p>
          </Block>

          {/* Block 4: The loop closes */}
          <Block n={4} title="Die Einheit schließt sich" label="Fazit">
            <p>
              Das Projekt besitzt eine ungewöhnliche Eigenschaft: Es ist gleichzeitig Lerngegenstand
              und Lernwerkzeug. Wer es studiert, trägt dazu bei, dass es wächst. Wer es weiterentwickelt,
              schafft neue Lernpfade für andere.
            </p>
            <p className="mt-3">
              Das Git-Repository ist das öffentliche Gesicht von O. Sein Verlauf — von den ersten
              Commits bis zum aktuellen Stand — ist bereits ein MR-Baum. Jeder, der das Repository
              klont und Commit für Commit durchgeht, durchläuft diesen Baum.
            </p>
            <p className="mt-3">
              Gleichzeitig bleibt O offen: Neue Richtungsweiser können hinzugefügt werden.
              Neue Sprachen können den Baum reproduzieren. Neue Teilnehmer können neue
              Entwicklungsmaßnahmen (Development Trees) einbringen — nicht weil sie es müssen,
              sondern weil sie durch das Studium des Programms selbst dazu geführt wurden.
            </p>
            <Highlight>
              1×1=1. Das Programm, das sich selbst studiert, bleibt es selbst — und wird mehr.
            </Highlight>
          </Block>

        </div>

        {/* Footer note */}
        <div className="mt-10 rounded-2xl border border-violet-100 bg-violet-50 p-7">
          <h2 className="font-bold text-slate-900">Terminologie</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><strong className="text-slate-800">O</strong> — das phänomenale Objekt des Projekts; Die gesamte lebendige Struktur (Code + Bäume + Verständnis)</li>
            <li><strong className="text-slate-800">M+ (Beacons)</strong> — Leuchtturme im Wissensbaum; strukturieren den Pfad von einfach zu komplex</li>
            <li><strong className="text-slate-800">R (Fragen)</strong> — konkrete Fragen, die an Beacons gebunden sind; prüfen das Verständnis</li>
            <li><strong className="text-slate-800">Rf (Prinzipien)</strong> — generalisierte Erklärungsebene; stehen über der konkreten Implementierung</li>
            <li><strong className="text-slate-800">MR-Baum</strong> — ein strukturierter Durchlauf durch O; <em>M</em>&nbsp;= Markierung (Leuchtturm·Beacon), <em>R</em>&nbsp;= Referenz (Frage); verbindet beides zu einem Lernpfad</li>
            <li><strong className="text-slate-800">OLB</strong> — <em>O</em>bjekt-<em>L</em>euchtturm-<em>B</em>aum; die öffentliche Navigationsstruktur des Projekts <span className="text-slate-400 text-xs">(russ. ОДС)</span></li>
            <li><strong className="text-slate-800">GTC</strong> — <em>G</em>eneral <em>T</em>ree of <em>C</em>onnections; externes Navigationsskelett des Programms, rekursiv von Makro zu Mikro</li>
            <li><strong className="text-slate-800">TDB</strong> — <em>T</em>ree of <em>D</em>evelopment <em>B</em>eacons; ein Teilbaum des GTC, der für einen bestimmten Kontext entsteht</li>
            <li><strong className="text-slate-800">BD</strong> — <em>B</em>eacon of <em>D</em>evelopment; subjektive Projektion eines GTC-Knotens auf einen eigenen Kontext</li>
            <li><strong className="text-slate-800">POP</strong> — <em>P</em>hänomenales <em>O</em>bjekt <em>P</em>rogramm; Programm, das sich selbst als phänomenales Objekt versteht</li>
            <li><strong className="text-slate-800">PEP</strong> — <em>P</em>hänomenales <em>E</em>ntwicklungs<em>p</em>rogramm; das Prinzip 1×1=1 — das Programm, das sich selbst studiert <span className="text-slate-400 text-xs">(russ. ФПР)</span></li>
            <li><strong className="text-slate-800">Richtungsweiser</strong> — KI-Anfragen als Rf des Entwicklungsprozesses; ermöglichen sprachunabhängige Reproduktion</li>
          </ul>
          <div className="mt-5 border-t border-violet-200 pt-4">
            <Link href="/terms" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-700 hover:text-violet-900">
              → Detaillierte Begriffserklärungen mit Diagrammen lesen
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}

/* ── Small reusable components ─────────────────────────────── */

function Block({
  n,
  title,
  label,
  children,
}: {
  n: number;
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
          {n}
        </span>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <span className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
          {label}
        </span>
      </div>
      <div className="text-slate-600 leading-7">{children}</div>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border-l-4 border-violet-400 bg-violet-50 px-5 py-3 text-sm font-medium text-violet-900 leading-6">
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 px-5 py-4 text-sm text-slate-200 leading-6 whitespace-pre">
      {children}
    </pre>
  );
}

function TreeList({ items }: { items: [string, string][] }) {
  return (
    <ul className="mt-3 space-y-3 rounded-xl bg-slate-50 p-4">
      {items.map(([name, desc]) => (
        <li key={name} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-3">
          <span className="shrink-0 font-semibold text-violet-700">{name}</span>
          <span className="text-slate-500">{desc}</span>
        </li>
      ))}
    </ul>
  );
}

function ModeCard({
  title,
  subtitle,
  color,
  items,
}: {
  title: string;
  subtitle: string;
  color: "indigo" | "violet";
  items: string[];
}) {
  const ring = color === "indigo" ? "border-indigo-200 bg-indigo-50" : "border-violet-200 bg-violet-50";
  const heading = color === "indigo" ? "text-indigo-900" : "text-violet-900";
  const dot = color === "indigo" ? "bg-indigo-400" : "bg-violet-400";

  return (
    <div className={`rounded-2xl border p-5 ${ring}`}>
      <p className={`font-bold ${heading}`}>{title}</p>
      <p className="mb-3 text-xs text-slate-500">{subtitle}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
