<template>
    <router-view/>
</template>
<script charset = "utf-8"
        type = "text/javascript">
export default {
  /* 加载页面 */
  created: function () {
    //全局监听，页面刷新的时候将store里state的值存到sessionStorage中，
    //然后从sessionStorage中获取，再赋值给store。然后再把session里面
    //存的删除即可，相当于中间件的作用。在页面加载时读取sessionStorage
    //里的状态信息
    if (sessionStorage.getItem("state")) {
      //替换 store 的根状态，状态合并
      //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性
      //，复制到目标对象（target）。Object.assign(target, source1, source2);
      this.$store.replaceState(
          Object.assign(
              this.$store.state,
              JSON.parse(sessionStorage.getItem("state"))
          )
      )
    }
    /* 清空本地内存*/
    sessionStorage.clear()
  }
  ,
  mounted: function () {
    /* 卸载页面 */
    window.addEventListener('beforeunload', () => {
      //刷新前将目前登录的用户保存到sessionStorage中
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
	#app{
		height: 100%;
		overflow-y: hidden;
		overflow-x: hidden;
	}
</style>
