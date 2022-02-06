<!--角色设置界面-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="j-set-big">
          <div class="j-set-top">

           <el-form :inline="true" v-model="search">
             <!-- 菜单名称搜索 -->
             <el-form-item class="form-dizhi" label="菜单名称">
               <el-input  size="small" v-model="search.menuName" placeholder="请输入菜单名称"></el-input>
             </el-form-item>

             <!-- 登录时间搜索 -->
             <el-form-item class="form-time" label="登录时间">
               <el-date-picker
                   size="small"
                   v-model="search.value1"
                   type="daterange"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期"
                   :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
               >
               </el-date-picker>
             </el-form-item>

             <!-- 操作按钮 -->
             <el-form-item  style="margin-left: 167px;margin-top: 5px;">
               <el-button size="mini" class="search-ss" type="primary" >
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

            <div class="button">
              <el-button size="mini" style="width: 90px; font-size: 14px "
                         class="button-empty"
                         v-bind:disabled="disabled"
                         @click="this.insertMenu=true,this.boxName='新增菜单',this.ruleForm.previousMenu='主类目'">
                         +新增
                         </el-button>
              <el-button type="info" size="mini"  @click="unfold">
                <i class="iconfont" style="font-size: 13px;color: white">&#xe60a</i>
                展开/折叠</el-button>
            </div>

          </div>
          <div class="j-set-bottom" style="margin-top: 20px;">
            <el-table :data="tableData" style="width: 100% ;"
                      @selection-change="deletewx"
                      :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                      :cell-style="{ textAlign: 'center' }"
                      :default-sort="{ prop: 'date', order: 'descending' }"
                      row-key="MENU_ID"
                      v-if="refreshTable"
                      :default-expand-all="expands"
                      @expand-change="expands=true"
            >

              <el-table-column prop="MENU_NAME" label="菜单名称" min-width="200"/>
              <el-table-column prop="MENU_MODULE" label="图标" min-width="130"/>
              <el-table-column prop="MENU_ORDER" label="排序" min-width="100"/>
              <el-table-column prop="MENU_ROUTE" label="组件路径" min-width="200"/>
              <el-table-column label="状态" min-width="150">
                <template #default="scope">
                  <span class="button-enable" v-if="scope.row.MENU_STATE==0">启用</span>
                  <span class="button-forbidden" v-if="scope.row.MENU_STATE==1">禁用</span>
                </template>
              </el-table-column>
              <el-table-column prop="CREATED_TIME" label="创建时间" min-width="220"/>
              <el-table-column label="操作" min-width="180">
                <template #default="scope">
                  <el-button type="text"
                             @click="this.insertMenu=true,this.boxName='修改菜单',this.ruleForm.previousMenu=scope.row.MENU_NAME">
                    <i class="iconfont" style="font-size: 13px;color: #5aaaff">&#xe606</i>
                    修改
                  </el-button>

                  <el-button type="text" @click="deleteMenu(scope.row.MENU_NAME)">
                    <i class="iconfont"  style="font-size: 13px;color: #5aaaff">&#xe61c</i>
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  新增菜单弹出框-->
  <el-dialog
      v-model="insertMenu"
      :title="this.boxName"
      width="48%"
      destroy-on-close
      left
  >
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        inline="true"
    >
      <el-form-item label="上级菜单：" prop="previousMenu" style="margin-bottom: 25px">
        <el-input size="small" v-model="ruleForm.previousMenu" style="width: 203px" disabled></el-input>
      </el-form-item>
      <el-form-item label="菜单名称：" prop="menuName" style="margin-bottom: 25px">


        <el-select  v-model="ruleForm.menuName" slot="prepend" style="width: 203px"
                   filterable
                   allow-create
                   default-first-option>
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型：" prop="menuType" class="insert_menuType" style="margin-bottom: 25px">
        <el-radio-group  style="margin-left: -10px;" v-model="ruleForm.menuType">
          <el-radio label="目录" style="margin: 10px"></el-radio>
          <el-radio label="菜单" style="margin: 10px"></el-radio>
          <el-radio label="按钮" style="margin: 10px"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单状态：" prop="menuState" class="insert_menuState" style="margin-bottom: 25px">
        <el-switch style="margin-left: -3px;" v-model="ruleForm.menuState" active-text="禁用" inactive-text="启用"/>
      </el-form-item>
      <el-form-item label="菜单图标：" prop="menuImage" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuImage" slot="prepend" style="width: 535px"
                   filterable
                   allow-create
                   default-first-option>
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路由地址：" prop="menuRouter" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuRouter" slot="prepend" style="width: 535px"
                   filterable
                   allow-create
                   default-first-option
        >
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组件地址：" prop="menuModule" style="margin-bottom: 25px">
        <el-select v-model="ruleForm.menuModule" slot="prepend" style="width: 535px"
                   filterable
                   allow-create
                   default-first-option
                   max-height="100px"
        >
          <el-option label="公交" value="2"></el-option>
          <el-option label="地铁" value="3"></el-option>
          <el-option label="高铁" value="4"></el-option>
          <el-option label="其他" value="5"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="margin-bottom: 3px;margin-left: 445px;margin-top: 10px;">
        <div class="from-data-cz">
          <!-- 修改按钮 -->
          <el-button  @click="submitForm('ruleForm')" style="width: 100px;" type="primary">
            确定
          </el-button>
          <el-button  @click="resetForm('ruleForm')" style="width: 100px;" >
            取消
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {ElMessageBox, ElMessage} from 'element-plus'

