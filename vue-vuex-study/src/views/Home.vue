<template>
  <div class="home">
     <ul>
       <!-- item是一个subject对象 -->
      <li v-for="(item,i) in list" :key="item.id" style="position:relative">
        <div class="btn" @click="add(item)">+</div>
        <h3>{{i+1}}【{{item.type | fmtSubjectType}}】.{{item.title}}</h3>
        <fieldset v-if="[DAN_XUAN_TI,DUO_XUAN_TI].includes(item.type)">
          <legend>选项：</legend>
          <ul class="option" >
            <li v-for="(option,j) in item.options" :key="j">{{j | fmtOptionName}}. {{option.text}}</li>
          </ul>
        </fieldset>
         <fieldset >
          <legend>解析：</legend>
          <diV>{{item.desc}}</diV>
        </fieldset>
      </li>
    </ul>
  </div>
</template>

<script>
import {createNamespacedHelpers } from 'vuex'
let {mapMutations} = createNamespacedHelpers('subject')
export default {
  name: 'Home',
  data() {
    return {
      list:[]
    }
  },
  created() {
    var str = localStorage.getItem('subjectList')
    if(str) this.list = JSON.parse(str)
   
  },
  methods: {
    ...mapMutations(['add'])
  },
}
</script>
<style >
li{
  z-index: 10;
}
.btn{
  position: absolute;
  z-index: 99;
  right: 10px;
  padding: 10px 20px;
  background: fuchsia;
  font-size: 30px;
}
  
</style>