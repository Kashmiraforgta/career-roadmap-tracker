// Small, dependency-free SVG icon set (24x24, stroke-based) used across the
// tab nav and a few widgets. Kept in one file so the app doesn't need an
// icon package — every icon inherits color via `currentColor`.

function Svg({ children, className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export const IconDashboard = (p) => (
  <Svg {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></Svg>
);
export const IconCalendar = (p) => (
  <Svg {...p}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></Svg>
);
export const IconWeekly = (p) => (
  <Svg {...p}><path d="M4 6h16M4 12h16M4 18h10" /><circle cx="19" cy="18" r="2.2" /></Svg>
);
export const IconCode = (p) => (
  <Svg {...p}><path d="M8 4 3 12l5 8M16 4l5 8-5 8" /></Svg>
);
export const IconLayers = (p) => (
  <Svg {...p}><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M2 13l10 5 10-5M2 16.5l10 5 10-5" /></Svg>
);
export const IconFinance = (p) => (
  <Svg {...p}><path d="M3 21h18M6 21V10M12 21V4M18 21v-7" /></Svg>
);
export const IconFolder = (p) => (
  <Svg {...p}><path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 12.12 7H19.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z" /></Svg>
);
export const IconTarget = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></Svg>
);
export const IconAlert = (p) => (
  <Svg {...p}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 9.5v5" /><circle cx="12" cy="17.3" r="0.9" fill="currentColor" stroke="none" /></Svg>
);
export const IconBook = (p) => (
  <Svg {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /></Svg>
);
export const IconTimer = (p) => (
  <Svg {...p}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9.5 2h5" /></Svg>
);
export const IconDownload = (p) => (
  <Svg {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" /></Svg>
);
export const IconUpload = (p) => (
  <Svg {...p}><path d="M12 21V9m0 0-4 4m4-4 4 4M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" /></Svg>
);
export const IconRefresh = (p) => (
  <Svg {...p}><path d="M4 4v5h5" /><path d="M20 20v-5h-5" /><path d="M5.5 9A7.5 7.5 0 0 1 19 8m-.5 7A7.5 7.5 0 0 1 5 16" /></Svg>
);
export const IconCheckCircle = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.3 2.3L16 10" /></Svg>
);
export const IconLink = (p) => (
  <Svg {...p}><path d="M9.5 14.5 14.5 9.5" /><path d="M11 6.5 12.4 5A4 4 0 1 1 18 10.6L16.5 12M13 17.5 11.6 19A4 4 0 1 1 6 13.4L7.5 12" /></Svg>
);
export const IconPlay = (p) => (
  <Svg {...p}><path d="m7 5 12 7-12 7V5Z" /></Svg>
);
export const IconPause = (p) => (
  <Svg {...p}><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></Svg>
);
export const IconClose = (p) => (
  <Svg {...p}><path d="m5 5 14 14M19 5 5 19" /></Svg>
);
