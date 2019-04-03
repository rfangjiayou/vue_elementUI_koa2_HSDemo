<template>
    <div class="PolicyContainer">
        <PolicyMenu/>
        <el-main v-loading="this.pictLoading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.3)">
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';
import PolicyMenu from './PolicyMenu.vue';

export default {
	data () {
		return {
			pictLoading : false
		}
	},
	components : {
		'PolicyMenu' : PolicyMenu
    },
    methods : {
    },
	mounted () {
        Bus.$on('mask', () => {
            this.pictLoading = true;
        });
        Bus.$on('unmask', () => {
            this.pictLoading = false;
        });
    },
    beforeDestroy () {
        Bus.$off('mask');
        Bus.$off('unmask');
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
		overflow: hidden;
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

