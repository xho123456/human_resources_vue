import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'
/**
 * 全局导航栏
 */
import workbench from "../components/navigation.vue"

const modules =
    import.meta.glob('../components/**/*.vue');

const routes = [{
    path: '/',
    redirect: '/beginIndex'
},
    { //登录
        path: '/beginIndex',
        component: modules[`${'../components/begin/index.vue'}`],
        redirect: '/beginIndex/Login',
        children: [{ //密码登录
            path: '/beginIndex/passLogin',
            component: modules[`${'../components/begin/rest/passlogin.vue'}`]
        },
            { //密码登录
                path: '/beginIndex/Login',
                component: modules[`${'../components/begin/rest/Login.vue'}`]
            }
        ]
    },
    { //首页
        path: "/home",
        component: modules[`${'../components/navigation.vue'}`],
        redirect: '/workbench',
        children: [
            {
                /* 工作台 */
                path: '/workbench',
                component: modules[`${'../components/workbench_management/workbench_main.vue'}`],
            },
            {//组织管理
                path: '/organization',
                component: modules[`${'../components/organization_management/organization_main.vue'}`],
                redirect: '/organization/message',
                children: [
                    {//组织情报
                        path: '/organization/message',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: '/organization/message/zz_evectino',
                        children: [
                            {//部门详情
                                path: '/organization/message/zz_evectino',
                                component: modules[`${'../components/organization_management/zz_evection1.vue'}`],
                            },
                            {//职位信息
                                path: '/organization/message/zz_post',
                                component: modules[`${'../components/organization_management/zz_post.vue'}`],
                            },

                        ]
                    }, {//组织情报
                        path: '/organization/message',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: '/organization/message/zz_evectino',
                        children: [
                            {//部门详情
                                path: '/organization/message/zz_evectino',
                                component: modules[`${'../components/organization_management/zz_evection1.vue'}`],
                            },
                            {//职位信息
                                path: '/organization/message/zz_post',
                                component: modules[`${'../components/organization_management/zz_post.vue'}`],
                            },

                        ]
                    }
                ]
            },
            {//员工管理
                path: '/employee',
                component: modules[`${'../components/employee_management/employee_main.vue'}`],
                redirect: "/employee/message",
                children: [
                    {//员工信息
                        path: '/employee/message',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/employee/message/employee_roster",
                        children: [
                            {//员工花名册
                                path: '/employee/message/employee_roster',
                                redirect: "/employee/message/employee_roster/book",
                                component: modules[`${'../components/employee_management/employee_staff_one.vue'}`],
                                children: [
                                    //花名册
                                    {
                                        path: '/employee/message/employee_roster/book',
                                        component: modules[`${'../components/employee_management/employee_staff.vue'}`],
                                    },
                                    //工作经历
                                    {
                                        path: '/employee/message/employee_roster/business',
                                        component: modules[`${'../components/employee_management/employee_work.vue'}`],
                                    },
                                ]
                            },
                            //办理离职
                            {
                                path: '/employee/message/employee_roster/leave',
                                component: modules[`${'../components/employee_management/employee_dimission.vue'}`],
                            },
                            //员工编辑
                            {
                                path: '/employee/message/employee_roster/staffedit',
                                component: modules[`${'../components/employee_management/employee_compile.vue'}`],
                                redirect: "/employee/message/employee_roster/basicfile",
                                children: [
                                    //基本档案
                                    {
                                        path: '/employee/message/employee_roster/basicfile',
                                        component: modules[`${'../components/employee_management/employee_basic.vue'}`],
                                    },
                                    //个人信息
                                    {
                                        path: '/employee/message/employee_roster/information',
                                        component: modules[`${'../components/employee_management/employee_personal.vue'}`],
                                    }
                                ]
                            }
                        ]
                    },
                    {//人事异动
                        path: '/employee/transaction',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//入职管理
                                path: '/employee/transaction/entry',
                                component: modules[`${'../components/employee_management/employee_entry.vue'}`],
                                redirect: "/employee/transaction/entry/tobehired",
                                children: [
                                    //待入职
                                    {
                                        path: '/employee/transaction/entry/tobehired',
                                        component: modules[`${'../components/employee_management/employee_stock.vue'}`],
                                    },
                                    //放弃入职
                                    {
                                        path: '/employee/transaction/entry/hashired',
                                        component: modules[`${'../components/employee_management/employee_abandon.vue'}`],
                                    },
                                ]
                            },
                            {//转正管理
                                path: '/employee/transaction/worker',
                                component: modules[`${'../components/employee_management/employee_conversion.vue'}`],
                            },
                            {//调动管理
                                path: '/employee/transaction/transfer',
                                component: modules[`${'../components/employee_management/employee_transfer.vue'}`],
                            }
                        ]
                    }

                ]
            },
            {//考勤管理
                path: '/time_modular',
                component: modules[`${'../components/time_modular/attendance_main.vue'}`],
                redirect: "/time_modular/check",
                children: [

                    {//基础设置
                        path: '/time_modular/check',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/time/yyx/shift",
                        children: [
                            {//班次管理
                                path: '/time/yyx/shift',
                                component: modules[`${'../components/time_modular/shift_yyx.vue'}`],
                            },
                            {//班次新增
                                path: '/yyx/dacard',
                                component: modules[`${'../components/time_modular/dacard_yyx.vue'}`],
                            },
                            {//班次编辑
                                path: '/yyx/repaircard',
                                component: modules[`${'../components/time_modular/repaircard_yyx.vue'}`],
                            },
                        ]
                    },
                    {//考勤记录
                        path: '/attendance/checking',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//我的考勤
                                path: '/my/attendance',
                                component: modules[`${'../components/time_modular/my_attendance.vue'}`],
                            },

                        ]
                    },
                    {//每日考勤统计
                        path: '/yyx/workovertime',
                        component: modules[`${'../components/time_modular/workovertime_yyx.vue'}`],
                    },
                    {//考勤月明细
                        path: '/yyx/leave',
                        component: modules[`${'../components/time_modular/leave_yyx.vue'}`],
                    },
                    {//月考勤统计
                        path: '/yyx/outdifference',
                        component: modules[`${'../components/time_modular/outdifference_yyx.vue'}`],
                    },
                    {// 考勤记录汇总
                        path: '/yyx/statistics/archive',
                        component: modules[`${'../components/time_modular/attendance_history.vue'}`],
                    },
                    {// 考勤记录汇总详情
                        path: '/yyx/statistics/report',
                        component: modules[`${'../components/time_modular/attendance_month.vue'}`],
                    },
                ]
            },
            {//招聘管理
                path: '/recruitment',
                component: modules[`${'../components/recruitment_management/recruitment_main.vue'}`],
                redirect: "/recruitment/plan",
                children: [
                    {//招聘计划
                        path: '/recruitment/plan',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/recruitment/plan/plan",
                        children: [
                            {//招聘计划
                                path: '/recruitment/plan/plan',
                                component: modules[`${'../components/recruitment_management/recruitment_zp_plan.vue'}`],
                            },
                            {//招聘计划详情页面
                                path: '/recruitment/plan/details',
                                component: modules[`${'../components/recruitment_management/recruitment_plan_details.vue'}`],
                            }
                        ]
                    },
                    {//简历管理
                        path: '/recruitment/zptresume',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//人才库
                                path: '/recruitment/zptresume/zptresume',
                                redirect: "/recruitment/recruit/fullresume",
                                component: modules[`${'../components/recruitment_management/recruitment_zp_resume.vue'}`],
                                children: [
                                    {//全部简历
                                        path: '/recruitment/recruit/fullresume',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_fullresume.vue'}`],
                                    },
                                    {//新简历
                                        path: '/recruitment/recruit/newresume',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_newresume.vue'}`],
                                    },
                                    {//候选人
                                        path: '/recruitment/recruit/candidate',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_candidate.vue'}`],
                                    },
                                    {//储备人才
                                        path: '/recruitment/recruit/eliminate',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_eliminate.vue'}`],
                                    },
                                ]
                            },
                            {//简历详情页面
                                path: '/recruitment/resume/details',
                                component: modules[`${'../components/recruitment_management/recruitment_resume_details.vue'}`],
                            },
                            {//新增简历
                                path: '/recruitment/recruit/addresume',
                                component: modules[`${'../components/recruitment_management/recruitment_addresume.vue'}`],
                            },
                        ]
                    },
                    {//招聘过程
                        path: '/recruitment/zpprocess',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//面试管理
                                path: '/recruitment/zpprocess/recruitment_zp_interview',
                                redirect: "/recruitment/daiInterview",
                                component: modules[`${'../components/recruitment_management/recruitment_zp_interview.vue'}`],
                                children: [
                                    {//待面试
                                        path: '/recruitment/daiInterview',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_daiInterview.vue'}`],
                                    },
                                    {//面试通过
                                        path: '/recruitment/interviewPass',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_interviewPass.vue'}`],
                                    },
                                    {//淘汰库
                                        path: '/recruitment/daiSecondInterview',
                                        component: modules[`${'../components/recruitment_management/recruitment_zp_daiSecondInterview.vue'}`],
                                    },

                                ]
                            },
                            {//录用
                                path: '/recruitment/enroll',
                                component: modules[`${'../components/recruitment_management/enroll_yyx.vue'}`],
                            },
                            {//简历筛选
                                path: '/recruitment/recruitment_screen',
                                redirect: "/recruitment/candidate",
                                component: modules[`${'../components/recruitment_management/recruitment_screen.vue'}`],
                                children: [
                                    {//候选人
                                        path: '/recruitment/candidate',
                                        component: modules[`${'../components/recruitment_management/recruitment_candidate.vue'}`],
                                    },
                                    {//已邀约
                                        path: '/recruitment/Invited',
                                        component: modules[`${'../components/recruitment_management/recruitment_Invited.vue'}`],
                                    },

                                ]
                            },
                            {//邀约面试
                                path: '/recruitment/Invitems',
                                component: modules[`${'../components/recruitment_management/Invitems_yyx.vue'}`],
                            },
                            {//录用管理
                                path: '/recruitment/employment',
                                redirect: "/recruitment/druzhi",
                                component: modules[`${'../components/recruitment_management/employment_management/employment_main.vue'}`],
                                children: [
                                    {//待接受
                                        path: '/recruitment/druzhi',
                                        component: modules[`${'../components/recruitment_management/employment_management/daccept_yyx.vue'}`],
                                    },
                                    {//已接受
                                        path: '/recruitment/yjieshou',
                                        component: modules[`${'../components/recruitment_management/employment_management/yaccept_yyx.vue'}`],
                                    },
                                    {//已入职
                                        path: '/recruitment/yruzhi',
                                        component: modules[`${'../components/recruitment_management/employment_management/yInduction_yyx.vue'}`],
                                    },
                                    {//已拒绝
                                        path: '/recruitment/yjujue',
                                        component: modules[`${'../components/recruitment_management/employment_management/yrefuse_yyx.vue'}`],
                                    },
                                    {//放弃入职
                                        path: '/recruitment/fangqiruzhi',
                                        component: modules[`${'../components/recruitment_management/employment_management/abandon_yyx.vue'}`],
                                    },
                                    {//已离职
                                        path: '/recruitment/ylizhi',
                                        component: modules[`${'../components/recruitment_management/employment_management/resigned_yyx.vue'}`],
                                    },
                                ]
                            },
                        ]
                    },
                    {//招聘统计
                        path: '/recruitment/zptresume',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//招聘进度
                                path: '/recruitment/recruit/speed_progress',
                                component: modules[`${'../components/recruitment_management/recruitment_speed_progress.vue'}`],
                            },
                            {//计划统计
                                path: '/recruitment/recruit/statistics',
                                component: modules[`${'../components/recruitment_management/recruitment_statistics.vue'}`],
                            },
                            {//业绩统计
                                path: '/recruitment/recruit/achievement',
                                component: modules[`${'../components/recruitment_management/recruitment_achievement.vue'}`],
                            },
                        ]
                    },
                ]
            },
            {//审批管理
                path: '/examine',
                component: modules[`${'../components/examine_management/examine_main.vue'}`],
                redirect: "/examine/examine_centre/sponsor_examine",
                children: [
                    {//审批中心
                        path: '/examine/examine_centre',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//转正审批
                                path: '/examine/examine_centre/sponsor_examine',
                                component: modules[`${'../components/examine_management/auditflow_overtimeask.vue'}`],
                            },
                            {//异动审批
                                path: '/examine/examine_centre/transaction_examine',
                                component: modules[`${'../components/examine_management/auditflow_allodynia.vue'}`],
                            },
                            {//调薪审批
                                path: '/examine/examine_centre/wage_examine',
                                component: modules[`${'../components/examine_management/auditflow_salary.vue'}`],
                            },
                            {//离职审批
                                path: '/examine/examine_centre/dimission_examine',
                                component: modules[`${'../components/examine_management/auditflow_quit.vue'}`],
                            },
                            {//加班审批
                                path: '/examine/examine_centre/overtime_examine',
                                component: modules[`${'../components/examine_management/auditflow_work_overtime.vue'}`],
                            },
                            {//补打卡审批
                                path: '/examine/examine_centre/fill_clock_examine',
                                component: modules[`${'../components/examine_management/auditflow_make_upcard.vue'}`],
                            },
                            {//出差审批
                                path: '/examine/examine_centre/evection_examine',
                                component: modules[`${'../components/examine_management/auditflow_errand.vue'}`],
                            },
                            {//请假审批
                                path: '/examine/examine_centre/leave_examine',
                                component: modules[`${'../components/examine_management/auditflow_leave.vue'}`],
                            }
                        ]
                    }
                ]
            },
            {//薪资管理
                path: '/salary',
                component: modules[`${'../components/salary_management/salary_main.vue'}`],
                redirect: "/salary/paynavigation",
                children: [
                    //薪酬导航
                    {
                        path: '/salary/paynavigation',
                        component: modules[`${'../components/salary_management/salary_salarynavigation.vue'}`],
                        redirect: "/salary/flat",
                        children: [
                            //薪酬结构
                            {
                                path: '/salary/flat',
                                component: modules[`${'../components/salary_management/salary_construction.vue'}`]
                            },
                            //核算方案
                            {
                                path: '/salary/scheme',
                                component: modules[`${'../components/salary_management/salary_accountscheme.vue'}`]
                            },
                            //工资表
                            {
                                path: '/salary/paysheet',
                                component: modules[`${'../components/salary_management/salary_archive.vue'}`]
                            },
                        ]
                    },
                    //工资表导航
                    {
                        path: '/salary/wagesheet',
                        component: modules[`${'../components/salary_management/salary_checkwage.vue'}`],
                        redirect: "/salary/selectwagetable",
                        children: [
                            //查看工资表
                            {
                                path: '/salary/selectwagetable',
                                component: modules[`${'../components/salary_management/salary_wagetable.vue'}`]
                            },
                        ]
                    },
                    //固定工资方案
                    {
                        path: '/salary/regular',
                        component: modules[`${'../components/salary_management/salary_fixedsalary.vue'}`]
                    },
                    //加班工资方案
                    {
                        path: '/salary/callbackpay',
                        component: modules[`${'../components/salary_management/salary_workovertimeplan.vue'}`]
                    },
                    //新增编辑加班工资方案
                    {
                        path: '/salary/insertcallbackpay',
                        component: modules[`${'../components/salary_management/salary_insertplan.vue'}`]
                    },
                    //考勤扣款方案
                    {
                        path: '/salary/attendanceplan',
                        component: modules[`${'../components/salary_management/salary_attendance.vue'}`]
                    },
                    //新增编辑考勤扣款方案
                    {
                        path: '/salary/insertattendanceplan',
                        component: modules[`${'../components/salary_management/salary_insertplantwo.vue'}`]
                    },
                    //出差方案
                    {
                        path: '/salary/evectionplan',
                        component: modules[`${'../components/salary_management/salary_evection.vue'}`]
                    },
                    //新增编辑出差方案
                    {
                        path: '/salary/insertevectionplan',
                        component: modules[`${'../components/salary_management/salary_insertplanthree.vue'}`]
                    },
                    //薪酬统计
                    {
                        path: '/salary/count',
                        component: modules[`${'../components/salary_management/salary_statistics.vue'}`]
                    }
                ]
            },
            {//社保管理
                path: '/social',
                redirect: "/social/basic_setup",
                component: modules[`${'../components/social_management/social_main.vue'}`],
                children: [
                    {//基本设置
                        path: '/social/basic_setup',
                        redirect: "/social/basic_setup/insured_scheme",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//参保方案
                                path: '/social/basic_setup/insured_scheme',
                                component: modules[`${'../components/social_management/ginseng_protect_plan.vue'}`],
                            },
                            {//新增、修改参保方案
                                path: '/social/basic_setup/new_amend_scheme',
                                component: modules[`${'../components/social_management/new_amend_scheme.vue'}`],
                            },
                        ]
                    },
                    {//社保管理
                        path: '/social/social_management',
                        redirect: "/social/social_management/insured_management",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//参保人员管理
                                path: '/social/social_management/insured_management',
                                component: modules[`${'../components/social_management/insured_management.vue'}`],
                            },
                        ]
                    },
                    {//社保缴费
                        path: '/social/social_payment',
                        redirect: "/social/social_payment/monthly_report",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//月度报表
                                path: '/social/social_payment/monthly_report',
                                component: modules[`${'../components/social_management/monthly_report.vue'}`],
                            },
                            {//社保缴费明细
                                path: '/social/social_payment/payment_details',
                                component: modules[`${'../components/social_management/monthly_details.vue'}`],
                            },
                            {// 查看月度参保详情
                                path: '/social/social_payment/someone_insured_particularss',
                                redirect: "/social/social_payment/someone_insured_particulars/someone_insured_detailss",
                                component: modules[`${'../components/social_management/monthly_report_particulars.vue'}`],
                                children: [
                                    {//参保明细
                                        path: '/social/social_payment/someone_insured_particulars/someone_insured_detailss',
                                        component: modules[`${'../components/social_management/monthly_particulars.vue'}`],
                                    },

                                ]
                            },
                            {//社保缴费明细
                                path: '/social/social_payment/payment_detail',
                                component: modules[`${'../components/social_management/payment_details.vue'}`],
                            },
                            {// 查看个人参保详情
                                path: '/social/social_payment/someone_insured_particulars',
                                redirect: "/social/social_payment/someone_insured_particulars/someone_insured_details",
                                component: modules[`${'../components/social_management/someone_insured_particulars.vue'}`],
                                children: [
                                    {//参保明细
                                        path: '/social/social_payment/someone_insured_particulars/someone_insured_details',
                                        component: modules[`${'../components/social_management/insurance_details.vue'}`],
                                    },
                                    {//参保记录
                                        path: '/social/social_payment/someone_insured_particulars/someone_insured_record',
                                        component: modules[`${'../components/social_management/insurance_record .vue'}`],
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {//统计分析
                path: '/statistics',
                component: modules[`${'../components/statistics_management/statistics_main.vue'}`],
                redirect: "/statistics/remuneration_analyze/three",
                children: [


                    {//人员数量分析
                        path: '/statistics/staff_analyze/statistics_personnel1',
                        component: modules[`${'../components/statistics_management/statistics_personnel1.vue'}`],
                    },
                    {//人工异动分析
                        path: '/statistics/staff_analyze/statistics_personnel2',
                        component: modules[`${'../components/statistics_management/statistics_personnel2.vue'}`],
                    },
                    {//员工概况
                        path: '/statistics/staff_analyze/statistics_personnel3',
                        component: modules[`${'../components/statistics_management/statistics_personnel3.vue'}`],
                    },


                    {//考勤分析
                        path: '/statistics/attendance_analyze',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [

                            {//出勤分析
                                path: '/statistics/attendance_analyze/statistics_work1',
                                component: modules[`${'../components/statistics_management/statistics_work1.vue'}`],
                            },
                            {//工时分析
                                path: '/statistics/attendance_analyze/statistics_work2',
                                component: modules[`${'../components/statistics_management/statistics_work2.vue'}`],
                            },
                            {//加班分析
                                path: '/statistics/attendance_analyze/statistics_work3',
                                component: modules[`${'../components/statistics_management/statistics_work3.vue'}`],
                            },
                            {//请假分析
                                path: '/statistics/attendance_analyze/statistics_work4',
                                component: modules[`${'../components/statistics_management/statistics_work4.vue'}`],
                            }

                        ]
                    },
                    {//薪酬分析
                        path: '/statistics/remuneration_analyze',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//工资成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis1',
                                component: modules[`${'../components/statistics_management/statistics_analysis1.vue'}`],
                            },
                            {//社保成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis2',
                                component: modules[`${'../components/statistics_management/statistics_analysis2.vue'}`],
                            },
                            {//薪酬成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis3',
                                component: modules[`${'../components/statistics_management/statistics_analysis3.vue'}`],
                            },
                            {//部门成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis4',
                                component: modules[`${'../components/statistics_management/statistics_analysis4.vue'}`],
                            }

                        ]
                    }, {
                        path: '/statistics/remuneration_analyze/three',
                        component: modules[`${'../components/statistics_management/three.vue'}`]
                    }
                ],
            },
            {//系统管理
                path: '/system',
                redirect: "/system/authority_management",
                component: modules[`${'../components/system_management/system_main.vue'}`],
                children: [
                    {//权限管理
                        path: '/system/authority_management',
                        redirect: "/system/authority_management/authority_set",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//权限设置
                                path: '/system/authority_management/authority_set',
                                component: modules[`${'../components/system_management/permission_setting.vue'}`],
                            },
                            {//角色设置
                                path: '/system/authority_management/role',
                                component: modules[`${'../components/system_management/system_role.vue'}`],

                            },
                            {//设置
                                path: '/system/authority_management/allot_user',
                                component: modules[`${'../components/system_management/system_allot_user.vue'}`],

                            }
                        ]

                    },
                    {//公告管理
                        path: '/system/announcement_management',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//公告设置
                                path: '/system/announcement_management/announcement_set',
                                component: modules[`${'../components/system_management/system_notice.vue'}`],
                            }
                        ]
                    },
                    {//日志管理
                        path: '/system/log_management',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//登录日志
                                path: '/system/log_management/register_log',
                                component: modules[`${'../components/system_management/system_login_log.vue'}`],
                            },
                            {//操作日志
                                path: '/system/log_management/operation_log',
                                component: modules[`${'../components/system_management/system_operate_log.vue'}`],
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
