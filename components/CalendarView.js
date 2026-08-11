"use client";

import { useState } from "react";
import { getMonthMatrix, heatLevel, todayKey } from "../lib/stats";

const LEVEL_COLOR = ["#E4E9F1", "#CFE7E4", "#9FCFC9", "#5CA79E", "#2E6F71"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DOW_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function addDays(dateStr, n) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + n);
  return todayKey(d);
}

function startOfWeek(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return addDays(dateStr, -d.getDay());
}

function formatEventTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

function EventChip({ ev, onRemove, compact }) {
  return (
    <div className="group flex items-center gap-1 bg-accentsoft text-accent text-[11px] rounded px-1.5 py-0.5 truncate">
      {ev.time && <span className="font-tabular shrink-0">{formatEventTime(ev.time)}</span>}
      <span className={compact ? "truncate" : ""}>{ev.title}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="ml-auto opacity-0 group-hover:opacity-100 text-accent/60 hover:text-red-500 shrink-0"
        aria-label="Remove event"
      >
        ✕
      </button>
    </div>
  );
}

function EventForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, time });
    setTitle("");
    setTime("");
  };
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="text-sm border border-line rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent w-[110px]"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add an event..."
        className="flex-1 text-sm border border-line rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <button type="submit" className="text-sm bg-accent text-white px-3 rounded-lg hover:opacity-90 shrink-0">Add</button>
    </form>
  );
}

