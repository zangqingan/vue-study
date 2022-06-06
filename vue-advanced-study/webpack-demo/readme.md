# 一、前端工程化概述 
随着前端领域的迅速发展，前端项目也变得越来越大。前端工程化应运而生，它主要解决以下问题：
--JavaScript、css代码的合并和压缩，
--css预处理：less、sass、stylus的编译，
--图标生成雪碧图(css sprite)，
--es6转es5，模块化等。
而这里学习的是前端工程化工具webpack，它的作用就是将我们写的各种格式文件(如vue、ts、less、sass、jpg等)通过特定的加载器(loader)编译并打包，最终统一生成为 .js、.css、.png等静态资源文件。
在开始学习之前，先复习一下commonjs规范和es6中的模块系统。它们统一的是：一个.js文件就是一个模块它拥有独立的作用域文件内定义的变量外部是无法获取的。
es6中export 和 import 就是用来导出和导入模块的，记住一点export导出的模块，用户必须预先知道导出的名称是什么才能使用import解构导入。而如果不想知道导出的叫什么就要用export default 来输出默认的模块，这样在导入时可以自定义命名。

# 二、webpack基础配置
1.先初始化配置：npm init -y，生成包管理文件。
2.本地安装 webpack：npm install webpack --save-dev。安装时我的版本： "webpack": "^5.64.0"
3.本地安装热重载 webpack-dev-server:npm install webpack-dev-server --save-dev。它是一个小型的Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的静态资源文件提供Web服务、热更新、接口代理等。用来开启热加载。
4.本地安装webpack-cli：npm install --save-dev webpack-cli。安装了webpack脚手架就可以在命令行中调用webpack命令，跟vue脚手架类似安装了就可以使用vue命令。
5.创建webpack.config.js文件，并在包管理文件的scripts选项中添加 "build": "webpack --config webpack.config.js"，这样命令行就可以使用：npm run build命令也就基本具备了前端工程化需要的东西了。
我们总说webpack是一个编译打包工具，那到底要怎么用。事实上对于我们开发人员来说，webpack就是一个名为 webpack.config.js 的 .js配置文件。我们要做的就是在这个配置文件里配置我们需要的功能即可。

## 2.1 webpack.config.js配置选项
webpack.config.js配置文件中最重要的也是必选的两个选项是entry(入口)和output(出口)，入口用来告诉webpack从哪里开始寻找依赖并进行编译打包，出口文件则是用来配置指明编译打包后文件的名字和存储位置。有了这两个已经可以启动webpack项目了，打包输出的文件可以明显的看出已经不是我们写的代码了，其中夹杂了很多webpack自身的模块处理代码，不过我们并不需要理会，只需要知道这就是webpack的编译即可。
还有两个重要概念loaders(加载器)、plugins(插件)搞清楚这四个主要概念webpack也不过是一个js配置文件罢了。
### 2.1.1 加载器(Loaders)
我们知道在webpack的世界里，每一个文件都是一个模块，比如 .css、.js、.html、.jpg、.less、.vue等等。而loader(加载器/转换器) 就是用来对这些不同模块的源代码进行转换处理的工具。

加载处理css样式文件需要：style-loader 和 css-loader
安装：npm install --save-dev css-loader style-loader。
然后在webpack配置文件中的 module配置对象的rules里配置 webpack 对每个 .css文件处理都使用这两个loader。这个配置的意思是当webpack编译过程中遇到模块化语法导入或导出语句且导入导出的是后缀名为 
.css的文件时就先通过css-loader转换再通过style-loader转换然后再打包。
module: {
  rules: [
    { test: /\.css$/, use: ['style-loader','css-loader'] },
  ],
},

说明：在module对象的rules属性中可以指定一系列的loaders，每一个loader都是一个必须包含test和use属性的配置对象。use值可以是string或array，是array时编译顺序从后往前。
注意：loader是从右到左（或从下到上）地取值(evaluate)/执行(execute)
### 2.1.2 插件(plugins)
css通过loader加载转换后是通过js动态创建style标签来引入的，这时样式代码是编译在js文件里的。但是如果项目很大样式很多编译后都放js里就太占体积而且不会缓存。这时就需要webpack的插件选项了。
插件目的在于解决 loader 无法实现的其他事情。比如：提到的css问题就可以使用 extract-text-webpack-plugin 插件将各处的css提取出来并生成一个 main.css文件最终在入口html文件里通过link引入。不过这个包已经废弃现在使用：mini-css-extract-plugin。
安装：npm install --save-dev mini-css-extract-plugin

HtmlWebpackPlugin 插件简化了 HTML 文件的创建，作用是为你生成一个 HTML5 文件，在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。可以不配置也可工作默认生成dist/index.html，也可以传入一个配置对象指定配置。
安装：npm install --save-dev html-webpack-plugin
引入：const HtmlWebpackPlugin = require('html-webpack-plugin')
使用：plugins: [new HtmlWebpackPlugin({
  title: '我的网站', //html文件的title标签内容。
  filename: 'assets/admin.html' //自定义生成的html文件路径和名称
})],





