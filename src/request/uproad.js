//import axios from 'axios'
import axios from 'axios'
import qs from 'qs'
/** 数据源管理中的离线数据上传 */
export function uproad(form,config){
//   let formdata=qs.stringify(form)
//     return axios({
//         url: '/api/LoopInfo/offLineLoop',
//         data: formdata,
//         method: 'post',
//         // headers:{
//         //     'Content-type': 'multipart/form-data'
//         //             }
//     })
    let token = window.localStorage.getItem("token")    
    let axiosConfig ={
        //本机
       // url:"http://192.168.1.113:1008/api/LoopInfo/offLineLoop",
       //服务器
      //url:"http://192.168.1.180:6001/api/LoopInfo/offLineLoop",
       //现场服务器
       url:"http://127.0.0.1:6001/api/LoopInfo/offLineLoop",
        method:'post',
        data:form,
        headers: { 'Content-Type': 'multipart/form-data','Authorization':token }
    }
    if(config instanceof Object){
        //debugger
        for(let key in config){
            axiosConfig[key] =config[key]
        }
    }
    return axios(axiosConfig)
    // return axios.post('http://192.168.1.113:1008/api/LoopInfo/offLineLoop', form, { headers: { 'Content-Type': 'multipart/form-data','Authorization':token } })
    //return axios.post('/api/LoopInfo/offLineLoop', form)
}
/** 数据源管理中的在线线数据上传 */
export function onLineLoop(form,config){
    let token = window.localStorage.getItem("token")    
    let axiosConfig ={
        //本机
        //url:"http://192.168.1.113:1008/api/LoopInfo/onLineLoop",
        //服务器
       //url:"http://192.168.1.180:6001/api/LoopInfo/onLineLoop",
        //现场服务器
        url:"http://10.0.1.213:6001/api/LoopInfo/onLineLoop",
        method:'post',
        data:form,
        headers: { 'Content-Type': 'multipart/form-data','Authorization':token }
    }
    if(config instanceof Object){
       
        for(let key in config){
            axiosConfig[key] =config[key]
        }
    }
    return axios(axiosConfig)
        // let token = window.localStorage.getItem("token")
        //  return axios.post('http://192.168.1.113:1008/api/LoopInfo/onLineLoop', form, { headers: { 'Content-Type': 'multipart/form-data','Authorization':token } })
        // //return axios.post('/api/LoopInfo/offLineLoop', form)
    }
    /** 数据源管理中的指标数据上传 */
export function LoopInfo(form,config){
    //debugger
    let token = window.localStorage.getItem("token")
        let base_url=process.env.VUE_APP_UPROAD 
    let axiosConfig ={
        //本机
        //url:"http://192.168.1.113:1008/api/LoopInfo/importLoopInfo",
        //服务器
       //url:"http://192.168.1.180:6001/api/LoopInfo/importLoopInfo",
        //现场服务器
        //url:"http://10.0.1.213:6001/api/LoopInfo/importLoopInfo",
       //url:"http://127.0.0.1:6001/api/LoopInfo/importLoopInfo",
       url:base_url,
        method:'post',
        data:form,
        headers: { 'Content-Type': 'multipart/form-data','Authorization':token }
    }
    if(config instanceof Object){
        
        for(let key in config){
            axiosConfig[key] =config[key]
        }
    }
     return axios(axiosConfig)
    //     let token = window.localStorage.getItem("token")
    //      return axios.post('http://192.168.1.113:1008/api/LoopInfo/importLoopInfo ', form, { headers: { 'Content-Type': 'multipart/form-data','Authorization':token } })
        //return axios.post('/api/LoopInfo/offLineLoop', form)
    }