//对于 axios 进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入store
// import store from "@/store"
// 引入进度条的样式
import "nprogress/nprogress.css"

//利用 axios 对象的方法 create 去创建一个axios实例
const requsets = axios.create({
    //配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: "/mock",       //10.18
    // 代表请求超时的时间 5s
    timeout: 5000,
});

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requsets.interceptors.request.use((config) => {
    //config：配置对象，对象里面有一个属性很重要，hearder请求头
    // if(store.state.detail.uuid_token){
    //     // 请求头添加一个字段
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    //  // 需要携带 token 给服务器
    //  if(store.state.uesr.token){
    //     config.headers.token = store.state.uesr.token
    // }
    nprogress.start();
    return config;
});

// 响应拦截器
requsets.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requsets;