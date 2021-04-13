<!-- 3D柱状图 -->
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

};
},
//监听属性 类似于data概念
computed: {},
props:["id","title",'item'],
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
	 if(item==null){
		 
	 }else{
 // let dataTime=this.item[0].datatime //横坐标数据
        // let data1=this.item[0].data1 //数据1
        // let data2=this.item[0].data2 //数据2
        // const title=["投运率","综合评分"]
         //以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看哈~
         //debugger
       let echarts=this.$echarts
      const myCharts = this.$echarts.init(document.querySelector(`#${this.id}`));
	var xData = [this.title];
	//var loopsTotal=this.item
		var yData = [item];
		var color="#19dfdd";
		var shadowColor="#0b5767";
		var barWidth=80;
		//debugger
         if(yData[0]==0){
			 yData.splice(0,1,10.1)
		 }
    
    //  const a=this.item[0]
    //  const b=this.item
     //debugger
  var options = {
			// backgroundColor: '#05233b',
			"grid": {
				"top": "20%",
				"left": "-5%",
				"bottom": "5%",
				"right": "5%",
				"containLabel": true
			},
			animation: false,
			"xAxis": [
                {
				"type": "category",
				"data": xData,
				"axisTick": {
					"alignWithLabel": true
				},
				"nameTextStyle": {
					"color": "#82b0ec"
				},
				"axisLine": {
					show: false,
					"lineStyle": {
						"color": "#82b0ec"
					}
				},
				"axisLabel": {
					"textStyle": {
						"color": color
					},
					margin: 30
				}
			}],
			"yAxis": [{
				show: false,
				"type": "value",
				"axisLabel": {
					"textStyle": {
						"color": "#fff"
					},
				},
				"splitLine": {
					"lineStyle": {
						"color": "#0c2c5a"
					}
				},
				"axisLine": {
					"show": false
				}
			}],
			"series": [
				{
					"name": "数据上椭圆",
					type: 'pictorialBar',
					symbolSize: [barWidth, 10],
					symbolOffset: [0, -6],
					symbolPosition: 'end',
					z: 12,
					"label": {
						"normal": {
							"show": true,
							"position": "top",
							fontSize: 14,
							color: color,
							formatter:function(params,index){
								if(params.value==10.1){
									return 0
								}else{
									return params.value;
								}
								
							}
						}
					},
					color: "#2DB1EF",
					data: yData
				},
				{
					name: '下椭圆',
					type: 'pictorialBar',
					symbolSize: [barWidth, 10],
					symbolOffset: [0, 7],
					z: 12,
					"color": color,
					"data": yData
				},
				{
					type: 'bar',
					"barWidth": barWidth,
					barGap: '10%', // Make series be overlap
					barCateGoryGap: '10%',
					itemStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
									offset: 0,
									color: "rgba(25,223,221,.7)"
								},
								{
									offset: 1,
									color: "rgba(25,223,221,.3)"
								}
							]),
						},
					},
					data: yData
				},
			]
		}
      //myCharts.setOption(options);
      if (options && typeof options === "object") {
        myCharts.setOption(options, true);
        window.addEventListener("resize", () => { myCharts.resize();});
		if(this.title=="变差回路个数"){
		 myCharts.getZr().on('click', params => {
          let pointInPixel = [params.offsetX, params.offsetY]
          if (myCharts.containPixel('grid', pointInPixel)) {
            let xIndex = myCharts.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
            console.log(xIndex)
			 console.log("点击事件")
          }
        })
		}
      
    
    }
    }
	 }
       
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
	let item=this.item
this.my_charts(item)
},
}
</script>
<style scoped>
.content{
    width: 100%;
    height:100%;
}
</style>