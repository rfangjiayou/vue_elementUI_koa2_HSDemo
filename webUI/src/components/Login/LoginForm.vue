<template>
	<div id='LoginForm'>
        <el-dialog title="注册" :visible.sync="dialogVisible"  v-if="dialogVisible" :close-on-click-modal='false' width="450px">
			<RegisterForm v-on:closeWin='closeWin'/>
		</el-dialog>
		<el-form ref="LoginForm" :model="LoginForm" :rules='rules' label-width="70px" label-position='left' class="demo-ruleForm">
            <el-form-item prop="username" size='mini'>
				<el-col :span="22">
					<el-input placeholder="请输入用户名" v-model="LoginForm.username"></el-input>
				</el-col>
			</el-form-item>
            <el-form-item prop="password" size='mini'>
				<el-col :span="22">
					<el-input :type='this.type' placeholder="请输入密码" v-model="LoginForm.password" @keyup.enter.native="login">
                        <i slot="suffix" style="cursor:pointer;"
                     class="el-icon-view" @click="showOrHidePwd"></i>
                    </el-input>
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
	import RegisterForm from './RegisterForm.vue';
	import PolicyContainer from '../Policy/PolicyContainer.vue';
	import ContentRewritePolicy from '../Policy/ContentRewritePolicy/ContentRewritePolicy.vue';

	export default {
		props : [],
		data() {
			return {
                dialogVisible : false,
                type : 'password',
                hideFlag : false,
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
            RegisterForm : RegisterForm
		},
		methods: {
            register () {
				this.dialogVisible = true;
			},
            closeWin () {
				this.dialogVisible = false;
			},
            login () {
                this.$refs['LoginForm'].validate((valid) => {
                    if (valid) {
                        var api = '/api/login/login';
                        this.$axios.post(api, this.LoginForm)
                            .then((response) => {
                                if(response.status == 200){
                                    /* let payload = {name: 'qqq', role: u, token: 'ncbnv'}
                                      this.$store.commit(types.USER, payload) */
                                    localStorage.setItem('token', response.data.token);
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
            showOrHidePwd () {
                if(this.hideFlag){
                    this.type = 'password';
                }else{
                    this.type = 'text';
                }
                this.hideFlag = !this.hideFlag;
            }
		},
        mounted () {
            Bus.$on('closeRegisterForm', () => {
                this.closeWin();
            });
		},
		beforeDestroy () {
            Bus.$off('closeRegisterForm');
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
