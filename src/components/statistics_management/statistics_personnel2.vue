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

    <div id="main7" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月员工新进率</span>
      <br>
      <span class="ziti">3</span>
      <br>

    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">

    <div id="main8" style="width: 952px;height:460px;"></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">

      <span class="ziti">当前月离职率</span>
      <br>
      <span class="ziti">3</span>
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
      data1 : [
      ],
      data2 : [
      ],
      data11 : [
      ],
    value1:{

    },
      xj1:[],
      xj:[],
      xjpj:[],
      xjpjxj:[],
      xjpjxj1:[],
      xjpjxj2:[],
    }
  },
  computed: {

  },

  mounted() {

    this.drawLine();
    // 当前月离职率

    



  },
  methods: {
    //新进律

    drawLine() {
      // 1、基于准备好的dom，初始化echarts实例
      /* 当前月员工新进率 */
      var chartDom7 = document.getElementById('main7');
      var myChart7 = echarts.init(chartDom7);
      var option7;
      //2、构造图表数据
      option7 = {
        title: {
          text: '每月员工新进率'
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['新进率']
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true,
              title:'保存'
            }, magicType: {
              show: true,
              type: ['line', 'bar'],
              title:{
                line:"折线图",
                bar:"柱状图",
              }
            },

          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data:this.xj1, //放时间
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '新进率',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.xjpjxj1, //放值
          smooth:true
        }


        ]
      };
      // 3、绘制图表
      myChart7.setOption(option7);
    },
    drawLine1() {
      // 1、基于准备好的dom，初始化echarts实例
      /* 当前月员工新进率 */
      var chartDom7 = document.getElementById('main8');
      var myChart7 = echarts.init(chartDom7);
      var option7;
      //2、构造图表数据
      option7 = {
        title: {
          text: '每月员工新进率'
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['新进率']
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true,
              title:'保存'
            }, magicType: {
              show: true,
              type: ['line', 'bar'],
              title:{
                line:"折线图",
                bar:"柱状图",
              }
            },

          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data:this.data2 //放时间
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '新进率',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data:this.xjpjxj2, //放值
          smooth:true
        }


        ]
      };
      // 3、绘制图表
      myChart7.setOption(option7);
    },
    selectygxj() {
      this.axios
          .get("http://localhost:8007/provider/chaygxj", {
          /*  params:this.value1,*/
          })
          .then((response) => {
            this.xj1.length=0
            this.xj.length=0
            var Growth=0
            this.xjpj.push(Growth)
            this.xjpjxj.push(Growth)
            if(response.data.length<1){
              /*this.dyrz2=0*/
            }else {
              for (var i = 0; i < response.data.length; i++) {

              this.xj.push(response.data[i].rs)
                this.xj1.push(response.data[i].year)

              if(i>=1){
                var Growth1 =  (response.data[i-1].rs+response.data[i].rs)/2
                this.xjpj.push(Growth1)//工资册平均人数
                var Growth2 =  (response.data[i].rs-response.data[i-1].rs)
                this.xjpjxj.push(Growth2)//新进人数
                 var Growth3= this.xjpjxj[i]/this.xjpj[i]*100
                this.xjpjxj1.push(Growth3)
              }

              }
            }
            //获取本月对比上月离职人数有多少
          /*  if(this.dyrz==0){  //解决当除数为0时计算公式无法计算的办法
              this.dyrzpj= (this.dyrz-this.dyrz2) /1*100
            }else {
              this.dyrzpj= (this.dyrz-this.dyrz2) /this.dyrz *100

            }*/


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //每月员工离职
    selectyglz11() {
      this.axios
          .get("http://localhost:8007/provider/chalz1", {
            params:this.date1,
          })
          .then((response) => {

            var Growth=0
            this.data11.push(Growth)
            for (var i = 0; i < response.data.length; i++) {
              this.data1.push(response.data[i].rs);
              this.data2.push(response.data[i].year);

          /*    console.log(this.data2)*/
              if(i>=1) {
                var Growth1 = (response.data[i].rs - response.data[i - 1].rs)
                this.data11.push(Growth1)

                var Growth3= this.data11[i]/this.xjpj[i]*100
                this.xjpjxj2.push(Growth3)
                console.log(this.data11+"asdasd")
                console.log(this.xjpj+"asdasd32")
                console.log(this.xjpjxj2+"asdasd322444")
              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
  },created() {
   this.selectygxj();
    this.selectyglz11();
  }, watch: {
    xj1: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine();

      },
      deep: true,
    },
    data1: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


        this.drawLine1();
      },
      deep: true,
    },


  },
})
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>