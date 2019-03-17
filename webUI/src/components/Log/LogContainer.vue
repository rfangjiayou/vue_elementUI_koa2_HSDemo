<template>
    <div class="LogContainer">
        <LogMenu/>
        <el-main>
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
import LogMenu from './LogMenu.vue';

export default {
	data () {
		return {
			// msg: 'Welcome to Your Vue.js App'
		}
	},
	components : {
		'LogMenu' : LogMenu
	},
	mounted () {
	}
}
</script>

<style>

</style>

