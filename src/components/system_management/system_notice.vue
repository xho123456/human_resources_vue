<!-- 公告页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索数据部分 -->
          <el-form style="margin-bottom: -18px;" :inline="true" v-model="pageInfo">
            <!-- 公告标题搜索 -->
            <el-form-item class="form-gg" label="公告标题">
              <el-input size="small" placeholder="请输入公告标题" v-model="pageInfo.noticeTitle"></el-input>
            </el-form-item>
            <!-- 操作人员搜索 -->
            <el-form-item class="form-ry" label="操作人员">
              <el-input size="small" placeholder="请输入操作人员" v-model="pageInfo.noticePeople"></el-input>
            </el-form-item>
            <!-- 公告类型搜索 -->
            <el-form-item class="form-lx" label="类型">
              <el-select size="small" v-model="pageInfo.noticeType" placeholder="公告类型">
                <el-option
                    v-for="item in noticeType"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1"
                ></el-option>

              </el-select>
            </el-form-item>

            <el-form-item class="search" style="margin-left: 10px;">
              <el-button size="mini" class="search-ss" type="primary" @click="pagingQuery">
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

          <br />


          <!-- 操作按钮部分 -->
          <div class="button">
            <!-- 新增按钮 -->
            <el-button size="mini"
                       class="button-new"
                       @click="outerVisible = true,judge='新增',deptsNameaa(),deptsName()">
              + 新增
            </el-button>


            <!-- 弹出操作窗口 -->
            <el-dialog width="670px"  v-model="outerVisible" destroy-on-close="false" >
              <span class="headline"> {{judge}}公告</span>
              <!-- form表单 -->
              <el-form class="announcement" v-model="affiche">
                <!-- 公告标题 -->
                <h2 class="headlines" >公告标题</h2>
                <el-form-item class="announcement-title">
                  <el-input size="small" placeholder="请输入公告标题" v-model="affiche.noticeTitle"></el-input>
                </el-form-item>
                <!-- 公告类型-->
                <h2 class="types" >公告类型</h2>
                <el-form-item  class="announcement-type">
                  <el-select  size="small" v-model="affiche.noticeType"  placeholder="公告类型">
                    <el-option
                        v-for="item in noticeType"
                        :label="item.label"
                        :value="item.value1"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 公告状态 -->
                <h2 class="state">状态</h2>
                <el-form-item>
                  <div class="announcement-zt">
                    <el-radio-group v-model="affiche.noticeState">
                      <el-radio  :label="0">启用</el-radio>
                      <el-radio  :label="1" style="margin-left: 16px">禁用</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>

                <el-form-item label="部门" style="margin-top: -64px;margin-left: 386px;">
                  <div>
                    <el-select
                        v-model="affiche.deptName"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        size="small"
                    >
                      <el-option hidden></el-option>
                      <el-tree
                          accordion
                          ref="tree"
                          :data="affiche.deptlist"
                          show-checkbox
                          node-key="deptId"
                          :props="defaultProps"
                          @check-change="handleCheckChange()"
                      />
                    </el-select>
                  </div>

                </el-form-item>
                <!-- 公告内容 -->
                <span class="neirong" >内容</span>
                <el-form-item>
                  <el-input
                      v-model="affiche.noticeMatter"
                      style="width: 514px;
                      font-weight: bold;
                      size: 14px;
                      margin-left: 77px;"
                      type="textarea">
                  </el-input>

                </el-form-item>



                <!--                <h1>dasjfashfkjasdfk{{$store.state.staffName}}</h1>-->


                <el-form-item >
                  <template #default="scopes">
                    <div class="announcement-cz">
                      <el-button size="mini" style="width: 65px;" @click="cancel()">
                        取消
                      </el-button>
                      <!--										&lt;!&ndash; 修改按钮 &ndash;&gt;"innerVisible = true"-->

                      <el-button size="mini" style="width: 65px;" type="primary" @click="judges()">
                        {{judge}}
                      </el-button>
                    </div>
                  </template>
                </el-form-item>
              </el-form>
            </el-dialog>


            <el-button size="mini" class="button-delete" @click="remove()" v-bind:disabled="disableds">
              <i class="iconfont">&#xe61c</i>
              删除
            </el-button>
          </div>
        </div>



        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">

          <el-table :data="tableData" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                    @selection-change="deletepl"
                    :header-cell-style="{textAlign: 'center',background:'#D8D8D8',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- 全选操作按钮 -->
            <el-table-column type="selection" width="90" />
            <el-table-column type="index"  label="序号" width="100" />
            <el-table-column prop="noticeTitle" label="公告标题" width="170" />
            <el-table-column prop="noticeType" label="公告类型" width="140" >
              <template #default="scope">
                <span v-if="scope.row.noticeType==0">重要性</span>
                <span v-if="scope.row.noticeType==1">政策性</span>
                <span v-if="scope.row.noticeType==2">任免性</span>
              </template>
            </el-table-column>
            <el-table-column prop="noticeState" label="公告状态" width="125" >
              <template #default="scope">
                <span v-if="scope.row.noticeState==0">启用</span>
                <span v-if="scope.row.noticeState==1">禁用</span>
              </template>
            </el-table-column>

            <el-table-column prop="noticePeople" label="发布人" width="160" />
            <el-table-column prop="createdTime" label="发布时间" width="220" />
            <el-table-column align="center" label="操作" width="280">
              <template #default="scope">
                <el-button size="mini" style="color: #A3D3FF; width: 75px;"  @click="outerVisible = true,judge='修改',aaa(scope.row),deptsName()">
                  <i class="iconfont">&#xe606</i>
                  修改
                </el-button>

                <el-button size="mini" style="color: #A3D3FF; width: 75px;"   @click="drawer = true,check(scope.row),selectNoticeState(),selectunread()" >
                  <i class="iconfont">&#xe609</i>
                  查看
                </el-button>

                <el-button @click="open,deleteLine(scope.row)" size="mini" style="color: #A3D3FF;width: 75px;">
                  <i class="iconfont">&#xe61c</i>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>

        <!-- 查看抽屉 -->
        <el-drawer v-model="drawer"  :with-header="false">
          <P class="headline"> 查看公告</P>
          <!--公告标题-->
          <div class="biaoti">公告标题：
            <span>{{examine.noticeTitle}}</span>
          </div>
          <!--公告类型-->
          <div class="zhuagtai">公告类型：
            <span v-if="examine.noticeType==0">重要性</span>
            <span v-if="examine.noticeType==1">政策性</span>
            <span v-if="examine.noticeType==2">任免性</span>

          </div>
          <!--公告状态-->
          <div class="zhuagtai">公告状态：
            <span v-if="examine.noticeState==0">启用</span>
            <span v-if="examine.noticeState==1">禁用</span>
          </div>
          <!--公告内容-->
          <div class="zhuagtai">公告内容：
            <span>{{examine.noticeMatter}}</span>
          </div>
          <!--发布部门-->
          <div class="zhuagtai">发布部门：
            <span v-for="item in affiche.deptName">{{item}}&nbsp;</span>
          </div>
          <!--发布人员-->
          <div class="zhuagtai">发布人员：
            <span>{{examine.noticePeople}}</span>
          </div>
          <!--职位-->
          <div class="zhiwei">职位：
            <span>{{examine.noticePost}}</span>
          </div>
          <!--已看人员-->
          <div class="zhuagtai">已看人员：
            <span v-for="item in unreadName">&nbsp;{{item}}</span>
          </div>
          <!--未看人员-->
          <div class="zhuagtai">未看人员：
            <span v-for="item in staffName">&nbsp;{{item}}</span>
          </div>
          <!--发布时间-->
          <div class="zhuagtai">发布时间：
            <span>{{examine.createdTime}}</span>
          </div>


          <el-button size="default " style="width: 165px;margin-left: 24px;" @click="abrogatel()" >
            取  消
          </el-button>


        </el-drawer>
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
        <!--        {{examine}}-->
        <!--        <br>-->
        <!--        {{deptName}}-->