export default function CalendarView({ trackerState }) {
  const {
    state,
    toggleChecklistDone,
    addChecklistItem,
    removeChecklistItem,
    addDailyGoal,
    toggleDailyGoal,
    removeDailyGoal,
    addEvent,
    removeEvent,
  } = trackerState;

  const today = new Date();
  const todayStr = todayKey(today);
  const [viewMode, setViewMode] = useState("month"); // month | week | day
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [newItemText, setNewItemText] = useState("");

  const grid = getMonthMatrix(cursor.year, cursor.month, state.activityLog);

  const goToday = () => {
    setCursor({ year: today.getFullYear(), month: today.getMonth() });
    setSelectedDate(todayStr);
  };

  const shiftMonth = (delta) => {
    let m = cursor.month + delta;
    let y = cursor.year;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setCursor({ year: y, month: m });
  };

  const shiftWeek = (delta) => {
    const next = addDays(selectedDate, delta * 7);
    setSelectedDate(next);
    setCursor({ year: new Date(next).getFullYear(), month: new Date(next).getMonth() });
  };

  const shiftDay = (delta) => {
    const next = addDays(selectedDate, delta);
    setSelectedDate(next);
    setCursor({ year: new Date(next).getFullYear(), month: new Date(next).getMonth() });
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    const d = new Date(date + "T00:00:00");
    setCursor({ year: d.getFullYear(), month: d.getMonth() });
  };

  const checklistForDay = state.dailyChecklist[selectedDate] || {};
  const goalsForDay = state.dailyGoals[selectedDate] || [];
  const checklistDoneCount = state.checklistItems.filter((c) => checklistForDay[c.id]).length;

  const handleAddItem = (e) => {
    e.preventDefault();
    addChecklistItem(newItemText);
    setNewItemText("");
  };

  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-navy">Calendar &amp; Daily Goals</h2>
          <p className="text-sm text-inksoft mt-1">Month, week, and day views — schedule events, track streaks, and set goals per day.</p>
        </div>
        <div className="flex gap-1 bg-white border border-line rounded-lg p-1 shrink-0">
          {["month", "week", "day"].map((v) => (
            <button
              key={v}
              onClick={() => setViewMode(v)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md capitalize transition-colors ${
                viewMode === v ? "bg-navy text-white" : "text-inksoft hover:text-navy"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Calendar area */}
        <div className="lg:col-span-3 bg-navy rounded-2xl p-5 sm:p-6 text-white shadow-sm">
          {viewMode === "month" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => shiftMonth(-1)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70">‹</button>
                <div className="text-center">
                  <h3 className="font-display font-semibold">{MONTH_NAMES[cursor.month]} {cursor.year}</h3>
                  <button onClick={goToday} className="text-[11px] text-signal hover:underline">Jump to today</button>
                </div>
                <button onClick={() => shiftMonth(1)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70">›</button>
              </div>

              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-white/40 mb-1">
                {DOW.map((d) => <div key={d}>{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {grid.flat().map((cell, i) => {
                  if (!cell) return <div key={i} />;
                  const lvl = cell.isFuture ? -1 : heatLevel(cell.count);
                  const isSelected = cell.date === selectedDate;
                  const dayEvents = state.events[cell.date] || [];
                  return (
                    <button
                      key={cell.date}
                      onClick={() => selectDate(cell.date)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-xs font-tabular transition-all relative p-1 ${
                        isSelected ? "ring-2 ring-signal" : cell.isToday ? "ring-1 ring-white/50" : ""
                      }`}
                      style={{
                        backgroundColor: lvl === -1 ? "rgba(255,255,255,0.05)" : LEVEL_COLOR[lvl],
                        color: lvl >= 3 ? "#fff" : lvl === -1 ? "rgba(255,255,255,0.3)" : "#101A33",
                      }}
                    >
                      <span>{cell.day}</span>
                      {dayEvents.length > 0 && (
                        <span className="flex gap-0.5">
                          {dayEvents.slice(0, 3).map((e) => (
                            <span key={e.id} className="w-1 h-1 rounded-full bg-finance" />
                          ))}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 mt-4 justify-end">
                <span className="text-[10px] text-white/40 mr-1">Less</span>
                {LEVEL_COLOR.map((c) => <div key={c} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />)}
                <span className="text-[10px] text-white/40 ml-1">More · dot = event</span>
              </div>
            </>
          )}

          {viewMode === "week" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => shiftWeek(-1)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70">‹</button>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-sm">
                    {weekDays[0]} – {weekDays[6]}
                  </h3>
                  <button onClick={goToday} className="text-[11px] text-signal hover:underline">Jump to today</button>
                </div>
                <button onClick={() => shiftWeek(1)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70">›</button>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {weekDays.map((date, i) => {
                  const dayEvents = state.events[date] || [];
                  const lvl = date > todayStr ? -1 : heatLevel(state.activityLog?.[date] || 0);
                  const isSelected = date === selectedDate;
                  const d = new Date(date + "T00:00:00");
                  return (
                    <button
                      key={date}
                      onClick={() => selectDate(date)}
                      className={`rounded-lg p-2 flex flex-col items-center text-left min-h-[110px] transition-all ${
                        isSelected ? "ring-2 ring-signal" : date === todayStr ? "ring-1 ring-white/50" : ""
                      }`}
                      style={{ backgroundColor: lvl === -1 ? "rgba(255,255,255,0.05)" : LEVEL_COLOR[lvl] }}
                    >
                      <span className="text-[10px] font-medium" style={{ color: lvl >= 3 ? "#fff" : "#101A33" }}>{DOW[i]}</span>
                      <span className="font-tabular text-sm font-semibold" style={{ color: lvl >= 3 ? "#fff" : "#101A33" }}>{d.getDate()}</span>
                      <div className="w-full mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div key={e.id} className="text-[9px] bg-navy/80 text-white rounded px-1 py-0.5 truncate w-full">
                            {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[9px] text-navy/70">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {viewMode === "day" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => shiftDay(-1)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70">‹</button>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-sm">
                    {DOW_FULL[new Date(selectedDate + "T00:00:00").getDay()]}, {selectedDate}
                  </h3>
                  <button onClick={goToday} className="text-[11px] text-signal hover:underline">Jump to today</button>
                </div>
                <button onClick={() => shiftDay(1)} className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70">›</button>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {(state.events[selectedDate] || []).length === 0 && (
                  <p className="text-sm text-white/40 py-6 text-center">No events scheduled for this day.</p>
                )}
                {(state.events[selectedDate] || []).map((ev) => (
                  <div key={ev.id} className="group flex items-center gap-3 bg-white/10 rounded-lg px-3 py-2">
                    <span className="font-tabular text-xs text-signal w-16 shrink-0">{ev.time ? formatEventTime(ev.time) : "All day"}</span>
                    <span className="text-sm flex-1">{ev.title}</span>
                    <button
                      onClick={() => removeEvent(selectedDate, ev.id)}
                      className="text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <EventForm onAdd={(payload) => addEvent(selectedDate, payload)} />
              </div>
            </>
          )}
        </div>

        {/* Selected day panel */}
        <div className="lg:col-span-2 space-y-4">
          {viewMode !== "day" && (
            <div className="bg-white rounded-2xl border border-line p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-navy text-sm">
                  {selectedDate === todayStr ? "Today's events" : `Events — ${selectedDate}`}
                </h3>
              </div>
              <div className="space-y-1.5 mb-3">
                {(state.events[selectedDate] || []).length === 0 && (
                  <p className="text-xs text-inksoft">Nothing scheduled.</p>
                )}
                {(state.events[selectedDate] || []).map((ev) => (
                  <EventChip key={ev.id} ev={ev} onRemove={() => removeEvent(selectedDate, ev.id)} />
                ))}
              </div>
              <EventForm onAdd={(payload) => addEvent(selectedDate, payload)} />
            </div>
          )}

          <div className="bg-white rounded-2xl border border-line p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-navy text-sm">
                {selectedDate === todayStr ? "Today's checklist" : `Checklist — ${selectedDate}`}
              </h3>
              <span className="text-xs font-tabular text-inksoft">{checklistDoneCount}/{state.checklistItems.length}</span>
            </div>

            <ul className="space-y-2">
              {state.checklistItems.map((item) => {
                const checked = !!checklistForDay[item.id];
                return (
                  <li key={item.id} className="flex items-center gap-2 group">
                    <label className="flex items-center gap-2 text-sm cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleChecklistDone(selectedDate, item.id)}
                        className="accent-accent w-4 h-4 shrink-0"
                      />
                      <span className={checked ? "text-inksoft line-through" : "text-ink"}>{item.text}</span>
                    </label>
                    <button
                      onClick={() => removeChecklistItem(item.id)}
                      className="text-inksoft/40 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>

            <form onSubmit={handleAddItem} className="flex gap-2 mt-3">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add a recurring checklist item..."
                className="flex-1 text-sm border border-line rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button type="submit" className="text-sm bg-accent text-white px-3 rounded-lg hover:opacity-90">Add</button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-line p-5 shadow-sm">
            <h3 className="font-display font-semibold text-navy text-sm mb-3">Goals for this day</h3>
            {goalsForDay.length === 0 && <p className="text-xs text-inksoft mb-2">No goals set for this day yet.</p>}
            <ul className="space-y-2">
              {goalsForDay.map((g) => (
                <li key={g.id} className="flex items-center gap-2 group">
                  <label className="flex items-center gap-2 text-sm cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={g.done}
                      onChange={() => toggleDailyGoal(selectedDate, g.id)}
                      className="accent-signal w-4 h-4 shrink-0"
                    />
                    <span className={g.done ? "text-inksoft line-through" : "text-ink"}>{g.text}</span>
                  </label>
                  <button
                    onClick={() => removeDailyGoal(selectedDate, g.id)}
                    className="text-inksoft/40 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove goal"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <GoalForm onAdd={(text) => addDailyGoal(selectedDate, text)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalForm({ onAdd }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };
  return (
    <form onSubmit={submit} className="flex gap-2 mt-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a goal for this day..."
        className="flex-1 text-sm border border-line rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-signal"
      />
      <button type="submit" className="text-sm bg-signal text-white px-3 rounded-lg hover:opacity-90">Add</button>
    </form>
  );
}
