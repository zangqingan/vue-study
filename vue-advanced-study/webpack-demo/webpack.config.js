const path = require("path")
// 导入非 webpack 自带默认插件-css处理插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader')
module.exports  = {
  mode: "development",//项目开发模式，webpack 会根据不同值使用相对应模式的内置优化
  entry:"./main.js",//入口文件
  output:{
    filename:"bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer:{
    static:"./dist",
  },
  module:{
    rules:[
      // { test: /\.css$/, use: ["style-loader","css-loader'] }
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      // 配置处理 .vue文件的规则
      {test: /\.vue$/, loader:"vue-loader"},
      //js
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // scss
      {test: /\.scss$/, use: ["vue-style-loader","css-loader","sass-loader"]},
      // 
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options:{
              esModule: false//启用CommonJS模块语法,默认是es模块系统
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename:"main.css"}),
    new HtmlWebpackPlugin({
      title:"藏青安的博客",
      template:"./public/index.html" //指定编译模板
    }),
    // 请确保引入这个插件！,保证复制一份其它规则到 .vue文件中
    new VueLoaderPlugin()
  ],
}