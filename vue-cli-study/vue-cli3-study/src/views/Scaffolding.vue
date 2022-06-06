<template>
  <div class="scaffolding">
    <h3>1. vue-cli脚手架概述</h3>
    <p>
      vue-cli脚手架(cli == commond-line-interface 命令行界面),它是vue官方提供的一个用来快速搭建vue开发环境,
      以及对应的webpack配置的工具,即它是一个用来快速生成vue项目目录结构的工具。
      本质上也是一个库,其它各种框架也有自己的脚手架工具。
      安装:
        <pre>
          npm install vue-cli -g   全局安装vue-cli2 第二版本
          npm install @vue/cli -g  全局安装vue-cli3 第三版本
          如果想要在vuecli3中也可以使用旧版的命令需要安装一个桥接工具
          npm install @vue/cli-init -g
          安装之后可以查看版本
          vue --version或者vue -V(大写的V)
        </pre><br>
      工具知道如何使用,懂一点配置就好。
    </p>
    <h3>2. vue-cli2的学习</h3>
    <p>
      <pre>
        1.初始化项目:vue init 模板类型 项目存放文件夹的名字。
        注意:模板类型有6种,主要都是webpack
        即:$vue init webpack projectName

        2.初始化的过程,使用回车选择
        ? Project name(projectName),确认项目的名字是不是要创建的那个
        ? Project description(...),项目的描述信息
        ? Author ... ,项目的作者
        ? install vue-router?(Y/N),是否安装vue-router
        ? use Eslint to lint your code?(Y/N),是否使用代码检测工具Eslint管理代码
        ? Pick an Eslint preset(use arrow keys),使用哪一种风格的Eslint规范,有标准的,有谷歌的,使用上下箭头选择。
        ? Set up Unit tests ?(Y/N),是否使用单元测试。
        ? Set up e2e tests with Nightwatch?(Y/N),是否使用end to end(端到端)测试。
        ? should we run npm install for you after the project has been created?(use arrow keys),使用什么包工具来管理创建的项目,有npm,yarn等。

      </pre>
      <strong>vue-cli2项目目录结构</strong>
      <pre>
        projectName
          -build ,都是一个webpack的配置文件
            -webpack.base.config.js
            -webpack.dev.config.js
            -webpack.prod.config.js
          -config ,主要是环境变量的相关配置
            -dev.env.js
            -prod.env.js
            -index.js
          -node_modules ,npm安装的包存放位置
          -static ,静态文件存放的位置
          -src ,开发写代码的地方
            -assets ,组件相关的静态资源存放位置如css,图片等
            -components ,小一点可复用组件文件存放的位置
            -view , 大一点的页面组件存放的位置
          -index.html , 模板文件
          -.gitignore ,Git仓库忽略的文件配置
          -.babelrc ,es6代码转换工具babel的配置文件
          -.editconfig ,代码编码规范的配置文件
          -pacjage.json ,包管理文件
          -readme.md ,项目的纪录描述文档
      </pre>
    </p>
    <h3>3. vue-cli3的学习</h3>
    <p>
      脚手架的更新频率是很快的,如果有出入取官方查看即可。
      vue-cli3之后移除了build,config,static等目录,提供了vue ui 命令用来可视化创建vue项目。
      新增public文件夹,cli的index.html模板文件就放到了这里。
      <pre>
        1.初始化项目:$vue create projectName
        2.初始化过程,在输入vue create projectName后进入初始化页面。
        ? Please pick a preset:(use arrow keys) ,使用上下箭头选择一中初始化项目的配置
          >default(babel,eslint) ,默认选择只有babel,eslint两个插件,选择这个会直接开始生成vue项目。
           Manually select features ,手动选择添加更多的插件
           ? check the features needed for your project ,按空格选择,选择会在()里加入*
           (*) Babel
           ( ) Typescript ,是否支持ts
           ( ) Progressive web app(pwa) support ,先进的web app
           ( ) Router ,路由
           ( ) Vuex ,vue状态管理器
           ( ) css Pre-processors ,css预处理
           (*) Linter/Rormatter Eslint
           ( ) Unit Testing
           ( ) E2E Testing
           ? where do you prefer placing config for Babel,Postcss,Eslint,etc.?(use arrow keys)
             >In dedicated config files ,在单独的配置文件,像vue-cli中的 .babelrc这些文件
              In package.json 直接在包管理文件内配置
           ? Save this as a preset for future projects?(Y/N) ,是否保存当前选择的选项作为一个配置,
             >yes
           ? save preset as :presetName ,给这个配置命名
           ? Pick the package manager to use when installing dependencies ,选择这个项目的包管理工具
             >use Yarn
              use npm
      </pre>
       <strong>vue-cli3项目目录结构(包括自己添加的)</strong>
      <pre>
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
      </pre>
    </p>
    <h3>4. vuecli2和vuecli3的联系和区别</h3>
    <p>
      联系:vuecli3在整体的结构上继承自vuecli2。
      区别:vuecli3更加的精简,和webpack等相关的配置也由脚手架帮忙配置好了,如果还需配置需要自己创建vue.config.js文件在里面书写配置。
      <strong>vue实例的区别</strong>
      <pre>
        1.vuecli2 runtime-compiler模式          2.vuecli2 runtime-only模式            3.vuecli3 模式
        new Vue({                               new Vue({                             new Vue({
          el:'#app',                              el:'#app',
          template:'&lt;App&gt;',                 render:h =>h(App)                     render:h =>h(App)
          compoments:{
            App
          }
        })                                      })                                    }).$mount('#app')
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
  </div>
</template>
