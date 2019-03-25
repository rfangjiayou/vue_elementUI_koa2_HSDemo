<template>
    <div id='HeadMenu'>
        <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#344962"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
            <el-menu-item v-for="(item,i) in itemList" :key="i" :index="item.name">
            {{ item.item }}
            </el-menu-item>
        </el-menu>
        <el-button 
            type="info"
            size="mini" 
            icon="el-icon-setting" 
            @click="logOff">注销
        </el-button>
    </div>
</template>

<script>
    import LoginContainer from './Login/LoginContainer.vue'

    export default {
        data() {
            return {
                itemList:[
                    {name:'/policy',item:'策略'},
                    {name:'/log', item:'日志'},
                    {name:'/system', item:'系统'}
                ]
            };
        },
        methods: {
            logOff () {
                this.$confirm('是否注销当前用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal : false,
                    type: 'warning'
                })
                .then((action) => {
                    if(action == 'confirm'){
                        this.$router.push({path : '/login', name : 'login', component: LoginContainer});
                    }
                })
                .catch(() => {
                    /* this.$message({
                        type: 'info',
                        message: '已取消注销'
                    });  */         
                });
            },
            handleSelect(key, keyPath) {
                
            }
        }
    }
</script>

<style scoped>
    #HeadMenu {
        height: 60px;
        background-color:#344962;
        width: 100%;
        text-align: center;
    }
    .el-menu {
        display : inline-block;
        float: none;
    }
    .el-button {
        background-color:#344962;
        position: absolute;
        top : 15px;
        right : 10px;
    }
</style>
