# vue-axios
axios的学习

## 1.axios概述
Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
特点：
    从浏览器中创建 XMLHttpRequests
    从 node.js 创建 http 请求
    支持 Promise API
    拦截请求和响应
    转换请求数据和响应数据
    取消请求
    自动转换 JSON 数据
    客户端支持防御 XSRF
安装： npm install axios

## 2.基本使用
在安装之后，一般像路由和状态管理器一样单独建立一个文件夹network、或者api专门用来存放发送http网络请求相关的代码。
一般是创建一个新的axios实例对象并导出
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
export default http
第二步:为了不用每次都在vue组件中引入这个实例一般会将它挂载到vue原型对象上的某个属性上如Vue.prototype.$http = http，这样每个组件都可以通过 this.$http 访问到这个axios实例对象，进而使用相关的实例方法发起网络请求。
使用语法1:axios(config).then(),传入一个配置对象,里面的选项描述请求的信息。
axios({
    //配置选项
}).then()
使用语法2:axios.method('url',config).then() method 就是HTTP请求的方法小写,常见五种。
注意:可以定义一个变量来接收它们的返回值是一个promise,所以可以使用then()方法。
也可以直接在后面使用then()方法，then方法接收一个响应完成函数可以获得如下内容
.then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
});
配置对象的选项是一样的。
<h4>1. GET方法</h4>
<pre>
方法一:
axios({
    url:'/api',         
    method:'get',
    params:{
    //拼接参数数据
    id:2
    },
    data:{
    请求体数据
    }
}).then(res => {
console.log(res)
})
方法二:
axios.get('/api',{
params:{
    id:2
}
}).then(res => {
console.log(res)
})
</pre>
<h4>2. Post方法</h4>
<pre>
方法一:
axios({
    url:'/api',
    method:'post',
    data:data //这个data是前端要传给后端的数据
}).then(res => {
console.log(res)
})
方法二:
axios.post('/api',data,{config}).then(res => {
console.log(res)
})
</pre>
<h4>3. Put方法</h4>
<pre>
方法一:
axios({
    url:'/api',
    method:'put',
    data:data //这个data是前端要传给后端的数据
}).then(res => {
console.log(res)
})
方法二:
axios.put('/api',data,{config}).then(res => {
console.log(res)
})
</pre>
<h4>4. Patch方法</h4>
<pre>
方法一:
axios({
    url:'/api',
    method:'patch',
    data:data //这个data是前端要传给后端的数据
}).then(res => {
console.log(res)
})
方法二:
axios.patch('/api',data,{config}).then(res => {
console.log(res)
})
</pre>
<h4>5. Delete方法</h4>
<pre>
方法一:
axios({
    url:'/api',
    method:'delete',
}).then(res => {
console.log(res)
})
方法二:
axios.delete('/api',data,{config}).then(res => {
console.log(res)
})
</pre>

## 3. axios实例对象配置
在axios中有三种配置: axios全局配置,axios实例配置,axios请求配置。
优先级:请求>实例>全局,即优先级高的会覆盖优先级低的。

axios全局配置:  在引入后可以直接使用axios其实就是一个实例,不过一般会新创建一个。
    axios.default.baseURL
    axios.default.timeout

axios实例配置:  使用create方法创建的axios实例instance,实际开发会使用该方法创建一个新的实例。
    const instance = axios.create({})
    instance.default.baseURL
    instance.default.timeout

axios具体请求方法配置:具体的http方法请求
axios.get('/data', {
    baseURL:'ddd'
})
三个地方的配置对象里常用配置选项如下:
{
    baseURL: '请求的基本域名地址',
    timeout:'请求超时时长,单位毫秒,默认1000ms=1s',
    url: '请求路径',必须 
    method: '请求方法',
    headers: {axios将JavaScript对象序列化为JSON。
        //设置请求头
        'content-type': 'application/x-www-form-urlencoded'
    },
    params:{},请求参数拼接在url
    data:{},请求参数放在请求体中
    proxy: {定义代理服务器的主机名称和端口
        host: '127.0.0.1',
        port: 9000,
        auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
        }
    },
}

## 4. axios拦截器
所谓拦截器,就是在请求发出或响应被处理之前先处理一下。分为请求拦截器和响应拦截器。
请求拦截器:在请求发送给后端之前,常用在对登陆状态的判断,如判断有没有token,有加入到请求头中一起发送到后端。
    axios.interceptors.request.use(请求前的回调,请求错误回调)
    axios.interceptors.request.use(config => {
    return config
    }, error => {
    return Promise.reject(error)
    })

响应拦截器:在请求成功后服务器响应了,对响应数据做一些处理再渲染到页面上。
    axios.interceptors.response.use(对响应成功后返回的数据处理的回调,响应错误回调)
    axios.interceptors.response.use(res => {
    对响应数据做处理,结果会在then() 方法中的成功回调里。
    return res
    },error => {
    return Promise.reject(error)
    })

取消拦截器:拦截器开启后可以定义一个变量接收,作为每一个拦截器的唯一标识。
使用 .eject(拦截器id),取消拦截器
axios.interceptors.request/response.eject(拦截器id)


## 5. 错误处理
无论是请求错误还是响应错误最终都会在catch块中被捕获到。
axios.get('/user/12345').catch(function (error) {

})

