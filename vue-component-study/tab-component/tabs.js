Vue.component('tabs',{
  template:`
    <div class="tabs">
      <div class="tabs-bar">
        <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)">{{item.label}}</div>
      </div>
      <div class="tabs-content">
        <slot></slot>
      </div>
    </div>`,
  props:{
    value:{
      type:[String,Number]
    }
  },
  data(){
    return{
      // 不能直接修改value，所以自己接收一份
      currentValue:this.value,
      navList:[]
    }
  },
  methods: {
    // 动态改变样式类
    tabCls(item){
      return[
        // 给当前选中的tab添加激活类
        'tabs-tab',{'tabs-tab-active':item.name === this.currentValue}
      ]
    },
    getTabs(){
      // 遍历所有子组件取name为pane的
      return this.$children.filter( item => {return item.$options.name === 'pane'})
    },
    updateNav(){
      this.navList = []
      this.getTabs().forEach((pane,index) => {
        this.navList.push({
          label:pane.label,
          name:pane.name || index
        })
        if(!pane.name) pane.name = index
        if(index === 0){
          if(!this.currentValue){
            this.currentValue = pane.name || index
          }
        }
      })
      //更新是把显示隐藏的状态也更新
      this.updateStatus()
    },
    updateStatus(){
      // 获取所有name为pane的子组件实例
      let tabs = this.getTabs()
      //显示当前选中tabs对应的pane，其它隐藏。
      tabs.forEach( tab => {
        return tab.show = tab.name === this.currentValue
      })
    },
    // 点击tab标题时触发，改变当前选中tab的索引，也就是pane组件的name属性。
    handleChange(index){
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      // input事件实现v-model
      this.$emit('input',name)
      this.$emit('on-click',name)
    }
  },
  watch:{
    value(val){
      this.currentValue = val
    },
    currentValue(){
      // 侦听当前tab状态，发生变化时更新pane状态
      this.updateStatus()
    }
  },


})