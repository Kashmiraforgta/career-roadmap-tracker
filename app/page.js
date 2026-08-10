"use client";

import { useState } from "react";
import useTrackerState from "../lib/useTrackerState";
import TabNav from "../components/TabNav";
import Dashboard from "../components/Dashboard";
import WeeklyPlan from "../components/WeeklyPlan";
import Platforms from "../components/Platforms";
import RoleTrackList from "../components/RoleTrackList";
import Projects from "../components/Projects";
import { techRoles, financeRoles } from "../lib/data";

function PassphraseGate({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-line rounded-2xl p-6 shadow-sm"
      >
        <h1 className="text-lg font-display font-bold text-navy mb-1">Career Roadmap Tracker</h1>
        <p className="text-sm text-inksoft mb-4">
          Enter your passphrase to load your synced progress. This is remembered on this device
          going forward.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

const SYNC_LABEL = {
  idle: "",
  syncing: "Syncing…",
  synced: "Synced ✓",
  offline: "Offline — showing local copy",
  error: "Sync failed — will retry",
};

export default function Home() {
  const [tab, setTab] = useState("dashboard");
  const trackerState = useTrackerState();

  const handleReset = () => {
    if (window.confirm("Reset all progress? This clears everything saved and cannot be undone.")) {
      trackerState.resetAll();
    }
  };

  if (trackerState.needsPassphrase) {
    return <PassphraseGate onSubmit={trackerState.submitPassphrase} />;
  }

  return (
    <main className="min-h-screen">
      <header className="bg-white/90 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-navy">Career Roadmap Tracker</h1>
            <p className="text-xs text-inksoft">16-week prep · DA · DS · MLE · AI Eng · Full Stack · Finance</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-inksoft font-tabular">{SYNC_LABEL[trackerState.syncStatus]}</span>
            <button
              onClick={handleReset}
              className="text-xs text-inksoft hover:text-red-500 border border-line hover:border-red-300 rounded-lg px-3 py-1.5 transition-colors"
            >
              Reset progress
            </button>
          </div>
        </div>
      </header>

      <TabNav active={tab} onChange={setTab} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {tab === "dashboard" && <Dashboard trackerState={trackerState} setTab={setTab} />}
        {tab === "weekly" && <WeeklyPlan trackerState={trackerState} />}
        {tab === "platforms" && <Platforms trackerState={trackerState} />}
        {tab === "tech" && (
          <RoleTrackList
            roles={techRoles}
            trackerState={trackerState}
            title="Tech Role Tracks"
            description="Data Analyst, Data Scientist, ML Engineer, AI Engineer, Full Stack — check off topics as you cover them."
          />
        )}
        {tab === "finance" && (
          <RoleTrackList
            roles={financeRoles}
            trackerState={trackerState}
            title="Finance Track"
            description="Financial Analyst & Private Equity — the parallel, lower-intensity track alongside the main plan."
          />
        )}
        {tab === "projects" && <Projects trackerState={trackerState} />}
      </div>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 pt-2 text-center text-xs text-inksoft">
        Progress syncs to your database and is cached locally for instant loads across devices.
      </footer>
    </main>
  );
}
