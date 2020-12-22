<!-- 总览页面 -->
<template>
     <el-tabs v-model="activeName" @tab-click="handleClick" style="height:95%;padding-left:10px">
    <el-tab-pane label="总览" name="first" style="height:100%">
      <tab1></tab1>
    </el-tab-pane>
    <el-tab-pane label="分类总览" name="second" style="height:100%">
      <category></category>
    </el-tab-pane>
    
  </el-tabs>
   
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tab1 from './tab1'
import category from './category'
//import {sumdatalist}  from '../../request/category'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  tab1,
  category
},

data() {
//这里存放数据
return {
     activeName: 'first'
       
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
 
//  "$route":function(to,from){
//    debugger
//    let index=sessionStorage.getItem('index')
//    this.getsumdataList(index)
   //from 对象中包含当前地址
   //to 对象中包含目标地址
   //其实还有一个next参数的
//这个参数是控制路由是否跳转的
//如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
// }//欢迎加入前端全栈开发交流圈一起学习交流：864305860

},
//方法集合
methods: {
  handleClick(tab, event) {
        console.log(tab, event);
      }
  //js中获取多个数组中的同一索引值

    /** 设置警告色 */
  
      //保留小数
  // filter(row, column, cellValue, index) {
  //        debugger
  //     return row.2 =toFixed(row.2)
        
  //     },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 
 
  // let that = this
  //   let heightStyle = that.$refs.tableCot.offsetHeight
  //   that.Height = heightStyle
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  //  const that = this
  //   window.onresize = () => {
  //     return (() => {
  //       let heightStyle = that.$refs.tableCot.offsetHeight
  //       that.Height = heightStyle
  //     })()
  //   }
//this.$refs.children1.my_charts()
},
 
}
</script>
<style >

</style>