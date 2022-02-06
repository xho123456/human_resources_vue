<!--转正管理-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!--搜索输入框-->
        <el-row style="width: 200px; margin-left: 1060px">
          <el-input v-model.number="seek" placeholder="搜索" @change="selectontrial(this.seek)">
            <template #suffix>
              <el-icon class="el-input__icon"><i-search /></el-icon>
            </template>
          </el-input>
        </el-row>



        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" stripe style="width: 100% " >
            <el-table-column fixed prop="staffName" label="姓名" width="150" />
            <el-table-column prop="staffId" label="工号" width="150" />
            <el-table-column prop="staffSex" label="性别" width="150" />
            <el-table-column prop="deptName" label="部门" width="150" />
            <el-table-column prop="postname" label="职位" width="150" />
            <el-table-column prop="staffPhone" label="手机" width="150" />
            <el-table-column prop="staffIdentity" label="身份证" width="150" />
            <el-table-column prop="staffOutlook" label="政治面貌" width="150" />
            <el-table-column prop="staffstate" label="状态" width="150" >
              <template #default="scope">
                <span v-if="scope.row.staffstate==0">试用</span>
                <span v-if="scope.row.staffstate==1">正式</span>
              </template>
            </el-table-column>
            <el-table-column  prop="staffHIREDATE" label="入职日期" sortable  width="150"/>
            <el-table-column label="试用期限" width="150">
              <template #default="scope">
                <span>三个月</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作">
          <template #default>
            <el-button type="text" size="small" @click="become = true">办理转正</el-button>
          </template>
          </el-table-column>
          </el-table>

        </div>


        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[3, 5, 10, 50]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              background
              @size-change="selectontrial(this.seek)"
              @current-change="selectontrial(this.seek)"
          >
          </el-pagination>
        </div>


      </div>
    </div>
  </div>
<div>
  <el-dialog
      v-model="become"
      title="转正"
      width="50%"
      :close-on-click-modal="false"
  >
    <el-form
        ref="form_1"
        :model="become_1"
        label-width="120px"
        :rules="rules"
    >
      <el-form-item label="员工名称 :" prop="name" style="">
        <el-input v-model="become_1.name" disabled ></el-input>
      </el-form-item>
      <el-form-item label="部门名称 :" prop="dept">
        <el-input v-model="become_1.dept" disabled></el-input>
      </el-form-item>
      <el-form-item label="职位 :">
        <el-input v-model="become_1.post" disabled></el-input>
      </el-form-item>
      <el-form-item label="入职日期 :">
        <el-input v-model="become_1.entrydate" disabled></el-input>
      </el-form-item>
      <el-form-item label="试用期限 :">
        <el-input v-model="become_1.tryoutdate" disabled></el-input>
      </el-form-item>
      <el-form-item label="转正类型" prop="type" style="width:600px">
        <el-select
             v-model="become_1.type"
            placeholder="请选择"
        >
          <el-option label="转正" value="zz" style="margin-left: 20px"></el-option>
          <el-option label="提前转正" value="tqzz" style="margin-left: 20px"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正日期 :" prop="becomedate">
        <el-date-picker
            v-model="become_1.becomedate"
            type="date"
            placeholder="选择时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="转正备注 :">
        <el-input
            v-model="become_1.remarks"
            type="textarea"
            maxlength="500"
            show-word-limit
            prop="remarks_1"
        ></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
          <span class="dialog-footer">
            <el-button style="width: 60px" type="primary" @click="submitForm('form_1')"
            >确定</el-button
            >
            <el-button style="width: 60px" @click="become = false,RestForm()">取消</el-button>
          </span>
    </template>
  </el-dialog>




</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {ElMessage} from "element-plus/es";
export default defineComponent({

  data() {
    const one = (rule, value, callback) => {
      if (new Date()>value){
        callback(new Error("转正日期不能小于当前时间"));
      }else {
        callback();
      }
    };
    return {
      tableData: [
        {
          staffName: '',
          staffId:"",
          deptName: '',
          postname: '',
          staffPhone: '',
          staffOutlook: '',
          staffHIREDATE: '',
          staffSex:'',
          staffIdentity:'',
          staffstate:'',
        },

      ],
      seek:null,
      become_1:{
        name:'',
        dept:'',
        post:'',
        entrydate:'',
        tryoutdate:'',
        type:'',
        remarks:'',
        becomedate:''
      },
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数\

        staffName: '',
        staffId:"",
      },
      rules: {
        type: [
          {
            required: true,
            message: '请选择转正类型',
            trigger: 'change',
          },
        ],
        becomedate:[
          {
            required:true,
            message:'请选择转正日期',
            trigger:'change'
          },
          {
            validator: one, trigger: "change"
          },
        ],
      }
    };
  },
  setup() {
    const become = ref(false)
    return{
      become,
    }
  },created() {
    this.selectontrial(null);

  },
  methods:{
    selectontrial(like){
      if(Object.prototype.toString.call(like)===Object.prototype.toString.call(null)){
        var _this = this;
        _this.axios.get(
            "http://localhost:8007/provider/staff/turnright", {
              params:this.pageInfo,
            }).then((response)=>{
          console.log(response);
          _this.tableData = response.data.data.records
          _this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call(123)){
        this.pageInfo.staffId=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/turnright/getId",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableData = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })

      }else if (Object.prototype.toString.call(like)===Object.prototype.toString.call("周刘奇")){
        this.pageInfo.staffName=like;
        this.axios({
          method:'post',
          url:"http://localhost:8007/provider/staff/turnright/likename",
          data:this.pageInfo,
          responseType:'json',
          responseEncoding:'utf-8',
        }).then((response)=>{
          console.log(response);
          this.tableData  = response.data.data.records
          this.pageInfo.total=response.data.data.total
        }).catch(function (error){
          console.log('获取表单失败')
          console.log(error)
        })
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    RestForm(){
      this.become_1={
        name:'',
            dept:'',
            post:'',
            entrydate:'',
            tryoutdate:'',
            type:'',
            remarks:'',
            becomedate:''
      }
    }
  }
})
</script>


<style scoped>
@import url("../../css/navigation.css");
/deep/.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

/deep/.cell {
  padding-left: 10px;
  text-align: center;
  color: black;
}
/deep/.el-form-item {
  display: flex;
  margin-bottom: 22px;
}

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

/deep/.el-table .el-table__cell{
  text-align: center;
}
</style>
