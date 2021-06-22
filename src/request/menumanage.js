import axios from './request'
/** 获取菜单 */
export function getMenu(){
    return axios({
        url:'/api/Navigation/getNewMenu'
    })
}
/** 获取用户信息 */
export function getUsers(objStr){
    return axios({
        url:'/api/UserInfo/getUserInfoListByPaged',
        params:{
            objStr
        }
    })
}
/** 获取用户管理中下拉框中的角色信息 */
export function getSelectRole(){
    return axios({
        url:'/api/RoleInfo/getRoleInfoList'
    })
}
/** 更新用户管理中的行更新 */
export function updataUser(userInfoStr,str){
    return axios({
        url:"api/UserInfo/updateUserInfo",
        params:{
            userInfoStr,
            str
        }
    })
    }
    /** 新增用户之后 更新行*/
    export function adduserUpdate(userInfoStr,str){
      return axios({
        url:"api/UserInfo/addUserInfo",
        params:{
            userInfoStr,
            str
        }
      })
    }
    /** 删除用户 */
    export function deleUserInfo(userInfoStr){
        return axios({
            url:"api/UserInfo/deleteUserInfo",
            params:{
                userInfoStr,
            }

        })
    }
    /** 企业管理 */
    export function getCompanyinfo(){
        return axios({
            url:'api/CompanysInfo/getCompanysInfoTree'
        })
    }
    /** 企业管理中增加 */
    export function addCompanyinfo(str){
        return axios({
            url:'api/CompanysInfo/addCompanysInfo',
            params:{
                str,
            }
        })
    }
    /** 企业管理中删除 */
    export function deleteCompanyinfo(str){
        return axios({
            url:'api/CompanysInfo/deleteCompanysInfo',
            params:{
                str,
            }
        })
    }
      /** 企业管理中修改 */
      export function updateCompanyinfo(str){
        return axios({
            url:'api/CompanysInfo/updateCompanysInfo',
            params:{
                str,
            }
        })
    }
    /** 回路管理 */
    export function getloopinfo(objStr){
        return axios({
            url:'api/LoopInfo/getLoopsInfoList',
            params:{
                objStr,
            }
        })
    }
    /** 回路管理删除 */
    export function deleloopinfo(loopInfoStr){
        return axios({
            url:'api/LoopInfo/deleteLoopsInfo',
            params:{
                loopInfoStr,
            }
        })
    }
    /**日志管理 */
    export function getlogList(objStr){
        return axios({
            url:'api/OperationLog/getOperationLogListByPage',
            params:{
                objStr,
            }
        })
    }
    /** 修改密码 */
    export function Editpw(oldPwd,newPwd){
        return axios({
            url:'api/UserInfo/updateUserPwd',
            params:{
                oldPwd,
                newPwd
            }
        })
    }
    /**密码重置 */
    export function Restpw(userInfoStr){
        return axios({
            url:'api/UserInfo/resetUserPwd',
            params:{
                userInfoStr
            }
        })
    }