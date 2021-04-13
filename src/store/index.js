import Vue from 'vue'
import Vuex from 'vuex'
import {setAsyncRoutes} from "../router/asyncRouter"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes:[],
    menu:null,
  },
  mutations: {
    SET_ROUTES(state, routes) {
      //debugger
      console.log("1")
      console.log(routes)
      //debugger
      // 动态配置路由
      setAsyncRoutes(routes);
      // 为了防止用户刷新页面导致动态创建的路由失效，将其存储在本地中
      // 这里见一个好用的 session 工具，vue-session，可直接安装，使用方式可以在 gitub 上搜索
      //debugger
      //let a =state.routes
      sessionStorage.setItem('menu', JSON.stringify(routes));
      // 将路由存储在 store 中
      state.routes = routes;
      //debugger
     // let b=state.routes
       //state.routes.push(routes);
     // let a=state.routes
     // debugger
     // sessionStorage.setItem('menu', JSON.stringify(state.routes));

    },
    getmenu(state,payload){
      //debugger
      state.menu=payload.payload
     
    },
   //清空
      USER_SIGNOUT(state,p){
        //debugger
        let routes=state.routes
        let menu=state.menu
        routes=p
        menu=p

      }
      
  },
  actions: {
    // async addRoutes({commit,state}){
    //    /*  获取后台给的权限数组 */
    //    debugger
    //    let permissionList = await fetchPermission()
    // }
  },
  modules: {
  }
})
