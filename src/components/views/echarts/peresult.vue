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
props:["bdpdata","title","text"],
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

      let color=['#00ff00','#FBBD01', '#FE0001', '#d48265', '#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570'];
    let mycharts=this.$echarts.init(this.$refs.peresult)
    let echarts=this.$echarts
    let bdpValue=this.bdpdata //拿到父组件的值
    //debugger
    let title=this.title
    let flag=false //
    for(let i=0 ; i< bdpValue.length-1;i++){
      if(bdpValue[i]==0){
        flag=true
        //bdpValue[i]=1.1
       // bdpValue.splice(i,1,1.1)
      }
    }
    //debugger
   // if(bdpValue)
    let effectValues=[{
      value:bdpValue[6],
      symbolSize:15
        }]
      var effectScatter = {
				name : "闪动数据",
				type : 'scatter',
				coordinateSystem : 'cartesian2d',//2d坐标系
				data : effectValues,
				//symbolOffset : [ '100%', 0 ],
				symbolSize : 0,
				large : true,
        emphasis: {
    focus: 'series',
    blurScope: 'coordinateSystem'
    },
				symbol : 'arrow', //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
				//legendHoverLink : true, //是否启用图例 hover 时的联动高亮。
				//hoverAnimation : false, //是否开启鼠标 hover 的提示动画效果。
				//effectType : 'ripple', //特效类型，目前只支持涟漪特效'ripple'。
				//showEffectOn : 'render', //配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
        symbolRotate:'90',//箭头方响
         symbolOffset :["120%","-50%"],//箭头偏移
				cursor : 'pointer',
        label:{
          show:true,
          position:"right",
          formatter:function(params){
           // return Math.round(bdpValue[5],2)
           // return bdpValue[5].toFixed(2)
           if(title=="OP行程"){
               return parseFloat(bdpValue[5].toFixed(0))
           }else{
             return parseFloat(bdpValue[5].toFixed(2))
           }
            //11.11
          }
        },
				// rippleEffect : { //涟漪特效相关配置。
				// 	period : 1.5, //动画的时间。
				// 	scale : 6, //动画中波纹的最大缩放比例。
				// 	brushType : 'stroke', //波纹的绘制方式，可选34 'stroke' 和 'fill'。
				// },
				//hoverAnimation : true,
				itemStyle : {
					normal : {
						color : '#008b8b',
						shadowBlur : 1,
						shadowColor : '#333'
					}
				},
				zlevel : 1
      }
     
    let options = {
    title: {
        text: this.text,
         top:'2%' ,
        textStyle:{
            fontSize:12,
        },
       
        //subtext: '数据来自网络'
    },
     grid: {
         top:'20%',
        left: '2%',
        right: '20%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
          data:[this.title],
          // data: ['投用率', '有效投用率','平稳率','振荡指数','操作数','SP操作数','OP操作数','操作数总和','OP行程指数每小时'],
            show:true,
            axisTick:{ //x轴刻度线
		show:false
        },
         axisLabel:{     //加上这个强制显示
    interval: 0
  },
        axisLine:{ //x轴
    	    show:false
        },

        }
    ],
    yAxis: [
        {
            type: 'value',
            show:false,
        },
       
    ],
    series: [
        
        {
            name: '第一区域',
            type: 'bar',
            stack: '绿色',
            itemStyle:{
                 //color:color[0]
                color:function(p){
                  if(bdpValue[6]==0){
                    return color[0]
                  }else{
                    return '#90ee90'
                  }
                }
                

            },
            label:{
              show:true,
              //position: ['-110%', '80%'],
               position: "left",
               offset:[0,10],
              formatter:function(params){
                //debugger
                   if (params.value == 1.1) {
                     if(flag){
                       	return 0;
                     }
                        
                    	} else {
                        
                       if(title=="OP行程"){
               return parseFloat(bdpValue[0].toFixed(0))
           }else{
             return parseFloat(bdpValue[0].toFixed(2))
           }
                    	}
                
               
              }
            },
             emphasis: {
                focus: 'series',
                blurScope: 'global'
            },
            data: [1],
           // data:[bdpValue[0]]

        },
         {
            name: '第二区域',
            type: 'bar',
            stack: '绿色',
            emphasis: {
                focus: 'series'
            },
            itemStyle:{
               // color:color[0]
               color:function(p){
                  if(bdpValue[6]==1){
                    return color[0]
                  }else{
                    return '#90ee90'
                  }
               }
            },
            data: [1]
            //data:[bdpValue[0]]
        },
        {
            name: '第三区域',
            // yAxisIndex: 1,
            type: 'bar',
            stack: '绿色',
            emphasis: {
                focus: 'series'
            },
            itemStyle:{
                //color:color[1]
                color:function(p){
                  if(bdpValue[6]==2){
                    return color[1]
                  }else{
                    return '#FFF8DC'
                  }
                }
            },
            data: [1]
            //data:[bdpValue[0]]
        },
        {
            name: '第四区域',
            type: 'bar',
            // yAxisIndex: 2,
            stack: '绿色',
            emphasis: {
                focus: 'series'
            },
            label:{
              show:true,
              //position:'left',
               position: "left",
               offset:[0,-10], //便宜
               //position: ['-110%', '-10%'],
               formatter:function(params){
               
                   if (params.value == 1.1) {
                     if(flag){
                       	return 0;
                     }
                      	} else {
                        if(title=="OP行程"){
               return parseFloat(bdpValue[4].toFixed(0))
           }else{
             return parseFloat(bdpValue[4].toFixed(2))
           }
                    	}
                
               
              }
            },
            itemStyle:{
                //color:color[2]
                 color:function(p){
                  if(bdpValue[6]==3){
                    return color[2]
                  }else{
                    return '#FFB6C1'
                  }
                }
            },
             barMaxWidth:'30%',
            data: [1]
             //data:[bdpValue[4]]
        },
        
        // {
        //               name: '总计',
        //               type: 'bar',
        //               stack: '视频广告',
        //               label: {
        //                   normal: {
        //                       offset: ['50', '80'],
        //                       show: true,
        //                       position: 'insideBottom',
        //                       formatter: '{c}',
        //                       textStyle: {
        //                           color: '#02FCFA'
        //                       }
        //                   }
        //               },
        //               itemStyle: {
        //                   normal: {
        //                       color: 'rgba(128, 128, 128, 0)'
        //                   }
        //               },
        //               data: [330, 330, 330, 330, 330, 330, 330, 330, 330],
        //           }
       
    ]
