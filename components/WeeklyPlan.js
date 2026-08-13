"use client";

import { useState } from "react";
import { weeks } from "../lib/data";
import { QuickAddForm } from "./MistakesLog";
import { IconAlert } from "./icons";

function ReviewSection({ weekNum, review, onChange, onAddMistake, mistakeCount }) {
  const [open, setOpen] = useState(false);
  const [mistakesOpen, setMistakesOpen] = useState(false);
  const hasContent = review?.wentWell || review?.notWell || review?.adjust;

  return (
    <div className="mt-3 border-t border-line pt-3">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-xs font-medium text-inksoft hover:text-navy flex items-center gap-1.5"
        >
          <span className={`transition-transform ${open ? "rotate-90" : ""}`}>›</span>
          Weekly reflection
          {hasContent && <span className="text-[10px] bg-accentsoft text-accent px-1.5 py-0.5 rounded-full">Reviewed</span>}
        </button>
        <button
          onClick={() => setMistakesOpen((o) => !o)}
          className="text-xs font-medium text-inksoft hover:text-signal flex items-center gap-1.5"
        >
          <IconAlert className="w-3.5 h-3.5" />
          Log a mistake
          {mistakeCount > 0 && <span className="text-[10px] bg-signalsoft text-signal px-1.5 py-0.5 rounded-full">{mistakeCount}</span>}
        </button>
      </div>
      {open && (
        <div className="grid sm:grid-cols-3 gap-2 mt-2">
          <div>
            <label className="text-[10px] uppercase tracking-wide text-inksoft">Went well</label>
            <textarea
              value={review?.wentWell || ""}
              onChange={(e) => onChange(weekNum, { wentWell: e.target.value })}
              rows={2}
              className="w-full text-sm border border-line rounded-lg p-2 mt-1 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="What worked this week..."
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wide text-inksoft">Didn't go well</label>
            <textarea
              value={review?.notWell || ""}
              onChange={(e) => onChange(weekNum, { notWell: e.target.value })}
              rows={2}
              className="w-full text-sm border border-line rounded-lg p-2 mt-1 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="What slipped or felt hard..."
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wide text-inksoft">Adjust next week</label>
            <textarea
              value={review?.adjust || ""}
              onChange={(e) => onChange(weekNum, { adjust: e.target.value })}
              rows={2}
              className="w-full text-sm border border-line rounded-lg p-2 mt-1 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="One change to make..."
            />
          </div>
        </div>
      )}
      {mistakesOpen && (
        <div className="mt-3 bg-signalsoft/50 border border-signal/20 rounded-xl p-3">
          <QuickAddForm onAdd={onAddMistake} compact />
        </div>
      )}
    </div>
  );
}

export default function WeeklyPlan({ trackerState }) {
  const { state, toggleWeek, updateWeeklyReview, addMistake } = trackerState;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">Week-by-Week Plan</h2>
        <p className="text-sm text-inksoft mt-1">Check off each week as you complete its milestone, and jot a short reflection to keep pacing honest — this mirrors the roadmap's "revisit at Week 7" guidance, but works every week.</p>
      </div>
      <div className="space-y-3">
        {weeks.map((w) => {
          const done = !!state.weekDone[w.week];
          return (
            <div
              key={w.week}
              className={`card-hover bg-white rounded-2xl border p-4 sm:p-5 shadow-sm ${
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

                  <ReviewSection
                    weekNum={w.week}
                    review={state.weeklyReviews[w.week]}
                    onChange={updateWeeklyReview}
                    onAddMistake={addMistake}
                    mistakeCount={(state.mistakes || []).filter((m) => !m.resolved).length}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
