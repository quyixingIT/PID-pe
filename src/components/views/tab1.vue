<!-- 总览页面 -->
<template>
    <div id="pdfDom" class="contentSum">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="总览" name="first">总览</el-tab-pane>
    <el-tab-pane label="分类总览" name="second">分类总览</el-tab-pane>
    
  </el-tabs> -->
   
    <!--- 第二部分 echarts------------------------------->
    <div class="content1" >
      <!-- <cylinder id="cylinder1" class="cylinder1" title="变差回路个数" :item="operationNum"></cylinder> -->
     <cricle id="cylinder1" class="cylinder1" style="width:20%;height:100%" title="劣势回路个数" :item="operationNum" :allloop="loopsTotal"></cricle>
      <mycharts v-if="flag" id="echarts1" class="mycharts" style="width:80%;height:100%" title="投用率" :item="echartsdata1" :dataTime="axis"></mycharts>
      <!-- <cricle id="cylinder2" class="cylinder2" title="总回路数" :item="operationNum" :allloop="perfor"></cricle> -->
      <!-- <cylinder id="cylinder3" class="cylinder3" title="总操作数" :item="avgOperationNum"></cylinder> -->
    </div>
     <!--- 第三部分 echarts------------------------------->
    <div class="content2">
      <cricle id="cylinder2" class="cylinder2" title="总回路数" style="width:20%;height:100%" :item="loopsTotal" :allloop="perfor"></cricle>
        <!-- <mycharts v-if="flag" id="echarts1" title="投用率" :item="echartsdata1" :dataTime="axis"></mycharts> -->
        <mycharts v-if="flag" id="echarts2" title="总操作数" style="width:80%;height:100%" :item="echartsdata2" :dataTime="axis"></mycharts>
    </div>
    <!------ 第三部分echarts结尾   -------------------------------------------------- -->
     <!------ 第四部分echarts开头  ----------------------------------------------------- -->
   <!-- <div class="contentThree">
       <cumlateecharts v-if="flag" :Ydata="echartsShift" :data="echartsShiftData"></cumlateecharts>
   </div> -->
    <!--- 第5部分 echarts------------------------------->
   <div class="content3">
     <div style="height:100%;">
       <div style="height:15%">
<el-button type="primary" icon="el-icon-c-scale-to-original" @click="seeDetail">{{hidden}}</el-button>
     <el-button type="warning" icon="el-icon-printer" @click="getPDF()">导出PDF</el-button>
       </div>
       <div style="height:85%;overflow:auto;position:relative" v-scrollBar >
            <template>
            
         <el-table
    ref="table"
    height="150"
      :data="tableData1"
      style="width: 100%">
      <el-table-column
        prop="0"
        label="回路类型"
       >
      </el-table-column>
      <el-table-column
        prop="1"
        label="回路数"
       >
      </el-table-column>
       <el-table-column
        prop="2"
        label="投用率(%)">
      </el-table-column>
       <el-table-column
        prop="3"
        label="投用有效率（%）">
      </el-table-column>
       <el-table-column
        prop="16"
        label="劣势回路个数"
       >
        </el-table-column>
       <el-table-column
        prop="9"
        label="平均总操作数"
       
        >
      </el-table-column>
       <el-table-column
        prop="4"
        label="平稳率">
      </el-table-column>
      
      <el-table-column
        prop="5"
        label="振荡指数">
      </el-table-column>

      <!-- <el-table-column :render-header="renderHeader"> -->
 <el-table-column
        prop="6"
        label="Mode平均操作数"
        v-if=showOr
        >
      </el-table-column>
       <el-table-column
        prop="7"
        label="SP平均操作数"
        v-if=showOr
        >
      </el-table-column>
      <el-table-column
        prop="8"
        label="OP平均操作数"
        v-if=showOr
        >
      </el-table-column>
      
       <el-table-column
        prop="10"
        label="OP行程"
        v-if=showOr
        >
      </el-table-column>
      <el-table-column
        prop="11"
        label="优（%）"
        v-if=showOr
        >
      </el-table-column>
       <el-table-column
        prop="12"
        label="良（%）"
        v-if=showOr
       >
        </el-table-column>
        <el-table-column
        prop="13"
        label="中（%）"
        v-if=showOr
       >
        </el-table-column>
        <el-table-column
        prop="14"
        label="差（%）"
        v-if=showOr
       >
        </el-table-column>
        <el-table-column
        prop="15"
        label="开环（%）"
        v-if=showOr
       >
        </el-table-column>
      <!-- </el-table-column> -->
      
    </el-table>
   
  </template>
   </div>  
  </div>
   </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import mycharts from './echarts/echarts'
import cumlateecharts from './echarts/cumulateecharts'
import {sumdatalist}  from '../../request/category'
import cylinder from './echarts/cylinder'
import cricle from './echarts/cricle'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    mycharts,
    cumlateecharts,
    cylinder,
    cricle
},

