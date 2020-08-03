module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader'
        }
      ]
    }
  }
  // devServer: {
  //   host: '192.168.0.102', // 将浏览地址的本地服务修改为本机ip地址，用来到手机上测试
  //   port: 8080 // 端口号
  // }
}
