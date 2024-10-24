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
        hover: "#383737",
        color1: "#55799d",
        color2: "#2c3e51",
        color3: "#7388b3",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
