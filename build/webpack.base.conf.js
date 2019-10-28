const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: "./src/index.js", // string | object | array  // 这里应用程序开始执行
  // webpack 开始打包
  output: {
    // 输出目录
    path: path.resolve(__dirname, "/dist")
  },
  resolve: {
    extensions: [".js", ".jsx"]
    // alias: {
    //   "@": path.resolve(__dirname, "../src"),
    //   pages: path.resolve(__dirname, "../src/pages"),
    //   router: path.resolve(__dirname, "../src/router")
    // }
  },

  module: {
    // 关于模块配置

    rules: [
      {
        // cnpm i babel-loader @babel/core @babel/preset-env -D
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "happypack/loader?id=happyBabel"
          }
        ]
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // 编译css
          "less-loader", // 编译scss
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")]
            }
          }
        ]
      },
      // {
      //   test: /\.(css|less)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     "style-loader", // 创建style标签，并将css添加进去
      //     "css-loader" // 编译css]
      //   ]
      // },
      // {
      //   //antd样式处理
      //   test: /\.css$/,
      //   exclude: /src/,
      //   use: [
      //     { loader: "style-loader" },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         importLoaders: 1
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images/", // 图片输出的路径
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },

  plugins: [
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
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", // 最终创建的文件名
      template: path.resolve(__dirname, "../index.html"), // 指定模板路径
      //将模板的头部和尾部添加css和js模板,dist 目录发布到服务器上，项目包。可以直接上线
      title: "yezi"
      // file: 'index.html', //打造单页面运用 最后运行的不是这个
      // template: 'src/index.html'  //vue-cli放在跟目录下
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
