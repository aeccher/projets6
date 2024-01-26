module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        'blanc': '#FCFCFC',
        'gris': '#D9D9D9',
        'noir': '#0E0906',
        'orange': '#E47E52',
        'jaune': '#FCD283',
        'vert': '#3E9399',
        'bleu': '#30485E'
      },
      "fontFamily": {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif']
      },
    },

  },
  plugins: [],
}
