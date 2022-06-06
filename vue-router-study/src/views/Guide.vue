<template>
  <div class="lk">
    <h3>1. 导航守卫</h3>
    <p>
      导航表示路由正在发生变化,而守卫是vue提供的在路由发生变化时的一些功能函数。
      本质就是vue提供了一些函数,它们可以监听路由跳转(进入或离开某个路径)的过程,进而在跳转之前做一些操作。

      全局前置守卫,路由即将改变前触发
      router.beforeEach((to,from,next) => {
          每个守卫方法接收三个参数:
          to: Route: 即将要进入的目标 路由对象
          from: Route: 当前导航正要离开的路由
          next: Function: 一定要调用该方法来 resolve 这个钩子,释放进入管道中的下一个钩子。
              next(): 进行管道中的下一个钩子。如果全部钩子执行完了,则导航的状态就是 confirmed (确认的)。
              next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮),那么 URL 地址会重置到 from 路由对应的地址。
              next('/path') 或者 next({ path: '/' }): 跳转到指定的地址。当前的导航被中断,然后进行一个新的导航。
              next(error):如果传入 next 的参数是一个 Error 实例,则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
      })
      注意:一定要确保调用 next 方法,否则钩子就不会被 resolved,即不会往下执行。

      全局后置钩子:和守卫不同的是,这些钩子不会接受 next 函数也不会改变导航本身:
      router.afterEach((to, from) => {
        // ...
      })
    </p>
    <h3>2. 路由元信息</h3>
    <p>
       在定义routes的时候可以配置 meta 字段定义一些属性,如这个路由对应的组件页面是否需要认证,是否公有等信息。
       meta是一个对象:
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true ,isPublic:true}
        }
        就可以在守卫函数里使用了 to.meta.isPublic,to.meta.requiresAuth。
        在routes 配置中的每个路由对象为 一条路由记录,所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象 to ) 的 $route.matched 数组。
    </p>
    <h3>3. keep-alive</h3>
    <p>
      keep-alive也是一个vue内置组件,它的功能就是让它包含的组件保留状态,避免重新渲染。
      有两个属性:include="命名路由名" 只有匹配的组件才会被缓存.exclude="命名路由名"除了匹配的组件不被缓存,其它都缓存。
      而router-view也是一个组件,所以它如果被包含在keep-alive里就会缓存所有路径匹配到的视图组件。
     
    </p>
    <h3>4. 导航的整个流程</h3>
    <p>
      <pre>
        1.导航被触发,即this.$router.push或者修改url,只要路由地址改变了就会触发。
        2.在失活的组件(即正要离开的页面组件 from)中调用组件内的离开守卫 beforeRouteLeave()。
        3.调用全局的前置守卫beforeEach()
        4.如果是复用的组件调用beforeRouteUpdate()。
        5.调用路由配置里的路由独享的守卫 beforeEnter(),它在路由配置对象里配置,要记得next()释放控制权
        6.解析异步路由组件
        7.在将被激活的组件(即正准备进入的页面组件 to)调用beforeRouteEnter()。
        8.调用全局解析钩子beforeResolve()
        9.导航被确认
        10.确认后调用全局后置守卫 afterEach()
        11.触发DOM更新

      </pre>
    </p>
  </div>
</template>

<script>
export default {
  name: 'guide',
  data() { 
    return {

    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前,组件实例还没被创建
    console.log(`我是导航发生的第四步,我是组件内的beforeRouteEnter导航守卫。我已经进入${to.path}路由,但是此时组件实例还没被创建`)
    next()
  },
 }
</script>

<style scoped>
</style>