import { projects, projectStatuses } from "../lib/data";

const statusColor = {
  "Not started": "bg-line/60 text-inksoft",
  "In progress": "bg-signalsoft text-signal",
  "Done": "bg-accentsoft text-accent",
};

export default function Projects({ trackerState }) {
  const { state, updateProject } = trackerState;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">Portfolio Projects</h2>
        <p className="text-sm text-inksoft mt-1">One flagship project per track, plus the cross-track stretch capstone and the two finance models.</p>
      </div>
      <div className="space-y-3">
        {projects.map((p) => {
          const ps = state.projectState[p.id] || { status: "Not started", link: "", notes: "" };
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-line p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-ink">{p.name}</p>
                  <span className="text-xs text-inksoft">{p.role}</span>
                </div>
                <select
                  value={ps.status}
                  onChange={(e) => updateProject(p.id, { status: e.target.value })}
                  className={`text-xs font-medium rounded-full px-3 py-1.5 border-none outline-none ${statusColor[ps.status]}`}
                >
                  {projectStatuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-3">
                <input
                  type="text"
                  value={ps.link}
                  onChange={(e) => updateProject(p.id, { link: e.target.value })}
                  placeholder="Link (GitHub / deployed URL)"
                  className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <input
                  type="text"
                  value={ps.notes}
                  onChange={(e) => updateProject(p.id, { notes: e.target.value })}
                  placeholder="Notes"
                  className="text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
