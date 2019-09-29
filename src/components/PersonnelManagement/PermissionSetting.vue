<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>人员管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限设定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 5px">
                        <span>筛选人员</span>
                        <span>:</span>
                        <el-input v-model="select_word" placeholder="筛选人员" style="width: 300px"></el-input>
                    </label>
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>部门</span>
                        <span>:</span>
                        <el-select
                            v-model="dept"
                            clearable
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择部门">
                            <el-option
                                v-for="item in deptOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </label>
                    <el-button  type="primary" @click="doSearchPerson">查询</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'20px'}"
                              border
                              :height="this.tableHeight"
                              @row-dblclick="edit"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <template v-for="(col ,index) in cols">
                            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>

        </div>
        <!--新增弹出框 -->
        <el-dialog title="菜单权限设定" :visible.sync="addVisible" width="40%">
            <el-form ref="form" label-width="100px">
                <el-tree
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="selection"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
                </el-tree>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="danger" @click="resetChecked" style="height:30px;width:80px">清空</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
        </el-dialog>

        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import Modal from '../../common/modal'
   /* import * as API from '../../assets/api/index'*/



    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,
                listData: [],

                treeData: [],
                selection:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                cols: [],
                tableData: [],


                dept: "",
                deptOptions: [],

                select_word: '',

                addVisible: false,


                name: '',
                tableHeight:Number,

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
                    let that = this;
                    axios.all([
                        axios.post(" " + url + "/sysconfig/deptList"),
                    ])
                        .then(axios.spread(function (dept) {
                            that.deptOptions = dept.data;
                            that.loadingShowData();
                        }));
                    /*this.loadingShowData();*/
                }
            },

            //根据屏幕设置Table高度
            setTableHeight() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    this.tableHeight = H - 280 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    this.tableHeight = h -280 + "px";
                }

            },

            //瞬间加载数据
            loadingShowData(data1) {
                let that = this;
                axios.all([
                    axios.post(" " + url + "/sys/showTableTitle", {"name": "caidanquanxian"}),
                    axios.post(" " + url + "/sysconfig/personList", {"deptid": data1,})
                ])
                    .then(axios.spread(function (title, table) {
                        that.cols = title.data;
                        that.tableData = table.data;
                    }));
               /* API.POST("/app/economicIndicators/getEconomicIndicators").then((res) => {
                    console.log(res.data)
                })*/
            },


            //进行人员查询
            doSearchPerson() {
                this.loadingShowData()
            },

            //显示编辑
            edit(row, column, cell, event) {
                this.name = row.name;
                if(this.name){
                    this.addVisible=true;
                    axios.post(" " + url + "/menu/getAllMenu", {"username": this.name})
                        .then((res) => {
                            if(res.data.state==="1"){
                                if(JSON.stringify(res.data.data) !== "{}"){
                                    this.treeData=res.data.data.list;
                                    this.selection=res.data.data.ids;
                                    console.log(this.selection)
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
                        });
                }
                else {
                    this.$message.warning("找不到这个用户");
                }
            },

            //清空选中
            resetChecked(){
                this.$refs.tree.setCheckedKeys([]);
            }
            ,
            //进行添加
            doAdd() {
                let arr = this.$refs.tree.getCheckedNodes();
                let data = [];
                arr.forEach((e, i,) => {
                    if (e.id !== 1 && e.id !== 2 && e.id !== 3 && e.id !== 4 && e.id !== 5 && e.id !== 6 && e.id !== 8 && e.id !== 7 && e.id !== 128) {
                        data.push(e.id)
                    }
                });
                if (data.length > 0) {
                    axios.post(" " + url + "/menu/saveUserMenu", {"username": this.name, "ids": data})
                        .then((res) => {
                            if (res.data.state === "1") {
                                this.$message.success(res.data.message);
                                this.addVisible=false;
                            }
                            else {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
                else {
                    this.$message.warning("选择不能为空");
                }
            }


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
                padding-left: 50px;
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
