<template>
    <div id='HeadMenu'>
        <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
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
            >注销
        </el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                itemList:[
                    {name:'/policy',item:'策略'},
                    {name:'/log', item:'日志'}
                ]
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                
            }
        }
    }
</script>

<style scoped>
    #HeadMenu {
        height: 60px;
        background-color:#545c64;
        width: 100%;
        text-align: center;
    }
    .el-menu {
        display : inline-block;
        float: none;
    }
    .el-button {
        background-color:#545c64;
        position: absolute;
        top : 15px;
        right : 10px;
    }
</style>
