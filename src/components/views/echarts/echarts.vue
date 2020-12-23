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
  
};
},
//监听属性 类似于data概念
computed: {
   
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    my_charts(item){
        // let dataTime=this.item[0].datatime //横坐标数据
        // let data1=this.item[0].data1 //数据1
        // let data2=this.item[0].data2 //数据2
        // const title=["投运率","综合评分"]
         //以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看哈~
         //debugger
         if(item.length !=0){
      const myCharts = this.$echarts.init(document.querySelector(`#${this.id}`));
     const ratioWeek=item[0] //
     const ratioLegend=item[1]
     var series=[];
     //var a=["装置1","装置2"]
   for(var i = 0;i<ratioWeek.length;i++){
    
        series.push({
           name: ratioLegend[i],
           type: 'line',
           data: ratioWeek[i]
       });
     
      }
         
    
    //  const a=this.item[0]
    //  const b=this.item
     //debugger
   let options = {
          title: { 
             text: this.title,   //图表顶部的标题 
            // subtext: ''    //副标题
            top:'20%' ,         //距离容器顶端的距离
            textStyle:{
                fontSize:14
            }
          },
          grid:{
              bottom:'12%'
          },
          tooltip: {   //鼠标悬浮框的提示文字
              trigger: 'axis',
               transitionDuration:0
            },
          legend: {
            //data:a,
            data:ratioLegend,
            top:'15%'
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : this.dataTime
            }],
           yAxis : [{   //y轴坐标数据
              type : 'value',
              axisLabel : {
                formatter: '{value} '
              }
            }],
           series: series 
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
      //myCharts.setOption(options);
      if (options && typeof options === "object") {
        myCharts.setOption(options, true);
        window.addEventListener("resize", () => { myCharts.resize();});
       
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
      let arry=value.splice(2)
      if(newVal){
        this.my_charts(arry)
      }else{
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