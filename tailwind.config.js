module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'spotify-logo': "url('/src/assets/logo/spotify_logo.png')",
        'youtube-logo': "url('/src/assets/logo/yt_logo.svg')",
       }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
