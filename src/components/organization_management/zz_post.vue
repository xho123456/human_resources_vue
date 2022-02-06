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

        <el-form ref="form" :model="deptPost" label-width="120px">
          <el-form-item label="职位名称：">
            <el-input v-model="deptPost.postName"></el-input>
          </el-form-item>

          <el-form-item label="选择部门：">

            <el-select v-model="deptPost.deptId" placeholder="请选择部门">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.deptName"
                  :value="item.deptId"
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
      <el-input size="small" v-model="pageInfo.postName" placeholder="搜索" style="width:150px;position: absolute;right: 80px;">
        <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search @click="selectEndAuditflow()"></i-search></el-icon>
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
        <el-table-column label="ID" prop="deptPostId" />
        <el-table-column label="部门" prop="deptName" />
        <el-table-column label="职位" prop="postName" />
        <el-table-column label="职位创建时间" prop="createdTime"  />
        <el-table-column label="修改时间"  prop="updatedTime" />

        <!--      <template #default>
                <span v-if=""></span>
              </template>-->

        <el-table-column prop="operate" label="操作" >
          <template #default="scope">
            <el-popconfirm @confirm="deleteDeptPost(tableData[scope.$index].deptId)"
                           title="确认要删除此方案吗?">
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange" >删除 </el-button>
              </template>
            </el-popconfirm>
            <el-button type="text" size="small" style="color:darkorange" @click="dialogVisible11=true, deptDeptPost={deptId:tableData[scope.$index].deptId,deptName:tableData[scope.$index].deptName,deptPostId: tableData[scope.$index].deptPostId,postName:tableData[scope.$index].postName  }">修改
            </el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <el-drawer v-model="dialogVisible11" title="I am the title" :with-header="false">
      <el-form ref="form" :model="deptDeptPost" label-width="120px">
        <el-form-item label="职位名称：">
          <el-input v-model="deptDeptPost.postName"></el-input>
        </el-form-item>
        <el-form-item label="选择部门：">

          <el-select v-model="deptDeptPost.deptId" placeholder="请选择部门">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.deptName"
                :value="item.deptId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <span class="dialog-footer">
        <el-button @click="dialogVisible11 = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible11 = false,updatedept()"
        >确定</el-button
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
      deptDeptPost:{
        postName:"",
        deptId:"",
        deptName:"",
        deptPostId:"",
      },
      ygname:[

      ],
      deptPost: {
        postName:'',
        deptPostId:'',
      },
      pageInfo: {
        currentPage: 1,
        /* 当前的页 */
        pageSize: 3,
        total: 0,
        deptName:'',
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

    //修改部门
    updatedept(){
      this.axios({
        method:"put",
        url:"http://localhost:8007/provider/updatePost/post",
        data:this.deptDeptPost,
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
    },//查询职位有哪些
    selectDeptPost() {
      this.axios
          .get("http://localhost:8007/provider/chapost", {
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
            console.log(this.options);

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },

    addDept(){
      this.axios.post("http://localhost:8007/provider/addDeptPost",this.deptPost)
          .then(response => {
            this.deptPost.deptPostId=null
            if (response.data === "删除失败") {
              ElMessage.error('添加失败')
            } else {
              ElMessage({
                message: '添加成功',
                type: 'success',
              })
            }
          }).catch(function (error) {
        console.log(error);
      });



    },
    //删除职位
    deleteDeptPost(id) {
      this.axios({
        url: "http://localhost:8007/provider/deletePost",
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
    //主查询
    selectEndAuditflow() {
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/zhiwei/a",
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

  }, created() {
    this.selectEndAuditflow();
    this.selectDeptPost();

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

