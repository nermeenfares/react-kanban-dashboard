/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D3E5ED",
        secondary: "#BAD1E0",
        lightgray: "#676767",
        darkgray: "#333333",
        scrollbar: "#A0BDD1",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
