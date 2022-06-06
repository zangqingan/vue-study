<template>
  <div class="about">
    <router-link to="/">首页</router-link>
    <ul>
      <transition-group name="list" tag="p">
      <li v-for="(item,i) in subjectList" :key="item.id" style="position:relative">
        <div class="btn" @click="remove(i)">-</div>
        <div class="btn" v-if="i>0" style="right:100px" @click="up(i)">↑</div>
        <div class="btn" v-if="i<subjectList.length-1" style="right:200px" @click="down(i)">↓</div>
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
      </transition-group>
    </ul>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'shopcar',
  computed: {
    ...mapState({
      subjectList:state => state.subject.subjectList
    })
  },
  methods: {
    ...mapMutations('subject',['up','down','remove'])
  },
 
}
</script>
<style >

.btn{
  position: absolute;
  z-index: 99;
  right: 10px;
  padding: 10px 20px;
  background: fuchsia;
  font-size: 30px;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all .6s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 1s;
}
</style>