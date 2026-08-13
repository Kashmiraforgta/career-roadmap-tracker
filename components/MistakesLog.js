"use client";

import { useMemo, useState } from "react";
import { mistakePlatformOptions, dsaPatternOptions } from "../lib/data";
import { IconAlert, IconCheckCircle } from "./icons";

export function QuickAddForm({ onAdd, compact = false }) {
  const [topic, setTopic] = useState("");
  const [whatWrong, setWhatWrong] = useState("");
  const [platform, setPlatform] = useState(mistakePlatformOptions[0]);
  const [pattern, setPattern] = useState(dsaPatternOptions[0]);
  const [expanded, setExpanded] = useState(!compact);

  const submit = (e) => {
    e.preventDefault();
    if (!topic.trim() && !whatWrong.trim()) return;
    onAdd({ topic, whatWrong, platform, pattern });
    setTopic("");
    setWhatWrong("");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <div className="grid sm:grid-cols-2 gap-2">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (e.g. Sliding window on strings)"
          className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <input
          value={whatWrong}
          onChange={(e) => setWhatWrong(e.target.value)}
          placeholder="What went wrong..."
          className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      {compact && !expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-[11px] text-inksoft hover:text-accent"
        >
          + tag platform / pattern
        </button>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-white"
          >
            {mistakePlatformOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent bg-white"
          >
            {dsaPatternOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      )}
      <button type="submit" className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
        Log mistake
      </button>
    </form>
  );
}

function MistakeCard({ m, onToggle, onRemove }) {
  return (
    <div
      className={`card-hover rounded-2xl border p-4 shadow-sm ${
        m.resolved ? "bg-accentsoft/40 border-accent/30" : "bg-white border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-medium bg-navysoft text-white px-2 py-0.5 rounded-full">{m.platform}</span>
            <span className="text-[10px] font-medium bg-signalsoft text-signal px-2 py-0.5 rounded-full">{m.pattern}</span>
            <span className="text-[10px] text-inksoft font-tabular">{m.date}</span>
          </div>
          {m.topic && <p className={`font-medium mt-1.5 ${m.resolved ? "text-inksoft line-through" : "text-ink"}`}>{m.topic}</p>}
          {m.whatWrong && <p className="text-sm text-inksoft mt-0.5">{m.whatWrong}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggle(m.id)}
            title={m.resolved ? "Mark unresolved" : "Mark resolved"}
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
              m.resolved ? "bg-accent border-accent text-white" : "border-line text-transparent hover:border-accent/50"
            }`}
          >
            <IconCheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(m.id)}
            className="text-inksoft/40 hover:text-red-500 text-sm"
            aria-label="Remove entry"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MistakesLog({ trackerState }) {
  const { state, addMistake, toggleMistakeResolved, removeMistake } = trackerState;
  const mistakes = state.mistakes || [];
  const [platformFilter, setPlatformFilter] = useState("All");
  const [patternFilter, setPatternFilter] = useState("All");

  const unresolved = useMemo(
    () => mistakes.filter((m) => !m.resolved).sort((a, b) => (a.date < b.date ? -1 : 1)),
    [mistakes]
  );

  const filtered = useMemo(() => {
    return mistakes
      .filter((m) => platformFilter === "All" || m.platform === platformFilter)
      .filter((m) => patternFilter === "All" || m.pattern === patternFilter)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [mistakes, platformFilter, patternFilter]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">Mistakes / Weak-Topics Log</h2>
        <p className="text-sm text-inksoft mt-1">
          One log across every platform, revisited weekly — exactly what the DSA prep section recommends.
          Log the topic and what went wrong right after a problem, then clear the revision list before mocks.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-line p-5 shadow-sm">
        <h3 className="font-display font-semibold text-navy text-sm mb-3">Log a mistake</h3>
        <QuickAddForm onAdd={addMistake} />
      </div>

      {unresolved.length > 0 && (
        <div className="bg-signalsoft border border-signal/30 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <IconAlert className="w-4 h-4 text-signal" />
            <h3 className="font-display font-semibold text-navy text-sm">
              Revision list — unresolved ({unresolved.length})
            </h3>
          </div>
          <p className="text-xs text-inksoft mb-3">Work through these before your next mock or interview.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {unresolved.map((m) => (
              <MistakeCard key={m.id} m={m} onToggle={toggleMistakeResolved} onRemove={removeMistake} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="text-xs border border-line rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option>All</option>
          {mistakePlatformOptions.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          value={patternFilter}
          onChange={(e) => setPatternFilter(e.target.value)}
          className="text-xs border border-line rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option>All</option>
          {dsaPatternOptions.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <span className="text-xs text-inksoft ml-auto font-tabular">{filtered.length} entr{filtered.length === 1 ? "y" : "ies"}</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.length === 0 && (
          <p className="text-sm text-inksoft text-center py-8 sm:col-span-2">No entries match — log your first mistake above.</p>
        )}
        {filtered.map((m) => (
          <MistakeCard key={m.id} m={m} onToggle={toggleMistakeResolved} onRemove={removeMistake} />
        ))}
      </div>
    </div>
  );
}
