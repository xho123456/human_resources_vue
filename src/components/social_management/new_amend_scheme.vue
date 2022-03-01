<template>
<!--新增/修改参保方案-->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;{{ this.$route.query.name }}参保方案</div>

        <!-- 参保方案名称输入框 -->
        <div class="inputs">

          <!--添加到创建默认参保方案表-->
          方案名称：&nbsp;
          <el-input size="mini" v-model="defInsuredName" @blur="judge()" placeholder="输入方案名称"/>

        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;社保方案设置</div>

        <!-- 社保方案设置，表单 -->
        <div class="inputs">
          <span style="font-weight: bold">参缴社保</span><br/>
          社保基数范围：
          <el-input-number
              v-model="defSchemeMin"
              size="mini"
              :min="0"
              controls-position="right"
              placeholder="最少基数"
              style="width: 100px"
          />
          &nbsp; ~ &nbsp;
          <el-input-number
              v-model="defSchemeMax"
              size="mini"
              :min="0"
              controls-position="right"
              placeholder="最多基数"
              style="width: 100px"
          />

          <!-- 社保缴纳项目，表单 -->
          <el-table :data="social_tableData" max-height="464" style="width: 100%">
            <!-- 缴纳项目 -->

            <el-table-column  label="缴纳项目" width="150">
              <template #default="scope">
                <el-select size="mini" v-model="scope.row.defSchemeType" filterable placeholder="Select">
                  <el-option
                      v-for="item in social_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column label="基数范围" width="285">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFloor"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    placeholder="基数下限"
                    style="width: 110px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                    v-model="scope.row.defSchemeUpper"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    placeholder="基数上限"
                    style="width: 110px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column label="公司缴纳比例" width="170">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmProp"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 110px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column label="个人缴纳比例" width="170">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonProp"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 110px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column label="公司固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmSum"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 110px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonSum"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 110px"
                />
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button style="color: red" @click.prevent="deleteRow(scope.$index, social_tableData)" type="text" size="small">
                  <i class="iconfont"  style="font-size: 13px;color: red">&#xe61c</i>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <br/>
          <!-- 新增社保缴纳项目 -->
          <el-button @click="add_social()" size="small" type="primary">+添加缴纳项目</el-button>
        </div>
        <!-- 标题 -->
        <div class="big-title">&nbsp;&nbsp;&nbsp;公积金方案设置</div>

        <!-- 公积金方案设置，表单 -->
        <div class="input" style="margin-bottom: 22px;margin-left: 35px;">
          <el-table :data="accumulation_tableData" max-height="236" style="width: 100%">
            <!-- 缴纳项目 -->
            <el-table-column  label="缴纳项目" width="150">
              <template #default="scope">
                <span>{{scope.row.defSchemeType}}</span>
              </template>
            </el-table-column>
            <!-- 基数范围 -->
            <el-table-column label="基数范围" width="300">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFloor"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    placeholder="基数下限"
                    style="width: 120px"
                />
                &nbsp; ~ &nbsp;
                <el-input-number
                    v-model="scope.row.defSchemeUpper"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    placeholder="基数上限"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 公司缴纳比例 -->
            <el-table-column label="公司缴纳比例" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmProp"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 个人缴纳比例 -->
            <el-table-column prop="city" label="个人缴纳比例" width="180">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonProp"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />&nbsp;&nbsp;%
              </template>
            </el-table-column>
            <!-- 公司固定金额 -->
            <el-table-column prop="address" label="公司固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemeFirmSum"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>
            <!-- 个人固定金额 -->
            <el-table-column prop="zip" label="个人固定金额" width="150">
              <template #default="scope">
                <el-input-number
                    v-model="scope.row.defSchemePersonSum"
                   size="mini"
                    :min="0"
                    controls-position="right"
                    style="width: 120px"
                />
              </template>
            </el-table-column>

          </el-table>
          <br/>
          <!-- 新增公积金缴纳项目 -->
        </div>

        <div style="text-align: center">
          <router-link :to="{path:this.path,query:{path:this.$route.query.path}}">
            <el-button size="small">返回</el-button>
          </router-link>
          &nbsp;&nbsp;
          <el-button size="small" type="primary" @click="judges()">{{ this.$route.query.name}}</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage, ElNotification} from "element-plus";

