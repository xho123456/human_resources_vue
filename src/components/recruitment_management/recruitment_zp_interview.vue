<!--招聘过程 面试管理-->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="my-cead">
        <div style="width:97%;padding-left: 20px;display: flex;align-items: center;justify-content: space-between;">
          <div style="display: flex;align-items: center;">
            <div class="my-span1" style="display: flex;">
              <i class="iconfont" style="font-size: 20px">&#xe7d9;</i>
            </div>
            <div class="my-span2">面试管理</div>
          </div>
        </div>
      </div>
      <!--内容-->
      <div class="j-card-body ">
        <div class="j-tabs">
          <ul>
            <li @click="liback(1)">
              <div v-bind:class="{active:isActive1}">
                <router-link :to="{path:this.daiInterview,query:{path:this.$route.query.path}}">
                  <span v-bind:class="{sactive:isActive1}">面试中</span>
                </router-link>
              </div>
            </li>

            <li @click="liback(2)">
              <div v-bind:class="{active:isActive2}">
                <router-link :to="{path:this.interviewPass,query:{path:this.$route.query.path}}">
                  <span v-bind:class="{sactive:isActive2}">面试通过</span>
                </router-link>
              </div>
            </li>

            <li @click="liback(3)">
              <div v-bind:class="{active:isActive3}">
                <router-link :to="{path:this.daiSecondInterview,query:{path:this.$route.query.path}}">
                  <span v-bind:class="{sactive:isActive3}">淘汰库</span>
                </router-link>
              </div>
            </li>

          </ul>
        </div>
        <div>
          <router-view/>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      //路由地址
      daiInterview: '/recruitment/daiInterview',
      interviewPass: '/recruitment/interviewPass',
      daiSecondInterview: '/recruitment/daiSecondInterview',
      daiSecondInterviewPass: '/recruitment/daiSecondInterviewPass',

    }
  },
  methods: {
    liback(n) {
      if (n === 1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
      }
      if (n === 2) {
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
      }
      if (n === 3) {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
      }
      if (n === 4) {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
      }

    }
  }
}

</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

.j-tabs {
  border-bottom: 1px solid #d9d9d9;
}

.j-tabs ul {
  margin-bottom: -2px;
  padding-left: 0px;
}

.j-tabs li {
  margin: 0;
  display: inline-block;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 0;
}

.j-tabs li a {
  display: inline-block;
  height: 54px;
  line-height: 54px;
  color: #000;
  padding: 0 21px;
  font-size: 14px;
}

.active {
  border-bottom: 1px solid #085fc3;
}

.sactive {
  color: #085fc3;
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


</style>
