
<!--工资表 -->
<template>
  <div>
    <el-tabs type="card" @tab-click="handleClick">

      <!--月份选择框·-->

      <el-button type="primary" style="margin-left: 16px" @click="insertStaffWag()"
      >生成员工工资表
      </el-button>


      <el-tab-pane label="未归档">

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 105%">
            <el-table-column prop="" label="计薪人数" width="210">
            <template #default="scope">
              <span>{{rs}}</span>
            </template>
            </el-table-column>

            <el-table-column prop="" label="应发工资" width="210">
              <template #default="scope">
                <span>{{yfgz2}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="实发工资" width="210">
              <template #default="scope">
                <span>{{sfgz2}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="公司缴纳" width="210">
              <template #default="scope">
                <span>{{gsjn}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="员工成本" width="210">
              <template #default="scope">
                <span>{{ygcb}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="210">
              <template #default>
                <router-link :to="{path:this.wagesheet,query:{path: this.$route.query.path}}"><el-button type="text" size="small" @click="handleClick">查看工资表&nbsp;</el-button></router-link>
                <!--                      <el-button type="text" size="small" @click="handleClick">归档</el-button>-->
                <el-popconfirm @confirm="pd()"
                               title="确定归档吗?">
                  <template #reference>
                    <el-button type="text" size="small" >归档</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>


      </el-tab-pane>

    </el-tabs>


    <!--          <template #default>
                <router-link :to="{path:this.wagesheet,query:{path: this.$route.query.path}}"><el-button type="text" size="small" @click="handleClick">查看工资表&nbsp;</el-button></router-link>
              </template>-->
  </div>



</template>
<script lang="ts">
import {ElMessage} from "element-plus";

export default {

  data() {
    return {
      //工资表
      wagesheet:'/salary/wagesheet',
      tableData: [

      ],
      tableData1: [
      ],
      months:'',
      seek:'',
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
        staffName:'',
      },
      pageInfo1: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
        staffName:'',
      },
      ygname:{},
      ygid:[],
      nogz:[],
      options:[
        {
          value: '',
          label: '',
        },

      ],
      staffmoney:{
        sfgz:"",
        yfgz:"",
      },
      sfgz:[],
      grsb:[],
      grgjj:[],
      gsgjj:[],
      gssb:[],
      yfgz:[],
      zsgz:[],
      qj:[],
      kg:[],
      zt:[],
      cd:[],
      jb:[],
      sfgz1:'',
      grsb1:'',
      grgjj1:'',
      gsgjj1:'',
      gssb1:'',
      yfgz1:'',
      zsgz1:'',
      qj1:'',
      kg1:'',
      zt1:'',
      cd1:'',
      jb1:'',
      gsjn:'',
      ygcb:'',
      yfgz2:'',
      sfgz2:'',
      sygz:'',
      guidan:{
        moneypigeonholeFirmpayment:'',
        moneypigeonholeAskperson:'',
        moneypigeonholeSalary:'',
        moneypigeonholePayrollsalary:'',
        moneypigeonholeStaffcost:'',
        totalwage:'',
      },
      time:'',
      guidanid:'',
rs:'',
    }


  },  methods: {
    selectStaffSalary() {

      this.axios

          .get("http://localhost:8007/provider/selectStaffSalary", {
            params:this.options,
          })
          .then((response) => {
            this.tableData .push(1);
            console.log("查询cao1111111");
            this.pageInfo1.total = response.data.length;
            this.rs=response.data.length;
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].sfgz == null) {

              } else {
                this.sfgz.push(response.data[i].sfgz)

              }
              if (response.data[i].yfgz == null) {

              } else {
                this.yfgz.push(response.data[i].yfgz)

              }
              if (response.data[i].grgjj == null) {

              } else {

                this.grgjj.push(response.data[i].grgjj)

              }
              if (response.data[i].grsb == null) {

              } else {
                this.grsb.push(response.data[i].grsb)
              }
              if (response.data[i].gssb == null) {

              } else {
                this.gssb.push(response.data[i].gssb)
              }
              if (response.data[i].gsgjj == null) {

              } else {
                this.gsgjj.push(response.data[i].gsgjj)
              }

              if (response.data[i].fixedwageOfficialmoney == null) {

              } else {
           if(response.data[i].zt==1){
             this.zsgz.push(response.data[i].fixedwageOfficialmoney)
             alert(response.data[0].zt)
           } else {
             this.zsgz.push(response.data[i].fixedwagePeriodmoney)

           }

              }
              if (response.data[i].chidaomony == null) {

              } else {
                this.cd.push(response.data[i].chidaomony)
              }


              if (response.data[i].zaotueimoney == null) {

              } else {
                this.zt.push(response.data[i].zaotueimoney)

              }

              if (response.data[i].kuangonmoney == null) {

              } else {
                this.kg.push(response.data[i].kuangonmoney)
              }
              if (response.data[i].qinjiamoney == null) {

              } else {
                this.qj.push(response.data[i].qinjiamoney)
              }

              if (response.data[i].jiabanmoney == null) {

              } else {
                this.jb.push(response.data[i].jiabanmoney)
              }

              let a = 0
              for (let i = 0; i < this.qj.length; i++) {
                a += this.qj[i]
              }
              let a9 = 0
              for (let i = 0; i < this.jb.length; i++) {
                a9 += this.jb[i]
              }
              this.jb1 = a9
              let a10 = 0
              for (let i = 0; i < this.cd.length; i++) {
                a10 += this.cd[i]
              }
              this.cd1 = a10
              let a1 = 0
              for (let i = 0; i < this.kg.length; i++) {
                a1 += this.kg[i]
              }
              this.kg1 = a1

              let a2 = 0
              for (let i = 0; i < this.grsb.length; i++) {
                a2 += this.grsb[i]
              }
              this.grsb1 = a2

              let a3 = 0
              for (let i = 0; i < this.grgjj.length; i++) {
                a3 += this.grgjj[i]
              }
              this.grgjj1 = a3

            }
            let a4 = 0
            for (let i = 0; i < this.zt.length; i++) {
              a4 += this.zt[i]
            }
            this.zt1 = a4

            let a5 = 0
            for (let i = 0; i < this.qj.length; i++) {
              a5 += this.qj[i]
            }
            this.qj1 = a5

            let a6 = 0
            for (let i = 0; i < this.zsgz.length; i++) {
              a6 += this.zsgz[i]
            }
            this.zsgz = a6
            let a7 = 0
            for (let i = 0; i < this.gssb.length; i++) {
              a7 += this.gssb[i]
            }
            this.gssb1 = a7
            let a8 = 0
            for (let i = 0; i < this.gsgjj.length; i++) {
              a8 += this.gsgjj[i]
            }
            this.gsgjj1 = a8
            this.gsjn = this.gssb1 + this.gsgjj1 + this.grsb1 + this.grgjj1
            this.ygcb = this.zsgz
            this.yfgz2 = this.ygcb + this.jb1
            this.sfgz2 = this.ygcb + this.jb1 - this.kg1 - this.qj1 - this.zt1 - this.cd1



            this.guidan.moneypigeonholeStaffcost = this.ygcb
            this.guidan.moneypigeonholeSalary = this.yfgz2
            this.guidan.moneypigeonholePayrollsalary = this.sfgz2
            this.guidan.moneypigeonholeFirmpayment = this.gsjn
            this.guidan.moneypigeonholeAskperson = this.pageInfo1.total
            this.guidan.totalwage = this.sfgz2 + this.gsjn


          })

          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //工资归档
    addguidan() {
      this.guidan.createdTime=this.nogz
      alert(this.guidan.createdTime)
      this.axios.post("http://localhost:8007/provider/guidanwag", this.guidan)
          .then(response => {
            this.guidan.moneypigeonholeId = null
            if (response.data === "失败") {
              ElMessage.error('失败')
            } else {
              ElMessage({
                message: '归档成功',
                type: 'success',

              })
              this.selectbygdid();
            }
          }).catch(function (error) {
        console.log(error);
      });
    },
    selectEndAuditflow() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/chagzweiguidan/a",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
        console.log("完成1")
        console.log(response+"卧槽");
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },
    //查询员工有那些
    selectStaff() {
      this.axios
          .get("http://localhost:8007/provider/cha", {
            params:this.options,
          })
          .then((response) => {

            console.log("查询cao");
            console.log(response);

            for(let i=0; i<response.data.length;i++){
              console.log(i)
              this.ygid.push(response.data[i].staffId)
            }


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    insertStaffWag(){
      if (this.nogz.length===0){
        this.axios.post("http://localhost:8007/provider/insert/StaffWag", this.ygid)
            .then(res => {
              if (res.data.data == '成功') {
                ElMessage({
                  type: 'success',
                  message: '生成成功'
                })
                this.selectbynogz();
              } else {
                ElMessage.error("生成失败")
              }
            })
      }else {
        ElMessage.error("本月员工工资表已生成，请勿重复生成")
      }
    },
    selectbynogz() {
      this.axios
          .get("http://localhost:8007/provider/chabynogz", {
            params:this.nogz,
          })
          .then((response) => {
            this.nogz = response.data[0].year
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //查询本月工资表是否有
    selectbyyf () {
      this.axios
          .get("http://localhost:8007/provider/selectbyyf", {
            params:this.time,
          })
          .then((response) => {
            this.time = response.data[0].year
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },


    //查询本月工资表id并为查询每月归档员工工资详情做准备
    selectbygdid () {
      this.axios
          .get("http://localhost:8007/provider/selectbyid", {
            params:this.guidanid,
          })
          .then((response) => {
            this.guidanid = response.data[0].moneypigeonholeId
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    //工资表归档
    select(){
      // this.axios.post("http://localhost:8007/provider/insert/Stag", this.time)
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/chagzweiguidanda",
        data:{
          time: this.time,
          moneypigeonholeId:this.guidanid
        },
        responseType:'json',
        responseEncoding:'utf-8'
      }).then(response=>{

      })

    },
    //判断本月是否有归档
    pd(){
      if (this.time==""){
     this.addguidan();
      }else {
        ElMessage.error("本月工资表已归档，请勿重复归档")

      }
    }
  },created() {
    this.selectEndAuditflow();
    this.selectStaff();
    this.selectbynogz();
    this.selectStaffSalary()
this.selectbyyf();
  }
}

</script>
<style scoped>
@import url("../../css/Salary.css");
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}
/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}
/deep/.el-tabs__item{
  padding-left: 18px;
}
/deep/.el-tabs__header .el-tabs__item.is-active{
  border-bottom-color: #2196f3;
}
/deept/.table__header{
 width:  1254px;
}
</style>