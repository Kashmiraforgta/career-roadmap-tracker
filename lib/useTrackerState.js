"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { weeks, platforms, techRoles, financeRoles, projects, defaultChecklistItems } from "./data";
import { computeOverall, todayKey } from "./stats";

const STORAGE_KEY = "career-roadmap-tracker-v1";
const SAVE_DEBOUNCE_MS = 1000;

const allRoles = [...techRoles, ...financeRoles];

function buildDefaultState() {
  const weekDone = {};
  weeks.forEach((w) => (weekDone[w.week] = false));

  const platformProgress = {};
  platforms.forEach((p) => (platformProgress[p.id] = { value: 0, notes: "" }));

  const roleTopics = {};
  allRoles.forEach((r) => {
    roleTopics[r.id] = r.topics.map(() => false);
  });

  const projectState = {};
  projects.forEach((p) => (projectState[p.id] = { status: "Not started", link: "", notes: "" }));

  return {
    weekDone,
    platformProgress,
    roleTopics,
    projectState,
    activityLog: {},
    progressHistory: {},
    checklistItems: defaultChecklistItems,
    dailyChecklist: {},
    dailyGoals: {},
    events: {},
    weeklyReviews: {},
    applications: [],
  };
}

// Stamp today's activity count + today's overall-progress snapshot onto a
// freshly-built next state. Called by every mutator so the heatmap and trend
// chart stay in sync with whatever the user just did.
function withActivity(next) {
  const key = todayKey();
  const { overall } = computeOverall(next, { weeks, platforms, allRoles, projects });
  return {
    ...next,
    activityLog: { ...next.activityLog, [key]: (next.activityLog?.[key] || 0) + 1 },
    progressHistory: { ...next.progressHistory, [key]: overall },
  };
}

