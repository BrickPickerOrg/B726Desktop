module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    host: "localhost",
    port: 3001,
    proxy: "http://api.migu.jsososo.com"
  }
};
