<!-- drawer抽屉组件 -->
<template>
<div class="bigContent">
    <el-drawer
   
  :title="title"
  size='60%'
  :visible.sync="drawerFlag"
  direction="rtl"
  ref="workRef"
  :before-close="handleClose">
 <div class="drawerContent">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height:100%">
    <el-tab-pane label="日报" name="daily" style="height:90%;overflow:auto" >
      <div class="contentDra">
      <div class="contentTile">
      <el-button type="text">回路名称:</el-button>
      <el-button type="text">{{title}}</el-button>
      <el-button type="text">时间:</el-button>
      <el-button type="text">23:59:53</el-button>
      <el-button type="text">更新报告</el-button>
      <el-button type="text">评估时间:</el-button>
       <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
        </div> 
     <div class="contentFirst1">
      <!-- <div class="first1Children1"></div> -->
      <peresult v-if="flag1" :data="resultData"></peresult> 
      
       <!-- <div class="first1Children2">

       </div> -->
     </div>
     <div class="contentSceond1">
       <rend  v-if="flag2" :data="opTrend"></rend>
     </div>
     <!-- <div class="contentThree1">
        <shadowecharts></shadowecharts>  
     </div> -->
     <!-- <div class="contentFour1">
      
     </div> -->
     
      </div>
         
      </el-tab-pane>
    <el-tab-pane label="汇总报告" name="reports">    
      汇总报告
        </el-tab-pane>
      </el-tabs>
 </div>
</el-drawer>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import peresult from '../echarts/peresult'
import rend from '../echarts/rend'
import shadowecharts from '../echarts/shadowecharts'
import {dayResport,Op_Trend} from '../../../request/category'
import request from '../../../request/request'
//import { delete } from 'vue/types/umd'
// import eltable from '../echarts/table/eltable'
export default {
//import引入的组件需要注入到对象中才能使用

components: {
  peresult,
  rend,
  shadowecharts,
 
},
props:{
  drawerchildren:{
    type:Boolean,
    default:false
    
  },
  title:{
    type:String,
    default:'rtl'
  },
  rowID:{
    type:Number
    
  }
},
data() {
//这里存放数据
return {
    activeName: 'daily', //默认显示tab
    value1:'',
    resultData:[],//评估结果中数据传给子组件的数组
    flag1:false,
    flag2:false,
    opTrend:[],//评估趋势图数据传给子组件
    drawerFlag: this.drawerchildren,//控制抽屉开启关闭
};
},
//监听属性 类似于data概念
computed: {
 // 读取和设置
			// drawerFlag: {
			// 	get: function () {
			// 		return this.drawerchildren
			// 	},
			// 	set: function (v) {
			// 	  this.$emit('update:drawerchildren', false)
			// 	}
			// }

},
//监控data中的数据变化
watch: {
//    drawer(val){
//        debugger
//        this.drawerFlag=val
//    } 
},
//方法集合
methods: {
 //点击关闭抽屉式触发
    handleClose(){
      //this.$refs.workRef.closeDrawer()
      //this.drawerFlag=false
    this.$emit('childFn', false)
      // done()

    },
    //点击tab
     handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取数据
      getdayResport(rowID){
        debugger
        dayResport(rowID).then(res=>{
          this.flag1=true
          console.log(res)
          
          let result=[]
          let ratio=res.ratio.toFixed(2)
          result.push(res.staticFrictionIndex,res.oscillationIndex,res.effectiveRatio,ratio,res.assessIndex,res.compositeScore)
         this.resultData=result
          //console.log(result)
        },err=>{

        })
      },
      getTrendData(rowID){
        Op_Trend(rowID).then(res=>{
          this.flag2=true
          debugger
          this.opTrend=res
          console.log(res)
          console.log(this.opTrend)
        },err=>{

        })
      }
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
 let rowID=this.rowID
  this.getdayResport(rowID) //弹框内第一个echarts的数据
  this.getTrendData(rowID)  //弹框内第二个echarts的数据
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 
},
}
</script>
<style >
.bigContent{
  width:100%;
  height: 100%;
}
  :focus {
  outline: 0;
}
/* .el-tabs__header{
  margin: 0;
} */
.el-button--text{
  color:#747679
}
 .el-drawer__header{
  margin-bottom: 0px;
}
.el-tabs__content{
  height: 100%;
}
.drawerContent{
  width:100%;
  height:100%;
  padding: 5px 5px;
}
/** tab面板内容 */
.contentDra{
width:100%;
height:100%;
display: flex;
flex-direction: column;
/* background-color: crimson; */
}
/** title的样式 */
.contentTile{
width: 100%;
height: 5%;
display: flex;
justify-content:space-around
/* background-color: cadetblue; */
}
/** 第一个模块 */
.contentFirst1{
width: 100%;
height: 45%;
/* background-color: rgb(56, 196, 28); */
}
.first1Children1{
  width:50%;
  height:100%;
}
.first1Children2{
  width:50%;
  height:100%;
}
.contentSceond1{
width: 100%;
height: 45%;
/* background-color: rgb(41, 15, 136); */
}
.contentThree1{
width: 100%;
height: 40%;
/* background-color: rgb(76, 131, 32); */
}
/* .contentFour1{
width: 100%;
}  */
/* .contentSix{
width: 100%;
height: 5%;
background-color: cadetblue;
} */
</style>