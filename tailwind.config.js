/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: "#0c0b0a",
          surface: "#141311",
          surface2: "#1a1815",
          border: "#26241f",
          mid: "#3a362e",
          ivory: "#ece4d0",
          paper: "#d8cfb8",
          mute: "#a89e8a",
          dim: "#7a7367",
          faint: "#5a554a",
          amber: "#d4a463",
          oxblood: "#b04a4a",
          teal: "#7aada0",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ['"EB Garamond"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        jp: ['"Noto Serif JP"', "Fraunces", "ui-serif", "serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};
