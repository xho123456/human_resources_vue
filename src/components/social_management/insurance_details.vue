<template>
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
          姓名：{{datas.staffName}} <br />
          部门：{{datas.deptName}} <br />
          职位：{{datas.postName}} <br /><br /><br />
          参保方案：{{datas.defInsuredName}} <br />
          社保基数：{{datas.insuredPaymentNumber}} <br />
          社保参保月份：{{datas.insDetailInsuredMonth}} <br />
          公积金基数：{{datas.insuredPaymentFund}} <br />
          公积金参保月份： {{datas.insDetailInsuredMonth}}<br />
        </div>


        <el-button size="mini" type="text" style="font-size: 14px;margin-top: 10px" @click="remove()" >
          更改方案
        </el-button>

      </div>

      <!-- 右 -->
      <div class="payment_project">
        <!-- 缴纳明细表 -->
        <el-table :data="tableData" size="mini"
                  :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                  @selection-change="deletepl"
        >
          <el-table-column prop="defSchemeType" label="缴纳项目" />

          <el-table-column label="基数">
            <el-table-column prop="basePay" label="缴纳基数" />
              <el-table-column label="基数范围">
                  <el-table-column prop="defSchemeMin" label="最低" />
                  <el-table-column prop="defSchemeMax" label="最高" />
              </el-table-column>
            <el-table-column prop="defSchemeFloor" label="下限" />
            <el-table-column prop="defSchemeUpper" label="上限" />
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
  </div>
</template>

<script>
/* 时间线 */
import { defineComponent } from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
// import { MoreFilled } from "@element-plus/icons-vue";

export default {
  setup() {
    return {
      // /* 时间线 */
      activities: [
        {
          content: "Custom icon",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",

        },
        {
          content: "Custom color",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "Custom size",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "Custom hollow",
          timestamp: "2018-04-03 20:46",
          type: "primary",
          hollow: true,
        },
        {
          content: "Default node",
          timestamp: "2018-04-03 20:46",
        },
      ],
    };
  },
  data() {
    return {
      datas:{
        staffName:"",
        deptName:"",
        postName:"",
        defInsuredName:"",
        insuredPaymentNumber:"",
        insDetailInsuredMonth:"",
        insuredPaymentFund:"",
        insuredPaymentId:'',
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
    remove(){
      ElMessageBox.confirm(
          '是否确定更改方案！！！',
          '友情提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '友情提示',
          }
      )
          .then(() => {
            this.change();
          })


    },
    /**
     * 更改参保方案
     */
    change(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredPayment/change",
        data:{
          insuredPaymentId:this.datas.insuredPaymentId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        if(response.data.data === '更改成功'){
          ElMessage({
            type:'success',
            message:'更改成功'
          })
          this.$router.push({path:'/social/social_management/insured_management'})
        }else{
          ElMessage.error("更改失败")
        }
      })
    },
    /**
     * 查询个人的默认方案数据数据
     */
    selectscheme(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredDetail/scheme",
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
        url:"http://localhost:8007/provider/insuredDetail/datas",
        data:{
          staffId:this.$route.query.id
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{

        this.datas.staffName=response.data.data.staffName
        this.datas.deptName=response.data.data.deptName
        this.datas.postName=response.data.data.postName
        this.datas.defInsuredName=response.data.data.defInsuredName
        this.datas.insuredPaymentFund=response.data.data.insuredPaymentFund
        this.datas.insuredPaymentNumber=response.data.data.insuredPaymentNumber
        this.datas.insDetailInsuredMonth=response.data.data.insDetailInsuredMonth
        this.datas.insuredPaymentId=response.data.data.insuredPaymentId
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