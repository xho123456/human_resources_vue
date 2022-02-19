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
    <div style="border-right: 1px #000000 dashed; width: 50%;height: 480px;border-left: 1px #000000 dashed;">

      <!-- 固定工资分布 -->
      <div id="main" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 480px; position: absolute;top: 0px;right: 2px; ">
      <!-- 薪酬结构分布 -->
      <div id="main1" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>

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

      <span class="ziti">当前部门发放工资最多:</span>
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



    this.drawLine1();




  },
  methods: {
    //新进律
    drawLine() {

      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '本月固定工资分布'
        },
        toolbox: {
          feature: {
            dataView:{
              show:true,
              readOnly:false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            },

          }
        },
        legend: {
          top: '5%',
          left: 'center',
          formatter: function(name) {
            var data = option.series[0].data;
            var total = 0;
            var tarValue;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var p = (tarValue / total * 100).toFixed(2);
            return name + ' ' + ' ' + '(' + p + '%)';
          },
        },
        series: [{
          name: '薪酬结构',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [{
            value: this.rmb,
            name: '试用基本工资'
          },
            {
              value: this.rmb1,
              name: '正式基本工资'
            }

          ]
        }]
      };
      myChart.setOption(option);
    },

    drawLine1() {

      var chartDom1 = document.getElementById('main1');
      var myChart1 = echarts.init(chartDom1);
      var option1;

      option1 = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '本月薪资分布'
        },
        toolbox: {
          feature: {
            dataView:{
              show:true,
              readOnly:false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            },

          }
        },
        legend: {
          top: '5%',
          left: 'center',
          formatter: function(name) {
            var data = option1.series[0].data;
            var total = 0;
            var tarValue;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            var p = (tarValue / total * 100).toFixed(2);
            return name + ' ' + ' ' + '(' + p + '%)';
          },
        },
        series: [{
          name: '薪酬结构',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [{
            value: this.rmb2,
            name: '基本工资'
          },
            {
              value: this.rmb3,
              name: '个人缴公积金'
            },{
              value: this.rmb4,
              name: '个人缴社保'
            },{
              value: this.rmb5,
              name: '公司缴社保'
            },{
              value: this.rmb6,
              name: '公司缴公积金'
            }

          ]
        }]
      };
      myChart1.setOption(option1);
    },
    drawLine2() {

      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '部门工资top'
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
          text: '部门工资top'
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
    //查询本月试用基本工资
    selectbysyjbgz() {
      this.axios
          .get("http://localhost:8007/provider/chabysyjbgz", {
            params:this.rmb,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月正式基本工资
    selectbyzsjbgz() {
      this.axios
          .get("http://localhost:8007/provider/chabyzsjbgz", {
            params:this.rmb1,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb1=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb1 = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    //查询本月基本工资2
    selectbyzsjbgzz() {
      this.axios
          .get("http://localhost:8007/provider/chabyzsjbgzz", {
            params:this.rmb2,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb2=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb2 = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月个人缴公积金3
    selectbygrgjj() {
      this.axios
          .get("http://localhost:8007/provider/chabygrgjj", {
            params:this.rmb3,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb3=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb3 = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月个人缴社保4
    selectbygrsb() {
      this.axios
          .get("http://localhost:8007/provider/chabygrsb", {
            params:this.rmb4,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb4=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb4 = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月公司缴社保5
    selectbygssb() {
      this.axios
          .get("http://localhost:8007/provider/chabygssb", {
            params:this.rmb5,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb5=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb5 = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月公司缴公积金6
    selectbygsgjj() {
      this.axios
          .get("http://localhost:8007/provider/chabygsgjj", {
            params:this.rmb6,
          })
          .then((response) => {
            if (response.data.length<1) {
              this.rmb6=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.rmb6 = response.data[0].rmb

              }
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

  },created() {

    this.selectbyzsjbgz();
    this.selectbysyjbgz();
    this.selectgssbje();
    this.selectbmgztop();
    this.selectbyzsjbgzz();
    this.selectbygrgjj();
    this.selectbygrsb();
    this.selectbygssb();
    this.selectbygsgjj();
    this.selectbmgzpj();
  }, watch: {
    qjrs3: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine();



      },
      deep: true,
    },
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
    rmb6: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {
        this.drawLine1();


      }
      ,
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