export default {
  data() {
    return {
      ids:this.$route.query.id,
      path: "/social/basic_setup/insured_scheme",
      // 方案名称
      defInsuredName:'',
      // 社保基数下限
      defSchemeMin: '',
      // 社保基数上限
      defSchemeMax: '',
      // 社保基数
      security_cardinal: 0,
      // 公积金基数
      accumulation_cardinal: 0,
      // 缴纳明细表 (显示/隐藏)
      payment_detail: false,
      // 社保缴纳项目
      social_options: [
        {
          value: '养老保险',
          label: '养老保险',
        },
        {
          value: '失业保险',
          label: '失业保险',
        },
        {
          value: '工伤保险',
          label: '工伤保险',
        },
        {
          value: '生育保险',
          label: '生育保险',
        },
        {
          value: '医疗保险',
          label: '医疗保险',
        },
      ],
      // 公积金缴纳项目
      defSchemeType: "公积金",

      state:'新增',

      // 社保缴纳表数据
      social_tableData: [

      ],

      // 公积金缴纳表数据
      accumulation_tableData: [

      ],
      //缴纳明细表数据
      payment_details_table: [
        {
          defSchemeType: "养老保险", // 缴纳项目
          cardinal_number: 999, // 基数
          defSchemeFirmProp: "11%", // 公司缴纳比例
          company_payment_money: 100, // 公司缴纳金额
          defSchemeFirmSum: 200, // 公司固定金额
          defSchemePersonProp: "6%", // 个人缴纳比例
          personage_payment_money: 66, // 个人缴纳金额
          defSchemePersonSum: 50, // 个人固定金额
        },
      ]
    };
  },
created() {
  this.gain();
  this.add();
},
  methods: {
    /**
     * 参保方案修改
     */
    amend(){
      if(this.defInsuredName.length === 0){
        ElNotification({
          title: '错误消息',
          message: '公告标题不能为空！！',
          type: 'error',
        })
        return false;
      }else{
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/defInsured/amend",
          data:{
            defInsuredId:this.ids,
            defInsuredName:this.defInsuredName,
            defSchemeMin:this.defSchemeMin,
            defSchemeMax:this.defSchemeMax,
            social_tableData:this.social_tableData,
            accumulation_tableData:this.accumulation_tableData

          },
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(request=>{
          console.log(request);
          if(request.data.data==='修改成功'){
            ElMessage({
              type:'success',
              message:'修改成功'
            })
          }else{
            ElMessage.error("修改失败")
          }
        })
      }
    },
    /**
     * 添加公积金列
     */
    add(){
      if(this.$route.query.name==='新增'){
          let social_row = {
            defSchemeType: "公积金", // 缴费项目
            defSchemeFloor: null, // 基数下限、
            defSchemeUpper: null, // 基数上限
            defSchemeFirmProp: null, // 公司缴纳比例
            defSchemePersonProp: null, // 个人缴纳比例
            defSchemeFirmSum: null, // 公司固定金额
            defSchemePersonSum: null, // 个人固定金额
          }
        this.accumulation_tableData.push(social_row)
        }
      },
    /**
     * 修改赋值
     */
    gain(){
      this.axios({
        method:"post",
        url:"http://localhost:8007/provider/defInsured/list",
        data:{
          defInsuredId:this.ids
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((res)=>{
          this.defInsuredName=res.data.data.defInsuredName
          for(let i=0;i<res.data.data.defSchemes.length;i++){
            this.defSchemeMax=res.data.data.defSchemes[0].defSchemeMax
            this.defSchemeMin=res.data.data.defSchemes[0].defSchemeMin
          }
        for(let i=0;i<res.data.data.defSchemes.length-1;i++){
          let social_row = {
            defSchemeId:res.data.data.defSchemes[i].defSchemeId,//项目编号
            defSchemeType: res.data.data.defSchemes[i].defSchemeType, // 缴费项目
            defSchemeFloor: res.data.data.defSchemes[i].defSchemeFloor, // 基数下限、
            defSchemeUpper:res.data.data.defSchemes[i].defSchemeUpper, // 基数上限
            defSchemeFirmProp: res.data.data.defSchemes[i].defSchemeFirmProp, // 公司缴纳比例
            defSchemePersonProp: res.data.data.defSchemes[i].defSchemePersonProp,
            defSchemeFirmSum: res.data.data.defSchemes[i].defSchemeFirmSum,
            defSchemePersonSum: res.data.data.defSchemes[i].defSchemePersonSum, // 个人固定金额
          }
          this.social_tableData.push(social_row)
        }

        for(let i=res.data.data.defSchemes.length-1;i<res.data.data.defSchemes.length;i++){
          let social_row = {
            defSchemeId:res.data.data.defSchemes[i].defSchemeId,//项目编号
            defSchemeType: res.data.data.defSchemes[i].defSchemeType, // 缴费项目
            defSchemeFloor: res.data.data.defSchemes[i].defSchemeFloor, // 基数下限、
            defSchemeUpper:res.data.data.defSchemes[i].defSchemeUpper, // 基数上限
            defSchemeFirmProp: res.data.data.defSchemes[i].defSchemeFirmProp, // 公司缴纳比例
            defSchemePersonProp: res.data.data.defSchemes[i].defSchemePersonProp,
            defSchemeFirmSum: res.data.data.defSchemes[i].defSchemeFirmSum,
            defSchemePersonSum: res.data.data.defSchemes[i].defSchemePersonSum, // 个人固定金额
          }
          this.accumulation_tableData.push(social_row)
        }

          })
    },
    //查询参保名称是否唯一
    judge(){
      if(this.$route.query.name==='新增'){
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/defInsured/name",
          data:{
            defInsuredName:this.defInsuredName
          },
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(request=>{
          console.log(request)
          if(request.data.data ==='该参保名称已存在'){
            ElMessage({
              type:'error',
              message:'该参保名称已存在'
            })
            this.defInsuredName='';
          }
        })
      }else {
        return false;
      }

    },

    //添加
    calculate(){
      if(this.defInsuredName.length === 0){
        ElNotification({
          title: '错误消息',
          message: '公告标题不能为空！！',
          type: 'error',
        })
        return false;
      }else{
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/defInsured/insert",
          data:{
            defInsuredName:this.defInsuredName,
            defSchemeMin:this.defSchemeMin,
            defSchemeMax:this.defSchemeMax,
            social_tableData:this.social_tableData,
            accumulation_tableData:this.accumulation_tableData
          },
          responseType:'json',
          responseEncoding:'utf-8',
        }).then(request=>{
          console.log(request);
          if(request.data.data==='新增成功'){
            ElMessage({
              type:'success',
              message:'新增成功'
            })
          }else{
            ElMessage.error("新增失败")
          }
        })
      }
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    },
    // 新增社保缴纳项目
    add_social() {
      let social_row = {
        defSchemeType: "养老保险", // 缴费项目
        defSchemeFloor: null, // 基数下限、
        defSchemeUpper: null, // 基数上限
        defSchemeFirmProp: null, // 公司缴纳比例
        defSchemePersonProp: null, // 个人缴纳比例
        defSchemeFirmSum: null, // 公司固定金额
        defSchemePersonSum: null, // 个人固定金额
      }
      this.social_tableData.push(social_row)
    },
    judges(){
      if(this.$route.query.name==='新增'){
        this.calculate();
      }else {
        this.amend();
      }
    },

  }

};
</script>

<style scoped>


@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.woff2?t=1640660838786') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.woff?t=1640660838786') format('woff'),
  url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.ttf?t=1640660838786') format('truetype');
}




.el-input {
  width: 20%;
  display: inline-block;
}

.inputs {
  /*  上、右、下、左  */
  padding: 25px 40px 25px 40px;
}

/*!* 内边距 *!*/
/*.j-card-body {*/
/*  padding: 1.5%;*/
/*}*/

.big-title {
  width: 100%;
  /*height: 45px;*/
  background-color: #f2f4fa;
  font-size: 16px;
  font-weight: bold;
  padding: 1%;
}


/* 外层阴影 */
.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

/* 外层div 内边距   */
.j-card-body {
  padding: 2% 4% 2% 2%;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2990377 */
  src: url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff2?t=1639139822080') format('woff2'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.woff?t=1639139822080') format('woff'),
  url('//at.alicdn.com/t/font_2990377_1cwdx3n4atr.ttf?t=1639139822080') format('truetype');
}

</style>