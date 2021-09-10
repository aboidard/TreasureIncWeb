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
      'text-orange-700',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'game-intro': "url('/treasure_inc_background.png')",
      })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