<!--        {{affiche.deptName}}-->
<!--        {{staffsName}}-->
<!--        {{a}}-->
        <!--        {{affiche.deptlist}}-->
      </div>

    </div>
  </div>

</template>

<script >
import {ref} from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'

export default {
  data() {
    const defaultProps = {
      children: 'deptlist',
      label: 'deptName',
    }
    //删除提示框
    const open = () => {
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
            ElMessage({
              type: 'success',
              message: '删除成功！！',
            })
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    }

    //表格批量删除
    return {
      a:this.$store.state.userall,
      staffsId:this.$store.state.userall.staffId,
      staffsName:this.$store.state.userall.staffName,
      postName:this.$store.state.userall.postName,

      defaultProps,

      //查看集合
      examine:{

      },
      //已读人员
      staffName:[],
      //未读
      unreadName:[],

      //抽屉
      drawer:false,
      //弹出框删除
      open,
      // 分页的功能,初始化
      pageInfo: {
        currentPage: 1,
        pagesize: 3,
        total: 0,
        //类型
        noticeTitle:'',
        //公告标题
        noticeType:'',
        //操作人员
        noticePeople:''
      },
      tableData: [
      ],
      affiche:{
        //员工编号
        staffId:'',
        //公告编号
        noticeId:'',
        //公告标题
        noticeTitle:'',
        //公告类型
        noticeType:'',
        //公告状态
        noticeState:'',
        //内容
        noticeMatter:'',
        //部门名称
        deptName:[],

        deptlist:''
      },

      noticeType:([
        {
          value1: 0,
          label: '重要性',
        },
        {
          value1: 1,
          label: '政策性',
        },
        {
          value1: 2,
          label: '任免性',
        }
      ]),
      //显示添加还是有修改的状态
      outerVisible: ref(false),
      // 判断添加还是编辑
      judge: "添加",

      //按钮是否被禁用
      disableds:true,
      //接收表格数据`
      table:[],

      //存放全选id
      id:[],
      deptName:[],
      aa:''
    }
  },
  created() {
    this.pagingQuery();
  },
  methods:{
    /**
     * 新增公告
     */
    insert(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/notices/insert",
        data:{
          staffId:this.staffsId,
          noticePeople:this.staffsName,
          noticePost:this.postName,
          noticeTitle:this.affiche.noticeTitle,
          noticeType:this.affiche.noticeType,
          noticeState:this.affiche.noticeState,
          noticeMatter:this.affiche.noticeMatter,
          deptName:this.affiche.deptName
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(request=>{
        console.log(request);
        if(request.data.data=='新增成功'){
          ElMessage({
            type:'success',
            message:'新增成功'
          })
        }else{
          ElMessage.error("新增失败")
        }

      })
    },
    /**
     *查询已看公告员
     */
    selectunread(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/notice/selectUnread",
        data:this.examine,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(request=>{
        console.log(request.data.data.staffName+"asdkjfhjkasdf")
        this.unreadName=[]
        for(var i=0; i<request.data.data.length;i++){
          this.unreadName.push(request.data.data[i].staffName)

        }
      })
    },

    /**
     * 查询未看公告员
     */
    selectNoticeState(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/notice/selectNoticeID",
        data:this.examine,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(request=>{
        this.staffName=[]
        console.log(request.data.data.staffName+"asdkjfhjkasdf")
        for(var i=0; i<request.data.data.length;i++){
          this.staffName.push(request.data.data[i].staffName)
        }
      })
    },

    //查看取消按钮
    abrogatel(){
      this.drawer=false,
          this.examine={
          }
      this.affiche={
        deptName: []
      }
      this.staffName=[]
    },

    //点击查看获取表单里的值
    check(row){
      this.affiche={
        //员工编号
        staffId:'',
        //公告编号
        noticeId:'',
        //公告标题
        noticeTitle:'',
        //公告类型
        noticeType:'',
        //公告状态
        noticeState:'',
        //内容
        noticeMatter:'',
        //部门名称
        deptName:[]
      }
      this.examine.noticeId=row.noticeId;
      this.examine.noticeType=row.noticeType;
      this.examine.noticeMatter=row.noticeMatter;
      this.examine.noticeState=row.noticeState;
      this.examine.noticeTitle=row.noticeTitle;
      this.examine.noticePeople=row.noticePeople;
      this.examine.noticePost=row.noticePost;
      this.examine.createdTime=row.createdTime;
      this.examine.staffId=row.staffId
      this.noticeName(row);
    },
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
            this.deleteList();
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    },
    //批量删除
    deleteList(){
      this.id=[];
      for (let i=0 ; i<this.table.length ; i++){
        this.id.push(this.table[i].noticeId)
      }
      this.axios({
        method:'delete',
        url:"http://localhost:8007/provider/notice/list",
        data:this.id,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        if(response.data.data === '删除成功'){
          ElMessage({
            type:'success',
            message:'删除成功'
          })
        }else{
          ElMessage.error("删除失败")
        }
      })
    },

    //删除单行数据
    deleteLine(row){
      this.axios({
        method:'delete',
        url:'http://localhost:8007/provider/notice/'+row.noticeId,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        if(response.data.data ==='删除成功'){
          ElMessage({
            type:"success",
            message:"删除成功"
          });
        }else {
          ElMessage.error("删除失败")
        }
        this.pagingQuery();
      })
    },

    //修改公告数据
    updata(){
      this.axios({
        method:'put',
        url:"http://localhost:8007/provider/notice/noticeId",
        data:this.affiche,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        console.log(response)
        if (response.data.data === "修改成功") {
          ElMessage({
            type: "success",
            message: "修改成功",
          });
        } else if(response.data.data === "修改失败"){
          ElMessage.error("修改失败");
        }
      })
      this.pagingQuery();
      this.affiche={
        //发布人编号
        staffId: '',
        //公告编号
        noticeId:'',
        //公告标题
        noticeTitle:'',
        //公告类型
        noticeType:'',
        //公告状态
        noticeState:'',
        //内容
        noticeMatter:'',
        //部门名称
        deptName:[]
      }
    },


    //节点选中状态发生变化时的回调
    handleCheckChange(data, checked, indeterminate) {
      this.affiche.deptName=[]
      //获取所有选中的节点 start
      let res = this.$refs.tree.getCheckedNodes()
      res.forEach((item) => {
        // this.affiche.deptId = item.deptId
        this.aa=item.deptName
        //关闭Select选择器
        // this.$refs.vueSelect.blur();
        this.affiche.deptName.push(this.aa)
      })


    },

    /**
     * select：查询所有部门信息
     */
    deptsName(){
      this.deptName=[];
      this.axios({
        method:'get',
        url:"http://localhost:8007/provider/depts/selectDepts",
        responseType:'json',
        responseEncoding:'utf-8',
      }).then(response=>{
        this.affiche.deptlist=response.data.data
        // response.data.data.forEach(e=> {
        //   this.deptName.push(e)
        // })
      })
    },

    deptsNameaa(){
      this.affiche={
        //公告编号
        noticeId:'',
        //公告标题
        noticeTitle:'',
        //公告类型
        noticeType:'',
        //公告状态
        noticeState:'',
        //内容
        noticeMatter:'',
        //部门名称
        deptName:[]
      }


      // this.$store.commit('add')
    },

    //点击修改获取表单里的值
    aaa(row){
      this.affiche.staffId=row.staffId
      this.affiche.noticeId=row.noticeId;
      this.affiche.noticeType=row.noticeType;
      this.affiche.noticeMatter=row.noticeMatter;
      this.affiche.noticeState=row.noticeState;
      this.affiche.noticeTitle=row.noticeTitle;
      this.noticeName(row);
    },

    //点击修改赋值部门名称
    noticeName(row){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/noticeDept/noticeDeptId",
        data:row,
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response+'akfjklsdfjlkasdfjlsadjflksdjflks');
        this.affiche.deptName=[]
        for (var i=0; i<response.data.data.length;i++){
          this.affiche.deptName.push(response.data.data[i].deptName);
          console.log(this.affiche.deptName)
        }
      })
    },

    //分页查询
    pagingQuery(){
      this.axios({
        method:'post',
        url:"http://localhost:8007/provider/a/noticeVoServicelmpl",
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
      this.affiche={
        //发布人编号
        staffId: '',
        //公告编号
        noticeId:'',
        //公告标题
        noticeTitle:'',
        //公告类型
        noticeType:'',
        //公告状态
        noticeState:'',
        //内容
        noticeMatter:'',
        //部门名称
        deptName:[]
      }



    },


    //判断删除按钮是否可用
    deletepl(val){
      this.table=val
      if(this.table != ''){
        this.disableds=false
      }else {
        this.disableds=true
      }
    },

    //新增对话框表单验证
    new(){
      if (this.affiche.noticeTitle.length === 0){
        ElNotification({
          title: '错误消息',
          message: '公告标题不能为空！！',
          type: 'error',
        })
      }else if(this.affiche.noticeType.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请选择公告类型！！',
          type: 'error',
        })
      }else if(this.affiche.noticeState.length ===0){
        ElNotification({
          title: '错误消息',
          message: '请选择公告状态！！',
          type: 'error',
        })
      }else if(this.affiche.noticeMatter.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请填写公告内容，不能为空！！',
          type: 'error',
        })
      }else if(this.affiche.deptName.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请填写公告内容，不能为空！！',
          type: 'error',
        })
      }else{
        this.insert()

        this.affiche={
          //公告编号
          noticeId:'',
          //公告标题
          noticeTitle:'',
          //公告类型
          noticeType:'',
          //公告状态
          noticeState:'',
          //内容
          noticeMatter:'',
          //部门名称
          deptName:[]
        }
        this.outerVisible=false
      }
    },

    //修改对话框表单验证
    amend(){
      if (this.affiche.noticeTitle.length === 0){
        ElNotification({
          title: '错误消息',
          message: '公告标题不能为空！！',
          type: 'error',
        })
      }else if(this.affiche.noticeType.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请选择公告类型！！',
          type: 'error',
        })
      }else if(this.affiche.noticeState.length ===0){
        ElNotification({
          title: '错误消息',
          message: '请选择公告状态！！',
          type: 'error',
        })
      }else if(this.affiche.noticeMatter.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请填写公告内容，不能为空！！',
          type: 'error',
        })
      }else if(this.affiche.deptName.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请填写公告内容，不能为空！！',
          type: 'error',
        })
      }else{
        this.updata()
        this.outerVisible=false
      }
    },
    //新增或修改方法判断方法
    judges(){
      if(this.judge=="新增"){
        this.new();
      }else{
        this.amend()
      }
    },
    //取消按钮方法
    cancel(){
      this.affiche={
        //公告编号
        noticeId:'',
        //公告标题
        noticeTitle:'',
        //公告类型
        noticeType:'',
        //公告状态
        noticeState:'',
        //内容
        noticeMatter:'',
        //部门名称
        deptName:[]
      }
      this.outerVisible = false
    },
    //重置
    reset(){
      this.pageInfo.noticeTitle='',
          this.pageInfo.noticeType='',
          this.pageInfo.noticePeople=''
    }
  }
}
</script>

