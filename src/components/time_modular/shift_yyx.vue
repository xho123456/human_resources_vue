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
            <div class="my-span2">班次设置</div>
          </div>
        </div>

        <div style="width: 100%;">
           <div style="padding: 10px 20px;min-height: 570px;">
             <div style="display: flex; justify-content: space-between;padding-left: 0;">
               <router-link :to="{path:this.addclass,query:{path:this.$route.query.path}}">
                 <el-button type="primary" size="small">
                   <i class="iconfont" style="font-size: 12px">&#xe62d;</i>
                   新增
                 </el-button>
               </router-link>
               <el-input
                   v-model="pageInfo.classesName"
                   placeholder="搜索"
                   class="input-with-select"
                   size="small"
                   style="width: 300px; float: right"
               >
                 <template #append>
                   <el-button @click="queryAllPage()">搜索</el-button>
                 </template>
               </el-input>
             </div>
             <div style="margin-top: 10px">
               <el-table :data="tableData" :border="true" style="width: 100%; font-size: 12px;"
                         :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}">
                 <el-table-column prop="classesName" label="班次名称" width="150"/>
                 <el-table-column prop="classesSd" label="班次时段" width="150"/>
                 <el-table-column label="工作时间范围(早)">
                   <template #default="scope">
                     上班{{scope.row.classesTimeones}} - 下班{{scope.row.classesTimeonex}}
                   </template>
                 </el-table-column>
                 <el-table-column label="工作时间范围(午)">
                   <template #default="scope">
                     上班{{scope.row.classesTimetwos}} - 下班{{scope.row.classesTimetwox}}
                   </template>
                 </el-table-column>
                 <el-table-column label="休息时间范围" >
                   <template #default="scope">
                     {{scope.row.classesXxtimeState}} - {{scope.row.classesXxtimeEnd}}
                   </template>
                 </el-table-column>
                 <el-table-column label="打卡时间范围" width="150">
                   <template #default="scope">
                     {{scope.row.dkState}} - {{scope.row.dkEnd}}
                   </template>
                 </el-table-column>
                 <el-table-column label="操作" width="200px">
                   <template #default="scope">
                     <el-button type="text" size="mini">编辑</el-button>
                     <el-popconfirm title="是否确定删除?" @confirm="isdeleted(scope.row.classesId)"
                                    @cancel="isdeletedbiz()">
                       <template #reference>
                         <el-button type="text" size="small"><span style="color: #ff4949">删除</span></el-button>
                       </template>
                     </el-popconfirm>
                   </template>
                 </el-table-column>
               </el-table>
               <div class="demo-pagination-block">
                 <el-pagination
                     v-model:currentPage="pageInfo.currenPage"
                     :page-sizes="[5, 10, 30, 50]"
                     v-model:page-size="pageInfo.pagesize"
                     :default-page-size="pageInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageInfo.total"
                     :pager-count="5"
                     background
                     @size-change="queryAllPage()"
                     @current-change="queryAllPage()"
                 >
                 </el-pagination>
               </div>
             </div>
           </div>
        </div>
        {{tableData}}
      </div>
    </div>
  </div>

</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data(){
    return{
      addclass:'/yyx/dacard',
      //分页、模糊查询数据
      pageInfo: {
        currenPage: 1,
        pagesize: 5,
        total: 0,
        classesName:''
      },
      tableData:[]
    }
  },
  created() {
    this.queryAllPage();
  },
  methods:{
    queryAllPage(){
      this.axios({
        url: "http://localhost:8007/provider/Classes/pageall",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize: this.pageInfo.pagesize,
          classesName: this.pageInfo.classesName,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
         this.tableData = response.data.data.records
         this.pageInfo.total = response.data.data.total
      }).catch(function(error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //删除班次
    isdeleted(row) {
      alert(row)
      this.axios({
        url: "http://localhost:8007/provider/Classes/isdeleteds",
        method: "post",
        data: [row],
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.data === "成功") {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
        }
        this.queryAllPage();
      }).catch(function(error) {
        console.log(error);
      })
    },
    //消息提示框取消按钮事件
    isdeletedbiz() {
      ElMessage({
        message: '已取消该操作',
        type: 'warning',
      })
    },
  }
}
</script>

<style type="text/css" scoped>
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
/deep/.el-table td.el-table__cell div {
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
  border-bottom:1px solid #eaeaea;
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

/deep/.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #e9f7ff;
}
/deep/.el-table .el-table__cell {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
</style>