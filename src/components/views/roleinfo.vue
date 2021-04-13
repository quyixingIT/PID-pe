<!-- 角色管理 -->
<template>
<div style="width:100%;height:100%">
  <div id="main" style="width:100%;height:100%"></div>
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

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
mycharts:function(){
  var chartDom = document.getElementById('main');
var myChart = this.$echarts.init(chartDom);
//document.querySelector(`#${this.id}`)
var option;
var color=["#91cc75","#ee6666","#fac858"]
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {
        data: ['优', '良', '中', '差', '开环'],
        textStyle:{
          color:"white"
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
        {
            name: '优',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
             itemStyle:{
                color:color[0]
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '良',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
             itemStyle:{
                color:color[0]
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '中',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
             itemStyle:{
                color:color[0]
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '差',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
             itemStyle:{
                color:color[1]
            },
            emphasis: {
                focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '开环',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
             itemStyle:{
                color:color[2]
            },
            emphasis: {
                focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
};

option && myChart.setOption(option);
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.mycharts()
},
}
</script>
<style scoped>
</style>
  