<!-- 操作日志 -->
<template>
<div style="width:100%;height:100%;" >
      <!-- 表单提交 -->
    <div style="height:4%">
        <el-form :inline="true" :model="formInline" size='mini'>
  
    <el-form-item label="时间">
    <el-date-picker  type="date"
                  placeholder="选择日期"
                   :picker-options="pickerBeginDateBefore"
                    v-model="formInline.endTime"
                    
                    >
                    </el-date-picker>
  </el-form-item>
   
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <!-- 表格 -->
    <div class="divTable" ref="tableDiv"  style="height:96%;overflow:hidden;">
        <el-table
        border
       :max-height=tableHeight
      
   @sort-change="sortHandle"
    :data="tableData"
    style="width: 100%">
    
    <el-table-column
      prop="UserName"
      label="操作源"
       min-width='8'
     >
     
    </el-table-column>
     <el-table-column
      prop="OperDate"
      label="时间"
       min-width='8'
        :formatter="dateFormat"
         sortable="custom"
     >
     
    </el-table-column>
     <!-- :filters="[{ text: '优', value: '优' }, { text: '差', value: '差' },{ text: '良', value: '良' }, { text: '中', value: '中' }, { text: '开环', value: '开环' }]"
      :filter-method="filterTag" -->
      <el-table-column
      prop="OperName"
      label="操作类型"
       min-width='8'
        
        
      
     >
      
    </el-table-column>
    <el-table-column
      prop="OperContent"
      label="操作内容"
       min-width='15'
      
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
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getlogList} from '../../request/menumanage'
import {throttle,getTimeInterval} from '../../request/public'
export default {
//import引入的组件需要注入到对象中才能使用

components: {},
data() {
//这里存放数据
return {
     tableHeight:500 , // 自己设置高度
    isBackground:true, //将background设置为true便可以修改分页的背景样式
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
   // endTime:'',
      formInline: {
        
          startTime:this.daysJian(),
          endTime:this.getNowTime(),
         "currentPage":1,
          "pageSize":10,
           sort:"",
          order:""
        },
         //limit: 5,
        total: null,
        rowID: 1,
        allTableData:[],//分页前
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
     tableDatalist(){
   debugger
   //let aa=this.formInline
    let objStr=this.formInline
    getlogList(objStr).then(res=>{
     //debugger
   
       this.tableData=res.operationLogList
       this.total=res.total
       this.formInline.pageSize=res.pageSize
       this.formInline.currentPage=res.currentPage
      
      console.log(res)
    },err=>{
 console.log(err)
    })
  },
   onSubmit() {
        //console.log(this.formInline.endTime);
        let endTime=this.formInline.endTime

        //this.formInline.endTime=endTime

       Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth()+1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        // "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        // "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 
//var date= new Date().Format("yyyy-MM-dd");//Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")
 
  let date = new Date();//获取当前时间
  debugger
  date.setDate(endTime.getDate()-7);//设置天数 -7 天
        let starttime=date
        this.formInline.startTime=starttime
        debugger
         //console.log(this.formInline.endTime);
          //console.log(this.formInline.startTime);
        this.tableDatalist()
      },
    getNowTime() {
         Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth()+1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        // "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        // "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
let date = new Date();//获取当前时间
 
   return date
 
 
  
   },
   //当前时间减7天
   daysJian(){
     Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth()+1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        // "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        // "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 
//var date= new Date().Format("yyyy-MM-dd");//Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")
 
  let date = new Date();//获取当前时间
  date.setDate(date.getDate()-7);//设置天数 -7 天
//    let time = date.Format("yyyy-MM-dd");
//    let  endTime=time
   return date
  
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
               

            },
  dateFormat(row){
        if (row.OperDate){
                    var date=row.OperDate
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
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
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
this.tableDatalist()
},
}
</script>
<style>
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