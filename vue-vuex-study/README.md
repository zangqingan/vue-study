# vue-vuex
vue状态管理器vuex的学习
## 1. vuex概述
vuex是vue官方提供的一个专门为vuejs应用程序开发的状态管理模式(状态管理器)，是一个插件(第三方库)。解决的问题跟中央事件总线(bus)类似的，就是用来实现任意组件间的通信。
它采用集中式存储管理vue应用的所有组件的状态，并以相应的规则保证组件的状态以一种可预测的方式发生改变。简单说：状态就是多个组件共享的变量,集中式存储就是vuex会把这些变量存储到一个store存储对象里，然后将这个对象放到顶层的vue实例对象中，这样多个组件就可以共享使用了。

状态管理即是多个组件共享的变量(data选项中的变量)的管理，
集中式存储就是统一放到vuex的Store对象（仓库对象）中。
一般自己做小型项目也用不上，所以知道如何使用就行。大型单页应用才使用。

vuex的使用：
安装：npm i vuex --save
使用:和vue-router一样，因为是插件所以肯定要注册Vue.use(Vuex)，在vue中插件都必须注册。
然后初始化:src目录下store文件夹里面创建一个.js文件存储vuex相关的代码,跟路由类似。(使用脚手架会自动生成)最终导出一个仓库配置对象store并赋值给vue实例的store选项。
这样vue应用中所有的实例都能通过 this.$store访问到这个仓库实例对象。
每一个 Vuex 应用的核心就是 store对象（仓库对象就是一个容器，用来存放vuejs应用中大部分的状态 (state)。通过new Vuex.Store({配置对象})创建仓库实例。
Vuex 和单纯的全局对象有以下两点不同：
    1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
    由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation。
    2.不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
创建实例对象后为了在 Vue 任意组件中都能通过 this.$store.property访问实例对象中存储的状态，需要将store实例挂载到vue全局实例对象上，和路由类似。
Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”
即把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
new Vue({
  el: '#app',
  //store: store,
  store//es6简写

})
这样在每一个组件都可以通过 this.$store 访问到vuex仓库对象实例。

## 2. vuex核心概念
vuex下有一个 Vuex.Store({}) 方法用来创建一个仓库对象，它就是用来存储vue应用的大部分的状态的地方。
Vuex.Store配置对象只要有以下五个，这也是vuex的五个核心概念
1.State
2.Getters
3.Mutations
4.Actions
5.Modules
### 2.1 State 单一状态树
在vuex中使用state选项存储vue组件的所有共享的状态，它是一个对象。
每个vue应用程序中只有一个store实例即只有一个存储状态的仓库，
注意：存储在 Vuex 中的数据和 Vue 实例中的 data 遵循相同的规则，且是响应式存储的。

如何在组件中获取state中的状态(只读)：
在组件中可以使用计算属性封装一层获取this.$store.state.状态名 即可获取到
computed: {
    count () {//计算属性自己定义
        return this.$store.state.count //这个count是state里的状态(只读变量)
        return this.$store.state.状态名 //获取state里的状态(只读变量)
    }
}
也可以使用vuex提供的 Vuex.mapState() 辅助函数帮助我们生成计算属性。
注意：这个函数返回的是一个对象
引入：import {mapState} from 'vuex'
当映射的计算属性的名称与 state 中的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed:mapState(['count'])
// 映射 this.count 为 store.state.count,

当需要获取多个状态时使用下面的方法
computed:{
    //自己的计算属性
    a(){},
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
        //这里的选项会被解构，以逗号分隔混入到外部计算属性中。
        //es5
        nickname(state){//state就是store实例对象中的state
            return state.user.nickname
        },
        // es6写法，
        nickname:state => state.nickname,//没有划分模块
        nickname:state => state.user.nickname,
        自定义计算属性名:state => state.模块名.状态名,
        
    })
}

### 2.2 Getters
从state 中已有的状态再派生出一些状态，有点像vue中的计算属性，可以认为它是store实例的计算属性。
注意：它是依赖于state对象中已有的状态派生出来的，也是一个对象。
它接收state对象作为第一个参数用来获取state已有的状态值，第二个参数可以是其它的getters。
定义：
getters:{
    money_us(state){
        return (state.money/7).toFixed(2)
    }
}
访问：和state类似，Getter 会暴露为 store.getters 对象，可以以this.$store.getters.属性名的形式访问这些值
同样也可以定义计算属性或者使用辅助函数 mapGetters 仅仅是将 store 中的 getter 映射到局部计算属性.
用法和state类似，不过会缓存。 
computed:{
    money_us(){
      return this.$store.getters.money_us
    }
    //自己的计算属性
    a(){},
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
        'money_us',
        'getters里的值',
    ])
    注意：如果想将一个 getter 属性另取一个名字，使用对象形式
    ...mapGetters({
        USM:'money_us',
        新值:'原值',
    })
}

