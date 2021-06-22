<!-- drawer抽屉组件 -->
<template>
<div class="bigContent">
    <el-drawer
   
  :title="title"
  size='70%'
  :visible.sync="drawerFlag"
  direction="rtl"
  ref="workRef"
  :before-close="handleClose">
  <!-- 头 -->
 <div class="drawerContent" id="pdfDom">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height:100%">
    <el-tab-pane label="回路评估详情" name="daily"   style="height:100%;">
      <div class="contentDra" v-scrollBar style="overflow:auto;position:relative;">
      <div class="contentTile">
        <div style="flex-grow:1">
          <el-button type="text">回路名称:</el-button>
      <el-button type="text">{{title}}</el-button>
        </div>
      <div class="describe" style="flex-grow:4">
         <el-button type="text">描述:</el-button>
       <el-button type="text">{{describe}}</el-button>
      </div>
      <div style="flex-grow:1">
        <el-button type="text">评估时间:</el-button>
      <el-button type="text">{{datetime}}</el-button>
      </div>
      <div style="flex-grow:1">
       
<!-- //getPdf()是我们在main.js中绑定在Vue中的，固定名称，直接调用即可下载，无需在methods中写方法 -->
      <el-button icon="el-icon-printer" type="text" @click="getPDF()">导出PDF</el-button>
      </div>
      <div style="flex-grow:1">
         <el-button type="text">综合性能:</el-button>
     <el-button v-if="performance=='优'" class="button" type="success">优</el-button>
     <el-button v-if="performance=='良'" class="button" type="success">良</el-button>
     <el-button v-if="performance=='中'" class="button" type="warning">中</el-button>
     <el-button v-if="performance=='差'" class="button" type="danger">差</el-button>
     <el-button v-if="performance=='开环'" class="button" type="danger">开环</el-button>
      </div>
     
       <!-- <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
    </el-date-picker> -->
        </div> 
        <!-- 第一部分 -->
     <div class="contentFirst1">
      <!-- <div class="first1Children1"></div> -->
       <!-- ['投用率', '有效投用率','平稳率','振荡指数','操作数','SP操作数','OP操作数','操作数总和','OP行程指数每小时'], -->
      <peresult v-if="flag2" title="投用率%" text="对标看板" :bdpdata="bdpValue0"></peresult> 
      <peresult v-if="flag2" title="有效投用率%" :bdpdata="bdpValue1"></peresult> 
      <peresult v-if="flag2" title="平稳率" :bdpdata="bdpValue2"></peresult> 
      <peresult v-if="flag2" title="振荡指数" :bdpdata="bdpValue3"></peresult> 
      <peresult v-if="flag2" title="Mode操作数" :bdpdata="bdpValue4"></peresult> 
      <peresult v-if="flag2" title="SP操作数" :bdpdata="bdpValue5"></peresult> 
      <peresult v-if="flag2" title="OP操作数" :bdpdata="bdpValue6"></peresult> 
      <peresult v-if="flag2" title="总操作数" :bdpdata="bdpValue7"></peresult> 
      <peresult v-if="flag2" title="OP行程" :bdpdata="bdpValue8"></peresult> 
       <!-- <div class="first1Children2">

       </div> -->
     </div>
     <!-- 第二部分 -->
     <div class="contentSceond1">
       <rend  v-if="flag2" :data="opTrend" :colors='color'></rend>
     </div>
     <!-- 第三部分自PV-SP偏差趋势图 -->
     <div class="contentThree">
       <!-- <piancha title="偏差(PV-SP)"></piancha>  -->
        <oprend  v-if="flag2" title="OP趋势" :data="opTrend"  :dataOP="opRend" :dateTime='opDatetime' :colors='color'></oprend>
     </div>
       <!-- 第四部分自相关离差趋势图 -->
     <div class="contentFour">
        <deviation  v-if="flag2"  title="自相关趋势" :Autodata="opTrend"></deviation>
     </div>
       <!-- 第五部分PV OP散点图 -->
     <div class="contentFive">
       <div class="scatter">
 <scatter v-if="flag2" title="PV-OP双标图" :scatterdata='opTrend'></scatter>
       </div>
       <div class="piancha">
 <piancha v-if="flag2" title="偏差(PV-SP)" :pianchadata='opTrend'></piancha>
       </div>
      
     </div>
       <!-- 第六部分均值以及方差表格 -->
     <div class="contentSix">
       <div class="contentSix1">
 <eltable v-if="flag2" :eldata="eldata"></eltable>
       </div>
      
       <div class="contentSix2">
         <resulttable v-if="flag2" :resultdata="eldata"></resulttable>
       </div>
     </div>
     <!-- <div class="contentThree1">
        <shadowecharts></shadowecharts>  
     </div> -->
     <!-- <div class="contentFour1">
      
     </div> -->
     
      </div>
         
      </el-tab-pane>
    <!-- <el-tab-pane label="汇总报告" name="reports">    
      汇总报告
        </el-tab-pane> -->
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
import deviation from '../echarts/deviation'
import scatter from '../echarts/scatter'
import shadowecharts from '../echarts/shadowecharts'
import {dayResport,Op_Trend} from '../../../request/category'
import request from '../../../request/request'
//import { delete } from 'vue/types/umd'
import eltable from '../echarts/table/eltable'
import resulttable from '../echarts/table/resulttable'
 import piancha from '../echarts/piancha'
