<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" tag="div">路由基础</router-link> 
      <router-link to="/home" tag="div">嵌套路由</router-link>
      <router-link :to="`/dong/${userId}`" tag="div">动态路由</router-link>
      <router-link to="/query" tag="div">查询字符串</router-link>
      <router-link to="/guide" tag="div">导航守卫</router-link>
    </div>
    <!-- 路由出口 -->
    <router-view/>
    <!-- <tab></tab> -->
  </div>
</template>
<script>
//导入tabbar
// import tab from '@/components/tabBar/tab.vue';
export default {
  
  data(){
    return{
      // 这里的userId实际应该是向后端请求数据返回的
      userId:'wanggeng'
    }
  },
  // components:{
  //   tab
  // },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
}

#nav {
  display: flex;
  justify-content: space-around;
  margin: 0 auto ;
  width: 1000px;
  background: #42b983;
  height: 40px;
}

#nav div {
  font-weight: bold;
  color: black;
  width: 100px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  
}
#nav div:hover {
  color: black;
  background: #fff
  
}

</style>
