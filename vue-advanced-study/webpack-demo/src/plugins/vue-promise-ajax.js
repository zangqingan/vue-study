const install= function(Vue){
  const http = new Vue({
    methods: {
      /*将数据转化为字符串*/
      strData(data){
        let dataStr=""
          for(let key in data){
            dataStr += key+'='+data[key]+'&'
          }
          dataStr = dataStr && dataStr.slice(0,-1)
          return dataStr
      },
      /*创建 XMLHttpRequest 对象*/
      createXHR(){
        let xhr
        if (window.XMLHttpRequest){
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xhr = new XMLHttpRequest()
        }
        else{// code for IE6, IE5
          xhr=new ActiveXObject("Microsoft.XMLHTTP")
        }
        return xhr
      },
      /*向服务器发送请求*/
      open(xhr,type,url,async){
        xhr.open(type,url,async)
      },
      send(xhr,msg){
        xhr.send(msg)
      },
      setHeaders(xhr,headers){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        if(!headers){
          return false
        }
        for(let key in headers){
          xhr.setRequestHeader(key,headers[key])
        }
      },
      request(xhr,opts){
        if(opts.type==="GET"){
          this.open(xhr, opts.type, opts.url + '?' +  this.strData(opts.data) , opts.async)
          this.send(xhr,null)
        }else if(opts.type==="POST"){
          this.open(xhr,opts.type,opts.url,opts.async)
          if(opts.headers){
              this.setHeaders(xhr,opts.headers)
          }
          this.send(xhr,strData(opts.data))
        }
      },
      http(options){
        return new Promise((resolve,reject)=>{
          if(!options || typeof options != 'object'){
              reject(new Error("参数错误，请传入对象参数！"))
              return false
          }
          if(!options.url){
              reject(new Error("url不能为空"))
              return false
          }
          options.type = options.type?options.type.toUpperCase():'GET'
          options.async = (options.async && options.async === false)?false:true
          options.dataType = options.dataType || "json"
          options.data = options.data || {}
          options.headers = options.headers || {}
          let dataStr = this.strData(options.data)
          /*创建 XMLHttpRequest 对象*/
          let xhr = this.createXHR()
          /*创建服务器返回响应后执行操作函数*/
          xhr.onreadystatechange = function(){
              let responseData
              if(xhr.readyState == 4){
                  switch  (xhr.status){
                      case 200:
                          switch (options.dataType){
                              case "xml":
                                  responseData=xhr.responseXML
                                  break
                              case "text":
                                  responseData = xhr.responseText
                                  break
                              case "json":
                                  responseData = JSON.parse(xhr.responseText)
                                  break
                          }
                          resolve(responseData)
                      default:
                          reject(new Error("这里做错误处理"))
                  }
              }
          }
          /*向服务器发送请求*/
          this.request(xhr,options)
        })
      }
    }
  })
  Vue.prototype.$http = http//this.$ajax.http(options)
  Vue.prototype.$post=function(options){
      options.type='post'
      return this.$http(options)
  }
  Vue.prototype.$get=function(options){
      options.type='get'
      return this.$http(options)
  }
}
export default install