<template>
  <div class="hello">
    <!-- <h1>{{ $store.state.nickname }}</h1> -->
    <!-- 使用计算属性 -->
    <h3>我是使用自定义计算属性返回的vuex-state状态变量:{{nickname}}----{{gender}}----{{age}}----{{money}}</h3>
    <h3>我是使用自定义计算属性接收getters返回的值:{{ money_us }}</h3>
    <p>修改state的年龄状态:{{  age }}</p>
    <button @click="addAge">点击修改</button>
    <p>获取后端返回的数据: {{info.name}} --{{info.age}}</p>

  </div>
</template>

<script>
export default {
  name: 'a',
  data() {
    return {
      info:{}
    }
  },
  computed:{
    nickname(){
      return this.$store.state.user.nickname
    },
    gender(){
      return this.$store.state.user.gender
    },
    age(){
      return this.$store.state.user.age
    },
    money(){
      return this.$store.state.user.money
    },
    money_us(){
      return this.$store.getters.money_us
    }
  },
  methods: {
    //提交mutation
    addAge(){
      return this.$store.commit('addAge',{
        num:5
      })
    },
    //分发action
    sendUserInfo(){
       return this.$store.dispatch('sendUserInfo')
    },
    getUserInfo(){
      return this.$store.dispatch('getUserInfo')
    }
  },
  created() {
    var res =  this.sendUserInfo()
    res.then(res => {
        this.info = res
    })
    this.getUserInfo()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 4px 0 0;
}
</style>
