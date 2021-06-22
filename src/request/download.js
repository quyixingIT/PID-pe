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
/** 用户管理中的菜单权限树状图 */
export function getuserInfoTree(){
    return axios({
        url:'api/Navigation/getRightsMenuTree',
        
    })
}
/** 帮助界面中的下载以及预览 */
//export function get