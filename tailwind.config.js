module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg_white: '#fdfdfd',
        bg_black: '#222222',
        gray: '#777777',
        blue: '#4DA8DA',
        red: '#C15645',
        green: '#57AC71',
        orange: '#C18445'
      }
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
