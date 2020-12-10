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
        url:"http://192.168.1.113:1008/api/LoopInfo/offLineLoop",
      // url:"http://192.168.1.180:2001/api/LoopInfo/offLineLoop",
        method:'post',
        data:form,
        headers: { 'Content-Type': 'multipart/form-data','Authorization':token }
    }
    if(config instanceof Object){
        debugger
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
        url:"http://192.168.1.113:1008/api/LoopInfo/onLineLoop",
       //url:"http:// 192.168.1.180:2001/api/LoopInfo/onLineLoop",
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
    debugger
    let token = window.localStorage.getItem("token")    
    let axiosConfig ={
        url:"http://192.168.1.113:1008/api/LoopInfo/importLoopInfo",
       //url:"http:// 192.168.1.180:2001/api/LoopInfo/importLoopInfo",
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