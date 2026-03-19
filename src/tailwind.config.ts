import type { Config } from "tailwindcss";


  const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx, html}"],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        card: "var(--card)",
        secondary: "var(--secondary)",
        muted: "var(--secondary)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
      },

      fontFamily: {
        display: ["var(--headings)"],
        sans: ["var(--body)"],
        mono: ["var(--mono)"],
      }
    }
  },

  plugins: [],
};
