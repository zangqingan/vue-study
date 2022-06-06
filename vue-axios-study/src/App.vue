<template>
  <div id="app">
    <Axios/>
    <hr>
    <div>axios封装获取数据</div>
    <button @click="getList">点击获取数据</button>
  </div>
</template>

<script>
import Axios from '@/components/Axios.vue'
import {getListAPI} from '@/api/products.js';
export default {
  name: 'App',
  components: {
    Axios
  },
  methods:{
    getList(){
      getListAPI().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>
