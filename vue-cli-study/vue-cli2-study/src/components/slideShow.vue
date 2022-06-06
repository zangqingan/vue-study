<template>
  <div class="slide-show">
    <div class="slide-img" @mouseover="clearInv" @mouseout="runInv">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img :src="slides[nowIndex].src" v-if="isShow">
        </transition>
        <transition name="slide-trans-old">
          <img :src="slides[nowIndex].src" v-if="!isShow">
        </transition>
       
      </a>
      <h2>{{slides[nowIndex].title}}</h2>
      <ul class="slide-pages">
        <li @click="goto(preIndex)">&lt;</li>
        <li v-for="(item,index) in slides " :key="item.id" @click="goto(index)">
          <a :class="{on:index === nowIndex}">{{index + 1}}</a>
     
        </li>
        <li @click="goto(nextIndex)">&gt;</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传过来的属性
  props:{
    slides:{
      type:Array,
      default:[]
    },
    inv:{
      type:Number,
      default:1000
    }
  },
  data () {
    return {
     nowIndex:0,
     isShow:true
    }
  },
  computed: {
    // 通过计算属性复用goto方法，既不用再写两个方法了
    // 点击前一页
    preIndex(){
      if(this.nowIndex === 0){
        return this.slides.length - 1
      }else{
        return this.nowIndex - 1
      }
    },
    // 点击后一页
    nextIndex(){
      if(this.nowIndex === this.slides.length - 1){
        return 0
      }else{
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    // goto方法绑定到页码点击事件中,实现点击页码跳转到对应页码的图片
    goto(index){
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10);
       
    },
    // 定时器轮播
    runInv(){
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
        // console.log(123)
      },this.inv)
    },
    clearInv(){
      clearInterval(this.invId)
    }
  },
  mounted() {
    this.runInv()
  },
 
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>

