import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui'
import axios from './request/request.js'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/css/icon.css'
import echarts from 'echarts';
import {setAsyncRoutes} from "./router/asyncRouter"
//import { messages } from './components/common/I18n.vue';
import moment from 'moment' /** 引用时间格式化插件 */
import htmlToPdf from './untils/htmlToPdf' /** 引入html转化PDF插件 */
//插件的包
import PerfectScrollbar from 'perfect-scrollbar';
//对应的css
import "perfect-scrollbar/css/perfect-scrollbar.css";
//解决左侧导航栏缩小之后显示文字问题
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
//自适应
// import './untils/flexible'
console.log(process.env)
const elScrollBar = (el) => {
    if (el._ps_ instanceof PerfectScrollbar) {
      el._ps_.update()
    } else {
      el._ps_ = new PerfectScrollbar(el, { suppressScrollX: true })
    }
  }
  
Vue.use(htmlToPdf)
  //自定义指令(滚动条个性化)
  Vue.directive('scrollBar', {
    inserted (el, binding, vnode) {
      const rules = ['fixed', 'absolute', 'relative']
      if (!rules.includes(window.getComputedStyle(el, null).position)) {
        console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join('、')}`)
      }
      elScrollBar(el)
    },
    componentUpdated (el, binding, vnode, oldVnode) {
      try {
        vnode.context.$nextTick(
          () => {
            elScrollBar(el)
          }
        )
      } catch (error) {
        console.error(error)
        elScrollBar(el)
      }
    }
  })
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment
Vue.prototype.$echarts = echarts; /** 使用插件echarts */
Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dateStr).format(pattern);
})
Vue.config.productionTip = false
Vue.use(ElementUI);/** vue在引用自己的插件时，全局引用使用这种方式 */
Vue.prototype.$axios=axios /* 全局引用第三方插件的方式，在其他组件中使用this.$axios使用  */
/** 全局路由守卫 */
const whiteList = ['/login'];
router.beforeEach( async (to, from, next) => {
    NProgress.start()
    document.title = to.meta.title;
  
       const bb= JSON.parse(sessionStorage.getItem("menu"));
    // 获取用户token，用来判断当前用户是否登录
     const hasToken =window.localStorage.getItem("token")
    //const hasToken =""
    let aa=store.state.routes;
     if (hasToken) {
       //debugger
         if (to.path === '/login') {
           //debugger
            //next({ path: '/Home' })
            //
            localStorage.removeItem('ms_username');
            localStorage.removeItem('token');
            sessionStorage.removeItem('index')
            sessionStorage.removeItem('menu')
            next()
           // location.reload()
            NProgress.done()
        } else {
            //debugger
            let str=to.path
           let index= str.replace(/\//g,'')
           sessionStorage.setItem('index',index)
            //异步获取store中的路由
           // let route = await store.state.routes;
           //同步获取store中的路由
           let route =  store.state.routes;
            const hasRouters = route && route.length>0;
           
            //判断store中是否有路由，若有，进行下一步
            if ( hasRouters ) {
               // const bb= JSON.parse(localStorage.getItem("menu"));
                next()
            } else {
                //store中没有路由，则需要获取获取异步路由，并进行格式化处理
                try {
                  //  let cc=store.state.routes
                  //sessionStorage.valueOf()
                   // const accessRoutes = getAsyncRoutes(await store.state.routes );
                   //const aa= JSON.parse(sessionStorage.getItem("menu"));
                   //debugger
                  store.commit('SET_ROUTES', bb)
                  // setAsyncRoutes(bb);
                    //debugger
                    let rr=router
                     let redirect=from
                    // if(to.path ===redirect){
                    //     next()
                    // }else{
                         next({ ...to, replace: true })
                    //    // next({path:redirect})//跳转到目的路由
                    // }

                    // 动态添加格式化过的路由
                   // router.addRoutes(accessRoutes);
                    //debugger
                    //next()
                    //router.replace(to.path)
                   // next({ ...to, replace: true })
                  // next('/')
                  //next("/login");
                    NProgress.done()
                } catch (error) {
                   
                    // Message.error('出错了')
                     next("/login");
                   // next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
       // debugger
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            if (to.path !== "/login") {
                // 重定向到登录页面 不能这么写 因为假如之前的角色是 管理员页面 后又登陆了非管理员 重定向的页面就可能不存在,就会导致404
                // next(`/login?redirect=${to.path}`)
                 next("/login");
              
              } else {
                next();
              }
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})


new Vue({
  router,
  store,
  render: h => h(App)/** 渲染虚拟dom的render方法 */
}).$mount('#app')
