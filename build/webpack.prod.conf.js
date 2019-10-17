const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.base.conf.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const HappyPack = require("happypack");
// const os = require("os");
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = merge(commonConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    // 输出目录
    path: path.resolve(__dirname, "../dist"),
    // 文件名称
    filename: "bundle.js",
    chunkFilename: "[id].[hash:8].css"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")] // 添加css中的浏览器前缀
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "images/", //输出到images文件夹
              limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
            }
          }
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          // 抽离自己写的公共代码
          chunks: "initial",
          name: "common", // 打包后的文件名，任意命名
          minChunks: 2, //最小引用2次
          minSize: 0 // 只要超出0字节就生成一个新包
        },
        styles: {
          name: "styles", // 抽离公用样式
          test: /\.css$/,
          chunks: "all",
          minChunks: 2,
          enforce: true
        },
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
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
