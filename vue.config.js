module.exports = {
  devServer: {
    host: 'localhost',
    port: 8000,
    https: false,
    open: true,
    hotOnly: true
  },
  //项目打包的输出目录，相对于当前项目根路径
  outputDir: './dist',
  //项目打包后的资源目录，相对Fdist路径
  assetsDir: './src/assets',
  //打T包后的入/ 1页irindex. htmL,要引用资源的时候，正确方式是. /assets/css/styLe.css,加上:统一的./ 前缀
  publicPath: './',
  //入口页面index.htmL, 相对Jdist的路径
  indexPath: './index.html'
}
