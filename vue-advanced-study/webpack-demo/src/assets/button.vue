<template>
    <button v-on:click="handleClick" :style="styles"> 
      <slot></slot>
    </button>
</template>
<script>
export default {
  props:{
    color:{
      type:String,
      default:"#00cc66"
    }
  },
  computed:{
    styles(){
      return{
        background:this.color
      }
    }
  },
  methods: {
    handleClick(e){
      // 改变样式，我们不改通知父组件改
      this.$emit('btnclick',e)
    }
  },
}
</script>
<style scoped>
  button{
    border: 0;
    outline: none;
    color: #fff;
    padding: 4px 8px;
  }
  button:active{
    position: relative;
    top: 1px;
    left: 1px;
  }
</style>







