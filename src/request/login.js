import axios from './request.js'
export function login (userName,password) {
    return axios({
       url:'/api/Login/login',
       params:{
           userName:userName,
           password:password
       } 
    })
}
//注册
export function register(registerInfo){
    return axios({
        url:'/api/Login/register',
        params:{
            registerInfo
        }
    })
  
}
//许可证信息
export function getLisence(){
    return axios({
        url:'/api/Help/aboutMe',
       
    })
  
}