<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");
/* 图标 */
@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_27y04t4z5lq.woff2?t=1641783336698') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_27y04t4z5lq.woff?t=1641783336698') format('woff'),
  url('//at.alicdn.com/t/font_2994452_27y04t4z5lq.ttf?t=1641783336698') format('truetype');
}
.zhiwei{
  margin: 34px 0px 28px 51px;
  font-weight: bold;
  font-size: 15px;
}

.zhuagtai{
  margin: 34px 0px 28px 23px;
  font-weight: bold;
  font-size: 15px;
}

.leixin{
  margin: -10px 0px 28px 23px;
  font-weight: bold;
  font-size: 15px;
}


.biaoti{
  margin: 50px 0px 28px 23px;
  font-weight: bold;
  font-size: 15px;
}



/*内容*/
.neirong{
  font-weight: bold;
  size: 14px;
  margin-left: 37px;
  position: absolute;
  top: 192px;
}
.headline{
  font-size: 18px;
  font-weight:bold;
  position: absolute;
  top: 16px;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.tck{
  width: 600px;
  height: 200px;
  background: green;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* 对话公告框标题文本样式 */
.announcement .headlines{
  font-size: 14px;
  margin-left: 12px;
  margin-top: 20px;
}
/* 对话框公告类型下拉框样式 */
.announcement .types{
  font-size: 14px;
  margin-left: 360px;
  margin-top:-51px;
}
/* 对话框公告状态单选框样式 */
.announcement .state{
  font-size: 14px;
  margin-left: 37px;
  margin-top:19px;
}
.options{
  font-size: 14px;
  margin-left: 97px;
  margin-top:19px;
}
/* 对话框公告内容文本框样式 */
.announcement .content{
  font-size: 14px;
  margin-left: 37px;
  margin-top:23px;
}

/* 弹出窗口按钮样式 */
.announcement .announcement-cz{
  width: 150px;
  margin-left: 451px;
  margin-bottom: -15px;
}
/* 弹出窗口内容样式 */
.announcement .announcement-nr {
  width: 525px;
  margin-top: -20px;
  margin-left: 80px;
  margin-bottom: -45px;

}

.announcement .announcement-options{
  margin-top: -64px;
  margin-left: 222px;
}
/* 弹出窗口状态样式 */
.announcement .announcement-zt {
  margin-top: -30px;
  margin-left: 80px;
}
/* 弹出窗口类型样式 */
.announcement .announcement-type {
  width: 240px;
  margin-top: -30px;
  margin-left: 428px;

}
/* 弹出窗口标题样式 */
.announcement .announcement-title {
  width: 240px;
  margin-top: -30px;
  margin-left: 80px;

}
.button{
  margin-bottom: 10px;

}
/* 表头新增按钮 */
.button .button-new {
  height: 30px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  margin: 0px 0px 0px 10px;
  border: none;
  width: 106px;
}

.button .button-new:hover {
  height: 30px;
  width: 90px;
  color: white;
  background-color: #1890FF;
  margin: 0px 0px 0px 10px;
  border: none;
  width: 106px;
}

/* 表头批量删除按钮样式 */
.button-delete {
  height: 30px;
  width: 90px;
  margin: 0px 0px 0px 5px;
  border: none;
  width: 106px;
}

/* 搜索 */
.form-gg {
  margin: 0px 0px 0px 10px;
}

.form-lx {
  margin: 0px 0px 0px 10px;
}

.form-ry {
  margin: 0px 0px 0px 10px;
}


/* 搜索按钮 */
.search-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 85px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}
.search-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 85px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 85px;
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
  margin: 29px 0px 0px 5px;
  width: 85px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
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
  margin-top: 0px;
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

.demo-pagination-block{
  margin-left:22px ;
  margin-top: 20px;
  margin-bottom: 30px;
}




</style>
