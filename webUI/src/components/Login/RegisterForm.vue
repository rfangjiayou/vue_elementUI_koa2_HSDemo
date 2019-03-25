<template>
	<div id='registerForm'>
		<el-form ref="registerForm" :model="registerForm" :rules='rules' label-width="80px" label-position='left' class="demo-ruleForm">
            <el-form-item label='用户名' prop="username" size='mini'>
				<el-col :span="22">
					<el-input placeholder="请输入用户名" v-model="registerForm.username"></el-input>
				</el-col>
			</el-form-item>
            <el-form-item label='密码' prop="password" size='mini'>
				<el-col :span="22">
					<el-input :type='this.typePwd' placeholder="请输入密码" v-model="registerForm.password" show-password>
                        <i slot="suffix" style="cursor:pointer;"
                     class="el-icon-view" @click="showOrHidePwd('pwd')"></i>
                    </el-input>
				</el-col>
			</el-form-item>
            <el-form-item label='确认密码' prop="confimePassword" size='mini'>
				<el-col :span="22">
					<el-input :type='this.typeCPwd' placeholder="请重新输入密码" v-model="registerForm.confimePassword" show-password>
                        <i slot="suffix" style="cursor:pointer;"
                     class="el-icon-view" @click="showOrHidePwd('cpwd')"></i>
                    </el-input>
				</el-col>
			</el-form-item>
            <el-form-item label='角色' prop="role" size='mini'>
				<el-col :span="14">
                    <el-select v-model="registerForm.role" placeholder="请选择">
                        <el-option
                        v-for="item in this.roleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
				</el-col>
			</el-form-item>
            <el-row>
                <el-button type="primary" size="mini" plain @click="submitForm">确定</el-button>
                <el-button type="primary" size="mini" plain @click="closeWin">取消</el-button>
            </el-row>
		</el-form>
	</div>
</template>

<script>
    import Bus from '../../bus/bus.js';
    
	export default {
		props : [],
		data() {
            var roleOptions = [{value : 1, label : '系统管理员'}, 
                                {value : 2, label : '系统审计员'}, 
                                {value : 3, label : '系统游客就看看'}];
            var validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.password !== '') {
                        this.$refs.registerForm.validateField('confimePassword');
                    }
                    callback();
                }
            };
            var validateCPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
			return {
                typePwd : 'password',
                pwdHideFlag : false,
                typeCPwd : 'password',
                cpwdHideFlag : false,
                roleOptions : roleOptions,
                registerForm : {
                    username : '',
                    password : '',
                    confimePassword : '',
                    role : ''
                },
                rules : {
                    username : [{required: true, message: '不能为空', trigger: 'blur' }],
                    password : [{validator: validatePwd, trigger: 'blur' }],
                    confimePassword : [{validator: validateCPwd, trigger: 'blur' }],
                    role : [{required: true, message: '不能为空', trigger: 'blur' }],
                }
			};
		},
		components :{
		},
		methods: {
            submitForm () {
                this.$refs['registerForm'].validate((valid) => {
                    if(valid){
                        var api = '/api/login/register';
                        this.$axios.post(api, this.registerForm)
                            .then((response) => {
                                if(response.status == 200){
                                    this.closeWin();
                                    this.$message({
                                        type: 'success',
                                        message: '注册成功!'
                                    });
                                }
                            })
                            .catch((error) => {
                                this.$message({
                                    type: 'error',
                                    message: error.response.data.message
                                });
                                console.log(error);
                            })
                    }
                });
            },
            closeWin () {
                Bus.$emit('closeRegisterForm');
            },
            showOrHidePwd (value) {
                if(value == 'pwd'){
                    if(this.pwdHideFlag){
                        this.typePwd = 'password';
                    }else{
                        this.typePwd = 'text';
                    }
                    this.pwdHideFlag = !this.pwdHideFlag;
                }else if(value = 'cpwd') {
                    if(this.cpwdHideFlag){
                        this.typeCPwd = 'password';
                    }else{
                        this.typeCPwd = 'text';
                    }
                    this.cpwdHideFlag = !this.cpwdHideFlag;
                }
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
    .el-select {
        width: 303px;
    }
</style>
