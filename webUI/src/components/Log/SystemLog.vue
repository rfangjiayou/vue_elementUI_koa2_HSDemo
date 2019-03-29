<template>
    <div>
        <el-row>
            <el-button type="primary" @click="exportLog" size='mini' plain icon="el-icon-download">导出日志</el-button>
            <el-button type="info" @click="resetDateFilter" size='mini' plain>清除日期过滤器</el-button>
            <el-form :rule='rules'>
                <el-form-item prop="total">
                    <el-input placeholder="请输入生成数据的总数" v-model="total" size='mini' class="input-with-select">
                        <el-button slot="append" type="success" icon="el-icon-plus" size='mini' plain></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table ref="systemlog" :data="tableData" size='mini' stripe>
            <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180"
                column-key="date"
                :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';

export default {
    data () {
		return {
            total : '',
            tableData : [{
                date : '2019-03-29',
                name : '',
                address : ''
            }],
            rules : {
                total : [{required: false, message: '不能为空', trigger: 'blur' }]
            }
		}
    },
    methods : {
        exportLog () {

        },
        filterHandler () {

        },
        resetDateFilter () {

        },
        loadSystemLog () {
            var url = '/api/systemlog/getObject';
            // Bus.$emit('mask');
            this.$axios.get(url)
            .then((response) => {
                if(response.status == 200){
                    // Bus.$emit('unmask');
                }
            })
            .catch((error) => {
                if(error.response.status == 401){
                    this.$router.push({path : '/'});
                    this.$message = {
                        type: 'error',
                        message: '用户认证失败!'
                    }
                }
                console.log(error);
            });
        },
        openWin () {
            this.dialogVisible = true;
        },
        closeWin () {
            this.dialogVisible = false;
        }
    },
    mounted () {
        Bus.$on('loadsystemlog', () => {
            // this.loadSystemLog();
        });
        // this.loadSystemLog();
    },
    beforeDestroy () {
        Bus.$off('loadsystemlog');
    }
}
</script>

<style scoped>
    .el-row {
        text-align: left;
		padding: 10px;
    }
    .el-table {
        border-top:1px solid #d0d0d0;
    }
    .el-form {
        display: inline-block;
        position: absolute;
        right:10px;
    }
    .el-input {
        width : 200px;
        position:absolute;
        right:10px;
    }
</style>
