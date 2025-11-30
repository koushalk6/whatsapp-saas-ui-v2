/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dmxGreen: { DEFAULT: "#2f8f47", light: "#e9f6ea", muted: "#7fbf84" }
      }
    }
  },
  plugins: []
}
