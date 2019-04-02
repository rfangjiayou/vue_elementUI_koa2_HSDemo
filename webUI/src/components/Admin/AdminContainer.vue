<template>
    <div class="AdminContainer">
        <AdminMenu/>
        <el-main v-loading="this.pictLoading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中">
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';
import AdminMenu from './AdminMenu.vue';

export default {
	data () {
		return {
			pictLoading : false
		}
	},
	components : {
		'AdminMenu' : AdminMenu
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
		overflow: hidden;
	}
</style>

