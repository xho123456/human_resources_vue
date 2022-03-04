<!--查看工资表 -->
<template>
  <div style="width:100%;">
  <div style="width:100%;height:10px;">
    <!--搜索输入框-->
<!--    <el-row style="width:200px;float:right;">
      <el-input size="small" v-model="pageInfo.staffName" placeholder="请输入员工名称" style="width:150px;position: absolute;right: 80px;">
        <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search @click="selectEndAuditflow()"></i-search></el-icon>
        </template>
      </el-input>
    </el-row>-->
  </div>
    <div style="width:100%;margin-top: 50px;" class="icon-p">
<!--      <div style="width:80%;height:100px;margin: auto;background: #42b983">-->
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" style="background-color:#085fc3;font-size:14px;color: white">
           <p>{{pageInfo.total}}</p>
            <p>全部</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" style="background-color: #085fc3;font-size:14px;color: white">
            <p>{{zsyg}}</p>
            <p>正式员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" style="background-color:#085fc3;font-size:14px;color: white">
            <p>{{syyg}}</p>
            <p>试用员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: #085fc3;font-size:14px;color: white">
            <p>{{dyrz}}</p>
            <p>本月新入职</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: #085fc3;font-size:14px;color: white">
            <p>{{tx}}</p>
            <p>本月调薪</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: #085fc3;font-size:14px;color: white">
            <p>{{value1}}</p>
            <p>本月离职</p>
          </el-card>
        </el-col>
      </el-row>
      </div>


    <div style="text-align: center;">
      <el-table :data="tableData"   style="width: 100%;font-size: 12px;color:black;font-weight: normal;">
          <el-table-column  label="基本信息">
            <el-table-column     prop="staffId" label="ID" width="100" />
            <el-table-column     prop="staffName" label="姓名" width="100" />
            <el-table-column   prop="deptName" label="部门" width="100" />
            <el-table-column   prop="postName" label="职位" width="100" />
<!--            <el-table-column   prop="name" label="本月变动" width="100" />-->
        </el-table-column>

            <el-table-column prop="fixedwageOfficialmoney" label="正式工资" width="100"  :formatter="caseTypeNamesFormat1"/>
        <el-table-column prop="fixedwagePeriodmoney" label="试用工资" width="100" :formatter="caseTypeNamesFormat2" />

        <el-table-column prop="jiabanmoney" label="加班工资" width="100"  :formatter="caseTypeNamesFormat3"/>

        <el-table-column label="考勤扣款" >
          <el-table-column prop="chidaomony" label="迟到" width="100" :formatter="caseTypeNamesFormat4" />
          <el-table-column prop="zaotueimoney" label="早退" width="100"  :formatter="caseTypeNamesFormat5"/>

          <el-table-column prop="kuangonmoney" label="旷工" width="100"  :formatter="caseTypeNamesFormat6"/>
          <el-table-column prop="qinjiamoney" label="请假" width="100" :formatter="caseTypeNamesFormat7" />

        </el-table-column>
        <el-table-column label="社保" >
          <el-table-column prop="grsb" label="个人缴纳社保" width="100" :formatter="caseTypeNamesFormat8" />
          <el-table-column prop="gssb" label="公司缴纳社保" width="100" :formatter="caseTypeNamesFormat9" />
        </el-table-column>
        <el-table-column label="公积金" >
          <el-table-column prop="grgjj" label="个人缴纳公积金" width="100" :formatter="caseTypeNamesFormat10" />
          <el-table-column prop="gsgjj" label="公司缴纳公积金" width="100"  :formatter="caseTypeNamesFormat11"/>
        </el-table-column>
        <el-table-column prop="zt" label="员工状态" width="100" :formatter="caseTypeNamesFormat13">
          <template #default="scope">
            <span v-if="scope.row.zt===1">正式员工</span>
            <span v-if="scope.row.zt===0">试用员工</span>

          </template>
        </el-table-column>
        <el-table-column prop="yfgzz" label="应发工资" width="100" fixed="right"   :formatter=" caseTypeNamesFormat" />
        <el-table-column prop="sfgz" label="实发工资" width="100" fixed="right" :formatter=" caseTypeNamesFormat12" />
      </el-table>
    </div>

    <!-- 分页插件 -->
    <div class="demo-pagination-block" style="float: right">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.pageSize"
          :default-page-size="pageInfo.pageSize"
          :page-sizes="[3, 4, 5, 6]"
          :page-size="3"
          :pager-count="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="selectEndAuditflow"
          @current-change="selectEndAuditflow"
          prev-text="上一页"
          next-text="下一页"
          background
      >
      </el-pagination>
    </div>


  </div>
<!--  </div>-->
</template>


