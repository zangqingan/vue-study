// import axios from 'axios';


// //取消重复请求
// // 只要是请求地址、请求方式、请求参数一样，那么我们就能认为是一样的。
// const pendingMap = new Map();
// /**
//  * 生成每个请求唯一的键
//  * @param {*} config 
//  * @returns string
//  */
//  function getPendingKey(config) {
//   let {url, method, params, data} = config;
//   if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
//   return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
// }

// /**
//  * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
//  * @param {*} config 
//  */
// function addPending(config) {
//   const pendingKey = getPendingKey(config);
//   config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
//     if (!pendingMap.has(pendingKey)) {
//       pendingMap.set(pendingKey, cancel);
//     }
//   });
// }

// /**
//  * 删除重复的请求
//  * @param {*} config 
//  */
//  function removePending(config) {
//   const pendingKey = getPendingKey(config);
//   if (pendingMap.has(pendingKey)) {
//      const cancelToken = pendingMap.get(pendingKey);
//      cancelToken(pendingKey);
//      pendingMap.delete(pendingKey);
//   }
// }


// function http(axiosConfig) {
//   const service = axios.create({
//     baseURL: 'http://localhost:8888', // 设置统一的请求前缀
//     timeout: 10000, // 设置统一的超时时长
//   });
//   // 请求拦截器
//   service.interceptors.request.use(
//     config => {
//       removePending(config);
//       addPending(config);
//       return config;
//     }, 
//     error => {
//       return Promise.reject(error);
//     }
//   );
//   //响应拦截器
//   service.interceptors.response.use(
//     response => {
//       removePending(response.config);
//       return response;
//     },
//     error => {
//       error.config && removePending(error.config);
//       return Promise.reject(error);
//     }
//   );


//   return service(axiosConfig)
// }

// export default  http;
