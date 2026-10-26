"use client";

import { useMemo, useState } from "react";
import useTrackerState from "../../lib/useTrackerState";
import plannerData from "../../lib/t3-planner.json";

const TABS = [
  { id: "today", label: "Today" },
  { id: "deadlines", label: "Deadlines" },
  { id: "skills", label: "Skills" },
];

const STATUS_OPTIONS = ["Not started", "In progress", "Done"];

const PROJECT_STYLES = {
  "MAD-2": "border-orange-200 bg-orange-50 text-orange-700",
  "MLP": "border-blue-200 bg-blue-50 text-blue-700",
  "DL & GenAI": "border-purple-200 bg-purple-50 text-purple-700",
};

function getIstDateString(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const values = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") values[part.type] = part.value;
  }

  return `${values.year}-${values.month}-${values.day}`;
}

function parseIstDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0);
}

function diffInDays(fromDate, toDate) {
  const oneDayMs = 1000 * 60 * 60 * 24;
  return Math.round((toDate.getTime() - fromDate.getTime()) / oneDayMs);
}

function getSkillId(item, index) {
  const base = `${item.track || "track"}-${item.n ?? index}`;
  return base.replace(/\s+/g, "-").toLowerCase();
}

export function T3PlannerContent({ trackerState }) {
  const [tab, setTab] = useState("today");
  const [selectedDate, setSelectedDate] = useState(() => getIstDateString());

  const plannerDays = plannerData.days || [];
  const selectedDay = plannerDays.find((day) => day.date === selectedDate) || plannerDays[0] || null;

  const dayRows = useMemo(() => {
    if (!selectedDay) return [];
    return [
      {
        id: "slot1-work",
        label: "Slot 1 work",
        time: "11:00-13:30",
        project: selectedDay.slot1?.project || "MAD-2",
        task: selectedDay.slot1?.work || "",
      },
      {
        id: "slot1-study",
        label: "Slot 1 study",
        time: "13:30-15:30",
        project: selectedDay.slot1?.project || "MAD-2",
        task: selectedDay.slot1?.study || "",
      },
      {
        id: "slot2-work",
        label: "Slot 2 work",
        time: "16:15-18:45",
        project: selectedDay.slot2?.project || "MLP",
        task: selectedDay.slot2?.work || "",
      },
      {
        id: "slot2-study",
        label: "Slot 2 study",
        time: "19:00-21:00",
        project: selectedDay.slot2?.project || "MLP",
        task: selectedDay.slot2?.study || "",
      },
      {
        id: "night-a",
        label: "Night A",
        time: "21:45-23:00",
        project: selectedDay.nightA?.project || "DL & GenAI",
        task: selectedDay.nightA?.task || "",
      },
      {
        id: "night-b",
        label: "Night B",
        time: "00:30-01:45",
        project: selectedDay.nightB?.project || "DL & GenAI",
        task: selectedDay.nightB?.task || "",
      },
    ];
  }, [selectedDay]);

  const completedCount = dayRows.filter((row) => !!trackerState.state.t3Done?.[selectedDate]?.[row.id]).length;
  const progressPct = dayRows.length > 0 ? Math.round((completedCount / dayRows.length) * 100) : 0;

  const deadlines = useMemo(() => {
    const today = parseIstDate(getIstDateString());
    return [...(plannerData.deadlines || [])]
      .map((entry) => {
        const deadlineDate = parseIstDate(entry.deadline);
        const planDate = parseIstDate(entry.planBy);
        return {
          ...entry,
          deadlineDate,
          planDate,
          daysLeft: diffInDays(today, deadlineDate),
          buffer: diffInDays(planDate, deadlineDate),
        };
      })
      .sort((a, b) => a.deadlineDate - b.deadlineDate);
  }, []);

  const skillsByTrack = useMemo(() => {
    const groups = {};

    (plannerData.skills || []).forEach((item, index) => {
      const track = item.track || "General";
      const skillId = getSkillId(item, index);
      const statusValue = trackerState.state.t3SkillStatus?.[skillId] || item.status || "Not started";

      if (!groups[track]) groups[track] = [];
      groups[track].push({ ...item, skillId, statusValue });
    });

    return Object.entries(groups).map(([track, items]) => {
      const total = items.length;
      const done = items.filter((item) => item.statusValue === "Done").length;
      const percent = total > 0 ? Math.round((done / total) * 100) : 0;
      return { track, items, percent };
    });
  }, [trackerState.state.t3SkillStatus]);

  const statusBadgeClasses = (status) => {
    if (status === "Done") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (status === "In progress") return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  if (trackerState.needsPassphrase) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const value = event.currentTarget.passphrase.value.trim();
            if (value) trackerState.submitPassphrase(value);
          }}
          className="w-full max-w-sm bg-white border border-line rounded-2xl p-6 shadow-sm"
        >
          <h1 className="text-lg font-display font-bold text-navy mb-1">Career Roadmap Tracker</h1>
          <p className="text-sm text-inksoft mb-4">
            Enter your passphrase to load your synced T3 planner.
          </p>
          <input
            type="password"
            name="passphrase"
            autoFocus
            placeholder="Passphrase"
            className="w-full border border-line rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="submit"
            className="w-full bg-navy text-white text-sm font-medium rounded-lg py-2 hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="bg-[#0A1070] backdrop-blur border-b-[3px] border-[#64DF31]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-white">Career Roadmap Tracker</h1>
            <p className="text-xs text-[#A9D2E2]">T3 planner · execution log · deadline view</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-white border border-line p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy/60">T3 planner</p>
              <h2 className="text-xl font-display font-bold text-navy">T3 execution dashboard</h2>
            </div>

            <div className="inline-flex rounded-full border border-line bg-slate-50 p-1">
              {TABS.map((tabItem) => (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setTab(tabItem.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    tab === tabItem.id ? "bg-navy text-white shadow-sm" : "text-inksoft hover:text-navy"
                  }`}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>
          </div>

      {tab === "today" && (
        <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-navy/60">Daily plan</p>
              <h3 className="text-lg font-display font-bold text-navy">{selectedDate}</h3>
            </div>
            <label className="flex items-center gap-2 text-sm text-inksoft">
              <span className="font-medium">Date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value || getIstDateString())}
                className="rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </label>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-inksoft">
              <span>Day progress</span>
              <span>
                {completedCount}/{dayRows.length} done
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-navy via-accent to-emerald-400"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {dayRows.length === 0 ? (
              <p className="text-sm text-inksoft">No planner entries are available for this date.</p>
            ) : (
              dayRows.map((row) => {
                const checked = !!trackerState.state.t3Done?.[selectedDate]?.[row.id];
                const projectClasses = PROJECT_STYLES[row.project] || "border-slate-200 bg-slate-100 text-slate-700";

                return (
                  <div
                    key={row.id}
                    className="grid gap-3 rounded-xl border border-line bg-slate-50 p-3 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-center"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-inksoft/70">{row.label}</span>
                      <span className="text-xs text-inksoft">{row.time}</span>
                    </div>

                    <div className="min-w-0">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${projectClasses}`}>
                          {row.project}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-navy">{row.task}</p>
                    </div>

                    <label className="flex items-center justify-center sm:justify-end">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => trackerState.toggleT3Done(selectedDate, row.id)}
                        className="h-4 w-4 rounded border-line text-navy focus:ring-accent/30"
                      />
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {tab === "deadlines" && (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy">Project</th>
                  <th className="px-4 py-3 font-semibold text-navy">Deadline</th>
                  <th className="px-4 py-3 font-semibold text-navy">Plan by</th>
                  <th className="px-4 py-3 font-semibold text-navy">Days left</th>
                  <th className="px-4 py-3 font-semibold text-navy">Buffer</th>
                  <th className="px-4 py-3 font-semibold text-navy">What</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((entry) => {
                  const urgency = entry.daysLeft <= 3 ? "text-red-600" : entry.daysLeft <= 7 ? "text-amber-600" : "text-inksoft";
                  const bufferTone = entry.buffer <= 3 ? "text-red-600" : entry.buffer <= 7 ? "text-amber-600" : "text-inksoft";

                  return (
                    <tr key={`${entry.project}-${entry.deadline}`} className="border-t border-line align-top">
                      <td className="px-4 py-3 font-medium text-navy">{entry.project}</td>
                      <td className="px-4 py-3 text-inksoft">{entry.deadline}</td>
                      <td className="px-4 py-3 text-inksoft">{entry.planBy}</td>
                      <td className={`px-4 py-3 font-medium ${urgency}`}>{entry.daysLeft} d</td>
                      <td className={`px-4 py-3 font-medium ${bufferTone}`}>{entry.buffer} d</td>
                      <td className="px-4 py-3 text-inksoft">{entry.what}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "skills" && (
        <div className="space-y-4">
          {skillsByTrack.map(({ track, items, percent }) => (
            <div key={track} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-display font-bold text-navy">{track}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-inksoft/70">{percent}% done</span>
                  <div className="h-2.5 w-28 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-navy" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.skillId} className="flex flex-col gap-2 rounded-xl border border-line bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy">{item.topic}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-inksoft">
                        <span>Block {item.block}</span>
                        <span>•</span>
                        <span>{item.plannedDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:justify-end">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusBadgeClasses(item.statusValue)}`}>
                        {item.statusValue}
                      </span>
                      <select
                        value={item.statusValue}
                        onChange={(event) => trackerState.updateT3SkillStatus(item.skillId, event.target.value)}
                        className="rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent/40"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 pt-2 text-center text-xs text-inksoft">
        Progress syncs to your database and is cached locally for instant loads across devices.
      </footer>
    </main>
  );
}

export default function T3PlannerPage() {
  const trackerState = useTrackerState();
  return <T3PlannerContent trackerState={trackerState} />;
}
