"use client";

import { useEffect, useRef, useState } from "react";
import { IconPlay, IconPause, IconRefresh, IconTimer } from "./icons";
import { todayKey } from "../lib/stats";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Sums the last `days` days of focusSessions (inclusive of today) — used
// for the lightweight "sessions this week" readout.
function sumLastDays(focusSessions, days) {
  let total = 0;
  const cursor = new Date();
  for (let i = 0; i < days; i++) {
    total += focusSessions?.[todayKey(cursor)] || 0;
    cursor.setDate(cursor.getDate() - 1);
  }
  return total;
}

export default function FocusTimer({ trackerState, compact = false }) {
  const { state, logFocusSession } = trackerState;
  const [mode, setMode] = useState("work"); // work | break
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Runs exactly once per completed segment, outside the tick updater, so
  // logging a session (a separate state update) never happens mid-render.
  useEffect(() => {
    if (secondsLeft !== 0 || !running) return;
    if (mode === "work") {
      logFocusSession(todayKey());
      setMode("break");
      setSecondsLeft(BREAK_SECONDS);
    } else {
      setMode("work");
      setSecondsLeft(WORK_SECONDS);
      setRunning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, running, mode]);

  const reset = () => {
    setRunning(false);
    setMode("work");
    setSecondsLeft(WORK_SECONDS);
  };

  const total = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  const pct = Math.round(((total - secondsLeft) / total) * 100);
  const todayCount = state.focusSessions?.[todayKey()] || 0;
  const weekCount = sumLastDays(state.focusSessions, 7);

  return (
    <div className={`bg-navy rounded-2xl text-white shadow-sm ${compact ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconTimer className="w-4 h-4 text-signal" />
          <h3 className="font-display font-semibold text-sm">Focus Timer</h3>
        </div>
        <span
          className={`text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full ${
            mode === "work" ? "bg-signal/20 text-signal" : "bg-accent/20 text-accent"
          }`}
        >
          {mode === "work" ? "Focus block" : "Break"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className={`relative shrink-0 ${running ? "timer-pulse rounded-full" : ""}`}>
          <svg width={compact ? 72 : 88} height={compact ? 72 : 88} viewBox="0 0 88 88" className="-rotate-90">
            <circle cx="44" cy="44" r="38" stroke="rgba(255,255,255,0.12)" strokeWidth="7" fill="none" />
            <circle
              cx="44" cy="44" r="38"
              stroke={mode === "work" ? "#E8A33D" : "#5CA79E"}
              strokeWidth="7" fill="none" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - pct / 100)}
              style={{ transition: "stroke-dashoffset 900ms linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-tabular font-bold text-base">{fmt(secondsLeft)}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex items-center gap-1.5 bg-signal text-navy font-medium text-sm rounded-lg px-3.5 py-2 hover:opacity-90 transition-opacity"
            >
              {running ? <IconPause className="w-3.5 h-3.5" /> : <IconPlay className="w-3.5 h-3.5" />}
              {running ? "Pause" : secondsLeft === total ? "Start" : "Resume"}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs rounded-lg px-2.5 py-2 hover:bg-white/10 transition-colors"
              aria-label="Reset timer"
            >
              <IconRefresh className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-4 mt-3">
            <div>
              <p className="font-tabular text-lg font-bold text-signal leading-none">{todayCount}</p>
              <p className="text-[10px] text-white/50 mt-0.5">today</p>
            </div>
            <div>
              <p className="font-tabular text-lg font-bold text-white leading-none">{weekCount}</p>
              <p className="text-[10px] text-white/50 mt-0.5">last 7 days</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-white/40 mt-3">25 min focus · 5 min break — each completed focus block logs +25 XP and counts toward today&apos;s activity.</p>
    </div>
  );
}
