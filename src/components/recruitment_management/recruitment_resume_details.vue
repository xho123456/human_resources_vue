<!-- 简历详情页面 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <span></span>
        <div style="padding: 16px">
          <!-- 返回列表按钮 -->
          <div class="ant-row-flex ant-row-flex-space-between" style="margin-bottom: 16px;">
            <div class="ant-col">
              <el-button plain size="mini" @click="goback()">+ 返回列表</el-button>
            </div>
          </div>
          <!-- 个人消息列 -->
          <div class="ant-row-flex ant-row-flex-space-between" style="margin-bottom: -16px;">
            <div class="ant-col">
              <span style="font-size: 18px; font-weight: bold;">{{ tableData.resumeName }}</span>
              &nbsp;&nbsp;
              <span>ID:000{{ tableData.resumeId }} </span>
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <span>
                <span v-if="tableData.resumeZt==0">新简历</span>
                <span v-if="tableData.resumeZt==1">候选人</span>
                <span v-if="tableData.resumeZt==2">已邀约</span>
                <span v-if="tableData.resumeZt==3">已淘汰</span>
                <span v-if="tableData.resumeZt==4">面试中</span>
                <span v-if="tableData.resumeZt==5">面试通过</span>
                <span v-if="tableData.resumeZt==6">复试中</span>
                <span v-if="tableData.resumeZt==7">待接受</span>
                <span v-if="tableData.resumeZt==8">已接受</span>
                <span v-if="tableData.resumeZt==9">已入职</span>
                <span v-if="tableData.resumeZt==10">已拒绝</span>
                <span v-if="tableData.resumeZt==11">放弃入职</span>
                <span v-if="tableData.resumeZt==12">已离职</span>
                  |&nbsp;
                  <span class="ant-tag"><a href="">{{ this.$route.query.posta }}</a></span>
              </span>
            </div>
            <div class="ant-col">
              <el-button plain size="small">推进下一阶段 ^</el-button>
            </div>
          </div>

        </div>


        <div class="myResumeDetail">
          <div class="ant-tabs ant-tabs-top ant-tabs-line">

            <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 10px;">

              <el-tab-pane name="one">
                <template #label>
                  <div style="width: 120px;text-align: center">简历信息</div>
                </template>

                <div> <!---->
                  <div style="margin-left: 0%;" class="ant-tabs-content">
                    <div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active">
                      <div>
                        <span></span>
                        <div style="margin-left: 40px;margin-right: 40px;">
                          <br/>
                          <!--
                          个人信息
                          -->
                          <div style="display: block;margin-top: 15px;" class="mt-15">
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 个人消息标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;"
                                       class="ant-col ant-col-12 gutter-example">
                                    <span>个人信息</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" @click="personalxx()" size="mini">+
                                      编辑
                                    </el-button>
                                  </div>
                                </div>
                                <!-- 个人消息内容 -->
                                <div class="gutter-example mycard">
                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <!-- 身高 -->
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>身高</span>：
                                        {{ tableData.resumeShengg }}
                                      </div>
                                    </div>
                                    <!-- 性别 -->
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>性别</span>：
                                        {{ tableData.resumeSex }}
                                      </div>
                                    </div>
                                  </div>
                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <!-- 邮箱 -->
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>邮箱</span>：
                                        {{ tableData.resumeMailbox }}
                                      </div>
                                    </div>
                                    <!-- 政治面貌 -->
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>政治面貌</span>：{{ tableData.resumePoliticalOutlook }}
                                      </div>
                                    </div>
                                  </div>
                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <!-- 婚姻状况 -->
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>婚姻状况</span>：{{ tableData.resumeHy }}
                                      </div>
                                    </div>
                                  </div>


                                </div>
                              </div>
                            </div>
                          </div>
                          <el-dialog
                              v-model="personal_details"
                              title="个人信息"
                              width="53%"
                          >
                            <el-form :inline="true" :model="affiche" status-icon :rules="Fromgrxx" ref="grxxfrom"
                                     label-width="130px">

                              <el-row :gutter="10">
                                <el-col :span="10">
                                  <el-form-item label="身高：" prop="rusemheight">
                                    <el-input v-model="affiche.rusemheight" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>


                                <el-col :span="10">
                                  <el-form-item label="性别：" prop="sexs">
                                    <el-radio-group v-model="affiche.sexs">
                                      <el-radio label="男"></el-radio>
                                      <el-radio label="女"></el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="邮箱：" prop="emali">
                                    <el-input v-model="affiche.emali" size="small" style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="政治面貌：" prop="outlook">
                                    <el-input v-model="affiche.outlook" size="small" style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>


                                <el-col :span="10">
                                  <el-form-item label="婚姻状况：" prop="marriage">
                                    <el-radio-group v-model="affiche.marriage">
                                      <el-radio label="已婚"></el-radio>
                                      <el-radio label="未婚"></el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                </el-col>
                              </el-row>

                            </el-form>

                            <template #footer>
                                <span class="dialog-footer">
                                  <el-button type="primary" @click="submitForm_a1('grxxfrom')">确定</el-button>
                                  <el-button @click="resetForm_a1('grxxfrom')">取消</el-button>
                                </span>
                            </template>
                          </el-dialog>


                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;"
                               role="separator"></div>
                          <!--
                          求职意向信息
                           -->
                          <div style="display: block;margin-top: 15px;" class="mt-15">
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 求职意向标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;"
                                       class="ant-col ant-col-12 gutter-example">
                                    <span>求职意向</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini" @click="intentionqz()">+ 编辑
                                    </el-button>
                                  </div>
                                </div>
                                <!--求职意向内容 -->
                                <div class="gutter-example mycard">

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>期望薪资</span>：{{ tableData.resumeQxingz }}
                                        元
                                      </div>
                                    </div>

                                  </div>

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>期望职位</span>：{{ tableData.resumeQzhiw }}
                                      </div>
                                    </div>

                                  </div>

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;"
                                         class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>自我评价</span>：{{ tableData.resumeIntroduce }}
                                      </div>
                                    </div>

                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          <el-dialog
                              v-model="job_intention"
                              title="求职意向"
                              width="45%"
                          >
                            <el-form :inline="true" :model="affiches" :rules="Fromgrqzyx" ref="qzyxfrom"
                                     label-width="115px">

                              <el-row :gutter="15">
                                <el-col :span="11">
                                  <el-form-item label="期望薪资：" prop="pay">
                                    <el-input v-model="affiches.pay" size="small" style="width: 180px;"></el-input>
                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="期望职位：" prop="payzplan">
                                    <el-input v-model="affiches.payzplan" size="small" style="width: 180px;"></el-input>
                                  </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                  <el-form-item label="自我评价：" prop="content">
                                    <el-input
                                        v-model="affiches.content"
                                        :rows="3"
                                        type="textarea"
                                        style="width: 485px;"
                                    />
                                  </el-form-item>
                                </el-col>

                              </el-row>
                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                  <el-button type="primary" @click="submitForm_a2('qzyxfrom')">确定</el-button>
                                  <el-button @click="resetForm_a2('qzyxfrom')">取消</el-button>
                                </span>
                            </template>
                          </el-dialog>


                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;"
                               role="separator"></div>

                          <!--
                           最近工作、最高学历
                            -->
                          <div class="ant-card">
                            <div class="ant-card-body" style="padding: 15px 0px 0px;">
                              <!--  最近工作、最高学历标题 -->
                              <div class="ant-row">
                                <!-- 标题 -->
                                <div style="font-size: 18px; font-weight: bold;"
                                     class="ant-col ant-col-12 gutter-example">
                                  <span>最高学历</span>
                                </div>
                                <div style="font-size: 18px; font-weight: bold; width: 30%;"
                                     class="ant-col ant-col-12 gutter-example">
                                  <span>最近工作</span>
                                </div>
                                <!-- 编辑按钮 -->
                                <div style="text-align: right">
                                  <el-button plain style="width: 70px" size="mini" @click="zhomeworkqz()">+
                                    编辑
                                  </el-button>
                                </div>
                              </div>

                              <div class="gutter-example mycard">
                                <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">

                                  <div style="padding-left: 8px; padding-right: 8px;"
                                       class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>专业</span>：{{ tableData.resxuel }}
                                    </div>
                                  </div>

                                  <div style="padding-left: 8px; padding-right: 8px;"
                                       class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>职位</span>：{{ tableData.resumeZjzw }}
                                    </div>
                                  </div>

                                </div>

                                <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">


                                  <div style="padding-left: 8px; padding-right: 8px;"
                                       class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>学校</span>：{{ tableData.resumeScoller }}
                                    </div>
                                  </div>

                                  <div style="padding-left: 8px; padding-right: 8px;"
                                       class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>公司</span>：{{ tableData.zjgs }}
                                    </div>
                                  </div>

                                </div>

                                <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                  <div style="padding-left: 8px; padding-right: 8px;"
                                       class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>学历</span>：{{ tableData.resumeEducation }}
                                    </div>
                                  </div>

                                </div>

                              </div>
                            </div>
                          </div>
                          <el-dialog
                              v-model="job_qualifications"
                              title="最近工作"
                              width="53%"
                          >
                            <el-form :inline="true" :model="qualifications" status-icon :rules="Fromzjgz" ref="homefrom"
                                     label-width="130px">

                              <el-row :gutter="10">
                                <el-col :span="10">
                                  <el-form-item label="职位：" prop="position">
                                    <el-input v-model="qualifications.position" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>


                                <el-col :span="10">
                                  <el-form-item label="公司：" prop="company">
                                    <el-input v-model="qualifications.company" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="学历：" prop="education_background">
                                    <el-select v-model="qualifications.education_background" placeholder="学历"
                                               size="small" style="width: 210px;">
                                      <el-option label="初中" value="初中"></el-option>
                                      <el-option label="高中" value="高中"></el-option>
                                      <el-option label="大专" value="大专"></el-option>
                                      <el-option label="本科" value="本科"></el-option>
                                      <el-option label="硕士" value="硕士"></el-option>
                                      <el-option label="博士" value="博士"></el-option>
                                      <el-option label="其他" value="其他"></el-option>
                                    </el-select>

                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="专业：" prop="specialty">
                                    <el-input v-model="qualifications.specialty" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>


                                <el-col :span="10">
                                  <el-form-item label="学校：" prop="school">
                                    <el-input v-model="qualifications.school" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>
                              </el-row>

                            </el-form>

                            <template #footer>
                                <span class="dialog-footer">
                                  <el-button type="primary" @click="submitForm_a3('homefrom')">确定</el-button>
                                  <el-button @click="resetForm_a3('homefrom')">取消</el-button>
                                </span>
                            </template>
                          </el-dialog>

                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;"
                               role="separator"></div>
                          <!--
                            工作经历
                          -->
                          <div style="display: block;margin-top: 15px;" class="mt-15">
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 工作经历标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;"
                                       class="ant-col ant-col-12 gutter-example">
                                    <span>工作经历</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini" @click="work_experience=true">+
                                      新增
                                    </el-button>
                                  </div>
                                </div>
                                <!--工作经历内容  循环 -->
                                <div class="mycard" v-for="work in workxp">
                                  <!-- 图标： 删除按钮 -->
                                  <div class="close" @click="deletehomes(work.workExperiencessId)">
                                    <i class="iconfont">&#xe603;</i>
                                  </div>
                                  <div class="title">
                                    <span>时间：{{ work.workStareTime }} - {{ work.workEndTime }}</span>
                                  </div>
                                  <div class="title">
                                    <span>任职公司：{{ work.companyName }}</span>
                                    <span>所属行业：{{ work.positionIndustry }}</span>
                                  </div>
                                  <div class="title">
                                    <span style="">职位：{{ work.positionName }}</span>
                                    <span>税前工资：{{ work.positionSqmonthly }}  元/月</span>
                                  </div>
                                  <div class="desc">
                                    <div class="title">工作描述:</div>
                                    <div class="desc-pre">{{ work.positionDescribe }}</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <el-dialog
                              v-model="work_experience"
                              title="新增工作经历"
                              destroy-on-close
                              width="50%">
                            <el-form :inline="true" :model="experience" status-icon :rules="Fromhomel" ref="fromhonel"
                                     label-width="110px">
                              <el-row :gutter="10">
                                <el-col :span="12">
                                  <el-form-item label="开始时间：" prop="starttime">
                                    <el-date-picker
                                        v-model="experience.starttime"
                                        type="date"
                                        placeholder="请选择"
                                        size="small" style="width: 210px;"
                                    ></el-date-picker>
                                  </el-form-item>

                                </el-col>
                                <el-col :span="10">
                                  <el-form-item label="结束时间：" prop="endtime">
                                    <el-date-picker
                                        v-model="experience.endtime"
                                        type="date"
                                        placeholder="请选择"
                                        size="small" style="width: 210px;"
                                    ></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="任职公司：" prop="firm">
                                    <el-input v-model="experience.firm" size="small" style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                  <el-form-item label="所属行业：" prop="industry">
                                    <el-input v-model="experience.industry" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="职位：" prop="positions">
                                    <el-input v-model="experience.positions" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="税前月薪：" prop="salary">
                                    <el-input-number
                                        v-model="experience.salary"
                                        class="mx-4"
                                        controls-position="right"
                                        size="small" style="width: 210px;"
                                    />
                                  </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item label="描述：" prop="describe">
                                    <el-input
                                        v-model="experience.describe"
                                        :rows="2"
                                        type="textarea"
                                        style="width: 577px;"
                                    />
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>

                            <template #footer>
                                <span class="dialog-footer">
                                  <el-button type="primary" @click="submitForm_a4('fromhonel')">确定</el-button>
                                  <el-button @click="resetForm_a4('fromhonel')">取消</el-button>
                                </span>
                            </template>
                          </el-dialog>


                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;"
                               role="separator"></div>

                          <!--
                            教育经历
                             -->
                          <div style="display: block;margin-top: 15px;" class="mt-15">
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 工作经历标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;"
                                       class="ant-col ant-col-12 gutter-example">
                                    <span>教育经历</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini" @click="education_experience=true">
                                      + 新增
                                    </el-button>
                                  </div>
                                </div>
                                <!--工作经历内容  循环 -->
                                <div class="mycard" v-for="ressed in edexp">
                                  <!-- 图标： 删除按钮 -->
                                  <div class="close" @click="deleteschools(ressed.educationssId)">
                                    <i class="iconfont">&#xe603;</i>
                                  </div>
                                  <div class="title">
                                    <span>时间：{{ ressed.educationStartTime }} - {{ ressed.educationEndTime }}</span>


                                  </div>
                                  <div class="title">
                                    <span style="padding-right: 30px">学校名称：{{ ressed.educationStudentname }}</span>
                                    <span>所属专业：{{ ressed.educationMajor }}</span>
                                  </div>
                                  <div class="desc">
                                    <span v-if="ressed.educationFullTime==0">是否全日制：是</span>
                                    <span v-if="ressed.educationFullTime==1">是否全日制：否</span>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <el-dialog
                              v-model="education_experience"
                              title="新增教育经历"
                              destroy-on-close
                              width="50%">
                            <el-form :inline="true" :model="education" status-icon :rules="Fromschools"
                                     ref="fromschools"
                                     label-width="120px">
                              <el-row :gutter="10">
                                <el-col :span="12">
                                  <el-form-item label="开始时间：" prop="jstatetime">
                                    <el-date-picker
                                        v-model="education.jstatetime"
                                        type="date"
                                        placeholder="请选择"
                                        size="small" style="width: 210px;"
                                    ></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                  <el-form-item label="结束时间：" prop="jendtime">
                                    <el-date-picker
                                        v-model="education.jendtime"
                                        type="date"
                                        placeholder="请选择"
                                        size="small" style="width: 210px;"
                                    ></el-date-picker>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="学校名称：" prop="schoolname">
                                    <el-input v-model="education.schoolname" size="small"
                                              style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                  <el-form-item label="所属专业：" prop="major">
                                    <el-input v-model="education.major" size="small" style="width: 210px;"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="是否全日制：" prop="fulltime">
                                    <el-radio-group v-model="education.fulltime">
                                      <el-radio label="0">是</el-radio>
                                      <el-radio label="1">否</el-radio>
                                    </el-radio-group>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>

                            <template #footer>
                                <span class="dialog-footer">
                                  <el-button type="primary" @click="submitForm_a5('fromschools')">确定</el-button>
                                  <el-button @click="resetForm_a5('fromschools')">取消</el-button>
                                </span>
                            </template>
                          </el-dialog>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </el-tab-pane>

              <el-tab-pane name="two">
                <template #label>
                  <div style="width: 120px;text-align: center">面试评价</div>
                </template>

                <div class="sub-Content__primary edit__forms">
                  <div class="ant-card">
                    <div class="ant-card-body" style="padding: 0px; margin-bottom: 1em;">
                      <div>
                        <br>
                        <el-button size="small" type="warning" plain @click="addpldog()">填写评价</el-button>
                        <div v-for="mspl in insidepl">
                          <div>
                            {{mspl.evaluateTime}} &nbsp; &nbsp; &nbsp; &nbsp;
                            <span>评价人</span>：{{mspl.staffName}} &nbsp; &nbsp; &nbsp;
                            <el-button size="mini" type="warning" @click="upmspl(mspl)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="open(mspl)">删除</el-button>
                          </div>
                          <div style="margin-bottom: 1em;">
                            <span>面试评价</span>：
                            {{mspl.interviewEvaluate}}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </el-tab-pane>

