/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/pages/**/*.{js,jsx,ts,tsx}", "./App.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily:{
      'lato-900': ['Lato_900Black'],
      'lato-100': ['Lato_100Thin'],
    },
    borderRadius:{
      '4xl': 35,
    }
  },
  plugins: [],
}

