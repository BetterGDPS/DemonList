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
          bg: "#1B263B",
          dark: "#0D1B2A",
          light: "#778DA9",
          darklight: "#415A77"
        },
        logo: {
          green: "#83FF92",
          blue: "#72A3FF",
          red: "#FF7E72"
        }
      },
    },
  },
  plugins: [],
};
export default config;
