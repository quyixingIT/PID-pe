<!-- 总览页面中第二个echarts累积图 -->
<template>
<div id="mycharts" ref="mycharts" class="mycharts"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props:["Ydata","data"],
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

    const mycharts=this.$echarts.init(this.$refs.mycharts)
    let option = {
    tooltip: {  //提示框
        trigger: 'axis', //触发类型 'item'|'axis'|'none'分别对应‘数据项图形触发’|‘坐标轴触发’|‘什么都不触发’
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        transitionDuration:0
    },
    legend: {
        data: ['优', '良', '中','差','开环'],
        top:0,
         textStyle:{
              color:'white'
            }
    },
    grid: {
        top:'10%',
        left: 0,
        right: '1%',
        bottom: 0,
        
        containLabel: true //grid 区域是否包含坐标轴的刻度标签。


    },
     textStyle:{
            color:'white'
          },
    xAxis: [
        {
            type: 'value',
             /*改变x轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: 'white',
                            width: 2, //这里是为了突出显示加上的  
                        }
                    },
             //data:[0,20,40,60,80,100]
             max:100
        }
    ],
    yAxis: [
        {
            type: 'category',
            show:true,
            axisTick: {
                show: false
            },
            data: this.Ydata,
             /*改变x轴颜色*/
                    axisLine: {
                        lineStyle: {
                            color: 'white',
                            width: 2, //这里是为了突出显示加上的  
                        }
                    },
        }
    ],
    series: [
        {
            name: '优',
            type: 'bar',
            stack: '总量',//实现堆积的核心
            label: {
                show: true,
                position:'insideTop',//图形的标签位置
                 distance:2   //标签与图形的距离
            },
            itemStyle:{
                color:'#06B5D7'
            },
            data: this.data[1] //[0,0,0,0]
        },
        {
            name: '良',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position:'insideTop',
                distance:2
            },
            itemStyle:{
                color:'#44C0C1'
            },
            data:this.data[2]//[0,0,0,0]
        },
        {
            name: '中',
            type: 'bar',
            stack: '总量',
             barWidth:'40%',//柱子的宽度
               //barCategoryGap :'20%',//两条柱子的间隔
            label: {
                show: true,
               position:'insideTop',
                distance:2
                //distance:0
            },
               itemStyle:{
                color:'#71C8B1'
            },
            data: this.data[3]//[0,0,0,0]
        },
         {
            name: '差',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position:'insideTop',
                distance:2
            },
            itemStyle:{
                color:'rgba(255, 25, 0, 1)'
            },
            data: this.data[4]//[1,1,1,1]
        },
         {
            name: '开环',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position:'insideTop',
                distance:2
            },
            itemStyle:{
                color:'rgba(234, 255, 0, 1)'
            },
            data: this.data[5]//[0,0,0,0]
        }
        
    ]
};
 //mycharts.setOption(option);
  if (option && typeof option === "object") {
        mycharts.setOption(option, true);
        window.addEventListener("resize", () => { mycharts.resize();});
        //window.onresize = myChart.resize // 加这行代码，没错！实现图自适应
    }
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
this.my_charts()
},
watch:{
  data:{
    handler(newVal,oldVal){
      debugger
      let value=newVal
      //arry.push(newVal[0],[newVal[1]])
     // let arry=value.splice(2)
      if(newVal){
        this.my_charts()
      }else{
        this.my_charts()
      }
    }
  }
  
}
}
</script>
<style scoped>
.mycharts{
    width:100%;
    height:100%;
}
</style>