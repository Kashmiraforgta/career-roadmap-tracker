// Pure calculation helpers shared across the dashboard, heatmap, and trend
// chart. Keeping these in one place means every view agrees on what
// "progress" and "streak" mean.

export function todayKey(d = new Date()) {
  // IMPORTANT: never use toISOString() here - it converts to UTC, which
  // silently shifts the date by a day for any timezone ahead of UTC
  // (e.g. IST). Build the string from local date parts instead.
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function computeWeekPct(state, weeks) {
  const done = Object.values(state.weekDone).filter(Boolean).length;
  return weeks.length > 0 ? Math.round((done / weeks.length) * 100) : 0;
}

export function computePlatformPct(state, platforms) {
  const total = platforms.reduce((acc, p) => {
    const val = state.platformProgress[p.id]?.value || 0;
    return acc + Math.min(1, val / p.goal);
  }, 0);
  return platforms.length > 0 ? Math.round((total / platforms.length) * 100) : 0;
}

export function computeTopicsPct(state, allRoles) {
  let done = 0;
  let total = 0;
  allRoles.forEach((r) => {
    const topics = state.roleTopics[r.id] || [];
    done += topics.filter(Boolean).length;
    total += r.topics.length;
  });
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

export function computeProjectPct(state, projects) {
  const done = projects.filter((p) => state.projectState[p.id]?.status === "Done").length;
  return projects.length > 0 ? Math.round((done / projects.length) * 100) : 0;
}

export function computeOverall(state, { weeks, platforms, allRoles, projects }) {
  const weekPct = computeWeekPct(state, weeks);
  const platformPct = computePlatformPct(state, platforms);
  const topicsPct = computeTopicsPct(state, allRoles);
  const projectPct = computeProjectPct(state, projects);
  return {
    weekPct,
    platformPct,
    topicsPct,
    projectPct,
    overall: Math.round((weekPct + platformPct + topicsPct + projectPct) / 4),
  };
}

// --- Streaks & activity heatmap -------------------------------------------

// activityLog: { "YYYY-MM-DD": number } - count of tracked actions that day.
export function computeStreaks(activityLog) {
  const activeDays = new Set(
    Object.entries(activityLog || {})
      .filter(([, count]) => count > 0)
      .map(([day]) => day)
  );

  if (activeDays.size === 0) return { current: 0, longest: 0 };

  const cursor = new Date();
  let current = 0;
  // Current streak: walk backwards from today; today not yet active doesn't
  // break a streak that ended yesterday.
  if (!activeDays.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (activeDays.has(todayKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Longest streak: scan the sorted unique days for consecutive runs.
  const sorted = [...activeDays].sort();
  let longest = 0;
  let run = 0;
  let prevDate = null;
  for (const day of sorted) {
    const d = new Date(day + "T00:00:00");
    if (prevDate) {
      const diffDays = Math.round((d - prevDate) / 86400000);
      run = diffDays === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    prevDate = d;
  }

  return { current, longest: Math.max(longest, current) };
}

// Builds a GitHub-style grid: an array of week-columns, each an array of 7
// day cells (Sun-Sat), covering the last `weekCount` weeks up to today.
export function buildHeatmapGrid(activityLog, weekCount = 18) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay())); // extend to Saturday

  const start = new Date(end);
  start.setDate(start.getDate() - (weekCount * 7 - 1));

  const weeksArr = [];
  const cursor = new Date(start);
  for (let w = 0; w < weekCount; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const key = todayKey(cursor);
      const inFuture = cursor > today;
      days.push({
        date: key,
        count: inFuture ? null : activityLog?.[key] || 0,
        isToday: key === todayKey(today),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeksArr.push(days);
  }
  return weeksArr;
}

export function heatLevel(count) {
  if (count === null || count === undefined) return -1; // future / no cell
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

// Builds a real calendar month grid (Sun-Sat rows) for the given year/month
// (month is 0-indexed), with each in-month day carrying its activity level.
export function getMonthMatrix(year, month, activityLog) {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = todayKey();

  const cells = [];
  // Leading blanks
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const key = todayKey(dateObj);
    cells.push({
      day: d,
      date: key,
      count: activityLog?.[key] || 0,
      isToday: key === today,
      isFuture: key > today,
    });
  }
  // Trailing blanks to complete the last week
  while (cells.length % 7 !== 0) cells.push(null);

  const weeksArr = [];
  for (let i = 0; i < cells.length; i += 7) weeksArr.push(cells.slice(i, i + 7));
  return weeksArr;
}

// --- Roadmap day lookup ----------------------------------------------------

// Given the date the user started (YYYY-MM-DD) and any target date, figures
// out which roadmap week (1-16) and which day-within-week (0-6) that target
// date falls on. Returns null if outside the 16-week window or no start date
// has been set yet.
export function getRoadmapPosition(startDate, dateStr) {
  if (!startDate) return null;
  const start = new Date(startDate + "T00:00:00");
  const target = new Date(dateStr + "T00:00:00");
  const diffDays = Math.round((target - start) / 86400000);
  if (diffDays < 0 || diffDays > 111) return null;
  return { week: Math.floor(diffDays / 7) + 1, day: diffDays % 7 };
}

// --- Gamification: XP levels & streak badges -------------------------------

export const LEVELS = [
  { threshold: 0, title: "Rookie" },
  { threshold: 150, title: "Explorer" },
  { threshold: 400, title: "Builder" },
  { threshold: 800, title: "Specialist" },
  { threshold: 1400, title: "Strategist" },
  { threshold: 2200, title: "Expert" },
  { threshold: 3200, title: "Master" },
  { threshold: 4500, title: "Roadmap Legend" },
];

export function computeLevel(points) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].threshold) idx = i;
  }
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1];
  const into = points - current.threshold;
  const span = next ? next.threshold - current.threshold : 1;
  const pct = next ? Math.min(100, Math.round((into / span) * 100)) : 100;
  return {
    level: idx + 1,
    title: current.title,
    points,
    nextThreshold: next ? next.threshold : null,
    pctToNext: pct,
  };
}

