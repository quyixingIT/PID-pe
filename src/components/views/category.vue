<!-- 分类总览页面 -->
<template>
<div style="width:100%;height:100%;overflow:hidden">
    <!-- 表单提交 -->
    <div>
        <el-form :inline="true" :model="formInline" size='mini'>
 
  <el-form-item label="单位">
    <el-select v-model="formInline.loopType1" placeholder="单位">
      <el-option label="液位" value="L"></el-option>
      <el-option label="温度" value="T"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="时间">
    <el-date-picker  type="date"
                  placeholder="选择日期"
                   :picker-options="pickerBeginDateBefore"
                    v-model="formInline.endTime"
                    >
                    </el-date-picker>
  </el-form-item>
    <el-form-item label="排序字段">
    <el-select v-model="formInline.sortName" placeholder="活动区域">
      <el-option label="性能" value="shanghai"></el-option>
      <el-option label="综合评分" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="排序方式">
    <el-select v-model="formInline.sortType" placeholder="活动区域">
      <el-option label="从高到底" value="shanghai"></el-option>
      <el-option label="从低到高" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <!-- 表格 -->
    <div class="divTable">
        <el-table
        border
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
     <el-table-column
      prop="LoopName"
      label="回路名"
       min-width='10'
     >
     
    </el-table-column>
      <el-table-column
      prop="Performance"
      label="性能"
       min-width='10'
       :filters="[{ text: '优', value: '优' }, { text: '差', value: '差' },{ text: '良', value: '良' }, { text: '中', value: '中' }, { text: '开环', value: '开环' }]"
      :filter-method="filterTag"
     >
      <template slot-scope="scope">
        <el-tag
        effect="dark" size='mini'
          :type="scope.row.Performance === '差' ? 'danger' : 'success'"
         >{{scope.row.Performance}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="CreateTime"
      label="评估时间"
       min-width='12'
       :formatter="dateFormat"
      sortable
       column-key="date"
     
    >
    </el-table-column>
   
    <el-table-column
      prop="CompositeScore"
      label="综合评分"
      min-width='10'
      sortable
      >
    </el-table-column>
   <el-table-column
      prop="Ratio"
      label="投用率（%）"
     min-width='11'
      sortable
      >
      <template slot-scope="scope">
 <span>{{scope.row.Ratio  | rounding}}</span>
 </template>
        </el-table-column>
       <el-table-column
      prop="AverageOP"
      label="OP平均值"
       min-width='10'
      sortable
      >
       <template slot-scope="scope">
 <span>{{scope.row.AverageOP  | rounding}}</span>
 </template>
    </el-table-column>
      <el-table-column
      prop="AveragePV"
      label="PV平均值"
       min-width='10'
      sortable
      >
       <template slot-scope="scope">
 <span>{{scope.row.AveragePV  | rounding}}</span>
 </template>
    </el-table-column>
      <el-table-column
      prop="AverageSP"
      label="SP平均值"
       min-width='12'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.AverageSP  | rounding}}</span>
 </template>
    </el-table-column>

     <el-table-column
      prop="VarianceOP"
      label="OP方差"
       min-width='12'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.VarianceOP  | rounding}}</span>
 </template>
    </el-table-column>
    <el-table-column
      prop="VarianceSP"
      label="SP方差"
       min-width='12'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.VarianceSP  | rounding}}</span>
 </template>
    </el-table-column>
    <el-table-column
      prop="VariancePV"
      label="PV方差"
       min-width='12'
      sortable
      >
       <template slot-scope="scope">
    <span>{{scope.row.VariancePV  | rounding}}</span>
 </template>
    </el-table-column>
    <el-table-column
      prop="OperationNum"
      label="操作数量"
       min-width='10'
      sortable
      >
       <template slot-scope="scope">
  
        <span v-if="scope.row.OperationNumIsAlarm===0" style="color: green">{{scope.row.OperationNum}}</span>
        <span v-else style="color: red">{{scope.row.OperationNum}}</span>
   
 </template>
    </el-table-column>
    <el-table-column
           label="操作"
            min-width='10'
     >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)"  type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
    class="msg-pagination-container"
     :background="isBackground"  
    @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.currentPage"
                       :page-sizes="10" :page-size="formInline.pageSize" layout=" prev, pager, next"
                       :total="total">
        </el-pagination>
    </div>
      <!-- 导入抽屉子组件 @children-handle='handleCallback'-->
    <drawer @childFn='parentFn' v-if='drawer' :drawerchildren.sync='drawer' :rowID='rowID' :title='title'></drawer>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import drawer from './drawer/drawer'
import {tabledatalist} from '../../request/category'

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
    isBackground:true, //将background设置为true便可以修改分页的背景样式
    drawer:false, //要传给子组件的数值
    title:'',
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
          index:this.getIndex()
        },
         //limit: 5,
        total: null,
        rowID: 1,
        allTableData:[],//分页前
        objStr:{

        },
        flag:false,//当点击查看时再渲染子组件
      
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
//请求表格数据
  tableDatalist(){
   //debugger
    let objStr=JSON.stringify(this.formInline)
    tabledatalist(objStr).then(res=>{
     //debugger
       this.tableData=res.loopAssessInfoList
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
     handleClick(row) {
         //this.flag=true
         this.drawer=true
         this.title=row.LoopName
        this.rowID=row.ID
       // console.log(row);
      },
      parentFn(load){
        //debugger
        this.drawer = load
      },
     onSubmit() {
        console.log('submit!');
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
  date.setDate(date.getDate()+1);//设置天数 +1 天
   let time = date.Format("yyyy-MM-dd");
  // let  endTime=time
  // this.$set(this.formInline, "snitartTime", time);
   return time
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

      dateFormat(row, column, cellValue, index){
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
this.getNowTime()
this.daysJian()
this.tableDatalist()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
//保留两位小数
filters:{
  rounding(value){
     return value.toFixed(2)
  }
},

}
</script>
<style >
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