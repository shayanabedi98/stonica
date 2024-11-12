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
        primary: "#00030f",
        secondary: "#f0f0f0",
        accentdark: "#001529",
        accentlight: "#004773",
        color1: "#0076b6",
        color2: "#0099ff",
        color3: "#0044C2",
        color4: "#8855ff",
        color5: "#b5c5d7",
      },
      // screens: {
      //   "xl": "1280px",
      // },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
