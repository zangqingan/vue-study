// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

// 第三部：然后引入路由实例，后面是个目录会自动寻找里面的index.js。
import router from './router'

Vue.config.productionTip = false
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  //第三步：最后在Vue实例中挂载路由实例，router:router => es6 router
  router,
  components: { App },
  template: '<App/>'
})