//     // tooltip: {
//     //     trigger: 'axis',
//     //     axisPointer: {
//     //         type: 'shadow'
//     //     }
//     // },
//     // legend: {
//     //     data: ['2011年', '2012年']
//     // },
//     grid: {
//         left: '10%',
//          top:'5%',
//         bottom: '2%',
//         containLabel: false
//     },
//     xAxis: {
//         type: 'value',
//         // boundaryGap: [0, 0.01],
//         show:false
//     },
//     yAxis: {
//         type: 'category',
//         data: [ '静摩擦指数','振荡指数','有效投运率','投运率','性能指标','综合评分'  ],
//          axisLabel:{
//             interval :0,
//              color:'darkgray'
//         },
//         axisLine:{//坐标轴轴线设置
//         show:false,
       
//         },
//          axisTick:{ //坐标轴刻度设置
//              show:false
//          }
//     },
//     series: [
//                {
//             name: '2012年',
//             type: 'bar',
//             data: this.data,
//             label:{
//                  show: true,
//                 position:'right',
//                  distance:6,
//                  color:'#71C8B1'
//             },
//           itemStyle:{ //设置渐变
//   normal: {
//                 color: new echarts.graphic.LinearGradient(
//                     0, 0, 1, 1,
//                     [
//                         {offset: 0, color: '#06B5D7'},                   //柱图渐变色
//                         {offset: 0.5, color: '#44C0C1'},                 //柱图渐变色
//                         {offset: 1, color: '#71C8B1'},                   //柱图渐变色
//                     ]
//                 )
//             },
//           },
//             emphasis: {
//                 color: new echarts.graphic.LinearGradient(
//                     0, 0, 1, 1,
//                     [
//                         {offset: 0, color: '#71C8B1'},                  //柱图高亮渐变色
//                         {offset: 0.7, color: '#44C0C1'},                //柱图高亮渐变色
//                         {offset: 1, color: '#06B5D7'}                   //柱图高亮渐变色
//                     ]
//                 )
//             }
//         },

//     ]
};
 if(effectValues.length !==0){
        options.series.push(effectScatter)
      }
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