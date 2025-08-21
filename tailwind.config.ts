import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: {
          bg: "#252525",
          dark: "#1C1C1C",
          light: "#404040",
          darklight: "#1B1B1B",
          lightlight: "#7C7C7C",
        },
        logo: {
          green: "#83FF92",
          blue: "#72A3FF",
          red: "#FA5170"
        }
      },
    },
  },
  plugins: [],
};
export default config;
