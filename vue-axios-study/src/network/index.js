import Vue from 'vue'
// 引入
import axios from 'axios'

// 常见一个实例对象
const http = axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:2000,
    withCredentials: true,//带凭证
    headers: {
        'Content-Type': 'application/json'
    },
})

//拦截器
// 请求(req)拦截器
http.interceptors.request.use( config => {
    // 如果本地存在token，写入请求头中
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token 
    }
    return config
},err => {    
    return Promise.reject(err)
})

//响应(res)拦截器
http.interceptors.response.use( res => {
    // 这里可以对响应数据做一些处理 ，不符合跳转页面或者其它操作。 
    return res

},err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        // 
        if(err.response.status === 401){
            // router.push('/login')
            window.location.href = '/login'
        }
    }
    return Promise.reject(err)
})



// 实际开发，用到拦截器时也在这里书写
export default http