const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    path: path.join(__dirname, 'dist'), // 打包后的文件存放的地方 
    filename: './js/[name].[hash].js', // 打包后输出文件的文件名
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
        // exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
        // exclude: /node_modules/,

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
    new webpack.BannerPlugin('夜神丶'), // 为每个 chunk 文件头部添加 banner。
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件 
  ],
  resolve: {
    extensions: [' ', '.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, './src'),
    },
  },
  devtool: 'cheap-module-source-map', // 开发模式建议cheap-module-eval-source-map， 生产模式cheap-module-source-map
  mode: 'production', // 开发模式development， 生产模式production
};

