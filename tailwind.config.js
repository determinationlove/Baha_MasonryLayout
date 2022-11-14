const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './src/renderer/**/*.{js,jsx,ts,tsx,ejs}',
    './src/components/**/*.{js,jsx,ts,tsx,ejs}',
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },

      dropShadow: {
        'text': '0 0.75px 1px rgba(0, 0, 0, 0.8)',
        'logo': '0 1px 0.5px rgba(91, 205, 178, 1)',
      },

      boxShadow: {
        'article': '0 3px 3px 0.1px rgb(0 0 0 / 0.3), 0 3px 3px 0.1px rgb(0 0 0 / 0.3)',
      },

      width: {
        'iframe': '50rem',
        'gamercard': '110px',
      },

      height: {
        'content': '90vh',
        'iframe': '30rem',
        'gamercard': '160px',
      },

      minWidth: {
        'gamercard': '110px',
      },

      minHeight: {
        'noImg': '4rem',
        'gamercard': '160px',
      },

      overflowScroll: {
        'bml': 'overflow-y: scroll, display: none',
      },

      screens: {
        'desktop': '1440px',
      },

      
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
    },
  },
  plugins: [ 
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};