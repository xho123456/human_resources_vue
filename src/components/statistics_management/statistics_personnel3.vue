<template>
  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-right: 1px #000000 dashed; width: 50%;height: 480px;border-left: 1px #000000 dashed;">

      <!-- //员工性别分布 -->
      <div id="mainy1" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 440px; position: absolute;top: 0px;right: 2px; ">
      <!-- //员工婚姻分布 -->
      <div id="mainy2" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>



  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!--  员工司龄分布 -->
      <div id="mainy3" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 440px; position: absolute;top: 0px;right: 2px; ">
      <!-- 员工学历分布 -->
      <div id="mainy4" style="width: 630px;height:405px; float: right;"></div>
    </div>
  </div>


  <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
    <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

      <!-- 员工年龄段分布 -->
      <div id="mainy5" style="width: 630px;height:405px; float: left;"></div>
    </div>
    <div style="  width: 50%;height: 450px; position: absolute;top: 0px;right: 2px; ">
      <!-- 	员工年代分布 -->
      <div id="mainy6" style="width: 630px;height:405px; float: right;"></div>
    </div>


    <div style="position: relative; display: block; width: 100%;border-top: 1px #000000 dashed;">
      <div style="border-left: 1px #000000 dashed; width: 50%;height: 480px;border-right: 1px #000000 dashed;">

        <!-- 员工年龄段分布 -->
        <div id="mainy7" style="width: 630px;height:405px; float: left;"></div>
      </div>
      <div style="  width: 50%;height: 440px; position: absolute;top: 0px;right: 2px; ">
        <!-- 	员工年代分布 -->
        <div id="mainy8" style="width: 630px;height:405px; float: right;"></div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  defineComponent,
  reactive,
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
      value2: '',
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
      data2 : [

      ],
      data3 : [

      ],
      data4 : [

      ],
      data7 : [

      ],
      data5 : [

      ],
      data8 : [

      ],
      data6 : [

      ],
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
    this.drawLine();
    this.selectSex();
  },
  methods: {
    //员工性别
    drawLine() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy1 = document.getElementById('mainy1');
      var myCharty1 = echarts.init(chartDomy1);
      var optiony1;
      //2、构造图表数据

      optiony1 = {
        title: {
          text: "员工性别分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "性别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data1,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty1.setOption(optiony1);
    },
    //员工婚姻
    drawLine1() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy2 = document.getElementById('mainy2');
      var myCharty2 = echarts.init(chartDomy2);
      var optiony2;
      //2、构造图表数据

      optiony2 = {
        title: {
          text: "婚姻情况分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "婚姻",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data2,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty2.setOption(optiony2);
    },
    //员工工龄
    drawLine2() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy3 = document.getElementById('mainy3');
      var myCharty3 = echarts.init(chartDomy3);
      var optiony3;
      //2、构造图表数据

      optiony3 = {
        title: {
          text: "员工工龄分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "工龄",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data3,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty3.setOption(optiony3);
    },
    //员工学历
    drawLine3() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy4 = document.getElementById('mainy4');
      var myCharty4 = echarts.init(chartDomy4);
      var optiony4;
      //2、构造图表数据
      optiony4 = {
        title: {
          text: "员工学历分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "学历",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data4,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty4.setOption(optiony4);
    },
    //员工星座
    drawLine4() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy7 = document.getElementById('mainy7');
      var myCharty7 = echarts.init(chartDomy7);
      var optiony7;
      //2、构造图表数据

      optiony7 = {
        title: {
          text: "员工星座分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "星座",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data7,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty7.setOption(optiony7);
    },
    //员工年龄段
    drawLine5() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy5 = document.getElementById('mainy5');
      var myCharty5 = echarts.init(chartDomy5);
      var optiony5;
      //2、构造图表数据

      optiony5 = {
        title: {
          text: "员工年龄段分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "年龄",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data5,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty5.setOption(optiony5);
    },
    //员工状态分析
    drawLine6() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy8 = document.getElementById('mainy8');
      var myCharty8 = echarts.init(chartDomy8);
      var optiony8;
      //2、构造图表数据

      optiony8 = {
        title: {
          text: "员工状态分析",
          left: "center",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "状态",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data8,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty8.setOption(optiony8);
    },
    //员工年代分析
    drawLine7() {
      // 1、基于准备好的dom，初始化echarts实例
      var chartDomy6 = document.getElementById('mainy6');
      var myCharty6 = echarts.init(chartDomy6);
      var optiony6;
      //2、构造图表数据

      optiony6 = {
        title: {
          text: "员工年代分析",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title:"数据视图"
            },
            saveAsImage: {
              show: true,
              title:"保存"
            }
          }
        },
        legend: {
          orient: "vertical",
          left: "left",

        },
        series: [
          {
            name: "年代",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.data6,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 3、绘制图表
      myCharty6.setOption(optiony6);
    },
    //员工性别
    selectSex() {
      this.axios
          .get("http://localhost:8007/provider/chasex", {
            params:this.date1,
          })
          .then((response) => {

            this.data1.length = 0; //清空数组z
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].staffSex,value:response.data[i].zonshu}
              this.data1.push(op);
              console.log(response.data[i]);
            }
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工婚姻
    selecthy() {
      this.axios
          .get("http://localhost:8007/provider/chahy", {
            params:this.date2,
          })
          .then((response) => {

            this.data2.length = 0; //清空数组z
            /*    let op ={name:response.data[0].staffMarital,value:response.data[0].zonshu}
                this.data2.push(op);
                console.log(op)*/
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].staffMarital,value:response.data[i].zonshu}
              this.data2.push(op);

            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工工龄<1
    selectgl1() {
      this.axios
          .get("http://localhost:8007/provider/chagl1", {
            params:this.date3,
          })
          .then((response) => {


            let op ={name:"小于1年",value:response.data[0].gl}
            this.data3.push(op);
            console.log(op)

            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工工龄=1
    selectgl11() {
      this.axios
          .get("http://localhost:8007/provider/chagl11", {
            params:this.date3,
          })
          .then((response) => {


            let op ={name:"1年",value:response.data[0].gl}
            this.data3.push(op);
            console.log(op)

            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工工龄=2
    selectgl2() {
      this.axios
          .get("http://localhost:8007/provider/chagl2", {
            params:this.date3,
          })
          .then((response) => {


            let op ={name:"2年",value:response.data[0].gl}
            this.data3.push(op);
            console.log(op)

            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工工龄=3
    selectgl3() {
      this.axios
          .get("http://localhost:8007/provider/chagl3", {
            params:this.date3,
          })
          .then((response) => {


            let op ={name:"3年",value:response.data[0].gl}
            this.data3.push(op);
            console.log(op)

            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工工龄=4
    selectgl4() {
      this.axios
          .get("http://localhost:8007/provider/chagl4", {
            params:this.date3,
          })
          .then((response) => {


            let op ={name:"4年",value:response.data[0].gl}
            this.data3.push(op);
            console.log(op)

            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工工龄=5
    selectgl5() {
      this.axios
          .get("http://localhost:8007/provider/chagl5", {
            params:this.date3,
          })
          .then((response) => {


            let op ={name:"5年及上",value:response.data[0].gl}
            this.data3.push(op);
            console.log(op)

            console.log(response.data)

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工学历
    selectxl() {
      this.axios
          .get("http://localhost:8007/provider/chaxl", {
            params:this.data4,
          })
          .then((response) => {

            this.data4.length = 0; //清空数组z
            /*    let op ={name:response.data[0].staffMarital,value:response.data[0].zonshu}
                this.data2.push(op);
                console.log(op)*/
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].staffEducation,value:response.data[i].rs}
              this.data4.push(op);
              console.log(response.data)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工星座
    selectxz() {
      this.axios
          .get("http://localhost:8007/provider/chaxz", {
            params:this.data7,
          })
          .then((response) => {

            this.data7.length = 0; //清空数组z
            /*    let op ={name:response.data[0].staffMarital,value:response.data[0].zonshu}
                this.data2.push(op);
                console.log(op)*/
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].staffSign,value:response.data[i].rs}
              this.data7.push(op);
              console.log(response.data)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工年龄段
    selectnl() {
      this.axios
          .get("http://localhost:8007/provider/chanl", {
            params:this.data5,
          })
          .then((response) => {

            this.data5.length = 0; //清空数组z
            /*    let op ={name:response.data[0].staffMarital,value:response.data[0].zonshu}
                this.data2.push(op);
                console.log(op)*/
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].nld,value:response.data[i].rs}
              this.data5.push(op);
              console.log(response.data)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工状态
    selectygzt() {
      this.axios
          .get("http://localhost:8007/provider/chaygzt", {
            params:this.data8,
          })
          .then((response) => {

            this.data8.length = 0; //清空数组z
            /*    let op ={name:response.data[0].staffMarital,value:response.data[0].zonshu}
                this.data2.push(op);
                console.log(op)*/
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].zt,value:response.data[i].rs}
              this.data8.push(op);
              console.log(response.data)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询员工年代
    selectnd() {
      this.axios
          .get("http://localhost:8007/provider/chand", {
            params:this.data6,
          })
          .then((response) => {

            this.data6.length = 0; //清空数组z
            /*    let op ={name:response.data[0].staffMarital,value:response.data[0].zonshu}
                this.data2.push(op);
                console.log(op)*/
            for (let i = 0; i < response.data.length; i++) {
              let op ={name:response.data[i].nld,value:response.data[i].rs}
              this.data6.push(op);
              console.log(response.data)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
  },created() {
    this.selectSex();
    this.selecthy();

    this.selectgl1();
    this.selectgl11();
    this.selectgl2();
    this.selectgl3();
    this.selectgl4();
    this.selectgl5();
    this.selectxl();
    this.selectnl();
    this.selectxz();
    this.selectygzt();
    this.selectnd();
  }, watch: {
    data1: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine();


      },
      deep: true,
    },
    data2: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


        this.drawLine1();

      },
      deep: true,
    },
    data3: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


        this.drawLine2();

      },
      deep: true,
    },
    data4: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


        this.drawLine3();

      },
      deep: true,
    },
    data5: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {

        this.drawLine5();


      },
      deep: true,
    },
    data6: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {



        this.drawLine7  ();
      },
      deep: true,
    },
    data7: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


        this.drawLine4  ();

      },
      deep: true,
    },
    data8: {
      //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
      handler: function () {


        this.drawLine6  ();

      },
      deep: true,
    },
  },
}
</script>

<style scoped>

</style>