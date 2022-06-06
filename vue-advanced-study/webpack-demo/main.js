// 导入vue框架
import  Vue from 'vue'
// 导入app.vue
import App  from './App.vue'
// 引入vue-bus插件并注册
import VueBus from './src/plugins/vue-bus'
Vue.use(VueBus)
// 导入vue-ajax插件并注册
import VueAjax from './src/plugins/vue-ajax'
Vue.use(VueAjax)
// 创建vue实例
new Vue({
  el:'#app',
  render: h => h(App)
})

