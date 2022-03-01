<template>
  <!--个人月度详情-->
  <div class="outer-div">
    <!-- 标题 -->
    <div class="big-title">&nbsp;&nbsp;&nbsp;参保明细</div>
    <!-- 个人缴费信息 -->
    <div class="insured_details">
      <!-- 左 -->
      <div class="payment_details">
        <!-- 个人信息 -->
        <div style="float: left">
          <el-image class="picture" :src="url"></el-image>
        </div>
        <div style="margin-top: 20px">
          姓名：{{datas.insDetailStaffName}} <br />
          部门：{{datas.insArchiveDeptName}} <br />
          职位：{{datas.insArchivePostName}} <br /><br /><br />
          参保方案：{{datas.insArchiveInsuredName}} <br />
          社保参保月份：{{datas.insArchiveInsuredMonth}} <br />
          公积金参保月份： {{datas.insArchiveInsuredMonth}}<br />
        </div>

      </div>

      <!-- 右 -->
      <div class="payment_project">
        <!-- 缴纳明细表 -->
        <el-table :data="tableData" size="mini">
          <el-table-column prop="defSchemeType" label="缴纳项目" />

          <el-table-column label="基数">
            <el-table-column prop="basePay" label="缴纳基数" />
          </el-table-column>

          <el-table-column label="公司缴纳">
            <el-table-column prop="defSchemeFirmProp" label="缴纳比例" />
            <el-table-column prop="defSchemeFirmSum" label="固定金额" />
          </el-table-column>

          <el-table-column label="个人缴纳">
            <el-table-column prop="defSchemePersonProp" label="缴纳比例" />
            <el-table-column prop="defSchemePersonSum" label="固定金额" />
          </el-table-column>

          <el-table-column prop="subtotal" label="小计" />

        </el-table>
      </div>
    </div>
    {{this.$route.query.id}}
  </div>
</template>

<script>
/* 时间线 */
import { defineComponent } from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
// import { MoreFilled } from "@element-plus/icons-vue";

export default {

  data() {
    return {
      datas:{
        insArchiveStaffName:"",
        insArchiveDeptName:"",
        insArchivePostName:"",
        insArchiveInsuredName:"",
        insArchiveInsuredMonth:"",

      },
      tableData: [

      ],
    };
  },
  created() {
    this.selectPaers()
    this.selectscheme()
  },
  methods:{
    /**
     * 查询个人的默认方案数据数据
     */
    selectscheme(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider",
        data:{
          staffId:this.$route.query.id
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        for(let i=0;i<response.data.data.length;i++){
          this.tableData.push(response.data.data[i])
        }
        //计算某员工的每一条社保金额
        for (let i = 0; i <this.tableData.length ; i++) {
          if(this.tableData[i].defSchemeType==='公积金'){

            if(this.datas.insuredPaymentFund<=this.tableData[i].defSchemeMin){

              if(this.tableData[i].defSchemeMin<=this.tableData[i].defSchemeFloor){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeFloor
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else if(this.tableData[i].defSchemeMin>=this.tableData[i].defSchemeUpper){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeUpper
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else {

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeMin
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }

            }else if(this.datas.insuredPaymentFund>=this.tableData[i].defSchemeMax){

              if(this.tableData[i].defSchemeMax<=this.tableData[i].defSchemeFloor){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeFloor
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else if(this.tableData[i].defSchemeMax>=this.tableData[i].defSchemeUpper){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeUpper
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else {

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeMax
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }

            }else{

              if(this.tableData[i].insuredPaymentFund<=this.tableData[i].defSchemeFloor){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeFloor
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else if(this.tableData[i].insuredPaymentFund>=this.tableData[i].defSchemeUpper){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeUpper
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else {

                this.tableData[i]["basePay"]= this.tableData[i].insuredPaymentFund
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }

            }
            //社保
          }else{
            if(this.datas.insuredPaymentNumber<=this.tableData[i].defSchemeMin){

              if(this.tableData[i].defSchemeMin<=this.tableData[i].defSchemeFloor){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeFloor
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else if(this.tableData[i].defSchemeMin>=this.tableData[i].defSchemeUpper){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeUpper
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else {

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeMin
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }

            }else if(this.datas.insuredPaymentNumber>=this.tableData[i].defSchemeMax){

              if(this.tableData[i].defSchemeMax<=this.tableData[i].defSchemeFloor){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeFloor
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else if(this.tableData[i].defSchemeMax>=this.tableData[i].defSchemeUpper){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeUpper
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else {

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeMax
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }

            }else{
              if(this.tableData[i].insuredPaymentNumber<=this.tableData[i].defSchemeFloor){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeFloor
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else if(this.tableData[i].insuredPaymentNumber>=this.tableData[i].defSchemeUpper){

                this.tableData[i]["basePay"]= this.tableData[i].defSchemeUpper
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }else {

                this.tableData[i]["basePay"]= this.tableData[i].insuredPaymentNumber
                let firm=this.tableData[i]["basePay"]*this.tableData[i].defSchemeFirmProp*0.01+this.tableData[i].defSchemeFirmSum
                let personage=this.tableData[i]["basePay"]*this.tableData[i].defSchemePersonProp*0.01+this.tableData[i].defSchemePersonSum
                this.tableData[i]["subtotal"]=firm+personage

              }

            }
          }
        }

      })
    },
    /**
     * 查询个人的明细数据
     */
    selectPaers(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/",
        data:{
          staffId:this.$route.query.id
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.error(response.data)
        this.datas.insArchiveStaffName=response.data.data.insArchiveStaffName
        this.datas.insArchiveDeptName=response.data.data.insArchiveDeptName
        this.datas.insArchivePostName=response.data.data.insArchivePostName
        this.datas.insArchiveInsuredName=response.data.data.insArchiveInsuredName
        this.datas.insArchiveInsuredMonth=response.data.data.insArchiveInsuredMonth

      })
    },

  }
};
</script>

<style lang="scss" scoped>
/* 个人头像 */
.picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* 缴费项目 */
.payment_project {
  background-color: blue;
  display: inline-block;
  float: right;
  width: 73%;

}

/* 缴费信息 */
.payment_details {
  display: inline-block;
  float: left;
  width: 25%;
  margin-top: 50px;
}

/* 参保明细 */
.insured_details {
  text-align: center;
  height: 400px;
  margin: 0.5%;
}

/* 外层div */
.outer-div {
  padding: 10px 1%;
}

/* 标题 */
.big-title {
  width: 100%;
  //height: 45px;
  background-color: #f2f4fa;
  font-size: 16px;
  font-weight: bold;
  padding: 1%;
  margin-bottom: 20px;
}
</style>