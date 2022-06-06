<template>
  <div class="hello">
    <h3>1. axios概述:</h3>
    <p>
        在vue中发送网络请求的方式有很多,无论是原生的还是第三方插件。现在vue官方推荐axios。
        它可以理解为(ajax i/o system),它是一个基于promise的HTTP库,用来发送网络请求。
        axios特点:
          在浏览器端发送XMLHttoRequests请求
          在node中发送http请求
          支持promise api 即请求返回结果是promise,
          自动转换json数据
          可以拦截请求和响应
          客户端支持防御XSRF攻击
        axios提供了所有的http请求方法,常用的有五种:get,post,put,patch,delete
          get:获取数据
          post:提交数据（表单提交和文件上传）
          put:更新数据（所有数据推送到后端）
          patch:更新数据（只将修改的部分数据推送到后端）
          delete:删除数据
    </p>
    <h3>2. axios使用:</h3>
    <p>
        在组件中调用axios实例
        1.先安装:npm i axios
        2.在一个 .js文件中引入,创建一个新的实例对象并导出
        3.将导出的实例对象绑定到vue的原型的某个属性上
        如:network/index.js
          // 引入
          import axios from 'axios'
          // 常见一个实例对象
          const http = axios.create({
              baseURL:'http://localhost:3000/api',
              timeout:2000
          })
          //这里编写拦截器
          export default http

          //在入口文件引入axios实例
          import http from './network/index'
          // 挂载到vue原型对象上
          Vue.prototype.$http = http
          这种方法好处是方便 ,但是有时候 this指向不一定是当前vue实例,而且当请求接口很多时可能会造成混淆。
          

          还有一种封装方法是封装成函数将所有的请求接口地址按照文件分模块存储,自己在组件中调用函数即可。

    </p>
    <h3>3. axios实例对象配置</h3>
    <p>
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
            headers: {
            //设置请求头
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
    </p>
    <h3>4. axios实际使用</h3>
    <div>
        使用语法1:axios(config).then(),传入一个配置对象,里面的选项描述请求的信息。
        axios({
          //配置选项
        }).then()
        使用语法2:axios.method('url',config).then() method 就是HTTP请求的方法小写,常见五种。
        注意:可以定义一个变量来接收它们的返回值是一个promise,所以可以使用then()方法。
        也可以直接在后面使用then()方法,then方法接收一个响应完成函数可以获得如下内容
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
    </div>
    <h3>5. axios并发请求</h3>
    <p>
      实现一个功能需要同时发送多个请求,多个请求的返回结果都返回了才处理就需要并发请求了。
      返回结果会统一放到一个数组中,可以使用axios.spread()统一处理。
      axios.all([//同时进行的多个请求
        axios.get()
        axios.post()
      ]).then(resArr => {
        console.log(resArr)
      }).then(
        axios.spread((res1,res2,res3,...,resn) => {
          console.log(res1)
        }) 
      )
      
    </p>
    <h3>6. axios拦截器</h3>
    <p>
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
    </p>
    <h3>7. axios错误处理</h3>
    <p>
        无论是请求错误还是响应错误最终都会在catch块中被捕获到。
    </p>
    <hr>
    <br>
    <br>
    <br>
    <br>
    <p>使用axios获取产品数据:{{productList}}</p>


  </div>
</template>

<script>
export default {
  name: 'Axios',
  data() {
    return {
      productList:[]
    }
  },
  methods: {
    fetchProduct(){
      let data  = this.$http.get('/product')
      return data
    }
  },
  created() {
    this.fetchProduct().then( ({data}) => {
      this.productList = data
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
