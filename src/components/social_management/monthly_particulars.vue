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
          姓名：{{datas.insArchiveStaffName}} <br />
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
        <el-table :data="tableData" size="small"
                  :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                  :cell-style="{ textAlign: 'center' }"
                  :default-sort="{ prop: 'date', order: 'descending' }"
                  @selection-change="deletepl"
        >
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
      tableData: [],

    };
  },
  created() {
    this.selectPaers()

  },
  methods:{


    /**
     * 查询个人的明细数据
     */
    selectPaers(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/insuredArchive/selectId",
        data:{
          insArchiveId:this.$route.query.ids
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        this.datas.insArchiveStaffName=response.data.data.insArchiveStaffName
        this.datas.insArchiveDeptName=response.data.data.insArchiveDeptName
        this.datas.insArchivePostName=response.data.data.insArchivePostName
        this.datas.insArchiveInsuredName=response.data.data.insArchiveInsuredName
        this.datas.insArchiveInsuredMonth=response.data.data.insArchiveInsuredMonth

        let value1 = {
          //方案名称
          defSchemeType: "养老保险",
          //缴纳基数
          basePay: response.data.data.insArchivePrNumber,
          //公司缴纳比例
          defSchemeFirmProp: response.data.data.insArchivePrFirmProp,
          //公司固定金额
          defSchemeFirmSum: response.data.data.insArchivePrFirmSum,
          //个人缴纳比例
          defSchemePersonProp: response.data.data.insArchivePrPersonProp,
          //个人固定金额
          defSchemePersonSum: response.data.data.insArchivePrPersonSum,

          //小计
          subtotal:((response.data.data.insArchivePrNumber * response.data.data.insArchivePrFirmProp*0.01 + response.data.data.insArchivePrFirmSum)
              +(response.data.data.insArchivePrNumber* response.data.data.insArchivePrPersonProp*0.01+response.data.data.insArchivePrPersonSum)).toFixed(2)

        }
        let value2 = {
          //方案名称
          defSchemeType: "医疗保险",
          //缴纳基数
          basePay: response.data.data.insArchiveMdNumber,
          //公司缴纳比例
          defSchemeFirmProp: response.data.data.insArchiveMdFirmProp,
          //公司固定金额
          defSchemeFirmSum: response.data.data.insArchiveMdFirmSum,
          //个人缴纳比例
          defSchemePersonProp: response.data.data.insArchiveMdPersonProp,
          //个人固定金额
          defSchemePersonSum: response.data.data.insArchiveMdPersonSum,

          //小计
          subtotal:((response.data.data.insArchiveMdNumber * response.data.data.insArchiveMdFirmProp*0.01 + response.data.data.insArchiveMdFirmSum)
              +(response.data.data.insArchiveMdNumber* response.data.data.insArchiveMdPersonProp*0.01+response.data.data.insArchiveMdPersonSum)).toFixed(2)

        }

        let value3 = {
          //方案名称
          defSchemeType: "失业保险",
          //缴纳基数
          basePay: response.data.data.insArchiveUnNumber,
          //公司缴纳比例
          defSchemeFirmProp: response.data.data.insArchiveUnFirmProp,
          //公司固定金额
          defSchemeFirmSum: response.data.data.insArchiveUnFirmSum,
          //个人缴纳比例
          defSchemePersonProp: response.data.data.insArchiveUnPersonProp,
          //个人固定金额
          defSchemePersonSum: response.data.data.insArchiveUnPersonSum,

          //小计
          subtotal:((response.data.data.insArchiveUnNumber * response.data.data.insArchiveUnFirmProp*0.01 + response.data.data.insArchiveUnFirmSum)
              +(response.data.data.insArchiveUnNumber* response.data.data.insArchiveUnPersonProp*0.01+response.data.data.insArchiveUnPersonSum)).toFixed(2)

        }
        let value4 = {
          //方案名称
          defSchemeType: "工伤保险",
          //缴纳基数
          basePay: response.data.data.insArchiveOcNumber,
          //公司缴纳比例
          defSchemeFirmProp: response.data.data.insArchiveOcFirmProp,
          //公司固定金额
          defSchemeFirmSum: response.data.data.insArchiveOcFirmSum,
          //个人缴纳比例
          defSchemePersonProp: response.data.data.insArchiveOcPersonProp,
          //个人固定金额
          defSchemePersonSum: response.data.data.insArchiveOcPersonSum,

          //小计
          subtotal:((response.data.data.insArchiveOcNumber * response.data.data.insArchiveOcFirmProp*0.01 + response.data.data.insArchiveOcFirmSum)
              +(response.data.data.insArchiveOcNumber* response.data.data.insArchiveOcPersonProp*0.01+response.data.data.insArchiveOcPersonSum)).toFixed(2)

        }

        let value5 = {
          //方案名称
          defSchemeType: "生育保险",
          //缴纳基数
          basePay: response.data.data.insArchiveGiNumber,
          //公司缴纳比例
          defSchemeFirmProp: response.data.data.insArchiveGiFirmProp,
          //公司固定金额
          defSchemeFirmSum: response.data.data.insArchiveGiFirmSum,
          //个人缴纳比例
          defSchemePersonProp: response.data.data.insArchiveGiPersonProp,
          //个人固定金额
          defSchemePersonSum: response.data.data.insArchiveGiPersonSum,

          //小计
          subtotal:((response.data.data.insArchiveGiNumber * response.data.data.insArchiveGiFirmProp*0.01 + response.data.data.insArchiveGiFirmSum)
              +(response.data.data.insArchiveGiNumber* response.data.data.insArchiveGiPersonProp*0.01+response.data.data.insArchiveGiPersonSum)).toFixed(2)

        }

        let value6 = {
          //方案名称
          defSchemeType: "公积金",
          //缴纳基数
          basePay: response.data.data.insArchiveFuNumber,
          //公司缴纳比例
          defSchemeFirmProp: response.data.data.insArchiveFuFirmProp,
          //公司固定金额
          defSchemeFirmSum: response.data.data.insArchiveFuFirmSum,
          //个人缴纳比例
          defSchemePersonProp: response.data.data.insArchiveFuPersonProp,
          //个人固定金额
          defSchemePersonSum: response.data.data.insArchiveFuPersonSum,

          //小计
          subtotal:((response.data.data.insArchiveFuNumber * response.data.data.insArchiveFuFirmProp *0.01+ response.data.data.insArchiveFuFirmSum)
              +(response.data.data.insArchiveFuNumber* response.data.data.insArchiveFuPersonProp*0.01+response.data.data.insArchiveFuPersonSum)).toFixed(2)

        }
        this.tableData.push(value1)
        this.tableData.push(value2)
        this.tableData.push(value3)
        this.tableData.push(value4)
        this.tableData.push(value5)
        this.tableData.push(value6)
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