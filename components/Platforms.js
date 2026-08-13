import { platforms } from "../lib/data";
import ProgressBar from "./ProgressBar";

export default function Platforms({ trackerState }) {
  const { state, updatePlatform } = trackerState;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">Practice Platforms</h2>
        <p className="text-sm text-inksoft mt-1">LeetCode, GeeksforGeeks, HackerRank, HackerEarth, Codeforces & Kaggle — log your progress and notes for each.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {platforms.map((p) => {
          const val = state.platformProgress[p.id]?.value || 0;
          const notes = state.platformProgress[p.id]?.notes || "";
          return (
            <div key={p.id} className="card-hover bg-white rounded-2xl border border-line p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-ink">{p.name}</h3>
                  <p className="text-xs text-inksoft mt-0.5">{p.purpose}</p>
                </div>
                <span className="text-xs text-inksoft shrink-0 ml-2 font-tabular">{p.unit}</span>
              </div>

              <div className="mt-4">
                <ProgressBar value={val} max={p.goal} color="#2E6F71" />
                <div className="flex justify-between text-xs text-inksoft mt-1 font-tabular">
                  <span>{val} / {p.goal}</span>
                  <span>{Math.min(100, Math.round((val / p.goal) * 100))}%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => updatePlatform(p.id, { value: Math.max(0, val - 1) })}
                  className="w-8 h-8 rounded-lg border border-line text-inksoft hover:bg-paper"
                >
                  −
                </button>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => updatePlatform(p.id, { value: Math.max(0, Number(e.target.value) || 0) })}
                  className="w-20 text-center border border-line rounded-lg py-1.5 text-sm font-tabular"
                />
                <button
                  onClick={() => updatePlatform(p.id, { value: val + 1 })}
                  className="w-8 h-8 rounded-lg border border-line text-inksoft hover:bg-paper"
                >
                  +
                </button>
                <span className="text-xs text-inksoft ml-1 font-tabular">goal: {p.goal}</span>
              </div>

              <textarea
                value={notes}
                onChange={(e) => updatePlatform(p.id, { notes: e.target.value })}
                placeholder="Notes — weak topics, contest results, certificate links..."
                className="w-full mt-3 text-sm border border-line rounded-lg p-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
                rows={2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
