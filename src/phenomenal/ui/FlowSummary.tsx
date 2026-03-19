type Props = {
  score: number;
  importance: number;
  savedCount: number;
  onClose: () => void;
};

export function FlowSummary({ score, importance, savedCount, onClose }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="mb-3 text-lg font-semibold">Ergebnis des Durchlaufs</h3>
      <div className="space-y-2 text-gray-700">
        <p>Richtige Antworten: {score}</p>
        <p>Gesamtwichtigkeit: {importance}</p>
        <p>Gespeicherte Durchläufe: {savedCount}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
      >
        Fluss beenden
      </button>
    </div>
  );
}
