/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../uikit/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'

  theme: {
    screens: {
      sm: '640px',

      md: '768px',

      lg: '1024px',

      xl: '1280px',

      '2xl': '1536px',

      '3xl': '1764px',

      '4xl': '1920px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
