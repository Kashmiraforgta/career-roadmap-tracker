"use client";

import { useState } from "react";
import { applicationStatuses } from "../lib/data";
import { todayKey } from "../lib/stats";

const STATUS_COLOR = {
  "Applied": "bg-line/60 text-inksoft",
  "OA / Assessment": "bg-signalsoft text-signal",
  "Interview": "bg-signalsoft text-signal",
  "Offer": "bg-accentsoft text-accent",
  "Rejected": "bg-financesoft text-finance",
  "Withdrawn": "bg-line/60 text-inksoft",
};

function AddApplicationForm({ onAdd }) {
  const [form, setForm] = useState({
    company: "", role: "", appliedDate: todayKey(), status: "Applied", followUpDate: "", link: "", notes: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.company.trim()) return;
    onAdd(form);
    setForm({ company: "", role: "", appliedDate: todayKey(), status: "Applied", followUpDate: "", link: "", notes: "" });
  };

  const field = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-line p-5 shadow-sm space-y-3">
      <h3 className="font-display font-semibold text-navy text-sm">Log a new application</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <input value={form.company} onChange={(e) => field("company", e.target.value)} placeholder="Company *" className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent" />
        <input value={form.role} onChange={(e) => field("role", e.target.value)} placeholder="Role" className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent" />
        <div>
          <label className="text-[10px] uppercase tracking-wide text-inksoft">Applied on</label>
          <input type="date" value={form.appliedDate} onChange={(e) => field("appliedDate", e.target.value)} className="w-full text-sm border border-line rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-accent" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wide text-inksoft">Status</label>
          <select value={form.status} onChange={(e) => field("status", e.target.value)} className="w-full text-sm border border-line rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-accent">
            {applicationStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wide text-inksoft">Follow-up date (optional)</label>
          <input type="date" value={form.followUpDate} onChange={(e) => field("followUpDate", e.target.value)} className="w-full text-sm border border-line rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-accent" />
          <p className="text-[10px] text-inksoft mt-0.5">Adds a reminder to your Calendar automatically.</p>
        </div>
        <input value={form.link} onChange={(e) => field("link", e.target.value)} placeholder="Job link (optional)" className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent" />
      </div>
      <textarea value={form.notes} onChange={(e) => field("notes", e.target.value)} placeholder="Notes — referral source, recruiter name, etc." rows={2} className="w-full text-sm border border-line rounded-lg p-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent" />
      <button type="submit" className="text-sm bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90">Add application</button>
    </form>
  );
}

export default function ApplicationsView({ trackerState }) {
  const { state, addApplication, updateApplication, removeApplication } = trackerState;
  const apps = state.applications;

  const funnel = applicationStatuses.map((s) => ({
    status: s,
    count: apps.filter((a) => a.status === s).length,
  }));

  const sorted = [...apps].sort((a, b) => (a.appliedDate < b.appliedDate ? 1 : -1));

  return (
    <div className="space-y-4">
      <div className="page-heading-panel">
        <h2 className="font-display">Applications</h2>
        <p>Every application in one place — matches the roadmap's Week 12+ "track every application" guidance.</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {funnel.map((f) => (
          <div key={f.status} className="bg-white rounded-xl border border-line p-3 text-center">
            <p className="font-tabular text-xl font-bold text-navy">{f.count}</p>
            <p className="text-[10px] text-inksoft mt-0.5 leading-tight">{f.status}</p>
          </div>
        ))}
      </div>

      <AddApplicationForm onAdd={addApplication} />

      <div className="space-y-3">
        {sorted.length === 0 && (
          <p className="text-sm text-inksoft text-center py-8">No applications logged yet — add your first one above.</p>
        )}
        {sorted.map((a) => (
          <div key={a.id} className="card-hover bg-white rounded-2xl border border-line p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium text-ink">{a.company}{a.role && <span className="text-inksoft font-normal"> — {a.role}</span>}</p>
                <p className="text-xs text-inksoft mt-0.5 font-tabular">
                  Applied {a.appliedDate}
                  {a.followUpDate && <> · Follow up {a.followUpDate}</>}
                </p>
                {a.link && (
                  <a href={a.link} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline mt-0.5 inline-block">
                    View posting ↗
                  </a>
                )}
                {a.notes && <p className="text-xs text-inksoft mt-1">{a.notes}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={a.status}
                  onChange={(e) => updateApplication(a.id, { status: e.target.value })}
                  className={`text-xs font-medium rounded-full px-3 py-1.5 border-none outline-none ${STATUS_COLOR[a.status]}`}
                >
                  {applicationStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button
                  onClick={() => removeApplication(a.id)}
                  className="text-inksoft/40 hover:text-red-500 text-sm"
                  aria-label="Remove application"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
