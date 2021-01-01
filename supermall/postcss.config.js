module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: 'px',
      viewportWidth: 320,
      viewportHeight: 568,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['tab-bar'],
      minPixelValue: 1,
      mediaQuery: false,
    }
  }
}