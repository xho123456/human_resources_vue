<template>
  <section
      class="ant-layout ant-layout-has-sider"
      style="
      min-width: 988px;
      background-color: rgb(232, 239, 246, 0);"
      id="scrollLayout"
  >
	<main class="ant-layout-content">
      <!--视图显示-->
      <router-view/>
    </main>
  </section>
</template>



<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");

/deep/ .el-sub-menu .el-sub-menu__icon-arrow {
  position: relative !important;
  top: 4px !important;
  right: 0px !important;
}

/deep/ .el-sub-menu .el-menu-item {
  min-width: auto !important;
}

/deep/ #el-menu {
  height: 100% !important;
  overflow-x: auto !important;
}

.custom-menu {
  padding: 0px !important;
  height: 90% !important;
}

/deep/ label li div span {
  margin-right: 20px;
}

/deep/ .el-menu-item {
  font-weight: bold !important;
  font-size: 14px !important;
  margin-left: 16px !important;
  height: 50px !important;
}

/deep/ .el-tabs__item {
  padding: 0px 10px;
  padding-left: 36px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  position: relative;
}

/deep/ .el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform var(--el-transition-duration);
  float: left;
  z-index: calc(var(--el-index-normal) + 1);
  margin-left: 0px;
}

a {
  font-size: 15px;
  color: black;
}
</style>