export default {
  data() {


    return {

      states: ([
        {
          value: '正常',
          label: '正常',
        },
        {
          value: '停用',
          label: '停用',
        },
      ]),

      search:{
        menuName:'',
        value1:'',
      },
      //弹出框名称
      boxName: '',
      ruleForm: {
        //上级菜单名称
        previousMenu: '',
        //菜单名称
        menuName: '',
        //菜单类型
        menuType: '目录',
        //菜单状态
        menuState: false,
        //菜单图标
        menuImage: '',
        //菜单路由
        menuRouter: '',
        //菜单组件
        menuModule: ''
      },
      rules: {

        //菜单名称
        menuName: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'change',
          }
        ],
        //菜单图标
        menuImage: [
          {
            required: true,
            message: '图标地址不能为空',
            trigger: 'change',
          }
        ],
        //菜单路由
        menuRouter: [
          {
            required: true,
            message: '路由地址不能为空',
            trigger: 'change',
          }
        ],
        //菜单组件
        menuModule: [
          {
            required: true,
            message: '组件地址不能为空',
            trigger: 'change',
          }
        ]
      },
      //新增菜单弹出框
      insertMenu: false,
      one: "",
      //一键展开收缩菜单
      expands: false,
      //渲染展开菜单
      refreshTable: true,
      //输入的菜单名称值
      menuName: '',
      //日期选择组件

      //表格数据
      tableData: [
        {
          MENU_ID: 1,
          MENU_NAME: '工作台',
          MENU_MODULE: '',
          MENU_ORDER: 1,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-02'
        },
        {
          MENU_ID: 2,
          MENU_NAME: '组织管理',
          MENU_MODULE: '',
          MENU_ORDER: 2,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-04',
        },
        {
          MENU_ID: 3,
          MENU_NAME: '员工管理',
          MENU_MODULE: '',
          MENU_ORDER: 3,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-01',
          children: [
            {
              MENU_ID: 31,
              MENU_NAME: '员工信息',
              MENU_MODULE: '',
              MENU_ORDER: 1,
              MENU_ROUTE: '',
              MENU_STATE: 0,
              CREATED_TIME: '2016-05-01',
              children: [
                {
                  MENU_ID: 33,
                  MENU_NAME: '员工花名册',
                  MENU_MODULE: '',
                  MENU_ORDER: 1,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 34,
                  MENU_NAME: '人才展示',
                  MENU_MODULE: '',
                  MENU_ORDER: 2,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 35,
                  MENU_NAME: '人才统计',
                  MENU_MODULE: '',
                  MENU_ORDER: 3,
                  MENU_ROUTE: '',
                  MENU_STATE: 1,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 36,
                  MENU_NAME: '员工审核',
                  MENU_MODULE: '',
                  MENU_ORDER: 4,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                },
                {
                  MENU_ID: 37,
                  MENU_NAME: '历史花名册',
                  MENU_MODULE: '',
                  MENU_ORDER: 5,
                  MENU_ROUTE: '',
                  MENU_STATE: 0,
                  CREATED_TIME: '2016-05-01'
                }
              ]
            },
            {
              MENU_ID: 32,
              MENU_NAME: '兼职管理',
              MENU_MODULE: '',
              MENU_ORDER: 2,
              MENU_ROUTE: '',
              MENU_STATE: 0,
              CREATED_TIME: '2016-05-01',
            },
            {
              MENU_ID: 33,
              MENU_NAME: '档案管理',
              MENU_MODULE: '',
              MENU_ORDER: 3,
              MENU_ROUTE: '',
              MENU_STATE: 0,
              CREATED_TIME: '2016-05-01',
            },
          ],
        },
        {
          MENU_ID: 4,
          MENU_NAME: '时间管理',
          MENU_MODULE: '',
          MENU_ORDER: 4,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-03',
        },
        {
          MENU_ID: 5,
          MENU_NAME: '招聘管理',
          MENU_MODULE: '',
          MENU_ORDER: 5,
          MENU_ROUTE: '',
          MENU_STATE: 0,
          CREATED_TIME: '2016-05-03',
        }
      ],
    }
  }, methods: {

    //重置
    reset(){
      this.search={
        menuName:'',
        //登录时间
        value1:'',
      }
    },

    deleteMenu(value) {
      ElMessageBox.confirm(
          '是否确认删除名称为“' + value + '"的数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.boxName === '新增菜单') {

          } else {

          }
          //清空表单
          this.$refs[formName].resetFields();
          //关闭弹出框
          this.insertMenu = false;
          ElMessage({
            type: 'success',
            message: this.boxName == '新增菜单' ? '新增成功' : '修改成功',
          })
        } else {
          return false
        }
      })
    },
    //清空表单数据
    resetForm(formName) {
      //清空表单数据
      this.$refs[formName].resetFields();
      //关闭弹出框
      this.insertMenu = false;
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    },
    //展开操作/收起操作
    unfold() {
      this.refreshTable = false;
      if (this.expands == true) {
        this.expands = false;
      } else {
        this.expands = true;
      }
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    }
  }
}
</script>
<style scoped>
@import url("../../css/navigation.css");
@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.woff2?t=1640660838786') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.woff?t=1640660838786') format('woff'),
  url('//at.alicdn.com/t/font_2994452_cnri3h3n34u.ttf?t=1640660838786') format('truetype');
}


