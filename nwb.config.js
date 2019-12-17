module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'VideoLooper',
      externals: {
        react: 'React'
      }
    }
  }
}
