export default function RadialProgress({
  value,
  size = 96,
  stroke = 10,
  color = "#2E6F71",
  track = "rgba(255,255,255,0.12)",
  label,
  sublabel,
  labelColor = "#FFFFFF",
}) {
  const pct = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="inline-flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <div style={{ marginTop: -size / 2 - 8 }} className="flex flex-col items-center pointer-events-none">
        <span className="font-tabular font-bold" style={{ color: labelColor, fontSize: size * 0.24 }}>
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: labelColor, opacity: 0.6 }}>
            {sublabel}
          </span>
        )}
      </div>
      <div style={{ height: 8 }} />
    </div>
  );
}