async function callApi(method, passphrase, body) {
  const res = await fetch("/api/state", {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-tracker-passphrase": passphrase,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    const err = new Error("unauthorized");
    err.code = 401;
    throw err;
  }
  if (!res.ok) {
    const err = new Error("request_failed");
    err.code = res.status;
    throw err;
  }
  return res.json();
}

export default function useTrackerState() {
  const [state, setState] = useState(buildDefaultState);
  const [hydrated, setHydrated] = useState(false);
  const [passphrase, setPassphrase] = useState(null);
  const [needsPassphrase, setNeedsPassphrase] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | syncing | synced | error | offline
  const saveTimer = useRef(null);
  const skipNextSave = useRef(false);

  // Step 1: load whatever is cached locally so the UI is instant, and figure
  // out if we already have a saved passphrase for this device.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        skipNextSave.current = true;
        const parsed = JSON.parse(raw);
        setState((prev) => ({
          ...prev,
          ...parsed,
          activityLog: parsed.activityLog || {},
          progressHistory: parsed.progressHistory || {},
          checklistItems: parsed.checklistItems || defaultChecklistItems,
          dailyChecklist: parsed.dailyChecklist || {},
          dailyGoals: parsed.dailyGoals || {},
          events: parsed.events || {},
          weeklyReviews: parsed.weeklyReviews || {},
          applications: parsed.applications || [],
        }));
      }
    } catch (e) {
      console.error("Failed to load cached progress", e);
    }

    // Passphrase is intentionally NOT persisted - always ask on load.
    setNeedsPassphrase(true);
    setHydrated(true);
  }, []);

  // Step 2: once we have a passphrase, pull the latest state from the
  // server (source of truth across devices) and merge it in.
  useEffect(() => {
    if (!passphrase) return;

    let cancelled = false;
    setSyncStatus("syncing");

    callApi("GET", passphrase)
      .then((res) => {
        if (cancelled) return;
        if (res.data) {
          skipNextSave.current = true;
          setState((prev) => ({
            ...prev,
            ...res.data,
            activityLog: res.data.activityLog || {},
            progressHistory: res.data.progressHistory || {},
            checklistItems: res.data.checklistItems || defaultChecklistItems,
            dailyChecklist: res.data.dailyChecklist || {},
            dailyGoals: res.data.dailyGoals || {},
            events: res.data.events || {},
            weeklyReviews: res.data.weeklyReviews || {},
            applications: res.data.applications || [],
          }));
        }
        setNeedsPassphrase(false);
        setSyncStatus("synced");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.code === 401) {
          setPassphrase(null);
          setNeedsPassphrase(true);
          setSyncStatus("idle");
        } else {
          // No network / server down - keep working from local cache.
          setSyncStatus("offline");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [passphrase]);

  // Step 3: always cache locally, and debounce-push to the server whenever
  // the tracker state changes.
  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to cache progress locally", e);
    }

    if (skipNextSave.current) {
      // This update came FROM a load (local cache or server), not a user
      // edit, so don't immediately bounce it back to the server.
      skipNextSave.current = false;
      return;
    }
    if (!passphrase) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSyncStatus("syncing");
      callApi("POST", passphrase, state)
        .then(() => setSyncStatus("synced"))
        .catch((err) => {
          setSyncStatus(err.code === 401 ? "idle" : "error");
          if (err.code === 401) {
            setPassphrase(null);
            setNeedsPassphrase(true);
          }
        });
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, hydrated, passphrase]);

  const submitPassphrase = useCallback((value) => {
    if (!value) return;
    setPassphrase(value);
  }, []);

  const toggleWeek = useCallback((weekNum) => {
    setState((prev) =>
      withActivity({
        ...prev,
        weekDone: { ...prev.weekDone, [weekNum]: !prev.weekDone[weekNum] },
      })
    );
  }, []);

  const updatePlatform = useCallback((id, patch) => {
    setState((prev) =>
      withActivity({
        ...prev,
        platformProgress: {
          ...prev.platformProgress,
          [id]: { ...prev.platformProgress[id], ...patch },
        },
      })
    );
  }, []);

  const toggleRoleTopic = useCallback((roleId, index) => {
    setState((prev) => {
      const current = prev.roleTopics[roleId] || [];
      const updated = [...current];
      updated[index] = !updated[index];
      return withActivity({ ...prev, roleTopics: { ...prev.roleTopics, [roleId]: updated } });
    });
  }, []);

  const updateProject = useCallback((id, patch) => {
    setState((prev) =>
      withActivity({
        ...prev,
        projectState: { ...prev.projectState, [id]: { ...prev.projectState[id], ...patch } },
      })
    );
  }, []);

  // --- Daily checklist (recurring template + per-day completion) ---------

  const toggleChecklistDone = useCallback((date, itemId) => {
    setState((prev) => {
      const dayMap = prev.dailyChecklist[date] || {};
      return withActivity({
        ...prev,
        dailyChecklist: { ...prev.dailyChecklist, [date]: { ...dayMap, [itemId]: !dayMap[itemId] } },
      });
    });
  }, []);

  const addChecklistItem = useCallback((text) => {
    if (!text.trim()) return;
    setState((prev) => ({
      ...prev,
      checklistItems: [...prev.checklistItems, { id: `c${Date.now()}`, text: text.trim() }],
    }));
  }, []);

  const removeChecklistItem = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      checklistItems: prev.checklistItems.filter((c) => c.id !== id),
    }));
  }, []);

  // --- Daily goals (freeform, per date) -----------------------------------

  const addDailyGoal = useCallback((date, text) => {
    if (!text.trim()) return;
    setState((prev) => {
      const dayGoals = prev.dailyGoals[date] || [];
      return withActivity({
        ...prev,
        dailyGoals: {
          ...prev.dailyGoals,
          [date]: [...dayGoals, { id: `g${Date.now()}`, text: text.trim(), done: false }],
        },
      });
    });
  }, []);

  const toggleDailyGoal = useCallback((date, goalId) => {
    setState((prev) => {
      const dayGoals = prev.dailyGoals[date] || [];
      return withActivity({
        ...prev,
        dailyGoals: {
          ...prev.dailyGoals,
          [date]: dayGoals.map((g) => (g.id === goalId ? { ...g, done: !g.done } : g)),
        },
      });
    });
  }, []);

  const removeDailyGoal = useCallback((date, goalId) => {
    setState((prev) => {
      const dayGoals = prev.dailyGoals[date] || [];
      return {
        ...prev,
        dailyGoals: { ...prev.dailyGoals, [date]: dayGoals.filter((g) => g.id !== goalId) },
      };
    });
  }, []);

  // --- Scheduled events (title + optional time, per date) ----------------

  const addEvent = useCallback((date, { title, time }) => {
    if (!title.trim()) return;
    setState((prev) => {
      const dayEvents = prev.events[date] || [];
      return withActivity({
        ...prev,
        events: {
          ...prev.events,
          [date]: [...dayEvents, { id: `e${Date.now()}`, title: title.trim(), time: time || "" }].sort((a, b) =>
            (a.time || "99:99").localeCompare(b.time || "99:99")
          ),
        },
      });
    });
  }, []);

  const removeEvent = useCallback((date, eventId) => {
    setState((prev) => {
      const dayEvents = prev.events[date] || [];
      return {
        ...prev,
        events: { ...prev.events, [date]: dayEvents.filter((e) => e.id !== eventId) },
      };
    });
  }, []);

  // --- Weekly review (reflection per roadmap week number) ----------------

  const updateWeeklyReview = useCallback((weekNum, patch) => {
    setState((prev) =>
      withActivity({
        ...prev,
        weeklyReviews: {
          ...prev.weeklyReviews,
          [weekNum]: { ...prev.weeklyReviews[weekNum], ...patch },
        },
      })
    );
  }, []);

  // --- Job applications (with optional auto follow-up calendar event) ----

  const addApplication = useCallback((data) => {
    if (!data.company?.trim()) return;
    setState((prev) => {
      const entry = {
        id: `a${Date.now()}`,
        company: data.company.trim(),
        role: data.role?.trim() || "",
        appliedDate: data.appliedDate || todayKey(),
        status: data.status || "Applied",
        followUpDate: data.followUpDate || "",
        link: data.link?.trim() || "",
        notes: data.notes?.trim() || "",
      };
      let next = { ...prev, applications: [...prev.applications, entry] };
      if (entry.followUpDate) {
        const dayEvents = next.events[entry.followUpDate] || [];
        next = {
          ...next,
          events: {
            ...next.events,
            [entry.followUpDate]: [
              ...dayEvents,
              { id: `e${Date.now()}f`, title: `Follow up: ${entry.company}`, time: "" },
            ],
          },
        };
      }
      return withActivity(next);
    });
  }, []);

  const updateApplication = useCallback((id, patch) => {
    setState((prev) => ({
      ...prev,
      applications: prev.applications.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  }, []);

  const removeApplication = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      applications: prev.applications.filter((a) => a.id !== id),
    }));
  }, []);

  // --- Export / backup ------------------------------------------------------

  const exportData = useCallback(() => {
    if (typeof window === "undefined") return;
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-tracker-backup-${todayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state]);

  const resetAll = useCallback(() => {
    const fresh = buildDefaultState();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
    setState(fresh);
  }, []);

  return {
    state,
    hydrated,
    needsPassphrase,
    syncStatus,
    submitPassphrase,
    toggleWeek,
    updatePlatform,
    toggleRoleTopic,
    updateProject,
    toggleChecklistDone,
    addChecklistItem,
    removeChecklistItem,
    addDailyGoal,
    toggleDailyGoal,
    removeDailyGoal,
    addEvent,
    removeEvent,
    updateWeeklyReview,
    addApplication,
    updateApplication,
    removeApplication,
    exportData,
    resetAll,
  };
}
