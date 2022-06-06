const install = function(Vue){
  const ajax = new Vue({
      methods:{
          ajax(options={}){
              options.type = (options.type || 'GET').toUpperCase()
              /*拼接数据*/
              let data = []
              for( let i in options.data ){
                  data.push(encodeURIComponent(i)+ '=' + encodeURIComponent(options.data[i]))
              }
              data = data.join('&')
              /*创建 XMLHttpRequest 对象*/
              let xhr
              if( window.XMLHttpRequest ) {
                  // code for IE7+,Firefox,chrome,Opera,Safari
                  xhr = new XMLHttpRequest();
              }else{
                  // code for IE6,IE5
                  xhr = new ActiveXObject("Microsoft.XMLHTTP");
              }

              xhr.onreadystatechange = function(){
                  if(xhr.readyState === 4){
                      const status = xhr.status
                      if(status >= 200 && status < 300){
                          options.success && options.success(JSON.parse(xhr.responseText),xhr.responseXML)
                      } else {
                          options.error && options.error(status)
                      }
                  }
              }

              if( options.type === 'GET' ){
                  xhr.open('GET',options.url + '?' + data,true)
                  xhr.send(null)
              } else if( options.type === 'POST' ){
                  xhr.open('POST',options.url,true)
                  xhr.setRequestHeader(
                      'Content-Type',
                      'application/x-www-form-urlencoded'
                  )
                  xhr.send(data)
              }
          }
      }
  })
  Vue.prototype.$ajax = ajax//this.$ajax.ajax(options)
}
export default install;