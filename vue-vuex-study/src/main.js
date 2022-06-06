import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 假数据
// let arr = [
//   {
//     id:1000,
//     title:'1+1=_____',//题目名称
//     content:'',
//     options:['1','2','3','4'],//选项信息
//     answer:'A',//答案信息
//     type:1,//题目类型：1单选，2多选，3判断，0主观
//     userid:'1001',//谁创建的
//     desc:'xxxxxxx',//题目解析
//     createtime:'2020-04-16 12:15:22'

//   },
//   {
//     id:2000,
//     title:'下面哪个说法是正确的？',
//     content:'',
//     options:['js是一门编译','一天有二十四小时','地球是圆的','人可以永远不睡觉'],
//     answer:['B','C'],
//     type:2,
//     userid:'1002',
//     desc:'xxxxxxx',
//     createtime:'2020-04-17 12:15:22'
//   },
//   {
//     id:3000,
//     title:'1+1是否等于2？',
//     content:'',
//     options:null,
//     answer:0,
//     type:3,
//     userid:'1003',
//     desc:'xxxxxxx',
//     createtime:'2020-04-15 12:15:22'
//   },
//   {
//     id:4000,
//     title:'说一说你对前端优化的理解？',
//     content:'对当前前端开发有何看法，以及如何优化？',
//     options:null,
//     answer:'null',
//     type:0,
//     userid:'1004',
//     desc:'xxxxxxx',
//     createtime:'2020-04-19 12:15:22'
//   }
// ]
// // 存到localStorage
// localStorage.setItem('subjectList',JSON.stringify(arr))

// mixin
Vue.mixin({
  data() {
    return {
      DAN_XUAN_TI:1,
      DUO_XUAN_TI:2,
      PAN_DUAN_TI:3,
      ZHU_GUAN_TI:0,
    }
  },
})
Vue.filter("fmtOptionName",(val) => {return 'ABCDEFG'[val]})
Vue.filter("fmtSubjectType",(val) => { return ['主观题','单选题','多选题','判断题'][val]})
// 购物车的过滤器
const digitsRE = /(\d{3})(?=\d)/g
function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}
Vue.filter('currency', currency)
//导入vuex仓库
import store from './store'
// 路由
import router from './router'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
