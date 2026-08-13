"use client";

const TIER_STYLE = {
  bronze: { bg: "#F3E7DC", border: "#C18A54", text: "#8A5A2B", icon: "🥉" },
  silver: { bg: "#E9ECF0", border: "#9AA5B1", text: "#5B6478", icon: "🥈" },
  gold: { bg: "#FBEBD2", border: "#E8A33D", text: "#8A5E14", icon: "🥇" },
};

export default function Achievements({ achievements }) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-navy">Milestones</h3>
          <p className="text-xs text-inksoft mt-0.5">Achievements unlocked as you actually hit them — nothing to claim, just progress.</p>
        </div>
        <span className="font-tabular text-sm text-inksoft shrink-0">{unlockedCount}/{achievements.length}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {achievements.map((a) => {
          const tier = TIER_STYLE[a.tier];
          return (
            <div
              key={a.id}
              title={a.desc}
              className="rounded-xl p-3 text-center border transition-all hover:-translate-y-1 hover:shadow-md"
              style={
                a.unlocked
                  ? { backgroundColor: tier.bg, borderColor: tier.border }
                  : { backgroundColor: "#F5F6F8", borderColor: "#E4E9F1" }
              }
            >
              <div className="text-xl mb-1" style={{ opacity: a.unlocked ? 1 : 0.25 }}>
                {tier.icon}
              </div>
              <p
                className="text-[11px] font-medium leading-tight"
                style={{ color: a.unlocked ? tier.text : "#B7BFCB" }}
              >
                {a.title}
              </p>
              <p className="text-[9px] mt-0.5 leading-tight" style={{ color: a.unlocked ? tier.text : "#C6CCD6", opacity: 0.8 }}>
                {a.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
