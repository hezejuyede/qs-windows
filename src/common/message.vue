<template>
    <div v-bind:class="{hideModal:messageShow}">
        <div class="modal">
            <div class="modal-message">
                <div class="messageTitle">
                    <div class="messageClose">
                        <i class="iconfont icon-guanbi1" @click="closeModal"></i>
                    </div>
                    <h1>{{title}}</h1>
                </div>
                <div class="messageContent">{{content}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'

    export default {
        name: 'message',
        data() {
            return {
                title: "",
                content: "",
            }
        },
        watch: {
            messageShow: {
                handler(newValue, oldValue) {
                    console.log(newValue);
                    if (newValue === false) {
                        axios.get("/api/getMessageContent",{params:{"messageId":this.messageId}})
                            .then((res) => {
                                this.title = res.data[0].title;
                                this.content = res.data[0].content;
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                },
                deep: true
            }
        },
        methods: {
            closeModal() {
                let flag = true;
                this.$emit('messageClose', flag);
            },
        },
        props: ['messageId', 'messageShow']
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/less/base";

    .modal {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: @color-background-d;
        .modal-message {
            width: 70%;
            height: 70%;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            color: @color-white;
            font-size: 20px;
            line-height: 100px;
            background-color: @color-white;
            .messageTitle {
                width: 100%;
                height: 10%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: @color-bg-hei;
                border-bottom: 1px solid @color-bg-hei;
                .messageClose {
                    height: 50px;
                    width: 50px;
                    display: flex;
                    font-size: @font-size-large;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    right: -25px;
                    top: -25px;
                    cursor: pointer;
                    overflow: hidden;
                    .icon-guanbi1 {
                        font-size: 250%;
                        color: @color-bg-red;
                    }

                }
            }
            .messageContent {
                width: 100%;
                height: 90%;
                line-height: @font-size-medium;
                padding-top: 2%;
                padding-left: 2%;
                padding-right: 2%;
                padding-bottom: 2%;
                overflow-y: auto;
                color: @color-bg-hei;
                font-size: @font-size-small;

            }
        }
    }

    .hideModal {
        display: none;
    }
</style>
