<template>
  <div class="pas">
    <h3>1. 路由查询字符串</h3>
    <p>
      就是路由?后面的内容 ，?key=value&key=value,这一串字符串。可以使用 this.$route.query 获取到。
      query也是一个对象,每一对键值对是这个对象的一对属性名：属性值。
    </p>
    <div>
      <h4>我是路由查询字符串对象  {{$route.query}}</h4>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'query',
  data() { 
    return {

    }
  },
  // 组件内的守卫
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    const answer = window.confirm('你确定要离开query组件吗')
    if (answer) {
       console.log(`我是导航触发的第一步,组件内的导航守卫beforeRouteLeave,我即将离开${from.path}路由`)
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scoped>
</style>