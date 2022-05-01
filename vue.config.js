// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/environmentTools/' // 資料夾路徑，儲存庫名稱
    : '/'
}
