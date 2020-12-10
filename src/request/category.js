import axios from './request'
export function tabledatalist(objStr){
    return axios({
        url:'/api/LoopAssess/summarizeTable',
        params:{
            objStr
        }
    })
}
//日报 评估结果数据
export function dayResport(loopName){
    return axios({
        url:'/api/LoopAssess/onAccessResult',
        params:{
            loopAssessID:loopName
        }
    })
}
//日报 趋势图 （sp,pv,op）
export function Op_Trend(loopName){
    return axios({
        url:'/api/LoopAssess/on_OP_PV_SP_DTrend',
        params:{
            loopAssessID:loopName
        }
    })
}
//总览页面接口
export function sumdatalist(index){
    return axios({
        url:'/api/LoopAssess/summarize',
        params:{
            index:index
        }
    })
}