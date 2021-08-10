/*
 * @Author: zhy
 * @Date: 2021-08-10 11:24:21
 * @Description: 
 * @LastEditTime: 2021-08-10 14:56:20
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const common = require('./webpack.config');
const utils = require('./utils');

const { HOST, PORT } = process.env;
const devWebpackConfig = merge(common, {
  mode: 'development',
  devServer: {
    hot: true,
    host: HOST || '0.0.0.0',
    port: PORT || '8080',
    inline: true,
    open: false,
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
  stats: 'errors-only', // 只在发生错误或有新的编译时输出
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
  devtool: 'cheap-module-eval-source-map',
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || '8080';
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['App running at:', `- Local:    http://localhost:${port}/`, `- Network:  http://${utils.ipAddress()}:${port}/`],
          notes: ['Note that the development build is not optimized.', 'To create a production build, run yarn build.'],
        },
        onErrors: utils.createNotifierCallback(),
      }));

      resolve(devWebpackConfig);
    }
  });
});
