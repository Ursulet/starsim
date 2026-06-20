import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"]
      },
      colors: {
        starsim: {
          navy: "#061B3D",
          space: "#082756",
          blue: "#0B356D",
          gold: "#D89B32",
          softGold: "#F2C46D",
          ivory: "#FBF8F1",
          ink: "#10213F",
          muted: "#5C6B82",
          border: "#E7E0D2"
        }
      },
      boxShadow: {
        premium: "0 18px 50px rgba(6, 27, 61, 0.12)",
        soft: "0 10px 30px rgba(6, 27, 61, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
