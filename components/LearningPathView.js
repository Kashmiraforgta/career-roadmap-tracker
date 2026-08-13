import { learningPaths } from "../lib/data";

function PathCard({ path }) {
  return (
    <div className="bg-white rounded-2xl border border-line shadow-sm overflow-hidden">
      <div className="bg-navy text-white p-5 sm:p-6">
        <h3 className="font-display font-semibold text-lg">{path.title}</h3>
        <p className="text-sm text-white/60 mt-1">{path.subtitle}</p>
        {path.timeframe && (
          <span className="inline-block mt-2 text-[11px] font-tabular bg-white/10 rounded-full px-3 py-1">
            {path.timeframe}
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          <div className="space-y-5">
            {path.phases.map((phase, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-white shadow" />
                <h4 className="font-medium text-navy text-sm">{phase.title}</h4>
                <ul className="mt-1.5 space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-sm text-ink flex items-start gap-1.5">
                      <span className="text-accent mt-1 shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {path.strategies && (
          <div className="bg-signalsoft rounded-xl p-4">
            <h4 className="font-medium text-navy text-sm mb-2">Key strategies</h4>
            <ul className="space-y-1.5">
              {path.strategies.map((s, i) => (
                <li key={i} className="text-sm text-ink flex items-start gap-1.5">
                  <span className="text-signal mt-1 shrink-0">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LearningPathView() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">Learning Path Reference</h2>
        <p className="text-sm text-inksoft mt-1">
          The full phase-by-phase source roadmaps in one place. The granular topics from these are already
          folded into your Tech &amp; Finance Track checklists — this view is for context and strategy, not
          day-to-day checkboxes.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {learningPaths.map((p) => (
          <PathCard key={p.id} path={p} />
        ))}
      </div>
    </div>
  );
}
