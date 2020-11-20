import axios from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress'; // 引入nprogress插件
import 'nprogress/nprogress.css'; // 这个nprogress样式必须引入

message.config({
  duration: 1,
  maxCount: 1,
  rtl: true,
});
const apiRoot = require('../../config/index').default;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// api 配置
const config = {
  baseURL: apiRoot.BASE_API,
  timeout: 60000, // Timeout 为了防止导出过大文件失败，所以把时间设为1分钟
  headers: {},
  withCredentials: false, // 是否可以携带cookie
};
const $axios = axios.create(config);
// 请求拦截
$axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 通过reudx的store拿到拿到全局状态树的token ，添加到请求报文，后台会根据该报文返回status
    // 此处应根据具体业务写token
    NProgress.start();
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers.Authorization = `${'Bearer '}${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    message.error(error);
    return Promise.reject(error);
  },
);
// 添加响应拦截器
$axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    NProgress.done(); // 设置加载进度条(结束..)
    if (response.data.success === false) {
      // message.error(response.data.message);
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    // 接口出错判断
    NProgress.done(); // 设置加载进度条(结束..)
    message.error(error.response.data.msg, 2);
    if (error.response.data.code === 3000) {
      setTimeout(() => {
        localStorage.removeItem('userInfo');
        window.location.href = '/#/login';
      }, 1500);
    }
    return Promise.reject(error.response.data);
  },
);

export default $axios;
