/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde-principal': '#72aa00',
        'Gris': '#d1d1d1',
        'Cafe-Footer': '#635B4F'
      },
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"],
      },
      keyframes: {
        "hidde-left": {
          "0%": {
            left: "0%",
            opacity: "1",
          },
          "50%": {
            left: "-100%",
            opacity: "0",
          },
          "100%": {
            left: "-200%",
            opacity: "0",
          },
        },
        "hidde-right": {
          "0%": {
            left: "0%",
            opacity: "1",
          },
          "50%": {
            left: "100%",
            opacity: "0",
          },
          "100%": {
            left: "200%",
            opacity: "0",
          },
        },
        "appear-left": {
          "0%": {
            left: "-200%",
            opacity: "0",
          },
          "50%": {
            left: "-100%",
            opacity: "0",
          },
          "100%": {
            left: "0%",
            opacity: "1",
          },
        },
        "appear-right": {
          "0%": {
            left: "200%",
            opacity: "0",
          },
          "50%": {
            left: "100%",
            opacity: "0",
          },
          "100%": {
            left: "0%",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
}

