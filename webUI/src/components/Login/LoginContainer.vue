<template>
    <div class="LoginContainer">
        <canvas id="Mycanvas"></canvas>
        <LoginForm/>
    </div>
</template>

<script>
import Bus from '../../bus/bus.js';
import LoginForm from './LoginForm.vue';
import index from '../../assets/js/main.js';

export default {
	data () {
		return {
		}
	},
	components : {
		'LoginForm' : LoginForm
    },
    methods : {
    },
	mounted () {
        index.load();
    },
    beforeDestroy () {
    }
}
</script>

<style>
    /* .Mycanvas {
        height: 100%;
        margin : 0;
    } */
</style>

