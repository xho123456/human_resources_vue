<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索登录数据部分 -->
          <el-form :inline="true" v-model="pageInfo">
            <!-- 登录地址搜索 -->
            <el-form-item class="form-dizhi" label="登录地址">
              <el-input  size="small" v-model="pageInfo.registerLogIp" placeholder="请输入登录地址"></el-input>
            </el-form-item>

            <!-- 用户名称搜索 -->
            <el-form-item class="form-name" label="用户名称">
              <el-input size="small" v-model="pageInfo.staffName" placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <!-- 登录状态搜索 -->
            <el-form-item class="form-state" label="状态">
              <el-select style="width: 190px" size="small" v-model="pageInfo.registerLogState" placeholder="请选择登录状态">
                <el-option
                    v-for="item in registerLogState"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 登录时间搜索 -->
            <el-form-item class="form-time" label="登录时间">
              <el-date-picker
                  size="small"
                  v-model="pageInfo.createdTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 操作按钮 -->
            <el-form-item style="margin-left: 1071px;margin-top: -30px">
              <el-button size="mini" class="search-ss" type="primary" @click="pagingQuery()">
                <i class="iconfont">
                  &#xe61b
                </i>
                搜索
              </el-button>
              <el-button size="mini" class="search-cz" type="primary" @click="reset()">
                <i class="iconfont">
                  &#xe6b8
                </i>
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button size="mini" style="width: 90px;" v-bind:disabled="disabled" @click="remove">删除</el-button>
            <el-button class="button-empty" size="mini" @click="empty">清空</el-button>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100% ;"
                      @selection-change="deletewx"
                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- 全选操作按钮 -->
            <el-table-column  type="selection" width="50" />
            <el-table-column type="index" label="访问编号" width="92" />
            <el-table-column prop="staffName" label="员工名称" width="132" />
            <el-table-column prop="registerLogPhone" label="手机号码" width="150" />
            <el-table-column prop="registerLogIp" label="IP地址" width="200" />
            <el-table-column prop="registerLogType" label="设备类型" width="200" />
            <el-table-column prop="registerLogState" label="状态" width="135" >
            <template #default="scope">
              <span v-if="scope.row.registerLogState==0">成功</span>
              <span v-if="scope.row.registerLogState==1">失败</span>
            </template>
            </el-table-column>
            <el-table-column prop="registerLogBrowser" label="浏览器" width="132" />
            <el-table-column prop="createdTime" sortable label="登录日期" width="220" />
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:current-page="pageInfo.currentPage"
              v-model:currentPage="pageInfo.currentPage"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              :page-sizes="[3, 4, 5, 6]"
              :page-size="3"
              :pager-count="4"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              @size-change="pagingQuery"
              @current-change="pagingQuery"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>
        {{table}}
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

