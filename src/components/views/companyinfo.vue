<!-- 企业信息管理页面 -->
<template>
<div>
    <div>
      <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="创建时间"
      prop="date">
    </el-table-column>
    <el-table-column
      label="企业名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="装置总数"
      prop="name">
    </el-table-column>
    <el-table-column
      label="企业联系人"
      prop="name">
    </el-table-column>
    <el-table-column
      label="企业联系方式"
      prop="name">
    </el-table-column>
    <el-table-column
      label="企业地址"
      prop="address">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
   </div>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                       :page-sizes="[1,2,5,10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination> -->
        <!-- 树形图 -->
        <div  class="custom-tree-container">
            <p>配置企业信息表</p>
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
          this.data=res.companysInfoTree
        })
      },
      renderContent(h, { node, data, store }) {
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
             <el-button
              size='mini'
              type='text'
             icon="el-icon-circle-check"
              on-click={() => this.submit(node, data)}
            >
            
            </el-button>
            {
              data.IsShow ? (
                <span>
                  <el-input
                    placeholder='请输入内容'
                    value={data.label}
                    nativeOnChange={ (e) => this.onKeyDownchange(e)}
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
    onKeyDownchange(e){
      debugger
       if(e.keyCode == 13) {
         debugger
          //事件操作
      }
    },
     Inp(value, data) {
      data.label = value
    },
      alter(node, data) {
        debugger
        if(data.IsShow){
           const info=JSON.stringify(data)
          updateCompanyinfo(info).then(res=>{
            debugger
            if(res.success){
               this.$message.success(res.msg)
            data.IsShow = !data.IsShow 
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
      editData(data){
        debugger

        },
       append(data) {
           debugger
           let id=Math.ceil(Math.random()*100); 
           this.subFlag=1
        const newChild = { id: ++id, label: 'testtest',level:++data.level,partentID:data.id, IsShow: false, children: [] };
        if (!data.children) {
         // debugger
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);

      },

      remove(node, data) {
        debugger
        deleteCompanyinfo(data).then(res=>{
          if(res.success){
         debugger
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
       
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      submit(node,data){
debugger
        this.subFlag=0
        const info=JSON.stringify(data)
          console.log(info)
        addCompanyinfo(info).then(res=>{
        if(res.success){
         debugger
       
          this.$message.success(res.msg)
          }else{
             this.$message.error(res.msg)
          }
          console.log(res)
        })

      }
    },
  }
</script>
<style>
 .custom-tree-node {
   display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>