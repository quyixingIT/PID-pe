<!-- 评估结果 -->
<template>
<div id='peresult' ref="peresult" class="peresult"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    data:{
        type:Array
    }
},
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
    let mycharts=this.$echarts.init(this.$refs.peresult)
    let echarts=this.$echarts
    let options = {
    title: {
        text: '评估结果',
        textStyle:{
            fontSize:12,
        },
       
        //subtext: '数据来自网络'
    },
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'shadow'
    //     }
    // },
    // legend: {
    //     data: ['2011年', '2012年']
    // },
    grid: {
        left: '10%',
         top:'20%',
        bottom: '2%',
        containLabel: false
    },
    xAxis: {
        type: 'value',
        // boundaryGap: [0, 0.01],
        show:false
    },
    yAxis: {
        type: 'category',
        data: [ '静摩擦指数','振荡指数','有效投运率','投运率','性能指标','综合评分'  ],
         axisLabel:{
            interval :0,
             color:'darkgray'
        },
        axisLine:{//坐标轴轴线设置
        show:false,
       
        },
         axisTick:{ //坐标轴刻度设置
             show:false
         }
    },
    series: [
               {
            name: '2012年',
            type: 'bar',
            data: this.data,
            label:{
                 show: true,
                position:'right',
                 distance:6,
                 color:'#71C8B1'
            },
          itemStyle:{ //设置渐变
  normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 1,
                    [
                        {offset: 0, color: '#06B5D7'},                   //柱图渐变色
                        {offset: 0.5, color: '#44C0C1'},                 //柱图渐变色
                        {offset: 1, color: '#71C8B1'},                   //柱图渐变色
                    ]
                )
            },
          },
            emphasis: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 1,
                    [
                        {offset: 0, color: '#71C8B1'},                  //柱图高亮渐变色
                        {offset: 0.7, color: '#44C0C1'},                //柱图高亮渐变色
                        {offset: 1, color: '#06B5D7'}                   //柱图高亮渐变色
                    ]
                )
            }
        },

    ]
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
.peresult{
    width:100%;
    height:100%;
}
</style>