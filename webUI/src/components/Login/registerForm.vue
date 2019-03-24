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
					<el-input placeholder="请输入密码" v-model="registerForm.password" show-password></el-input>
				</el-col>
			</el-form-item>
            <el-form-item label='确认密码' prop="confimePassword" size='mini'>
				<el-col :span="22">
					<el-input placeholder="请重新输入密码" v-model="registerForm.confimePassword" show-password></el-input>
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
    
    var roleOptions = [{value : 1, label : '系统管理员'}, 
						{value : 2, label : '系统审计员'}, 
						{value : 3, label : '系统游客就看看'}];

	export default {
		props : [],
		data() {
			return {
                roleOptions : roleOptions,
                registerForm : {
                    username : '',
                    password : '',
                    confimePassword : '',
                    role : ''
                },
                rules : {
                    username : [{required: true, message: '不能为空', trigger: 'blur' }],
                    password : [{required: true, message: '不能为空', trigger: 'blur' }],
                    confimePassword : [{required: true, message: '不能为空', trigger: 'blur' }],
                    role : [{required: true, message: '不能为空', trigger: 'blur' }],
                }
			};
		},
		components :{
		},
		methods: {
            submitForm () {

            },
            closeWin () {
                Bus.$emit('closeRegisterForm');
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
