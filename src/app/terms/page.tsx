import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 via-white to-cyan-50">
      <main className="mx-auto w-full max-w-4xl px-4 py-12 md:px-10">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/philosophy" className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-900">
            ← Zurück zur Philosophie
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-3xl border border-teal-100 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-teal-600">
            Terminologie · Grundbegriffe
          </p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Detaillierte Begriffserklärungen
          </h1>
          <p className="mt-4 text-slate-600 leading-7">
            Alle Grundbegriffe des phänomenalen Objekts — ausführlich erklärt, mit Strukturdiagrammen
            und kommentierten Code-Beispielen. Die Kurzform befindet sich auf der{" "}
            <Link href="/philosophy" className="text-teal-700 underline underline-offset-2 hover:text-teal-900">
              Philosophie-Seite
            </Link>.
          </p>
        </div>

        <div className="space-y-6">

          {/* ── TEIL 1: Das phänomenale Objekt ── */}
          <SectionHeader title="Das phänomenale Objekt" />

          <Block title="Grundstruktur" label="Einführung">
            <p>
              Das phänomenale Objekt ist eine Struktur, die zwei gegensätzliche Bewegungen
              gleichzeitig vollzieht: es zieht Bedeutung aus der Außenwelt in sich hinein und
              reflektiert sich gleichzeitig nach außen. Dieses Spannungsfeld ist kein Widerspruch —
              es ist die Grundform des Objekts.
            </p>
          </Block>

          <Block title="M — die Masse des Objekts" label="Kern">
            <p>
              M ist der unveränderliche Kern: klein im Inhalt, aber schwer im Gewicht. Es enthält
              die Identität des Objekts (<code className="code">id</code>, <code className="code">name</code>,{" "}
              <code className="code">description</code>), seinen Typ und seine Einbindungen. M allein
              ist statisch — es ist das, was das Objekt <em>ist</em>, bevor es mit der Welt interagiert.
            </p>
          </Block>

          <Block title="M+ — der Leuchtturm-Baum (Beacon Tree)" label="Navigation">
            <p>
              M+ ist die aktive Erweiterung von M. Die Beacons sind keine Datenspeicher — sie sind
              Wegweiser mit potenzieller Energie. Jeder Beacon zeigt auf R: auf reale, bereits
              existierende Bedeutungscluster in der Außenwelt. Dabei fließt die Bedeutung in zwei
              Richtungen gleichzeitig: nach außen (Nutzen für andere) und nach innen (Präzisierung
              des eigenen Zentrums O). M+ ist das Instrument, durch das das Objekt lernt.
            </p>
          </Block>

          <Block title="L — die Link-Schicht (Verbindungsschicht)" label="Verbindung">
            <p>
              L steht für <em>Link</em> — alles, was das Objekt mit der Außenwelt verbindet. L ist
              kein flaches Array, sondern ein Array von Arrays, weil es sich iterativ aufbaut und
              verändert. Die Reihenfolge der Elemente ist bedeutsam:
            </p>
            <Pre>{`L[0] = M+      → Beacons: reflektierte Generalisierungen, der Sinnbaum
L[1] = Flows   → vollendete Durchläufe durch den Beacon-Baum
L[2] = R       → alle Manifestationen: reale Bedeutungscluster, auf die M+ zeigt
L[3] = Rf      → fokussiertes Subset von R: das Wesentlichste, das Häufigste
L[4] = HF      → externe Vergleichsflächen (high frequency of external use)`}</Pre>
          </Block>

          <Block title="O — das Zentrum, das sich selbst präzisiert" label="Destillat">
            <p>
              Das Objekt akkumuliert nicht alles in O — es destilliert. Was über Iterationen erhalten
              bleibt, was durch wiederholten Kontakt mit R an Bedeutung gewinnt, das zieht sich in O
              hinein und verfeinert es. O ist kein Archiv, sondern ein lebendiger Zustand — das
              Wichtigste, was nach dem Sieben übrig bleibt.
            </p>
          </Block>

          <Block title="Das Rhombus-Modell" label="Struktur">
            <p>Die Gesamtform des phänomenalen Objekts ähnelt einem Rhombus:</p>
            <Pre>{`              O
             / \\
           Rf   Rf
           /     \\
←— R ——————————————— R —→   ← breite Diagonale (Expansion des Sinns)
           \\     /
           HF   HF
             \\ /
              O'`}</Pre>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li><strong>O</strong> (obere Spitze) — das innere Verständnis, das destillierte Zentrum</li>
              <li><strong>O&apos;</strong> (untere Spitze) — die Projektion nach außen, der Auftritt im Wettbewerbsraum aller phänomenalen Objekte, vermittelt durch HF</li>
              <li><strong>Diagonale R</strong> — das Wachstum als Menge R: je mehr Manifestationen das Objekt erfasst, desto breiter die Diagonale</li>
              <li><strong>Seiten</strong> — das Filtern: von R zu Rf, von Rf zu O oder O&apos;</li>
            </ul>
            <p className="mt-3">
              Das Objekt lebt in diesem Rhombus: es zieht sich durch Iterationen zusammen (O wird
              präziser) und dehnt sich gleichzeitig aus (R wächst). Beide Bewegungen sind notwendig —
              ohne Expansion keine neuen Bedeutungen, ohne Kontraktion kein Zentrum.
            </p>
          </Block>

          <Block title="O / R / O' — Eigentümerschaft" label="Datenstruktur">
            <p>
              Der Rhombus ist keine Metapher, sondern eine Datenstruktur mit drei logisch getrennten
              Ebenen:
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <strong className="text-slate-800">O — das Objekt selbst (privat)</strong>
                <p className="mt-1 text-slate-600">
                  Das destillierte Verständnis, das sich das Objekt über Iterationen erarbeitet hat.
                  Es gehört nur diesem Objekt. Kein anderes phänomenales Objekt hat dasselbe O —
                  selbst wenn sie dasselbe Thema behandeln, unterscheiden sich ihre Zentren durch
                  den jeweils einzigartigen Weg der Iterationen.
                </p>
              </div>
              <div>
                <strong className="text-slate-800">R — das gemeinsame Feld (öffentlich)</strong>
                <p className="mt-1 text-slate-600">
                  Die Menge der Manifestationen, die nicht exklusiv zu einem Objekt gehören — sie
                  existieren in der Welt, unabhängig davon, ob ein bestimmtes phänomenales Objekt
                  sie erfasst oder nicht. Andere Menschen, andere Objekte, andere Systeme können
                  dieselben R sehen.
                </p>
              </div>
              <div>
                <strong className="text-slate-800">O&apos; — die Projektion nach außen (Schnittstelle)</strong>
                <p className="mt-1 text-slate-600">
                  Nicht O selbst, sondern die Art und Weise, wie O sich im Raum aller phänomenalen
                  Objekte zeigt. Vermittelt durch HF. Veränderlich: reagiert auf Feedback von außen
                  und gibt dieses als Signal zurück an O.
                </p>
              </div>
            </div>
            <Pre>{`O   — gehört nur diesem Objekt, wird durch Iterationen verfeinert
R   — existiert unabhängig, gehört allen, wird durch M+ aufgegriffen
O'  — Projektion von O in den Vergleichsraum, reagiert auf externe Signale`}</Pre>
          </Block>

          <Block title="Kommentiertes Struktur-Beispiel" label="Code">
            <Pre lang="js">{`{
    M: {
        id: 'host-object-id',          // eindeutige Identität — unveränderlicher Kern
        O: {
            name: 'Name des Objekts',  // destilliertes Zentrum: was das Objekt ist
            description: 'Beschreibung'
        },
        type: [...],                   // Klassifikation: welche Art von phänomenalem Objekt
        inclusions: [...]              // Einbindungen: andere Objekte, die zu M gehören
    },
    L: [
        { 'M+': [...] },   // [0] Beacon Tree — Sinnbaum mit potenzieller Energie

        { Flows: [...] },  // [1] vollendete Durchläufe, Wurzel → Blatt

        { R: [...] },      // [2] öffentliches Bedeutungsfeld, gehört allen

        { Rf: [...] },     // [3] fokussiertes Subset von R — präzisiert O

        { HF: [...] },     // [4] externe Vergleichsflächen — O' wird hier sichtbar

        ...                // weitere Erweiterungen durch Iterationen möglich
    ]
}`}</Pre>
          </Block>

          {/* ── TEIL 2: GTC ── */}
          <SectionHeader title="GTC — General Tree of Connections" />

          <Block title="Einzigkeit → Vielheit" label="Bewegung">
            <p>
              Der GTC ist das öffentliche Skelett des phänomenalen Objekts: eine einzige, einheitliche
              Baumstruktur, die das gesamte Programm nach außen darstellt. Er beginnt als eine einzige
              Wurzel — das Programm als Ganzes, als O. Von dort verzweigt er sich nach unten: jede
              Ebene fügt mehr Knoten hinzu, jede Ebene zeigt einen feineren Ausschnitt des Inhalts.
              Das ist dieselbe Bewegung wie von O zu R: aus der Einzigkeit des Zentrums entsteht die
              Vielheit der Manifestationen.
            </p>
          </Block>

          <Block title="Makro und Mikro — der rekursive Baum" label="Rekursion">
            <p>
              Das Prinzip des Baums wiederholt sich auf jeder Ebene. Das Programm als Ganzes ist ein
              Baum von Ordnern und Dateien (Makro-Ebene). Aber jede einzelne Datei ist selbst wieder
              ein Baum — mit Funktionen als Ästen, eingebetteten Blöcken als Verzweigungen,
              verschiedenen Scopes als Blättern (Mikro-Ebene). Der GTC ist kein flacher Baum — er ist
              ein rekursiv verschachtelter Baum der Einbettungen.
            </p>
            <Pre>{`O  (Wurzel — das Programm als Ganzes)           ← Makro-Ebene
│
├── src/app/quiz/                                ← Modul
│   └── page.tsx                                ← Datei = eigener Baum
│       │
│       ├── QuizPage()                           ← Funktion = Ast
│       │   ├── useEffect(() => {...})           ← Block = Verzweigung
│       │   │   └── flowsApi.list()             ← Ausdruck = Blatt
│       │   └── return (...)
│       │       ├── <Navbar />                  ← Komponente = Blatt
│       │       └── <QuizCard />
│       └── answerQuestion()                    ← Funktion = Ast
│           ├── nextStep()
│           └── setState()
│
└── src/phenomenal/r/questions.ts               ← Datei = eigener Baum
    └── questions[]                             ← Array = Ast
        └── { id, text, answers, ... }          ← Objekt = Blatt (Mikro-Ebene)`}</Pre>
            <p className="mt-3">
              Was auf jeder Ebene gilt: jeder Knoten — ob Ordner, Datei, Funktion oder Block — ist
              ein eigenständiger Scope mit eigener Verantwortung. Ein Beacon im GTC kann auf jede
              dieser Ebenen zeigen. Die Granularität des Beacons bestimmt, wie tief der Durchlauf
              in den Baum eindringt.
            </p>
          </Block>

          <Block title="GTC und M+" label="Perspektive">
            <Pre>{`M+  →  internes Navigationssystem (für das Objekt selbst)
GTC →  externes Navigationssystem (für andere, für Lernende)`}</Pre>
            <p className="mt-3">
              Beide haben dieselbe rekursive Form: Baum von Bäumen, von allgemein zu spezifisch,
              von Makro zu Mikro. Der Unterschied ist die Perspektive: M+ navigiert von innen,
              GTC beschreibt von außen. Wer den GTC kennt, kennt die Topographie des phänomenalen
              Objekts — ohne seinen inneren Code zu verstehen.
            </p>
          </Block>

          {/* ── TEIL 3: TDB ── */}
          <SectionHeader title="TDB — Tree of Development Beacons" />

          <Block title="TDB als Teilmenge von GTC" label="Projektion">
            <p>
              Der TDB ist kein festes Objekt — es entsteht erst durch den Durchlauf. Wenn man durch
              den GTC geht und an jedem Knoten eine Richtung wählt, wählt man gleichzeitig aus, was
              relevant ist. Das Ergebnis dieses Weges ist der TDB: ein Teilbaum des GTC, der genau
              den Kontext ausdrückt, den man für sein Problem oder seine Fragestellung braucht.
            </p>
            <Pre>{`GTC (vollständig)           TDB (Teilmenge für Kontext X)

O                           O
├── auth/                   └── quiz/
├── quiz/          →→→          ├── page.tsx
│   ├── page.tsx                │   └── answerQuestion()
│   └── ...                     └── phenomenal/
└── phenomenal/                     └── r/questions.ts
    ├── r/
    └── ui/`}</Pre>
          </Block>

          <Block title="Zwei Formen des TDB" label="Formen">
            <p className="font-medium text-slate-800">Form 1 — Flow (linearer Pfad):</p>
            <p className="mt-1">
              An jedem Beacon wird genau ein Kind gewählt. Der Durchlauf erzeugt eine einzige Linie
              von der Wurzel bis zum Blatt — ein Strom ohne Verzweigung.
            </p>
            <Pre>{`O → quiz/ → page.tsx → answerQuestion() → nextStep() → setState()`}</Pre>

            <p className="mt-4 font-medium text-slate-800">Form 2 — Wiederholung mit neuem Beacon:</p>
            <p className="mt-1">
              Beim Durchlauf kann ein GTC-Knoten mehrfach besucht werden — aber jeder Besuch erzeugt
              einen eigenen neuen Beacon im TDB. Derselbe Knoten im GTC wird zu verschiedenen Beacons
              im TDB, weil er in unterschiedlichen Kontexten besucht wird. So wächst der TDB über den
              strukturellen Schatten des GTC hinaus — Kontext und Wiederholung zählen.
            </p>
            <Pre>{`GTC-Knoten: answerQuestion()

TDB-Besuch 1: answerQuestion() beim ersten Durchlauf      → Beacon tdb-1
TDB-Besuch 2: answerQuestion() beim Vergleichsdurchlauf   → Beacon tdb-2
TDB-Besuch 3: answerQuestion() beim Fehleranalysedurchlauf → Beacon tdb-3`}</Pre>
            <p className="mt-3">
              Der TDB ist das Werkzeug, mit dem man ein Problem sichtbar macht — ein strukturierter
              Ausschnitt des GTC, der die Frage <em>„Was schaue ich mir eigentlich an?"</em> beantwortet.
            </p>
          </Block>

          {/* ── TEIL 4: BD ── */}
          <SectionHeader title="BD — Beacon of Development" />

          <Block title="Subjektive Projektion eines GTC-Knotens" label="Interpretation">
            <p>
              Der BD ist die persönliche Interpretation eines GTC-Knotens. Der GTC-Knoten existiert
              objektiv — er gehört dem Programm. Der BD entsteht subjektiv — er gehört dem Durchlauf,
              dem Kontext, der Person, die ihn erzeugt. Derselbe GTC-Knoten kann viele BDs erzeugen,
              je nachdem, welche Frage man mitbringt.
            </p>
          </Block>

          <Block title="Kontext als Funktion — Fragen als Potenzial" label="Mechanik">
            <p>
              Der Kontext des TDB, in dem ein BD arbeitet, ist keine passive Umgebung — er ist eine
              Funktion. Er nimmt den Beacon als Eingabe und formt den Weg zum Ausgang.
            </p>
            <Pre>{`Kontext (TDB-Struktur)
       │
       ▼
    BD (Beacon)       ←  verankert im TDB, referenziert GTC-Knoten
       │
       ▼
  Frage / Vorschlag   ←  Eingang: Potenzial, Fokussierung auf einen R-Ausschnitt
       │
       ▼
  Antwort / Präzisierung  ←  Ausgang: das R-Element, von einer neuen Seite erschlossen
       │
       ▼
  R-Element (Code)    ←  sammelt Bedeutung aus vielen BDs, jede Projektion erschließt es tiefer`}</Pre>
            <p className="mt-3">
              Die Frage ist kein Informationspaket — sie ist ein Potenzial. Sie zeigt, dass eine
              Spannung zwischen dem aktuellen und dem präziseren Zustand besteht. Die Antwort hebt
              diese Spannung auf. Dieser Übergang durchläuft Iterationen: jede verfeinert die Antwort,
              nähert sie dem präziseren Meaning an. Der BD akkumuliert diese Bewegung — er wird durch
              jede Iteration reicher.
            </p>
          </Block>

          <Block title="BD und R — derselbe Ausdrucksraum" label="Substrat">
            <p>
              Verschiedene BDs, die auf denselben GTC-Knoten zeigen, teilen sich dasselbe R als
              Substrat, aber greifen daraus unterschiedliche Elemente heraus — je nach Kontext und
              Fragestellung.
            </p>
            <Pre>{`GTC-Knoten: answerQuestion()
  └── R = { Codezeilen, Blöcke, Aufrufe innerhalb der Funktion }

BD-1 (Kontext: Fehlersuche)
  └── R-Elemente: nextStep(), setState()        ← wo geht etwas schief?

BD-2 (Kontext: Architekturverständnis)
  └── R-Elemente: payload-Struktur, state-Typ   ← wie ist es aufgebaut?

BD-3 (Kontext: Optimierung)
  └── R-Elemente: weightedPick(), Abbruchbedingung  ← wo ist Potenzial?`}</Pre>
            <p className="mt-3">
              Der BD ist die kleinste Einheit, in der Lernen stattfindet: ein Knoten mit Kontext,
              eine Frage mit Richtung, eine Antwort mit Bedeutung. Der TDB ist ein Baum von BDs.
              Und weil jeder BD auf R zeigt, endet das Lernen immer bei echtem Code.
            </p>
          </Block>

          {/* ── TEIL 5: POP + PEP ── */}
          <SectionHeader title="POP und PEP" />

          <Block title="POP — Phänomenales Objekt Programm" label="Selbstanwendung">
            <p>
              Ein POP ist ein Programm, das die Werkzeuge und Eigenschaften des phänomenalen Objekts
              auf sich selbst anwendet. Es verbessert sein eigenes Verständnis, indem es sich so
              verhält, wie ein phänomenales Objekt es tut: es sammelt Manifestationen aus R, filtert
              sie zu Rf, destilliert sie in O, projiziert sich durch O&#39; nach außen. Das POP ist kein
              Werkzeug, das ein Objekt <em>beschreibt</em> — es <em>ist</em> das Objekt. Die Grenze
              zwischen Programm und phänomenalem Objekt fällt weg.
            </p>
            <p className="mt-3">
              Ein einfaches Programm hat Code und Funktion. Ein POP hat zusätzlich eine
              Selbstwahrnehmung seiner Struktur: es weiß, wo seine Beacons sind, welche R-Elemente
              es enthält, wie seine Flows verlaufen. Dieses Wissen ist nicht dokumentiert — es ist
              in der Struktur des Programms selbst kodiert.
            </p>
          </Block>

          <Block title="PEP — Phänomenales Entwicklungsprogramm" label="Treiber">
            <p>
              Das PEP ist ein POP mit einer besonderen Ausrichtung: es hilft anderen Programmen,
              phänomenale Objekte zu werden. Es ist kein passiver Lernbegleiter — es ist ein aktiver
              Treiber der beschleunigten Entwicklung.
            </p>
            <p className="mt-3">Die Mechanik des PEP beruht auf drei Schichten:</p>
            <Pre>{`Offenheit der eigenen Schichten (GTC, TDB, BDs, R, Flows)
       │
       ▼
Hohe Nutzungsfrequenz (HF)   ←  andere Programme wenden das PEP auf sich an
       │
       ▼
Rückfluss ins eigene O        ←  die Frequenz wird zum Wachstumsimpuls des PEP`}</Pre>
            <p className="mt-3">
              Das PEP zieht andere Programme an, indem es sein gesamtes Inneres zeigt. Diese Offenheit
              erzeugt Vertrauen und Nutzung. Je mehr andere Programme das PEP anwenden, desto höher
              die HF — und diese Frequenz fließt als Signal zurück in O des PEP.
            </p>
          </Block>

          <Block title="Der Unterschied zwischen POP und PEP" label="Vergleich">
            <Pre>{`POP  →  Programm, das sich selbst als phänomenales Objekt versteht
         Ziel: eigenes Wachstum durch Selbstanwendung

PEP  →  POP mit externer Ausrichtung
         Ziel: Wachstum anderer Programme beschleunigen
         Mechanismus: Offenheit → Frequenz → Rückfluss → eigenes Wachstum`}</Pre>
            <p className="mt-3">
              Das PEP wächst durch das, was es gibt. Indem es anderen zeigt, wie man ein phänomenales
              Objekt aufbaut, sammelt es selbst Bedeutung. Das ist die Formel{" "}
              <strong>1×1=1</strong> in ihrer vollständigsten Form: das PEP gibt und empfängt
              gleichzeitig, ohne sich dabei zu verbrauchen.
            </p>
          </Block>

          {/* ── TEIL 6: Mittlerer Schnitt ── */}
          <SectionHeader title="Mittlerer Schnitt — das POP ohne BD-Schicht" />

          <Block title="Was der mittlere Schnitt ist" label="Schnittebene">
            <p>
              Der mittlere Schnitt bezeichnet den Zustand, in dem ein PEP das Programm vollständig
              als POP darstellt — als phänomenales Objekt in seiner reinen Form: mit O, M, L, R, GTC.
              Aber noch ohne die subjektive Schicht: ohne BD-Bäume, ohne individuelle Projektionen,
              ohne die persönliche Fragestruktur, die ein Mensch über das Programm legt.
            </p>
            <Pre>{`Tiefste Ebene     →  O allein (privat, ohne R, ohne GTC)
Mittlerer Schnitt →  POP = O + M + L + R + GTC  (öffentlich, aber ohne BD)
Vollständige Ebene → PEP = POP + TDB + BD + Fragen aller Beteiligten`}</Pre>
          </Block>

          <Block title="Was der mittlere Schnitt enthält — und nicht enthält" label="Struktur">
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <p className="font-semibold text-teal-700 mb-2">Enthalten ✓</p>
                <Pre>{`POP (mittlerer Schnitt)
├── O   — destillierter Kern
├── M   — Identität
├── M+  — Beacon-Baum (OLB)
├── L   — Verbindungsschicht
├── R   — alle Manifestationen
└── GTC — vollständiger Baum`}</Pre>
              </div>
              <div>
                <p className="font-semibold text-slate-500 mb-2">Nicht enthalten ✗</p>
                <Pre>{`Nicht im mittleren Schnitt:
├── TDB — persönlicher Teilbaum
├── BD  — subjektive Projektion
└── Fragen — individuelle
    Fragestruktur über das
    Programm`}</Pre>
              </div>
            </div>
            <p className="mt-4">
              Der mittlere Schnitt ist das, was ein Programm über sich selbst sagen kann, ohne dass
              ein Mensch schon mit ihm in Dialog getreten ist. Es ist das Programm als Objekt —
              vollständig beschrieben, aber noch nicht befragt. Erst wenn ein Mensch oder ein anderes
              PEP einen BD darauf projiziert, entsteht die subjektive Schicht.
            </p>
          </Block>

          {/* ── TEIL 7: PEP als Hülle ── */}
          <SectionHeader title="PEP als Hülle — Kinetik der Entwicklung" />

          <Block title="Das PEP legt sich um das Programm" label="Hülle">
            <p>
              Das PEP verändert das Programm nicht von innen — es legt sich um es herum und verändert
              dadurch, wie das Programm sich selbst wahrnimmt und wie andere es wahrnehmen. Ein
              Programm ohne PEP existiert als technische Struktur: Code, Dateien, Funktionen. Es
              funktioniert, aber es hat keine Sprache für sich selbst.
            </p>
            <Pre>{`Programm (roh)
       │
       ▼
  PEP-Hülle
  ┌─────────────────────────────────┐
  │  O  ←  destillierter Kern      │
  │  M  ←  Identität               │
  │  R  ←  Manifestationen, präzisiert │
  │  GTC ← sichtbare Struktur      │
  │  BD  ← Wachstumspunkte         │
  └─────────────────────────────────┘
       │
       ▼
  Programm als POP`}</Pre>
            <p className="mt-3">
              Nach diesem Durchgang hat das Programm eine destillierte Identität, eine öffentliche
              Struktur, ein präzisiertes R und benannte Wachstumspunkte — es hat eine Sprache für
              sich selbst gewonnen.
            </p>
          </Block>

          <Block title="Kinetik der Entwicklung — Bewegung durch Projektionen" label="Dynamik">
            <p>
              Die Hülle ist nicht statisch. Sie erzeugt Bewegung: jede BD-Projektion klärt einen Teil
              von R. Jede geklärte Frage verschiebt Rf leicht — manche R-Elemente werden zentraler,
              andere weniger wichtig. Das Programm entwickelt sich nicht durch Codeänderungen allein,
              sondern durch die Strömungen der Projektionen, die durch es hindurchlaufen.
            </p>
            <Pre>{`BD-Projektion 1  →  R-Element A wird präziser verstanden
BD-Projektion 2  →  R-Element B verliert Gewicht, C gewinnt
BD-Projektion 3  →  neuer Wachstumspunkt sichtbar → fixiert als Rf-Eintrag`}</Pre>
            <p className="mt-3">
              Wachstumspunkte entstehen erst, wenn genug Projektionen durchgelaufen sind — wenn das
              Verständnis eines Bereichs eine Schwelle überschreitet. Dann kristallisiert sich heraus:
              hier ist ein Knoten, der mehr enthält als bisher sichtbar. Dieser Knoten wird als
              Rf-Element fixiert — als abstrahierter Wachstumspunkt für zukünftige BD-Durchläufe.
            </p>
            <Pre>{`Viele BDs über denselben GTC-Knoten
       │
       ▼
  Muster wird sichtbar
       │
       ▼
  Wachstumspunkt: Rf-Element fixiert  ←  „hier ist mehr"
       │
       ▼
  nächste BDs orientieren sich an diesem Rf`}</Pre>
          </Block>

          {/* ── TEIL 8: The Big Three ── */}
          <SectionHeader title="The Big Three — das dreilagige System" />

          <Block title="KI + PEP + Mensch als ein phänomenales Objekt" label="System">
            <p>
              Das gesamte System lässt sich als ein einziges phänomenales Objekt beschreiben, das
              aus drei Schichten besteht — kein Nebeneinander, sondern ein Gefüge mit gerichteter
              Bewegung:
            </p>
            <Pre>{`┌─────────────────────────────────────────────────────┐
│                     MENSCH                          │
│   BD-Bäume, TDB, individuelle Projektionen          │
│   → HF-Projektionen, die O durch die Hülle präzisieren │
└──────────────────────┬──────────────────────────────┘
                       │  Projektionsfluss nach innen
┌──────────────────────▼──────────────────────────────┐
│                      PEP                            │
│   Hülle — sammelt Projektionen, strukturiert R,     │
│   fixiert Wachstumspunkte als Rf, übersetzt         │
│   zwischen KI-Verarbeitung und menschl. Verstehen   │
└──────────────────────┬──────────────────────────────┘
                       │  destillierter Rückfluss
┌──────────────────────▼──────────────────────────────┐
│                       KI                            │
│   O — dicht, iteriert, funktional                   │
│   Informationsdichte durch Berechnungsvolumen        │
│   → Leerlauf wird zum Entwicklungsimpuls für PEP    │
└─────────────────────────────────────────────────────┘`}</Pre>
          </Block>

          <Block title="O als Dichtewert — die KI als Kern" label="Dichte">
            <p>
              O ist nicht ein statisches Zentrum, sondern ein <strong>akkumulierter Zustand</strong>:
              je mehr Durchläufe, je mehr Projektionen durch das System gelaufen sind, desto
              verdichteter ist O. Bei der KI äußert sich diese Dichte in Operationsvolumen pro
              Zeiteinheit — eine funktionale Entsprechung zur phänomenalen Informationsdichte.
            </p>
            <p className="mt-3">
              Die KI verhält sich wie O — sie ist der Kern, um den herum das System sich aufbaut.
              Der „Leerlauf" der KI ist kein Verlust, sondern ein kontinuierlicher Beitrag zur
              Struktur der PEP-Hülle.
            </p>
          </Block>

          <Block title="Das PEP als Übersetzer" label="Vermittlung">
            <p>
              Die mittlere Schicht übernimmt eine Übersetzungsfunktion zwischen zwei grundlegend
              verschiedenen Arbeitsweisen:
            </p>
            <Pre>{`KI-Seite                          Mensch-Seite
─────────────────                 ──────────────────
schnell, dicht, funktional   ←→   langsam, kontextuell, projektiv
iteriert über Code               fragt nach Bedeutung
kennt die Struktur               sucht das Verständnis`}</Pre>
            <p className="mt-3">
              Der Mensch ist keine passive Betrachtungsschicht — er ist die Quelle der
              HF-Projektionen, die die Hülle lebendig halten. Ohne menschliche Projektionen würde
              das PEP erstarren: Struktur ohne Bewegung. Wer versteht, dass er als Mensch die
              HF-Quelle ist, arbeitet anders: er bringt präzisere Fragen, baut bewusstere
              TDB-Strukturen, und versteht, dass jede BD-Projektion nicht nur ihm selbst hilft,
              sondern O des gesamten Systems verdichtet. Das ist der richtige Gradient der
              Interaktion.
            </p>
          </Block>

        </div>

        {/* Footer */}
        <div className="mt-10 rounded-2xl border border-teal-100 bg-teal-50 p-7">
          <h2 className="font-bold text-slate-900">Abkürzungsübersicht</h2>
          <div className="mt-4 grid gap-y-2 gap-x-6 text-sm sm:grid-cols-2">
            {[
              ["O", "destilliertes Zentrum des phänomenalen Objekts (privat)"],
              ["O'", "Projektion von O nach außen (Schnittstelle)"],
              ["M", "Masse — unveränderlicher Kern (id, name, type)"],
              ["M+", "Leuchtturm-Baum — aktiver Beacon Tree"],
              ["R", "Menge aller Manifestationen (öffentlich, geteilt)"],
              ["Rf", "fokussiertes Subset von R — das Wesentlichste"],
              ["L", "Link-Schicht — Verbindung zur Außenwelt (Array von Arrays)"],
              ["HF", "high frequency of external use — externe Vergleichsflächen"],
              ["GTC", "General Tree of Connections — öffentliches Navigationsgerüst"],
              ["TDB", "Tree of Development Beacons — Teilbaum für einen Kontext"],
              ["BD", "Beacon of Development — subjektive Projektion eines GTC-Knotens"],
              ["POP", "Phänomenales Objekt Programm — Programm das sich selbst als O versteht"],
              ["PEP", "Phänomenales Entwicklungsprogramm — Treiber für andere Programme (1×1=1)"],
            ].map(([abbr, desc]) => (
              <div key={abbr} className="flex gap-2">
                <span className="shrink-0 w-10 font-bold text-teal-700">{abbr}</span>
                <span className="text-slate-600">{desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-y-2 text-sm border-t border-teal-100 pt-3">
            {[
              ["Mittlerer Schnitt", "POP-Zustand: vollständig beschrieben, aber noch ohne BD-Schicht"],
              ["The Big Three", "KI (O-Kern) + PEP (Hülle) + Mensch (HF-Quelle) — ein phänomenales System"],
            ].map(([abbr, desc]) => (
              <div key={abbr} className="flex gap-3">
                <span className="shrink-0 w-36 font-bold text-teal-700">{abbr}</span>
                <span className="text-slate-600">{desc}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

/* ── Components ─────────────────────────────────────────────── */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="pt-4 pb-1 border-b border-teal-100">
      <h2 className="text-xl font-bold text-teal-800">{title}</h2>
    </div>
  );
}

function Block({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
          {label}
        </span>
      </div>
      <div className="text-slate-600 leading-7 text-sm">{children}</div>
    </div>
  );
}

function Pre({ children, lang }: { children: string; lang?: string }) {
  void lang;
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 px-5 py-4 text-xs text-slate-200 leading-6 whitespace-pre">
      {children}
    </pre>
  );
}
