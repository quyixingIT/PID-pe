<!-- echarts组件 -->
<template>
<div :id='id' ref='id' class="mycharts"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:["id","title","item","dataTime"],
data() {
//这里存放数据
return {    
  showloading:false //是否显示无数据加载狂
};
},
//监听属性 类似于data概念
computed: {
   
},
//监控data中的数据变化

//方法集合
methods: {
    my_charts(item){
      if(item == null){
        console.log("数据为空")
      }else{
  // let dataTime=this.item[0].datatime //横坐标数据
        // let data1=this.item[0].data1 //数据1
        // let data2=this.item[0].data2 //数据2
        // const title=["投运率","综合评分"]
         //以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看哈~
         //debugger
         if(item.length !=0){
      const myCharts = this.$echarts.init(document.querySelector(`#${this.id}`));
     //const ratioWeek=item
     //ratioWeek.push()
      //
     const ratioLegend=item
     var series=[];
     var effectValues=[]; ///闪烁效果
     let a,c
     let b=[]
       var color=['#c4ccd3','#91c7ae', '#61a0a8', '#d48265', '#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570'];
     //var a=["装置1","装置2"]
     let e
     let dataTime=this.dataTime
//    for(var i = 0;i<ratioWeek.length;i++){
//            series.push({
//            name: ratioLegend[i],
//            type: 'line',
//            data: ratioWeek[i],
//           itemStyle:{
//             normal:{
//               color:color[i]
//             },
//             //borderWidth:10,     
//           }
//        });
// //  if(ratioWeek[i][ratioWeek[i].length-1]<ratioWeek[i][ratioWeek[i].length-2]){
// //       // let a=ratioWeek[i][ratioWeek[i].length-1]
// //       // let b=ratioWeek[i][ratioWeek[i].length-2]
// //       // let c=dataTime[dataTime.length-1]
      
// //        e={
// //     value:ratioWeek[i][ratioWeek[i].length-1],
// //     symbolSize:30
// //         }
         
// //      // var replace = ratioWeek[i].splice(ratioWeek[i].length-1,ratioWeek[i].length-1,e); //删除一项,插入两项
// //      effectValues.push(e)
// // debugger
// //     }else{
// //        effectValues.push('')
// //     }
     
//       }
      // let sliceValue=ratioWeek.slice(-2)
     
    // debugger

 

     
    
    //  const a=this.item[0]
    //  const b=this.item
     //debugger
   let options = {
          title: { 
             text: this.title,   //图表顶部的标题 
            // subtext: ''    //副标题
            top:'10%' ,         //距离容器顶端的距离
            textStyle:{
                fontSize:14,
                color:'white'
            }
          },
          grid:{
              bottom:'12%'
          },
          tooltip: {   //鼠标悬浮框的提示文字
              trigger: 'axis',
               transitionDuration:0,
               formatter:function(p,t,callback){
                 // console.log(p)
                  let str=parseFloat((p[0].value).toFixed(2))
                 // return str
                   return p[0].name+'</br>'
                    +p[0].seriesName+':'+'&nbsp'+'&nbsp'+str+'</br>'
               }
//                 formatter: function(params, ticket, callback) {
//                  // debugger
//                   console.log(params[0].dataIndex)
//                   var flag=false
                 
// //  console.log(params)
//                              console.log(b)
//                             var res = '' + params[0].name;
                            
// //  for (var i = 0, l = params.length; i < l; i++) {
// //     if(params[0].dataIndex==6){
// // flag=false
// //    for(let j=0;j<b.length;j++){
// //                                console.log(b[j])
// //                               if(b[j]==i){
// //                                 flag=true
// //                                  res += '<br><span style="color:red;">' + params[i].seriesName + ' : ' + params[i].value + '</span>';
// //                                  break
// //                               }
                        
// //                             }
// //             if(!flag){
// //         res += '<br>' + params[i].seriesName + ' : ' + params[i].value;
// //           }
// //       }else{
// //       res += '<br>' + params[i].seriesName + ' : ' + params[i].value;
// //      }
   
                            
// //                             }
                  
                           
                           
//                             setTimeout(function() {
//                                 // 仅为了模拟异步回调
//                                 callback(ticket, res);
//                             }, 1000)
//                             return 'loading';
//                         }
            },
            
          // legend: {
          //   //data:a,
          //   data:ratioLegend,
          //   top:'5%',
          //   textStyle:{
          //     color:'white'
          //   }
          // },
          textStyle:{
            color:'white'
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : dataTime,
           /*改变x轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: 'white',
                            width: 2, //这里是为了突出显示加上的  
                        },
            //    interval: function (index) {
            //     return (index % 300 === 0) || (index === dataTime.length - 1);
            // }
                    },
                    /** 横坐标最后一个值显示 */
                    axisLabel:{
                      showMaxLabel:true,
                    }
            //  nameTextStyle:{
            //    color:'white'
            //  }
            }],
           yAxis : [{   //y轴坐标数据
              type : 'value',
              axisLabel : {
                formatter: '{value} '
              },
               /*改变y轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: 'white',
                            width: 2, //这里是为了突出显示加上的  
                        }
                    },
            }],
           series:  [{
              
              name:this.title,
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:this.item,
            
           }]
          // [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
          //   {
          //     name:"总体回路",
          //     type: "line",  //pie->饼状图  line->折线图  bar->柱状图
          //     data:this.item[0], 
          //     },
          //   {
          //     name:"关键回路",
          //     type: "line",  //pie->饼状图  line->折线图  bar->柱状图
          //     data:this.item[1],
          //     }
         // ]
          }
      //     for(var i = 0;i<ratioWeek.length;i++){
      //       if(ratioWeek[i][ratioWeek[i].length-1]<ratioWeek[i][ratioWeek[i].length-2]){
      //         b.push(i)
      //         //debugger
      //          effectValues=ratioWeek[i].slice(0)
      //          e={
      // value:effectValues.pop(),
      // symbolSize:30
      //   }
      //   //debugger
      //   effectValues.push(e)
      //        // ratioWeek[i].splice(ratioWeek[i].length-1,ratioWeek[i].length-1,e); //删除一项,插入1项

      //       }
      //     }
      //     var effectScatter = {
			// 	name : "闪动数据",
			// 	type : 'effectScatter',
			// 	coordinateSystem : 'cartesian2d',//2d坐标系
			// 	data : effectValues,
			// 	symbolOffset : [ 0, -30 ],
			// 	symbolSize : 0,
			// 	large : true,
			// 	symbol : 'circle', //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
			// 	legendHoverLink : true, //是否启用图例 hover 时的联动高亮。
			// 	hoverAnimation : true, //是否开启鼠标 hover 的提示动画效果。
			// 	effectType : 'ripple', //特效类型，目前只支持涟漪特效'ripple'。
			// 	showEffectOn : 'render', //配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
 
			// 	cursor : 'pointer',
			// 	rippleEffect : { //涟漪特效相关配置。
			// 		period : 1.5, //动画的时间。
			// 		scale : 6, //动画中波纹的最大缩放比例。
			// 		brushType : 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'。
			// 	},
			// 	hoverAnimation : true,
			// 	itemStyle : {
			// 		normal : {
			// 			color : 'red',
			// 			shadowBlur : 10,
			// 			shadowColor : '#333'
			// 		}
			// 	},
			// 	zlevel : 1
      // }
      // if(effectValues.length !==0){
      //   options.series.push(effectScatter)
      // }
      //myCharts.setOption(options);
      if (options && typeof options === "object") {
        myCharts.setOption(options, true);
        window.addEventListener("resize", () => { myCharts.resize();});
       
    }
//     if(this.showloading){
//   myCharts.showLoading({
//           text: '暂无数据',
//           color: '#ffffff',
//           textColor: '#8a8e91',
//           maskColor: 'rgba(255, 255, 255, 0.8)',
//      }
//  );
//     }
    
    }
    }
      }
      
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
       
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted(){

    this.my_charts(this.item)
   // this.my_charts(this.item1)
},
watch:{
  item:{
    handler(newVal,oldVal){
      //debugger
      let value=newVal
      //arry.push(newVal[0],[newVal[1]])
     // let arry=value.splice(2)
      if(newVal){
        this.my_charts(newVal)
      }else{
        this.showloading=true
        this.my_charts(oldVal)
      }
    }
  }
  
}

}
</script>
<style scoped>
.mycharts{
    width: 50%;
    height: 100%;
}
</style>