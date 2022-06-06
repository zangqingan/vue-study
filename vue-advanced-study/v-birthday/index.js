const app = new Vue({
  el:'#app',
  data:{
    timeNow:(new Date()).getTime(),//获取当前距 1970 年 1 月 1 日之间的毫秒数
    timeBefore:847410471000
  }
})