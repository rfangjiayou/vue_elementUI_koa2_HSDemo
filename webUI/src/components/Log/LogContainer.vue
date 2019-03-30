<template>
    <div class="LogContainer">
        <LogMenu/>
        <el-main v-loading="this.pictLoading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中">
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';
import LogMenu from './LogMenu.vue';

export default {
	data () {
		return {
			pictLoading : false
		}
	},
	components : {
		'LogMenu' : LogMenu
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

</style>

