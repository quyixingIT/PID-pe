import axios from './request'
export function download(v){
    return axios({
        url:'api/LoopInfo/templateDownload',
        params:{
            type:v
        }
    })
}
/** 树状图接口 */
export function getTree(){
    return axios({
        url:'api/Navigation/getMenuTree',
        
    })
}