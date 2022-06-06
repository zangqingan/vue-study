import  http from  './index.js'
//json,默认
export function login(paramsList) {
  return http({
    url: '/api/login',
    method: 'post',
    data: paramsList
  });
}
//application/x-www-form-urlencoded'
export function loginAPI(paramsList) {
  return http({
    url: '/api/login',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    //向服务器发送前，修改请求数据，但只能用在 'PUT'，'POST' 和 'PATCH' 这几个请求方法。
    //且后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream，
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      }
    ],
    //或者通过第三方模块来序列化参数，npm install qs
    // transformRequest: [
    //   (data) => {
    //     return qs.stringify(data)
    //   }
    // ],
  });
}








