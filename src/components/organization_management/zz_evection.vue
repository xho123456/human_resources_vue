<template>
  <div class="w">
    <div class="head">
      <el-button type="primary" style="margin-left: 16px" @click="dialogVisible=true"
      >新增
      </el-button>
      <el-dialog
          v-model="dialogVisible"
          title="新增"
          width="30%"
          :before-close="handleClose"
      >


        <span>部门名称：   </span>
        <el-input v-model="dept.deptName" placeholder="请输入部门名称" style="width: 200px;margin-left: 10px"/><br>
        <span>部门负责人：</span>
        <el-select v-model="dept.staffId" placeholder="请选择部门负责人">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.staffName"
              :value="item.staffid"
          >
          </el-option>
        </el-select>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addDept()"
        >确定</el-button
        >
      </span>
        </template>
      </el-dialog>
      <el-input size="small" v-model="input" placeholder="搜索" style="width:150px;position: absolute;right: 80px;">
          <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

    </div>

    <div class="y">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <p>部门负责人: {{ props.row.state }}</p>
            <p>City: {{ props.row.city }}</p>
            <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="deptId" />
        <el-table-column label="部门" prop="deptName" />
		<el-table-column label="部门负责人" prop="staffName" />
		<el-table-column label="状态" prop="deptState" />
        <el-table-column prop="operate" label="操作" >
          <template #default>
            <el-popconfirm @confirm="deleteRow(scope.$index, tableData)"
                           title="确认要删除此方案吗?">
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange">删除 </el-button>
              </template>
            </el-popconfirm>
            <el-button type="text" size="small" style="color:darkorange" @click="dialogVisible1=true">修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          v-model="dialogVisible1"
          title="修改"
          width="30%"

      >
        <div style="display: block;margin-bottom: 5px">
        <span>部门名称：   </span>
        <el-input v-model="input1" placeholder="请输入部门名称" style="width: 200px;margin-left: 10px"/>
          </div>
          <br>
      <div style="display: block;margin-bottom: 5px">
        <span>部门负责人：</span>
        <el-select v-model="dept.value1" placeholder="请选择部门负责人">
          <el-option
              v-for="item in options1"
              :key="item.dept.value1"
              :label="item.staffName"
              :value="item.staffName"
          >
          </el-option>
        </el-select>
      </div>
        <br>
        <div>
        <span style="margin-right: 15px">状态</span>

          <el-radio v-model="radio1" label="1">启用</el-radio>
          <el-radio v-model="radio1" label="2">禁用</el-radio>
        </div>

        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
        >确定</el-button
        >
      </span>
        </template>
      </el-dialog>

    </div>
    <div class="demo-pagination-block">
      <el-pagination

          v-model:currentPage="pageInfo.currentPage"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
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
    {{this.options}}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {ElMessage} from "element-plus";
export default {
  data() {
    return {

      dept: {
        staffId:'',
        deptName:'',
        input: '',
        input1: '',
      },
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      dialogVisible:false,
      dialogVisible1:false,
      radio1:"",

        tableData: [
                {
                  date: '',
                  name: '',
                  state: '',
                  city: '',
                  address: '',
                  zip: '',
                },
              ],
      options:[
        {
          value: '',
          label: '',
        },

      ],
      options1:[
        {
          value: '',
          label: '',
        },

      ]
            };

  },
  methods: {

    selectStaff() {
      this.axios
          .get("http://localhost:8007/provider/cha", {
       params:this.options,
          })
          .then((response) => {
            console.log("查询");
            console.log(response);
           /* alert(this.pageInfo.currentPage+"this.pageInfo.currentPage")*/
           /* alert(response.data.size+"response.data.size")*/
              this.options=response.data;
               this.options1=response.data;

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    addDept(){
      this.axios.post("http://localhost:8007/provider/addDept",this.dept)
      .then(res=>{
        alert(res)
      })

//         this.axios({
// url:'http://localhost:8007/provider/addDept',
// method:'post',
//   data: this.dept
//         }).then(response=>{
//             if(response.data==='成功') {
//               alert('添加成功')
//               this.selectEndAuditflow()
//             }
//               else{
//                   alert('添加失败')
//               }
//         }).catch(function (error){
//         console.log(error);
//         });

    },
    selectEndAuditflow() {
      this.axios
          .get("http://localhost:8007/provider/home", {
            params: this.pageInfo,
          })
          .then((response) => {
            console.log("查询");
            console.log(response);
            /* alert(this.pageInfo.currentPage+"this.pageInfo.currentPage")*/
            /* alert(response.data.size+"response.data.size")*/
            this.tableData = response.data.records;
            this.pageInfo.total = response.data.total;
            this.pageInfo.pagesize = response.data.size;

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

  }, created() {
    this.selectEndAuditflow();
    this.selectStaff();
  }
};
</script>

<style>

table *{
    text-align: center;
}
.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;
}
.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}
.y{
    margin-top: 20px;
}
.head {
  margin-left: 2%;
  margin-top: 2%;
}

.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>

