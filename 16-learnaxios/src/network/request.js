import axios from 'axios'

export function request(config) {

  // 1.创建axios实例
  const axiosInstance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  });

  // 2.axios的拦截器
  axiosInstance.interceptors.request.use(config => {
    // console.log(config);
    //1.比如config中一些信息不符合服务器要求
    //2.比如每次发送网络请求时，都希望在页面中显示一个请求的图标
    //3.某些网络请求比如登录是必须携带一些特殊信息的

    //拦截了之后要返回
    return config;
  }, err => {
    // console.log(err);
  });
  axiosInstance.interceptors.response.use(res => {
    // console.log(res);
    return res.data;
  }, err => {
    // console.log(err);
  });

  // 3.发送真正的网络请求
  return axiosInstance(config);
}

// export function request(config) {

//   return new Promise((resolve, reject) => {
//     const axiosInstance = axios.create({
//       baseURL: 'http://152.136.185.210:8000/api/w6',
//       timeout: 5
//     });
  
//     axiosInstance(config)
//     .then( res => resolve(res) )
//     .catch( err => reject(err) )
//   })

// }

// export function request(config,success,failure) {

//   const axiosInstance = axios.create({
//     baseURL: 'http://152.136.185.210:8000/api/w6',
//     timeout: 5000
//   });

//   axiosInstance(config).then( res => success(res) ).catch( err => failure(err) );

// }