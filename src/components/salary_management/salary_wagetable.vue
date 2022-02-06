<!--查看工资表 -->
<template>
  <div style="width:100%;">
  <div style="width:100%;height:10px;">
    <!--搜索输入框-->
    <el-row style="width:200px;float:right;">
      <el-input v-model="seek" placeholder="根据员工id搜索">
        <template #suffix>
          <el-icon class="el-input__icon"><i-search/></el-icon>
        </template>
      </el-input>
    </el-row>
  </div>
    <div style="width:100%;margin-top: 50px;" class="icon-p">
<!--      <div style="width:80%;height:100px;margin: auto;background: #42b983">-->
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" style="background-color:#085fc3;font-size:14px;color: white">
           <p>29</p>
            <p>全部</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" style="background-color: #085fc3;font-size:14px;color: white">
            <p>29</p>
            <p>正式员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" style="background-color:#085fc3;font-size:14px;color: white">
            <p>22</p>
            <p>试用员工</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: #085fc3;font-size:14px;color: white">
            <p>22</p>
            <p>本月新入职</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: #085fc3;font-size:14px;color: white">
            <p>22</p>
            <p>本月调薪</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always" style="background-color: #085fc3;font-size:14px;color: white">
            <p>22</p>
            <p>本月离职</p>
          </el-card>
        </el-col>
      </el-row>
      </div>


    <div style="text-align: center;">
      <el-table :data="tableData" style="width: 100%;font-size: 12px;color:black;font-weight: normal;">
          <el-table-column  label="基本信息">
            <el-table-column     prop="name" label="姓名" width="100" />
            <el-table-column   prop="deptname" label="部门" width="100" />
            <el-table-column   prop="zhiwei" label="职位" width="100" />
<!--            <el-table-column   prop="name" label="本月变动" width="100" />-->
        </el-table-column>
<!--        <el-table-column label="考勤数据" >
          <el-table-column prop="name" label="应出勤天数" width="100" />
          <el-table-column prop="name" label="实际出勤天数" width="100" />
          <el-table-column prop="name" label="月计薪天数" width="100" />
        </el-table-column>-->

          <el-table-column prop="zip" label="基本工资" width="110" />
<!--          <el-table-column prop="name" label="实发固定工资" width="100" />-->
        <el-table-column label="加班工资" >
          <el-table-column prop="gzSalary" label="工作日加班工资" width="110" />
          <el-table-column prop="xxSalary" label="休息日加班工资" width="110" />
          <el-table-column prop="jjSalary" label="节假日加班工资" width="110" />
        </el-table-column>
        <el-table-column prop="hjSalary" label="工资合计" width="100" />
        <el-table-column label="考勤扣款" >
          <el-table-column prop="chidao" label="迟到" width="100" />
          <el-table-column prop="zt" label="早退" width="100" />
          <el-table-column prop="wqt" label="未签到" width="100" />
          <el-table-column prop="wqd" label="未签退" width="100" />
          <el-table-column prop="kg" label="旷工" width="100" />
          <el-table-column prop="sj" label="事假" width="100" />
          <el-table-column prop="bj" label="病假" width="100" />
<!--          <el-table-column prop="name" label="不在职免发" width="100" />-->
        </el-table-column>
        <el-table-column label="社保" >
          <el-table-column prop="grsb" label="个人缴纳社保" width="100" />
          <el-table-column prop="gssb" label="公司缴纳社保" width="100" />
        </el-table-column>
        <el-table-column label="公积金" >
          <el-table-column prop="grgjj" label="个人缴纳公积金" width="100" />
          <el-table-column prop="gsgjj" label="公司缴纳公积金" width="100" />
        </el-table-column>
        <el-table-column prop="yfSalart" label="应发工资" width="100" fixed="right"/>
        <el-table-column prop="sfSalart" label="实发工资" width="100" fixed="right"/>
      </el-table>
    </div>

    <!-- 分页插件 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="pageInfo.currentPage"
          :page-sizes="[3, 5, 10, 50]"
          v-model:page-size="pageInfo.pagesize"
          :default-page-size="pageInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          :pager-count="5"
          background
          @size-change="selectUsers"
          @current-change="selectUsers"
      >
      </el-pagination>
    </div>



  </div>
<!--  </div>-->
</template>


<script  lang="ts">
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          deptname:'研发部',
          zhiwei:'经理',
          gzSalary:123123,
          xxSalary:1233,
          jjSalary:8833,
          hjSalary:90455,
          chidao:3123,
          zt:5468,
          wqt:345,
          wqd:12355,
          kg:3123,
          sj:12879,
          bj:12356,
          grsb:1567,
          gssb:6875,
          grgjj:6456,
          gsgjj:123,
          yfSalart:534545,
          sfSalart:785678,
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          deptname:'研发部',
          zhiwei:'经理',
          gzSalary:123123,
          xxSalary:1233,
          jjSalary:8833,
          hjSalary:90455,
          chidao:312,
          zt:546,
          wqt:312354,
          wqd:12355,
          kg:12335,
          sj:879,
          bj:356,
          grsb:15887,
          gssb:678,
          grgjj:6456,
          gsgjj:6456,
          yfSalart:534545,
          sfSalart:785678,
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          deptname:'研发部',
          zhiwei:'经理',
          gzSalary:123123,
          xxSalary:1233,
          jjSalary:8833,
          hjSalary:90455,
          chidao:4123,
          zt:54,
          wqt:34534,
          wqd:1255,
          kg:1233,
          sj:1289,
          bj:12356,
          grsb:56567,
          gssb:675,
          grgjj:64565,
          gsgjj:654756,
          yfSalart:54534545,
          sfSalart:734585678,
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          deptname:'研发部',
          zhiwei:'经理',
          gzSalary:123123,
          xxSalary:1233,
          jjSalary:8833,
          hjSalary:90455,
          chidao:3423,
          zt:568,
          wqt:3467,
          wqd:1355,
          kg:2335,
          sj:12549,
          bj:56,
          grsb:89967,
          gssb:8875,
          grgjj:64588,
          gsgjj:64676,
          yfSalart:34545,
          sfSalart:85678,
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          deptname:'研发部',
          zhiwei:'经理',
          gzSalary:123123,
          xxSalary:1233,
          jjSalary:8833,
          hjSalary:90455,
          chidao:3183,
          zt:548,
          wqt:34123545,
          wqd:1255,
          kg:1335,
          sj:1879,
          bj:24356,
          grsb:989786,
          gssb:8875,
          grgjj:64446,
          gsgjj:6656456,
          yfSalart:34545,
          sfSalart:75678,
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          deptname:'研发部',
          zhiwei:'经理',
          gzSalary:123123,
          xxSalary:1233,
          jjSalary:8833,
          hjSalary:90455,
          chidao:3163,
          zt:468,
          wqt:46565,
          wqd:12355,
          kg:335,
          sj:79,
          bj:5356,
          grsb:18907,
          gssb:9875,
          grgjj:645556,
          gsgjj:1456,
          yfSalart:8734545,
          sfSalart:9985678,
        },

      ],
      seek:"",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 3, // 页大小
        total: 0, // 总页数
      },

    }
  },
}
</script>
<style scoped>
/deep/.el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}


/deep/.icon-p p{
  text-align: center;
}

/* 分页的样式 */
/deep/.demo-pagination-block {
  float: right;
  margin: 20px;
}

</style>
