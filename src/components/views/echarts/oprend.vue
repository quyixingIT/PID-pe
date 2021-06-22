<!-- OP趋势图 -->
<template>
<div class="piancha" id="oprend" ref="oprend"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:["data","dataOP","dateTime","colors"],
// props:{
//     dataOP:{
//         type:Array
       
//     },
//     dateTime:{
//         type:Array
//     },
//     colors:{
//       type:String
//     }
// },
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
    let mycharts=this.$echarts.init(this.$refs.oprend)
    if(this.colors=="开环"){
this.color="#91c7ae"
}else{
  this.color="#91c7ae"
}
let markData=[]
if(this.data.echartStyleListAll.length !==0){
markData=this.data.echartStyleListAll
}

 let op=this.dataOP
 let dateTime=this.dateTime
 ///debugger
   // let echarts=this.$echarts
      let options = {
        title:{
          top:'2%',
            text: 'OP趋势图',
            textStyle:{
            fontSize:12,
        }
        },
        
    tooltip:{
         //show:true,
        trigger:'axis',
        transitionDuration:0
    },
         grid: {
         left: '9%',
        top:'8%',
        bottom: '14%',
        right:"5%",
        containLabel: false,
         backgroundColor:this.color,
          show: true
    },
    xAxis: {
        type: 'category',
        data: dateTime,
         //data: dateTime,
         axisTick:{
            show:false,
        },
         
          /** 横坐标最后一个值显示 */
                    axisLabel:{
                      showMaxLabel:true,
                    }
    },
    yAxis: [
        {
        name:'OP',
         nameLocation:'center',
        type: 'value',
         nameGap:50,
        nameRotate:360,
         axisTick:{
            show:false,
        },
           min:function (value) {
    //          console.log(value.min)
    //           console.log(value.min - value.min*0.2)
    // return value.min - value.min*0.2;
    if(value.min<0){
       return (value.min + value.min*0.2).toFixed(0);
    }else{
      return (value.min - value.min*0.2).toFixed(0);
    }
},
//         max:function (value) {
//           if(value.max<0){
//       return (value.max - value.max*0.2).toFixed(0);
//     }else{
//        return (value.max + value.max*0.2).toFixed(0);
//     }
//     // return (value.max + value.max*0.2).toFixed(0);
// },
 max:function (value) {
    if(value.max<0){
      if(value.max<-5){
 return (value.max - value.max*0.2).toFixed(0);
      }else{
 return (value.max - value.max*0.2).toFixed(1);
      }
     
    }else{
      if(value.max<5){
 return (value.max + value.max*0.2).toFixed(1);
      }else{
         return (value.max + value.max*0.2).toFixed(0);
      }
       //return (value.max + value.max*0.2).toFixed(0);
    }
},
 minInterval: 1,
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
      name: "异常数据",
      type: "line",
      animation: false,
      areaStyle: {
        normal: {},
      },
      lineStyle: {
        normal: {
          width: 1,
        },
      },
      markArea: {
        silent:true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
       
        data:markData,             //判定颜色显示区域，从0-30是红色
        
      },
    },
        {
          name: 'OP',
        data: op,
         //data:sp,
        type: 'line',
         showSymbol:false,
         itemStyle:{
             color:'rgb(105,107,1)'
         },
         smooth: true,
         markArea: {
        silent:true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
        // label : {    //Y轴上的异常文字相关配置
        //   show : true, 
        //   padding : [ 5, 5, 5, 5 ],     //[ 上, 右, 下, 左 ]
        //   //backgroundColor : 'rgba(241,19,45,1)', 
        //    position: [-42, '50%'],  //[上下, 左右]
        //    fontSize :10,
        //   color : '#000',
        //   formatter : '  ' + '异常' + '  '   //文字的格式   （格式一）
        //   //formatter: function (value 或者 params 或者 value,index) {               //（格式二）
        //   //  if(value >50){
        //   //     return '正常'
        //   //  }else{
        //   //     return '异常'
        //    // }
        //  // },
          
        // }, 
        data: [             //判定颜色显示区域，从0-30是红色
          [
            {
              yAxis: "2021/3/16 0:00:00",
            },
            {
              yAxis: "2021/3/16 8:31:00",
            },
          ],
        ],
      },

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