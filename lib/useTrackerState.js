"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { weeks, platforms, techRoles, financeRoles, projects } from "./data";
import { computeOverall, todayKey } from "./stats";

const STORAGE_KEY = "career-roadmap-tracker-v1";
const PASSPHRASE_KEY = "career-roadmap-tracker-passphrase";
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

  return { weekDone, platformProgress, roleTopics, projectState, activityLog: {}, progressHistory: {} };
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
        }));
      }
    } catch (e) {
      console.error("Failed to load cached progress", e);
    }

    const savedPassphrase = window.localStorage.getItem(PASSPHRASE_KEY);
    if (savedPassphrase) {
      setPassphrase(savedPassphrase);
    } else {
      setNeedsPassphrase(true);
    }
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
          }));
        }
        window.localStorage.setItem(PASSPHRASE_KEY, passphrase);
        setNeedsPassphrase(false);
        setSyncStatus("synced");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.code === 401) {
          window.localStorage.removeItem(PASSPHRASE_KEY);
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
            window.localStorage.removeItem(PASSPHRASE_KEY);
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
    resetAll,
  };
}
