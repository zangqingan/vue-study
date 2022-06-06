import Vue from 'vue'
// 第一步：导入Router对象，从vue-router插件中。
import Router from 'vue-router'
import IndexPage from '../pages/index'
// 第二步：使用Vue.use(插件对象)在Vue中注册插件，这时需要用到Vue所以又导入Vue即可。
Vue.use(Router)
// 第三部：先导出路由对象好在vue实例中挂载，Router是一个对象new 产生实例导出即可。
export default new Router({
  //routes选项中配置路径和组件的映射关系，因为是很多个路径所以是复数，所以是一个数组。
  //里面是一个个配置对象，一个配置对象就是一个路径和组件的对应关系
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
  ]
})
