import type { SeedValidationResult } from "@/phenomenal/db/validate-seed";

type FooterProps = {
  isDev: boolean;
  seedCheck: SeedValidationResult | null;
  seedReport: string;
  onSeedCheck: () => void;
};

export function Footer({ isDev, seedCheck, seedReport, onSeedCheck }: FooterProps) {
  return (
    <footer className="mt-auto pt-8">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Quiz-Menü</p>
          <p className="text-xs text-slate-600">
            Entwicklungswerkzeuge und Diagnose für den aktuellen Seed.
          </p>
        </div>

        {isDev && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onSeedCheck}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Seed prüfen
            </button>

            {seedCheck && (
              <span
                className={`rounded-md px-2 py-1 text-xs font-semibold ${
                  seedCheck.ok
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {seedCheck.ok
                  ? `OK · 0 Fehler, ${seedCheck.warningCount} Hinweise`
                  : `FEHLER · ${seedCheck.errorCount} Fehler, ${seedCheck.warningCount} Hinweise`}
              </span>
            )}
          </div>
        )}
      </div>

      {isDev && seedReport && (
        <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100">
          {seedReport}
        </pre>
      )}
      </div>
    </footer>
  );
}