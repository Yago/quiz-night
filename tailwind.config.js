const defaultTheme = require('tailwindcss/defaultTheme');

const fallbackSans = [
  '-apple-system',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
];

module.exports = {
  important: true,
  theme: {
    ...defaultTheme,
    fontFamily: {
      sans: ['Inter', ...fallbackSans],
      heading: ['Fira Sans', ...fallbackSans],
    },
    extend: {
      flex: {
        '1/2': '0 0 50%',
      },
      inset: {
        full: '100%',
      },
    },
  },
};
