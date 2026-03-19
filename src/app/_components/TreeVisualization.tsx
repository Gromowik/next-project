/**
 * TreeVisualization — Server Component.
 * Реальное дерево M+-беконов из проекта, нарисованное SVG.
 * Анимация через CSS, JavaScript не нужен.
 *
 * Структура из src/phenomenal/mplus/tree.ts:
 *   root → [M+1, M+2, M+3]
 *   M+1  → [1-1, 1-2]    M+2 → [2-1, 2-2]    M+3 → [3-1, 3-2]
 *   1-1  → [4-1]         2-1 → [4-2]          3-1 → [4-3]
 *   1-2, 2-2, 3-2 → [] (листья без потомков)
 */
export function TreeVisualization() {
  return (
    <section className="mb-10 overflow-hidden rounded-3xl border border-emerald-100 bg-white px-6 pb-5 pt-7 shadow-sm">
      <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Verständnisbaum</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Jeder Quiz-Durchlauf ist ein Schnitt von der Wurzel bis zum Blatt —
            wie ein Programmaufruf, der ein Ergebnis zurückgibt.
            Der animierte Pfad zeigt einen möglichen Durchlauf.
          </p>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
            aktiver Pfad
          </span>
          <span className="flex items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-amber-400 ring-2 ring-amber-100" />
            Blattknoten
          </span>
          <span className="flex items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-emerald-100 ring-1 ring-emerald-200" />
            inaktiv
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 700 300"
        className="mt-4 w-full"
        style={{ maxHeight: 260 }}
        aria-label="Visualisierung des Quiz-Verständnisbaums mit 13 Knoten"
        role="img"
      >
        <defs>
          <radialGradient id="tv-grad-root" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#065f46" />
          </radialGradient>
          <radialGradient id="tv-grad-active" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#059669" />
          </radialGradient>
          <radialGradient id="tv-grad-idle" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#bbf7d0" />
          </radialGradient>
          <radialGradient id="tv-grad-leaf" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
          <radialGradient id="tv-grad-leaf-idle" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde68a" />
          </radialGradient>
        </defs>

        <style>{`
          .tv-lbl { font-size: 8px; fill: #64748b; text-anchor: middle; font-family: ui-monospace, monospace; }
          .tv-lbl-a { fill: #065f46; font-weight: 700; }
          .tv-lbl-r { font-size: 9px; fill: #052e16; font-weight: 700; }
          .tv-lbl-l { fill: #78350f; font-weight: 600; }

          .tv-idle { stroke: #d1fae5; stroke-width: 1.5; fill: none; }
          .tv-flow { stroke: #10b981; stroke-width: 2; fill: none;
                     stroke-dasharray: 8 5;
                     animation: tv-dash 1.6s linear infinite; }
          @keyframes tv-dash { from { stroke-dashoffset: 26; } to { stroke-dashoffset: 0; } }

          /* Halo glow — scale from fill-box center */
          .tv-h0 { fill: #6ee7b7; animation: tv-halo 2.4s ease-in-out 0.0s infinite; }
          .tv-h1 { fill: #6ee7b7; animation: tv-halo 2.4s ease-in-out 0.4s infinite; }
          .tv-h2 { fill: #6ee7b7; animation: tv-halo 2.4s ease-in-out 0.8s infinite; }
          .tv-h3 { fill: #fbbf24; animation: tv-halo 2.4s ease-in-out 1.2s infinite; }
          .tv-h0,.tv-h1,.tv-h2,.tv-h3 {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;
          }
          @keyframes tv-halo {
            0%   { opacity: 0;    transform: scale(1);   }
            40%  { opacity: 0.35; transform: scale(1.4); }
            100% { opacity: 0;    transform: scale(1.8); }
          }
        `}</style>

        {/* ── IDLE LINES ── */}
        {/* root → M+2, M+3 */}
        <line x1="350" y1="58" x2="350" y2="103" className="tv-idle" />
        <line x1="350" y1="58" x2="583" y2="103" className="tv-idle" />
        {/* M+1 → 1-2 */}
        <line x1="117" y1="127" x2="174" y2="180" className="tv-idle" />
        {/* M+2 → 2-1, 2-2 */}
        <line x1="350" y1="127" x2="292" y2="180" className="tv-idle" />
        <line x1="350" y1="127" x2="408" y2="180" className="tv-idle" />
        {/* M+3 → 3-1, 3-2 */}
        <line x1="583" y1="127" x2="524" y2="180" className="tv-idle" />
        <line x1="583" y1="127" x2="640" y2="180" className="tv-idle" />
        {/* leaf parents → leaf children (non-active) */}
        <line x1="292" y1="200" x2="292" y2="250" className="tv-idle" />
        <line x1="524" y1="200" x2="524" y2="250" className="tv-idle" />

        {/* ── ACTIVE FLOW LINES (animated dashes) ── */}
        <line x1="350" y1="58"  x2="117" y2="103" className="tv-flow" />
        <line x1="117" y1="127" x2="60"  y2="180" className="tv-flow" style={{ animationDelay: '0.4s' }} />
        <line x1="60"  y1="200" x2="60"  y2="250" className="tv-flow" style={{ animationDelay: '0.8s' }} />

        {/* ══ LEVEL 1: ROOT ══ */}
        <circle cx="350" cy="42" r="24" className="tv-h0" />
        <circle cx="350" cy="42" r="16" fill="url(#tv-grad-root)" stroke="#065f46" strokeWidth="1.5" />
        <text x="350" y="46" className="tv-lbl tv-lbl-r">root</text>

        {/* ══ LEVEL 2 ══ */}
        {/* M+1 — active path */}
        <circle cx="117" cy="115" r="18" className="tv-h1" />
        <circle cx="117" cy="115" r="12" fill="url(#tv-grad-active)" stroke="#059669" strokeWidth="1.5" />
        <text x="117" y="137" className="tv-lbl tv-lbl-a">M+1</text>
        {/* M+2 — idle */}
        <circle cx="350" cy="115" r="11" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="350" y="136" className="tv-lbl">M+2</text>
        {/* M+3 — idle */}
        <circle cx="583" cy="115" r="11" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="583" y="136" className="tv-lbl">M+3</text>

        {/* ══ LEVEL 3 ══ */}
        {/* 1-1 — active path */}
        <circle cx="60" cy="190" r="16" className="tv-h2" />
        <circle cx="60" cy="190" r="10" fill="url(#tv-grad-active)" stroke="#059669" strokeWidth="1.5" />
        <text x="60" y="210" className="tv-lbl tv-lbl-a">1-1</text>
        {/* 1-2 — idle */}
        <circle cx="174" cy="190" r="9" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="174" y="209" className="tv-lbl">1-2</text>
        {/* 2-1 */}
        <circle cx="292" cy="190" r="9" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="292" y="209" className="tv-lbl">2-1</text>
        {/* 2-2 */}
        <circle cx="408" cy="190" r="9" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="408" y="209" className="tv-lbl">2-2</text>
        {/* 3-1 */}
        <circle cx="524" cy="190" r="9" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="524" y="209" className="tv-lbl">3-1</text>
        {/* 3-2 */}
        <circle cx="640" cy="190" r="9" fill="url(#tv-grad-idle)" stroke="#bbf7d0" strokeWidth="1" />
        <text x="640" y="209" className="tv-lbl">3-2</text>

        {/* ══ LEVEL 4: LEAVES ══ */}
        {/* 4-1 — active leaf, glows amber */}
        <circle cx="60" cy="262" r="16" className="tv-h3" />
        <circle cx="60" cy="262" r="10" fill="url(#tv-grad-leaf)" stroke="#b45309" strokeWidth="1.5" />
        <text x="60" y="282" className="tv-lbl tv-lbl-l">4-1 ✦</text>
        {/* 4-2 — idle leaf */}
        <circle cx="292" cy="262" r="9" fill="url(#tv-grad-leaf-idle)" stroke="#fde68a" strokeWidth="1" />
        <text x="292" y="281" className="tv-lbl tv-lbl-l" style={{ fontWeight: 'normal' }}>4-2</text>
        {/* 4-3 — idle leaf */}
        <circle cx="524" cy="262" r="9" fill="url(#tv-grad-leaf-idle)" stroke="#fde68a" strokeWidth="1" />
        <text x="524" y="281" className="tv-lbl tv-lbl-l" style={{ fontWeight: 'normal' }}>4-3</text>

        {/* ── distance labels on right side ── */}
        <text x="692" y="46"  className="tv-lbl" style={{ fill: '#cbd5e1', fontSize: '7px' }}>d=1</text>
        <text x="692" y="119" className="tv-lbl" style={{ fill: '#cbd5e1', fontSize: '7px' }}>d=2</text>
        <text x="692" y="194" className="tv-lbl" style={{ fill: '#cbd5e1', fontSize: '7px' }}>d=3</text>
        <text x="692" y="266" className="tv-lbl" style={{ fill: '#cbd5e1', fontSize: '7px' }}>d=4</text>
      </svg>
    </section>
  );
}
