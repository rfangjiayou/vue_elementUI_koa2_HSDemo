<template>
    <div id="RulesStatistics">
        <el-row class='btn'>
            <el-button type="primary" @click="expandAll" size='mini' plain icon="el-icon-circle-plus-outline">展开所有</el-button>
            <el-button type="primary" @click="closeAll" size='mini' plain icon="el-icon-remove-outline">关闭所有</el-button>
        </el-row>
        <div class='tabPanle'>
            <el-row :gutter="12">
                <el-col :span="12">
                    <el-card shadow="hover">
                        <el-collapse v-model="activeNames" @change="handleChangeAttackType">
                            <el-collapse-item name="AttackType">
                                <template slot="title">
                                    <el-row class="tbarpanel">
                                        <el-col :span="2">
                                            <label>攻击类型</label>
                                        </el-col>
                                        <el-col :span="4" :offset='16'>
                                            <el-select v-model="DatetimeSelect" @change="changeDate($event, 'attack')" size='mini' placeholder="请选择">
                                                <el-option
                                                v-for="item in this.DatetimeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="2">
                                            <el-button @click.native.stop="loadAttackType" size='mini' circle icon="el-icon-refresh" style="position:relative;top:0px;left:1px"></el-button>
                                        </el-col>    
                                    </el-row>
                                </template>
                                <AttackType/>
                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card shadow="hover">
                        <el-collapse v-model="activeNames" @change="handleChangeSeverity">
                            <el-collapse-item name="Severity">
                                <template slot="title">
                                    <el-row class="tbarpanel">
                                        <el-col :span="2">
                                            <label>严重级别</label>
                                        </el-col>
                                        <el-col :span="4" :offset='16'>
                                            <el-select v-model="DatetimeSelect" @change="changeDate($event, 'severity')" size='mini' placeholder="请选择">
                                                <el-option
                                                v-for="item in this.DatetimeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="2">
                                            <el-button @click.native.stop="loadSeverity" size='mini' circle icon="el-icon-refresh" style="position:relative;top:0px;left:1px"></el-button>
                                        </el-col>    
                                    </el-row>
                                </template>
                                <Severity/>
                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Bus from '../../../bus/bus.js'
import AttackType from './AttackType.vue'
import Severity from './Severity.vue'

export default {
    data() {
        let DatetimeOptions = [
            {value : 'hour', label : '最近一小时'},
            {value : 'day', label : '最近一天'},
            {value : 'week', label : '最近一周'},
            {value : 'month', label : '最近一月'}
        ];
        return {
            activeNames : [],
            DatetimeSelect : 'hour',
            DatetimeOptions : DatetimeOptions
        }
    },
    components: {
        'AttackType' : AttackType,
        'Severity' : Severity
    },
    methods : {
        expandAll () {
            this.activeNames.push('AttackType');
            this.activeNames.push('Severity');
            this.loadAttackType();
            this.loadSeverity();
        },
        closeAll () {
            this.activeNames = [];
        },
        changeDate (value, type) {
            if(type == 'attack'){
                this.loadAttackType();
            }else if(type == 'severity'){
                this.loadSeverity();
            }
        },
        handleChangeAttackType (active) {
            if(active.length > 0){
                this.loadAttackType();
            }
        },
        handleChangeSeverity (active) {
            if(active.length > 0){
                this.loadSeverity();
            }
        },
        loadAttackType(){
            Bus.$emit('loadattacktype', this.DatetimeSelect);
        },
        loadSeverity () {
            Bus.$emit('loadseverity', this.DatetimeSelect);
        }
    }
}
</script>

<style scoped>
    #RulesStatistics{
        height : 100%;
    }

    .el-button{
        position : relative;
        bottom: 5px;
        right: 5px;
    }

    .btn {
        height : 49px;
        text-align: left;
		background-color:white;
        border-bottom:1px solid #d0d0d0;
    }

    .el-row {
        padding: 15px;
    }

    /* .el-collapse-item__content {
        padding-bottom: 0 !important;
    } */

    .tbarpanel {
        display : contents;
        padding : 0;
    }

    .tabPanle {
        overflow: auto;
        height: 100%;
    }
</style>