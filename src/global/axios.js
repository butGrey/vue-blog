//axios.create
//axios拦截器
//error.response.status各种状态码处理
import Axios from "axios"
const qs = require('qs');

Axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    data = qs.stringify(data);
    return data;
  }],
  withCredentials: true,
  timeout: (6*60*1000)
});
Axios.a = 1;

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
	config.url = config.url.replace("http://localhost:3000","api")//跨域
  if(config.method == "post"){
	config.data = qs.stringify(config.data)
	}
    	return config;
  	}, function (error) {
   	 return Promise.reject(error);
  });
// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    	return response;
  	}, function (error) {
    	return Promise.reject(error);
  });

export default Axios;
