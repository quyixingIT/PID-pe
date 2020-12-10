<!-- 性能指标、闭环脉冲、Bode、残差自相关 -->
<template>
<div class="items">
    <!-- - 上半部分 -->
   <div class="items-top">
       <div class="item" id="capability" ref="capability"></div>
        <div class="item" id="closeloop" ref="closeloop"></div>
       </div> 
<!-- - 下半部分 -->
 <div class="items-bottom">
       <div class="item" id="bode" ref="bode"></div>
        <div class="item" id="about" ref="about"></div>
       </div> 
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
    my_charts(params,title){

    let mycharts=this.$echarts.init(params)
    let echarts=this.$echarts
    let option = {
         title:{
            text: title,//性能指标
            textStyle:{
            fontSize:12,
        },
         top:'0%'
        },
        grid: {
       left: '10%',
        top:'20%',
        bottom: '18%',
        containLabel: false
    },
    xAxis: {
        type: 'category',
        boundaryGap: false
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '20%'],
        axisLine:{
            show:false
        },
         axisTick:{
             show:false
         }
    },
    visualMap: {
        type: 'continuous',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [{
            gt: 1,
            lt: 3,
            color: 'rgba(0, 180, 0, 0.5)'
        }, {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 180, 0, 0.5)'
        }]
    },
    series: [
        {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
                color: 'green',
               
            },
            markLine: {
                symbol: ['none', 'none'],
                label: {show: false},
                data: [
                    {xAxis: 1},
                    {xAxis: 3},
                    {xAxis: 5},
                    {xAxis: 7}
                ]
            },
            areaStyle: {},
            data: [
                ['2019-10-10', 200],
                ['2019-10-12', 500],
                ['2019-10-13', 500],
                ['2019-10-14', 250],
                ['2019-10-15', 300],
                ['2019-10-16', 450],
                ['2019-10-17', 300],
                ['2019-10-18', 100]
            ]
        }
    ]
};
    mycharts.setOption(option,true)
    window.addEventListener('resize',()=>mycharts.resize())
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    let capability=this.$refs.capability
    let closeloop=this.$refs.closeloop
    let bode=this.$refs.bode
    let about=this.$refs.about
    this.my_charts(capability,"性能指标")
    this.my_charts(closeloop,"闭环脉冲响应序列")
    this.my_charts(bode,"Bode图")
    this.my_charts(about,"残差自相关")

},
}
</script>
<style scoped>
.items{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.items-top{
    width: 100%;
    height: 50%;
    display: flex;
}
.items-bottom{
    width: 100%;
    height: 50%;
    display: flex;
}
.item{
    width: 50%;
    height: 100%;
}
</style>