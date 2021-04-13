<!-- 回路管理界面 -->
<template>
<div style="width:100%;height:100%;overflow:hidden">
  <div class="about" v-scrollBar  style="height:99%;overflow:auto;position:relative">
      <el-table
        border
         highlight-current-row
    :data="tableData"
    style="width: 100%">
    
    <el-table-column
      prop="LoopName"
      label="回路名"
       min-width='8'
     >
     
    </el-table-column>
     <el-table-column
      prop="Description"
      label="描述"
       min-width='8'
     >
     
    </el-table-column>
     <el-table-column
      prop="Remark1"
      label="企业"
       min-width='8'
     >
     
    </el-table-column>
   
      <el-table-column
      prop="Remark2"
      label="工厂"
       min-width='10'
       
        
      
     >
     
    </el-table-column>
    <el-table-column
      prop="Remark3"
      label="装置"
       min-width='10'
        
        
      
     >
      
    </el-table-column>
    <el-table-column
      prop="Remark4"
      label="单元"
       min-width='10'
       
      
      
     
    >
    </el-table-column>
      <el-table-column
      prop="CreateTime"
      label="上传时间"
       min-width='10'
      :formatter="changeCTime"
      
    >
    </el-table-column>
     <el-table-column
      prop="UpdateTime"
      label="更新时间"
       min-width='10'
       :formatter="changeCTime1"
      
    >
    </el-table-column>
  <el-table-column
     
      label="操作"
      min-width='10'>
      <template slot-scope="scope">
        <el-button type="danger" size="mini" @click.native.prevent="deleteRow(scope.$index, scope.row,tableData)" >移除</el-button>
        <!-- <el-button
          @click.native.prevent="deleteRow(scope.$index, scope.row,tableData)"
          type="text"
          size="small">
          移除
        </el-button> -->
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getloopinfo,deleloopinfo} from '../../request/menumanage'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  isBackground:true,
   tableData: [], //将background设置为true便可以修改分页的背景样式
    formInline: {
        
          // stockDate:this.getNowTime(),
          // startTime:this.daysJian(),
          // // endTime:this.getNowTime(),
          // sortName:'',
          // sortType:'',
          "currentPage":1,
          "pageSize":10,
          //index:this.getIndex(),
          // sort:"",
          // order:""
        },
         //limit: 5,
        total: null,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   //格式化上传时间
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
             //格式化更新时间
            changeCTime1:function(row, column, cellValue, index) {
                if (row.UpdateTime){
                    var date=row.UpdateTime
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
  //请求表格数据
  tableDatalist(){
   //debugger
    let objStr=JSON.stringify(this.formInline)
    getloopinfo(objStr).then(res=>{
     //debugger
    if(res.loopInfoList.length !==0){
     
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
// 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (page_size) {
              debugger
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
            deleteRow:function(index,row,data){
               this.$confirm('此操作将永久删除该回路信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   let objStr=JSON.stringify(row)
              let that=this
              deleloopinfo(objStr).then(res=>{
                if(res.success){
                  data.splice(index, 1);
                  that.$message({
                                type: 'success',
                                message: res.msg
                            });
                }else{
                  that.$message({
                                type: 'error',
                                message: res.msg
                            });
                }
                 
                 //debugger
              })
              console.log(index)
              console.log(row)

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

             
            }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  this.tableDatalist()
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
/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
   background-color:rgb(127, 147, 177)
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}

</style>