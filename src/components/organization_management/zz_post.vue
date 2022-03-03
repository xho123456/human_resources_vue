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
            <div class="my-span2">职位设置</div>
          </div>
        </div>

        <div style="width: 100%;">
          <div style="padding: 10px 20px;min-height: 570px;">
            <div style="display: flex; justify-content: space-between;padding-left: 0;">

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

              <el-input
                  v-model="pageInfo.postName"
                  placeholder="请输入职位名称"
                  class="input-with-select"
                  size="small"
                  style="width: 250px; float: right;height: 40px;"
              >
                <template #append>
                  <el-button style="height: 40px;" @click="selectEndAuditflow() ">搜索</el-button>

                </template>

              </el-input>
            </div>


            <div class="y">
              <el-table :data="tableData" style="width: 95%" :header-cell-style="{textAlign: 'center',background:'#f8f8f9',color:'#6C6C6C'}">
                <el-table-column label="职位ID" prop="deptPostId" />
                <el-table-column label="部门" prop="deptName" />
                <el-table-column label="职位" prop="postName" />
                <el-table-column label="职位创建时间" prop="createdTime"  />
                <el-table-column label="修改时间"  prop="updatedTime" />

                <!--      <template #default>
                        <span v-if=""></span>
                      </template>-->

                <el-table-column prop="operate" label="操作" >
                  <template #default="scope">
                    <el-popconfirm @confirm="nmm(scope.row)"
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
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ElMessageBox, ElMessage} from 'element-plus'

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
      deptpost:{
        deptPostId:'',
      },
      options1:[
        {
          value: '',
          label: '',
        },

      ]
    };

  },
  methods: {
    nmm(row){
      this.deleteDeptPost(row)
    },
    //修改职位
    updatedept(){
      this.axios({
        method:"put",
        url:"http://localhost:8007/provider/updatePost/post",
        data:this.deptDeptPost,
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
    },//查询部门有那些
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
//添加职位
    addDept(){
      this.axios.post("http://localhost:8007/provider/addDeptPost",this.deptPost)
          .then(response => {
            this.deptPost.deptPostId=null
            if (response.data === "失败") {
              ElMessage.error('添加失败')
            } else {
              ElMessage({
                message: '添加成功',
                type: 'success',

              })
              this.selectEndAuditflow()
            }
          }).catch(function (error) {
        console.log(error);
      });



    },
    //删除职位
    deleteDeptPost(row) {


      this.axios({
        url: "http://localhost:8007/provider/deletePost",
        method: "post",
        data: [row.deptPostId],
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

/deep/ .el-table .el-table__cell {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
/deep/.el-input__inner {
  height: 40px;
}
</style>