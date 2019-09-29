<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../assets/js/bus';
    import axios from 'axios'
    import url from '../assets/js/URL'

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-s-home',
                        index: '/',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-edit-outline',
                        index: '1',
                        title: '开票管理',
                        subs: [
                            {
                                index: 'InvoiceRecording',
                                title: '申请开票'
                            },

                            {
                                index: 'RechargeManagement',
                                title: '充值管理'
                            },
                            {
                                index: 'EnterpriseCertification',
                                title: '企业认证'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-user-solid',
                        index: '2',
                        title: '司机管理',
                        subs: [
                            {
                                index: 'DriverManagement',
                                title: '司机管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-truck',
                        index: '3',
                        title: '车辆管理',
                        subs: [
                            {
                                index: 'VehicleManagement',
                                title: '车辆管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-shopping-bag-1',
                        index: '4',
                        title: '收货管理',
                        subs: [
                            {
                                index: 'DriverManagement',
                                title: '收货人列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-custom',
                        index: '5',
                        title: '用户管理',
                        subs: [
                            {
                                index: 'PermissionSetting',
                                title: '角色管理'
                            },
                            {
                                index: 'PermissionSetting',
                                title: '用户日志'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '6',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'PermissionSetting',
                                title: '订单记录'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-thumb',
                        index: '7',
                        title: '支付管理',
                        subs: [
                            {
                                index: 'PermissionSetting',
                                title: '应付账单'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-finance',
                        index: '8',
                        title: '个人账户',
                        subs: [
                            {
                                index: 'PermissionSetting',
                                title: '资金账户'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '2',
                        title: '审核管理',
                        subs: [
                            {
                                index: 'InvoiceAudit',
                                title: '开票审核'
                            },
                            {
                                index: 'DriverAudit',
                                title: '司机审核'
                            },
                            {
                                index: 'VehicleAudit',
                                title: '车辆审核'
                            },
                            {
                                index: 'RechargeAudit',
                                title: '充值审核'
                            },
                            {
                                index: 'EnterpriseAudit',
                                title: '企业审核'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-s-tools',
                        index: '9',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'MeterAssign',
                                title: '表头设定'
                            },
                            {
                                index: 'UserLog',
                                title: '用户日志'
                            },
                            {
                                index: 'AuditLog',
                                title: '审核日志'
                            }
                        ]
                    },

                ]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            this.getAdminState();
        },
        methods: {
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {

                }
                else {
                 /*   let Info = JSON.parse(userInfo);
                    let username = Info.username;
                    axios.post(" " + url + "/menu/getFirstMenu", {"username":username})
                        .then((res) => {
                            if(res.data.state==="1"){
                                if(res.data.data.length>0){
                                    this.items=res.data.data;
                                }
                                else {
                                    this.$message.warning("暂无数据");
                                }
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        });*/
                }
            },
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";

    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        line-height: 70px;
        bottom: 0;
        overflow-y: scroll;
        ul {
            height: 100%;
        }
        i {

            font-size: 250%;
            margin-right: 30px;
        }
        span {
            font-size: @font-size-medium-x;
        }

    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 200px;
    }

</style>
