const proxy = {
  '/api': {
    target: 'http://127.0.0.1:8000/',
    secure: false,
    changeOrigin: true,
  },
}

module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: (config) => {
    return {
      devServer: { proxy },
    }
  },
}
