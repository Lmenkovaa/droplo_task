/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: {
          100: "#f5f5f5",
          900: "#101828",
        },
        secondary: {
          100: "#F9FAFB",
          200: "#EAECF0",
          400: "#475467",
          700: "#344054",
        },
        white: "#FFFFFF",
        gray:{
          300: "#D0D5DD",
          400: "#667085",
        },
        purple: {
          100: "#D6BBFB",
          300: "#6941C6",
        }
      },
    },
  },
  plugins: [],
};
