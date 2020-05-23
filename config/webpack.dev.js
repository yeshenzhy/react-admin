const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    port: '3030',
    inline: true,
    open: true,
    overlay: true,
    // proxy: { //代理配置
    //   '/api': {
    //     target: '', 
    //     changeOrigin: true,  
    //     pathRewrite: {
    //       '^/api': ''  
    //     }
    //   }
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件 
  ],
  devtool: 'cheap-module-eval-source-map',
});
