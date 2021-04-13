<!-- 偏差趋势图 -->
<template>
<div class="piancha" id="piancha" ref="piancha"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:["pianchadata","title"],
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
    let mycharts=this.$echarts.init(this.$refs.piancha)
   // let echarts=this.$echarts
   let dateTime=this.pianchadata.dateTime
   let PVSPError=this.pianchadata.PVSPError
    let options = {
        title:{
          top:'2%',
            text: '偏差趋势',
            textStyle:{
            fontSize:12,
        }
        },
        
    tooltip:{
        trigger:'axis',
        transitionDuration:0
    },
         grid: {
        left: '7%',
        top:'10%',
        bottom: '10%',
        right:'0',
        containLabel: false
    },
    xAxis: {
        type: 'category',
       // data: ['03:00:00', '07:00:00', '11:00:00', '15:00:00', '19:00:00', '23:00:00'],
         data: dateTime,
         axisTick:{
            show:false,
        },
    },
    yAxis: [
        {
        name:'偏差',
         nameLocation:'center',
        type: 'value',
         nameGap:50,
        nameRotate:360,
        axisTick:{
            show:false,
        },
        // min:Min1,
        // max:Max1,
        //  splitNumber: 5,
        //  interval:(Max1-Min1)/5,
        splitLine: {
    lineStyle: {
        // 使用深浅的间隔色
        // color: ['#aaa', '#ddd']
        type:'dashed',
    }
},
         nameTextStyle:{
             color:'darkgray'
         },

    },
    
   
    
    ],
    series: [
        {
          name: '偏差',
        data: PVSPError,
         //data:sp,
        type: 'line',
         showSymbol:false,
         itemStyle:{
             color:'rgb(145,234,254)'
         },
         smooth: true
    },
    //  {
    //     name: 'PV',
    //     data: [520, 532, 501, 534, 590, 930],
    //     //data: pv,
    //     type: 'line',
    //      showSymbol:false,
    //       itemStyle:{
    //          color:'rgb(104,192,155)'
    //      },
    //      smooth: true
    // },
    
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
.piancha{
    width:100%;
    height: 100%;
}
</style>