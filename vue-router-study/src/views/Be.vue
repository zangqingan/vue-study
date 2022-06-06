<template>
  <div class="base">
      <h3>1. 路由的概念</h3>
      <div>
        路由(routing):是一个网络工程的术语,它是指通过互联的网络把信息从源地址传输到目的地址的一种活动或者说技术。
        即本来是是网络工程里的一种传输信息的方式。
        它是通过路由表(映射表),来决定数据信息是怎么传递的。
        路由表:内网ip 一一对应着唯一的 电脑mac地址,当数据从公网传过来时,就会根据内网ip分发到指定的电脑上。
      </div>
      <h3>2. 路由在编程上的发展</h3>
      <div>
         <h4>后端渲染阶段:</h4>
         <div>
           在后端渲染好页面直接返回HTML文件给浏览器展示即可,这时的路由是后端路由:即每一个页面都有自己唯一对应的URL,
           用户在浏览器地址栏输入后,向服务器端发送HTTP请求,服务器会根据url自行匹配与之对应的唯一页面。
           后端路由:后端来处理url和页面的对应关系(就像路由表一样)。
           优点:有利于seo优化,
           缺点:结构样式逻辑不分离,不利于维护。
         </div>
         <h4>前后端分离阶段:</h4>
         <div>
           在ajax出现之后有了这种开发模式,此时后端只提供api接口返回数据,前端通过ajax获取数据,
           然后通过js将数据渲染到HTML页面上,这便是前端渲染。
           优点:责任清晰多端共享一套api。
         </div>
         <h4>单页面富应用阶段:</h4>
         <div>
           单页面富应用阶段(spa)主要特点是在前后端分离的基础上加上一层前端路由,也就是由前端来维护一套路由表(映射关系)。
           这时所有的页面整合到一个html页面中存放到静态资源服务器上,浏览器向它请求会得到全部资源,
           但是不是全部都加载渲染,而是在用户点击了哪一部分就渲染那一部分。
           这时点击的部分想要和渲染的那一部分资源对应起来就需要 前端路由。即
           前端路由:用户点击时会产生一个url(也就是网址)和资源中的那一部分唯一对应,
           如:url: /home 对应 home内容页面
           本质就是通过js代码来判断url和静态页面资源映射关系,而在vue中一个页面对应一个组件(.vue文件)。
           所以在vue中前端路由的改变其实是组件的改变。
           优点:前端路由改变时,页面不会刷新,因为它不是向后端请求资源的。
         </div>
      </div>
      <h3>3. 前端路由规则</h3>
      <p>
        前端路由的核心是url改变,但是页面不用刷新。
        实现方法:
        1. hash(哈希)这个也是vue-router的默认方式,
        URL的hash也就是锚点(#),在改变后是不会刷新页面的,但是会触发onhashchange事件
        其本质是改变 window.location.href 属性,所以虽然hash 出现在 URL 中,但不会被包含到 http 请求url中。
        也就是不会对后端发起请求,因此改变 hash 不会重新加载页面。

        2. HTML5的history模式,修改这个也不会刷新页面。
        需要在路由实例对象中声明: mode:'history' 。
        原理是利用 html5 history interface 中新增的 pushState() 和 replaceState() 方法。
        这两个方法会修改浏览器历史记录栈,而当它们执行修改时,就会改变了当前的 URL ,但浏览器不会立即向后端发送请求。
        而是在刷新页面时向后端发送http请求,这时如果后端没有对应的接口就会报错。
        history.pushState({data},'title','url'),
        history.replaceState({data},'title','url'),
        webpack会把每一个路由打包成一个js文件,请求到时才加载对应的js文件
      </p>
      <h4>4. vue-router基本使用</h4>
      <p>
        vue-router是vue官方提供的一个路由插件,它的目的就是实现前端路由。到vue3更新之后也更新了一个大版本v4.x,那个跟vue3一起学习。
        在vue中,路由是和组件一一对应的(路由表/映射关系),即路由设置的url和组件一一对应。路由url改变组件也就改变。
        将组件 (components) 映射到路由 (routes),然后告诉 Vue Router 在哪里渲染它们。
        安装:可以在创建vue项目时直接添加vue add router ,也可以使用:npm i vue-router 单独安装。
        在vue中使用,注意它是一个插件,在vue中插件必须使用Vue.use(plguin)注册。
        第一步:引入路由对象并注册
        第二步:创建路由实例,并配置路由表映射关系
        第三步:将路由实例挂载到Vue实例的router属性选项上,这样就可以在任何组件内通过 this.$router 访问当前路由实例对象。
        第四步:创建路由对应的组件通过vue提供的全局组件 router-link 和 router-view ,
        在路由发送变化时把对应的组件渲染到页面上。
      </p>
      <h4>5. router-link 组件</h4>
      <p>
        声明式改变路由使用 router-link 组件 它会被渲染成a标签,to属性就是点击时跳转到指定的路径中,与之对应的组件会在router-view出口处渲染。
        可以修改tag属性指定浏览器将router-link组件渲染成何种HTML元素,当 router-link 对应的路由匹配成功,将自动设置 class 属性值 .router-link-active
        可以通过 active-class 属性修改这个类名,也可以在生成路由实例对象时使用linkActiveClass:'className'。
      </p>
      <h4>6. router-view 组件</h4>
      <p>
        router-view 组件是vue提供的路由出口起到一个占位作用,即当路由匹配时对应的组件将组件中的内容全部渲染在router-view标签的位置上。
      </p>
      <h4>7. this.$router 和this.$route</h4>
      <p>
        this.$router 表示挂载在vue实例下的当前路由器实例对象,它是编程式改变路由类似window.location.href 。
        通过push()和replace()方法可以在组件中直接修改路由进而跳转到对应的组件中。
        本质是history的pushState() 和向 history 栈添加一个新的记录。
        replaceState() 方法它不会向 history 添加新记录,而是替换掉当前的 history 记录。
        它是通过Object.defineProperty(Vue.prototype,'$router',{}) ,绑定到vue实例中的。
        使用:
        // 字符串
        this.$router.push('home')
        // 对象
        this.$router.push({ path: 'home' })
        // 命名的路由
        this.$router.push({ name: 'user', params: { userId: '123' }})
        // 带查询参数,变成 /register?plan=private
        this.$router.push({ path: 'register', query: { plan: 'private' }})


        this.$route 表示当前激活的那个路由对象,它可以获取到当前路由对象的很多信息。
        如:this.$route.path 当前路由的具体路径信息
        如:this.$route.params ,一个键值对组成的对象,表示动态路由的参数。
        如:this.$route.query ,一个键值对组成的对象,表示url后面的查询字符串。
        如:this.$route.name 当前路由的名称。

      </p>
      <h4>8. 路由的懒加载</h4>
      <p>
        在映射路由关系时,传统是先引入路径对应的组件,这时在打包构建应用时,js打包会变得非常大。
        const home from '路径'
        {
          path:'/home',
          component:home
        }
        而如果把这些对应的组件分割成不同的代码块且在路由被访问时才加载就很高效了。
        它结合 Vue 的异步组件 和 Webpack 的代码分割功能 
        这也就是懒加载的意思:即访问路由时才加载对应的组件。
        使用箭头函数 component:() => import('组件的相对路径') ,这时懒加载会被打包成另一个 .js文件,在用户请求了才到服务器请求。
      </p>
  </div>
</template>

<script>
export default {
  name: 'be',
  data() { 
    return {

    }
  }
 }
</script>

<style  scoped>
  .base{
    font-size: 18px;
  }
</style>