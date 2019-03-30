<template>
    <div class="SyslogContainer">
        <el-row>
            <el-button type="primary" @click="exportLog" size='mini' plain icon="el-icon-download">导出日志</el-button>
            <el-button type="info" @click="resetDateFilter" size='mini' plain>清除日期过滤器</el-button>
            <el-form :rule='rules' ref='CreateLogForm' :model='CreateLogForm'>
                <el-form-item prop="total">
                    <el-input placeholder="请输入生成数据的总数" v-model="CreateLogForm.total" size='mini' class="input-with-select">
                        <el-button @click='createLog' slot="append" type="success" icon="el-icon-plus" size='mini' plain></el-button>
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
                :formatter='renderDatetime'
            >
            </el-table-column>
            <el-table-column
                prop="protection_type"
                label="攻击类型">
            </el-table-column>
            <el-table-column
                prop="severity"
                label="级别">
            </el-table-column>
            <el-table-column
                prop="client_ip"
                label="远程IP">
            </el-table-column>
            <el-table-column
                prop="hit_count"
                label="攻击次数">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';

export default {
    data () {
        var validatePass = (rule, value, callback) => {               
                                if(Number.isInteger(Number(value)) && Number(value) > 0){                
                                    callback();
                                }else{                 
                                    callback(new Error("请输入有效数字"));               
                                }             
                            };
		return {
            CreateLogForm:{
                total : ''
            },
            tableData : [{
                date : '',
                severity : '',
                protection_type : '',
                client_ip : '',
                hit_count : ''
            }],
            rules : {
                total : [{validator: validatePass, trigger: 'blur'}]
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
        renderDatetime (row, column, cellValue, index) {
            let time = new Date(parseInt(row.time)),
                year = time.getFullYear(),
                month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
                day = time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate(),
                hour = time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours(),
                minute = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes(),
                second = time.getSeconds() < 10 ? ('0' + time.getSeconds()) : time.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        },
        loadSystemLog () {
            var url = '/api/systemlog/getObject';
            Bus.$emit('mask');
            this.$axios.get(url)
            .then((response) => {
                Bus.$emit('unmask');
                if(response.status == 200){
                    this.tableData = response.data;
                }
            })
            .catch((error) => {
                Bus.$emit('unmask');
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
        createLog () {
            this.$refs['CreateLogForm'].validate((valid) => {
                if(valid) {
                    this.$confirm('是否随机生成'+ this.CreateLogForm.total +'条日志？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal : false,
                        type: 'warning'
                    })
                    .then((action) => {
                        if(action == 'confirm'){
                            Bus.$emit('mask');
                            let url = '/api/systemlog/createObject';
                            this.$axios.post(url, this.CreateLogForm)
                                .then((response) => {
                                    Bus.$emit('unmask');
                                    this.loadSystemLog();
                                })
                                .catch((error) => {
                                    Bus.$emit('unmask');
									console.log(error);
								});;
                        }
                    })
                    .catch(() => {
                        /* this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });  */         
                    });
                }
            });
        }
    },
    mounted () {
        Bus.$on('loadsystemlog', () => {
            this.loadSystemLog();
        });
        this.loadSystemLog();
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
