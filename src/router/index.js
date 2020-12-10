// import { create } from 'core-js/fn/object'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//import Layout from "@/layout"
// const originalPush =Router.prototype.push
// Router.prototype.push= function push (location){
//   return originalPush.call(this.location).catch(err=>err)
// }
//配置项目中没有涉及的公共路由
export const defaultRoutes  =[
  // {
  //   path: "/",
  //   redirect:'/summarize'
  //    },
  // {
  //   path:'/404',
  //   title:'error',
  //   name:'login',
  //   component:()=> import('@/components/views/404'),
  //   meta: { title: '404' },
  //   hidden:true
  // },
  {
    path:'/login',
    title:'登录',
    name:'login',
    component:()=> import('@/components/page/Login.vue'),
    meta: { title: '登录' },
    hidden:true
  },
  // {
  //   path:'/404',
  //   component:()=> import('@/views/404'),
  //   hidden:true
  // },
]

const router =new Router({
  mode: "history", //  去掉 http://localhost:8080/#的#
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...defaultRoutes
  ]
})
export default router
