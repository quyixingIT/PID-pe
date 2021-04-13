<!-- 表格组件 -->
<template>
<div>
    <template>
    <el-table
      style="width: 100%;"
      :data="tableData"
      
      >
      <!-- :header-cell-style="discountHeaderStyle" -->
      <el-table-column
       label="参数"
        prop="parmarms"
       >
        </el-table-column>
    <el-table-column
       label="平均值"
        prop="avrege"
       >
       <template slot-scope="scope">
 <span>{{scope.row.avrege | rounding}}</span>
 </template>
        </el-table-column>
          <el-table-column
       label="标准差"
        prop="biao"
       >
        <template slot-scope="scope">
 <span>{{scope.row.biao | rounding}}</span>
 </template>
        </el-table-column>
          <el-table-column
       label="最小值"
        prop="min"
       >
       <template slot-scope="scope">
 <span>{{scope.row.min | rounding}}</span>
 </template>
        </el-table-column>
          <el-table-column
       label="最大值"
        prop="max"
       >
       <template slot-scope="scope">
 <span>{{scope.row.max | rounding}}</span>
 </template>
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
props:["eldata"],
data() {
//这里存放数据
return {
 tableData: [{
            parmarms: 'PV',
            avrege: this.eldata.AveragePV,
            biao: this.eldata.STDPV,
            min:this.eldata.MinPV,
            max:this.eldata.MaxPV
          }, {
            parmarms: "SP",
            avrege: this.eldata.AverageSP,
            biao: this.eldata.STDSP,
            min:this.eldata.MinSP,
            max:this.eldata.MaxSP
          }, {
           parmarms: 'OP',
            avrege: this.eldata.AverageOP,
            biao: this.eldata.STDOP,
            min:this.eldata.MinOP,
            max:this.eldata.MaxOP
          }, {
           parmarms: '偏差',
            avrege: this.eldata.AverageErrorPVSP,
            biao: this.eldata.STDErrorOPSP,
            min:this.eldata.MinErrorOPSP,
            max:this.eldata.MaxErrorOPSP,
          }]
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
      //合并表头
      // discountHeaderStyle({row, column, rowIndex, columnIndex}){
      
      //   if(rowIndex!=0){
         
      //     return 'display:none'
      //   }
      // }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
filters: {
 rounding (value) {
 let m=value.toFixed(0)
 if(m==-0){
   m=0
 }
 return m
 }
}
}
</script>
<style scoped>
</style>