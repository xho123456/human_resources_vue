<template>
  <div class="demo-date-picker" style="width: 100%;height: 49px;">

  </div>
<!--  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-right: 1px #000000 dashed; width: 50%;height: 480px;border-left: 1px #000000 dashed;">

      &lt;!&ndash; 固定工资分布 &ndash;&gt;
      <div id="main" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 480px; position: absolute;top: 0px;right: 2px; ">
      &lt;!&ndash; 薪酬结构分布 &ndash;&gt;
      <div id="main1" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>-->

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!-- 	部门Top9人力成本 -->
    <div id="main2" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前部门发放工资最多:</span>
      <br>
      <span class="ziti">{{zdbm}}</span>
      <br>

      <span class="ziti">工资为：</span><br>
      <span class="ziti">{{zdbmrs}}元</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!-- 	部门平均工资 -->
    <div id="main4" style="width: 1050px;height:460px;"></div>
    <div style="width: 16%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前部门平均发放工资最多:</span>
      <br>
      <span class="ziti">{{zdbm1}}</span>
      <br>

      <span class="ziti">工资为：</span><br>
      <span class="ziti">{{zdbmrs1}}元</span>
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
      qjrs1:[],
      qjrs2:[],
      qjrs3:[],
      qjrs4:[],
      qjrs5:[],
      monthly:[],
      monthly1:[],
      monthly2:[],
      monthly3:[],
      deptname1:[],
      deptname2:[],
      rs1:[],
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
      dyccrs1:'',
      rmb:'',
      rmb1:'',
      rmb2:'',
      rmb3:'',
      rmb4:'',
      rmb5:'',
      rmb6:'',
      zdbm:'',
      zdbmrs:'',
      zdbm1:'',
      zdbmrs1:'',
      xj1:[],
      xj:[],
      xjpj:[],
      xjpjxj:[],
      xjpjxj1:[],
      xjpjxj2:[],
      rs:'',
      rs2:[],
      rjtime:[],
      bypjjbtime:'',
      qian:[],
    }
  },
  computed: {

  },

  mounted() {








  },
  methods: {
    //新进律

    drawLine2() {

      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '部门工资top1'
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
          data: ['元', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.deptname1,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',

          min: 0,
          max: 500000,
          interval: 50000,
          axisLabel: {
            formatter: '{value} 元'
          }
        },

        ],
        series: [{
          name: '元',
          type: 'bar',
          data: this.qjrs4,
          barWidth:'25%',
        },
        ]
      };
      myChart.setOption(option);
    },

    drawLine4() {

      var chartDom = document.getElementById('main4');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '部门平均工资top'
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
          data: ['元', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.deptname2,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',

          min: 0,
          max: 500000,
          interval: 50000,
          axisLabel: {
            formatter: '{value} 元'
          }
        },

        ],
        series: [{
          name: '元',
          type: 'bar',
          data: this.qian,
          barWidth:'25%',
        },
        ]
      };
      myChart.setOption(option);
    },




    //每月公司社保金额
    selectgssbje() {
      this.axios
          .get("http://localhost:8007/provider/chagssbje", {
            params:this.qjrs3,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.qjrs3.push(response.data[i].rmb)
              this.monthly3.push(response.data[i].time)

            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    //每月部门工资top
    selectbmgztop() {
      this.axios
          .get("http://localhost:8007/provider/chabmgztop", {
            params:this.qjrs4,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.qjrs4.push(response.data[i].rmb)
              this.deptname1.push(response.data[i].deptName)
              if (this.deptname1.length>6){
                break

              }
              this.zdbm=response.data[0].deptName
              this.zdbmrs=response.data[0].rmb
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //每月部门工资平均榜
    selectbmgzpj() {
      this.axios
          .get("http://localhost:8007/provider/chabmgzpj", {
            params:this.qjrs5,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.qjrs5.push(response.data[i].rmb)
              this.deptname2.push(response.data[i].deptName)
              this.rs2.push(response.data[i].rs)

              this.qian.push(response.data[i].rmb/response.data[i].rs)

              if (this.deptname2.length>6){
                break

              }
              this.zdbm1=response.data[0].deptName
              this.zdbmrs1=this.qian[0]
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },


  },created() {


    this.selectgssbje();
    this.selectbmgztop();
    this.selectbmgzpj();
  }, watch: {
    qjrs4: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine2();

      },
      deep: true,
    },
    qjrs5: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine4();

      },
      deep: true,
    },
  },
})
</script>



<style scoped>
@import url("../../css/Statistics.css");
.el-menu[data-v-244d4530] {
  height: 57px;
  font-weight: bold;
}
</style>