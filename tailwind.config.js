/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EEF1F6",
        navy: "#101A33",
        navysoft: "#1B2745",
        ink: "#10182B",
        inksoft: "#5B6478",
        line: "#DDE3EE",
        accent: "#2E6F71",
        accentsoft: "#E4F0EF",
        finance: "#6B2C3E",
        financesoft: "#F3E7EB",
        signal: "#E8A33D",
        signalsoft: "#FBEBD2",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(#DDE3EE 1px, transparent 1px), linear-gradient(90deg, #DDE3EE 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
    },
  },
  plugins: [],
};
