<!-- 招聘计划详情页面 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <el-button style="float:left;margin-top: 25px;margin-left: 20px;" size="mini" @click="goblick()">返回</el-button>
        <div style="display: flex; justify-content: flex-end; padding: 20px 20px 0px;" class="resume-operation">


          <div style="margin-top: auto; height: 40px;width: 65%">
            <el-row :gutter="10">

              <el-col :span="8">
                <el-select v-model="pageInfo.value1" size="small" clearable placeholder="学历" style="width: 250px;">
                  <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"

                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="pageInfo.value2"  size="small"  clearable placeholder="面试状态" style="width: 250px;">
                  <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>


              <el-col :span="8">
                <el-input
				size="small" 
                    v-model="pageInfo.value3"
                    placeholder="如：姓名、投递职位"
                    class="input-with-select">
                  <template #append>
                    <el-button @click="selectAllresum()">搜索</el-button>
                  </template>
                </el-input>
              </el-col>

            </el-row>


          </div>


        </div>


        <div class="myplan-detail">
          <div class="ant-row-flex ant-row-flex-space-between">
            <div class="ant-col">
              <h3>
                {{ this.$route.query.zw }}
                <span class="small-title">{{ this.$route.query.name }}</span>
              </h3>
            </div>
            <div class="ant-col">
              <router-link :to="{path:this.addresume,query:{path:this.$route.query.path}}">
                  <el-button type="button" style="background-color: #085fc3;color: whitesmoke">新增候选人</el-button>
              </router-link>
            </div>
          </div>

          <ul class="count" style="list-style: none">
            <li style="background-color: rgb(35, 102, 167);">
              <h3>{{tagsume.hxr}}</h3>
              <span>候选人</span>
            </li>
            <li style="background-color: rgb(73, 167, 130);">
              <h3>{{tagsume.yyy}}</h3>
              <span>已邀约</span>
            </li>
            <li style="background-color: rgb(233, 143, 39);">
              <h3>{{tagsume.msz}}</h3>
              <span>面试中</span>
            </li>
            <li style="background-color: rgb(35, 102, 167);">
              <h3>{{tagsume.drz}}</h3>
              <span>待入职</span>
            </li>
            <li style="background-color: rgb(73, 167, 130);">
              <h3>{{tagsume.yrz}}</h3>
              <span>已入职</span>
            </li>
          </ul>

        </div>

        <!-- 表格内容 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100%" size="mini">
            <el-table-column fixed="left" label="姓名" width="80">
              <template #default="scope">
                <router-link
                    :to="{path:this.details,query:{path:this.$route.query.path,name:scope.row.resumeId,posta:scope.row.postName}}">
                  {{ scope.row.resumeName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column fixed="left" prop="postName" label="投递职位" width="140"/>
            <el-table-column prop="resumeSex" label="性别" width="140"/>
            <el-table-column prop="resumeEducation" label="学历" width="140"/>
            <el-table-column prop="resumePhone" label="手机号" width="140"/>
            <el-table-column prop="resumeScoller" label="毕业学校" width="140"/>
            <el-table-column prop="resumeHy" label="婚姻状况" width="140"/>
            <el-table-column prop="resumeAge" label="年龄" width="140"/>
            <el-table-column prop="resumeBirthday" label="出生日期" width="140"/>
            <el-table-column prop="resumeQxingz" label="期望薪资" width="140"/>
            <el-table-column prop="resumeQzhiw" label="期望职位" width="140"/>
            <el-table-column prop="resumeShengg" label="身高" width="140"/>
            <el-table-column prop="resumeZjzw" label="最近职位" width="140"/>
            <el-table-column prop="resumeIntroduce" label="自我评价" width="140"/>
            <el-table-column prop="resumeMailbox" label="邮箱" width="140"/>
            <el-table-column prop="resumeResidence" label="所在地" width="140"/>

            <el-table-column label="状态" width="140">
              <template #default="scope">
                <span v-if="scope.row.resumeZt==0">新简历</span>
                <span v-if="scope.row.resumeZt==1">候选人</span>
                <span v-if="scope.row.resumeZt==2">已邀约</span>
                <span v-if="scope.row.resumeZt==3">已淘汰</span>
                <span v-if="scope.row.resumeZt==4">面试中</span>
                <span v-if="scope.row.resumeZt==5">面试通过</span>
                <span v-if="scope.row.resumeZt==6">复试中</span>
                <span v-if="scope.row.resumeZt==7">待接受</span>
                <span v-if="scope.row.resumeZt==8">已接受</span>
                <span v-if="scope.row.resumeZt==9">已入职</span>
                <span v-if="scope.row.resumeZt==10">已拒绝</span>
                <span v-if="scope.row.resumeZt==11">放弃入职</span>
                <span v-if="scope.row.resumeZt==12">已离职</span>
              </template>
            </el-table-column>

            <el-table-column prop="toujTime" label="投简日期" width="140"/>
            <el-table-column prop="resumePoliticalOutlook" label="政治面貌" width="140"/>
          </el-table>

        </div>


        <br/>
        <div class="demo-pagination-block">
          <!-- <span class="demonstration">All combined</span> -->
          <el-pagination
              v-model:currentPage="pageInfo.currenPage"
              :page-sizes="[1,5,7]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              background
              @size-change="selectAllresum()"
              @current-change="selectAllresum()"
              prev-text="上一页"
              next-text="下一页"
          >
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      //路由跳转
      addresume: '/recruitment/recruit/addresume', //新增简历页
      details:'/recruitment/resume/details',  //简历详情页

      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
        //招聘计划编号：路由传入
        jhid: this.$route.query.id,
        //学历
        value1:'',
        //状态
        value2:'',
        //搜索框
        value3:''
      },
      tableData: [],

      options1: [
        {value: '初中', label: '初中'},
        {value: '高中', label: '高中'},
        {value: '大专', label: '大专'},
        {value: '本科', label: '本科'},
        {value: '硕士', label: '硕士'},
        {value: '博士', label: '博士'},
        {value: '其他', label: '其他'},
      ],
      //招聘状态
      options2: [
        {value: '1', label: '候选人'},
        {value: '2', label: '已邀约'},
        {value: '3', label: '已淘汰'},
        {value: '4', label: '面试中'},
        {value: '5', label: '面试通过'},
        {value: '6', label: '复试中'},
        {value: '7', label: '待接受'},
        {value: '8', label: '已接受'},
        {value: '9', label: '已入职'},
        {value: '10', label: '已拒绝'},
        {value: '11', label: '放弃入职'},
        {value: '12', label: '已离职'}
      ],

      //招聘状态人数统计
      tagsume:{
        hxr:'',
        yyy:'',
        msz:'',
        drz:'',
        yrz:''
      }
    }
  },
  created() {
    this.selectAllresum(); //通过招聘计划编号查询所招简历信息
    this.selecthxr(); //人数统计：候选人
    this.selectyyy(); //人数统计：已邀约
    this.selectmsz(); //人数统计：面试中
    this.selectdrz(); //人数统计：待入职
    this.selectyrz(); //人数统计：已入职

  },
  methods: {
    //通过招聘计划编号查询所招简历信息
    selectAllresum() {
      this.axios({
        url: "http://localhost:8007/provider/recruitment/findByidjl",
        method: "post",
        data: {
          currenPage: this.pageInfo.currenPage,
          pagesize: this.pageInfo.pagesize,
          recruitmentPlanId: this.pageInfo.jhid,
          resumeEducation:this.pageInfo.value1,
          resumeZt:this.pageInfo.value2,
          resumeName:this.pageInfo.value3
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.tableData = response.data.data.records
        this.pageInfo.total = response.data.data.total
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    goblick() {
      this.$router.go('-1');
    },
    //人数统计：候选人
    selecthxr(){
      this.axios({
        url: "http://localhost:8007/provider/plan/sxhxr",
        method: "post",
        data: {
          recruitmentPlanId: this.pageInfo.jhid,
          resumeZt:1
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(1)
        console.log(response)
        this.tagsume.hxr = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //人数统计：已邀约
    selectyyy(){
      this.axios({
        url: "http://localhost:8007/provider/plan/sxhxr",
        method: "post",
        data: {
          recruitmentPlanId: this.pageInfo.jhid,
          resumeZt:2
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tagsume.yyy = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //人数统计：面试中
    selectmsz(){
      this.axios({
        url: "http://localhost:8007/provider/plan/sxhxr",
        method: "post",
        data: {
          recruitmentPlanId: this.pageInfo.jhid,
          resumeZt:4
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tagsume.msz = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //人数统计：待入职
    selectdrz(){
      this.axios({
        url: "http://localhost:8007/provider/plan/sxhxr",
        method: "post",
        data: {
          recruitmentPlanId: this.pageInfo.jhid,
          resumeZt:8
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tagsume.drz = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //人数统计：已入职
    selectyrz(){
      this.axios({
        url: "http://localhost:8007/provider/plan/sxhxr",
        method: "post",
        data: {
          recruitmentPlanId: this.pageInfo.jhid,
          resumeZt:9
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tagsume.yrz = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },


  }
}

</script>


<style type="text/css" scoped>
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
.demo-pagination-block {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 30px;
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

.ant-layout,
.ant-layout * {
  box-sizing: border-box;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

.abt:hover {
  border: 1px solid #085FC3;
  color: #085FC3;
}

/deep/ .el-table th.el-table__cell > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  width: 100%;
  font-weight: initial;
  color: black;
}

.myplan-detail {
  padding: 0 22px;
  margin-top: 30px;
}

.ant-row-flex-space-between {
  justify-content: space-between;
}

.ant-row-flex {
  display: flex;
  flex-flow: row wrap;
}

.ant-col {
  position: relative;
  min-height: 1px;
}


.myplan-detail .small-title {
  font-size: 14px;
  font-weight: normal;
}

.ant-btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.count {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -10px;
}

.count li {
  flex: 1;
  padding: 8px;
  cursor: pointer;
  border: 2px solid #fff;
  border-radius: 2px;
  text-align: center;
  transition: all .3s;
  color: #fff;
}

.count li:hover, .count li.actived {
  border: 2px solid #999999;
  color: #ffffff;
  cursor: pointer;
}


</style>

