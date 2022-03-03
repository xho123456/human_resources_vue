<!-- 班次设置 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="my-cead">
          <div style="padding-left: 20px;display: flex;align-items: center;">
            <div class="my-span1" style="display: flex;">
              <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
            </div>
            <div class="my-span2">部门详情</div>
          </div>
        </div>

        <div style="width: 100%;">
          <div style="padding: 10px 20px;min-height: 570px;">
            <div style="display: flex; justify-content: space-between;padding-left: 0;">

              <el-button type="primary" style="margin-left: 16px" @click="dialogVisible=true"
              >新增
              </el-button>

              <el-input
                  v-model="pageInfo.deptName"
                  placeholder="搜索"
                  class="input-with-select"
                  size="small"
                  style="width: 250px; float: right;height: 40px;"
              >
                <template #append>
                  <el-button style="height: 40px;" @click="selectEndAuditflow111() ">搜索</el-button>
                  <el-button style="height: 40px;" @click="selectEndAuditflow() "></el-button>
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

<!--                <el-table-column prop="createdTime" label="详情">

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

                </el-table-column>-->

                <el-table-column prop="operate" label="操作" >
                  <template #default="scope">
                    <el-popconfirm @confirm="nm(scope.row)"
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
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="head">
    <el-dialog
        v-model="dialogVisible"
        title="新增"
        width="30%"
        :before-close="handleClose"
    >

      <el-form ref="form" :model="dept" label-width="120px">
        <el-form-item label="部门名称1：">
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



          <el-select v-model="dept.menuPid" placeholder="上级部门">
            <el-option
                v-for="item in bumen"
                :key="item.value"
                :label="item.deptName"
                :value="item.deptId"
            >
            </el-option>
          </el-select>

        </el-form-item>
        部门号{{this.dept.menuPid}}
       员工 {{this.dept.staffId }}
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

<!--///////////////////////////////////////////////////////////////////////////////////////////////-->

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
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>

        </el-form-item>
        <span class="dialog-footer">
        <el-button @click="dialogVisible11 = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible11 = false,updatedept()"
        >确定</el-button
        >
      </span>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>
import {ElMessageBox, ElMessage} from 'element-plus'

export default {
  data() {
    return {
      addclass: '/yyx/dacard',
      updateclass: '/yyx/repaircard',
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
     bumen :{
        menuPid11:0,
      },
    ygname:[

      ],
      dept: {
        deptState:0,
        deptId:'',
        menuPid:'',
        menuLeaf:'',
        staffId:'',
        deptName:'',
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
    }
  },
  methods: {
    nm(row){
      this.deleteUser(row)
    },
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
        if(response.data==="失败"){
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
    },//查询部门有哪些
    selectdept() {
      this.axios
          .get("http://localhost:8007/provider/chabudept", {
            params:this.options,
          })
          .then((response) => {

            console.log("查询cao");
            console.log(response.data);

            this.bumen=response.data;

console.error(this.bumen)
          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

      addDept(){
        if (this.dept.menuPid == '') {
          this.dept.menuPid = 0

        }
        this.axios.post("http://localhost:8007/provider/addDept",this.dept)
            .then(response => {
              this.dept.deptId = null
              if (response.data === "失败") {
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



      },
    deleteUser(row) {
      this.axios({
        url: "http://localhost:8007/provider/deleteUser",
        method: "post",
        data: [row.deptId],
        responseType:'json',
        responseEncoding:'utf-8'
      })
          .then((response) => {
            if (response.data === "失败") {

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
     //主查询
   selectEndAuditflow111() {
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


   },
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
    this.selectdept();
  }
}
</script>

<style type="text/css" scoped>
a {
  color: #008df7;
}

@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff2?t=1644419209354') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_te5p4157fzj.woff?t=1644419209354') format('woff'),
  url('//at.alicdn.com/t/font_3164770_te5p4157fzj.ttf?t=1644419209354') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  color: white;
}

/deep/ .el-table td.el-table__cell div {
  box-sizing: border-box;
  text-align: center;
}

.demo-pagination-block {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
}


.my-cead {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

.my-span1 {
  width: 35px;
  height: 35px;
  border-radius: 20px;
  background-color: rgb(87, 153, 229) !important;
}

.my-span2 {
  margin-left: 10px;
  font-size: 18px;
  color: black;
}


.saas-main-content {
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

/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #e9f7ff;
}

/deep/.el-input__inner {
  height: 40px;
}

/deep/ .el-table .el-table__cell {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}

</style>