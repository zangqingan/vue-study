# vue-cli
vue-cli的学习
# 一、概述
Vue.js 开发的标准工具Vue CLI,也就脚手架,因为它能帮助我们快速创建vue项目结构。
目前是有两个大版本的变化了,vue-cli2,和vue-cli3。而且到了vue3构建工具又变成了vite。
工具嘛学习使用就行,不会就看看文档。
这个项目是vue-cli3版本创建的项目相对vue-cli2版本是有所不同的，主要包括安装方式、创建项目命令、项目目录结构、项目相关配置的设置等不同。
如果想同时使用两个版本的脚手架工具需要安装一个桥接工具
npm install -g @vue/cli-init
这样vue init 的运行效果将会跟 vue-cli@2.x 相同
vue init webpack my-project
# 二、Vue CLI3版本
安装:npm install -g @vue/cli。
创建项目:vue create hello-world
运行项目:npm run serve
# 三、项目目录结构
3.0项目结构比2.0要简洁，缺少了build和confilg文件,而是自行创建与package.json同级的 vue.config.js 文件，进行项目相关的配置。
│projectName
├─node_modules ,npm安装的包存放位置
├─public ,静态文件,模板文件index.html,ico等静态资源存放的位置
│ ├─index.html          // 页面入口文件
├─src ,开发写代码的地方
│ ├─api ,自己创建,网络请求相关
│ ├─config,自己创建,环境变量等全家配置相关
│ ├─directive,自己创建,自定义vue指令相关
│ ├─mock,自己创建,请求接口模拟,使用mockjs
│ ├─lib,自己创建,工具类函数封装相关
│ ├─assets ,组件相关的静态资源存放位置如css,图片等
│ ├─components ,小一点可复用组件文件存放的位置
│ ├─router ,路由存放位置
│ ├─store ,vuex存放位置
│   ├─state.js 
│   ├─getter.js 
│   ├─mutations.js 
│   ├─actions.js 
│   ├─module
│     ├─user.js
│     ├─product.js
│ ├─view ,大一点的页面组件存放的位置
│ ├─App.vue ,vue实例初始化位置
│ ├─main.js ,项目的入口文件
├─.gitignore ,Git仓库忽略的文件配置
├─.babelconfig.js ,es6代码转换工具babel的配置文件
├─.editconfig ,编辑器的代码编码规范的配置文件
├─vue.config.js ,vue的配置文件,cli2中webpack,环境变量等配置都放到这个文件中
├─pacjage.json ,包管理文件
├─readme.md ,项目的纪录描述文档

# 四、vue.config.js 基本配置选项
也是导出一个配置对象,通过一个全局的配置对象实现对很多东西的配置,最终是vue-cli帮我们处理。
浏览器兼容问题、HTML和静态资源、css样式问题、webpack配置问题、模式和环境变量等都可以设置。
具体可查看官方网址:https://cli.vuejs.org/zh/config/
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 /my-app/`
  // 基本路径 baseURL已经过时
  publicPath: './',
  
	// 打包项目时构建的文件目录，用法与webpack本身的output.path一致
  outputDir: 'dist', 
  
  // 静态资源目录 (js, css, img, fonts)
  assetsDir: 'assets',
  
  // eslint-loader 是否在保存的时候检查，编译不规范时，设为true在命令行中警告，若设为error则不仅警告，并且编译失败
  lintOnSave: true,
  
  // 调整内部的 webpack 配置。查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  
  // vue-loader 配置项 https://vue-loader.vuejs.org/en/options.html
   vueLoader: {},
  
  // 生产环境是否生成 sourceMap 文件，默认true，若不需要生产环境的sourceMap，可以设置为false，加速生产环境的构建
  productionSourceMap: true,
  
  // css相关配置
  css: {
   // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用style方式内联至html文件中
   extract: true,
   // 是否在构建样式地图，false将提高构建速度
   sourceMap: false,
   // css预设器配置项
   loaderOptions: {},
   // 启用 CSS modules for all css / pre-processor files.
   // 这个选项不会影响 *.vue` 文件
   modules: false
  },
  
  // 在生产环境下为 Babel 和 TypeScript 使用 thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  
  // 是否启用dll See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  dll: false,
  
  // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  
  // webpack-dev-server 相关配置
  devServer: {
   open: process.platform === 'darwin',
   host: '0.0.0.0',//如果是真机测试，就使用这个IP
   port: 1234,
   https: false,
   hotOnly: false,
   proxy: null, // 设置代理
   // proxy: {
   //     '/api': {
   //         target: 'url',
   //         ws: true,
   //         changOrigin: true
   //     }
   // },
   before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
   // ...
  }
 }

# 五、vuecli2和vuecli3的联系和区别
<p>
  联系:vuecli3在整体的结构上继承自vuecli2。
  区别:vuecli3更加的精简,和webpack等相关的配置也由脚手架帮忙配置好了,如果还需配置需要自己创建vue.config.js文件在里面书写配置。
  <strong>vue实例的区别</strong>
  <pre>
    1.vuecli2 runtime-compiler模式          2.vuecli2 runtime-only模式         3.vuecli3 模式
    new Vue({                               new Vue({                          new Vue({
      el:'#app',                              el:'#app',
      template:'&lt;App&gt;',                 render:h =>h(App)                  render:h =>(App)
      compoments:{
        App
      }
    })                                      })                                 }).$mount('#app')
  </pre>
  在vue程序运行过程:
    1.当有template传入时,vm.options.template 会将其保存并解析为一颗语法抽象树ast(abstract syntax tree)
    2. vm.options.render()渲染函数会将这个ast语法抽象树编译(compile) 渲染成vdom(虚拟dom)
    3. vdom最终渲染成页面看到的真实dom
  所以上面三个的过程是:
  1 template → ast → render → vdom → dom ,使用template开发时使用这个模式
  2 render → vdom → dom ,使用 .vue 文件格式开发时使用,性能更高,代码量更少。
  3 render → vdom → dom ,使用 .vue 文件格式开发时使用,性能更高,代码量更少。
  注意:3和2的区别在于有没有显性声明el挂载点,3是手动使用$mount()函数挂载,其实2本质也是使用这个函数挂载的,
  不过是vue在内部帮我们做了。
  当el和template都存在时,template会完全覆盖el挂载点里的内容。

  关于render()渲染函数,它是vue内部提供的一个生成元素的函数,最终生成的东西会替换掉挂载点。
  当传入的是一个vue组件对象时,直接渲染,因为vue中的组件是由插件vue-template-compiler处理好的。
  <pre>
    render:function(createElement){
      createElement('标签名',{标签属性},['标签内容'])
    }
  </pre>
</p>