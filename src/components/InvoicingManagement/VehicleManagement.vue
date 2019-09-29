<template>
    <div class="template">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>开票管理</el-breadcrumb-item>
                <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="template-content">
            <div class="container">
                <div class="handle-box">
                    <label style="margin-right: 10px">
                        <el-input v-model="select_word" placeholder="智能检索车辆" style="width: 150px"></el-input>
                    </label>
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>日期</span>
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
                    <label style="margin-right: 5px;margin-left: 5px">
                        <span>审核状态</span>
                        <span>:</span>
                        <el-select
                            style="width: 120px"
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
                    <label style="margin-right: 10px;margin-left: 10px">
                        <span>车牌号</span>
                        <span>:</span>
                        <el-input v-model="carNumber" placeholder="车牌号" style="width: 150px"></el-input>
                    </label>
                    <el-button type="primary"  @click="doSearch">查询记录</el-button>
                    <el-button type="success"  @click="showAdd">新增车辆</el-button>
                    <el-button type="danger"  @click="showBatch">批量删除</el-button>
                </div>
                <div class="">
                    <el-table class="tb-edit"
                              :data="tables"
                              :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'16px'}"
                              border
                              :height="this.tableHeight"
                              @select="selectList"
                              @select-all="selectAll"
                              @selection-change="selectionChange"
                              ref="moviesTable"
                              highlight-current-row
                              style="width: 98%;margin: auto">
                        <el-table-column
                            type="selection"
                            width="30">
                        </el-table-column>
                        <template v-for="(col ,index) in cols">
                            <el-table-column
                                align="center"
                                :prop="col.prop"
                                v-if="col.prop !=='statusStr'"
                                :label="col.label"></el-table-column>
                            <el-table-column
                                align="center"
                                v-if="col.prop==='statusStr'"
                                :prop="col.prop" :label="col.label">
                                <template slot-scope="scope">
                                    <div class="" style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center">
                                        <span>{{scope.row.statusStr}}</span>
                                    </div>
                                    <div class="" style="width: 100%;height: 50%;display: flex;align-items: center;justify-content: center">
                                        <span  style="color: #3EC455;cursor: pointer" @click="examineClick(scope.row)">审核详情</span>
                                    </div>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column
                            align="center"
                            label="操作"
                            width="150">
                            <template slot-scope="scope">
                                <el-button @click="seeClick(scope.row)"      style="width: 30px;height: 25px" type="primary">查看</el-button>
                                <el-button @click="editClick(scope.row)"     style="width: 30px;height: 25px" type="success">编辑</el-button>
                                <el-button @click="deleteClick(scope.row)"   style="width: 30px;height: 25px" type="danger">删除</el-button>
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
            <el-dialog title="申请开票" :visible.sync="addVisible" width="40%" :close-on-click-modal="false">
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


            <!-- 审核弹出框 -->
            <el-dialog title="审核详情" :visible.sync="examineVisible" width="40%" :close-on-click-modal="false">
                <el-table
                    :data="shTableData"
                    :header-cell-style="{background:'#A1D0FC',color:' rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                    border
                    :height="400"
                    style="width: 98%;margin: 0 auto">
                    <el-table-column
                        prop="pici"
                        label="审核时间"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="stationname"
                        label="审核人员"
                        align="center"
                        min-width="15%">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="审核结果"
                        align="center"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="反馈详情"
                        align="center"
                        min-width="40%">
                    </el-table-column>
                </el-table>
            </el-dialog>

            <!-- 查看弹出框 -->
            <el-dialog title="查看记录" :visible.sync="seeVisible" width="60%" :close-on-click-modal="false">
                <div class="" style="height: 500px;overflow: auto">
                    <el-form ref="form" label-width="150px" :model="ruleForm" :rules="rules">
                        <el-form-item label="企业名称" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="法定代表人" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="企业对公账号" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="企业开户行" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="充值金额" prop="name">
                            <el-input v-model="ruleForm.name" style="width: 80%" type="number" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="回执单">
                            <div class="" style="width: 80%;height: 200px">
                                <viewer :images="imgs">
                                    <img v-for="src in imgs" :src="src.url" :key="src.title" style="width: 100%;height: 100%">
                                </viewer>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>


            <!-- 编辑弹出框 -->
            <el-dialog title="编辑记录" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
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
                        "label": "编号"
                    },
                    {
                        "prop": "chepiaohao",
                        "label": "车牌号"
                    },
                    {
                        "prop": "sijiming",
                        "label": "车牌颜色"
                    },
                    {
                        "prop": "kaipiaozongjine",
                        "label": "车型"
                    },
                    {
                        "prop": "sijiyunfei",
                        "label": "规格（米）"
                    },
                    {
                        "prop": "fuwufeilv",
                        "label": "品牌"
                    },
                    {
                        "prop": "fuwufei",
                        "label": "载重"
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
                val:[],
                listData:[],


                select_word: '',
                examineTime: "",
                carNumber: "",
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

            //选择那个一个
            selectList(val) {
                this.val =val;
                if (val.length) {
                    let data = [];
                    for (let i = 0; i < val.length; i++) {
                        let a = val[i].id;
                        data.push(a)
                    }
                    this.listData = data;

                }
                else {
                    this.listData=[];

                }
            },

            //列表全部选择
            selectAll(val) {
                this.selectList(val)
            },

            //选择改变
            selectionChange(val) {
                this.selectList(val)
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
                this.delVisible = true;


            },

            //取消删除
            cancelDelete() {
                this.delVisible = false;
            },

            //进行删除
            deleteRow() {

            },
            showBatch() {
                this.delVisible = true;
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
