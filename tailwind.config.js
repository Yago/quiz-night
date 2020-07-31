const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: true,
  theme: {
    ...defaultTheme,
    extend: {
      flex: {
        '1/2': '0 0 50%',
      },
    },
  },
};
