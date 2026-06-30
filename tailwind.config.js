/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EDF4FF',
          100: '#D8D9F9',
          200: '#B1B3F3',
          400: '#7B7FE8',
          500: '#4B4FD9',
          600: '#3D41C4',
          700: '#3134A8',
          900: '#1A1A5E',
        },
        green: {
          50: '#1DF0BB0A',
          100: '#0AA288'
        },
        grey: {
          50: '#CCCCCC',
          300: '#E6EBF0',
          400: '#CED6DE',
          200: '#F0F4F7',
          700: '#525963'
        }

      },
      boxShadow: {
        'card':  '0 1px 4px rgba(0,0,0,0.07)',
        'panel': '0 2px 20px rgba(0,0,0,0.09)',
      },
    },
  },
  plugins: [],
}
