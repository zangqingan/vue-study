# vue-cli2脚手架的学习
2022.6.5复习,这个版本的脚手架已经废弃。但是可以复习一下。
安装:$ npm install -g vue-cli,之后在命令行工具输入vue命令可以查看该命令的相关消息。
创建项目: vue init template-name project-name
其中模板有6中:webpack、webpack-simple等,可以通过vue list 命令查看支持的模板列表。
启动项目:npm run dev,当然这个命令是可以在包管理文件package.json文件中配置的。

# 一、项目目录结构及含义
使用vue-cli2创建的项目目录结构如下:
├─build                 // 保存一些webpack的初始化配置,项目构建
│ ├─build.js            // 生产环境构建
│ ├─check-version.js    // 检查npm、node版本
│ ├─vue-loader.conf.js  // webpack loader配置
│ ├─webpack.base.conf.js// webpack基础配置
│ ├─webpack.dev.conf.js // 开发环境配置，构建本地开发服务器
│ ├─webpack.prod.conf.js// 生产环境的配置
│
├─config                // config文件夹保存一些项目初始化的配置
│ ├─dev.env.js          // 开发环境的配置
│ ├─index.js            // 项目一些配置变量
│ ├─prod.env.js         // 生产环境的配置
│
├─dist                  // 打包后的项目
├─node_modules          // 依赖包
│
├─src                   // 源码目录
│ ├─assets              // 静态文件目录
│ ├─components          // 组件文件
│ ├─router              // 路由
│ ├─App.vue             // 是项目入口文件
│ ├─main.js             // 是项目的核心文件，入口
├─static                // 静态资源目录 
├─.babelrc              // Babel的配置文件
├─.editorconfig         // 代码规范配置文件
├─.gitignore            // git忽略配置文件
├─.postcssrc.js         // postcss插件配置文件
├─index.html            // 页面入口文件
├─package-lock.json     // 项目包管控文件
├─package.json          // 项目配置
└─README.md             // 项目说明书

可以看到有非常多的配置文件,在config、build文件夹中进行项目的webpack、多环境和打包等配置。
这个版本里还是让开发者自己去定义配置。
文件的个个配置选项意思可以查看官方或者https://juejin.cn/post/6844903758091010062。
不过已经废弃了一般也用不到。



