<template>
    <div class="message">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message" @tab-click="changeList">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%" @row-click="oneMessageContent">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="allRead">全部标为已读</el-button>
                    </div>
                    <div class="pagination" v-show="this.unread.length>0">
                        <el-pagination background @current-change="unreadHandleCurrentChange" layout="prev, pager, next"
                                       :total="unreadLength">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="allDelete">删除全部</el-button>
                        </div>
                        <div class="pagination">
                            <el-pagination background @current-change="readHandleCurrentChange" layout="prev, pager, next"
                                           :total="readLength">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原信息</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="thoroughDel(scope.$index)">彻底删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="emptyTrash">清空回收站</el-button>
                        </div>
                        <div class="pagination">
                            <el-pagination background @current-change="recycleHandleCurrentChange" layout="prev, pager, next"
                                           :total="recycleLength">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <message-modal :messageShow="messageShow"
                       :messageId="messageId"
                       v-on:messageClose="messageClose">
        </message-modal>

    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import messageModal from '../../common/message';


    export default {
        name: 'InformationImport',
        data() {
            return {
                unreadPage: "",
                unreadLength:0,

                readPage: "",
                readLength:0,

                recyclePage: "",
                recycleLength:0,


                messageShow: true,
                messageId: '',

                message: 'first',
                showHeader: false,
                unread: [],
                read: [],
                recycle: []
            }
        },
        components: {messageModal},
        mounted() {


        },
        created() {
            this.getAdminState();
            this.getMessageList();

        },
        methods: {
            //单个标记为已经阅读
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                let id = item[0].id;
                this.read = item.concat(this.read);
                axios.post("/api/readMessage", {id: id})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经标记已读")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            //全部标记为已经阅读
            allRead() {
                let a = this.read;
                let b = this.unread;
                this.read = a.concat(b);
                this.unread.splice(0, this.unread.length);
                axios.post("/api/readMessage", {iunreadPage: this.unreadPage})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经全部标记已读")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });


            },
            //删除信息到回收站
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
                let id = item[0].id;
                axios.post("/api/deleteMessage", {id: id})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经删除成功")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            //全部删除
            allDelete() {
                let a = this.unread;
                let b = this.recycle;
                this.recycle = a.concat(b);
                this.read.splice(0, this.unread.length);
                axios.post("/api/allDeleteMessage", {iunreadPage: this.unreadPage})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经全部标记已读")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            //还原信息到已读
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
                let id = item[0].id;
                axios.post("/api/reductionMessage", {id: id})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经还原成功")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            //彻底删除
            thoroughDel(index) {
                const item = this.recycle.splice(index, 1);
                let id = item[0].id;
                axios.post("/api/thoroughDelMessage", {id: id})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经彻底删除")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            },
            //清空回收站
            emptyTrash() {
                this.recycle.splice(0, this.unread.length);
                axios.post("/api/emptyTrash", {iunreadPage: this.unreadPage})
                    .then((res) => {
                        if (res.data === "1") {
                            console.log("已经全部标记已读")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });

            },
            //页面加载检查用户是否登陆，没有登陆就加载登陆页面

            getAdminState() {
                const userInfo = localStorage.getItem("userInfo");
                if (userInfo === null) {
                    this.$router.push("/login")
                }
                else {


                }
            },

            //页面初始加载，加载第一个消息列表
            getMessageList() {
                axios.get("/api/messageList")
                    .then((res) => {
                        this.unread = res.data[0].unread;
                        this.unreadLength = res.data[0].unreadLength;

                        this.read = res.data[0].read;
                        this.readLength = res.data[0].readLength;

                        this.recycle = res.data[0].recycle;
                        this.recycleLength = res.data[0].recycleLength;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            //未读页面分页码发生改变
            unreadHandleCurrentChange(val) {
                axios.post("/api/getMessagePage",{"messageType":"unread","page":val})
                    .then((res) => {
                        this.unread = res.data[0].unread;
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            },
            //已读页面分页码发生改变
            readHandleCurrentChange(val) {
                axios.post("/api/getMessagePage", {"messageType":"read","page": val})
                    .then((res) => {
                        this.read = res.data[0].read;
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            },
            //删除页面分页码发生改变
            recycleHandleCurrentChange(val) {
                axios.post("/api/getMessagePage", {"messageType": "recycle", "page": val})
                    .then((res) => {
                        this.recycle= res.data[0].recycle;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },


            //根据点击Tab  动态加载那个消息列表
            changeList(tab, event) {
                if (tab.name === "first") {
                    axios.get("/api/messageList", {params: {"tabName": tab.name}})
                        .then((res) => {
                            this.unreadLength = res.data[0].unreadLength;
                            this.unread = res.data[0].unread;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
                else if (tab.name === "second") {
                    axios.get("/api/messageList", {params: {"tabName": tab.name}})
                        .then((res) => {
                            this.readLength = res.data[0].readLength;
                            this.read = res.data[0].read;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
                else if (tab.name === "third") {
                    axios.get("/api/messageList", {params: {"tabName": tab.name}})
                        .then((res) => {
                            this.recycleLength = res.data[0].recycleLength;
                            this.recycle = res.data[0].recycle;
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }
            },
            //关闭消息页面
            messageClose(val) {
                this.messageShow = val;
            },
            //点击消息显示消息详情
            oneMessageContent(row, event, column) {
                this.messageShow = false;
                this.messageId = row.id;

            }

        },
        computed: {
            unreadNum() {
                return this.unread.length;
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .message {
        width: 100%;
        height: 100%;
        background-color: @color-white;
        .crumbs {
            height: 30px;
            display: flex;
            align-items: center;
            padding-left: 2%;

        }
        .container {
            padding-top: 1%;
            padding-left: 2%;
            padding-right: 2%;
            padding-bottom: 1%;
            .message-title {
                cursor: pointer;

            }
        }
        button {
            width: 100px;
            height: 30px;
        }
    }


</style>
