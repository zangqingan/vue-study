<template>
    <div>
      {{number}}
      <button @click="handleAddRandom">随机增加</button>
    </div>
</template>
<script>
export default {
  props:{
    number:{
      type:Number
    }
  },
  methods: {
    handleAddRandom(){
      // 1-100随机数
      const num =  Math.floor(Math.random()*100+1)
      // 中央事件总线发射事件
      this.$bus.emit('add',num)

    }
  },
}
</script>
<style scoped>

</style>







