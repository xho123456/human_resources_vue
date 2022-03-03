<template>

  <div class="demo-date-picker" style="width: 100%;height: 49px;">


  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">本月员工加班总小时</span>
      <br>
      <span class="ziti">{{dyqjrs}}小时</span>
      <br>

    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main1" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">本月人均加班小时</span>
      <br>
      <span class="ziti">{{bypjjbtime}}小时</span>
      <br>


    </div>
  </div>



</template>

<script>
import {
  defineComponent,
  reactive, ref,
  toRefs
} from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl';
//多次使用图表方法
export default ({
  setup() {
    const state = reactive({
      shortcuts: [{
        text: 'Last week',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
        {
          text: 'Last month',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: 'Last 3 months',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      value1: '',
      value2: '',
    })

    return {
      ...toRefs(state),
      optionss: ref([
        {
          valuee: 'Option1',
          labell: 'Option1',
        },
        {
          valuee: 'Option2',
          labell: 'Option2',
        },
        {
          valuee: 'Option3',
          labell: 'Option3',
        },
        {
          valuee: 'Option4',
          labell: 'Option4',
        },
        {
          valuee: 'Option5',
          labell: 'Option5',
        },
      ]),
      valuee: ref(''),

    }
  },


  data() {
    return {
      qjrs:[],
      monthly:[],
      data1 : [
      ],
      data2 : [
      ],
      data11 : [
      ],
      value1:{

      },
      ccrs:[],
      monthlycc:[],
      dyqjrs:'',
      dyccrs:'',
      xj1:[],
      xj:[],
      xjpj:[],
      xjpjxj:[],
      xjpjxj1:[],
      xjpjxj2:[],
      rs:'',
      rjtime:[],
      bypjjbtime:'',
    }
  },
  computed: {

  },

  mounted() {

    this.drawLine();

    this.drawLine1();




  },
  methods: {
    //新进律
    drawLine() {

      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '每月加班总小时'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            magicType: {
              show: true,
              type: ['line', 'bar'],
              title:{
                line:"折线图",
                bar:"柱状图",
              }
            },
            restore: {
              show: true,
              title:"还原"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          data: ['加班小时', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.monthly,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',

          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} 小时'
          }
        },
          {
            type: 'value',
            name: '增长律（%）',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} %'
            }
          },

        ],
        series: [{
          name: '加班小时',
          type: 'bar',
          data: this.qjrs,
          barWidth:'25%',
        },
        ]
      };
      myChart.setOption(option);
    },

    drawLine1() {

      var chartDom1 = document.getElementById('main1');
      var myChart1 = echarts.init(chartDom1);
      var option1;

      option1 = {
        title: {
          text: '每月人均加班小时'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            magicType: {
              show: true,
              type: ['line', 'bar'],
              title:{
                line:"折线图",
                bar:"柱状图",
              }
            },
            restore: {
              show: true,
              title:"还原"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          data: ['加班小时', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.monthly,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',

          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} 小时'
          }
        },
          {
            type: 'value',
            name: '增长律（%）',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} %'
            }
          },

        ],
        series: [{
          name: '加班小时',
          type: 'bar',
          data: this.rjtime,
          barWidth:'25%',
        },
        ]
      };
      myChart1.setOption(option1);
    },
    //员工数量
    selectccrs() {
      this.axios
          .get("http://localhost:8007/provider/selectStaffrs", {
            params:this.rs,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.rs=response.data[i].rs
            }
            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //每月加班总时长
    selectqjrs() {
      this.axios
          .get("http://localhost:8007/provider/selectjbtime", {
            params:this.qjrs,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.qjrs.push(response.data[i].sj)
              this.monthly.push(response.data[i].time)
              this.rjtime.push(this.qjrs[i]/this.rs)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //本月加班总小时
    selectdyqjrs() {
      this.axios
          .get("http://localhost:8007/provider/selectbyjbtime", {
            params:this.dyqjrs,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.dyqjrs=0
              this.bypjjbtime=0
            }else {
              for (var i = 0; i < response.data.length; i++)
              {
                this.dyqjrs = response.data[0].time
              }
              if(response.data.length<1){
                this.bypjjbtime=0

              }else {
                this.bypjjbtime=this.dyqjrs/this.rs

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工本月出差人数
    selectdyccrs() {
      this.axios
          .get("http://localhost:8007/provider/selectdyccrs", {
            params:this.dyccrs,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.dyccrs=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.dyccrs = response.data[0].rs

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
  },created() {
    this.selectdyccrs();
    // this. selectqjrs();
    this.selectccrs();
    this.selectdyqjrs();

  }, watch: {
    qjrs: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine();
        this.drawLine1();
      },
      deep: true,
    },
    ccrs: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


      }
      ,
      deep: true,
    },

    rs:{
      handler:function (){
        this.selectqjrs();

      },
      deep:true,
    },
    rjtime:{
      handler:function (){

      },
      deep:true,
    }

  },
})
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>