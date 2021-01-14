<!-- 总览页面 -->
<template>
    <div class="contentSum">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="总览" name="first">总览</el-tab-pane>
    <el-tab-pane label="分类总览" name="second">分类总览</el-tab-pane>
    
  </el-tabs> -->
    <div class="contentFirst">
        <!-- ------------------表格部分-------------------------------------- -->
      <div class="tableContent" ref="tableCot">
        <!-- :header-cell-style="tableHeaderColor" -->
    <el-table
    :data="tableData"
    style="width: 100%"
     :cell-class-name="tableCellClassName"
     
     >
    <!-- :row-class-name="tableRowClassName"  -->
   
      <el-table-column
      label="回路类型"
      prop="0"
     >  
    </el-table-column>
   
    
    <el-table-column
    prop="1"
      label="评价等级"
     >
    </el-table-column>
    <el-table-column
  
     prop="2"
      label="投运率">
        
    </el-table-column>
  
    <el-table-column
     prop="3"
      label="综合评分">
    </el-table-column>
  </el-table>
</div>
  <!-- 表格结尾---------------------------- ----------------------------------------->
    </div>
    <!--- 第二部分 echarts------------------------------->
    <div class="contentFive" >
      <cylinder id="cylinder1" class="cylinder1" title="操作数" :item="operationNum"></cylinder>
      <cricle id="cylinder2" class="cylinder2" title="总回路数" :item="loopsTotal"></cricle>
      <cylinder id="cylinder3" class="cylinder3" title="平均操作数" :item="avgOperationNum"></cylinder>
    </div>
     <!--- 第三部分 echarts------------------------------->
    <div class="contentSecond">
        <mycharts v-if="flag" id="echarts1" title="投运率" :item="echartsdata1" :dataTime="axis"></mycharts>
        <mycharts v-if="flag" id="echarts2" title="综合评分" :item="echartsdata2" :dataTime="compositeScoreTimeWeek"></mycharts>
    </div>
    <!------ 第三部分echarts结尾  ---------------------------------------------------- -->
     <!------ 第四部分echarts开头  ---------------------------------------------------- -->
   <div class="contentThree">
       <cumlateecharts v-if="flag" :Ydata="echartsShift" :data="echartsShiftData"></cumlateecharts>
   </div>
    <!--- 第5部分 echarts------------------------------->
   <div class="contentFour">
       <template>
    <el-table
      :data="tableData1"
      style="width: 100%">
      <el-table-column
        prop="0"
        label="名称"
       >
      </el-table-column>
      <el-table-column
        prop="1"
        label="回路数"
       >
      </el-table-column>
      <el-table-column
        prop="2"
        label="优（%）">
      </el-table-column>
       <el-table-column
        prop="3"
        label="良（%）"
       >
        </el-table-column>
        <el-table-column
        prop="4"
        label="中（%）"
       >
        </el-table-column>
        <el-table-column
        prop="5"
        label="差（%）"
       >
        </el-table-column>
        <el-table-column
        prop="6"
        label="开环（%）"
       >
        </el-table-column>
    </el-table>
  </template>
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
      echartsdata1:[],//echarts组件折线图数据
      axis:[],
      echartsdata2:[],//echarts组件折线图数据
      tableData: [],
      tableData1:[],
      echartsShift:[],//第三部分echarts的横坐标
      echartsShiftData:[],//第三部分echarts的数据
      flag:false,
      Height:250,
      compositeScoreTimeWeek:[],
      loopsTotal:null,
      avgOperationNum:null,
      operationNum:null,
       
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
 
 "$route":function(to,from){
  // debugger
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
    
    // index=localStorage.getItem('index')
   // debugger
    sumdatalist(index).then(res=>{
      if(res.success){
 if(res.ratioLegend !==null){
        console.log(res)
        //debugger
          const format=function(arr){
          let obj ={}
          arr.map((item,index)=>{
            obj[index] =item
          })
          return obj
        }
        const run=function(arr){
          let result =[]
          arr.map((item)=>{
            result.push(format(item))
          })
          return result
        }
        this.tableData=run(res.tableSum)
       
         this.tableData1=run(res.table)
        //给echats横坐标赋值
        this.flag=true //通知echarts组件开始渲染
           
       // this.echartsdata1=res.compositeScore
      // debugger
       //综合评分
       this.echartsdata2=[]
      let compositeScore=res.compositeScoreWeek
     // let compositeScoreMain=res.compositeScoreMain
      let compositeScoreLegend=res.compositeScoreLegend
     // this.compositeScoreTimeWeek=res.compositeScoreTimeWeek[0]
     this.compositeScoreTimeWeek=res.timeWeek
      this.echartsdata2.push(compositeScore)
       this.echartsdata2.push(compositeScoreLegend)
       const a=this.echartsdata2
       //投运率
       this.echartsdata1=[]
         let ratio=res.ratioWeek
       let ratioMain=res.ratioLegend
       // this.axis=res.assessTimeWeek[0]   
       this.axis=res.timeWeek 
       this.echartsdata1.push(ratio)
       this.echartsdata1.push(ratioMain)
       const b=this.echartsdata1
       // this.echartsdata2=res.ratio
  //回路总数
  //debugger
  this.loopsTotal=res.loopsTotal
  //平均操作数
  this.avgOperationNum=res.avgOperationNum
  //操作数
  this.operationNum=res.operationNum
        //处理第三部分的echcarts数据
        let arrResult=[] //获取纵坐标
        let shiftResult
        for(let i=0;i<res.table.length;i++){
         shiftResult= res.table[i].shift()
         arrResult.push(shiftResult)
        }
        console.log(arrResult)
        this.echartsShift=arrResult
        //debugger
       // this.echartsShiftData=res.table
        //抽离数据
        this.echartsShiftData= this.trans(res.table)
         //debugger
        //   const arrShift= res.table
        //  const arrShiftResult
        //  arrShift.forEach(element => {
        //    console.log(element)
        //  //arrShiftResult= element.shift()
        //  });
         // console.log(arrShiftResult)
        //  console.log(res.table)
         //console.log(this.echartsdata)
        
        //console.log(this.tableData)
        // let arr=[]
        // for(let i=0;i<this.tableData.length;i++){
        //   for(let j=0;j<this.tableData[i].length;j++){
        //     arr.push({})
        //   }
        // }
      }else{
        this.flag=false
        this.echartsdata1=[],//echarts组件折线图数据
      this.axis=[],
      this.echartsdata2=[],//echarts组件折线图数据
      this.tableData= [],
     this. tableData1=[],
     this. echartsShift=[],//第三部分echarts的横坐标
      this.echartsShiftData=[],
      this.avgOperationNum=0,
      this.loopsTotal=0,
      this.operationNum=0
         this.$message.warning('暂无数据，请先上传数据！');
      }
      }else{
 this.$message.error(res.msg);
      }
     
     
      console.log(res)
    },err=>{
       this.$message.error(res.msg);
      console.log(err)
    })
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
 // debugger
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background:url('../../assets/img/backgroundimg.png') no-repeat;
    background-size: cover; */
}
.contentFirst{
width: 100%;
height: 10%;
overflow: auto;
/* background-color: rebeccapurple; */
}
.contentSecond{
    width: 100%;
    height:30%;
    /* background-color: rosybrown; */
    display: flex;
}
.contentThree{
    width:100%;
    height:20%;
    /* background-color:forestgreen; */
}
.contentFour{
    width:100%;
    height:15%;
    overflow: auto;
    /* background-color: hotpink; */
}
.contentFive{
  width: 100%;
  height:25% ;
  display: flex;
  flex-direction:row ;
  /* background-color: azure; */
 
}
.cylinder1 {
  width:30%;
  height: 100%;
  overflow: hidden;
}
.cylinder2{
   width:40%;
  height: 100%;
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