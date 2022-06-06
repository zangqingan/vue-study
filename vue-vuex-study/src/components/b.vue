<template>
  <div class="hello">
    <h3>我是使用辅助函数mapState返回的计算属性vuex状态变量:{{ nickname +'-'+ gender +'-'+ age + '-' + money}}</h3>
    <h3>我是使用辅助函数mapGetter接收getters返回的值:{{ money_Us}}</h3>
    <h3>重命名getters: {{money_Us}}</h3>
    <p>使用辅助函数修改state的年龄状态:{{  age }}</p>
    <button @click="addAge({num:10})">点击修改</button>
     <p>使用辅助函数获取后端返回的数据: {{info.name}} --{{info.age}}</p>
  </div>
</template>

<script>
//使用辅助函数映射计算属性
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'b',
  data() {
    return {
      info:{}
    }
  },
  computed:{
    ...mapState({
      // nickname(state){//这里在解构出去之后和自定义计算属性一样的
      //   return state.user.nickname
      // },
      // es6写法
      nickname:state => state.user.nickname,
      gender:state => state.user.gender,
      age:state => state.user.age,
      money:state => state.user.money
    }),
    // ...mapGetters(['money_us'])
    // 重命名
    ...mapGetters({
      money_Us:'money_us'
    })

  },
  methods: {
    ...mapMutations(['addAge']),
    ...mapActions(['sendUserInfo'])
  },
  created() {
    var res = this.sendUserInfo()
    res.then(res => {
      this.info = res
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 4px 0 0;
}
</style>
