<template>
    <div class="SyslogContainer">
        <el-row>
            <el-button type="primary" @click="exportLog" size='mini' plain icon="el-icon-download">导出日志</el-button>
            <el-button type="info" @click="clearDateFilter" size='mini' plain>清除日期过滤器</el-button>
            <el-form :rule='rules' ref='CreateLogForm' :model='CreateLogForm'>
                <el-form-item prop="total">
                    <el-input placeholder="请输入生成数据的总数" v-model="CreateLogForm.total" size='mini' class="input-with-select">
                        <el-button @click='createLog' slot="append" type="success" icon="el-icon-plus" size='mini' plain></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-table ref="systemlog" id="systemlog-table" :data="tableData" size='mini' height="100%" stripe>
            <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180"
                column-key="date"
                :filters="[{text: '最近一小时', value: '3600000'}, {text: '最近一天', value: '86400000'}, {text: '最近一周', value: '7 * 86400000'}, {text: '最近一月', value: '30 * 86400000'}]"
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
                label="级别"
                :formatter='renderSeverity'>
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
 // 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";

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
            this.$confirm('是否导出全部日志？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal : false,
                type: 'warning'
            })
            .then((action) => {
                if(action == 'confirm'){
                    /* 从表生成工作簿对象 */
                    let wb = XLSX.utils.table_to_book(document.querySelector("#systemlog-table"));
                    /* 获取二进制字符串作为输出 */
                    let wbout = XLSX.write(wb, {
                        bookType: "xlsx",
                        bookSST: true,
                        type: "array"
                    });
                    try {
                        FileSaver.saveAs(
                        //Blob 对象表示一个不可变、原始数据的类文件对象。
                        //Blob 表示的不一定是JavaScript原生格式的数据。
                        //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                        //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                        new Blob([wbout], { type: "application/octet-stream" }),
                        //设置导出文件名称
                        "log.xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }
                    return wbout;
                }
            })
            .catch(() => {
                /* this.$message({
                    type: 'info',
                    message: '已取消删除'
                });  */         
            });
        },
        filterHandler (value, row) {
            let dateTime = new Date(row.time).getTime(),
                current = new Date().getTime()
            return dateTime > current - value;
        },
        clearDateFilter () {
            this.$refs.systemlog.clearFilter('date');
        },
        renderDatetime (row, column, cellValue, index) {
            let dateTime = this.getLocalTime(+8, row.time),
                year = dateTime.getFullYear(),
                month = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1,
                day = dateTime.getDate() < 10 ? ('0' + dateTime.getDate()) : dateTime.getDate(),
                hour = dateTime.getHours() < 10 ? ('0' + dateTime.getHours()) : dateTime.getHours(),
                minute = dateTime.getMinutes() < 10 ? ('0' + dateTime.getMinutes()) : dateTime.getMinutes(),
                second = dateTime.getSeconds() < 10 ? ('0' + dateTime.getSeconds()) : dateTime.getSeconds();
            
            let data = [], time = [];
            data.push(year);
            data.push(month);
            data.push(day);
            time.push(hour);
            time.push(minute);
            time.push(second);
            // dataTime.push(date.split('T')[0]);
            // dataTime.push(date.split('T')[1].split('.')[0]);
            return data.join('-') + ' ' + time.join(':');
        },
        renderSeverity (row, column, cellValue, index) {
            let value = '';
            if(row.severity == 0){
                value = '低';
            }else if(row.severity == 1){
                value = '中';
            }else if(row.severity == 2){
                value = '高';
            }else if(row.severity == 3){
                value = '严重';
            }
            return value;
        },
        loadSystemLog () {
            var url = '/api/systemlog/getObject';
            Bus.$emit('mask');
            this.$axios.get(url)
            .then((response) => {
                Bus.$emit('unmask');
                if(response.status == 200){
                    this.tableData = response.data;
                    this.CreateLogForm.total = '';
                }
            })
            .catch((error) => {
                Bus.$emit('unmask');
                this.CreateLogForm.total = '';
                if(error.response.status == 401){
                    window.location.reload();
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
                                    this.$notify({
                                        title: '成功',
                                        message: '测试数据生成成功',
                                        type: 'success',
                                        offset: 100 
                                    });
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
        },
        getLocalTime (i, d) {
            //参数i为时区值数字，比如北京为东八区则输入+8,西5输入-5
            //参数d为要转换的时间
            var len = new Date(d).getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = new Date(d).getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = len + offset;
            return new Date(utcTime + 3600000 * i);
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
    .SyslogContainer {
		height: 100%;
	}
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
