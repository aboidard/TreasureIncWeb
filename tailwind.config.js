module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './app/components/**/*.{js,ts,jsx,tsx}'
    ],
    safelist: [
      'text-white-700',
      'text-green-700',
      'text-blue-700',
      'text-purple-700',
      'text-red-700',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'kenvector': ['kenvector'],
    },

    extend: {
      backgroundImage: theme => ({
        'game-intro': "url('/treasure_inc_background.png')",
      }),
      inset: {
        '26': '6.5',
      },
      fontSize: {
        '3xs': '.6rem',
        '2xs': '.65rem',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
