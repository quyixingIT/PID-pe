<!-- 企业信息管理页面 -->
<template>
<div class="companyinfo">
   
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                       :page-sizes="[1,2,5,10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination> -->
        <!-- 树形图 -->
        <div  class="custom-tree-container">
            <p style="padding-left:10px;color:aliceblue">企业资产分布配置</p>
            <el-tree
            :data="data"
           
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
            draggable
          ></el-tree>
        <!-- <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
             <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="() => editData(data)">
            
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-circle-plus-outline"
            @click="() => append(data)">
            
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="() => remove(node, data)">
           
          </el-button>
        </span>
      </span>
    </el-tree> -->
        </div>
        
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {getCompanyinfo,addCompanyinfo,deleteCompanyinfo,updateCompanyinfo} from '../../request/menumanage'
 let id = 0;
 export default {
    data() {
     
      const data = [
      {
        id: 1,
        label: '公司名称',
        // IsShow: false,
        children: [
          {
            id: 4,
            label: '工厂名称',
            // IsShow: false,
            children: [
              {
                id: 9,
                label: '装置名称1',
                IsShow: false
              },
              {
                id: 10,
                label: '装置名称2',
                IsShow: false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        IsShow: false
      }
    ]
     
      return {
        editflag:false,
        subFlag:0,
        data: JSON.parse(JSON.stringify(data)),
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
    },
    created(){
      this.getcompanyinfo()
    },
    methods: {
      /** 获取初始数据 */
      getcompanyinfo(){
        getCompanyinfo().then(res=>{
          console.log(res)
          //debugger
          this.data=res.companysInfoTree
        })
      },
      renderContent(h, { node, data, store }) {
        //debugger
        if(data.level==4){
           return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
          
            <el-button
              size='mini'
              type='text'
               icon="el-icon-delete"
              on-click={() => this.remove(node, data)}
            >
             
            </el-button>
            <el-button
              size='mini'
              type='text'
             icon="el-icon-edit"
              on-click={() => this.alter(node, data)}
            >
              
            </el-button>
            
            {
              data.IsShow ? (
                <span>
                  <el-input
                    placeholder='请输入内容'
                    value={data.label}
                    nativeOnChange={ (e) => this.onKeyDownchange(e,data)}
                    onInput={ (a) => this.Inp(a, data) }
                   
                    clear>
                  </el-input>
                </span>
              ) : (
                ''
              )
            }
          </span>
        </span>
      )
        }else{
           return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button
              size='mini'
              type='text'
               icon="el-icon-circle-plus-outline"
              on-click={() => this.append(data)}
            >
             
            </el-button>
            <el-button
              size='mini'
              type='text'
               icon="el-icon-delete"
              on-click={() => this.remove(node, data)}
            >
             
            </el-button>
            <el-button
              size='mini'
              type='text'
             icon="el-icon-edit"
              on-click={() => this.alter(node, data)}
            >
              
            </el-button>
            
            {
              data.IsShow ? (
                <span>
                  <el-input
                    placeholder='请输入内容'
                    value={data.label}
                    nativeOnChange={ (e) => this.onKeyDownchange(e,data)}
                    onInput={ (a) => this.Inp(a, data) }
                   
                    clear>
                  </el-input>
                </span>
              ) : (
                ''
              )
            }
          </span>
        </span>
      )
        }
     
    },

    //      renderContent(h, { node, data, store }) {
    //     return (
    //       <span class="custom-tree-node">
    //         <span>{node.label}</span>
    //         <span>
    //           <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
    //           <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
    //         </span>
    //       </span>);
    //   },
    /** 编辑框回车事件 */
    onKeyDownchange(e,data){
     // debugger
        if(data.IsShow){
           const info=JSON.stringify(data)
          updateCompanyinfo(info).then(res=>{
            //debugger
            if(res.success){
               this.$message.success(res.msg)
            data.IsShow = !data.IsShow 
             this.$store.commit({
             type:'getmenu',
              payload:res.viewMenu
          })
            }else{
               this.$message.error(res.msg)
                data.IsShow = !data.IsShow 
            }
           
          })
        }else{
     console.log(node)
      console.log(data)
      data.IsShow = !data.IsShow
      //this.subFlag=1
        }
    },
    /**编辑 */
     Inp(value, data) {
      data.label = value
    },
    /**点击编辑按钮 */
      alter(node, data) {
       
          if(data.IsShow){
           const info=JSON.stringify(data)
          updateCompanyinfo(info).then(res=>{
           // debugger
            if(res.success){
               this.$message.success(res.msg)
            data.IsShow = !data.IsShow 
             this.$store.commit({
             type:'getmenu',
              payload:res.viewMenu
          })
            }else{
               this.$message.error(res.msg)
                data.IsShow = !data.IsShow 
            }
           
          })
          //this.editflag=false
        }else{
     console.log(node)
      console.log(data)
      data.IsShow = !data.IsShow
      //this.editflag=true
      //this.subFlag=1
        }
        
        //debugger
        
     
    },
      editData(data){
       // debugger

        },
        /**新增 */
       append(data) {
          //debugger
           let id=Math.ceil(Math.random()*100); 
           this.subFlag=1
        const newChild = { id: ++id, label: 'testtest',level:data.level+1,partentID:data.id, IsShow: false, children: [] };
        if (data.children.length==0) {
          //debugger
          this.$set(data, 'children', []);
           data.children.push(newChild);
        }else{
      data.children.push(newChild);
        }
        
  if(data.children.length !=0){
    //debugger
    let aa=data.children[data.children.length-1]
     this.subFlag=0
        const info=JSON.stringify(aa)
          console.log(info)
        addCompanyinfo(info).then(res=>{
        if(res.success){
         //debugger
       data.children[data.children.length-1].id=res.ID
          this.$message.success(res.msg)
          this.$store.commit({
             type:'getmenu',
              payload:res.viewMenu
          })
          // 更改sessionStorage中的值
          this.$store.commit('SET_ROUTES', res.routerInfoList);
          }else{
           // debugger
            data.children.pop()
             this.$message.error(res.msg)
            
          }
          console.log(res)
        })
    }
      },
/** 删除 */
      remove(node, data) {
        this.$confirm('此操作将永久删除该资产, 是否继续?','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          deleteCompanyinfo(data).then(res=>{
          if(res.success){
        // debugger
          this.$store.commit({
             type:'getmenu',
              payload:res.viewMenu
          })
        this.subFlag=1
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
          this.$message.success(res.msg)
          }else{
             this.$message.error(res.msg)
          }
        
        })
        }).catch(()=>{
          this.$message({
            type:"info",
             message: '已取消删除'
          })
        })
        //debugger
        
       
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
//       submit(node,data){
// debugger
//         this.subFlag=0
//         const info=JSON.stringify(data)
//           console.log(info)
//         addCompanyinfo(info).then(res=>{
//         if(res.success){
//          debugger
       
//           this.$message.success(res.msg)
//           }else{
//              this.$message.error(res.msg)
//           }
//           console.log(res)
//         })

//       }
    },
  }
</script>
<style lang="less">
.companyinfo{
.el-tree{
  background-color: transparent;
  color: aliceblue !important;
}
.el-tree-node__content:hover{
    background-color: rgb(70, 70, 97) !important;
  }
  .el-tree-node.is-current > .el-tree-node__content {
     background-color: rgb(130, 130, 138) !important;
  }
  
.el-button--text {
    color: aliceblue;
}

 .custom-tree-node {
   display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
 
</style>