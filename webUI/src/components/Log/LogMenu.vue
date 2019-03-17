<template>
    <div id='LogMenu'>
        <el-col :span="12">
            <el-menu
            :default-active="this.$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
            <el-submenu index="/log" style='text-align: left;'>
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">日志</span>
                </template>
                <el-submenu index="/policy/protectionrules">
                    <template slot="title">防护规则</template>
                    <el-menu-item index="/policy/protectionrules/predefinedrules">预定义规则</el-menu-item>
                    <el-menu-item index="/policy/protectionrules/customrules">自定义规则</el-menu-item>
                </el-submenu>
            </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    export default {
        methods: {
            handleChange(index, indexPath) {
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
