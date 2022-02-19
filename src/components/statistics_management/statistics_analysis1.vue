<template>

  <div class="demo-date-picker" style="width: 100%;height: 49px;">
    <div class="" style="width: 850px;height: 49px; float: right;">
      <span class="demonstration" style="position: relative;top: -1px;">时间范围：</span>

      <el-date-picker v-model="value1" type="daterange" range-separator="到"
                      start-placeholder="开始时间" end-placeholder="结束时间" style="position: relative;top: 0px;">
      </el-date-picker>
      <span class="demonstration" style="position: relative;top: -1px;left: 3px;">组织范围：</span>
      <el-select v-model="valuee" placeholder="请选择">
        <el-option
            v-for="item in optionss"
            :key="item.valuee"
            :label="item.labell"
            :value="item.valuee"
            style="position: relative;top: -1px;"
        >
        </el-option>
      </el-select>
      <el-button type="primary" style="position: relative;top: -2px;">搜索</el-button>
    </div>

  </div>

  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">本月计薪人数</span>
      <br>
      <span class="ziti">{{dyccrs}}人</span>
      <br>

    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main1" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">本月人力成本</span>
      <br>
      <span class="ziti">{{dyccrs1}}元</span>
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
      qjrs1:[],
      monthly:[],
      monthly1:[],
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
          text: '每月计薪人数'
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
          data: ['人数', '增长率']
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
          name: '计薪人数',
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
          text: '每月人力成本'
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
          data: this.monthly1,
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
            formatter: '{value} 元'
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
          name: '元',
          type: 'bar',
          data: this.qjrs1,
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
    //每月计薪人数
    selectqjrs() {
      this.axios
          .get("http://localhost:8007/provider/chajxrs", {
            params:this.qjrs,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.qjrs.push(response.data[i].rs)
              this.monthly.push(response.data[i].time)

            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    //每月人力成本
    selectrlcb() {
      this.axios
          .get("http://localhost:8007/provider/charlcb", {
            params:this.qjrs1,
          })
          .then((response) => {

            for (var i = 0; i < response.data.length; i++) {
              this.qjrs1.push(response.data[i].rs)
              this.monthly1.push(response.data[i].time)

            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    //查询员工本月计薪人数
    selectdyccrs() {
      this.axios
          .get("http://localhost:8007/provider/chabyjxrs", {
            params:this.dyccrs,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.dyccrs=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.dyccrs = response.data[0].time

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月人力成本
    selectbyrlcb() {
      this.axios
          .get("http://localhost:8007/provider/chabyrlcb", {
            params:this.dyccrs1,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.dyccrs1=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.dyccrs1 = response.data[0].time

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
    this.selectrlcb();
    this.selectccrs();
    this.selectbyrlcb();

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