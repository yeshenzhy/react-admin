const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    path: path.join(__dirname, 'dist'), // 打包后的文件存放的地方 
    filename: 'index.js', // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ['style-loader', 'css-loader'], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
  
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                // 'primary-color': '#20B2AA',
                // hack: `true; @import "theme.less";`
              },
              javascriptEnabled: true,
            },
          },
        ],

      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的

      },
      {
        test: /\.(jpg|png)$/,
        use: [
          'file-loader',
        ],

      },
    ],
  },
  devServer: {
    hot: true,
    port: '8080',
    inline: true,
    open: true,
    overlay: true,
    // proxy: { //代理
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
    new webpack.BannerPlugin('夜神丶'), // new一个插件的实例
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件 
  ],
  resolve: {
    extensions: [' ', '.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, './src'),
    },
  },
  devtool: 'source-map',
};

