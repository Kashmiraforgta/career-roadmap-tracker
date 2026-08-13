"use client";

import { useRef, useState } from "react";
import { IconUpload } from "./icons";

export default function BackupRestore({ onImport }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState(null); // { ok: bool, message: string } | null

  const handlePick = () => fileInputRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    const confirmed = window.confirm(
      `Restore progress from "${file.name}"? This will overwrite everything currently saved.`
    );
    if (!confirmed) return;

    try {
      const text = await file.text();
      const result = onImport(text);
      if (result.ok) {
        setStatus({ ok: true, message: "Progress restored from backup." });
      } else {
        setStatus({ ok: false, message: result.error });
      }
    } catch {
      setStatus({ ok: false, message: "Couldn't read that file." });
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="relative">
      <button
        onClick={handlePick}
        className="flex items-center gap-1.5 text-xs text-inksoft hover:text-accent border border-line hover:border-accent/50 rounded-lg px-3 py-1.5 transition-colors"
      >
        <IconUpload className="w-3.5 h-3.5" />
        Restore backup
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFile}
        className="hidden"
      />
      {status && (
        <div
          className={`absolute right-0 top-full mt-2 z-30 text-xs rounded-lg px-3 py-2 shadow-md border w-64 ${
            status.ok ? "bg-accentsoft border-accent/30 text-accent" : "bg-financesoft border-finance/30 text-finance"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
