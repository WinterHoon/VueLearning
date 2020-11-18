import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

//4.使用全局的axios和相应的配置进行网络请求

// // 3.axios的全局配置
// axios.defaults.baseURL = '';
// axios.defaults.timeout = 5000;
// // 1.axios的基本使用
// axios({
//   url: '/home/multidata',
//   method: 'get'
// }).then( res => console.log(res))

// axios({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => console.log(res))

// // 2.axios发送并发请求
// axios.all([
//   axios(
//     { url: '/home/multidata'}
//   ),
//   axios({
//     url: '/home/data',
//     params: {
//       type: 'pop',
//       page: 1
//     }
//   })
// ]).then(axios.spread((res1,res2) => {
//   console.log(res1);
//   console.log(res2);
// }));

// 5.创建axios实例

// const axios1 = axios.create({
//   baseURL: '',
//   timeout: 5000
// })

// axios1({
//   url: '/home/multidata'
// }).then(res => console.log(res));

// axios1({
//   url: '/home/data',
//   params: {
//     type: 'sell',
//     page: 3
//   }
// }).then(res => console.log(res));

// 6.封装axios模块
import { request } from './network/request';

// request({
//   url: '/home/multidata'
// },res => console.log(res), err => console.log(err))

request({
  url: '/category'
})
.then(res => console.log(res))
.catch(err => console.log(err))