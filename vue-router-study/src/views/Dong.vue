<template>
  <div class="about">
    <h3>1. 动态路由</h3>
    <p>
      当需要把某种模式匹配到的所有路由,全都映射到同一个组件。例如,我们有一个 User 组件,对于所有 ID 各不相同的用户,都要使用这个组件来渲染。
      那么,这时就可以使用动态路由来实现,它是在路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果。
      动态路径参数以冒号开头后面跟参数名。
      如:上面的user组件
      {
        path:'/user/:id',
        component:User
      }
      路径中的id是参数名随意取不过尽量语义化,
      router-link :to="`/user${userId}`" ,这样userId就可以在组件中的data选项中获取它是一个变量
      如果获取到的是lisi,则路径就是 '/user/lisi'
      如果获取到的是zhangsan,则路径就是 '/user/zhangsan'
      注意:当匹配到一个路由时,参数值会被设置到 this.$route.params中,params 是一个对象。
      属性名是动态参数名,属性值是实际匹配的路径值。
      可以在一个路由中设置多段“路径参数”,对应的值都会设置到 $route.params 中。
      <pre>
        模式 	                            匹配路径 	            $route.params
        /user/:username 	              /user/evan 	          { username: 'evan' }
        /user/:username/post/:post_id 	/user/evan/post/123 	{ username: 'evan', post_id: '123' }
      </pre>
      注意:使用动态路由组件实例会被复用,同时组件的生命周期钩子不会再被调用。
      想对路由参数的变化作出响应的话使用导航守卫 beforeRouteUpdate。
      路由优先级:谁先定义的,谁的优先级就最高。
    </p>
    <h3>2. 命名路由</h3>
    <p>
      可以通过一个名称来标识一个路由跟命名组件类似,在 routes 配置中给某个路由设置名称添加一个name属性即可。
       {
          path: '/user/:userId',
          name: 'user',
          component: User
        }
      这时无论是使用声明式还是编程式改变路由都要传入一个对象。
      router-link :to="{ name: 'home'}">home/router-link
      等价于
      this.$router.push({ name: 'home')
    </p>
    <h3>3. 路由重定向</h3>
    <p>
      重定向也是通过 routes 配置来完成,
      { 
        path: '/a', 
        redirect: '/b'
      }
      即当用户访问 /a时,URL 将会被替换成 /b,然后匹配路由为 /b,然后渲染与/b对应的组件。
    </p>
    <h3>4. 路由别名</h3>
    <p>
      路由的别名就是:如果/a 的别名是 /b,则当用户访问 /b 时,URL 会保持为 /b不变,
      但是路由匹配则为 /a,渲染的是/a对应的组件,就像用户访问 /a 一样。
       { 
         path: '/a', 
         component: A, 
         alias: '/b' 
       }
       这时访问/a 或者/b 是一样的,都会匹配组件A。
    </p>
    <h4>5. 路由动态参数解耦</h4>
    <p>
      也是在配置路由表时添加一个属性,这样就可以在组件中使用props选项接收。
      { 
        path: '/user/:id', 
        component: User, 
        props: true 
      }

    </p>
    <div>
      <h4>我是动态路由参数对象:{{this.$route.params}}</h4>
      <h4>我是动态路由参数的值:{{this.$route.params.id}}</h4>
      <h4>我是动态路由参数解耦的值:{{id}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dong',
  props: ['id'],
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
</style>