"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function formatDay(dateStr) {
  const d = new Date(dateStr + "T00:00:00Z");
  return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-navy text-white text-xs rounded-lg px-3 py-2 shadow-lg font-tabular">
      <div className="text-white/50 mb-0.5">{label}</div>
      <div className="font-semibold">{payload[0].value}% overall</div>
    </div>
  );
}

export default function ProgressChart({ progressHistory }) {
  const entries = Object.entries(progressHistory || {})
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, value]) => ({ date: formatDay(date), value }));

  if (entries.length < 2) {
    return (
      <div className="bg-white rounded-2xl border border-line p-6 shadow-sm h-[220px] flex items-center justify-center">
        <p className="text-sm text-inksoft text-center max-w-xs">
          Your progress trend will chart here once you've logged activity on a couple of different days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm">
      <h3 className="font-display font-semibold text-navy mb-1">Progress Over Time</h3>
      <p className="text-xs text-inksoft mb-4">Overall completion percentage, sampled each day you were active</p>
      <div className="h-[200px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={entries} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E6F71" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2E6F71" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#DDE3EE" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#5B6478", fontFamily: "var(--font-mono)" }}
              axisLine={{ stroke: "#DDE3EE" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#5B6478", fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="value" stroke="#2E6F71" strokeWidth={2} fill="url(#progressFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
