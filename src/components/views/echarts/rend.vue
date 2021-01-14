<!-- 综合评分趋势图 -->
<template>
<div class="rend" id="rend" ref="rend"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:{
    data:{
        type:Object
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
     //计算最大值
  function calMax(arr) {
    let max = 0;
    if(arr.length===2){
         arr.forEach((el) => {
      el.forEach((el1) => {
        if (!(el1 === undefined || el1 === '')) {
          if (max < el1) {
            max = el1;
          }
        }
      })
    })
    }else{
         
      arr.forEach((el1) => {
        if (!(el1 === undefined || el1 === '')) {
          if (max < el1) {
            max = el1;
          }
        }
      })
   
    }
   
    let maxint = Math.ceil(max / 9.5);//不让最高的值超过最上面的刻度
    let maxval = maxint * 10;//让显示的刻度是整数
    return maxval;
  }
 
  //计算最小值
  function calMin(arr) {
    let min = 0;
    if(arr.length===2){
         arr.forEach((el) => {
      el.forEach((el1) => {
        if (!(el1 === undefined || el1 === '')) {
          if (min > el1) {
            min = el1;
          }
        }
      })
    })
    }else{
         
      arr.forEach((el1) => {
        if (!(el1 === undefined || el1 === '')) {
          if (min > el1) {
            min = el1;
          }
        }
      })
  
    }
   
    let minint = Math.floor(min / 10);
    let minval = minint * 10;//让显示的刻度是整数
    return minval;
  }


    let mycharts=this.$echarts.init(this.$refs.rend)
    let echarts=this.$echarts
    let op=this.data.OP
    let sp=this.data.SP
    let pv=this.data.PV
    let dateTime=this.data.dateTime
    let Min1=calMin([sp,pv]),Min2=calMin(op)
    let Max1=calMax([sp,pv]),Max2=calMax(op)
    let options = {
        title:{
          top:'2%',
            text: '趋势图',
            textStyle:{
            fontSize:12,
        }
        },
         legend: {
        data: ['PV', 'SP','OP'],
        right: '2%',
        icon: "circle",
        top:'2%'
    },
    tooltip:{
        trigger:'axis',
        transitionDuration:0
    },
         grid: {
        left: '10%',
        top:'10%',
        bottom: '10%',
        containLabel: false
    },
    xAxis: {
        type: 'category',
        //data: ['03:00:00', '07:00:00', '11:00:00', '15:00:00', '19:00:00', '23:00:00'],
         data: dateTime,
         axisTick:{
            show:false,
        },
    },
    yAxis: [
        {
        name:'SP\n\n PV',
         nameLocation:'center',
        type: 'value',
         nameGap:50,
        nameRotate:360,
        axisTick:{
            show:false,
        },
        min:Min1,
        max:Max1,
         splitNumber: 5,
         interval:(Max1-Min1)/5,
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
     {
         name:'OP',
         nameLocation:'center',
        type: 'value',
        nameGap:40,
        nameRotate:360,
        axisTick:{
            show:false,
        },
         nameTextStyle:{
             color:'darkgray'
         },
         min:Min2,
         max:Max2,
          splitNumber: 5,
          interval:(Max2-Min2)/5,
           splitLine: {
    lineStyle: {
        // 使用深浅的间隔色
         color: 'darkgray',
        type:'dashed',
    }
},
    },
    
    ],
    series: [
        {
          name: 'SP',
        //data: [820, 932, 901, 934, 1290, 1330],
         data:sp,
        type: 'line',
         showSymbol:false,
         itemStyle:{
             color:'rgb(145,234,254)'
         },
         smooth: true
    },
     {
        name: 'PV',
        //data: [520, 532, 501, 534, 590, 930],
        data: pv,
        type: 'line',
         showSymbol:false,
          itemStyle:{
             color:'rgb(104,192,155)'
         },
         smooth: true
    },
     {
        name: 'OP',
        //data: [20, 32, 10, 34, 90, 30],
        data: op,
        type: 'line',
        yAxisIndex: 1,
         showSymbol:false,
          itemStyle:{
             color:'rgb(96,114,145)'
         },
         smooth: true
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
.rend{
    width:100%;
    height: 100%;
}
</style>