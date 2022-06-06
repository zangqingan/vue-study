<template>
  <div>
    <div>hello {{name}}</div>
    <p>自己配置的vuecli</p>
    <hr>
    <p>下面是v-title组件</p>
    <v-title title="vue组件化"></v-title>
    <p>上面是v-title组件</p>
    <hr>
    <p>下面是v-button组件</p>
    <v-button @btnclick="fatherClick" :color="fatherColor">点击按钮改变样式</v-button>
    <p>上面是v-button组件</p>
    <hr>
    <h4>图片</h4>
    <p>
      <img src="./public/a.png" alt="索隆">
      <img src="./public/b.jpg" alt="风景">
    </p>
    <hr>
    <h3>由子组件随机增加大小,但是是由父组件改变的</h3>
    <counter :number="fatherNum"></counter>
  </div>
</template>
<script>
// 导入组件
import  vTitle from './src/assets/title.vue'
import  vButton from './src/assets/button.vue'
import  counter from './src/assets/counter.vue'
export default {
  data(){
    return{
      name:"vue.js",
      fatherNum:0,
      fatherColor:'#000'
    }
  },
  //注册组件
  components:{
    vTitle,
    vButton,
    counter
  },
  methods: {
    fatherClick(e){
        //修改按钮样式
        this.fatherColor = "#f60";
        console.log(e)
    },
    addRandom(num){
      this.fatherNum += num
    }
  },
  created() {
    //中央事件总线监听发射出来的add事件
    this.$bus.on('add',this.addRandom) 
  },
  // 记得销毁释放事件句柄
  beforeDestroy() {
    this.$bus.off('add',this.addRandom)
  },
}
</script>
<style scoped>
  div{
    color: #f60;
    font-size: 24px;
  }
</style>







