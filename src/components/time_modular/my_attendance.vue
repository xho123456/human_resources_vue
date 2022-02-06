<!-- 我的考勤 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="my-cead">
          <div style="padding-left: 20px;display: flex;align-items: center;">
            <div class="my-span1"></div>
            <div class="my-span2">我的考勤</div>
          </div>
        </div>
        <div class="my-cead my-time">
          <div style="padding-left: 20px;display: flex;align-items: center;">
            年月日时分秒
          </div>
        </div>

        <!--内容主体区域-->
        <div class="my-cead1">
          <div class="an-card">
             <div class="an-cread">
               <!--出勤统计-->
               <div style="width: 468px;border: 1px solid #e9e9e9;">
                 <div class="aks-div">出勤统计</div>
               </div>
               <!--异常考勤汇总-->
               <div style="width: 936px;border: 1px solid #e9e9e9;">
                 <div class="aks-div">异常考勤汇总</div>
                 <div>
                   <div class="my-caerdq">

                     <div class="my-ant">
                       <div class="my-ant-show" style="background-color: rgb(72, 198, 81);">
                         <i class="iconfont" style="font-size: 30px">&#xeb17;</i>
                       </div>
                       <div class="show-dv1">
                           <div class="show-dv2">9</div>
                           <div class="show-dv3" title="迟到(天)">迟到(天)</div>
                       </div>
                     </div>

                     <div class="my-ant">
                       <div class="my-ant-show" style="background-color: rgb(79, 140, 255);">
                         <i class="iconfont" style="font-size: 24px">&#xe638;</i>
                       </div>
                       <div class="show-dv1">
                         <div class="show-dv2">9</div>
                         <div class="show-dv3" title="早退(天)">早退(天)</div>
                       </div>
                     </div>
                     <div class="my-ant">
                       <div class="my-ant-show" style="background-color: rgb(141, 107, 243);">
                         <i class="iconfont" style="font-size: 32px">&#xeb34;</i>
                       </div>
                       <div class="show-dv1">
                         <div class="show-dv2">9</div>
                         <div class="show-dv3" title="旷工(天)">旷工(天)</div>
                       </div>
                     </div>
                     <div class="my-ant">
                       <div class="my-ant-show" style="background-color: rgb(72, 198, 81);">
                         <i class="iconfont" style="font-size: 29px">&#xe61e;</i>
                       </div>
                       <div class="show-dv1">
                         <div class="show-dv2">9</div>
                         <div class="show-dv3" title="漏签(天)">漏签(天)</div>
                       </div>
                     </div>
                   </div>
                   <div class="my-caerdq">
                     <div class="my-ant">
                       <div class="my-ant-show" style="background-color: rgb(79, 140, 255);">
                         <i class="iconfont" style="font-size: 29px">&#xe62b;</i>
                       </div>
                       <div class="show-dv1">
                         <div class="show-dv2">9</div>
                         <div class="show-dv3" title="请假(天)">请假(天)</div>
                       </div>
                     </div>
                     <div class="my-ant">
                       <div class="my-ant-show" style="background-color: rgb(141, 107, 243);">
                         <i class="iconfont" style="font-size: 29px">&#xe69f;</i>
                       </div>
                       <div class="show-dv1">
                         <div class="show-dv2">9</div>
                         <div class="show-dv3" title="加班(天)">加班(天)</div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div class="an-card">
            <el-table :data="tableData" stripe style="width: 100%" :border="true">
              <el-table-column prop="date" label="Date" width="180" />
              <el-table-column prop="name" label="Name" width="180" />
              <el-table-column prop="address" label="Address" />
            </el-table>
          </div>





        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:[
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },{
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },

      ]
    }
  }
}
</script>

<style type="text/css" scoped>
@font-face {
  font-family: 'iconfont';  /* Project id 3164770 */
  src: url('//at.alicdn.com/t/font_3164770_df93th7uouw.woff2?t=1644043106155') format('woff2'),
  url('//at.alicdn.com/t/font_3164770_df93th7uouw.woff?t=1644043106155') format('woff'),
  url('//at.alicdn.com/t/font_3164770_df93th7uouw.ttf?t=1644043106155') format('truetype');
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
.my-cead{
  height: 50px;
  width: 100%;display: flex;
  background-color: #f9f9f9;
}
.my-time{
  background-color: white;
  border-bottom: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  height: 47px;
}
.my-span1 {
  width: 35px;height: 35px;border-radius: 20px;background-color: #0c9c6e;
}
.my-span2{
  margin-left: 10px;font-size: 18px;color: black;
}
.my-cead1{
    width: 100%;
}
.an-card{
  padding: 10px 30px;
}
.an-cread{
  height: 288px;  border: 1px solid #e9e9e9;display: flex;
}
.aks-div{
  height: 40px;padding-left: 15px;display: flex;align-items: center;border-bottom: 1px solid #e9e9e9;color: black;
}
.my-caerdq{
  height: 124px;padding-right: 30px;padding-left: 50px;display: flex;align-items: center;
}
.my-ant{
  width: 195px;height: 51px;display: flex;
}
.my-ant-show{
  width: 50px; height: 50px;border-radius: 25px;cursor: pointer;display: flex;background-color: #cccccc;
}
.show-dv1{
  height: 37px;padding-left: 5px;cursor: pointer;
}
.show-dv2{
  height: 24px;width: 140px;font-size: 24px;color: #999;line-height: 17px;cursor: pointer;
}
.show-dv3{
  height: 13px;width: 140px;color: black;font-size: 12px;cursor: pointer;
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
</style>