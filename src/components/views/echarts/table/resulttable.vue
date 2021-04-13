<!-- 结果表格组件 -->
<template>
<div>
    <template>
    <el-table
      style="width: 100%;"
      :data="tableData"
      
      >
      <!-- :header-cell-style="discountHeaderStyle" -->
      <el-table-column
       label="指标"
        prop="parmarms"
       >
        </el-table-column>
    <el-table-column
       label="统计值"
        prop="avrege"
       >
       <template slot-scope="scope">
 <span>{{scope.row.avrege}}</span>
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
props:["resultdata"],
data() {
//这里存放数据
return {
 tableData: [{
            parmarms: '回路投用率',
            avrege: parseFloat(this.resultdata.Ratio.toFixed(2))+"%",
            biao: '15.63',
            min:'10491.16',
            max:'10629.97'
          },   {
            parmarms: '振荡周期(min)',
            avrege: parseFloat(this.resultdata.OscillationPeriod.toFixed(0)),
            biao: '0',
            min:'10560.16',
            max:'10629.97'
          }, {
           parmarms: '模式变化总数',
            avrege: this.resultdata.ChangeMode,
            biao: '15.63',
            min:'-69.97',
            max:'0.97'
          },
          {
           parmarms: 'OP行程',
            avrege: this.resultdata.TravelOP.toFixed(0),
            biao: '15.63',
            min:'-69.97',
            max:'0.97'
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
 return value.toFixed(0)
 }
}
}
</script>
<style scoped>
</style>