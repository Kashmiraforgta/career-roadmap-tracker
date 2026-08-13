"use client";

import { buildHeatmapGrid, computeStreaks, heatLevel, STREAK_BADGES } from "../lib/stats";

const LEVEL_COLOR = ["#E4E9F1", "#CFE7E4", "#9FCFC9", "#5CA79E", "#2E6F71"];

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function StreakHeatmap({ activityLog }) {
  const grid = buildHeatmapGrid(activityLog, 18);
  const { current, longest } = computeStreaks(activityLog);

  // Figure out which week-columns should carry a month label (first column
  // where the month changes from the previous column's first day).
  const monthLabels = grid.map((week, i) => {
    const d = new Date(week[0].date + "T00:00:00");
    if (i === 0) return MONTH_ABBR[d.getMonth()];
    const prevD = new Date(grid[i - 1][0].date + "T00:00:00");
    return d.getMonth() !== prevD.getMonth() ? MONTH_ABBR[d.getMonth()] : "";
  });

  return (
    <div className="bg-navy rounded-2xl p-5 sm:p-6 text-white shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h3 className="font-display font-semibold text-white">Activity Log</h3>
          <p className="text-xs text-white/50 mt-0.5">Every day you touched the tracker, over the last {grid.length} weeks</p>
        </div>
        <div className="flex gap-5">
          <div className="text-right">
            <p className="font-tabular text-2xl font-bold text-signal">{current}</p>
            <p className="text-[10px] uppercase tracking-wide text-white/50">Current streak</p>
          </div>
          <div className="text-right">
            <p className="font-tabular text-2xl font-bold text-white">{longest}</p>
            <p className="text-[10px] uppercase tracking-wide text-white/50">Longest streak</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-[3px]" style={{ minWidth: grid.length * 13 }}>
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px] relative">
              {monthLabels[wi] && (
                <span className="absolute -top-4 left-0 text-[9px] text-white/40 whitespace-nowrap">
                  {monthLabels[wi]}
                </span>
              )}
              {week.map((day) => {
                const lvl = heatLevel(day.count);
                if (lvl === -1) {
                  return <div key={day.date} className="w-[10px] h-[10px] rounded-[2px]" />;
                }
                return (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} action${day.count === 1 ? "" : "s"}`}
                    className={`w-[10px] h-[10px] rounded-[2px] ${day.isToday ? "ring-1 ring-signal" : ""}`}
                    style={{ backgroundColor: LEVEL_COLOR[lvl] }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-4 justify-end">
        <span className="text-[10px] text-white/40 mr-1">Less</span>
        {LEVEL_COLOR.map((c) => (
          <div key={c} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
        ))}
        <span className="text-[10px] text-white/40 ml-1">More</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
        {STREAK_BADGES.map((b) => {
          const unlocked = longest >= b.days;
          return (
            <div
              key={b.days}
              title={unlocked ? `Unlocked at ${b.days}-day streak` : `Reach a ${b.days}-day streak to unlock`}
              className={`flex items-center gap-1.5 text-[11px] rounded-full px-3 py-1.5 border ${
                unlocked ? "bg-signal/20 border-signal text-signal" : "bg-white/5 border-white/10 text-white/30"
              }`}
            >
              <span>{unlocked ? "🔥" : "○"}</span>
              {b.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
