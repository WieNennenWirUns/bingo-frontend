/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#69db7c'
        },
        yellow: {
          100: '#f08c00'
        },
        red: {
          100: '#ff8787'
        }
      },
      fontFamily: {
        caveat: {
          "caveat-normal": ["Caveat-normal", "sans-serif"],
          "caveat-bold": ["Caveat-bold", "sans-serif"]
        }
      }
    },
  },
  plugins: [],
}
