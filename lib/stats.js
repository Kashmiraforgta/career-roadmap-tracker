// Pure calculation helpers shared across the dashboard, heatmap, and trend
// chart. Keeping these in one place means every view agrees on what
// "progress" and "streak" mean.

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
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
    const d = new Date(day + "T00:00:00Z");
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
