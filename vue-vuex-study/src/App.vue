<template>
  <div id="app">
    <aa></aa>
    <hr>
    <bb></bb>
    <hr>
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <ProductList/>
    <hr>
    <ShoppingCart/>


    <hr>
    <!-- 试题后台实战 -->
    <div class="shopcar">
      <router-link to="/shopcar">{{subjectCount}}</router-link>
    </div>
    <router-link to="addSubject">创建题目</router-link>
   <router-view></router-view>
  </div>
</template>

<script>
import {aa,bb} from '@/components'
import ProductList from '@/components/ProductList.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
// 导入辅助函数
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters('subject',['subjectCount'])
  },
  components: {
    aa,bb,ProductList, ShoppingCart
  },
  data() {
    return {
      
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 6px;
}
ul{
  list-style: none;
}
.shopcar{
  position: fixed;
  right: 0;
  top: 40%;
  padding: 20px;
  color: #fff;
  background: #000;
  font-size: 30px;
  z-index: 99;
}
</style>
