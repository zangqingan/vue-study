import Vue from 'vue'
export default {
    namespaced:true,
    state:{
        subjectList:[]
    },
    getters:{
        subjectCount:state => state.subjectList.length
    },
    mutations:{
        add(state,payload){  
            //重复加入判断已经存在就不加入
            if(state.subjectList.some(item => {
                return item.id === payload.id
            })){
                return false
            }
            //把题目放到subjectList中
            state.subjectList.push(payload)
        },
        up(state,i){
            let temp = state.subjectList[i]
            Vue.set(state.subjectList,i,state.subjectList[i-1])
            Vue.set(state.subjectList,i-1,temp)
        },
        down(state,i){
            let temp = state.subjectList[i]
            Vue.set(state.subjectList,i,state.subjectList[i+1])
            Vue.set(state.subjectList,i+1,temp)
        },
        remove(state,i){
           state.subjectList.splice(i,1)
        }
    }
}