export default  {
    //user模块
    // true开启命名空间
    // namespaced: true,
    state:{//存储状态的地方,类似data
        nickname:'',
        gender:'',
        age:0,
        money:0
    },
    getters:{//store的计算属性，类似computed
        money_us(state ){
            return (state.money/7).toFixed(2)
        }
    },
    mutations:{//修改state的地方，类似methods
        //this.$store.commit('mutationName')
        addAge(state,payload){
            state.age  += payload.num
        },
        //一开始时请求后端拿到初始化数据
        //修改state
        changeInfo(state,info){
            state.nickname = info.nickname
            state.gender = info.gender
            state.age = info.age
            state.money = info.money

        }
    },
    actions:{
        //类似于mutations不过异步操作在这里写，且提交的是mutation
        //比如向后端请求用户信息
        sendUserInfo(){
            //这里提交mutation
            return {name:'zhangsan',age:25}
        },
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
            //这里context可以解构
            // commit('changeInfo',data)
            context.commit('changeInfo',data)
        }
    }
}