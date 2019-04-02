<template>
    <div id='AdminMenu'>
        <el-col :span="12">
            <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
            <el-submenu index="/system" style='text-align: left;'>
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">设备管理</span>
                </template>
                <el-menu-item @click="handleChange" index="/system/user">管理员</el-menu-item>
            </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';

export default {
    methods: {
        handleChange(index, indexPath) {
            Bus.$emit('loadAdminUser');
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        }
    }
}
</script>

<style scoped>
    .el-col {
        width : 200px;
        overflow-x: hidden;
    }
</style>
