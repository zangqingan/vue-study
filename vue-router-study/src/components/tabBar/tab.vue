<template>
  <div class="tab-bar">
    <tab-item v-slot:item path="/first">
      <img src="@/assets/logo.png" alt="">
      <div>首页</div>
    </tab-item>
    <tab-item v-slot:item path="/category">
      <img src="@/assets/logo.png" alt="">
      <div>分类</div>
    </tab-item>
    <tab-item v-slot:item path="/cart">
      <img src="@/assets/logo.png" alt="">
      <div>购物车</div>
    </tab-item>
    <tab-item v-slot:item path="/profile">
      <img src="@/assets/logo.png" alt="">
      <div>我的</div>
    </tab-item>
  </div>
</template>

<script>
import tabItem from './tabItem.vue'

  export default {
    name:'tab',
    data() {
      return {
        
      }
    },
    components:{
      tabItem
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .tab-bar{
    display: flex;
    justify-content: space-between;
    background-color: #f0f2f5;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px  rgba(100,100,100, .2)
  }
  .tab-bar img{
    width: 20px;
    height: 20px;
    margin-top: 2px;
  }
</style>
