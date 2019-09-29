<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>审核日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <el-input v-model="select_word" placeholder="智能检索用户记录" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>查询日期</span>
                        <span>:</span>
                        <el-date-picker
                            style="width: 220px"
                            v-model="examineTime"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>用户名</span>
                        <span>:</span>
                        <el-input v-model="mobileNumber" placeholder="用户名" style="width: 200px"></el-input>
                    </label>
                    <el-button type="primary"  @click="doSearch">查询记录</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                              border
                              :height="this.tableHeight"
                              ref="moviesTable"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
                <div class="" style="display: flex;align-items: center;justify-content: center;margin-top: 10px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="currentChange"
                        @next-click="nextClick"
                        @prev-click="prevClick"
                        :total="pageNum">
                    </el-pagination>
                </div>
            </div>



            <Modal :msg="message"
                   :isHideModal="HideModal"></Modal>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
    import {getNowTime,getLestWeekTime} from '../../assets/js/api'

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                cols: [
                    {
                        "prop": "hetonghao",
                        "label": "合同号"
                    },
                    {
                        "prop": "chepiaohao",
                        "label": "车票号"
                    },
                    {
                        "prop": "sijiming",
                        "label": "司机名"
                    },
                    {
                        "prop": "kaipiaozongjine",
                        "label": "开票总金额（元）"
                    },
                    {
                        "prop": "sijiyunfei",
                        "label": "司机运费（元）"
                    },
                    {
                        "prop": "fuwufeilv",
                        "label": "服务费率(%)"
                    },
                    {
                        "prop": "fuwufei",
                        "label": "服务费(元)"
                    },
                    {
                        "prop": "createtime",
                        "label": "开票日期"
                    },
                    {
                        "prop": "statusStr",
                        "label": "审核状态"
                    }],
                tableData: [
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "通过审核",
                        "statusState": "2",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "通过审核",
                        "statusState": "2",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "通过审核",
                        "statusState": "2",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "通过审核",
                        "statusState": "2",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "通过审核",
                        "statusState": "2",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "通过审核",
                        "statusState": "2",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    },
                    {
                        "createtime": "2019-05-11",
                        "statusStr": "未审核",
                        "statusState": "1",
                        "fuwufei": "1000",
                        "fuwufeilv": "10%",
                        "sijiyunfei": "300",
                        "kaipiaozongjine": "300000",
                        "id": 14,
                        "sijiming": "张三",
                        "chepiaohao": 12334221,
                        "hetonghao": 85412987452
                    }
                ],


                select_word: '',
                examineTime: "",

                page:1,
                pageNum:100,


            }
        },
        computed: {
            //模糊检索
            tables: function () {
                var search = this.select_word;
                if (search) {
                    return this.tableData.filter(function (dataNews) {
                        return Object.keys(dataNews).some(function (key) {
                            return String(dataNews[key]).indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }
        },
        components: {Modal},
        mounted() {


        },
        created() {
            this.getAdminState();
        },
        methods: {

            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {
                    this.$router.push("/")
                }
                else {
                    this.setTableHeight();

                    let nowTime = getNowTime();
                    let lestWeekTime= getLestWeekTime();
                    let times = [];
                    times.push(lestWeekTime);
                    times .push(nowTime);
                    this.examineTime = times;
                }
            },

            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 300 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h - 300 + "px";
                }

            },

            //瞬间加载数据
            loadingShowData(data1, data2) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "anquanjilvdengji"}),
                    axios.post(" " + url + "/anquan/jiluList", {"times": data1, "gongweiid": data2})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data.data;
                    }));
            },


            //查询
            doSearch() {

            },

            //页面发送改变
            currentChange(val) {
                this.page = val;
            },

            //前一页
            prevClick(val) {
                this.page = val;
            },

            //后一页
            nextClick(val) {
                this.page = val;
            },



        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .template {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .template-content {
            .handle-box {
                height: 80px;
                line-height: 80px;
                padding-left: 20px;
                .handle-input {
                    width: 300px;
                    display: inline-block;
                }
                .el-button {
                    width: 130px;
                    height: 35px;
                }
            }
            .del-dialog-cnt {
                font-size: 16px;
                text-align: center
            }
            .table {
                width: 100%;
                font-size: 14px;
            }

        }
    }


</style>
