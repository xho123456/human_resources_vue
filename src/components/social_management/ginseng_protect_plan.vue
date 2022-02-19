<template>
<!--参保方案-->
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 新增参保方案按钮 -->
          <router-link :to="{path:this.path,query:{path:this.$route.query.path,name:'新增'}}">
            <el-button size="small" class="addbutton" type="primary"> +新增</el-button>
          </router-link>

          <!-- 下拉选择器 -->
          <div class="resume">
            <el-select
                v-model="pageInfo.defInsuredState"
                size="small"
                clearable
                placeholder="请选择"
                @click="pageSelect()"
            >
              <el-option
                  v-for="item in defInsuredState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 表格部分 -->
        <div class="sub-Content__primary" style="margin-top: 20px;">
          <el-table :data="tableData" style="width: 100%"
                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                    @selection-change="deletepl"
          >
            <el-table-column type="index" label="序号" width="100" />
            <el-table-column prop="defInsuredName" label="方案名称"/>
            <el-table-column prop="defInsuredNumber" label="参保人数"/>
            <el-table-column prop="defInsuredState" label="状态">
              <template #default="scope">
                <span v-if="scope.row.defInsuredState==0">启用</span>
                <span v-if="scope.row.defInsuredState==1">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <router-link :to="{path:this.path,query:{path:this.$route.query.path,name:'修改'}}">
                  <el-button size="small" type="text">
                    <i class="iconfont" style="font-size: 13px;color: #5aaaff">&#xe606</i>
                    修改
                  </el-button>
                </router-link>&nbsp;

                <el-button type="text" size="small"> {{ scope.row.defInsuredState === '启用' ? '禁用 ' : '启用 ' }}</el-button>

                <!-- 删除行确认框 -->
                <el-popconfirm v-if="scope.row.defInsuredState==='禁用'"
                               @confirm="deleteRow(scope.$index, tableData)" title="删除此方案?">
                  <template #reference>
                    <el-button style="color:red" type="text" size="small">
                      <i class="iconfont"  style="font-size: 13px;color: red">&#xe61c</i>
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>


              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页插件 -->
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
              @size-change="pageSelect"
              @current-change="pageSelect"
              prev-text="上一页"
              next-text="下一页"
              background
          >
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
import {ref, defineComponent} from "vue";
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      path: "/social/basic_setup/new_amend_scheme",
      pageInfo: {
        // 分页参数
        currentPage: 1,
        pagesize: 3,
        total: 0,
        defInsuredState:''
      },
      //下拉选择器
      defInsuredState: [
        {value: "0", label: "启用"},
        {value: "1", label: "禁用"},
      ],

      // 参保方案表数据
      tableData: [],
    };
  },
  created() {
   this.pageSelect()
  },
  methods: {
    pageSelect(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/defInsured/page",
        data:this.pageInfo,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
        this.tableData = response.data.data.records
        this.pageInfo.total=response.data.data.total
      })
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1);
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
    },
  },

};
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.woff2?t=1640660838786') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.woff?t=1640660838786') format('woff'),
  url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.ttf?t=1640660838786') format('truetype');
}

/*表头*/
/deep/.el-table__header{
  height: 64.8px;
}

.addbutton{
   width: 80px;

 }



/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/**
	 * 下拉框样式
	 */
.resume {
  float: right;
  width: 150px;
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

.j-card-body {
  padding: 2%;
}

table * {
  text-align: center;
}

</style>

