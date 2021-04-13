<!-- 分类总览页面 -->
<template>
<div style="width:100%;height:100%;">
    <!-- 表单提交 -->
    <div style="height:4%">
        <el-form :inline="true" :model="formInline" size='mini'>
 
  <!-- <el-form-item label="单位">
    <el-select v-model="formInline.loopType1" placeholder="单位">
      <el-option label="液位" value="L"></el-option>
      <el-option label="温度" value="T"></el-option>
    </el-select>
  </el-form-item> -->
    <el-form-item label="时间">
    <el-date-picker  type="date"
                  placeholder="选择日期"
                   :picker-options="pickerBeginDateBefore"
                    v-model="formInline.endTime"
                    >
                    </el-date-picker>
  </el-form-item>
    <!-- <el-form-item label="排序字段">
    <el-select v-model="formInline.sortName" placeholder="活动区域">
      <el-option label="性能" value="shanghai"></el-option>
      <el-option label="综合评分" value="beijing"></el-option>
    </el-select>
  </el-form-item> -->
    <!-- <el-form-item label="排序方式">
    <el-select v-model="formInline.sortType" placeholder="活动区域">
      <el-option label="从高到底" value="shanghai"></el-option>
      <el-option label="从低到高" value="beijing"></el-option>
    </el-select>
  </el-form-item> -->
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <!-- 表格 -->
    <div class="divTable" ref="tableDiv"  v-show="table1Show" style="height:96%;overflow:hidden;">
        <el-table
        border
       :max-height=tableHeight
      
   @sort-change="sortHandle"
    :data="tableData"
    style="width: 100%">
    
    <el-table-column
      prop="LoopName"
      label="回路名"
       min-width='8'
     >
     
    </el-table-column>
     <el-table-column
      prop="LoopDescription"
      label="描述"
       min-width='8'
     >
     
    </el-table-column>
     <!-- :filters="[{ text: '优', value: '优' }, { text: '差', value: '差' },{ text: '良', value: '良' }, { text: '中', value: '中' }, { text: '开环', value: '开环' }]"
      :filter-method="filterTag" -->
      <el-table-column
      prop="Performance"
      label="回路性能"
       min-width='10'
         sortable="custom"
        
      
     >
      <template slot-scope="scope">
        <el-tag v-if="scope.row.Performance==='开环'"
        effect="dark" size='mini'
          type='danger'
         >{{scope.row.Performance}}</el-tag>
         <el-tag v-else-if="scope.row.Performance==='中'"
        effect="dark" size='mini'
          type="warning"
         >{{scope.row.Performance}}</el-tag>
         <el-tag v-else-if="scope.row.Performance==='差'"
        effect="dark" size='mini'
          type="danger"
         >{{scope.row.Performance}}</el-tag>
         <el-tag v-else
        effect="dark" size='mini'
          type="success"
         >{{scope.row.Performance}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="OperationNum"
      label="BDP性能"
       min-width='10'
        sortable="custom"
        
      
     >
      <template slot-scope="scope">
        <el-tag
        effect="dark" size='mini'
          :type="scope.row.OperationNum|getBindStatus"
         >{{scope.row.OperationNum |getBindText}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="CreateTime"
      label="评估时间"
       min-width='14'
       :formatter="dateFormat"
      sortable="custom"
       column-key="date"
     
    >
    </el-table-column>
   
    <!-- <el-table-column
      prop="CompositeScore"
      label="综合评分"
      min-width='10'
      sortable
      >
    </el-table-column> -->
   <el-table-column
      prop="Ratio"
      label="投用率（%）"
     min-width='13'
      sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.Ratio  | rounding}}</span>
 </template>
        </el-table-column>
        <el-table-column
      prop="EffectiveServiceFactor"
      label="有效投用率（%）"
     min-width='15'
     sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.EffectiveServiceFactor  | rounding}}</span>
 </template>
        </el-table-column>
        <el-table-column
      prop="SteadyRate"
      label="平稳率"
     min-width='11'
      sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.SteadyRate  | rounding}}</span>
 </template>
        </el-table-column>
        <el-table-column
      prop="OscillationIndex"
      label="振荡指数"
     min-width='11'
     sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.OscillationIndex  | rounding}}</span>
 </template>
        </el-table-column>
        <!-- <el-table-column
      prop="ChangeMode"
      label="Model操作数"
     min-width='15'
      sortable
      >
      <template slot-scope="scope">
 <span>{{scope.row.ChangeMode  | rounding}}</span>
 </template>
        </el-table-column> -->
        <el-table-column
      prop="ChangeSP"
      label="SP操作数"
     min-width='11'
      sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.ChangeSP  | rounding}}</span>
 </template>
        </el-table-column>
        <!-- <el-table-column
      prop="ChangeOP"
      label="OP操作数"
     min-width='11'
      sortable
      >
      <template slot-scope="scope">
 <span>{{scope.row.ChangeOP  | rounding}}</span>
 </template>
        </el-table-column> -->
        <el-table-column
      prop="ChangeTotal"
      label="总操作数"
     min-width='10'
      sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.ChangeTotal  | rounding}}</span>
 </template>
        </el-table-column>
        <el-table-column
      prop="TravelOP"
      label="OP行程"
     min-width='10'
     sortable="custom"
      >
      <template slot-scope="scope">
 <span>{{scope.row.TravelOP  | rounding}}</span>
 </template>
        </el-table-column>
       
       <!-- <el-table-column
      prop="AverageOP"
      label="OP平均值"
       min-width='11'
      sortable
      >
       <template slot-scope="scope">
 <span>{{scope.row.AverageOP  | rounding}}</span>
 </template>
    </el-table-column>
      <el-table-column
      prop="AveragePV"
      label="PV平均值"
       min-width='12'
      sortable
      >
       <template slot-scope="scope">
 <span>{{scope.row.AveragePV  | rounding}}</span>
 </template>
    </el-table-column>
      <el-table-column
      prop="AverageSP"
      label="SP平均值"
       min-width='11'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.AverageSP  | rounding}}</span>
 </template>
    </el-table-column>

     <el-table-column
      prop="VarianceOP"
      label="OP方差"
       min-width='10'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.VarianceOP  | rounding}}</span>
 </template>
    </el-table-column>
    <el-table-column
      prop="VarianceSP"
      label="SP方差"
       min-width='9'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.VarianceSP  | rounding}}</span>
 </template>
    </el-table-column>
    <el-table-column
      prop="VariancePV"
      label="PV方差"
       min-width='9'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.VariancePV  | rounding}}</span>
 </template>
    </el-table-column> -->
    <!-- <el-table-column
      prop="OperationNum"
      label="操作数量"
       min-width='10'
      sortable
      >
       <template slot-scope="scope">
  
        <span v-if="scope.row.OperationNumIsAlarm===0" style="color: green">{{scope.row.OperationNum}}</span>
        <span v-else style="color: red">{{scope.row.OperationNum}}</span>
   
 </template>
    </el-table-column> -->
    <el-table-column
           label="操作"
            min-width='5'
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)"  type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-pagination
    class="msg-pagination-container"
     :background="isBackground"  
    @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="formInline.currentPage"
                       :page-sizes="[10,50,100,150]" :page-size="formInline.pageSize" layout="sizes, prev, pager, next"
                       :total="total">
        </el-pagination>
    </div>
      <!--当无数据时显示上传数据的表格 -->
    <div v-if="table2Show"  class="divTable" v-scrollBar  style="height:95%;overflow:auto;position:relative">
    
   <el-table
     
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="LoopName"
      label="回路名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Description"
      label="描述"
      width="180">
    </el-table-column>
    
    <el-table-column
      prop="LoopType"
      label="回路类型">
    </el-table-column>
    <!-- <el-table-column
      prop="PV"
      label="PV">
    </el-table-column> -->
    <el-table-column
      prop="PV"
      label="PV"
        >
     
    </el-table-column>
    <!-- <el-table-column
      prop="SP"
      label="SP">
    </el-table-column> -->
    <el-table-column
      prop="SP"
      label="SP"
        >
      
    </el-table-column>
    <!-- <el-table-column
      prop="OP"
      label="OP">
    </el-table-column> -->
    
    <el-table-column
      prop="OP"
      label="OP"
        >
     
    </el-table-column>
    <!-- <el-table-column
      prop="Mode"
      label="Mode">
    </el-table-column> -->
