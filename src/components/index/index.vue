<template>
    <div class="template">
        <div class="crumbs">
            <i class="el-icon-s-home"></i>
            <span>系统首页</span>
        </div>
        <div class="templateTop">
            <div class="templateTopImg fl">
                <div class="templateTopBanner">
                    <swiper :options="swiperOption" ref="mySwiper">
                        <swiper-slide v-for="(item,index) in bannerImg" :key="item.id">
                            <img :src="item.img" style=" width: 100%;height: 390px">
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-scrollbar" slot="scrollbar"></div>
                    </swiper>
                </div>
            </div>
            <div class="templateTopInfo fl">
                <div class="userDiv">
                    <div class="user-avatar">
                        <img src="../../../static/img/img.jpg"  alt="">
                    </div>
                    <div class="user-info">
                        <div class="user-info-name">   <span>公司名：</span>{{name}}</div>
                        <div class="user-info-userId"> <span>用户名：</span>{{zhanghu}}</div>
                    </div>
                    <div class="user-history">
                        <div class="user-info-list">上次登录时间：<span>2019-10-01</span></div>
                        <div class="user-info-list">上次登录地点：<span>北京天安门</span></div>
                    </div>
                </div>
                <div class="userIcon">
                    <div class="IconTemplate" v-for="(item , index) in iconData" @click="goToPage(index,item.url)">
                        <i :class="item.icon"></i>
                        <span class="textStyle">{{item.text}}</span>
                        <span class="countStyle">{{item.count}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="templateBottom">

        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import url from '../../assets/js/URL'
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    require('swiper/dist/css/swiper.css');

    export default {
        name: 'index',
        data() {
            return {
                message: '',
                HideModal: true,
                name:"中国共产党",
                zhanghu:"习近平",
                role:"1151",
                bannerImg: [{"img": require("../../assets/img/banner1.jpg")}, {"img": require("../../assets/img/banner2.jpg")}],
                swiperOption: {
                    direction: "horizontal",
                    loop: true,
                    pagination: ".swiper-pagination",
                    prevButton: ".swiper-button-prev",
                    nextButton: ".swiper-button-next",
                    autoHeight:true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                },
                iconData: [
                    {"icon": "iconfont icon-icon", "text": "订单数量", "url": "/aqtixiangxuexi","count":2222},
                    {"icon": "iconfont icon-cheliangguanli", "text": "汽车数量", "url": "/aqjizhunxuexi","count":222},
                    {"icon": "iconfont icon-fl-renyuan", "text": "司机数量", "url": "/aqjizhunxuexi","count":222},
                    {"icon": "iconfont icon-dengdaizhifu", "text": "待支付数", "url": "/aqjizhunxuexi","count":22},
                    {"icon": "iconfont icon-yue", "text": "账户余额", "url": "/aqjizhunxuexi","count":22222},
                ]
            }
        },
        computed: {},
        components: {swiper, swiperSlide,},
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

                }
            },

        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .template {
        width: 100%;
        height: 100%;
        background-color: @color-F0;
        .crumbs {
            height: 50px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            background-color: @color-white;
            .el-icon-s-home{
                font-size: 180%;
                margin-right: 5px;
                color: @color-bg-lan;
            }
        }
        .templateTop {
            height: 400px;
            .templateTopImg {
                width: 60%;
                height: 400px;
                display: flex;
                align-items: center;
                justify-content: center;
                .templateTopBanner {
                    width: 98%;
                    height: 390px;
                    margin-top: 5px;
                }
            }
            .templateTopInfo {
                width: 40%;
                height: 100%;
                border-radius: 10px;
                .userDiv {
                    background-color: @color-white;
                    width: 100%;
                    height: 39%;

                    display: flex;
                    margin-top: 1%;
                    .user-avatar {
                        flex: 1;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                        }

                    }
                    .user-info {
                        flex: 2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                    .user-history{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                       flex: 2;
                    }

                }
                .userIcon{
                    height: 60%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: @color-white;

                    .IconTemplate {
                        flex: 1;
                        margin-bottom: 2%;
                        margin-left: 3%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        cursor: pointer;

                        .icon-icon {
                            display: block;
                            background-color: #F56C6C;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }
                        .icon-cheliangguanli {
                            display: block;
                            background-color: @color-bg-lan;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }
                        .icon-fl-renyuan {
                            display: block;
                            background-color: @color-bg-cs;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }
                        .icon-dengdaizhifu {
                            display: block;
                            background-color: #409EFF;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }
                        .icon-yue {
                            display: block;
                            background-color: #67C23A;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }
                        .icon-ruku {
                            display: block;
                            background-color: @color-bg-anLv;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }

                        .icon-chuli {
                            display: block;
                            background-color: @color-red;
                            color: @color-white;
                            border-radius: 20%;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            font-size: 500%;
                            text-align: center;
                        }
                        .textStyle {
                            font-size: @font-size-medium-x;
                            margin-top: 5%;
                            color: #909399
                        }
                        .countStyle {
                            margin-top: 5%;
                            font-size:@font-size-large-xxxx; ;
                            color: @color-bg-red;
                        }
                    }
                }

            }
        }
        .templateBottom {
            height: 50%;

        }
    }

    @media only screen and (max-width: 1400px) {
        .template {
            width: 1400px;
        }

    }


</style>
