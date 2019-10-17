const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.base.conf.js");
const HappyPack = require("happypack");
const os = require("os");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const webpack = require("webpack");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    // 输出目录
    path: path.resolve(__dirname, "../dist"),
    // 文件名称
    filename: "bundle.js",
    chunkFilename: "[name].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "happyBabel",
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    })
  ],
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "../dist"),
    host: "localhost", // 可以使用手机访问
    port: 3000,
    historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址
      "/api": "http://localhost:3000"
    }
  }
});
