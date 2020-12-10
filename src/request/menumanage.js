import axios from './request'
/** 获取菜单 */
export function getMenu(){
    return axios({
        url:'/api/Navigation/getNewMenu'
    })
}
/** 获取用户信息 */
export function getUsers(){
    return axios({
        url:'/api/UserInfo/getUserInfoList'
    })
}
/** 获取用户管理中下拉框中的角色信息 */
export function getSelectRole(){
    return axios({
        url:'/api/RoleInfo/getRoleInfoList'
    })
}
/** 更新用户管理中的行更新 */
export function updataUser(userInfoStr){
    return axios({
        url:"api/UserInfo/updateUserInfo",
        params:{
            userInfoStr,
        }
    })
    }
    /** 新增用户之后 更新行*/
    export function adduserUpdate(userInfoStr){
      return axios({
        url:"api/UserInfo/addUserInfo",
        params:{
            userInfoStr,
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