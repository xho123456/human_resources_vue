<template>
  <!--考勤打卡-->
  <div style="position: absolute; top: 0px; left: 0px; width: 100%;" v-if="divDogs==true">
    <div class="">
      <div style="left: 60%; transform-origin: 300px -4px 0px; top: -1054px;"
           class="ant-popover singPop ant-popover-placement-bottomRight">
        <div class="ant-popover-content">
          <div class="ant-popover-inner">
            <div style="height: 300px;width: 300px;background-color: red"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <div>
					<span style="height: 60px; width: 200px; background-color: #008df7;display: inline-block;">
						<div style="padding: 21px; text-align: center;">e-cology | 前端用户中心</div>
					</span>
          <span>
						<span><i class="iconfont sass-iconfont">&#xe632;</i></span>
						<span class="span-tims">王鑫科技股份有限公司</span>
					</span>
        </div>
      </div>

      <div class="span-img">
        <!--考勤：考勤打卡-->
        <div style="padding-right: 185px;display: flex;align-items: center;cursor: pointer">
          <i class="iconfont" style="font-size: 19px">&#xe62b;</i>
          <span style="font-size: 14px" @click="divDogs=!divDogs">考勤</span>
        </div>
        <img src="./assets/syx.jpg" width="30" height="30" alt="">
        <span>
					 <el-dropdown trigger="click">
					        <span style="color: #fff; cursor: pointer;">
					           蛇颖欣
					        </span>
					        <template #dropdown>
					          <el-dropdown-menu>
					            <el-dropdown-item>Action one</el-dropdown-item>
					            <el-dropdown-item>Action two</el-dropdown-item>
					            <el-dropdown-item>Action three</el-dropdown-item>
					            <el-dropdown-item>Action froms</el-dropdown-item>
					          </el-dropdown-menu>
					        </template>
					      </el-dropdown>
				</span>
      </div>

    </el-header>
    <!--页面主体区-->
    <el-container @click="divDogs=false">
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu active-text-color="#409EFF" background-color="#333744" text-color="#fff" :unique-opened="true"
                 :collapse="isCollapse" :collapse-transition="false" :router="true"
                 :default-active="activePath">
          <!--一级菜单-->

          <template v-for="(item,i) in menulist">
            <!-- 判断一级导航是否有叶子: 有-->
            <el-sub-menu :index="item.MENU_ROUTE +''" :key="item.MENU_ID" v-if="item.MENU_LEAF==0">
              <!--一级菜单模板区域-->
              <template #title>
                <!--图标-->
                <el-icon>
                  <i-location/>
                </el-icon>
                <span>{{ item.MENU_NAME }}</span>
              </template>

              <!--二级菜单-->
              <template v-if="item.son[0].MENU_LEAF==0">
                <el-sub-menu :index="subItem.MENU_ROUTE +'' " v-for="subItem in item.son"
                             :key="subItem.MENU_ID">
                  <template #title>{{ subItem.MENU_NAME }}</template>
                  <!--三级菜单-->
                  <el-menu-item :index="vsbItem.MENU_ROUTE +'' " v-for="vsbItem in subItem.son"
                                :key="vsbItem.MENU_ID"

                                @click="saveNavState(vsbItem.MENU_ROUTE)">
                    {{ vsbItem.MENU_NAME }}
                  </el-menu-item>
                </el-sub-menu>
              </template>
              <!--二级菜单-->
              <template v-if="item.son[0].MENU_LEAF==1">
                <el-menu-item :index="subItem.MENU_ROUTE +'' " v-for="subItem in item.son"
                              :key="subItem.MENU_ID"
                              @click="saveNavState(subItem.MENU_ROUTE)">
                  <template #title>{{ subItem.MENU_NAME }}</template>
                </el-menu-item>
              </template>
            </el-sub-menu>
            <!-- 判断一级导航是否有叶子: 无-->
            <el-menu-item :index="item.MENU_ROUTE +'' " :key="item.MENU_ID" v-if="item.MENU_LEAF==1"
                          @click="saveNavState(item.MENU_ROUTE)">
              <!--一级菜单模板区域-->
              <el-icon>
                <i-location/>
              </el-icon>
              <template #title>
                <span>{{ item.MENU_NAME }}</span>
              </template>
            </el-menu-item>
          </template>


        </el-menu>
      </el-aside>
      <!--右侧主体区-->
      <el-main style="max-height: 671.2px;overflow-y:auto">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //考勤打卡
      divDogs:false,

      menulist: this.$store.state.memuList,
      //是否折叠
      isCollapse: false,
      //保存当前激活菜单
      activePath: this.$store.state.activate_router,

    }
  },
  created() {
    console.log(this.menulist)
    console.log(this.activePath)
  },
  methods: {
    //点击按钮切换菜单折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      this.$store.state.activate_router = activePath
    }
  }
}
</script>

<style>
.el-popper__arrow {
  display: none;
}
</style>
<style scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_df93th7uouw.woff2?t=1644043106155') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_df93th7uouw.woff?t=1644043106155') format('woff'),
  url('//at.alicdn.com/t/font_3164770_df93th7uouw.ttf?t=1644043106155') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: #0270c1;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
}

.el-aside {
  background-color: #333744;
  overflow-y: hidden;
  overflow-x: hidden;
}

.el-menu {
  border-right: none;
  overflow-y: hidden;
  overflow-x: hidden;
  max-width: 200px;
  max-height: 647.2px;

}

.el-menu:hover {
  overflow-y: auto;
}

.el-main {
  background-color: #EAEDF1;
  --el-main-padding: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.sass-iconfont {
  margin-left: 20px;
  font-size: 18px;
  cursor: pointer;
}

.span-tims {
  margin-left: 10px;
  font-size: 22px;
}

img {
  border-radius: 20px;
  margin-right: 10px;
}

.span-img {
  display: flex;
  align-items: center;
}


/*考勤打卡*/
.singPop {
  top: 60px !important;
  padding: 0;
  width: 300px;
  margin-left: 20px;
}

.ant-popover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1070;
  cursor: auto;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  white-space: normal;
  font-size: 12px;
  line-height: 1.6;
  font-weight: 400;
  text-align: left;
}
</style>
