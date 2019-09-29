<template>
    <div class="login-wrap">
        <div class="mesLogo">
            <div class="ms-logo">
                <div class="">泉胜物流开票系统</div>
            </div>
            <div class="ms-login">
                <div class="ms-title">用户登录</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="用户名">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" >
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                    <div class="register-div">
                       <span @click="goTo">注册</span>
                    </div>
                </el-form>
            </div>
            <div class="ms-bottom">
                ©2019 山东泉胜物流集团有限公司
            </div>
        </div>
        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import Modal from '../../common/modal'
    import url from '../../assets/js/URL'
    export default {
        components: {Modal},
        data: function(){
            return {
                message: '',
                HideModal: true,

                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post("  "+ url +"/api/login.html", {"username": this.ruleForm.username, "password": this.ruleForm.password})
                            .then((res) => {
                                if (res.data.state === "1") {
                                    let userInfo = res.data;
                                    userInfo = JSON.stringify(userInfo);
                                    let token = "abcdefg";
                                    localStorage.setItem('token', "Bearer"+token);
                                    localStorage.setItem("userInfo", userInfo);
                                    localStorage.setItem('ms_username',res.data.username);
                                    this.message = "登录成功";
                                    this.HideModal = false;
                                    const that = this;
                                    function a() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.$router.push('/');
                                    }
                                    function showPromptBox() {
                                        that.openPromptBox = false;
                                        that.needKnown = res.data.needKnown;
                                        that.contentText = res.data.contentText;
                                    }
                                    setTimeout(showPromptBox, 3000);
                                    setTimeout(a, 2000);
                                }
                                else if (res.data === "2") {
                                    this.message = "该用户没有注册";
                                    this.HideModal = false;
                                    const that = this;
                                    function b() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.username = '';
                                        that.password = '';
                                    }
                                    setTimeout(b, 2000);
                                }
                                else if (res.data === "-1") {
                                    this.message = "密码错误";
                                    this.HideModal = false;
                                    const that = this;
                                    function c() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.password = '';
                                    }
                                    setTimeout(c, 2000);
                                }
                                else if (res.data === "-2") {
                                    this.message = "权限不足";
                                    this.HideModal = false;
                                    const that = this;
                                    function d() {
                                        that.message = "";
                                        that.HideModal = true;
                                        that.password = '';
                                    }
                                    setTimeout(d, 2000);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    }
                    else {
                        this.message = "请正确填写信息";
                        this.HideModal = false;
                        const that = this;
                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }
                        setTimeout(a, 2000);
                        return false;
                    }
                });
            },
            goTo(){
                this.$router.push("/register")
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login.jpg);
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        .mesLogo{
            width: 400px;
            .ms-logo{
                width: 400px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size:@font-size-large-xxxxxxxx;
                color: @color-white;
            }
            .ms-login{
                border-radius: 15px;
                background: rgba(255,255,255, 0.7);
                .ms-title{
                    width:100%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    font-size:20px;
                    color: @color-white;
                    border-bottom: 1px solid #ddd;
                    background-image: url(../../assets/img/top-left.jpg);
                    background-size: cover;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                }
                .ms-content{
                    padding: 30px 30px;
                }
                .login-btn{
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .login-btn button{
                    width:100%;
                    height:35px;
                    font-size: @font-size-large-x;
                }
                .register-div{
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    color: @color-bg-lv;
                    font-size: @font-size-large;
                   span{
                       cursor: pointer;
                   }
                }
                .el-button{
                    margin-left: 0px;
                }
            }
            .ms-bottom{
                height: 100px;
                text-align: center;
                line-height: 100px;
                font-size: 18px;
                color: #f7f7f7f7;
            }
        }
    }


</style>

