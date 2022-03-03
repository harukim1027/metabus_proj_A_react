const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      xxs: '270px',
      xs: '390px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
