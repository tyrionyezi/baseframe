const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.base.conf.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HappyPack = require("happypack");
// const os = require("os");
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const webpack = require("webpack");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    // 输出目录
    path: path.resolve(__dirname, "../dist"),
    // 文件名称
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js"
    // chunkFilename: "[id].[hash:8].css"
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      cacheGroups: {
        // 公共代码打包分组配置
        // jquery: {
        //     name: 'jquery',
        //     test: /[\\/]node_modules[\\/]jquery[\\/]/
        // },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(), //清除 旧的的打包文件
    // new HappyPack({
    //   //用id来标识 happypack处理那里类文件
    //   id: "happyBabel",
    //   //如何处理  用法和loader 的配置一样
    //   loaders: [
    //     {
    //       loader: "babel-loader?cacheDirectory=true"
    //     }
    //   ],
    //   //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
    //   threadPool: happyThreadPool,
    //   //允许 HappyPack 输出日志
    //   verbose: true
    // }),
    new HtmlWebpackPlugin({
      filename: "index.html", // 最终创建的文件名
      template: path.resolve(__dirname, "../index.html"), // 指定模板路径
      hash: true,
      // 压缩 => production 模式使用
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true //折叠 html 为一行
      }
    })
  ]
});
