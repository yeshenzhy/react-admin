
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.config.js');
// 清空dist文件夹
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: './css/[name].[hash].css' }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g, // 一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
      cssProcessor: require('cssnano'), // 用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
      cssProcessorOptions: {
        safe: true,
        discardComments: { removeAll: true },
        // map: {
        // // 不生成内联映射,这样配置就会生成一个source-map文件
        //   inline: false,
        //   // 向css文件添加source-map路径注释
        //   // 如果没有此项压缩后的css会去除source-map路径注释
        //   annotation: true,
        // },
      }, // 传递给cssProcessor的选项，默认为{}
      canPrint: true, // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, // Boolean/String,字符串即是缓存文件存放的路径
        parallel: true, // 启用多线程并行运行提高编译速度
        sourceMap: true,
        
        uglifyOptions: {
          output: { comments: false }, // 删掉所有注释
          warnings: false, // 这里的warnings一定的提出来不然会报错`warning` is not a supported option
          compress: {
            // warning: false, // 这个得注释掉
            drop_debugger: true,
            drop_console: true, // 过滤console,即使写了console,线上也不显示
          },
        }, 
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
});
