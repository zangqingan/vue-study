<template>
  <div>
    <div class="echarts" ref="charts"></div>
    <div class="echarts1" ref="charts1"></div>
    <div class="echarts2" ref="charts2"></div>
  </div>

</template>

<script>
import echarts from 'echarts';
export default {
  name: 'charts',
  data() { 
    return {

    }
  },
  methods: {
    initEcharts(id,options,callback){
      const Chart = echarts.init(id);
      Chart.setOption(options);
      return Chart.on('click',callback)
    }
  },
  mounted(){
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('charts'));
    // 使用ref引用
    var myChart = echarts.init(this.$refs.charts)
    var myChart1 = echarts.init(this.$refs.charts1)
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        color:["#FF6666","#99CC00","#993333","#FF0033"],
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    })
    // 绘制图表
    myChart1.setOption({
        title: {
          text: '天气情况统计',
          subtext: '子标题',
          left: 'center'
        },
        color:["#FF6666","#99CC00","#993333","#FF0033"],
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['西凉', '益州', '兖州', '荆州', '幽州']
        },
        tooltip: {},
        series: [{
            name: '销量',
            type: 'pie',
            data: [
                {value: 535, name: '荆州'},
                {value: 510, name: '兖州'},
                {value: 634, name: '益州'},
                {value: 735, name: '西凉'}
            ]
        }]
    })
    // 自定义封装方法
    let options = {
        title: {
          text: '天气情况统计',
          subtext: '子标题',
          left: 'center'
        },
        color:["#FF6666","#99CC00","#993333","#FF0033","#993333","#CC9966","#003300"],
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['西凉', '益州', '兖州', '荆州', '幽州']
        },
        tooltip: {},
        series: [{
            name: '销量',
            type: 'pie',
            data: [
                {value: 535, name: '荆州'},
                {value: 510, name: '兖州'},
                {value: 634, name: '益州'},
                {value: 735, name: '西凉'}
            ]
        }]
    }
    this.initEcharts(this.$refs.charts2,options,function(event){
      console.log(event)
    })
  }

 }
</script>

<style scoped>
.echarts{
  width: 500px;
  height: 300px;
}
.echarts1{
  width: 500px;
  height: 300px;
}
.echarts2{
  width: 500px;
  height: 300px;
}
</style>