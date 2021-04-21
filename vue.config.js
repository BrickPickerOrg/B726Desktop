module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    proxy: "http://localhost:3030"
    // proxy: "http://bknds.jiajiale.site"
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}

