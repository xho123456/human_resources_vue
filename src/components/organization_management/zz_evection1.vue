<template>
  <div class="w">
    <div class="head">
      <el-button type="primary" style="margin-left: 16px" @click="dialogVisible=true"
      >新增1
      </el-button>
      <el-dialog
          v-model="dialogVisible"
          title="新增"
          width="30%"
          :before-close="handleClose"
      >

        <el-form ref="form" :model="dept" label-width="120px">
          <el-form-item label="部门名称：">
            <el-input v-model="dept.deptName"></el-input>
          </el-form-item>

          <el-form-item label="部门名称：">

          <el-select v-model="dept.staffId" placeholder="请选择部门负责人">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.staffName"
                  :value="item.staffId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false,addDept()"
        >确定</el-button
        >
      </span>
        </template>
      </el-dialog>
      <el-input size="small" v-model="pageInfo.deptName" placeholder="搜索" style="width:150px;position: absolute;right: 80px;">
          <template #suffix>
            <el-icon style="margin-top:9px;margin-right:10px"><i-search @click="selectEndAuditflow()"></i-search></el-icon>
        </template>
      </el-input>

    </div>

    <div class="y">
      <el-table :data="tableData"
                v-if="refreshTable"
                row-key="deptId"
                :default-expand-all="expands"
                @expand-change="expands=true"
                stripe style="width: 100% ;"
                :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}"
                :cell-style="{textAlign: 'center'}"
      >
        <!--        <el-table-column type="expand">-->
        <!--          <template #default="scope">-->

        <!--            <span style="margin-left: 50px">部门负责人：{{ scope.row.staffName }}</span><br>-->
        <!--            <span style="margin-left: 50px">部门人数：{{ scope.row.empNum }}</span>-->

        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column prop="deptName" label="部门名称"/>
        <el-table-column prop="staffName" label="部门负责人"/>
        <el-table-column prop="createdTime" label="创建时间"/>
        <el-table-column prop="updatedTime" label="修改时间"/>
        <el-table-column prop="deptState" label="状态">

          <template #default="scope">

            <el-button v-if="scope.row.deptState==0" size="mini" round type="primary" plain>启用</el-button>

            <el-button v-if="scope.row.deptState==1" size="mini" round type="danger" plain>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="createdTime" label="详情">

          <el-popover
              placement="bottom"
              title="部门信息"
              :width="100"
              trigger="click"
          >
            <span>部门负责人:微信</span><br><br>
            <span>部门总人数:18</span>
            <template #reference>
              <span style="color:#409eff">查看详情</span>
            </template>

          </el-popover>

        </el-table-column>

        <el-table-column prop="operate" label="操作" >
          <template #default="scope">
            <el-popconfirm @confirm="deleteUser(tableData[scope.$index].deptId)"
                           title="确认要删除此方案吗?">
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange" >删除 </el-button>
              </template>
            </el-popconfirm>
            <el-button type="text" size="small" style="color:darkorange" @click="dialogVisible11=true,this.dept11={},yy1(scope.row)">修改
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer v-model="dialogVisible11" title="I am the title" :with-header="false">
      <el-form ref="form" :model="dept12" label-width="120px">
        <el-form-item label="部门名称：">
          <el-input v-model="dept12.deptName"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人：">

          <el-select v-model="dept12.staffId" placeholder="请选择部门负责人1">
            <el-option
                v-for="item in ygname"
                :key="item"
                  :label="item.staffName"
                :value="item.staffId"
            >

            </el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="部门状态：  ">
        <el-radio-group v-model="dept12.deptState">
          <el-radio :label="0">启用1</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
          aa{{this.dept12.staffId}}
        </el-form-item>
        <span class="dialog-footer">
        <el-button @click="dialogVisible11 = false">取消1</el-button>
        <el-button type="primary" @click="dialogVisible11 = false,updatedept()"
        >确定1</el-button
        >
      </span>
      </el-form>
    </el-drawer>
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
    {{this.tableData}}


 {{tableData}}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {ElMessage} from "element-plus";
export default {
  data() {
    var time =new Date();
    this.time1=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
    return {
      user:{
        id:"",
        name:"",
        pass:"",
        phone:'',
        birthday:'',
        loc:''
      },
      refreshTable:true,
      expands:false,
      deptStaff:{
        deptId:"",
        deptName:"",
        staffId: "",
      },
      ygname:[

      ],
      dept: {
        deptState:0,
         deptId:'',
      },
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
      },
      dept11:{
        deptId:'',
        menuPid:'',
        menuLeaf:'',
        staffName:'',
        deptState:'',
        deptName:'',
        staffId:'',
      },
      dept12:{
        deptId:'',
        menuPid:'',
        menuLeaf:'',

        deptState:'',
        deptName:'',
        staffId:'',
      },
      dialogVisible11:false,
      dialogVisible:false,
      dialogVisible1:false,
      radio1:"",

        tableData: [

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
    yy1(row){
      this.dept11.deptName=row.deptName
      this.dept11.staffName=row.staffName
      this.dept11.staffId=row.staffId
      this.dept11.deptState=row.deptState
      this.dept12.deptName=row.deptName
     this.dept12.deptId=row.deptId
      this.dept12.staffId=row.staffId
      this.dept12.deptState=row.deptState
    },
 //修改部门
  updatedept(){
      this.axios({
        method:"put",
        url:"http://localhost:8007/provider/updateDept/dept",
        data:this.dept12,
        responseType:'json',
        responseEncoding:"utf-8"
      }).then(response=>{
        console.log(response)
        if(response.data==="成功"){
          ElMessage.error("修改失败")
        }else{
          ElMessage({
            type:"success",
            message:"修改成功"
          })
          this.selectEndAuditflow();
        }
      })
    },//查询员工有哪些
    selectStaff() {
      this.axios
          .get("http://localhost:8007/provider/cha", {
       params:this.options,
          })
          .then((response) => {
            alert(1)
            console.log("查询cao");
            console.log(response.data);
           /* alert(this.pageInfo.currentPage+"this.pageInfo.currentPage")*/
           /* alert(response.data.size+"response.data.size")*/
              this.options=response.data;
               this.options1=response.data;
               this.ygname=response.data;


          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

  /*  addDept(){
      this.axios.post("http://localhost:8007/provider/addDept",this.dept)
          .then(response => {
            this.dept.deptId=null
            if (response.data === "添加失败") {
              ElMessage.error('添加失败')
            } else {
              ElMessage({
                message: '添加成功',
                type: 'success',
              })
              this.selectEndAuditflow();
            }
          }).catch(function (error) {
        console.log(error);
      });



    },*/
    deleteUser(id) {
      this.axios({
        url: "http://localhost:8007/provider/deleteUser",
        method: "post",
        data: [id],
        responseType:'json',
        responseEncoding:'utf-8'
      })
          .then((response) => {
            if (response.data === "删除失败") {

              ElMessage.error("删除失败");

            } else {
              this.selectEndAuditflow();
              ElMessage({
                type: "success",
                message: "删除成功",

              });
              console.log(response.data[0]+"ashdja")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
     /* //主查询
    selectEndAuditflow() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/home/a",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8'
      })  .then((response) => {
        console.log("查询giao111");
        console.log( response);
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;
      })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });


    },*/
    selectEndAuditflow(){
      this.axios.get("http://localhost:8007/provider/chadeptt").then((rersponse)=>{
        this.tableData=rersponse.data.data;
        console.log(rersponse.data.data[0].children)
        console.error(rersponse.data.data)
      }).catch(function (error){
        console.log(error);
      })
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