import oprend from '../echarts/oprend'
export default {
//import引入的组件需要注入到对象中才能使用

components: {
  peresult,
  rend,
  scatter,
  shadowecharts,
 deviation,
 eltable,
 resulttable,
 piancha,
 oprend
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
    
  },
  describe:{
    type:String,
  },
  datetime:{
    type:String,
  },
performance:{
    type:String,
  }
},
data() {
//这里存放数据
return {
   htmlTitle: '资产评估详情',  //这个也是固定写法，pdf文件下载的名称
    activeName: 'daily', //默认显示tab
    value1:'',
    resultData:[],//评估结果中数据传给子组件的数组
    flag1:false,
    flag2:false,
    opTrend:[],//评估趋势图数据传给子组件
    opRend:[],//OP趋势图
    opDatetime:[],//op横坐标
    drawerFlag: this.drawerchildren,//控制抽屉开启关闭
    color:this.performance,
    bdpValue0:[],
     bdpValue1:[],
      bdpValue2:[],
       bdpValue3:[],
        bdpValue4:[],
         bdpValue5:[],
          bdpValue6:[],
           bdpValue7:[],
            bdpValue8:[],
            eldata:null,//表格数据
    //scatterdata:[],//散点图所需数据
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
  getPDF(){
    this.htmlTitle=this.title+"评估详情"
    this.getPdf(this.htmlTitle)
  },
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
        //debugger
        dayResport(rowID).then(res=>{
          console.log(new Date())
          //debugger
          this.flag2=true
          console.log(res)
           this.opTrend=res
           this.opRend=res.OP
          this.opDatetime=res.dateTime
          let bdpValue=res.bdpValue
          this.bdpValue0=bdpValue[0]
          this.bdpValue1=bdpValue[1]
          this.bdpValue2=bdpValue[2]
         this.bdpValue3=bdpValue[3]
         this.bdpValue4=bdpValue[4]
          this.bdpValue5=bdpValue[5]
          this.bdpValue6=bdpValue[6]
          this.bdpValue7=bdpValue[7]
          this.bdpValue8=bdpValue[8]
         this.eldata=res.loopAssessInfo
         let a=this.eldata
         //debugger
        //   let result=[]
        //   let ratio=res.ratio.toFixed(2)
        //   result.push(res.staticFrictionIndex,res.oscillationIndex,res.effectiveRatio,ratio,res.assessIndex,res.compositeScore)
        //  this.resultData=result
          console.log(new Date())
        },err=>{

        })
      },
      getTrendData(rowID){
        Op_Trend(rowID).then(res=>{
          this.flag1=true
          //debugger
          // this.opTrend=res
          // this.opRend=res.OP
          // this.opDatetime=res.dateTime
          //debugger
          //let a=this.opRend
          //let b=this.opDatetime
         // this.opRend=res
          //console.log(Object.prototype.toString.call(res))
          //console.log(this.opTrend)
        },err=>{

        })
      }
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  //debugger
 let rowID=this.rowID
  this.getdayResport(rowID) //弹框内第一个echarts的数据
 // this.getTrendData(rowID)  //弹框内第二个echarts的数据
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 
},
beforeDestroy(){
  
}
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
  padding: 5px 10px;
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
height: 3%;
display: flex;
justify-content:space-around;
 /* flex-grow: 1; */
/* background-color: rgba(0, 0, 255, 0.836); */
/* background-color: cadetblue; */
}
/* .describe{
   flex-grow: 1; 
} */
/** 第一个模块 */
.contentFirst1{
width: 100%;
height: 20%;
display: flex;
flex-direction:row;
/* background-color: rgb(221, 191, 18); */
/* background-color: rgb(56, 196, 28); */
}


.contentSceond1{
width: 100%;
height: 20%;

/* background-color: rgb(198, 17, 235); */
/* background-color: rgb(41, 15, 136); */
}
.contentThree{
  width: 100%;
height: 20%;
/* background-color: rgb(19, 186, 216); */
}
.contentFour{
  width: 100%;
height: 20%;
/* background-color: rgb(102, 255, 0); */
}
.contentFive{
  width: 100%;
height: 20%;
display: flex;
flex-direction: row;
/* background-color: rgb(255, 0, 98); */
}
.scatter{
   width: 30%;
height: 100%;
/* background-color: rgb(255, 0, 98); */
}
.piancha{
  width: 70%;
height: 100%;
}
.contentSix{
  width: 100%;
height: 30%;
/* background-color: rgba(80, 74, 77, 0.404); */
display: flex;
padding-bottom: 10px;
flex-direction: row;
}
.contentSix1{
width: 70%;
height: 100%;
background-color: rgba(80, 74, 77, 0.404);
}
.contentSix2{
width: 30%;
height: 100%;
background-color: rgba(80, 74, 77, 0.404);

border-left:5px solid rgb(242, 248, 247) ;
}
</style>