data() {
//这里存放数据
return {
    htmlTitle:'回路总览',
    showOr:false,
     hidden:"展开隐藏列",
      echartsdata1:[],//echarts组件折线图数据
      axis:[],
      echartsdata2:[],//echarts组件折线图数据
      tableData: [],
      tableData1:[],
      echartsShift:[],//第三部分echarts的横坐标
      echartsShiftData:[],//第三部分echarts的数据
      flag:false,
      Height:300,
      compositeScoreTimeWeek:[],
      loopsTotal:null,
      avgOperationNum:null,
      operationNum:null,
      perfor:[],//优良中差数组
      infoStr:"",
       
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
 
 "$route":function(to,from){
  //debugger
   let index=sessionStorage.getItem('index')
   this.getsumdataList(index)
   //from 对象中包含当前地址
   //to 对象中包含目标地址
   //其实还有一个next参数的
//这个参数是控制路由是否跳转的
//如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
 }//欢迎加入前端全栈开发交流圈一起学习交流：864305860

},
//方法集合
methods: {
  getsumdataList(index){
   // debugger
    // index=localStorage.getItem('index')
   // debugger
    sumdatalist(index).then(res=>{
      if(res.success){
        //debugger
        this.flag=true
        this.perfor=res.performenceValue// 优良中差指标
        this.loopsTotal=res.loopsTotal //总回路数
        this.avgOperationNum=res.operationNum //总操作数
        this.echartsdata1=res.ratioWeekTrend //投用率趋势
        this.echartsdata2=res.operationNumTrend //总操作数趋势
        this.axis=res.timeWeek     //横坐标时间
        this.tableData1=res.table  //表格数据
        this.operationNum=res.loopsBadNum //变差回路个数
        this.infoStr=res.infoStr //当前总览所处层集
      }else{
 this.$message.error(res.msg);
      }
     
     
      console.log(res)
    },err=>{
       this.$message.error(res.msg);
      console.log(err)
    })
  },
//   renderHeader (h, column) {
//     return h('div', [
//             h('span', {
//                 style: `cursor: pointer;`,
//                 on: {
//                     click: this.seeDetail
//                 }
//             }, '查看详情')
           
//         ]
//     )
// },
getPDF(){
    this.htmlTitle=this.infoStr+"下的总览"
    //console.log( this.htmlTitle)
   // let i=this.infoStr
    //let t=this.htmlTitle
    //debugger
    this.getPdf(this.htmlTitle)
  },
seeDetail() {
      this.showOr=!this.showOr
      if( this.showOr){
        this.hidden="还原"
      }else{
 this.hidden="展开隐藏列"
      }
       this.$nextTick(() => {
          this.$refs.table.doLayout();
        });
    console.log('查看详情111')
},
seeHandle() {
    console.log('查看待处理1111')
},

  //js中获取多个数组中的同一索引值
  trans (arr){
    let result =[]
    arr.forEach(item => {
      item.forEach((d,i)=> {
        let a=result[i] =result[i] || []
        a.push(d)
      })
    });
    return result
  },
    /** 设置警告色 */
  tableCellClassName({row, column, rowIndex, columnIndex}) {
        //    if (row.address>=80 && row.address<90) {
        //   return 'warning-row';
        // } else if (row.address>=90) {
        //   return 'success-row';
        // }else if(row.address<80){
        //     return 'error-row';
        // }
        if(row.name ==='差'&& columnIndex == 1){
            return 'error-row';
        }
        return '';
      },
      // 修改table header的背景色
    // tableHeaderColor({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 0) {
    //     return 'background-color: lightblue;color: #fff;font-weight: 500;'
    //   }
    // }

      //保留小数
  // filter(row, column, cellValue, index) {
  //        debugger
  //     return row.2 =toFixed(row.2)
        
  //     },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  //debugger
  let index=sessionStorage.getItem('index') // debugger
  if(!index){
    let menu=JSON.parse(sessionStorage.getItem('menu'))
    index=menu[0].children[0].path
    sessionStorage.setItem('index',index)
     this.getsumdataList(index)
  }else{
  this.getsumdataList(index)
  }
 
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

.el-table{
/* 表格字体颜色 */
color:white;
/* 表格边框颜色 */
/* border: 0.5px solid #758a99; */
/* height: 500px; */
}
/* 表格内背景颜色 */
.el-table th, .el-table tr,.el-table td{
border: 0;
background-color: transparent;
}

/* 使表格背景透明 */
/* .el-table th, .el-table tr {
background-color: transparent;
} */
.el-table, .el-table__expanded-cell {
    background-color: transparent;
}

.el-table th, .el-table tr {
    background-color: transparent;
}
.el-table th{
  background-color: transparent !important;
}
/* 表格表头字体颜色 */
.el-table thead {
color: white;
font-weight: 500;
background-color: rgba(148, 144, 144, 0.3)
}
/**鼠标悬浮颜色 */
.el-table__body tr:hover > td{
    background-color:rgb(127, 147, 177) !important;
}
 .el-table__header-wrapper thead :hover{
     background-color: rgb(127, 147, 177) !important;
} 
.contentSum{
    width: 100%;
    height:100%;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
     background:url('../../assets/img/backgroundimg.png') no-repeat;
    background-size: cover; 
}

.content2{
    width: 100%;
    height:35%;
    /* background-color: rosybrown; */
    display: flex;
}

.content3{
    width:100%;
    height:30%;
    /* overflow: auto;
    position:relative */
    /* background-color: hotpink; */
}
.content1{
  width: 100%;
  height:35% ;
  display: flex;
  flex-direction:row ;
  /* background-color: azure; */
 
}
.cylinder1 {
  width:20%;
  height: 100%;
  /* background-color: red; */
  overflow: hidden;
}
.mycharts{
  /* width:80%; */
  height: 100%;
}
.cylinder2{
   /* //width:50%; */
  height: 100%;
  /* background-color: salmon; */
   overflow: hidden;
}
 .cylinder3{
   width:30%;
  height: 100%;
  overflow: hidden;
 }
.tableContent{
    width:100%;
    height:100%;
}
/** 警告色设置 */
.el-table .warning-row {
    background-color: rgb(241, 230, 209);
  }

  .el-table .success-row {
    background-color: #c4e0b5;
  }
  .el-table .error-row{
       color: #f34949;
  }
</style>