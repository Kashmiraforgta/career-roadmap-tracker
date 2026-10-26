/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F7FB",
        navy: "#020556",
        navysoft: "#0A1070",
        navydeep: "#010320",
        ink: "#0F172A",
        inksoft: "#475569",
        line: "rgba(178, 127, 37, 0.35)",
        accent: "#01ACD4",
        accentsoft: "rgba(1, 172, 212, 0.18)",
        finance: "#0CA686",
        financesoft: "rgba(12, 166, 134, 0.16)",
        signal: "#64DF31",
        signalsoft: "rgba(100, 223, 49, 0.16)",
        peacock: {
          navyDeep: "#020556",
          navy: "#020556",
          navySurface: "#0A1070",
          navySoft: "#10198C",
          navyDeepest: "#010320",
          cerulean: "#01ACD4",
          teal: "#01D1AE",
          emerald: "#0CA686",
          lime: "#64DF31",
          gold: "#B27F25",
          cream: "#E6F4FA",
          mist: "#A9D2E2",
          red: "#D45A5A",
          line: "rgba(178, 127, 37, 0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(178,127,37,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(178,127,37,0.16) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
      boxShadow: {
        peacock: "0 0 0 1px rgba(178,127,37,0.35), 0 12px 30px -18px rgba(1,172,212,0.65)",
      },
    },
  },
  plugins: [],
};
