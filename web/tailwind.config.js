export default {
  content: [
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#212529',
        surface: '#292929',
        error: '#DF5E78',
        secondary: '#fec5bb',
        primary: '#DEE2E6',
        white: '#FFFFFF',
        succes: '#5CB85C',
        lightgray: '#2b3035'
      },
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      gridRow: {
          'span-9': 'span 9 / span 9',
          'span-10': 'span 10 / span 10',
      }
    },
  },
  plugins: [],
}


