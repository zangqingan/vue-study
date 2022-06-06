Vue.component('pane',{
  name:'pane',
  template:`
    <div class="pane" v-show="show">
      <slot></slot>
    </div>`,
  props:{
    name:{
      type:String,
    },
    label:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      show:true
    }
  },
  methods: {
    childUpdateNav(){
      // 使用父链的方法直接访问父组件的方法
      this.$parent.updateNav()
    }
  },
  watch:{
    label(){
      this.childUpdateNav()
    }
  },
  mounted() {
    this.childUpdateNav()
  },


})