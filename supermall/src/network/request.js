import axios from 'axios'

export function request(config) {

  // 1.创建axios实例
  const axiosInstance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  });

  // 2.axios的拦截器
  axiosInstance.interceptors.request.use(config => {
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

