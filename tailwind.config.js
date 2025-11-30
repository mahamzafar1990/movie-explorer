/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#e11d48",
        accent: "#facc15",
        background: "#f3f4f6",
        text: "#111827",
        textSecondary: "#6b7280",
      },
    },
  },
  plugins: [],
};
