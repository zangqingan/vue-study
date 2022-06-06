<template>
  <div class="packtool">
    <h3>1. webpack概述</h3>
    <p>
      webpack是一个js应用的静态模块打包工具,在使用webpack打包时,一般会将打包好的文件存放到一个叫dist文件夹中(它是发布的英文单词缩写)。
      工具就是要会用会配置即可。
      安装:npm install webpack@版本号 --save-dev
      配置文件:webpackconfig.js 当然新版本中在vue.config,js中配置。
      打包命令:webpack 要打包的文件路径 打包完成后文件存放的路径
      在实际开发中会使用 npm run build ,所以还需要在包管理文件的 'scripts'选项中再映射一次。
      'scripts':{
        "build":"webpack 要打包的文件路径 打包完成后文件存放的路径"
      }
      面试题:
        前端为何要进行构建和打包?
        module chunk bundle分别是什么意思,区别又是什么?
        loader和plugin的区别?
        webpack如何实现懒加载?
        webpack如何实现性能优化?
        babel-runtime和babel-polyfill的区别?
      <strong>常见webpack配置选项及含义</strong>
      拆分和merge(合并)配置--
      webpack.dev.js
      webpack.pro.js
      webpack.common.js
      const {smart} = require('webpack-merge')
      <pre>
        module.exports ={
          mode:'production/development',
          entry:'路径信息',  webpack打包的入口
          output:{
            path:'路径信息',一般是动态获取的 path.resolve(__dirname,'dist') 在当前配置文件的同级目录下新建一个dist文件夹存放。
            filename:'打包后的文件名'
          },
          devServer:{
            port:8080,
            progress:true,//显示打包的进度条
            open:true,//自动打开浏览器
            <!-- 设置代理 -->
            proxy:{
              //例如本地开启的服务是'http://localhost:8000',服务器是 'http://localhost:3000'
              '/api':'http://localhost:3000',
              //将本地的 '/api/xxx' 代理到 'http://localhost:3000/api/xxx',即'http://localhost:8000/api/xxx'代理到 'http://localhost:3000/api/xxx'
              '/api2':{
                  target:'http://localhost:3000',
                  pathRewrite:{
                    '/api2':''
                  }
              },//将本地的 '/api2/xxx' 代理到 'http://localhost:3000/xxx'
            }
          },
          modules:{
            rules:[
            //loader 转换某些类型的模块对其它类型的文件打包时就需要各种各样的loader
            //loader 的执行顺序是从后往前。
              {test:'规则',use:['loader','css-loader']}
            ]
          },
          plugin:[
            //插件,是对webpack本身的一些扩展。
          ]
        }
      </pre>
    </p>
    <h3>2. webpack高级特性</h3>
    <p>

    </p>
    <h3>3. webpack性能优化</h3>
    <p>

    </p>
  </div>
</template>