<script  lang="ts">
export default {
  data() {
    return {
      tableData: [


      ],
      seek:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 15, // 页大小
        total: 0, // 总页数
        staffName:"",
      },
    money:{
        ygmoney:"",
      sfmoney:"",

    },
      sum:[2,2,2,2,2],
      sum1:{},
      dyrz:'',
      lz:'',
      value1:'',
      zsyg:'',
      syyg:'',
      tx:'',
    }

  },
  methods: {
    //当月试用员工
    selectbysyyg() {
      this.axios
          .get("http://localhost:8007/provider/selectbysyyg", {
            params:this.syyg,
          })
          .then((response) => {
            if(response.data.length<1){
              this.syyg=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.syyg = response.data[0].rs

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
    //当月正式员工
    selectbyzsyg() {
      this.axios
          .get("http://localhost:8007/provider/selectbyzsyg", {
            params:this.zsyg,
          })
          .then((response) => {
            if(response.data.length<1){
              this.zsyg=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.zsyg = response.data[0].rs

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

    selectbytx() {
      this.axios
          .get("http://localhost:8007/provider/selectbytx", {
            params:this.tx,
          })
          .then((response) => {
            if(response.data.length<1){
              this.tx=0
            }else {
              for (var i = 0; i < response.data.length; i++) {

                this.tx = response.data[0].rs

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
    //本月入职
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
     js(){
       this.tableData=this.sum;
     },
    caseTypeNamesFormat13 (row) {
      let sfgz = null
      row.yfgz ? sfgz = row.yfgz : sfgz = row.fixedwageOfficialmoney+row.jiabanmoney
      return sfgz
    },

    caseTypeNamesFormat (row) {
      let sfgz = null
      if (row.zt===1){
        row.yfgzz ? sfgz = row.yfgzz : sfgz = row.fixedwageOfficialmoney+row.jiabanmoney

      }else if (row.zt===0){
        row.yfgzz ? sfgz = row.yfgzz : sfgz = row.fixedwagePeriodmoney+row.jiabanmoney
      }

      return sfgz
    },
    caseTypeNamesFormat1 (row) {
      let sfgz = null
      row.fixedwageOfficialmoney ? sfgz = row.fixedwageOfficialmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat2 (row) {
      let sfgz = null
      row.fixedwagePeriodmoney ? sfgz = row.fixedwagePeriodmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat3 (row) {
      let sfgz = null
      row.jiabanmoney ? sfgz = row.jiabanmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat4 (row) {
      let sfgz = null
      row.chidaomony ? sfgz = row.chidaomony : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat5 (row) {
      let sfgz = null
      row.zaotueimoney ? sfgz = row.zaotueimoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat6 (row) {
      let sfgz = null
      row.kuangonmoney ? sfgz = row.kuangonmoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat7 (row) {
      let sfgz = null
      row.qinjiamoney ? sfgz = row.qinjiamoney : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat8 (row) {
      let sfgz = null
      row.grsb ? sfgz = row.grsb : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat9 (row) {
      let sfgz = null
      row.gssb ? sfgz = row.gssb : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat10 (row) {
      let sfgz = null
      row.grgjj ? sfgz = row.grgjj : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat11 (row) {
      let sfgz = null
      row.gsgjj ? sfgz = row.gsgjj : sfgz = 0
      return sfgz
    },
    caseTypeNamesFormat12 (row) {
      let sfgz = null
      if (row.zt===1){
        row.sfgzz ? sfgz = row.sfgzz : sfgz = row.fixedwageOfficialmoney+row.jiabanmoney- row.chidaomony-row.zaotueimoney- row.kuangonmoney-row.qinjiamoney-row.grsb- row.grgjj
      }else if (row.zt===0){

        row.sfgzz ? sfgz = row.sfgzz : sfgz = row.fixedwagePeriodmoney+row.jiabanmoney- row.chidaomony-row.zaotueimoney- row.kuangonmoney-row.qinjiamoney-row.grsb- row.grgjj
      }
      return sfgz
    },

    //查询员工详细工资
    selectEndAuditflow() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/StaffSalarySelect/Staff",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
        console.log(response.data.data.records);
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;


      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
    goblack(){
      let a=0
      for (let i = 0; i < this.sum.length; i++) {
         a+= this.sum[i]
      }
      this.sum1=a
    },
  },created() {
    this.selectEndAuditflow();
    this.selectdyrz();
    this.selectdylz();
    this.selectbyzsyg();
    this.selectbysyyg();
    this.selectbytx();
this.goblack();
  },watch: {
    pageInfo: {
      handler: function () {

        this.selectEndAuditflow();


      },
      deep: true,
    },

  }
}
</script>
<style scoped>
/deep/.el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}


/deep/.icon-p p{
  text-align: center;
}

/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
