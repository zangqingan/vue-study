<template>
  <div class="about">
    <div>
      标题：
      <input type="text" v-model="subject.title">
    </div>
    <div>
      描述：
      <textarea v-model="subject.desc"></textarea>
    </div>
    <div>
      类型：
      <label for="dan">
        <input type="radio" id="dan" :value="DAN_XUAN_TI" v-model="subject.type">单选题
      </label>
      <label for="duo"> 
        <input type="radio" id="duo" :value="DUO_XUAN_TI" v-model="subject.type">多选题
      </label>
      <label for="pan"> 
        <input type="radio" id="pan" :value="PAN_DUAN_TI" v-model="subject.type">判断题
      </label>
      <label for="zhu">
        <input type="radio" id="zhu" :value="ZHU_GUAN_TI" v-model="subject.type">主观题
      </label>
    </div>
    <div>
      答案：
      <div v-if="subject.type === DAN_XUAN_TI">
        <label :for="'a'+i" v-for="(item,i) in subject.options" :key="item.id">
          <input type="radio" id="A1" :value="getOptionName(i)" v-model="subject.answer">{{i |fmtOptionName}}
        </label>
      </div>
      <div v-if="subject.type === DUO_XUAN_TI">
          <label :for="'a'+i" v-for="(item,i) in subject.options" :key="item.id">
          <input type="checkbox" id="A1" :value="getOptionName(i)" v-model="subject.answer">{{i |fmtOptionName}}
        </label>
      </div>
      <div v-if="subject.type === PAN_DUAN_TI"> 
         <label for="A1">
          <input type="radio" id="A1" value="1" v-model="subject.answer">√
        </label>
        <label for="B1"> 
          <input type="radio" id="B1" value="0" v-model="subject.answer">×
        </label>
      </div>
      <div v-if="subject.type === ZHU_GUAN_TI"> 
        <textarea v-model="subject.answer"></textarea>
      </div>
    </div>
    <div v-if="[DAN_XUAN_TI,DUO_XUAN_TI].includes(subject.type)">
      选项：
      <div>
        <ul class="option" >
            <li v-for="(item,i) in subject.options" :key="item.id">{{i | fmtOptionName}}
              <input @input="setText($event,i)"/>
              <button @click="remove(i)">删除</button>
            </li>
        </ul>
        <button @click="subject.options.push({id:subject.options.length+1,text:''})">添加选项</button>
      </div>
    </div>
    <hr>
    <button @click="save">保存</button>
  </div>
</template>
<script>
export default {
  name: 'addSubject',
  data() {
    return {
      subject:{
        id:1000,
        title:'',//题目名称
        content:'',
        options:[
          {
            id:123,
            text:''
          },
          {
            id:12232,
            text:''
          },
          {
            id:123433,
            text:''
          },
          {
            id:1234,
            text:''
          }
        ],//选项信息
        answer:'',//答案信息
        type:1,//题目类型：1单选，2多选，3判断，0主观
        userid:'1001',//谁创建的
        desc:'',//题目解析
        createtime:'2020-04-16 12:15:22',
      }
    }
  },
  watch: {
    ['subject.type'](val){
      //选择前都清空原有状态
      if(val === this.DUO_XUAN_TI){
        this.subject.answer = []
      }else{
        this.subject.answer =''
      }
    }
  },
  methods: {
    save(){
      // console.log(this.subject)
      // 存到数组里将数组暂时存放到localStorage中，实际应该是发送给后端
      let arr = []
      var str = localStorage.getItem('subjectList')
      if(str) arr = JSON.parse(str)
      this.subject.id = arr.length + 1
      arr.push(this.subject)
      localStorage.setItem('subjectList',JSON.stringify(arr))
      this.$router.push('/')
    },
    setText(e,i){
      this.subject.options[i].text = e.target.value
      this.$set(this.subject.options,i,this.subject.options[i])
    },
    remove(i){
      this.subject.options.splice(i,1)
    },
    getOptionName(i){
      return 'ABCDEFG'[i]
    }
  },
 
}
</script>
<style >
.about{
  text-align: left;
  margin-left:50px ;
  /* margin-top: 50px; */
}
.option li{
  padding: 5px;
}
</style>