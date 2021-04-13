<!-- 散点图 -->
<template>
<div class="scatter" id="scatter" ref="scatter"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:["scatterdata","title"],
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   my_charts(){
    let mycharts=this.$echarts.init(this.$refs.scatter)
   // let echarts=this.$echarts
   let OPPVValue=this.scatterdata.OPPVValue
    let options = {
        title:{
          top:'2%',
            text: 'PV-OP双标图',
            textStyle:{
            fontSize:12,
        }
        },
          grid: {
        left: '34%',
        top:'10%',
        bottom: '10%',
        containLabel: false
    },
    xAxis: {
        name:'OP',
        // nameLocation:'right',
        type: 'value',
        //  nameGap:50,
        // nameRotate:360,
         axisTick:{
            show:false,
        },
         nameTextStyle:{
             color:'darkgray'
         },
         splitLine: {
         show:false
},
    },
    yAxis: {
        name:'PV',
         nameLocation:'center',
        type: 'value',
         nameGap:50,
        nameRotate:360,
         axisTick:{
            show:false,
        },
        nameTextStyle:{
             color:'darkgray'
         },
         splitLine: {
    lineStyle: {
        // 使用深浅的间隔色
        // color: ['#aaa', '#ddd']
        type:'dashed',
    }
},
    },
    series: [{
        symbolSize: 10,
        data:OPPVValue,
        type: 'scatter'
    }]
};
 mycharts.setOption(options,true)
    window.addEventListener('resize',()=>mycharts.resize())

    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.my_charts()
},
}
</script>
<style scoped>
.scatter{
    width: 100%;
    height:100%
}
</style>