export default {

  data() {

    //清空提示框
    const empty = () => {
      ElMessageBox.confirm(
          '是否确定清空所有数据！！！',
          '友情提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '友情提示',
          }
      )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '清空成功！！',
            })
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    }
    return {

      //清空数据
      empty,

      // 分页
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        //登录地址
        registerLogIp:'',
        //用户名称
        staffName:'',
        //状态
        registerLogState:'',
        //用户登录时间
        createdTime:[],
      },
      // 搜索登录状态下拉框
      registerLogState: ref([
        {
          value: 0,
          label: '成功',
        },
        {
          value: 1,
          label: '失败',
        },
      ]),

       value: ref(''),
      //表格
      tableData: [
      ],
      //判断删除按钮是否可用
      kkk:[],
      disabled:true,
      //存放全选id
      id:[],
      //接收表格数据`
      table:[],

    }
  },
  created() {
    this.pagingQuery();
  },
  methods:{
    //批量删除提示框
    remove(){
      ElMessageBox.confirm(
          '是否确定删除！！！',
          '友情提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '友情提示',
          }
      )
          .then(() => {
            this.deleteregisterLog();
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    },
    /**
     * 批量删除
     */
    deleteregisterLog(){
      this.id=[]
      for(let i=0;i<this.table.length;i++){
        this.id.push(this.table[i].registerLogId)
       }
      this.axios({
        method:'delete',
        url:'http://localhost:8007/provider/registerLog/delete',
        data:this.id,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(request=>{
        if(request.data.data ==='删除成功'){
          ElMessage({
            type:'success',
            message:'删除成功'
          })
          this.pagingQuery();
        }else{
          ElMessage.error("删除失败")
        }
      })
    },

    /**
     * 分页查询
     */
    pagingQuery(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/registerLog/log",
        data:{
          startTime:this.pageInfo.createdTime[0],
          endTime:this.pageInfo.createdTime[1],
          currentPage:this.pageInfo.currentPage,
          pagesize:this.pageInfo.pagesize,
          registerLogState:this.pageInfo.registerLogState,
          registerLogIp:this.pageInfo.registerLogIp,
          staffName:this.pageInfo.staffName,
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(request=>{
        console.log(request)
        this.tableData=request.data.data.records
        this.pageInfo.total=request.data.data.total
      }).catch(function (error){
        console.log('获取表单失败')
        console.log(error)
      })
   },
    /**
     * 重置
     */
    reset(){
      this.pageInfo={
        //登录地址
        registerLogIp:'',
        //用户名称
        staffName:'',
        //状态
        registerLogStatae:'',
        //用户登录时间
        createdTime:[],
      }
    },
    //判断删除按钮是否可用
    deletewx(val){
      this.table=val
      if(this.table != ''){
        this.disabled=false
      }else {
        this.disabled=true
      }
    }
  },


}
</script>

<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");
/* 图标 */
@font-face {
  font-family: 'iconfont';
  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff2?t=1638864192788') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff?t=1638864192788') format('woff'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.ttf?t=1638864192788') format('truetype');
}
/*表格样式*/
.sub-Content__primary{
  margin-bottom: 10px;
  margin-left: 10px;
}

/* 分页 */
.demo-pagination-block{
  margin-left: 874px;
  margin-bottom: 20px;
}

.button{
  margin-bottom: 17px;
  margin-top: -55px;

}
/* 删除表格数据按钮 */
.button-delete{
  color: #ff4949;
  background: #ffeded;
  border-color: #ffb6b6;
  border: none;
  width: 90px;
}
.button-delete:hover{
  background: #ff4949;
  border-color: #ff4949;
  color: #fff;
  border: none;
  width: 90px;
}
/* 清空表格数据按钮 */
.button-empty{
  width: 90px;
  color: #13ce66;
  background: #e7faf0;
  border-color: #a1ebc2;
  border: none;
}
.button-empty:hover{
  width: 90px;
  background: #13ce66;
  border-color: #13ce66;
  color: #fff;
  border: none;
}


/* 搜索按钮 */

.search-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}
.search-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 10px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-top-color: rgb(220, 223, 230);
  border-right-color: rgb(220, 223, 230);
  border-bottom-color: rgb(220, 223, 230);
  border-left-color: rgb(220, 223, 230);
  border-color: #dcdfe6;
  color: #606266;
}
.search-cz:hover {
  color: black;
  margin: 29px 0px 0px 10px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 登录时间搜索按钮 */
.form-time{
  width: 270px;
  margin-left: -20px;
}

.form-state{
  width: 270px;
  margin-left: 20px;
}
/* 登录地址搜索样式 */
.form-name{
  width: 270px;
  margin-left: 20px;
}
/* 登录地址搜索样式 */
.form-dizhi{
  width: 270px;
}







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


.mr-20 {
  margin-right: 20px;
}

.ml-20 {
  margin-left: 20px;
}

.mt-20 {
  margin-top: 20px;
}

a {
  color: #085fc3;
  background-color: transparent;
}

a, area, button, [role="button"], input:not([type="range"]), label, select, summary, textarea {
  touch-action: manipulation;
}

a {
  color: #366cb3;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  border-style: none;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

.ant-btn::before {
  background: #fff;
  border-radius: inherit;
}

.ant-btn::before {
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  z-index: 1;
  display: none;
  background: #fff;
  border-radius: inherit;
  opacity: 0.35;
  transition: opacity 0.2s;
  content: '';
  pointer-events: none;
}

button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary {
  color: #fff;
  background-color: #366cb3;
  border-color: #366cb3;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn, .ant-btn:active, .ant-btn:focus {
  outline: 0;
}

.ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 3px;
  color: #606c82;
  background-color: #fff;
  border-color: #d3dae2;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}





</style>
