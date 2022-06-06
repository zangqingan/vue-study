import Vue from 'vue'
import App from './App.vue'

//引入axios实例
import http from './network'
// 挂载到vue原型对象上
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
