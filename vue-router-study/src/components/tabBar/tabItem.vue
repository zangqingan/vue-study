<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- slot有父组件传入 -->
        <div :class="{isactive}"><slot name="item"></slot></div>
        
    </div>
</template>

<script>

  export default {
    name:'tabItem',
    //外面传入path
    props:{
      path:{type:String}
    },
    data() {
      return {
        
      }
    },
    methods: {
      itemClick(){
        // console.log('itemclick')
        this.$router.replace(this.path)
      }
    },
    computed: {
      isactive(){
        //如果当前路由对象的path等于传进来的说明是正在点击的那个添加class
        return this.$route.path.indexOf(this.path) !== -1
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
  }  
.isactive{
  color: red;
}
</style>