export const STREAK_BADGES = [
  { days: 3, label: "3-day streak" },
  { days: 7, label: "1-week streak" },
  { days: 14, label: "2-week streak" },
  { days: 30, label: "1-month streak" },
  { days: 60, label: "2-month streak" },
];

// --- Milestone achievements -------------------------------------------------
// Each achievement is a pure predicate over a computed context, so unlocked
// state is derived live from the tracker state rather than stored separately
// - no risk of it ever drifting out of sync with reality.

export const ACHIEVEMENTS = [
  { id: "first-week", tier: "bronze", title: "First Steps", desc: "Complete Week 1 of the roadmap", check: (ctx) => !!ctx.state.weekDone[1] },
  { id: "halfway", tier: "silver", title: "Halfway There", desc: "Complete Week 8", check: (ctx) => !!ctx.state.weekDone[8] },
  { id: "graduate", tier: "gold", title: "Roadmap Graduate", desc: "Complete all 16 weeks", check: (ctx) => ctx.weeksDone === ctx.totalWeeks },
  { id: "century", tier: "silver", title: "Century Club", desc: "Log 100 LeetCode problems", check: (ctx) => (ctx.state.platformProgress.leetcode?.value || 0) >= 100 },
  { id: "full-house", tier: "silver", title: "Full House", desc: "Log progress on every practice platform", check: (ctx) => ctx.platforms.every((p) => (ctx.state.platformProgress[p.id]?.value || 0) > 0) },
  { id: "shipped", tier: "bronze", title: "Shipped It", desc: "Mark your first project Done", check: (ctx) => ctx.projectsDone >= 1 },
  { id: "portfolio", tier: "gold", title: "Portfolio Builder", desc: "Ship 3 projects", check: (ctx) => ctx.projectsDone >= 3 },
  { id: "apps-10", tier: "silver", title: "Application Machine", desc: "Log 10 job applications", check: (ctx) => ctx.state.applications.length >= 10 },
  { id: "offer", tier: "gold", title: "Offer Secured", desc: "Get at least one Offer status", check: (ctx) => ctx.state.applications.some((a) => a.status === "Offer") },
  { id: "reflective", tier: "bronze", title: "Reflective Learner", desc: "Fill in 4 weekly reflections", check: (ctx) => Object.values(ctx.state.weeklyReviews).filter((r) => r?.wentWell || r?.notWell || r?.adjust).length >= 4 },
  { id: "deep-diver", tier: "silver", title: "Deep Diver", desc: "Finish every topic in one track", check: (ctx) => ctx.allRoles.some((r) => (ctx.state.roleTopics[r.id] || []).length > 0 && (ctx.state.roleTopics[r.id] || []).every(Boolean)) },
  { id: "renaissance", tier: "gold", title: "Renaissance", desc: "Make progress across 3+ different tracks", check: (ctx) => ctx.allRoles.filter((r) => (ctx.state.roleTopics[r.id] || []).some(Boolean)).length >= 3 },
  { id: "level5", tier: "gold", title: "Level 5 Reached", desc: "Reach Level 5 overall", check: (ctx) => ctx.levelInfo.level >= 5 },
  { id: "streak30", tier: "gold", title: "Iron Streak", desc: "Hit a 30-day activity streak", check: (ctx) => ctx.longestStreak >= 30 },
  { id: "hackathon", tier: "bronze", title: "Hackathon Hero", desc: "Log your first hackathon", check: (ctx) => (ctx.state.platformProgress.hackathons?.value || 0) >= 1 },
];

export function computeAchievements(state, ctxExtra) {
  const ctx = { state, ...ctxExtra };
  return ACHIEVEMENTS.map((a) => ({ ...a, unlocked: !!a.check(ctx) }));
}
