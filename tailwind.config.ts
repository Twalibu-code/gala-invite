import type { Config } from "tailwindcss";

// Colours sampled from the Heart Team Africa Foundation (HTAF) brand posts.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: { DEFAULT: "#9F2474", deep: "#6E1850", dark: "#4A0F38" },
        aqua: { DEFAULT: "#1CC7D8", blue: "#1FA3D4", mist: "#EDFBFC" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      boxShadow: { soft: "0 20px 50px -20px rgba(110,24,80,.35)" },
    },
  },
  plugins: [],
};
export default config;
