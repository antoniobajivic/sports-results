module.exports = {
  important: true,
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      inset: {
        '50%': '50%',
        '3%': '3%',
      },
      spacing: {
        '28rem': '28rem',
        '38rem': '38rem',
        '50rem': '50rem',
        '68rem': '68rem',
      },
      colors: {
        blackOverlay: 'rgba(0,0,0,0.75)',
        pureBlue: '#007AFF',
        pureBlueLight: '#00BAFF',
        glitter: '#E6E8FA',
        softRed: '#FD5E71',
      },
    },
  },
  variants: {},
  plugins: [],
}