/deep/.el-table__header{
  height: 64.8px;
}
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
.form-dizhi{
  width: 270px;
}
.form-time{
  width: 270px;
  margin-left: 20px;
  margin-top: 5px;

}
/deep/ .el-input__suffix .el-input__validateIcon {
  position: relative !important;
  top: 13px;
}

/deep/ .el-scrollbar__wrap {
  overflow-y: auto;
  opacity: 1;
}


/deep/ .insert_menuType .el-form-item__label {
  position: relative !important;
  top: 10px;
}

/deep/ .insert_menuState .el-form-item__label {
  position: relative;
  top: 2px;
  left: -5px
}

.cell span {
  min-height: 0px;
}

/deep/ .el-form-item.is-error .el-input__validateIcon {
  position: relative;
  top: 13px;
}

.el-scrollbar__view .el-select-dropdown__item {
  text-align: center;
}

/deep/ .el-input__suffix .el-input__suffix-inner .el-icon svg {
  position: relative;
  top: 10px;
}



/deep/ .el-date-editor .el-range__close-icon svg {
  position: relative;
  top: -13px;
  left: 30px;
}

.button-enable {
  background: #ecf5ff;
  border: 1px #cfe6ff solid;
  color: #5aaaff;
  display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

.button-forbidden {
  background: #fef0f0;
  border: 1px #f2c5c5 solid;
  color: #f57a7a;
  display: inline-block;
  line-height: 1;
  min-height: 40px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

/deep/ td div button span svg {
  position: relative !important;
  top: 2px;
}

/deep/ .el-button {
  font-size: 12px !important;
}

/deep/ th {
  text-align: center !important;
}

/deep/ td {
  text-align: center !important;
}

.j-set-big {
  margin: 20px;
}

.j-set-top {
  margin: 10px;
}

.j-set-bottom {
  margin: 0px 10px 0px 10px;
}

/deep/ .j-set-top-bottom button span {
  position: relative !important;
  top: -2px !important;
}


.j-set-name .el-input {
  display: inline-block;
  width: 70%;
}

/deep/ .j-set-name .el-input input {
  height: 32px;
}

/deep/ .el-range-editor.el-input__inner {
  display: inline-block;
}


/deep/ .el-range-editor.el-input__inner {
  position: relative;
  height: 32px;
  top: 8px;
}

/deep/ .el-range-editor.el-input__inner .el-range-input {
  position: relative;
  top: -7px;
}

/deep/ .j-set-top .el-button {
  min-height: 32px !important;
  height: 32px;
  padding: 1px 20px;
  position: relative;
  top: 2px;
}

/deep/ .el-range-editor.el-input__inner .el-range-separator {
  position: relative;
  top: -8px;
}

.el-button--primary .icon {
  position: relative;
  top: 3px;
}

.el-button--info .icon {
  position: relative;
  top: 3px;
}



/deep/ .j-set-button .el-button--primary {
  margin-right: 10px;
}

/deep/ .j-set-button .el-button--primary span {
  position: relative;
  top: -2px;
}

/deep/ .j-set-button .el-button--default span {
  position: relative;
  top: -2px;
}

.j-set-button .el-button--default .icon {
  position: relative;
  top: 3px
}

.j-set-top-bottom .el-button--primary {
  margin-right: 10px;
}

.j-set-top-bottom .el-button--info {
  margin-right: 75.5%;
}

/deep/ .j-set-top-bottom .el-button--default {
  border-radius: 50%;
  width: 30px !important;
  height: 20px !important;
  padding: 0 !important;
}

.j-set-top-bottom {
  margin-bottom: 10px;
}


/deep/ .top-search button span {
  top: 1px !important;
}

/deep/ .top-reset button span {
  top: 1px !important;
}


/deep/ .el-icon {
  display: inline-block;
}

/deep/ .j-set-date div i {
  top: 4px;
}
</style>