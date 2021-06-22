<!-- 动态圆环 -->
<template>
<div :id='id' ref='id' class="content"></div>
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
timer:null,
myCharts:null,
screenWidth: document.body.clientWidth,
dataArr1:[],
dataArr2:[],
dataArr3:[]
};
},
//监听属性 类似于data概念
computed: {},
props:["id","title","item","allloop"],
//监控data中的数据变化
watch: {
    item:{
    handler(newVal,oldVal){
      //debugger
      let value=newVal
      //arry.push(newVal[0],[newVal[1]])
     // let arry=value.splice(2)
      if(newVal>=0){
        this.my_charts(newVal)
      }else{
        this.my_charts(oldVal)
      }
    }
    }
},
//方法集合
methods: {
 my_charts(item){
     if(item){
  let nowClientWidth = document.documentElement.clientWidth;
     // debugger
      // 换算方法
      let nowSize = function (val, initWidth = 1920) {
        return val * (nowClientWidth / initWidth);
      };
        let that=this
       let echarts=this.$echarts
      this.myCharts = this.$echarts.init(document.querySelector(`#${this.id}`));
      let dataArr=[]
      let titleColor=""
      if(this.id=="cylinder1"){
          titleColor="#fc8d89";
           dataArr= [{
    // 数据项名称
    name:"保持回路个数", // '正常回路数',
    value : (this.allloop-this.item).toString(),
     itemStyle:{
        color:"rgb(103,194,58)"
    },
    //自定义特殊 tooltip，仅对该数据项有效
    // tooltip:{
    //     show:true,
    // },
    //自定义特殊itemStyle，仅对该item有效
   // itemStyle:{}
}, {
    name: '劣势回路个数',
    value: this.item.toString(),
    itemStyle:{
        color:'#fc8d89'
    },
    //  tooltip:{
    //     show:true,
    //     formatter:function(p){
    //                debugger
    //                return p.value
    //            },
    //     // axisPointer:{
    //     //     //type:"cross",
    //     //    label:{
    //     //        show:true,
               
    //     //    },
    //     // }
    // },
    }]
      }else{
          titleColor="rgba(25,223,221,.7)"
           dataArr= [{
    // 数据项名称
    name:"优",
    value :this.allloop[0].toFixed(0),
    //自定义特殊 tooltip，仅对该数据项有效
    //tooltip:{},
    //自定义特殊itemStyle，仅对该item有效
    itemStyle:{
        color:"rgb(103,194,58)"
    }
}, {
    name: '良',
    value: this.allloop[1].toFixed(0),
    itemStyle:{
        color:"rgb(133,206,97)"
    }
    },{
    name: '中',
    value: this.allloop[2].toFixed(0),
    itemStyle:{
        color:"rgb(230,162,60)"
    }},{
    name: '差',
    value: this.allloop[3].toFixed(0),
    itemStyle:{
          color:"rgb(247,137,137)"
        
    }},{
    name: '开环',
    value: this.allloop[4].toFixed(0),
    itemStyle:{
        color:"rgb(245,108,108)"
    }
    }
       ]
      }
       
    // var xData = ['回路总数'];
	// 	var yData = [500];
	// 	var color="#19dfdd";
	// 	var shadowColor="#0b5767";
	// 	var barWidth=80;
         
    
    //  const a=this.item[0]
    //  const b=this.item
     //debugger
  let options = {
   // backgroundColor: '#142468',
    title:{
        show:true,
          text: this.title ,
          subtext:this.item.toString(),
          textAlign:'center',
      
          textStyle:{
              color:titleColor,
              fontSize: 14,
              fontWeight:'bold'
          },
          z:0,
          top:'42%',
          left:'48%',
          subtextStyle:{
              fontSize:'20',
              fontWeight:'bold',
                color:titleColor
          }

    },
     tooltip: {
          show: false,
          trigger: 'item',
          alwaysShowContent: true,
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },

     

    series: [
        {
            type: 'pie',
            zlevel: 1,
            silent: true,
            /*
            radius
            饼图的半径。可以为如下类型：
            number：直接指定外半径值。
            string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
            Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
            */
            radius: ['98%', '97%'],
            hoverAnimation: false,
            color: "rgba(88,142,197,0.5)",
            // animation:false,    //charts3 no
            label: {
                normal: {
                    show: false
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [1]
        },
        {
            type: 'pie',
            zlevel: 2,
            silent: true,
            radius: ['90%', '91%'],
            startAngle: 50,
            hoverAnimation: false,
            // animation:false,    //charts3 no
            label: {
                normal: {
                    show: false
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:this._pie1()
            //data:dataArr1
        },
        {
            type: 'pie',
            zlevel: 3,
            silent: true,
            radius: ['88%', '87%'],
            label: {
                normal: {
                    show: false
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:this._pie2()
           // data:dataArr2
        },
        {
            type: 'pie',
            zlevel: 4,
            silent: true,
            radius: ['84%', '83%'],
            label: {
                normal: {
                    show: false
                },
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: this._pie3()
           // data:dataArr3
        },
        {
            type: 'pie',
            zlevel: 5,
            silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            radius: ['80%', '78%'],
            color: ["#fc8d89"],
            startAngle: 90, //起始角度，支持范围[0, 360]。
            hoverAnimation: false,
            // animation:true,    //charts3 no
            label: {
                // normal: {
                //     show: true
                // },
                //formatter:"{c}"
            },
            data: [100] //第一个值是用总数减去变差数，第二个值是变差数
        },
        {
            name: "",
            type: 'gauge',
            splitNumber: 30, //刻度数量
            min: 0,
            max: 100,
            radius: '73%', //图表尺寸
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            axisLine: {
                show: false,
                lineStyle: {
                    width: 0,
                    shadowBlur: 0,
                    color: [
                        [1, '#0dc2fe']
                    ]
                }
            },
            axisTick: {
                show: false,
                lineStyle: {
                    color: 'auto',
                    width: 2
                },
                length: 20,
                splitNumber: 5
            },
            splitLine: {
                show: true,
                length: 32,
                lineStyle: {
                    color: 'auto',
                }
            },
            axisLabel: {
                show: false
            },
            pointer: { //仪表盘指针
                show: 0,
            },
            detail: {
                show: 0,
            },
        },
        {
            name: '统计',
            type: 'gauge',
            splitNumber: 30, //刻度数量
            min: 0,
            max: 100,
            radius: '68%', //图表尺寸
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -269.9999,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 0,
                    shadowBlur: 0,
                    color: [
                        [0, '#0dc2fe'],
                        [1, '#0dc2fe']
                    ]
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#0dc2fe',
                    width: 2
                },
                length: 20,
                splitNumber: 5
            },
            splitLine: {
                show: true,
                length: 20,
                lineStyle: {
                    color: '#0dc2fe',
                }
            },
            axisLabel: {
                show: false
            },
            pointer: { //仪表盘指针
                show: 0,
            },
            detail: {
                show:false,
                borderColor: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 2,
                offsetCenter: [0, '0%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#fff',
                    fontSize: 50,
                },
                formatter: '{value}'
            },
            data: [{
                name: "",
                value: this.item
            }]
        },
        {
            type: 'pie',
            zlevel: 20,
            silent: true,
            radius: ['60%', '59%'],
            hoverAnimation: false,
            color: '#2dc0c9',
            // animation:false,
            data: [1],
            labelLine: {
                normal: {
                    show: false
                }
            }
        },
        {
            name: '中间环形图',
            type: 'pie',
            radius: ['55%', '45%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            textAlign: 'center',
            itemStyle: {
                normal: {
                    color: '#80ADD2',
                    borderColor: '#3D4268',
                }
            },
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    align: 'center',
                verticalAlign: 'middle',
                // 此处重点，字体大小设置为0
                textStyle: {
                  fontSize: '0'
                }

                },
                emphasis: {
                    show: true,
                    textStyle: {
                        //fontSize: '30',
                        fontSize:nowSize(30),
                        fontWeight: 'bold',
                        
                    },
                     // 同步样式
                formatter: function (params) {
                    //debugger
                    if(params.name=="劣势回路个数" || params.name=="保持回路个数"){
                         return `{tTitle|${params.name}}\n{tSubTitle|${params.value}}`
                    }else{
                         return `{tTitle|${params.name}}\n{tSubTitle|${params.value+"%"}}`
                    }
                 
                },
                rich: {
                  tTitle: {
                    fontSize: '14',
                    fontWeight: 'bold',
                    lineHeight: '25'
                  },
                  tSubTitle: {
                    fontSize: '20',
                    fontWeight: 'bold',
                    lineHeight: '25'
                  }
                }

                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:dataArr
        },
    ]
};
      //myCharts.setOption(options);
      if (options && typeof options === "object") {
        this.myCharts.setOption(options, true);
         this.myCharts.on('mouseover', { seriesName: '中间环形图' }, params => {
        this.myCharts.setOption({
          title: {
            show: false
          }
        })
      })

      this.myCharts.on('mouseout', { seriesName: '中间环形图' }, params => {
        this.myCharts.setOption({
          title: {
            show: true
          }
        })
      })

        window.addEventListener("resize", () => { this.myCharts.resize();});
        //给echarts增加鼠标事件 'click'，'dblclick'，'mousedown'，'mouseup'，'mouseover'，'mouseout'，'globalout'。
//      this.myCharts.on('mouseover', function(params) {
//          debugger
//    that.startTimer();
// });
 
// this.myCharts.on('mouseout', function(params) {
//    that.stopTimer();
// });
    
    }
     }

  
    
    },
     doing() {
    let option = this.myCharts.getOption();
    option.series[3].startAngle = option.series[3].startAngle - 1;
    //option.series[6].data[0].value = option.series[6].data[0].value + 1;
    this.myCharts.setOption(option);
 // this.timer = requestAnimationFrame(this.doing) 
},
 
 startTimer() {
     let that=this
    // debugger
 //let doing=this.doing()
   that.doing()
//  let that=this
//     this.timer = setInterval(function(){
//         that.doing()
//     }, 100);
 
},
 
 stopTimer() {
 //debugger
   // clearInterval(this.timer);
 
    //this.timer = null;
 
},
     _pie1() {
         //debugger
    let dataArr = [];
    for (var i = 0; i < 8; i++) {
 
        dataArr.push({
            name: (i + 1).toString(),
            value: 20,
            itemStyle: {
                normal: {
                    color: "rgba(88,142,197,0.4)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                }
            }
        })
 
    }
    return dataArr
 
},
 
 _pie2() {
    let dataArr = [];
    for (var i = 0; i < 8; i++) {
        if (i % 2 === 0) {
            dataArr.push({
                name: (i + 1).toString(),
                value: 25,
                itemStyle: {
                    normal: {
                        color: "rgba(88,142,197,0.5)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        } else {
            dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        }
 
    }
    return dataArr
 
},
 
 _pie3() {
    let dataArr = [];
    for (var i = 0; i < 100; i++) {
        if (i % 2 === 0) {
            dataArr.push({
                name: (i + 1).toString(),
                value: 25,
                itemStyle: {
                    normal: {
                        color: "rgb(126,190,255)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        } else {
            dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        }
 
    }
    return dataArr
 
},
 
 _pieData(data) {
    let _data = data;
    let dataArr = [];
    for (var i = 0; i < 5; i++) {
        if (i === 2) {
            let dt = (data[0].unit) ? 25 : (Number(data[0].value));
            dataArr.push({
                name: (i + 1).toString(),
                value: dt,
                itemStyle: {
                    normal: {
 
                        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                            offset: 0,
                            color: 'rgb(147,187,216)'
                        }, {
                            offset: 1,
                            color: '#588ec5'
                        }]),
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0.4)"
 
                    }
                }
            })
        } else {
            let dta = (data[0].unit) ? 25 : (1 - Number(data[0].value)) / 4;
            dataArr.push({
                name: (i + 1).toString(),
                value: dta,
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        borderColor: "rgba(0,0,0,0)"
                    }
                }
            })
        }
 
    }
    //console.log(dataArr)
    return dataArr
},


},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // this.dataArr1=this._pie1()
    // this.dataArr2=this._pie2()
    // this.dataArr3=this._pie3()
//     this.$nextTick(()=>{
  
// })
this.my_charts(this.item);
//let startTimer=this.startTimer()
//debugger
let that=this
//  window.onresize = function() {
//         that.myCharts.resize()
//         }

//setTimeout(that.startTimer(), 500);

 //that._pie3()
 //that.animap()
 //that.doing()
 // this.timer = setInterval(this.startTimer, 1000);
 
  
 },
beforeDestroy() {
   clearInterval(this.timer);
    //cancelAnimationFrame(this.timer)
 },
}
</script>
<style scoped>
.content{
    width: 100%;
    height:100%;
}
</style>