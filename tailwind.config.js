/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        canvas: {
          DEFAULT: "#06080f",
          subtle: "#0a0e17",
        },
        surface: {
          DEFAULT: "#0f1319",
          raised: "#151b24",
          overlay: "#1a2230",
          muted: "#111820",
        },
        slate: {
          950: "#06080f",
          900: "#0f1319",
          850: "#151b24",
          800: "#1e2736",
          750: "#263041",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
        },
        accent: {
          DEFAULT: "#10b981",
          bright: "#34d399",
          muted: "#059669",
          glow: "rgba(16, 185, 129, 0.15)",
          ring: "rgba(16, 185, 129, 0.4)",
        },
        alert: {
          DEFAULT: "#f59e0b",
          bright: "#fbbf24",
          muted: "#d97706",
          glow: "rgba(245, 158, 11, 0.15)",
          ring: "rgba(245, 158, 11, 0.4)",
        },
        danger: {
          DEFAULT: "#ef4444",
          bright: "#f87171",
          muted: "#dc2626",
          glow: "rgba(239, 68, 68, 0.15)",
        },
        info: {
          DEFAULT: "#3b82f6",
          bright: "#60a5fa",
          glow: "rgba(59, 130, 246, 0.15)",
        },
        border: {
          DEFAULT: "rgba(30, 39, 54, 0.8)",
          subtle: "rgba(30, 39, 54, 0.5)",
          strong: "rgba(51, 65, 85, 0.6)",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(16, 185, 129, 0.12)",
        "glow-sm": "0 0 12px rgba(16, 185, 129, 0.08)",
        "glow-alert": "0 0 20px rgba(245, 158, 11, 0.12)",
        card: "0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(30, 39, 54, 0.5)",
        "card-hover":
          "0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(51, 65, 85, 0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-dark":
          "radial-gradient(at 40% 20%, rgba(16, 185, 129, 0.06) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.04) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.03) 0px, transparent 50%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(16, 185, 129, 0.08)" },
          "50%": { boxShadow: "0 0 24px rgba(16, 185, 129, 0.18)" },
        },
      },
    },
  },
  plugins: [],
};
