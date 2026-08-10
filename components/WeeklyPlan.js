import { weeks } from "../lib/data";

export default function WeeklyPlan({ trackerState }) {
  const { state, toggleWeek } = trackerState;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">Week-by-Week Plan</h2>
        <p className="text-sm text-inksoft mt-1">Check off each week as you complete its milestone. This mirrors the 16-week roadmap document.</p>
      </div>
      <div className="space-y-3">
        {weeks.map((w) => {
          const done = !!state.weekDone[w.week];
          return (
            <div
              key={w.week}
              className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition-colors ${
                done ? "border-accent/40 bg-accentsoft/40" : "border-line"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleWeek(w.week)}
                  className={`mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    done ? "bg-accent border-accent text-white" : "border-line text-transparent"
                  }`}
                  aria-label={`Mark week ${w.week} done`}
                >
                  ✓
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-tabular font-semibold text-white bg-navy px-2 py-0.5 rounded">Week {w.week}</span>
                    <span className={`font-medium ${done ? "line-through text-inksoft" : "text-ink"}`}>{w.focus}</span>
                  </div>
                  <p className="text-sm text-inksoft mt-1">{w.topics}</p>
                  <p className="text-sm text-accent mt-1">Milestone: {w.milestone}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
