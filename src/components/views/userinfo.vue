<template>
    <div>
        <el-button type="primary" @click="addRow(data)">新增</el-button>
        <el-table
                :data="data"
                stripe
                style="width: 100%">
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
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.UserName"></el-input>
                    <span v-if="!showEdit[$index]">{{row.UserName}}</span>

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
            <el-table-column
                    prop="UserEmail"
                    label="用户邮箱">
                <template slot-scope="{row,$index}">
                <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.UserEmail"></el-input>
                <span v-if="!showEdit[$index]">{{row.UserEmail}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="Password"
                    label="登录密码">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.Password"></el-input>
                    <span v-if="!showEdit[$index]">{{row.Password}}</span>
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini"     @click.native="handelCancel(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">取消</el-button>
                    <el-button type="warning" size="mini"     @click.native="handleUpdate(scope.$index, scope.row)"     v-if="showBtn[scope.$index]">更新</el-button>
                    <el-button
                            v-if="!showBtn[scope.$index]"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            v-if="!showBtn[scope.$index]"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row,data)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                       :page-sizes="[1,2,5,10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {getUsers,getSelectRole,updataUser,adduserUpdate,deleUserInfo} from "../../request/menumanage"
    export default {
        name: 'userinfo',
        data(){
            return {
                data:[],
                showBtn: [],//判断当前显示什么操作按钮
                showEdit:[],//判断当前行编辑框是否显示
                addFlag:false,//判断是否调用增加方法
                roleinfolist:[],//角色集合
                allTableData:[],//分页前
                limit: 5,
                total: null,
                page: 1,
                disabled:true
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
            userinfolist:function(){
                var that=this;
              getUsers().then(function (response) {
                debugger
                        console.log(response);
                        that.allTableData=response.userInfoList;
                        that.setPaginations()
                        //将数据存储到localstorage中便于取消编辑时，还原初始数据
                        localStorage.setItem('userinfoData', JSON.stringify(that.data));
                        that.items=response.data;
                        //console.log(that.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange: function (page_size) {

                this.page = 1; //第一页
                this.page_size = page_size; //每页先显示多少数据
                this.data = this.allTableData.filter((item,index) => {
                    return index < page_size
                })
                console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(page){
                // 跳转页数
                //获取当前页
                let index = this.page_size * (page -1);
                //获取总数
                let allData = this.page_size * page;

                let tablist=[];
                for(let i = index;i<allData;i++) {
                    if (this.allTableData[i]) {
                        tablist.push(this.allTableData[i])
                    }
                    this.data = tablist
                }

            },
            setPaginations:function(){
                this.total = this.allTableData.length; //数据的数量
                this.page = 1; //默认显示第一页
                this.page_size = 5; //每页显示多少数据

                //显示数据
                this.data = this.allTableData.filter((item,index) => {
                    return index < this.page_size;
                })
            },
            //获取下拉框中的角色
            getroleinfo:function(){
              var that=this;
               getSelectRole().then(function (response) {
                 debugger
                        console.log(response);
                        console.log(response.roleInfoList);
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

            //编辑
            handleEdit:function(index,row) {
                                // this.showEdit[index] = true;
                // this.showBtn[index] = true;
                this.$set(this.showEdit,index,true);
                this.$set(this.showBtn,index,true);
                this.disabled=false
            },
            //删除
            handleDelete:function(index,row,data) {
              debugger
                var that=this;
                var rows=JSON.stringify(row)
                console.log(rows)
                this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(row.UserName == null || row.UserName == "" ||row.UserName == undefined ||row.Password == null || row.Password == "" ||row.Password == undefined ||row.RoleID == null || row.RoleID == "" ||row.RoleID == undefined){
                        data.splice(index, 1);
                    }else{
                       deleUserInfo(rows).then(res=> {
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






            },
            //取消
            handelCancel:function(index,row){
                                // this.showEdit[index] = false;
                // this.showBtn[index] = false;
                this.$set(this.showEdit,index,false);
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
                }else {
                  debugger
                  var rows=JSON.stringify(row)
                    //console.log(rows)
                    // this.$message("更新成功")
                    if(!this.addFlag){
                      debugger
                       updataUser(rows).then(res=> {
                         debugger
                            console.log(res)
                            /** 将selecet下拉框设为不可编辑 */
                                this.disabled=true;
                            if (res.success){
                               that.$message.success(res.msg);
                                row.UpdateTime=currentTime;

                            } else {
                                that.$message.error(res.msg);
                                var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                                that.data=userinfoData
                            }
                            that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                        }).catch(function (error) {
                          debugger
                            that.$message.error('请求失败');
                            that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                            var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                            that.data=userinfoData
                            console.log(error);
                        });
                        this.addFlag=false
                    }else {

                       adduserUpdate(rows).then(res=> {
                         /** 将selecet下拉框设为不可编辑 */
                                this.disabled=true;
                         debugger
                            if (res.success){
                                that.$message.success(res.msg);
                                row.UpdateTime=currentTime;
                            } else {
                                that.$message.error(res.msg);
                                var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                                that.data=userinfoData
                            }


                            that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                            console.log(res);
                        }).catch(function (error) {
                            that.$message.error('请求失败');
                            that.$set(that.showEdit,index,false);
                            that.$set(that.showBtn,index,false);
                            var userinfoData=JSON.parse(localStorage.getItem("userinfoData"));
                            that.data=userinfoData
                            console.log(error);
                        });
                    }


                }
                                         },
            // 增加行
            addRow(tableData){
              //this.disabled=false
                this.addFlag=true;
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
                console.log(currentTime)
                tableData.push({ CreateTime: currentTime,UserName:'',RoleID:'',UserEmail:'',Password:'',UserSex:'',UpdateTime:''
                })
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

<style scoped>

</style>
