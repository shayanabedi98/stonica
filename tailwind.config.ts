import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#eff2f8",
        secondary: "#222222",
        accent: "#999797",
        hover: "#dde4f0",
        color1: "#55799d",
        color2: "#2c3e51",
        color3: "#7388b3",
        color4: "#1f2d39",
        color5: "#b5c5d7"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
