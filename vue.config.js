/*
 * @Description: webpack配置
 * @Autor: wangxin
 * @Date: 2020-05-28 13:44:21
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-01 17:49:43
 */
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
