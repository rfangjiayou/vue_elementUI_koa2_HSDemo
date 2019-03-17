<template>
    <div id='PolicyMenu'>
        <el-col :span="12">
            <el-menu
            :default-active="this.$route.path"
            size='mini'
            @open="handleOpen"
            @close="handleClose"
            router>
            <el-submenu index="/" style='text-align: left;'>
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>策略类型</span>
                </template>
                <el-menu-item @click="handleChange" index="/policy/securitypolicy">安全策略</el-menu-item>
                <el-menu-item @click="handleChange" index="/policy/crpolicy">内容改写策略</el-menu-item>
            </el-submenu>
            <el-submenu index="/policy/protectionrules" style='text-align: left;'>
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">防护规则</span>
                    </template>
                    <el-menu-item index="/policy/protectionrules/predefinedrules">预定义规则</el-menu-item>
                    <el-menu-item index="/policy/protectionrules/customrules">自定义规则</el-menu-item>
            </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import Bus from '../../bus/bus.js';

    export default {
        methods: {
            handleChange(self) {
                if(self.index == '/policy/crpolicy'){
                    this.loadCRPolicy();
                }
            },
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            loadCRPolicy () {
                var url = '/api/policy/getObject';
                this.$axios.get(url)
                .then((response) => {
                    if(response.status == 200){
                        var returnData = response.data;
                        Bus.$emit('crpolicyLoadSuccess', returnData);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
        mounted () {
            Bus.$on('loadCRPolicy', () => {
				this.loadCRPolicy();
			});
            this.loadCRPolicy();
        },
        beforeDestroy () {
			Bus.$off('loadCRPolicy');
		}
    }
</script>

<style scoped>
    .el-col {
        width : 200px;
    }
    .el-menu {
        border-right:0px;
    }
</style>
