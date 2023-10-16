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
      '5': 5,
      '10': 10,
      '15': 15,
      '20': 20,
      '25': 25,
      '30': 30,
      '35': 35,
    },
    colors:{
      'default':'#007784'
    },
  },
  plugins: [],
}

