type StartCard = {
  title: string;
  value: string;
  meta: string;
};

type StartScreenProps = {
  topBeacons: StartCard[];
  topFlows: StartCard[];
  topQuestions: StartCard[];
};

function Section({ title, subtitle, items }: { title: string; subtitle: string; items: StartCard[] }) {
  return (
    <section className="space-y-3 rounded-2xl bg-white p-5 shadow">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <article key={`${title}-${item.title}-${item.value}`} className="rounded-xl border border-emerald-100 bg-linear-to-br from-white to-emerald-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-lg font-bold text-emerald-700">{item.value}</p>
            <p className="mt-2 text-xs text-slate-500">{item.meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StartScreen({ topBeacons, topFlows, topQuestions }: StartScreenProps) {
  return (
    <div className="space-y-5 text-slate-900">
      <div className="rounded-2xl bg-white p-6 shadow">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-slate-900">Verständnisbaum statt Fragenliste</h1>
          <p className="text-gray-700">
            Dieses Quiz arbeitet mit einem Baum von Beacons und nicht mit einer flachen Sammlung isolierter Fragen.
            Jeder Durchlauf ist ein Schnitt durch die Struktur des Verstehens: vom oberen Aufruf bis zum unteren Ergebnis.
          </p>
          <p className="text-sm text-slate-500">
            Vor dem Start siehst du die aktuell wichtigsten Vertreter der Schichten. Während des Quiz entsteht der Fluss als Karten-Spalte von oben nach unten.
          </p>
        </div>
      </div>

      <Section
        title="Top-5 Beacons nach Frequenz"
        subtitle="Diese Knoten wurden bisher am häufigsten aktiviert."
        items={topBeacons}
      />

      <Section
        title="Top-5 Flüsse nach Wichtigkeit"
        subtitle="Gespeicherte Durchläufe mit der höchsten Gesamtwichtigkeit."
        items={topFlows}
      />

      <Section
        title="Top-5 Fragen nach Wichtigkeit"
        subtitle="Fragen, die im Lernen aktuell am stärksten gewichtet sind."
        items={topQuestions}
      />
    </div>
  );
}
