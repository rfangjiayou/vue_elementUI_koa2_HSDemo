<template>
	<div id="app">
		<router-view></router-view>
		<!-- <BaseLayout/> -->
	</div>
</template>

<script>
import BaseLayout from './components/BaseLayout'
import LoginContainer from './components/Login/LoginContainer.vue'

export default {
	name: 'App',
	components: {
		'BaseLayout' : BaseLayout,
		'LoginContainer' : LoginContainer,
	},
	methods: {
		
	},
	mounted() {
		this.$router.push({path : '/login', name : 'login', component: LoginContainer});
	}
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

html body {
	height: 100%;
    margin : 0;
	overflow: hidden;
}
</style>
