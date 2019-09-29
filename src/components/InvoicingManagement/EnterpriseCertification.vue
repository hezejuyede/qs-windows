<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>开票管理</el-breadcrumb-item>
                <el-breadcrumb-item>企业认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container" ref="container">
                <div class="containerDiv1" v-if="state==='1'">
                    企业暂未认证，请进行认证
                </div>
                <div class="containerDiv1" v-if="state==='3'">
                   信息审核中，请耐心等待
                </div>
                <div class="containerDiv2" v-if="state==='2'">
                    <div class="authenticationLogo">
                        <img :src="enterpriseInfo.img" alt="">
                    </div>
                    <div class="authenticationDiv">
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>企业名称</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.name" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>法定代表人</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.faren" :disabled="true"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="authenticationDiv">
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>统一社会信用代码</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.tyshyydm" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>工商注册号</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.gszch" :disabled="true"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="authenticationDiv">
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>纳税人识别号</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.nsrsbh" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>组织机构代码</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.zzjgdm" :disabled="true"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="authenticationDiv2">
                        <div class="authenticationDivInput">
                            <div class="authenticationInputLeft">
                                <span>注册地址</span>
                                <span>:</span>
                            </div>
                            <div class="authenticationInputRight">
                                <el-input v-model="enterpriseInfo.zcdz" :disabled="true"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="containerBtn">
                    <el-button type="primary" v-if="state==='1'" @click="showAdd">进行认证</el-button>
                    <el-button type="success" v-if="state==='2'" @click="showEdit">修改信息</el-button>
                </div>

            </div>
            <!--认证弹出框 -->
            <el-dialog title="进行企业认证" :visible.sync="addVisible" width="40%">
                <div class="" style="height: 450px;overflow: auto">
                    <el-form ref="form" label-width="150px" :model="ruleForm" :rules="rules">
                        <el-form-item label="企业名称" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="法定代表人" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="企业对公账号" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="企业开户行" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="充值金额" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="回执单">
                            <el-upload
                                v-loading="loading"
                                element-loading-text="正在上传中"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.8)"
                                :data="importData"
                                :action="uploadUrl"
                                list-type="picture-card"
                                :auto-upload="false"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doAdd" style="height:30px;width:80px">确 定</el-button>
            </span>
            </el-dialog>

            <!--编辑弹出框 -->
            <el-dialog title="修改企业认证" :visible.sync="editVisible" width="40%">
                <div class="" style="height: 450px;overflow: auto">
                    <el-form ref="form" label-width="150px" :model="ruleForm" :rules="rules">
                        <el-form-item label="企业名称" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="法定代表人" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="企业对公账号" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="企业开户行" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%"></el-input>
                        </el-form-item>
                        <el-form-item label="充值金额" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="回执单">
                            <el-upload
                                v-loading="loading"
                                element-loading-text="正在上传中"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.8)"
                                :data="importData"
                                :action="uploadUrl"
                                list-type="picture-card"
                                :auto-upload="false"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" style="height:30px;width:80px">取 消</el-button>
                <el-button type="primary" @click="doEdit" style="height:30px;width:80px">确 定</el-button>
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

    export default {
        name: 'WorkingProcedure',
        data() {
            return {
                message: '',
                HideModal: true,

                addVisible: false,
                editVisible: false,
                neirong:"",

                state: "2",
                enterpriseInfo: {
                    "img": require("../../../static/img/img.jpg"),
                    "name": "阿里巴巴（中国）网络技术有限公司",
                    "faren":"马云",
                    "tyshyydm":"233312dddee3rddsw3223322",
                    "gszch":"6552216553665541265",
                    "nsrsbh":"ddddddddd",
                    "zzjgdm":"dddddddd",
                    "zcdz":"打电话电话好的好的好的"
                },

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


            }
        },
        components: {Modal},
        mounted() {
            this.setDivHeight();
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

                }
            },
            //根据屏幕设置div高度
            setDivHeight() {
                let div = this.$refs.container;
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    var H = window.screen.height;
                    div.style.height = H - 170 + "px";
                }
                else {
                    var h = document.body.clientHeight;
                    div.style.height = h - 170 + "px";
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

            //显示新增
            showAdd() {
                this.addVisible = true;
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

            //显示编辑
            showEdit() {
                this.editVisible=true;

            },


            //双击点击行内编辑
            doEdit(row, column, cell, event) {
                this.id = row.id;
                axios.post(" " + url + "/anquan/jiluDetail", {"id": this.id})
                    .then((res) => {
                        if (JSON.stringify(res.data.data) !== "{}") {
                            this.editVisible = true;
                            this.line = parseInt(res.data.jiagongxian);
                            this.workStation = res.data.gongweiid;
                            this.name = res.data.username;
                            this.securityType = res.data.typeid;
                            this.neirong = res.data.neirong;
                        }
                        else {
                            this.message = "暂无数据";
                            this.HideModal = false;
                            const that = this;

                            function b() {
                                that.message = "";
                                that.HideModal = true;
                            }

                            setTimeout(b, 2000);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
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
        overflow: auto;
        background-color: @color-white;
        .crumbs {
            height: 50px;
            padding-top: 20px;
            padding-left: 20px;
        }
        .template-content {
            .container {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                width: 100%;
                .containerDiv1 {
                    width: 800px;
                    height: 500px;
                    border: 2px solid @color-F0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: @font-size-large-xxxxxxxx;

                }
                .containerDiv2 {
                    width: 800px;
                    height: 500px;
                    .authenticationLogo {
                        height: 150px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 100px;
                            height: 100px;
                            border-radius: 10px;
                        }
                    }
                    .authenticationDiv {
                        height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .authenticationDivInput {
                            flex: 1;
                            display: flex;
                            .authenticationInputLeft {
                                width: 120px;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                            }
                            .authenticationInputRight {
                                width: 280px;
                                height: 90px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .el-input {
                                    width: 260px;
                                }

                            }
                        }
                    }
                    .authenticationDiv2 {
                        height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .authenticationDivInput {
                            flex: 1;
                            display: flex;
                            .authenticationInputLeft {
                                width: 120px;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                            }
                            .authenticationInputRight {
                                width:680px;
                                height: 90px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .el-input {
                                    width: 660px;
                                }

                            }
                        }
                    }

                }
                .containerBtn {
                    width: 200px;
                    height: 50px;
                    position: absolute;
                    right: 100px;
                    top: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .el-button {
                        width: 130px;
                        height: 35px;
                    }
                }
            }

        }
    }


</style>