<el-table-column
      prop="Mode"
      label="回路投用状态"
        >
      
    </el-table-column>
    <el-table-column
      prop="CreateTime"
      label="上传时间"
       :formatter="changeCTime"
        >
      
    </el-table-column>
  </el-table>

   <el-pagination
    class="msg-pagination-container"
     :background="isBackground"  
    @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="formInline.currentPage"
                       :page-sizes="[10,50,100,150]" :page-size="formInline.pageSize" layout="sizes, prev, pager, next"
                       :total="total">
        </el-pagination>
    </div>
      <!-- 导入抽屉子组件 @children-handle='handleCallback'-->
    <drawer @childFn='parentFn' v-if='drawer' :drawerchildren.sync='drawer' :rowID='rowID' :title='title' :describe='describe' :datetime='datetime' :performance='performance'></drawer>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import drawer from './drawer/drawer'
import {tabledatalist} from '../../request/category'
import {throttle} from '../../request/public'
import appraiseVue from './appraise.vue'
import { adduserUpdate } from '../../request/menumanage'
export default {
//import引入的组件需要注入到对象中才能使用

components: {
    drawer
},
// computed(){
//   index:sessionStorage.getItem('index')
// },
data() {
//这里存放数据
return {
  tableHeight:500 , // 自己设置高度
    isBackground:true, //将background设置为true便可以修改分页的背景样式
    drawer:false, //要传给子组件的数值
    title:'',
    describe:'',
    datetime:'',
    performance:'',
    searchFormField:{
        stockDate:this.getNowTime()
    },
    //设置禁用某些时间
     pickerBeginDateBefore:{
            disabledDate(time){
              return  time.getTime() > Date.now()
            }
        
        },
    nowDate:'',//当前时间
    tableData: [],
     endTime:'',
      formInline: {
          loopType1: '液位',
          loopType:'',
          stockDate:this.getNowTime(),
          startTime:this.daysJian(),
          endTime:this.getNowTime(),
          sortName:'',
          sortType:'',
          "currentPage":1,
          "pageSize":10,
          index:this.getIndex(),
          sort:"",
          order:""
        },
         //limit: 5,
        total: null,
        rowID: 1,
        allTableData:[],//分页前
        objStr:{

        },
        flag:false,//当点击查看时再渲染子组件
        table1Show:false, //默认第一个表格显示
        table2Show:false,//2表格表示
        // table0Key:0,
        // table1Key:1,
      
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
 
 "$route":function(to,from){
   //debugger
   let index=sessionStorage.getItem('index')
   this.formInline.index=index
   this.tableDatalist()
   //from 对象中包含当前地址
   //to 对象中包含目标地址
   //其实还有一个next参数的
//这个参数是控制路由是否跳转的
//如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
 }//欢迎加入前端全栈开发交流圈一起学习交流：864305860

},
//方法集合
methods: {
//   BDPFormat(row,clo){
//     debugger
//     if(row.OperationNum==0){
//       return "保持"
//     }else{
// return "变差"
//     }
//   },
//请求表格数据
  tableDatalist(){
   //debugger
    let objStr=JSON.stringify(this.formInline)
    tabledatalist(objStr).then(res=>{
    // debugger
    if(res.IsAssess){
      this.table2Show=false
      this.table1Show=true
      this.tableData=res.loopAssessInfoList
    }else{
      this.table1Show=false
      this.table2Show=true
      this.tableData=res.loopInfoList
    }
       
       this.total=res.total
       this.formInline.pageSize=res.pageSize
       this.currentPage=res.currentPage
      
      console.log(res)
    },err=>{
 console.log(err)
    })
  },
  /**获取index */
  getIndex(){
    //debugger
    let index=sessionStorage.getItem('index')
    return index
  },
    // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (page_size) {
              //debugger
                this.formInline.currentPage = 1; //第一页
                this.formInline.pageSize = page_size; //每页先显示多少数据
                this.tableDatalist()
                this.tableData = this.tableData.filter((item,index) => {
                    return index < page_size
                })
               // console.log(this.pagesize)  //每页下拉显示数据
            },
               handleCurrentChange: function(page){
                
                // 跳转页数
                //获取当前页
                this.formInline.currentPage=page
                console.log(this.formInline)
                this.tableDatalist()
                // let index = this.page_size * (page -1);
                // //获取总数
                // let allData = this.page_size * page;

                // let tablist=[];
                // for(let i = index;i<allData;i++) {
                //     if (this.allTableData[i]) {
                //         tablist.push(this.allTableData[i])
                //     }
                //     this.tableData = tablist
                // }

            },
            // setPaginations:function(){
            //   debugger
            //     this.total = this.allTableData.length; //数据的数量
            //     this.formInline.currentPage = 1; //默认显示第一页
            //     this.page_size = 10; //每页显示多少数据

            //     //显示数据
            //     this.tableData = this.allTableData.filter((item,index) => {
            //         return index < this.page_size;
            //     })
            // },
//点击查看
  changeCTime:function(row, column, cellValue, index) {
                if (row.CreateTime){
                    var date=row.CreateTime
                    date = new Date(date);
                    var y=date.getFullYear();
                    var m=date.getMonth()+1;
                    var d=date.getDate();
                    var h=date.getHours();
                    var m1=date.getMinutes();
                    var s=date.getSeconds();
                    m = m<10?("0"+m):m;
                    d = d<10?("0"+d):d;
                    return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
                }
            },
     handleClick(row) {
       //debugger
         //this.flag=true
         this.drawer=true
         this.title=row.LoopName
         this.describe=row.LoopDescription
         let d=this.dateFormat(row)
         this.datetime=d

         this.performance=row.Performance
        this.rowID=row.ID
       // console.log(row);
      },
      parentFn(load){
        //debugger
        this.drawer = load
      },
     onSubmit() {
        console.log(this.formInline.endTime);
        this.tableDatalist()
      },
      getNowTime() {
         Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
let date = new Date();//获取当前时间
  //date.setDate(date.getDate());//设置天数 +1 天
   //let time = date.Format("yyyy-MM-dd");
  // let  endTime=time
  // this.$set(this.formInline, "snitartTime", time);
   return date
 //var date= new Date().Format("yyyy-MM-dd");//Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")
 
  // let date = new Date();//获取当前时间
  //      var now = new Date();
  //      var year = now.getFullYear(); //得到年份
  //      var month = now.getMonth(); //得到月份
  //      var date = now.getDate(); //得到日期
  //      month = month + 1;
  //      month = month.toString().padStart(2, "0");
  //      date = date.toString().padStart(2, "0");
  //      var defaultDate = `${year}-${month}-${date}`;
  //        return defaultDate;
  //      this.$set(this.formInline, "endTime", defaultDate);
   },
   //当前时间减一天
   daysJian(){
     Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 
//var date= new Date().Format("yyyy-MM-dd");//Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")
 
  let date = new Date();//获取当前时间
  date.setDate(date.getDate()-1);//设置天数 -1 天
   let time = date.Format("yyyy-MM-dd");
   let  endTime=time
   return endTime
  
},
//时间格式化

      dateFormat(row){
        if (row.CreateTime){
                    var date=row.CreateTime
                    date = new Date(date);
                    var y=date.getFullYear();
                    var m=date.getMonth()+1;
                    var d=date.getDate();
                    var h=date.getHours();
                    var m1=date.getMinutes();
                    var s=date.getSeconds();
                    m = m<10?("0"+m):m;
                    d = d<10?("0"+d):d;
                    return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
                }
           
      },
    // resetDateFilter() {
    //     this.$refs.filterTable.clearFilter('date');
    //   },
    //   clearFilter() {
    //     this.$refs.filterTable.clearFilter();
    //   },
    //   formatter(row, column) {
    //     return row.address;
    //   },
    sortHandle:throttle(function(c){
     // debugger
     console.log(c)
       this.formInline.sort=c.prop
       let ascending="descending"
       if(c.order==null){
         this.formInline.order=ascending
       }else{
         this.formInline.order=c.order
       }
      
      this.tableDatalist()
    },1000),
//     sortHandle(c){
//       debugger
//       this.formInline.sort=c.prop
//       this.formInline.order=c.order
//       this.tableDatalist()
// //console.log(a)
// //console.log(b)
//     },
      filterTag(value, row) {
         
        return row.Performance === value;
        
      },
    //    filterName(value, row) {
    //       debugger
    //     return row.name === value;
        
    //   },
    //   filterHandler(value, row, column) {
    //     const property = column['property'];
    //     return row[property] === value;
    //   }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  //debugger
 // this.table1Show=false
  //this.table2Show=false
this.getNowTime()
//let a=this.getNowTime()
//console.log(a)
//console.log(typeof (a))
this.daysJian()
this.tableDatalist()
},
// activated(){
//   debugger
//    this.table1Show=false
//   this.table2Show=false
// },
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
 //固定表头
    this.$nextTick(function () {
      //debugger
            this.tableHeight = window.innerHeight - this.$refs.tableDiv.offsetTop - 300;
            
            // 监听窗口大小变化
            let self = this;
            window.onresize = function() {
              //debugger
                self.tableHeight = window.innerHeight - self.$refs.tableDiv.offsetTop - 300
            }
        })
        //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
　　　　 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
  
},
//保留两位小数
filters:{
  
  rounding(value){
    if(value !=undefined){
      //debugger
     return parseFloat(value.toFixed(2))
    }else{
      return value
    }
    
  },
    //tag类型
            getBindStatus(bindStatus) {
                const bindColor = {
                    0: 'success',
                    1: 'danger',
 
                };
                return bindColor[bindStatus]
            },
            //颜色名称
            getBindText(bindStatus) {
             // debugger
                const bindColor= {
                    0: '保持',
                    1: '变差',
 
                };
                return bindColor[bindStatus]
            }


},

}
</script>
<style >

 .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; 
    height: 6px; 
  }
 
  .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }

.msg-pagination-container.is-background .el-pager li {
    /*对页数的样式进行修改*/
    background-color: #10263c;
    color: #FFF;
  }
  .msg-pagination-container.is-background .btn-next {
    /*对下一页的按钮样式进行修改*/
    background-color: #10263c;
    color: #FFF;
  }
  .msg-pagination-container.is-background .btn-prev {
    /*对上一页的按钮样式进行修改*/
    background-color: #10263c;
    color: #FFF;
  }
  .msg-pagination-container.is-background .el-pager li:not(.disabled).active {
    /*当前选中页数的样式进行修改*/
    background-color: #446cff;
    color: #FFF;
  }
</style>