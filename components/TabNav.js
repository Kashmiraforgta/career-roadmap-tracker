"use client";

import {
  IconDashboard, IconCalendar, IconWeekly, IconCode, IconLayers,
  IconFinance, IconFolder, IconTarget, IconAlert, IconBook,
} from "./icons";

const TABS = [
  { id: "dashboard", label: "Dashboard", Icon: IconDashboard },
  { id: "calendar", label: "Calendar & Daily", Icon: IconCalendar },
  { id: "weekly", label: "Weekly Plan", Icon: IconWeekly },
  { id: "platforms", label: "Practice Platforms", Icon: IconCode },
  { id: "tech", label: "Tech Tracks", Icon: IconLayers },
  { id: "finance", label: "Finance Track", Icon: IconFinance },
  { id: "projects", label: "Projects", Icon: IconFolder },
  { id: "applications", label: "Applications", Icon: IconTarget },
  { id: "mistakes", label: "Mistakes Log", Icon: IconAlert },
  { id: "resources", label: "Resources", Icon: IconBook },
  { id: "learning", label: "Learning Path", Icon: IconBook },
  { id: "t3", label: "T3 Planner", Icon: IconTarget },
];

export default function TabNav({ active, onChange }) {
  return (
    <div className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(16,26,51,0.03)]">
      <div className="max-w-6xl mx-auto px-2 sm:px-6">
        <div className="flex gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`group relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[13px] font-medium font-display rounded-full transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-navy text-white shadow-sm"
                    : "text-inksoft hover:text-navy hover:bg-accentsoft/70 hover:-translate-y-0.5"
                }`}
              >
                <tab.Icon
                  className={`w-[15px] h-[15px] shrink-0 transition-colors ${
                    isActive ? "text-signal" : "text-inksoft/60 group-hover:text-accent"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
