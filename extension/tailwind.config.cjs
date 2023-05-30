/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        buttonPrimary: '#5454C2',
      },
      backgroundImage: {
        teste:
          'linear-gradient(171.02deg, #8989C6 15.88%, #8989C6 36.19%, rgba(137, 137, 198, 0) 93.17%)',
        stripes:
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 12.5%, transparent 12.5%, transparent)',
      },
    },
  },
  plugins: [],
}
