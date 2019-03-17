<template>
    <div class="PolicyContainer">
        <PolicyMenu/>
        <el-main>
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
import PolicyMenu from './PolicyMenu.vue';
import SecurityPolicy from './SecurityPolicy/SecurityPolicy.vue';

export default {
	data () {
		return {
			// msg: 'Welcome to Your Vue.js App'
		}
	},
	components : {
		'PolicyMenu' : PolicyMenu,
		'SecurityPolicy' : SecurityPolicy
	},
	mounted () {
	}
}
</script>

<style>
    .el-main {
        /* background-color: #E9EEF3; */
        background-color: white;
        color: #333;
        text-align: center;
        padding: 0px;
        border-left:1px solid #d0d0d0;
    }

    .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
		line-height: 15px;
	}

    label {
		position: relative;
    	top: 7px;
	}

    .el-checkbox {
        position: relative;
    	top: 0px;
    }

    .el-dialog__body {
        padding: 15px 20px 10px;
    }

    .el-dialog__header {
		padding: 15px 0px 0px 0px;
	}
</style>

