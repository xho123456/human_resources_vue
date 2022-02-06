<template>
  <div>
    <div
        class="HelloWorld echart-box"
        id="myChart1"
        :style="{width: '1000px', height: '500px',background:'#ffffff'}"
    ></div>
  </div>
</template>

<script>
var that = this;
export default {
  data() {
    return {
      // 定义图表，各种参数
      msg: "柱状图",
      datay: [5, 10, 43, 54, 34, 32],
    };
  },
  mounted: function () {
    this.drawLine(); //按照默认值绘制图表
  },
  created() {
    this.$axios.get("findPatientAge").then((response) => {
      console.log(response);
      if (response.data.statusCode == 200) {
        this.datay.length = 0; //清空数组
        for (let i = 0; i < response.data.data.length; i++) {

        }
        console.log(this.datay);
      }
    });
  },
  watch: {
    datay: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine();
      },
      deep: true,
    },
  },
  methods: {
    drawLine() {
      // 1、基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      //2、构造图表数据
      let options = {
        title: {
          text: "年龄情况分析",
          left: "center",
          tooltip: {},
        },
        xAxis: {
          data: [
            "0~10",
            "10~20",
            "21~30",
            "31~40",
            "41~50",
            "51~60",
            "61~70",
            "71~80",
            "80以上",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "年龄",
            data: this.datay,
            type: "bar",
          },
        ],
      };
      // 3、绘制图表
      myChart.setOption(options);
    },
  },
};
</script>