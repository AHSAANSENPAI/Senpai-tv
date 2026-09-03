import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0B0A12",
        panel: "#14121F",
        elevated: "#1C1930",
        elevated2: "#241F3B",
        edge: "#2C2745",
        senpai: {
          pink: "#FF3D6E",
          cyan: "#4DE8FF",
          gold: "#FFC857",
          violet: "#8C6BFF",
        },
        ink: {
          DEFAULT: "#F5F3FA",
          muted: "#9C97B8",
          faint: "#6C6789",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "senpai-glow":
          "radial-gradient(60% 60% at 20% 0%, rgba(255,61,110,0.25) 0%, rgba(255,61,110,0) 60%), radial-gradient(50% 50% at 90% 10%, rgba(77,232,255,0.18) 0%, rgba(77,232,255,0) 60%)",
        "glass-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,61,110,0.35), 0 8px 30px -8px rgba(255,61,110,0.45)",
        "glow-cyan":
          "0 0 0 1px rgba(77,232,255,0.35), 0 8px 30px -8px rgba(77,232,255,0.4)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      clipPath: {
        angled: "polygon(0 0, 100% 0, 100% 88%, 0 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(255,61,110,0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(255,61,110,0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-ring": "pulse-ring 1.6s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