<!--              <el-tab-pane name="three">-->
<!--                <template #label>-->
<!--                  <div style="width: 120px;text-align: center">面试记录</div>-->
<!--                </template>-->

<!--              </el-tab-pane>-->
            </el-tabs>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- add面试评论 -->
  <el-dialog
      v-model="msplDog"
      title="填写评价"
      width="30%">
    <el-input
        v-model="mianspl"
        :rows="6"
        type="textarea"
        placeholder="请填写面试评价"
    />
    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="addmianspl_1()">确定</el-button>
                    <el-button type="primary" @click="msplDog = false,mianspl=''">取消</el-button>
                  </span>
    </template>
  </el-dialog>
  <!-- update面试评论 -->
  <el-dialog
      v-model="upmsplDog"
      title="编辑评价"
      width="30%">
    <el-input
        v-model="mianspl"
        :rows="6"
        type="textarea"
        placeholder="请填写面试评价"
    />
    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="upmianspl_2()">确定</el-button>
                    <el-button type="primary" @click="upmsplDog = false,mianspl=''">取消</el-button>
                  </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, toRefs, ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    //验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    }
    const time = ref('')
    const duration = ref('')
    const state = reactive({
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
      value1: '',
    })

    return {
      //默认激活第一个导航
      activeName: 'one',
      //简历id：路由传入
      resumid: this.$route.query.name,
      //存放简历基本信息
      tableData: '',
      //存放教育经历信息
      edexp: '',
      //存放工作经历信息
      workxp: '',


      //到岗时间
      ...toRefs(state),

      //个人信息弹出框
      personal_details: false,
      affiche: {
        //身高
        rusemheight: '',
        //邮箱
        emali: '',
        //性别
        sexs: '',
        //是否已婚：
        marriage: '',
        //政治面貌
        outlook: ''
      },
      Fromgrxx: {//个人信息表单验证
        rusemheight: [//身高
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        emali: [//邮箱
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        sexs: [//性别
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        marriage: [//是否已婚：
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        outlook: [//政治面貌
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ]

      },

      //求职意向对话框
      job_intention: false,
      affiches: {
        //自我评价
        content: '',
        //期望薪资
        pay: '',
        //期望职位
        payzplan: '',
      },
      Fromgrqzyx: {
        content: [//自我评价
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        pay: [//期望薪资
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        payzplan: [ //期望职位
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
      },


      //最高学历最近工作
      job_qualifications: false,
      qualifications: {
        //专业
        specialty: '',
        //职位
        position: '',
        //学校
        school: '',
        //公司
        company: '',
        //学历
        education_background: '',
      },
      Fromzjgz: {//最高学历最近工作
        specialty: [//专业
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        position: [//职位
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        school: [//学校
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        company: [//公司：
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        education_background: [//学历
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ]

      },


      //工作经历
      work_experience: false,
      experience: {
        //任职公司
        firm: '',
        //职位
        positions: '',
        //行业
        industry: '',
        //薪资
        salary: '',
        //开始时间
        starttime: '',
        //结束时间
        endtime: '',
        //描述
        describe: '',
      },
      Fromhomel: {//最高学历最近工作
        firm: [//任职公司
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        positions: [//职位
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        industry: [//行业
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        salary: [//薪资：
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        starttime: [//开始时间
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        endtime: [//结束时间
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        describe: [//描述
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ]

      },

      //教育经历
      education_experience: false,
      education: {
        //学校名字
        schoolname: '',
        //所学专业
        major: '',
        //开始时间
        jstatetime: '',
        //结束时间
        jendtime: '',
        //是否全日制
        fulltime: ''
      },
      Fromschools: {//最高学历最近工作
        schoolname: [//学校名字
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        major: [//所学专业
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        jstatetime: [//开始时间
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        jendtime: [//结束时间：
          {
            required: true,
            message: '输入信息不能为空',
            trigger: 'change',
          },
        ],
        fulltime: [//是否全日制
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ]
      },

      //存储所有面试评论
      insidepl:'',
      //添加评论对话框
      msplDog:false,
      mianspl:'',
      gettime:'',

      //编辑面试评论信息
      upmsplDog:false,
      //存放面试评论的id
      msplId:'',

    }

  },
  created() {
    this.selectAllsume(); //个人简历基本信息
    this.selectAllzy();   //教育经历基本信息
    this.selectAllwork(); //工作经历基本信息
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    /**
     * 回退上一级
     */
    goback() {
      this.$router.go('-1');
    },
    /**
     * 简历基本信息查询
     */
    selectAllsume() {
      this.axios({
        url: "http://localhost:8007/provider/resume/findByidAll",
        method: "post",
        data: {
          resumeId: this.resumid
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.tableData = response.data.data
        this.selectAllmspl(); //面试基本信息
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    /**
     *  简历基本信息查询:教育经历
     */
    selectAllzy() {
      this.axios({
        url: "http://localhost:8007/provider/resume/findByidEd",
        method: "post",
        data: {
          resumeId: this.resumid
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.edexp = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    /**
     * 简历基本信息查询:工作经历
     */
    selectAllwork() {
      this.axios({
        url: "http://localhost:8007/provider/resume/findByidWork",
        method: "post",
        data: {
          resumeId: this.resumid
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response);
        this.workxp = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    /**
     * 个人信息表单验证
     */
    personalxx() {//编辑按钮:取值给文本框
      this.affiche.rusemheight = this.tableData.resumeShengg
      this.affiche.emali = this.tableData.resumeMailbox
      this.affiche.sexs = this.tableData.resumeSex
      this.affiche.marriage = this.tableData.resumeHy
      this.affiche.outlook = this.tableData.resumePoliticalOutlook
      this.personal_details = true; //关闭对话框
    },
    submitForm_a1(formName) { //提交按钮
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(
              "http://localhost:8007/provider/resume/updatehz", {
                resumeId: this.resumid,
                resumeShengg: this.affiche.rusemheight,
                resumeSex: this.affiche.sexs,
                resumeMailbox: this.affiche.emali,
                resumePoliticalOutlook: this.affiche.outlook,
                resumeHy: this.affiche.marriage
              }).then((response) => {
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功",
                type: "success",
              });
              this.selectAllsume(); //调用查询方法
              this.personal_details = false; //关闭对话框
            } else {
              ElMessage.error("操作失败");
            }
            this.remarks = false;
            this.elremarks = ''
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm_a1(formName) {//取消按钮
      this.personal_details = false;
      this.$refs[formName].resetFields();
    },

    /**
     * 求职意向
     */
    intentionqz() {//编辑按钮:取值给文本框
      this.affiches.content = this.tableData.resumeIntroduce;
      this.affiches.pay = this.tableData.resumeQxingz;
      this.affiches.payzplan = this.tableData.resumeQzhiw;
      this.job_intention = true;
    },
    submitForm_a2(fromplan) { //提交按钮
      this.$refs[fromplan].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8007/provider/resume/updatehz", {
            resumeId: this.resumid,
            resumeIntroduce: this.affiches.content,
            resumeQxingz: this.affiches.pay,
            resumeQzhiw: this.affiches.payzplan
          }).then((response) => {
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功",
                type: "success",
              });
              this.selectAllsume(); //调用查询方法
              this.job_intention = false; //关闭对话框
            } else {
              ElMessage.error("操作失败");
            }
            this.remarks = false;
            this.elremarks = ''
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm_a2(fromplan) {//取消按钮
      this.job_intention = false;
      this.$refs[fromplan].resetFields();
    },

    /**
     * 最近工作
     */
    zhomeworkqz() {//编辑按钮:取值给文本框
      this.qualifications.specialty = this.tableData.resxuel;
      this.qualifications.position = this.tableData.resumeZjzw;
      this.qualifications.school = this.tableData.resumeScoller;
      this.qualifications.company = this.tableData.zjgs;
      this.qualifications.education_background = this.tableData.resumeEducation;
      this.job_qualifications = true;
    },
    submitForm_a3(fromwork) { //提交按钮
      this.$refs[fromwork].validate((valid) => {
        if (valid) {
          this.axios.post("http://localhost:8007/provider/resume/updatehz", {
            resumeId: this.resumid,
            resxuel: this.qualifications.specialty,
            resumeZjzw: this.qualifications.position,
            resumeScoller: this.qualifications.school,
            zjgs: this.qualifications.company,
            resumeEducation: this.qualifications.education_background
          }).then((response) => {
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功",
                type: "success",
              });
            }
            this.selectAllsume(); //调用查询方法
            this.job_qualifications = false; //关闭对话框
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm_a3(fromwork) {//取消按钮
      this.job_qualifications = false;
      this.$refs[fromwork].resetFields();
    },

    /**
     * 工作经历
     */
    submitForm_a4(works) {
      this.$refs[works].validate((valid) => {
        if (valid) {
          this.axios({
            url: "http://localhost:8007/provider/resume/addworks",
            method: "post",
            data: {
              workStareTime: this.experience.starttime,
              workEndTime: this.experience.endtime,
              resumeId: this.resumid,
              companyName: this.experience.firm,
              positionName: this.experience.positions,
              positionIndustry: this.experience.industry,
              positionDescribe: this.experience.describe,
              positionSqmonthly: this.experience.salary
            },
            responseType: 'json',
            responseEncoding: 'utf-8',
          }).then((response) => {
            console.log(response)
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功！！！",
                type: "success",
              });
            }
            this.selectAllwork(); //调用查询方法
            this.work_experience = false; //关闭对话框
            this.$refs[works].resetFields();
          }).catch(function (error) {
            console.log('获取列表失败')
            console.log(error);
          })
        } else {
          return false
        }
      })
    },
    resetForm_a4(works) {//取消按钮
      this.work_experience = false;
      this.$refs[works].resetFields();
    },
    //简历详情：个人工作经历删除
    deletehomes(homeid) {
      ElMessageBox.confirm(
          '是否删除该数据?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            //删除事件
            this.axios.get("http://localhost:8007/provider/resume/deleteByidhomes?id=" + homeid, {}).then((response) => {
              if (response.data.data === "成功") {
                ElMessage({
                  message: "删除成功",
                  type: "success",
                });
              }
              this.selectAllwork();
            }).catch(function (error) {
              console.log(error);
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消操作',
            })
          })
    },

    /**
     * 教育经历
     */
    submitForm_a5(schools) {
      this.$refs[schools].validate((valid) => {
        if (valid) {
          this.axios({
            url: "http://localhost:8007/provider/resume/addEduation",
            method: "post",
            data: {
              educationStartTime: this.education.jstatetime,
              educationEndTime: this.education.jendtime,
              resumeId: this.resumid,
              educationStudentname: this.education.schoolname,
              educationMajor: this.education.major,
              educationFullTime: this.education.fulltime
            },
            responseType: 'json',
            responseEncoding: 'utf-8',
          }).then((response) => {
            console.log(response)
            if (response.data.data === "成功") {
              ElMessage({
                message: "操作成功！！！",
                type: "success",
              });
            }
            this.selectAllzy(); //调用查询方法
            this.education_experience = false; //关闭对话框
            this.$refs[schools].resetFields();
          }).catch(function (error) {
            console.log('获取列表失败')
            console.log(error);
          })
        } else {
          return false
        }
      })
    },
    resetForm_a5(schools) {//取消按钮
      this.education_experience = false;
      this.$refs[schools].resetFields();
    },
    //简历详情：个人教育经历删除
    deleteschools(id) {
      ElMessageBox.confirm(
          '是否删除该数据?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => {
            //删除事件
            this.axios.get("http://localhost:8007/provider/resume/deleteByEduationid?id=" + id, {}).then((response) => {
              if (response.data.data === "成功") {
                ElMessage({
                  message: "删除成功",
                  type: "success",
                });
              }
              this.selectAllzy();
            }).catch(function (error) {
              console.log(error);
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消操作',
            })
          })
    },

    /**
     *  面试评论功能
     */
    selectAllmspl() { //查询面试评论
      this.axios({
        url: "http://localhost:8007/provider/resumes/findbymspl",
        method: "post",
        data: {
          interviewId: this.tableData.interviewId
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        this.insidepl = response.data.data
      }).catch(function (error) {
        console.log('获取列表失败')
        console.log(error);
      })
    },
    //添加面试评论信息
    addpldog(){
      this.msplDog = true;//打开对话框
      this.mianspl='';
    },
    addmianspl_1(){//填写面试评价
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;

      if (this.mianspl==''){
        ElMessage({
          message: '请填写面试评价',
          type: 'warning',
        })
      }else{
        this.axios({
          url: "http://localhost:8007/provider/Interview/addmianspl",
          method: "post",
          data: {
            interviewId: this.resumid, //简历id
            evaluateTime:this.gettime, //评论时间
            staffName: "周娘们",  //目前为默认，修改为当前登录用户
            interviewEvaluate: this.mianspl  //评论内容
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.data === "成功") {
            ElMessage({
              message: "操作成功！！！",
              type: "success",
            });
          }
          this.msplDog = false;//关闭对话框
          this.selectAllmspl(); //查询评论信息
        }).catch(function (error) {
          console.log('获取列表失败')
          console.log(error);
        })
      }
    },
    //修改面试评论信息
    upmspl(row){
      this.upmsplDog = true;
      this.mianspl = row.interviewEvaluate;
      this.msplId = row.evaluateId;
    },
    upmianspl_2(){
      this.axios.post(
          " http://localhost:8007/provider/resume/updatemspl", {
            evaluateId: this.msplId, //id
            evaluateTime:this.gettime, //评论时间
            interviewEvaluate: this.mianspl  //评论内容
          }).then((response) => {
        if (response.data.data === "成功") {
          ElMessage({
            message: "操作成功",
            type: "success",
          });
        }
        this.upmsplDog = false;//关闭对话框
        this.selectAllmspl(); //查询评论信息
      }).catch(function (error) {
        console.log(error);
      });
    },
    open(row) {
      ElMessageBox.confirm(
          '是否删除该数据?',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            //删除事件
            this.axios.get(
                " http://localhost:8007/provider/resume/deletedmspl?id="+row.evaluateId, {
                }).then((response) => {
              if (response.data.data === "成功") {
                ElMessage({
                  message: "操作成功",
                  type: "success",
                });
              }
              this.selectAllmspl(); //查询评论信息
            }).catch(function (error) {
              console.log(error);
            })
          }).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消操作',
            })
          })
      },
  }
}


</script>


<style type="text/css" scoped>
@import url('../../css/navigation.css');

@font-face {
  font-family: 'iconfont';  /* Project id 2985811 */
  src: url('//at.alicdn.com/t/font_2985811_0z1f95yydth.woff2?t=1639493721834') format('woff2'),
  url('//at.alicdn.com/t/font_2985811_0z1f95yydth.woff?t=1639493721834') format('woff'),
  url('//at.alicdn.com/t/font_2985811_0z1f95yydth.ttf?t=1639493721834') format('truetype');
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}


.announcement-czs {
  margin-top: 15px;
  margin-left: 345px;
}

.announcement-cz {
  margin-top: 35px;
  margin-left: 345px;
}

.normal {
  margin-top: 1px;
}

.shut {
  margin-top: -40px;
  margin-left: 73px;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}

.mycard i:hover {
  cursor: pointer;
}

.mycard .title {
  font-size: 14px;
  line-height: 1.75;
}

.title span {
  padding-right: 80px;
}

.mycard .desc {
  width: 1000px;
}

.mycard .desc-pre {
  line-height: 1.75;
  font-family: inherit;
  margin-left: 1em;
  white-space: pre-wrap;
}


.mycard .close {
  position: absolute;
  right: 8px;
  top: 8px;
}

.ant-divider {
  color: rgba(0, 0, 0, 0.65);
  background: #e8e8e8;
}

.ant-divider {
  margin: 0 2px;
  margin-top: 0px;
}

.ant-divider-horizontal {
  display: block;
  clear: both;
  width: 100%;
  min-width: 100%;
  height: 1px;
}

.ant-divider {
  position: relative;
  top: -0.06em;
}

.ant-divider {
  box-sizing: border-box;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
}


.mycard:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  border-color: transparent;
}

.ant-tabs-content::before {
  display: block;
  overflow: hidden;
  content: '';
}

.ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane, .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
  flex-shrink: 0;
  width: 100%;
  -webkit-backface-visibility: hidden;
  opacity: 1;
  transition: opacity 0.45s;
}

.myResumeDetail .ant-tabs-tabpane {
  max-height: 800px;
  overflow: auto;
  padding-bottom: 150px;
}

.mainContent .ant-card, .edit__forms .ant-card {
  width: 100%;
}

.ant-card {
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-radius: 2px;
}

.ant-card {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}

.ant-row {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  display: block;
  box-sizing: border-box;
}

.ant-col-12 {
  display: block;
  box-sizing: border-box;
  width: 30%;
}

.ant-col-12, ant-col-7 {
  flex: 0 0 auto;
  position: relative;
  padding-right: 0;
  padding-left: 0;
}

.ant-col {
  min-height: 1px;
}

.ant-col-7, ant-col-12 {
  float: left;
}

/**
 消息内容面板样式
 */
.mycard {
  padding: 16px;
  margin-top: 16px;
  border: 1px solid #f0f3f6;
  position: relative;
  border-radius: 4px;
  background-color: rgba(33, 168, 223, 0.05);
  transition: all .3s;
}

.ant-col-7 {
  display: block;
  box-sizing: border-box;
  width: 29.16666667%;
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

.ant-tabs {
  color: rgba(0, 0, 0, 0.65);
}

.ant-tabs {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  overflow: hidden;
  zoom: 1;
}

.ant-tabs::before, .ant-tabs::after {
  display: table;
  content: '';
}

*, ::before, ::after {
  box-sizing: border-box;
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

