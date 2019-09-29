import Vue from 'vue';
import Router from 'vue-router';

//主页相关路由
import Index from '../components/index/index'

//消息管理路由
import Message from '../components/index/messageIndex'

//开票管理

//开票申请
import InvoiceRecording from '../components/InvoicingManagement/InvoiceRecording.vue'
//司机管理
import DriverManagement from '../components/InvoicingManagement/DriverManagement.vue'
//车辆管理
import VehicleManagement from '../components/InvoicingManagement/VehicleManagement.vue'
//充值管理
import RechargeManagement from '../components/InvoicingManagement/RechargeManagement.vue'
//企业认证
import EnterpriseCertification from '../components/InvoicingManagement/EnterpriseCertification.vue'




//审核管理

//车辆审核
import DriverAudit from '../components/AuditManagement/DriverAudit.vue'
//企业审核
import EnterpriseAudit from '../components/AuditManagement/EnterpriseAudit.vue'
//开票审核
import InvoiceAudit from '../components/AuditManagement/InvoiceAudit.vue'
//充值审核
import RechargeAudit from '../components/AuditManagement/RechargeAudit.vue'
//车辆审核
import VehicleAudit from '../components/AuditManagement/VehicleAudit.vue'



//人员管理

//权限设定
import PermissionSetting from '../components/PersonnelManagement/PermissionSetting.vue'


//系统管理
//表头设定
import MeterAssign from '../components/SystemManagement/MeterAssign.vue'
//用户日志
import UserLog from '../components/SystemManagement/UserLog.vue'
//审核日志
import AuditLog from '../components/SystemManagement/AuditLog.vue'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Index'
        },
        {
            path: '/',
            component: resolve => require(['../common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/Index',
                    component: Index,
                    meta: {title: '系统首页'}
                },
                {
                    path: '/Message',
                    component: Message,
                    meta: {title: '消息中心'}
                },
                {
                    path: '/InvoiceRecording',
                    component: InvoiceRecording,
                    meta: {title: '开票申请'}
                },
                {
                    path: '/VehicleManagement',
                    component: VehicleManagement,
                    meta: {title: '车辆管理'}
                },
                {
                    path: '/DriverManagement',
                    component: DriverManagement,
                    meta: {title: '司机管理'}
                },
                {
                    path: '/RechargeManagement',
                    component: RechargeManagement,
                    meta: {title: '充值管理'}
                },
                {
                    path: '/EnterpriseCertification',
                    component: EnterpriseCertification,
                    meta: {title: '企业认证'}
                },


                {
                    path: '/DriverAudit',
                    component: DriverAudit,
                    meta: {title: '司机审核'}
                },
                {
                    path: '/EnterpriseAudit',
                    component: EnterpriseAudit,
                    meta: {title: '企业审核'}
                },
                {
                    path: '/InvoiceAudit',
                    component: InvoiceAudit,
                    meta: {title: '开票审核'}
                },
                {
                    path: '/RechargeAudit',
                    component: RechargeAudit,
                    meta: {title: '充值审核'}
                },
                {
                    path: '/VehicleAudit',
                    component: VehicleAudit,
                    meta: {title: '车辆审核'}
                },


                {
                    path: '/PermissionSetting',
                    component: PermissionSetting,
                    meta: {title: '权限设定'}
                },
                {
                    path: '/MeterAssign',
                    component: MeterAssign,
                    meta: {title: '表头设定'}
                },
                {
                    path: '/UserLog',
                    component: UserLog,
                    meta: {title: '用户日志'}
                },
                {
                    path: '/AuditLog',
                    component: AuditLog,
                    meta: {title: '审核日志'}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/errPage/404.vue'], resolve),
                    meta: {title: '404'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/errPage/403.vue'], resolve),
                    meta: {title: '403'}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/indexLogin/Login.vue'], resolve)
        },
        {
            path: '/register',
            component: resolve => require(['../components/indexLogin/Resister.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
