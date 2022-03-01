import {createStore} from 'vuex'
import {ref} from "vue";

const store = createStore({
    state: {
        //动态菜单
        memuList: [
            {
                MENU_ID: 1,//菜单编号
                MENU_NAME: '工作台',//菜单名称Picture address
                MENU_ROUTE: '/workbench',//路由地址,
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_MODULE: 'components/workbench_management/workbench_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 2,//菜单编号
                MENU_NAME: '组织管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/organization',//路由地址
                MENU_MODULE: 'organization_management/organization_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 2.1,//菜单编号
                    MENU_NAME: '组织情报',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: 'organization/message',//路由地址
                    MENU_MODULE: '/components/organization_management/zz_evection',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 2.11,//菜单编号
                        MENU_NAME: '部门详情',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_evectino',//路由地址
                        MENU_MODULE: '/components/organization_management/zz_evection',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 2.12,//菜单编号
                        MENU_NAME: '职位详情',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/organization/message/zz_post',//路由地址
                        MENU_MODULE: 'components/organization_management/zz_post',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },
                    ]
                },


                ]
            },
            {
                MENU_ID: 3,//菜单编号
                MENU_NAME: '员工管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/employee',//路由地址
                MENU_MODULE: 'employee_management/employee_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 3.1,//菜单编号
                    MENU_NAME: '员工信息',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/employee/message',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 3.11,//菜单编号
                        MENU_NAME: '员工花名册',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/employee/message/employee_roster',//路由地址
                        MENU_MODULE: 'employee_management/employee_staff_one',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 3.2,//菜单编号
                    MENU_NAME: '人事异动',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/employee/transaction',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 3.21,//菜单编号
                        MENU_NAME: '入职管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/employee/transaction/entry',//路由地址
                        MENU_MODULE: 'employee_management/employee_abandon',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 3.22,//菜单编号
                        MENU_NAME: '转正管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/employee/transaction/worker',//路由地址
                        MENU_MODULE: 'employee_management/employee_conversion',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 3.23,//菜单编号
                        MENU_NAME: '调动管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/employee/transaction/transfer',//路由地址
                        MENU_MODULE: 'employee_management/employee_transfer',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                },]
            },
            {
                MENU_ID: 4,//菜单编号
                MENU_NAME: '考勤管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/time_modular',//路由地址
                MENU_MODULE: 'time_modular/attendance_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 4.1,//菜单编号
                    MENU_NAME: '排班管理',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: 'attendance/check',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 4.11,//菜单编号
                        MENU_NAME: '班次设置',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/time/yyx/shift',//路由地址
                        MENU_MODULE: 'time_modular/shift_yyx',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 4.2,//菜单编号
                    MENU_NAME: '考勤记录',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/attendance/TimeCard',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 4.20,//菜单编号
                        MENU_NAME: '我的考勤',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/my/attendance',//路由地址
                        MENU_MODULE: 'time_modular/my_attendance',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 4.3,//菜单编号
                    MENU_NAME: '考勤统计',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: 'time_modular/statistics',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                            MENU_ID: 4.22,//菜单编号
                            MENU_NAME: '每日考勤统计',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/yyx/workovertime',//路由地址
                            MENU_MODULE: 'time_modular/workovertime_yyx',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        },
                        {
                            MENU_ID: 4.24,//菜单编号
                            MENU_NAME: '月考勤统计',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/yyx/outdifference',//路由地址
                            MENU_MODULE: 'time_modular/outdifference_yyx',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        },
                        {
                            MENU_ID: 4.23,//菜单编号
                            MENU_NAME: '考勤月明细',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/yyx/leave',//路由地址
                            MENU_MODULE: 'time_modular/leave_yyx',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        },
                        {
                            MENU_ID: 4.23,//菜单编号
                            MENU_NAME: '考勤记录汇总',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/yyx/statistics/archive',//路由地址
                            MENU_MODULE: 'time_modular/attendance_history.vue',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        },
                    ]
                }]
            },
            {
                MENU_ID: 5,//菜单编号
                MENU_NAME: '招聘管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/recruitment',//路由地址
                MENU_MODULE: 'recruitment_management/recruitment_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 5.1,//菜单编号
                    MENU_NAME: '招聘计划',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/recruitment/plan',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 5.11,//菜单编号
                        MENU_NAME: '招聘计划',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/recruitment/plan/plan',//路由地址
                        MENU_MODULE: 'recruitment_management/recruitment_zp_plan',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }

                    ]
                }, {
                    MENU_ID: 5.2,//菜单编号
                    MENU_NAME: '简历管理',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/2',//路由地址
                    MENU_MODULE: '&#xe62c;',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 5.21,//菜单编号
                        MENU_NAME: '人才库',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/recruitment/zptresume/zptresume',//路由地址
                        MENU_MODULE: 'recruitment_management/recruitment_zp_resume.vue',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 5.3,//菜单编号
                    MENU_NAME: '招聘过程',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/3',//路由地址
                    MENU_MODULE: '',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 5.31,//菜单编号
                        MENU_NAME: '简历筛选',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/recruitment/recruitment_screen',//路由地址
                        MENU_MODULE: 'recruitment_management/recruitment_screen.vue',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 5.32,//菜单编号
                        MENU_NAME: '面试管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/recruitment/zpprocess/recruitment_zp_interview',//路由地址
                        MENU_MODULE: 'recruitment_management/recruitment_zp_interview.vue',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    },{
                        MENU_ID: 5.33,//菜单编号
                        MENU_NAME: '录用管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/recruitment/employment',//路由地址
                        MENU_MODULE: 'recruitment_management/employment_management/employment_main.vue',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                },
                ]
            },
            {
                MENU_ID: 6,//菜单编号
                MENU_NAME: '审批管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/examine',//路由地址
                MENU_MODULE: 'examine_management/examine_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 6.1,//菜单编号
                    MENU_NAME: '审批中心',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/examine/examine_centre',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [
                        {
                            MENU_ID: 6.11,//菜单编号
                            MENU_NAME: '转正审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/sponsor_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_overtimeask',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.12,//菜单编号
                            MENU_NAME: '异动审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/transaction_examine', //路由地址
                            MENU_MODULE: 'examine_management/auditflow_allodynia',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.13,//菜单编号
                            MENU_NAME: '调薪审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/wage_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_salary',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.14,//菜单编号
                            MENU_NAME: '离职审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/dimission_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_quit',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.15,//菜单编号
                            MENU_NAME: '加班审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/overtime_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_work_overtime',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.16,//菜单编号
                            MENU_NAME: '补打卡审批审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/fill_clock_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_make_upcard',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.17,//菜单编号
                            MENU_NAME: '出差审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/evection_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_errand',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 6.18,//菜单编号
                            MENU_NAME: '请假审批',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/examine/examine_centre/leave_examine',//路由地址
                            MENU_MODULE: 'examine_management/auditflow_leave',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }]
                }]
            },
            {
                MENU_ID: 7,//菜单编号
                MENU_NAME: '薪酬管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/salary',//路由地址
                MENU_MODULE: 'salary_management/salary_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 7.1,//菜单编号
                    MENU_NAME: '薪酬结构',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/salary/paynavigation',//路由地址
                    MENU_MODULE: '/salary_management/salary_salarynavigation.vue',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 1,//是否有叶子 0有 1没有
                }, {
                    MENU_ID: 7.2,//菜单编号
                    MENU_NAME: '核算方案',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/salary/scheme',//路由地址
                    MENU_MODULE: '/salary_management/salary_accountscheme.vue',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 1,//是否有叶子 0有 1没有
                }, {
                    MENU_ID: 7.3,//菜单编号
                    MENU_NAME: '工资表',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/salary/paysheet',//路由地址
                    MENU_MODULE: '/salary_management/salary_salarynavigation.vue',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 1,//是否有叶子 0有 1没有
                }, {
                    MENU_ID: 7.4,//菜单编号
                    MENU_NAME: '薪酬统计',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/salary/count',//路由地址
                    MENU_MODULE: '/salary_management/salary_statistics.vue',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 1,//是否有叶子 0有 1没有
                }]
            },
            {
                MENU_ID: 8,//菜单编号
                MENU_NAME: '社保管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/social',//路由地址
                MENU_MODULE: 'social_management/social_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 8.1,//菜单编号
                    MENU_NAME: '基本设置',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/social/basic_setup',//路由地址
                    MENU_MODULE: 'social_management/social_main',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 8.11,//菜单编号
                        MENU_NAME: '参保方案',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/social/basic_setup/insured_scheme',//路由地址
                        MENU_MODULE: 'social_management/ginseng_protect_plan',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 8.2,//菜单编号
                    MENU_NAME: '社保管理',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/social/social_management',//路由地址
                    MENU_MODULE: 'social_management/social_main',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 8.21,//菜单编号
                        MENU_NAME: '参保人员管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/social/social_management/insured_management',//路由地址
                        MENU_MODULE: 'social_management/insured_management',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 8.3,//菜单编号
                    MENU_NAME: '社保缴费',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/social/social_payment',//路由地址
                    MENU_MODULE: 'social_management/social_main',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 8.31,//菜单编号
                        MENU_NAME: '月底报表',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/social/social_payment/monthly_report',//路由地址
                        MENU_MODULE: 'social_management/monthly_report',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 8.32,//菜单编号
                        MENU_NAME: '社保缴费明细',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/social/social_payment/payment_detail',//路由地址
                        MENU_MODULE: 'social_management/payment_details',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有

                    }]
                }]
            },
            {
                MENU_ID: 9,//菜单编号
                MENU_NAME: '统计分析',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/statistics',//路由地址
                MENU_MODULE: 'statistics_management/statistics_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 9.1,//菜单编号
                    MENU_NAME: '人员分析',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/statistics/staff_analyze',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 9.12,//菜单编号
                        MENU_NAME: '人员数量分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/staff_analyze/statistics_personnel1',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_personnel1',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 9.13,//菜单编号
                        MENU_NAME: '人员异动分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/staff_analyze/statistics_personnel2',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_personnel2',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 9.14,//菜单编号
                        MENU_NAME: '员工概况',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/staff_analyze/statistics_personnel3',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_personnel3',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 9.2,//菜单编号
                    MENU_NAME: '考勤分析',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/statistics/attendance_analyze',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 9.21,//菜单编号
                        MENU_NAME: '出勤分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/attendance_analyze/statistics_work1',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_work1',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 9.23,//菜单编号
                        MENU_NAME: '加班分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/attendance_analyze/statistics_work3',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_work3',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }, {
                    MENU_ID: 9.3,//菜单编号
                    MENU_NAME: '薪酬分析',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/statistics/remuneration_analyze',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [{
                        MENU_ID: 9.31,//菜单编号
                        MENU_NAME: '工资成本分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/remuneration_analyze/statistics_analysis1',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_analysis1',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 9.32,//菜单编号
                        MENU_NAME: '社保成本分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/remuneration_analyze/statistics_analysis2',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_analysis2',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 9.33,//菜单编号
                        MENU_NAME: '薪酬结构分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/statistics/remuneration_analyze/statistics_analysis3',//路由地址
                        MENU_MODULE: 'statistics_management/statistics_analysis3',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }]
                }]
            },
            {
                MENU_ID: 10,//菜单编号
                MENU_NAME: '系统管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/system',//路由地址
                MENU_MODULE: 'system_management/system_main',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [{
                    MENU_ID: 10.1,//菜单编号
                    MENU_NAME: '权限管理',//菜单名称
                    PICTURE_ADDRESS: '&#xe64c;',//图片地址
                    MENU_ROUTE: '/system/authority_management',//路由地址
                    MENU_MODULE: 'menu_skip',//组件地址
                    MENU_STATE: 0,//是否启用 0启用 1禁用
                    MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                    MENU_LEAF: 0,//是否有叶子 0有 1没有
                    son: [//子菜单
                        {
                            MENU_ID: 10.11,//菜单编号
                            MENU_NAME: '权限设置',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/system/authority_management/authority_set',//路由地址
                            MENU_MODULE: 'system_management/permission_setting',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }, {
                            MENU_ID: 10.12,//菜单编号
                            MENU_NAME: '角色设置',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/system/authority_management/role',//路由地址
                            MENU_MODULE: 'system_management/system_role',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }]
                },
                    {
                        MENU_ID: 10.2,//菜单编号
                        MENU_NAME: '公告管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/system/announcement_management',//路由地址
                        MENU_MODULE: 'menu_skip',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [{
                            MENU_ID: 10.21,//菜单编号
                            MENU_NAME: '公告设置',//菜单名称
                            PICTURE_ADDRESS: '&#xe64c;',//图片地址
                            MENU_ROUTE: '/system/announcement_management/announcement_set',//路由地址
                            MENU_MODULE: 'system_management/system_notice',//组件地址
                            MENU_STATE: 0,//是否启用 0启用 1禁用
                            MENU_TYPE: 0,//菜单类型 0:菜单 1:按钮
                            MENU_LEAF: 1,//是否有叶子 0有 1没有
                        }]
                    }
                ]
            }
        ],
        //当前默认激活的一级菜单
        activate_router: '',
        //默认激活的二级菜单
        default_route: '',

        //当前登录用户所有消息
        userall: '',


    },
    getters: {
        //获取更多之外的菜单列表
        menus_outer: (state) => {
            //定义数组
            let menus_outer = [];
            //循环菜单列表
            for (let i = 0; i < state.memuList.length; i++) {
                //只获取前四个 并且状态为启用 以及类型是目录
                if (i <= 11 && state.memuList[i].MENU_STATE == 0 && state.memuList[i].MENU_TYPE == 0) {
                    //添加至数组
                    menus_outer.push(state.memuList[i]);
                }
            }
            //返回结果集
            return menus_outer;
        },
        // //获取更多之内的菜单列表
        // menus_within: (state) => {
        //     //定义数组
        //     let menus_within = [];
        //     //循环菜单列表
        //     for (let i = 0; i < state.memuList.length; i++) {
        //         //获取前四个后面的菜单 并且状态为启用 以及类型是目录
        //         if (i >= 5 && state.memuList[i].MENU_STATE == 0 && state.memuList[i].MENU_TYPE == 0) {
        //             //添加至数组
        //             menus_within.push(state.memuList[i]);
        //         }
        //     }
        //     //返回结果集
        //     return menus_within;
        // },
        //根据path动态获取store里面的菜单列表
        store_menuList: (state) => (path) => {
            //定义数组
            let store_menuList = [];
            //循环菜单列表
            for (let i = 0; i < state.memuList.length; i++) {
                //如果找到路由地址跟传过来的是一致则返回结果集 并且 状态需为启用
                if ((state.memuList[i].MENU_ROUTE) == (path) && state.memuList[i].MENU_STATE == 0) {
                    //如果叶子下面有数据
                    if (state.memuList[i].son) {
                        //添加至数组
                        store_menuList.push(state.memuList[i].son);
                    }
                }
            }
            //返回结果集
            return store_menuList;
        }
    }
})
export default store