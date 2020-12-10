<!-- 数据源管理 -->
<template>
<div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <!-- <el-tab-pane label="离线数据上传" :dataId="dataID" :dialogFlag="centerDialogVisible" name="third">
      <offupload></offupload>
	       </el-tab-pane>
    <el-tab-pane label="实时数据上传" :dataId="dataID" :dialogFlag="centerDialogVisible" name="second">
     <onlineload></onlineload>
      </el-tab-pane> -->
    <el-tab-pane label="指标数据上传" name="first">
      <loopinfo :dataId="dataID" @showbox="toshow"></loopinfo>
    </el-tab-pane>
   
  </el-tabs>

  <!-- 弹框 -->
  <el-dialog
  title="选择回路信息"
  :visible.sync="centerDialogVisible"
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
  :data="data"
  show-checkbox
  node-key="id"
  :check-strictly="true"

  
  @check-change="templateCheckChange"

 
  ref="templateTree"
 >
  <!-- @node-click="templateClick" -->
  <!-- :props="defaultProps" -->
</el-tree>
  </div>
    <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
    <div class="buttonStyle">
    <el-button type="primary" @click="submit">确 定</el-button>
    </div>
   
  <!-- </span> -->
</el-dialog>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import offupload from './upload/offupload'
import onlineload from './upload/onlineload'
import loopinfo from './upload/loopinfo'
import {getTree} from '../../request/download'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
  offupload,
  onlineload,
  loopinfo
},
data() {
//这里存放数据
return {
 activeName: 'first',
 centerDialogVisible: false,// 弹框标识
 dataID:'',

  data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
};
},
//监听属性 类似于data概念
computed: {
     
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  toshow(msg) {
        this.centerDialogVisible = msg;
    },
  treeData(){
    getTree().then(res=>{
    
      console.log(res)
      this.data=res.viewMenuList
    })
  },
     handleClick(tab, event) {
        console.log(tab, event);
      },
      templateCheckChange(data,checked,child){
        // debugger
      
       // this.template.checkedKeys =[data.id]
        if(checked ===true){
            this.dataID=data.id
          let arr = [data.id];

          // this.template.checkedId =data.id
           this.$refs.templateTree.setCheckedKeys([data.id])
          // this.template.checkedData =data
        }else{
            this.dataID=''
        }
        // else{
        //   if(this.template.checkedId === data.id){
        //     this.$refs.templateTree.setCheckedKeys([])
        //   }
        // }
      },
      // templateClick(data,checked,child){
      //   this.template.checkedId =data.id
      //   this.$refs.templateTree.setCheckedKeys([data.id])
      // },
    submit(){
      if(this.dataID){
      this.centerDialogVisible=false
      }else{
        this.$message.error("请选择回路归属")
      }
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.treeData()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
}
</script>
<style scoped>
.buttonStyle{
  text-align: center;
}
</style>