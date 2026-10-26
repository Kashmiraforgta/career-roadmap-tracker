"use client";

import { techRoles, financeRoles, roleResources } from "../lib/data";
import { IconLink, IconBook } from "./icons";

const TYPE_STYLE = {
  doc: { label: "Docs", bg: "bg-line/60", text: "text-inksoft" },
  course: { label: "Course", bg: "bg-accentsoft", text: "text-accent" },
  video: { label: "Video", bg: "bg-signalsoft", text: "text-signal" },
  practice: { label: "Practice", bg: "bg-financesoft", text: "text-finance" },
};

function ResourceRow({ resource, resourceId, reviewed, onToggle }) {
  const style = TYPE_STYLE[resource.type] || TYPE_STYLE.doc;
  return (
    <li className="flex items-start gap-2.5 group">
      <input
        type="checkbox"
        checked={!!reviewed}
        onChange={() => onToggle(resourceId)}
        className="mt-1 accent-accent w-4 h-4 shrink-0"
        aria-label={`Mark ${resource.title} reviewed`}
      />
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className={`flex-1 text-sm flex items-center gap-1.5 flex-wrap ${reviewed ? "text-inksoft line-through" : "text-ink hover:text-accent"} transition-colors`}
      >
        {resource.title}
        <IconLink className="w-3 h-3 opacity-40 group-hover:opacity-100 shrink-0" />
        <span className={`text-[9px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>
          {style.label}
        </span>
      </a>
    </li>
  );
}

function TrackResourceCard({ role, state, toggleResourceReviewed }) {
  const items = roleResources[role.id] || [];
  const reviewedCount = items.filter((r, i) => state.resourceReviewed[`${role.id}::${i}`]).length;

  return (
    <div className="card-hover bg-white rounded-2xl border border-line p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-ink">{role.name}</h3>
        <span className="text-xs text-inksoft font-tabular shrink-0">{reviewedCount}/{items.length}</span>
      </div>
      <p className="text-xs text-inksoft mt-1">{role.stack}</p>
      {items.length === 0 ? (
        <p className="text-xs text-inksoft mt-3">No curated resources yet for this track.</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {items.map((r, i) => (
            <ResourceRow
              key={i}
              resource={r}
              resourceId={`${role.id}::${i}`}
              reviewed={state.resourceReviewed[`${role.id}::${i}`]}
              onToggle={toggleResourceReviewed}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResourcesView({ trackerState }) {
  const { state, toggleResourceReviewed } = trackerState;
  const allRoles = [...techRoles, ...financeRoles];
  const totalItems = allRoles.reduce((acc, r) => acc + (roleResources[r.id]?.length || 0), 0);
  const totalReviewed = Object.values(state.resourceReviewed || {}).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="page-heading-panel flex items-start justify-between flex-wrap gap-2">
        <div className="max-w-2xl">
          <h2 className="font-display">Resources</h2>
          <p>
            Curated docs, courses, and playlists per track — StatQuest, Made With ML, CFI and more — pulled
            straight from the original roadmap so links live here instead of scattered bookmarks. Check one
            off after you've been through it for a small XP bump.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-line rounded-xl px-3 py-2 shrink-0">
          <IconBook className="w-4 h-4 text-accent" />
          <span className="text-sm font-tabular text-navy font-semibold">{totalReviewed}/{totalItems}</span>
          <span className="text-xs text-inksoft">reviewed</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {allRoles.map((role) => (
          <TrackResourceCard key={role.id} role={role} state={state} toggleResourceReviewed={toggleResourceReviewed} />
        ))}
      </div>
    </div>
  );
}
