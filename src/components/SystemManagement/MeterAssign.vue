<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>表头设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <el-input v-model="select_word" placeholder="智能检索开票记录" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>一级菜单</span>
                        <span>:</span>
                        <el-select
                            style="width: 200px"
                            v-model="state"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择状态">
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>二级菜单</span>
                        <span>:</span>
                        <el-select
                            style="width: 200px"
                            v-model="state"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择状态">
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button type="primary"  @click="doSearch">查询记录</el-button>
                    <el-button type="success"  @click="showAdd">新增表头</el-button>
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
                        <el-table-column
                            align="center"
                            label="操作"
                            width="150">
                            <template slot-scope="scope">
                                <el-button @click="editClick(scope.row)"     style="width: 50px;height: 25px" type="success">编辑</el-button>
                                <el-button @click="deleteClick(scope.row)"   style="width: 50px;height: 25px" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
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


            <!--新增弹出框 -->
            <el-dialog title="新增表头" :visible.sync="addVisible" width="40%">
                <div class="" style="height: 450px;overflow: auto">
                    <el-form ref="form" label-width="150px" :model="ruleForm" :rules="rules">
                        <el-form-item label="一级菜单" prop="name">
                            <el-select
                                style="width: 200px"
                                v-model="state"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择状态">
                                <el-option
                                    v-for="item in stateOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二级菜单" prop="name">
                            <el-select
                                style="width: 200px"
                                v-model="state"
                                clearable
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择状态">
                                <el-option
                                    v-for="item in stateOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="表头中文名称" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="表头数据库字段" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="表头排序" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑记录" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
                <el-form ref="form" label-width="150px" :model="ruleForm" :rules="rules">
                    <el-form-item label="一级菜单" prop="name">
                        <el-select
                            style="width: 200px"
                            v-model="state"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择状态">
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级菜单" prop="name">
                        <el-select
                            style="width: 200px"
                            v-model="state"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择状态">
                            <el-option
                                v-for="item in stateOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="表头中文名称" prop="name">
                        <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="表头数据库字段" prop="name">
                        <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="表头排序" prop="name">
                        <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="saveEdit" style="height:30px;width:80px">确 定</el-button>
                </span>
            </el-dialog>


            <!-- 删除提示框 -->
            <el-dialog title="删除记录" :visible.sync="delVisible" width="300px" center :close-on-click-modal="false">
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDelete" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="deleteRow" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>


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
                carNumber: "",
                driverName: "",
                mobileNumber: "",
                state: "",
                stateOptions: [{"name": "未审核", "id": 0}, {"name": "已审核", "id": 1}],


                addVisible: false,
                editVisible: false,
                delVisible: false,
                examineVisible: false,
                seeVisible: false,


                shTableData:[],


                page:1,
                pageNum:100,

                loading:false,
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,


                uploadUrl: " " + url + "/fileupload/upload",
                importData:{},

                ruleForm: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ]
                },

                imgUrl:  "",

                imgs: [{"url": require("../../assets/img/banner1.jpg")}]



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


            //显示新增
            showAdd() {
                this.addVisible = true;
                this.line = "";
                this.workStation = "";
                this.name = "";
                this.securityType = "";
                this.neirong = "";
            },

            //进行新增
            doAdd() {
                if (this.name && this.line && this.workStation && this.securityType && this.neirong) {
                    axios.post(" " + url + "/anquan/jiluAdd",
                        {
                            "jiagongxian": this.line,
                            "gongweiid": this.workStation,
                            "username": this.name,
                            "typeid": this.securityType,
                            "neirong": this.neirong,
                        }
                    )
                        .then((res) => {
                            if (res.data === 1) {
                                this.$message.success("添加成功");
                                this.addVisible = false;
                                this.loadingShowData(this.examineTime, this.workStation);

                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入不能为空`);
                }
            },

            //查看审核状态
            examineClick() {
                this.examineVisible = true;
            },

            //查看详情
            seeClick() {
                this.seeVisible = true;

            },

            //编辑
            editClick(row) {
                if (row.statusState === "1") {
                    this.editVisible = true;
                }
                else {
                    this.$message.warning("已经通过审核，不能编辑");
                }

            },

            //显示删除
            deleteClick(row) {
                if (row.statusState === "1") {
                    this.delVisible = true;
                }
                else {
                    this.$message.warning("已经通过审核，不能删除");
                }


            },

            //取消删除
            cancelDelete() {
                this.delVisible = false;
            },

            //进行删除
            deleteRow() {

            },



            // 保存编辑
            saveEdit() {
                if (this.name) {
                    axios.post(" " + url + "/anquan/jiluUpdate",
                        {
                            "id": this.id,
                            "jiagongxian": this.line,
                            "gongweiid": this.workStation,
                            "username": this.name,
                            "typeid": this.securityType,
                            "neirong": this.neirong,
                        }
                    )
                        .then((res) => {
                            if (res.data === "1") {
                                this.editVisible = false;
                                this.$message.success("修改成功");
                                this.loadingShowData(this.examineTime, this.workStation);
                            }
                            else {
                                this.$message.warning("修改失败");
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
                else {
                    this.$message.warning(`输入不能为空`);
                }

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

            //图片放大
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //删除图片
            handleRemove(file) {
                console.log(file);
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
