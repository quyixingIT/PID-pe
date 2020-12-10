<!-- 表格组件 -->
<template>
<div>
    <template>
    <el-table
      style="width: 100%;"
      :data="tableData"
      :header-cell-style="discountHeaderStyle"
      >
      <el-table-column
       label="常规统计指标"
       >
   <el-table-column
      prop="name1"
       >
 
      </el-table-column>
       <el-table-column
       prop="name2"
       >
 
      </el-table-column>
       <el-table-column
       prop="name3"
        >
 
      </el-table-column>
       <el-table-column
      prop="name4"
        >
 
      </el-table-column>
       <el-table-column
        prop="name5"
       >
 
      </el-table-column>

       <el-table-column
       prop="name6"
        >
 
      </el-table-column>
       <el-table-column
       prop="name7"
       >
 
      </el-table-column>
       <el-table-column
        prop="name8"
       >
 
      </el-table-column>
       <el-table-column
       prop="name9"
       >
 
      </el-table-column>
       <el-table-column
       prop="name10"
       >
 
      </el-table-column>
      </el-table-column>
     
     </el-table>
  </template>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  tableData:[
     {
       name1:"测量值均值",
       name2:"10.496",
       name3:"测量值方差",
       name4:"4.615",
       name5:"测量值最大值",
       name6:"16.7708",
       name7:"测量值最小值",
       name8:"2.5826",
       name9:"控制偏差均值",
       name10:"-0.0065"
   }, {
       name1:"测量值均值",
       name2:"10.496",
       name3:"测量值方差",
       name4:"4.615",
       name5:"测量值最大值",
       name6:"16.7708",
       name7:"测量值最小值",
       name8:"2.5826",
       name9:"控制偏差均值",
       name10:"-0.0065"
   }, {
       name1:"测量值均值",
       name2:"10.496",
       name3:"测量值方差",
       name4:"4.615",
       name5:"测量值最大值",
       name6:"16.7708",
       name7:"测量值最小值",
       name8:"2.5826",
       name9:"控制偏差均值",
       name10:"-0.0065"
   }, {
       name1:"测量值均值",
       name2:"10.496",
       name3:"测量值方差",
       name4:"4.615",
       name5:"测量值最大值",
       name6:"16.7708",
       name7:"测量值最小值",
       name8:"2.5826",
       name9:"控制偏差均值",
       name10:"-0.0065"
   }, {
       name1:"测量值均值",
       name2:"10.496",
       name3:"测量值方差",
       name4:"4.615",
       name5:"测量值最大值",
       name6:"16.7708",
       name7:"测量值最小值",
       name8:"2.5826",
       name9:"控制偏差均值",
       name10:"-0.0065"
   }

   ]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
      //合并表头
      discountHeaderStyle({row, column, rowIndex, columnIndex}){
      
        if(rowIndex!=0){
         
          return 'display:none'
        }
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
}
</script>
<style scoped>
</style>