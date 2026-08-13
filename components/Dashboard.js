import ProgressBar from "./ProgressBar";
import RadialProgress from "./RadialProgress";
import StreakHeatmap from "./StreakHeatmap";
import ProgressChart from "./ProgressChart";
import Achievements from "./Achievements";
import FocusTimer from "./FocusTimer";
import { weeks, platforms, techRoles, financeRoles, projects } from "../lib/data";
import { computeOverall, computeLevel, getRoadmapPosition, todayKey, computeStreaks, computeAchievements } from "../lib/stats";

function StatRing({ label, value, sub, color }) {
  return (
    <div className="flex flex-col items-center bg-navysoft/60 rounded-xl px-3 py-4">
      <RadialProgress value={value} size={72} stroke={7} color={color} label={`${value}%`} />
      <p className="text-xs font-medium text-white mt-1 text-center">{label}</p>
      {sub && <p className="text-[10px] text-white/50 text-center">{sub}</p>}
    </div>
  );
}

export default function Dashboard({ trackerState, setTab }) {
  const { state } = trackerState;
  const allRoles = [...techRoles, ...financeRoles];

  const { weekPct, platformPct, topicsPct, projectPct, overall } = computeOverall(state, {
    weeks,
    platforms,
    allRoles,
    projects,
  });

  const weeksDone = Object.values(state.weekDone).filter(Boolean).length;
  const projectsDone = projects.filter((p) => state.projectState[p.id]?.status === "Done").length;

  const roleCompletion = allRoles.map((r) => {
    const topics = state.roleTopics[r.id] || [];
    const done = topics.filter(Boolean).length;
    return { ...r, done, total: r.topics.length };
  });

  const levelInfo = computeLevel(state.points || 0);
  const todayRoadmap = getRoadmapPosition(state.programStartDate, todayKey());
  const todayWeek = todayRoadmap ? weeks.find((w) => w.week === todayRoadmap.week) : null;
  const todayTaskDone = todayRoadmap ? !!state.roadmapTaskDone[todayKey()]?.[todayRoadmap.day] : false;

  const longestStreak = computeStreaks(state.activityLog).longest;
  const achievements = computeAchievements(state, {
    weeksDone,
    totalWeeks: weeks.length,
    platforms,
    projectsDone,
    allRoles,
    levelInfo,
    longestStreak,
  });

  return (
    <div className="space-y-6">
      {/* Instrument cluster hero */}
      <div className="bg-navy rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs uppercase tracking-widest text-white/50 font-medium">Mission Status</p>
          <div className="flex items-center gap-2 bg-white/10 rounded-full pl-3 pr-1 py-1">
            <span className="text-xs font-medium">Level {levelInfo.level} · {levelInfo.title}</span>
            <span className="font-tabular text-[11px] bg-signal text-navy rounded-full px-2 py-0.5 font-bold">
              {levelInfo.points} XP
            </span>
          </div>
        </div>
        {levelInfo.nextThreshold && (
          <div className="mt-2 w-full sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-signal rounded-full transition-all" style={{ width: `${levelInfo.pctToNext}%` }} />
          </div>
        )}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 mt-4">
          <div className="flex flex-col items-center justify-center shrink-0">
            <RadialProgress value={overall} size={168} stroke={14} color="#E8A33D" label={`${overall}%`} sublabel="Overall" />
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
            <StatRing label="Weekly Plan" value={weekPct} sub={`${weeksDone}/${weeks.length} weeks`} color="#2E6F71" />
            <StatRing label="Practice" value={platformPct} sub="platform goals" color="#5CA79E" />
            <StatRing label="Tracks" value={topicsPct} sub="topics checked" color="#E8A33D" />
            <StatRing label="Projects" value={projectPct} sub={`${projectsDone}/${projects.length} shipped`} color="#B5546A" />
          </div>
        </div>
      </div>

      {/* Activity heatmap - streaks */}
      <StreakHeatmap activityLog={state.activityLog} />

      {/* Milestone achievements */}
      <Achievements achievements={achievements} />

      {/* Trend chart */}
      <ProgressChart progressHistory={state.progressHistory} />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
          <h3 className="font-display font-semibold text-navy mb-4">Role Track Progress</h3>
          <div className="space-y-3">
            {roleCompletion.map((r) => (
              <div key={r.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink">{r.name}</span>
                  <span className="font-tabular text-inksoft">{r.done}/{r.total}</span>
                </div>
                <ProgressBar value={r.done} max={r.total} color={r.color} />
              </div>
            ))}
          </div>
          <button
            onClick={() => setTab("tech")}
            className="mt-4 text-sm text-accent font-medium hover:underline"
          >
            Go to Tech &amp; Finance Tracks →
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
          <h3 className="font-display font-semibold text-navy mb-4">Practice Platforms</h3>
          <div className="space-y-3">
            {platforms.map((p) => {
              const val = state.platformProgress[p.id]?.value || 0;
              return (
                <div key={p.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-ink">{p.name}</span>
                    <span className="font-tabular text-inksoft">{val}/{p.goal}</span>
                  </div>
                  <ProgressBar value={val} max={p.goal} color="#2E6F71" />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setTab("platforms")}
            className="mt-4 text-sm text-accent font-medium hover:underline"
          >
            Go to Practice Platforms →
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line p-6 shadow-sm">
          <h3 className="font-display font-semibold text-navy mb-1">Current Week</h3>
          {(() => {
            const nextWeek = weeks.find((w) => !state.weekDone[w.week]) || weeks[weeks.length - 1];
            return (
              <div className="mt-3">
                <p className="text-sm font-tabular text-inksoft">Week {nextWeek.week}</p>
                <p className="font-medium text-ink">{nextWeek.focus}</p>
                <p className="text-sm text-inksoft mt-1">{nextWeek.topics}</p>
                <p className="text-sm text-accent mt-2">Milestone: {nextWeek.milestone}</p>
              </div>
            );
          })()}

          {todayWeek ? (
            <div className={`mt-4 rounded-xl p-3 ${todayTaskDone ? "bg-accentsoft" : "bg-signalsoft"}`}>
              <p className="text-[10px] uppercase tracking-wide text-inksoft">Today's specific task</p>
              <p className={`text-sm mt-0.5 ${todayTaskDone ? "text-inksoft line-through" : "text-ink font-medium"}`}>
                {todayWeek.dailyTasks[todayRoadmap.day]}
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-xl p-3 bg-paper border border-line">
              <p className="text-xs text-inksoft">
                Set a program start date on the Calendar tab to see a specific task here every day.
              </p>
            </div>
          )}

          <button onClick={() => setTab("weekly")} className="mt-4 text-sm text-accent font-medium hover:underline">
            Go to Weekly Plan →
          </button>
        </div>

        <FocusTimer trackerState={trackerState} />
      </div>
    </div>
  );
}