### 2.3 Mutations
它是用来更新vuex中的状态的，即更改vuex中store里状态的唯一方法是显示的提交状态改变即提交mutation。
这样在使用devtool时可以跟踪mutation的改变，而异步任务是不好跟踪回调的执行顺序的所以异步放到actions。
类似于methods。每个 mutation 都有一个字符串的 事件类型 (type)相当于方法名 和 一个 回调函数 (handler)实际改变状态的地方。
用法：在mutations里定义改变状态的事件函数，
mutations: {
    addAge (state,payload) {
      // 变更状态
      state.count++
    },
    事件函数名(state,payload){

    }
}
接受 state对象 作为第一个参数会自动传入，
payload参数也是一个对象称为载荷，在提交mutation时传入。
在组件中不能使用 this.$store.mutations.事件函数名() 的方式提交改变。
而是要调用 this.$store.commit('事件函数名',payload) 方法提交mutation。
即：
methods: {
    //提交mutation
    addAge(){
        //普通方式提交
        return this.$store.commit('addAge',{
            num:5
        },
        //对象提交方式：
        return this.$store.commit({
            type:'addAge',
            payload
        })
    }),
    
},

注意：mutation 都是同步事务，不能书写异步任务。
使用辅助函数：
methods: {
    ...mapMutations(['addAge']),//将 this.addAge()方法 映射为 this.$store.commit('addAge')同名时这样写
    //重命名
    ...mapMutations({
        add:'addAge'//// 将 this.add() 映射为this.$store.commit('addAge')
    })
    //开启了命名空间，及一个参数就传入命名空间名。
    ...mapMutations('subject',['up','down','remove'])
},

### 2.4 Actions
Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更state状态。
    Action 可以包含任意异步操作，而mutation是同步操作。
定义：
actions:{
    async getUserInfo(context){
        //模仿向后端接口请求数据
        // const data = await axios.get('/user/userInfo')
        //假数据
        const data = {
            nickname: '王耿',
            gender:'男',
            age:25,
            money:5000
        }
        //但是这里是不能直接修改state的，把修改state的定义在mutations里在这里提交mutation就行。
        context.commit('changeInfo',data)//changeInfo在mutations中定义了
    }
}
在组件中通过 store.dispatch()方法触发,这个函数和commit函数类似,不过它的返回值是promise。
methods: {
    //分发action
    sendUserInfo(){//这里返回的是一个promise对象
        // 以载荷形式分发
       return this.$store.dispatch('sendUserInfo',{
           //传参
           payload
       }),
       //以对象形式
        return this.$store.dispatch({
            type:'sendUserInfo',
            payload
        })
    },
    
    getUserInfo(){
      return this.$store.dispatch('getUserInfo')
    }
}
它可以分发当前一起定义的不同actions。
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，所以可以解构 {state,getters,commit,acions} = context，但是注意他不是当前 store 实例本身
使用 mapActions 辅助函数
methods: {
    ...mapActions(['sendUserInfo']),
    //将 this.sendUserInfo() 映射为 this.$store.dispatch('sendUserInfo')
    //重命名
    ...mapActions({
      send: 'sendUserInfo' // 将 this.send() 映射为this.$store.dispatch('sendUserInfo')
    })
},
然后一般在vue实例创建时加载这些函数
created() {
    var res =  this.sendUserInfo()
    res.then(res => {
        this.info = res
    })
    this.getUserInfo()
},

### 2.5 Modules
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。
但是当应用变得非常复杂时，store 对象就有可能变得相当臃肿，这时可以将 store 分割成模块（module）。
每个模块拥有自己的 state、getter、mutation、action、甚至是嵌套子模块 module——从上至下进行同样方式的分割，最终会被合并到 store。
只是调用就有点麻烦了。
模块里没开启命名空间时：即namespaced: false
对于模块中的状态action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。即a模块可以修改b模块中的值
在组件中使用：this.$store.state.模块名.状态名获取
模块内的 mutation 和 getter，接收的第一个参数state是当前模块的局部状态对象。
模块内的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：

开启命名空间时：即namespaced: true
这时就变成了模块自己的私有属性了。
使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。
它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
import { createNamespacedHelpers } from 'vuex'
const {mapState,mapGetters,mapMutations,mapActions} = createNamespacedHelpers('模块命名空间名')


### 2.6 项目目录结构
Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：
应用层级的状态应该集中到单个 store 对象中。
提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
异步逻辑都应该封装到 action 里面。
只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。而使用脚手架时会自动在src目录下创建store文件夹，不然就自己创建。
过多时就划分模块抽离,按照模块名称分类即可。
store
    ├── index.js          # 组装模块并导出 store实例 的地方
    ├── getters.js        # 根级别的 getter
    ├── mutations.js      # 根级别的 mutation
    ├── actions.js        # 根级别的 action
    └── modules
        ├── cart.js       # 购物车子模块
        └── products.js   # 产品子模块