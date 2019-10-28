const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.base.conf.js");

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
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
