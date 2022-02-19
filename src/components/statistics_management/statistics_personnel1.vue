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
    <!--  每月入职人数 -->
    <div id="mainy3" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月入职人数：</span>
      <br>
      <span class="ziti">{{dyrz}}</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">{{dyrzpj}}%</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月人均加班总时长 -->
    <div id="mainy4" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月离职人数：</span>
      <br>
      <span class="ziti"> {{value1}}</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">{{value2pj}}%</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月人均加班总时长 -->
    <div id="mainy5" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前月转正人数：</span>
      <br>
      <span class="ziti">{{dyzz}}</span>
      <br>
      <span class="ziti">相比上月：</span>
      <br>
      <span class="ziti">{{dyzzpj}}%</span>
    </div>
  </div>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <!--  每月人均加班总时长 -->
    <div id="mainy6" style="width: 980px;height:460px; margin-top: 20px; "></div>
    <div style="width: 17%;height: 320px; float: right; margin-top: -390px;">


      <span class="ziti">当前最多人数部门：</span>
      <br>
      <span class="ziti">{{zdbm}}</span>
      <br>
      <span class="ziti">人数：</span>
      <br>
      <span class="ziti">{{zdbmrs}}</span>
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
export default {
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

    })

    return {
      ...toRefs(state),

    }
  },

  data() {
    return {
      mannumber:0,
      womannumber:0,
      data1 : [

      ],
      data11 : [
//时间
      ],
      data2 : [

      ],
      data22 : [
//时间
      ],
      data3 : [

      ],
      data33 : [

      ],
      data4 : [

      ],
      data7 : [

      ],
      data5 : [

      ],
      data55 : [

      ],
      data8 : [

      ],
      data6 : [
      ],
      lz:{
        value1:"",
      },
      sylz:{

      },
      value2: '',
      value2pj:'',
      dyzz:'',
      dyzzpj:'',
      dyzz2:'',
      dyrz:'',
      dyrzpj:'',
      dyrz2:'',
      zdbm:'',
      zdbmrs:'',
      colors1:[
        '#5e81ec',
        '#ffc855',
        '#98e79b',
        '#00d695',
        '#00b29a',
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ],

    }

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //员工入职
    drawLine() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy1 = document.getElementById('mainy3');
      var myCharty1 = echarts.init(chartDomy1);
      var optiony1;
      //2、构造图表数据
      optiony1 = {
        title: {
          text: '每月入职人数'
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
              title:'数据视图'
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
              title:'还原'
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          data: ['入职人数', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.data2,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: '人',
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
          {
            type: 'value',
            name: '增长律（%）',
            min: 0,
            max: 200,
            interval: 20,
            axisLabel: {
              formatter: '{value} %'
            }
          },

        ],
        series: [{
          name: '入职人数',
          type: 'bar',
          data: this.data1,

          barWidth:'25%',
        },

          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            data: this.data11,
            itemStyle: {
              normal: {
                color: "#FFFF66", //折线点的颜色
                lineStyle: {
                  color: "#FFFF66" //折线的颜色
                }
              }
            },

          }
        ]
      };
      // 3、绘制图表
      myCharty1.setOption(optiony1);
    },
    //员工离职
    drawLine1() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy2 = document.getElementById('mainy4');
      var myCharty2 = echarts.init(chartDomy2);
      var optiony2;
      //2、构造图表数据

      optiony2 = {
        title: {
          text: '每月离职人数'
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
              title:'数据视图'
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
              title:'还原'
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          data: ['离职人数', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.data4,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: '人',
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
          {
            type: 'value',
            name: '增长律（%）',
            min: -200,
            max: 200,
            interval: 40,
            axisLabel: {
              formatter: '{value} %'
            }
          },

        ],
        series: [{
          name: '离职人数',
          type: 'bar',
          data: this.data3,

          barWidth:'25%',
        },

          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            data: this.data33,
            itemStyle: {
              normal: {
                color: "#FFFF66", //折线点的颜色
                lineStyle: {
                  color: "#FFFF66" //折线的颜色
                }
              }
            },

          }
        ]
      };
      // 3、绘制图表
      myCharty2.setOption(optiony2);
    },
    //员工转正
    drawLine2() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy5 = document.getElementById('mainy5');
      var myCharty5 = echarts.init(chartDomy5);
      var optiony5;
      //2、构造图表数据

      optiony5 = {
        title: {
          text: '每月员工转正'
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
              title:'数据视图'
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
              title:'还原'
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          data: ['离职人数', '增长率']
        },
        xAxis: [{
          type: 'category',
          data: this.data6,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: '人',
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            formatter: '{value} 人'
          }
        },
          {
            type: 'value',
            name: '增长律（%）',
            min: -200,
            max: 200,
            interval: 40,
            axisLabel: {
              formatter: '{value} %'
            }
          },

        ],
        series: [{
          name: '离职人数',
          type: 'bar',
          data: this.data5,

          barWidth:'25%',
        },

          {
            name: '增长率',
            type: 'line',
            yAxisIndex: 1,
            data: this.data55,
            itemStyle: {
              normal: {
                color: "#FFFF66", //折线点的颜色
                lineStyle: {
                  color: "#FFFF66" //折线的颜色
                }
              }
            },

          }
        ]
      };
      // 3、绘制图表
      myCharty5.setOption(optiony5);
    },

    //部门top榜
    drawLine3() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy3 = document.getElementById('mainy6');
      var myCharty3 = echarts.init(chartDomy3);
      var optiony3;
      //2、构造图表数据
      optiony3 = {
        title: {
          text: '部门人数top6'
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
              title:'数据视图'
            },
            magicType: {
              show: true,
              type: [ 'bar'],
              title:{

                bar:"柱状图",
              }
            },
            restore: {
              show: true,
              title:'还原'
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          data: ['入职人数']
        },
        xAxis: [{
          type: 'category',
          data: this.data8,
          axisPointer: {
            type: 'shadow'
          }
        }],
        yAxis: [{
          type: 'value',
          name: '人',
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            formatter: '{value} 人'
          }
        },


        ],
        series: [{
          name: '入职人数',
          type: 'bar',
          data: this.data7,

          barWidth:'25%',
        },


        ]
      };
      // 3、绘制图表
      myCharty3.setOption(optiony3);
    },
    //员工入职
    selectrz() {
      this.axios
          .get("http://localhost:8007/provider/chayglz", {
            params:this.date3,
          })
          .then((response) => {

            this.data3.length = 0; //清空数组z
            var Growth=0
            this.data33.push(Growth)
            for (var i = 0; i < response.data.length; i++) {

              this.data3.push(response.data[i].rs);
              this.data4.push(response.data[i].year);
              console.log(this.data3)
              if(i>=1) {
                var Growth1 = (response.data[i].rs - response.data[i - 1].rs) / response.data[i].rs * 100
                this.data33.push(Growth1)

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //当月入职人数
    selectdyrz() {
      this.axios
          .get("http://localhost:8007/provider/chabyrz", {
            params:this.lz,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.dyrz=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.dyrz = response.data[0].rs

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    ////上月员工入职  //获取本月对比上月入职人数百分比
    selectsyrz() {
      this.axios
          .get("http://localhost:8007/provider/chasyrz", {
            params:this.sylz,
          })
          .then((response) => {
            if(response.data.length<1){
              this.dyrz2=0
            }
            for (var i = 0; i < response.data.length; i++) {

              this.dyrz2=response.data[0].rs
            }
            //获取本月对比上月离职人数有多少
            if(this.dyrz==0){  //解决当除数为0时计算公式无法计算的办法
              this.dyrzpj= (this.dyrz-this.dyrz2) /1*100
            }else {
              this.dyrzpj= (this.dyrz-this.dyrz2) /this.dyrz *100

            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
//每月员工离职
    selectyglz() {
      this.axios
          .get("http://localhost:8007/provider/charz", {
            params:this.date1,
          })
          .then((response) => {

            this.data1.length = 0; //清空数组z
            var Growth=0
            this.data11.push(Growth)
            for (var i = 0; i < response.data.length; i++) {

              this.data1.push(response.data[i].rs);
              this.data2.push(response.data[i].year);
              console.log(this.data1)
              if(i>=1) {
                var Growth1 = (response.data[i].rs - response.data[i - 1].rs) / response.data[i].rs * 100
                this.data11.push(Growth1)

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //当月员工离职
    selectdylz() {
      this.axios
          .get("http://localhost:8007/provider/chadylz", {
            params:this.lz,
          })
          .then((response) => {
            if(response.data.length<1){
              this.value1=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.value1 = response.data[0].rs

                console.log(this.value1)
                /*    if(i>=1) {
                    var Growth1 = (response.data[i].rs - response.data[i - 1].rs) / response.data[i].rs * 100
                    this.data11.push(Growth1)

                  }*/
              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    ////上月员工离职
    selectsylz() {
      this.axios
          .get("http://localhost:8007/provider/chasylz", {
            params:this.sylz,
          })
          .then((response) => {
            if(response.data.length<1){
              this.value2=0
            }

            for (var i = 0; i < response.data.length; i++) {

              this.value2=response.data[0].rs

              console.log(this.value2)
              /*    if(i>=1) {
                    var Growth1 = (response.data[i].rs - response.data[i - 1].rs) / response.data[i].rs * 100
                    this.data11.push(Growth1)

                  }*/
            }
            //获取本月对比上月离职人数有多少

            if(this.value1==0){
              this.value2pj=0

            }else if(this.value2==0){
              this.value2pj=0

            }else {
              this.value2pj = (this.value1 - this.value2) / this.value1 * 100

            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //每月转正人数
    selectygzz() {
      this.axios
          .get("http://localhost:8007/provider/chaygzz", {
            params:this.data5,
          })
          .then((response) => {

            this.data5.length = 0; //清空数组z
            var Growth=0
            this.data55.push(Growth)

            for (var i = 0; i < response.data.length; i++) {

              this.data5.push(response.data[i].rs);
              this.data6.push(response.data[i].year);
              console.log(this.data6+"nima111")
              console.log(this.data5+"nima111")

              if(i>=1) {
                var Growth1 = (response.data[i].rs - response.data[i - 1].rs) / response.data[i].rs * 100
                this.data55.push(Growth1)


              }
            }

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //当月转正人数
    selectdyygzz() {
      this.axios
          .get("http://localhost:8007/provider/chabyygzz", {
            params:this.lz,
          })
          .then((response) => {
            if (response.data.length<1){
              this.dyzz=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.dyzz = response.data[0].rs

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    ////上月员工转正  //获取本月对比上月转正人数有多少
    selectsyzz() {
      this.axios
          .get("http://localhost:8007/provider/chasyygzz", {
            params:this.sylz,
          })
          .then((response) => {
            if(response.data.length<1){
              this.dyzz2=0
            }
            for (var i = 0; i < response.data.length; i++) {

              this.dyzz2=response.data[0].rs
            }
            //获取本月对比上月转正人数百分比
            if(this.dyzz==0){
              this.dyzzpj= (this.dyzz-this.dyzz2) /1 *100
            }else {
              this.dyzzpj = (this.dyzz - this.dyzz2) / this.dyzz * 100
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //部门top榜
    selectdepttop() {
      this.axios
          .get("http://localhost:8007/provider/chadepttop", {
            params:this.data7,
          })
          .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
              if(i<=5) {
                this.data7.push(response.data[i].rs);
                this.data8.push(response.data[i].deptName);
              }
              /*   console.log(response.data[i])*/
              this.zdbm=response.data[0].deptName
              this.zdbmrs=response.data[0].rs
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
  },created() {
    this.selectrz();
    this.selectyglz();
    this. selectygzz();
    this.selectdepttop();
    this. selectdylz();
    this. selectdyygzz();
    this. selectdyrz();
    this.selectsyzz();
    this.selectsylz();
    this.selectsyrz();
  }, watch: {
    data1: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据x
      handler: function () {

        this.drawLine();
        this.drawLine1();

      },
      deep: true,
    },
    data3: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据x
      handler: function () {

        this.drawLine();

      },
      deep: true,
    },
    data5: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine2();

      },
      deep: true,
    },
    data7: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine3();
      },
      deep: true,
    },
  },
}
</script>


<style scoped>
@import url("../../css/Statistics.css");
</style>