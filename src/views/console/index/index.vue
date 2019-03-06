<template>
  <div class="wrapper">
    <span>echarts测试数据</span>
    <!--<console-chartson title='儿子' :selected='selected'></console-chartson>-->
    <div class="charts">
      <div id="myChart" :style="{width:'300px',height:'300px'}"></div>
    </div>
  </div>
</template>

<script>
  import chartson from 'com/console/chartson.vue'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.drawLine();
      // console.log(this.$el,"el")
      this.async1();
      new Promise(function(resolve){
        console.log('promise1')
        resolve();
      }).then(function(){
        console.log('promise2')
      })
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
      //https://juejin.im/entry/5b0e78d46fb9a00a23649d50
      async async1(){
        console.log('async1 start')
        await this.async2()
        console.log('async1 end')
      },
      async async2(){
        console.log('async2 start')
      },
    },
    components:{
      'chartson':chartson,
    },
  }
</script>

