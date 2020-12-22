import axios from 'axios'
import qs from 'qs'
import {Loading} from 'element-ui';
import vuerouter from '../router/index';
export default function request (option){
    return new Promise((resolve,reject) => {
        //创建axios的实例
    const instance = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
     baseURL: 'http://192.168.1.113:1008',//本机
    //baseURL: 'http://192.168.1.180:2001', ///服务器
     timeout: 50000
});
 //定义响应动画
 let loading;
 //内存中正在请求的数量
 let loadingNum=0;
 function startLoading() {
     if(loadingNum==0){
         loading = Loading.service({
             lock: true,
             text: '拼命加载中...',
             background:'rgba(255,255,255,0.5)',
         })
     }
     //请求数量加1
     loadingNum++;
 }
 function endLoading() {
     //请求数量减1
     loadingNum--
     if(loadingNum<=0){
         loading.close()
     }
 }
 
 //添加请求拦截器
 instance.interceptors.request.use(
    
         config =>{
            // debugger
             // console.log('来到了request拦截success中');
         // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
         startLoading();
         if(config.url==="/api/Login/login" || config.url==="/api/Login/register"){
            return config;
         }else{
   // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
          //window.localStorage.getItem("accessToken") 获取token的value
          let token = window.localStorage.getItem("token")
    
          if (token) {
          //将token放到请求头发送给服务器,将tokenkey放在请求头中
          //Authorization 要与后台对应起来
          config.headers.Authorization = token;   
          config.headers.post['Content-Type'] = 'multipart/form-data';  
          //也可以这种写法
          // config.headers['accessToken'] = Token;
           return config;
           
      }else{
      //    console.log(vuerouter)
          vuerouter.push("/login")
          return config;
      }
         }
      

         // 3.对请求的参数进行序列化(看服务器是否需要序列化)
         // config.data = qs.stringify(config.data)
         // console.log(config);

         // 4.等等
        // config.baseURL='http://192.168.1.113:1006';
       
         return config;
     },
     error =>{
        // debugger
         //对请求错误做什么
         return Promise.reject(error);
     })
 //统一对返回数据解析
 instance.defaults.transformRequest = function(data){
     data = qs.stringify(data);
     return data;
 }
 
 //响应拦截
 instance.interceptors.response.use(
     response => {
        // debugger
           endLoading();
            if (response.status === 200) {
             return response.data;
         } else {
             Promise.reject();
         }
     },
     error => {
         endLoading();
        // let that=this
         //debugger
         //console.log(error.response.status);
         if (error && error.response) {
			switch (error.response.status) {
				case 400: error.message = '请求错误(400)'; 
					break;
                case 401: error.message = '未授权，请重新登录(401)';
               		break;
				case 403: error.message = '拒绝访问(403)';
					break;
				case 404: error.message = '请求出错(404)'; 
					break;
				case 408: error.message = '请求超时(408)'; 
					break;
				case 500: error.message = '服务器错误(500)'; 
					break;
				case 501: error.message = '服务未实现(501)'; 
					break;
				case 502: error.message = '网络错误(502)'; 
					break;
				case 503: error.message = '服务不可用(503)'; 
					break;
				case 504: error.message = '网络超时(504)'; 
					break;
				case 505: error.message = 'HTTP版本不受支持(505)';
					break;
				default: error.message = '连接出错';
			}
		}else{
			error.message ='连接服务器失败!'
        }
       
       alert(error.message)
       if(error.response.status===401){
        vuerouter.push("/login")
    }
       // message.error(error.message);
        return Promise.reject(error);
        // return Promise.reject();
     }
 );
	// //2.传入对象进行网络请求
    instance(option).then(res => {
        resolve(res)
    }).catch(err => {
        reject(err)
    })

    })
   //return instance(option)
}



