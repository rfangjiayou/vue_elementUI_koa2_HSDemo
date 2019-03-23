<template>
	<div id='LoginForm'>
		<el-form ref="LoginForm" :model="LoginForm" :rules='rules' label-width="70px" label-position='left' class="demo-ruleForm">
            <el-form-item prop="username" size='mini'>
				<el-col :span="22">
					<el-input placeholder="请输入用户名" v-model="LoginForm.username"></el-input>
				</el-col>
			</el-form-item>
            <el-form-item prop="password" size='mini'>
				<el-col :span="22">
					<el-input placeholder="请输入密码" v-model="LoginForm.password" show-password></el-input>
				</el-col>
			</el-form-item>
            <el-row>
                <el-col :span="4">
					<el-button type="primary" size="mini" plain @click="login">登录</el-button>
				</el-col>
                <el-col :span="4" :offset='4'>
					<el-button type="primary" size="mini" plain @click="register">注册
                    </el-button>
				</el-col>
            </el-row>
		</el-form>
	</div>
</template>

<script>
	import Bus from '../../bus/bus.js';
	import PolicyContainer from '../Policy/PolicyContainer.vue';
	import ContentRewritePolicy from '../Policy/ContentRewritePolicy/ContentRewritePolicy.vue';

	export default {
		props : [],
		data() {
			return {
                LoginForm : {
                    username : '',
                    password : ''
                },
                rules : {
                    username : [{required: true, message: '不能为空', trigger: 'blur' }],
                    password : [{required: true, message: '不能为空', trigger: 'blur' }]
                }
			};
		},
		components :{
		},
		methods: {
            login () {
                this.$refs['LoginForm'].validate((valid) => {
                    if (valid) {
                        var api = '/api/login/login';
                        this.$axios.post(api, this.LoginForm)
                            .then((response) => {
                                if(response.status == 200){
                                    this.$router.push({path : '/policy', name : 'policy', component: PolicyContainer});
                                    // this.$router.push({path : '/policy/crpolicy', name : 'contentrewritepolicy', component: ContentRewritePolicy});
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: '用户名或密码错误'
                                    });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                });
            },

            register () {

            }
		},
		mounted () {
		},
		beforeDestroy () {
		}
	};
</script>

<style>
	
</style>

<style scoped>
    .el-form {
        padding : 10px;
        /* border-top:1px solid #d0d0d0;
        border-bottom:1px solid #d0d0d0;
		border-left:1px solid #d0d0d0;
		border-right:1px solid #d0d0d0; */
    }
    .el-form {
        position : absolute;
        bottom : 10%;
        right : 10%;
    }
    .el-form-item {
        margin : 20px 0 10px 80px;
    }
    .el-row {
        margin : 20px 0 0 2px;
        left: 45%;
    }
</style>
