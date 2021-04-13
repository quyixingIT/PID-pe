<template>
    <div>
        <!-- <el-button type="primary" @click="addRow(allTableData)">新增</el-button> -->
        <el-table
                :data="allTableData"
               highlight-current-row
                style="width:100%">
            <el-table-column
                    prop="CreateTime"
                    label="创建时间"
                   :formatter="changeCTime"
            >
            
            </el-table-column>
            <el-table-column
                    prop="UserName"
                    label="登录名"
            >
                <template slot-scope="scope">
                    <el-input class="edit-cell" v-if="scope.row.ShowEdit" v-model="scope.row.UserName" @keyup.enter.native="handleUpdate(scope.$index, scope.row)"></el-input>
                    <span v-if="!scope.row.ShowEdit">{{scope.row.UserName}}</span>

                </template>
            </el-table-column>
            <el-table-column
                    prop="RoleID"
                    label="角色">
                <template slot-scope="scope">
                   <!-- <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.TrueName"></el-input> -->
                     <el-select :disabled="disabled" size="mini" v-model="scope.row.RoleID" placeholder="请选择">
                        <el-option
                                v-for="item in roleinfolist"
                                :key="item.ID"
                                :label="item.RoleName"
                                :value="item.ID">
                        </el-option>
                    </el-select>
                    <!-- <span v-else >{{row.RoleID}}</span>  -->
                     <!-- <el-select  v-model="scope.row.TrueName" placeholder="请选择">
                        <el-option
                                v-for="item in roleinfolist"
                                :key="item.RoleCode"
                                :label="item.RoleName"
                                :value="item.RoleCode">
                        </el-option>
                    </el-select> -->
                    <!-- <span v-if="!showEdit[$index]">{{row.RoleName}}</span> -->
                </template>
            </el-table-column>
            <!-- <el-table-column
                    prop="UserEmail"
                    label="用户邮箱">
                <template slot-scope="{row,$index}">
                <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.UserEmail"></el-input>
                <span v-if="!showEdit[$index]">{{row.UserEmail}}</span>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="Password"
                    label="登录密码">
                <template slot-scope="scope">
                    <el-input :disabled="editDisable" class="edit-cell" v-if="scope.row.ShowEdit" v-model="scope.row.Password" @keyup.enter.native="handleUpdate(scope.$index, scope.row)"></el-input>
                    <span v-if="!scope.row.ShowEdit">{{scope.row.Password}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column
                    prop="UserSex"
                    label="用户性别"
                 
                    >
                <template slot-scope="{row,$index}">
                <el-input class="edit-cell" v-model="row.UserSex" v-if="showEdit[$index]"></el-input>
                <span v-if="!showEdit[$index]">{{row.UserSex ===1? '男':'女'}}</span>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="UpdateTime"
                    label="最近修改时间"
                  
            >
            <template slot-scope="scope">{{scope.row.UpdateTime| dateYMDHMSFormat}}</template>
            </el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
        <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addRow(allTableData,scope)">新增</el-button>

      </template>

                <template slot-scope="scope">
                    <!-- <el-dropdown trigger="click">
                        <el-button type="text" size="mini">操作
                             <i class="el-icon-arrow-down el-icon--right"></i>
                           </el-button>
                           <el-dropdown-menu slot="dropdown" v-if="!showBtn[scope.$index]">
                             <el-dropdown-item>
                               <el-button @click="handleDelete(scope.$index, scope.row,allTableData)" class="btn-text-red" type="text" size="mini"
                                          icon="el-icon-delete">删除
                               </el-button>
                             </el-dropdown-item>
                             <el-dropdown-item>
                               <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="mini" icon="el-icon-edit">编辑</el-button>
                             </el-dropdown-item>
                             
                           </el-dropdown-menu>

                             <el-dropdown-menu slot="dropdown"  v-if="showBtn[scope.$index]">
                             <el-dropdown-item>
                               <el-button @click.native="handelCancel(scope.$index, scope.row)" class="btn-text-red" type="text" size="mini"
                                          icon="el-icon-delete">取消
                               </el-button>
                             </el-dropdown-item>
                             <el-dropdown-item>
                               <el-button @click.native="editMenu(scope.$index, scope.row)"  type="text" size="mini" icon="el-icon-edit">菜单权限</el-button>
                             </el-dropdown-item>
                             <el-dropdown-item>
                               <el-button @click.native="handleUpdate(scope.$index, scope.row)"   class="btn-text-red" type="text" size="mini"
                                          icon="el-icon-delete">保存
                               </el-button>
                             </el-dropdown-item>
                           </el-dropdown-menu>
                    </el-dropdown> -->

                    <el-button type="danger" size="mini"     @click.native="handelCancel(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">取消</el-button>
                     <el-button type="success" size="mini"     @click.native="editMenu(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">菜单权限</el-button>
                    <el-button type="warning" size="mini"     @click.native="handleUpdate(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">更新</el-button>
                    <el-button
                            v-if="!showBtn[scope.$index]"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            v-if="!showBtn[scope.$index]"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row,allTableData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
         class="msg-pagination-container"
     :background="isBackground" 
         @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                       :page-sizes="[10,100]" :page-size="limit" layout="sizes, prev, pager, next"
                       :total="total">
        </el-pagination>
 <!-- 弹框 -->
 
 <el-dialog
  title="配置菜单权限"
  :visible.sync="editMenuFlag"
  width="40%"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :show-close="false"
  
  center>
  <!-- <span>需要注意的是内容是默认不居中的</span> -->
  <!-- :default-checked-keys="[5]" -->
    <!-- :default-expanded-keys="expandedKeys" -->
  <div>
    <el-tree
  :data="treeData"
  show-checkbox
  node-key="id"
   default-expand-all
  
  ref="templateTree"
 >
  <!-- @node-click="templateClick" -->
  <!-- :props="defaultProps" -->
</el-tree>
  </div>
    
    <div class="buttonStyle">
      <el-button  @click="editMenuFlag = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
    </div>
   
  <!-- </span> -->
</el-dialog>
 </div>
 

   
</template>

<script>
import {getUsers,getSelectRole,updataUser,adduserUpdate,deleUserInfo} from "../../request/menumanage"
import {getuserInfoTree} from '../../request/download'
    export default {
        name: 'userinfo',
        data(){
            return {
                editDisable:true,//密码框不可编辑
                isBackground:true, //将background设置为true便可以修改分页的背景样式
                data:[],
                treeData:[],
                showBtn: [],//判断当前显示什么操作按钮
                showEdit:[],//判断当前行编辑框是否显示
                addFlag:false,//判断是否调用增加方法
                roleinfolist:[],//角色集合
                allTableData:[],//分页前
                limit: 5,
                total: null,
                page: 1,
                disabled:true,
                editMenuFlag:false,//弹框标识
                treeParmas:[], //传递给后端的树数据
                treeFlag:false, //新增用户时判断用户是否配置过菜单
                 formInline: {
        
          "currentPage":1,
          "pageSize":10,
        
        },
            }

        },
        mounted(){
         this.userinfolist()
            this.getroleinfo()
        },
        beforeDestroy(){
            localStorage.removeItem('userinfoData');
        },

        methods:{
          /** 对表格中的性别进行处理 */
//    sexFormat(r,p) {
//     // for (let i = 0; i < this.groups.length; i++) {
//     //    if (group == this.groups[i].code) {
//     //        return this.groups[i].name;
//     //    }
//     // }
//     debugger  
//         if(r.UserSex===1){
//        r.UserSex="男"
//         }else{
//           r.UserSex="女"
//         }
//   return
// },
gettreeData(){
    getuserInfoTree().then(res=>{
    
      console.log(res)
      this.treeData=res.viewMenuList
    })
  },
            userinfolist:function(){
                var that=this;
                let objStr=JSON.stringify(that.formInline)
              getUsers(objStr).then(function (response) {
               // debugger
               console.log("用户信息");
                        console.log(response);
                        that.allTableData=response.userInfoList;
                         that.total=response.total
                        that.formInline.pageSize=response.pageSize
                        that.currentPage=response.currentPage
                        //that.setPaginations()
                        //将数据存储到localstorage中便于取消编辑时，还原初始数据
                        localStorage.setItem('userinfoData', JSON.stringify(that.allTableData));
                        that.items=response.userInfoList;
                        //console.log(that.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange: function (page_size) {
                 this.formInline.currentPage = 1; //第一页
                this.formInline.pageSize = page_size; //每页先显示多少数据
                this.userinfolist()
                this.allTableData = this.allTableData.filter((item,index) => {
                    return index < page_size
                })
                
                // this.page = 1; //第一页
                // this.page_size = page_size; //每页先显示多少数据
                // this.data = this.allTableData.filter((item,index) => {
                //     return index < page_size
                // })
                // console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(page){
                 this.formInline.currentPage=page
                console.log(this.formInline)
                this.userinfolist()
                // 跳转页数
                //获取当前页
                // let index = this.page_size * (page -1);
                // //获取总数
                // let allData = this.page_size * page;

                // let tablist=[];
                // for(let i = index;i<allData;i++) {
                //     if (this.allTableData[i]) {
                //         tablist.push(this.allTableData[i])
                //     }
                //     this.data = tablist
                // }

            },
            setPaginations:function(){
                this.total = this.allTableData.length; //数据的数量
                this.page = 1; //默认显示第一页
                this.page_size = 10; //每页显示多少数据

                //显示数据
                this.data = this.allTableData.filter((item,index) => {
                    return index < this.page_size;
                })
            },
            //获取下拉框中的角色
            getroleinfo:function(){
              var that=this;
               getSelectRole().then(function (response) {
                // debugger
                        //console.log(response);
                        //console.log(response.roleInfoList);
                        that.roleinfolist=response.roleInfoList
                         //that.data=response.roleInfoList;
                        // //将数据存储到localstorage中便于取消编辑时，还原初始数据
                        // localStorage.setItem('userinfoData', JSON.stringify(that.data));
                        // // that.items=response.data;
                        // //console.log(that.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
        //编辑菜单权限
        editMenu:function(index,row){
            this.gettreeData()
            this.editMenuFlag=true
            
        },
     getSimpleCheckedNodes(store) {
      // 定义数组
      const checkedNodes = []
      // 判断是否为全选，若为全选状态返回被全选的节点，不为全选状态正常返回被选中的节点
      const traverse = function(node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes
          childNodes.forEach(child => {
            if (child.checked) {
          checkedNodes.push(child.data)
            }
          if (child.indeterminate) {
          traverse(child)
            }
          })
        }
      traverse(store)
      return checkedNodes
    },

        //弹框数据提交
        submit:function(){
           // debugger
            this.editMenuFlag=false;
            this.treeFlag=true;
         //console.log(this.$refs.templateTree.getCheckedNodes());
         //this.treeParmas=JSON.stringify(this.getSimpleCheckedNodes(this.$refs.templateTree.store))
         this.treeParmas=this.getSimpleCheckedNodes(this.$refs.templateTree.store) // tree为组件定义的ref
         console.log(this.treeParmas)
        //let par=JSON.stringify(this.treeParmas)
         //console.log( this.getSimpleCheckedNodes(this.$refs.templateTree.store));
        },
         
            //编辑
            handleEdit:function(index,row) {
                 this.editDisable=true //密码框不可编辑
                                 //this.showEdit[index] = true;
                // this.showBtn[index] = true;
                //
               // debugger
                //this.$set(this.showEdit,index,true);
                row.ShowEdit=1
                this.$set(this.showBtn,index,true);
                this.disabled=false
            },
            //删除
            handleDelete:function(index,row,data) {
              //debugger
                var that=this;
                var rows=JSON.stringify(row)
                console.log(rows)
                if(row.ID== 1){
                    this.$confirm(row.UserName+"为超级管理员，不能删除!!!","提示",{
                          confirmButtonText: '确定',
                          showCancelButton:false,
                           type: 'warning'
                    }).then(()=>{

                    })
                }else{
                     this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(row.UserName == null || row.UserName == "" ||row.UserName == undefined ||row.Password == null || row.Password == "" ||row.Password == undefined ||row.RoleID == null || row.RoleID == "" ||row.RoleID == undefined){
                        data.splice(index, 1);
                    }else{
                       deleUserInfo(rows).then(res=> {
                          // debugger
                            data.splice(index, 1);
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(function (error) {
                            that.$message.error('删除失败');
                            console.log(error);
                        });
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                }
               






            },
            //取消
            handelCancel:function(index,row){
                                // this.showEdit[index] = false;
                // this.showBtn[index] = false;
                //this.$set(this.showEdit,index,false);
                 row.ShowEdit=0
                this.$set(this.showBtn,index,false);
                this.userinfolist()
              //var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));

              //this.data=userinfoData
                this.addFlag=false
                /** 用户取消编辑应将selecet设为不可编辑状态 */
                this.disabled=true

            },
            //更新
            handleUpdate:function(index,row){
                debugger
                 var rows=JSON.stringify(row)
                  let par=JSON.stringify(this.treeParmas)
                  //debugger
                 var currentTime=
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate() +
                    " " +
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes()
                var that=this;
                if (row.UserName == null || row.UserName == "" ||row.UserName == undefined) {
                    this.$alert('登录名不能为空！！！', '温馨提示', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //     debugger;
                        //     this.$message({
                        //         type: 'info',
                        //         message: `111: ${ 1111 }`
                        //     });
                        // }
                    });
                } else if (row.RoleID == null || row.RoleID == "" ||row.RoleID == undefined) {
                    this.$alert('角色不能为空！！！', '温馨提示', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //     this.$message({
                        //         type: 'info',
                        //         message: `111: ${ 1111 }`
                        //     });
                        // }
                    });
                }else if (row.Password == null || row.Password == "" ||row.Password == undefined) {
                    this.$alert('密码不能为空！！！', '温馨提示', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //     this.$message({
                        //         type: 'info',
                        //         message: `111: ${ 1111 }`
                        //     });
                        // }
                    });
                }else{
                     if(!this.addFlag){
                
                     // debugger
                      //par=null
                       updataUser(rows,par).then(res=> {
                         debugger
                          //var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                            console.log(res)
                            /** 将selecet下拉框设为不可编辑 */
                                this.disabled=true;
                                this.addFlag=false
                                this.treeFlag=false
                            if (res.success){
                               that.$message.success(res.msg);
                                row.UpdateTime=currentTime;
                                row.ShowEdit=0
                               // that.allTableData=userinfoData
                               //that.$set(that.allTableData,index,false);
                            } else {
                                that.$message.error(res.msg);
                                var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                                that.allTableData=userinfoData
                            }
                           // that.$set(that.showEdit,index,false);
                            //row.ShowEdit=true
                            //that.userinfolist()
                             //that.$set(that.showBtn,index,false);
                            that.$set(that.showBtn,index,false);
                        }).catch(function (error) {
                          //debugger
                            that.$message.error('请求失败');
                            //that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                            var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                            that.allTableData=userinfoData
                            console.log(error);
                        });
                        //this.addFlag=false
                   
                      
                    


                
            }else{
                //let aa=this.treeFlag.length 
               // debugger
                /** 如果是新增状态下 */
    if (!this.treeFlag) {
                    this.$alert('请配置菜单权限！！！', '温馨提示', {
                        confirmButtonText: '确定',
                        // callback: action => {
                        //     debugger;
                        //     this.$message({
                        //         type: 'info',
                        //         message: `111: ${ 1111 }`
                        //     });
                        // }
                    }).then(()=>{

                    })
                }else{
                     adduserUpdate(rows,par).then(res=> {
                         debugger
                         /** 将selecet下拉框设为不可编辑 */
                         // var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                                this.disabled=true;
                                this.treeFlag=false; //关闭弹框
                                 this.addFlag=false //是否新增
                         //debugger
                            if (res.success){
                                that.$message.success(res.msg);
                                row.UpdateTime=currentTime;
                                debugger
                                row.ShowEdit=0
                                let a=row
                                 this.$set(that.allTableData,that.allTableData.length-1,row);
                                //that.allTableData=userinfoData
                            } else {
                                that.$message.error(res.msg);
                                var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                                that.allTableData=userinfoData
                            }
                           // index //插入的下表,一般为table.lenth即表尾
                            
                           // that.allTableData=userinfoData
                            //that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                            console.log(res);
                        }).catch(function (error) {
                            that.$message.error('请求失败');
                            //that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                            var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                            that.allTableData=userinfoData
                            console.log(error);
                        });
                }
                
            }
                }
               // debugger
                //非新增状态下
           
               
                                         },
            // 增加行
            addRow(allTableData,scop){
               // debugger
                this.editDisable=false
              //this.disabled=false
                 this.addFlag=true;
                 // this.treeFlag=true
                //    this.$set(this.showEdit,index,true);
                // this.$set(this.showBtn,index,true);
                // this.disabled=false
                 //row.ShowEdit=true
               // this.$set(this.showBtn,index,true);
                this.disabled=false
                var currentTime=
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate() +
                    " " +
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes()
               // console.log(currentTime)
                allTableData.push({ CreateTime: currentTime,UserName:'',RoleID:'',UserEmail:'',Password:'',UserSex:'',UpdateTime:'',ShowEdit:1
                })
                this.$set(this.showBtn,allTableData.length-1,true);
               
                //  this.$set(this.showEdit,scop.$index,true);
                // this.$set(this.showBtn,scop.$index,true);
                //   this.showEdit[scop.$index] = true;
                // this.showBtn[scop.$index] = true;
            },
            //格式化时间
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
            changeUTime:function(row, column, cellValue, index) {
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
                           }
        },


    };
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
  }.msg-pagination-container.is-background .el-pager li {
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
 .buttonStyle{
  text-align: center;
}
.el-dialog__header {
  background: #222344 !important;
  /* color: aliceblue !important; */

}
.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #dadee8;
}
.el-dialog{
  background: #2c2f8a !important;

}
 .el-tree{
  background-color: transparent;
  color: aliceblue !important;
}
.el-tree-node__content:hover{
    background-color: rgb(70, 70, 97) !important;
  }
  .el-tree-node.is-current > .el-tree-node__content {
     background-color: rgb(70, 70, 97) !important;
  }
  
.el-button--text {
    color: aliceblue;
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
/* .el-dropdown-menu{
    background-color: transparent;
} */
</style>
