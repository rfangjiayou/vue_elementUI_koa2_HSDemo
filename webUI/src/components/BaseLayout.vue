<template>
    <div class="baselayout">
        <el-container >
			<HeadMenu/>
			<router-view style='display: flex;position:absolute;top: 60px;bottom: 0px;width: 100%;'></router-view>
        </el-container>
    </div>
</template>

<script>
import Head from './Head.vue';
import HeadMenu from './HeadMenu.vue';
import PolicyContainer from './Policy/PolicyContainer.vue';

export default {
	data () {
		return {
			// msg: 'Welcome to Your Vue.js App'
		}
	},
	components : {
		'HeadMenu' : HeadMenu
	},
	mounted () {
		this.$router.push({path : '/policy', name : 'policy', component: PolicyContainer});
	}
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.5.4/lib/theme-chalk/index.css");
	.el-header {
		background-color:#545c64;
		color: #333;
		text-align: center;
	}

	.el-submenu .el-menu-item, .el-submenu__title{
        height: 40px;
        line-height: 40px;
    }

	/* .el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
		line-height: 15px;
	}

	label {
		position: relative;
    	top: 7px;
	} */

	/* body > .el-container {
		margin-bottom: 40px;
	} */

</style>

