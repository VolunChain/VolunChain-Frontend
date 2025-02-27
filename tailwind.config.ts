import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tertiary: "var(--tertiary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        blue: "var(--blue)",
        grey: "var(--grey)",
        link: "var(--link)",
        bgsecondary: "var(--bg-secondary)",
      },
      fontFamily: {
        fustat: ['var(--font-fustat)', 'sans-serif'],
        kantumruy: ['Kantumruy', 'var(--font-fustat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;