const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "calendar", label: "Calendar & Daily" },
  { id: "weekly", label: "Weekly Plan" },
  { id: "platforms", label: "Practice Platforms" },
  { id: "tech", label: "Tech Tracks" },
  { id: "finance", label: "Finance Track" },
  { id: "projects", label: "Projects" },
  { id: "applications", label: "Applications" },
];

export default function TabNav({ active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-line bg-white/80 backdrop-blur px-2 sm:px-6 sticky top-0 z-10 shadow-sm">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`whitespace-nowrap px-4 py-3 text-sm font-medium font-display border-b-2 transition-colors ${
            active === tab.id
              ? "border-accent text-navy"
              : "border-transparent text-inksoft hover:text-navy"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
