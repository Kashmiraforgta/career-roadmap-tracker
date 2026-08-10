import ProgressBar from "./ProgressBar";

export default function RoleTrackList({ roles, trackerState, title, description }) {
  const { state, toggleRoleTopic } = trackerState;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-display font-bold text-navy">{title}</h2>
        <p className="text-sm text-inksoft mt-1">{description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const topicsState = state.roleTopics[role.id] || [];
          const done = topicsState.filter(Boolean).length;
          return (
            <div key={role.id} className="bg-white rounded-2xl border border-line p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-ink">{role.name}</h3>
                <span className="text-xs text-inksoft font-tabular">{done}/{role.topics.length}</span>
              </div>
              <p className="text-xs text-inksoft mt-1">{role.stack}</p>
              <div className="mt-3">
                <ProgressBar value={done} max={role.topics.length} color={role.color} />
              </div>
              <ul className="mt-4 space-y-2">
                {role.topics.map((topic, i) => {
                  const checked = !!topicsState[i];
                  return (
                    <li key={i}>
                      <label className="flex items-start gap-2 text-sm cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRoleTopic(role.id, i)}
                          className="mt-0.5 accent-accent w-4 h-4 shrink-0"
                        />
                        <span className={checked ? "text-inksoft line-through" : "text-ink"}>{topic}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
