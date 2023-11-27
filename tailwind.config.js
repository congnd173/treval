/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        rose: {
          50: "rgb(255 241 242)",
          100: "rgb(255 228 230)",
          200: "rgb(254 205 211)",
          300: "rgb(253 164 175)",
          400: "rgb(251 113 133)",
          500: "rgb(244 63 94)",
          600: "rgb(225 29 72)",
          700: "rgb(190 18 60)",
          800: "rgb(159 18 57)",
          900: "rgb(136 19 55)",
        },
        neutral: {
          50: "rgb(250 250 250)",
          100: "rgb(245 245 245)",
          200: "rgb(229 229 229)",
          300: "rgb(212 212 212)",
          400: "rgb(163 163 163)",
          500: "rgb(115 115 115)",
          600: "rgb(82 82 82)",
          700: "rgb(64 64 64)",
          800: "rgb(38 38 38)",
          900: "rgb(23 23 23)",
        }
      }
    },
  },
  plugins: [],
});

