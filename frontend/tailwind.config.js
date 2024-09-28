/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/src/assets/hero_bg.jpg')",
      },
      colors: {
        background: "#0B0D17",
        "accent-teal": "#00C2C7",
        "accent-dark-teal": "#009D9E",
        "accent-orange": "#FF6B35",
        primary: "#FFFFFF",
        secondary: "#B0B3C6",
      },
      fontFamily: {
        headline: ["Montserrat", "sans-serif"],
        "body-text": ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "overflow-x": "auto",
          "overflow-y": "hidden",
          "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
          "scrollbar-width": "none" /* For Firefox */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* For WebKit browsers */,
        },
      });
    },
  ],
};
