export default function ProgressBar({ value, max = 100, color = "#2E6F71", height = 8 }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="w-full bg-line/70 rounded-full overflow-hidden" style={{ height }}>
      <div
        className="rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, height, backgroundColor: color }}
      />
    </div>
  );
}
