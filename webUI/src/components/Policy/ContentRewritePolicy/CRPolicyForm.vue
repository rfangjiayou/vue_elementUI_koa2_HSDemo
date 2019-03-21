<template>
	<div id='CRPolicyForm'>
		<el-form ref="CRPolicyForm" :model="CRPolicyForm" :rules="rules" label-width="150px" label-position='left' class="demo-ruleForm">
			<el-form-item label="名称" prop="name" size='mini'>
				<el-col :span="20">
					<el-input v-model="CRPolicyForm.name"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="内容改写方向" prop="actionDirection" size='mini'>
				<el-radio-group v-model="CRPolicyForm.actionDirection">
					<el-radio :label="1">请求</el-radio>
					<el-radio :label="2">响应</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form ref="CRPolicyMatchForm" :model="matchObj" :rules="rules" label-position='left' class="demo-ruleForm">
				<el-row type="flex" justify="left">
					<el-col :span="4">
						<el-form-item label="匹配条件" size='mini'/>
					</el-col>
					<el-col :span="12">
						<el-form-item label="匹配条件方向" prop="rdgrpDirection" size='mini' label-width="150px">
							<el-radio-group v-model="matchObj.rdgrpDirection">
								<el-radio :label="1">请求</el-radio>
								<el-radio :label="2">响应</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4">
						<el-form-item size='mini'/>
					</el-col>
					<el-col :span="9">
						<el-form-item ref="matchObject" label="匹配项" prop="object" size='mini'>
							<el-select v-model="matchObj.object" placeholder="请选择">
								<el-option
								v-for="item in this.objectOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset="1">
						<el-form-item ref="matchObjectName" label="元素" prop="object_name" size='mini'>
							<el-select v-model="matchObj.object_name" placeholder="请选择">
								<el-option
								v-for="item in this.objectNameOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4">
						<el-form-item size='mini'/>
					</el-col>
					<el-col :span="9">
						<el-form-item ref="matchOperator" label="操作符" prop="operator" size='mini'>
							<el-select v-model="matchObj.operator" placeholder="请选择">
								<el-option
								v-for="item in this.objectOperatorOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4">
						<el-form-item size='mini'/>
					</el-col>
					<el-col :span="17">
						<el-form-item ref="matchRegtext" label="匹配文本" prop="reg_text" size='mini' label-width="102px">
							<el-input v-model="matchObj.reg_text" style='width:545px'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="4">
						<el-form-item size='mini'/>
					</el-col>
					<CRPolicyMatchTable :matchList='this.matchList'/>
				</el-row>
			</el-form>
			<el-form-item label="动作" prop="action" size='mini'>
				<el-col :span="20">
					<el-select v-model="CRPolicyForm.action" style='width:650px'>
						<el-option
							v-for="item in this.actionOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-form-item>
			<!-- <el-form-item label="元素" prop="element_name" size='mini'>
				<el-col :span="20">
					<el-select v-model="CRPolicyForm.elementName" style='width:650px'>
						<el-option
							v-for="item in CRPolicyForm.elementNameOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-form-item> -->
			<el-form-item label="改写内容" prop="replement" size='mini'>
				<el-col :span="20">
					<el-input v-model="CRPolicyForm.replement"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="描述" prop="description" size='mini'>
				<el-col :span="20">
					<el-input v-model="CRPolicyForm.description"></el-input>
				</el-col>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="closeWin" size="small">关 闭</el-button>
			<el-button @click="submit" type="primary" size="small">确 定</el-button>
		</span>
	</div>
</template>

<script>
	import Bus from '../../../bus/bus.js';
	import CRPolicyMatchTable from './CRPolicyMatchTable.vue';

	var objectOptions = [{value : 1, label : 'URL'}, 
						{value : 2, label : '头部'}, 
						{value : 3, label : '响应体'}];
	var objectNameOptions = [{value : 1, label : 'Host'}, 
							{value : 2, label : 'Referer'}, 
							{value : 3, label : 'Location'},
							{value : 4, label : 'Content-type'}];
	var objectOperatorOptions = [{value : 1, label : '匹配'}, 
								{value : 2, label : '不匹配'}, 
								{value : 3, label : '存在'},
								{value : 4, label : '不存在'}];
	var actionOptions = [{value : 1, label : 'URL'}, 
						{value : 2, label : '头部'}, 
						{value : 3, label : '响应体'}];
	var elementNameOptions = [{value : 1, label : 'Host'}, 
							{value : 2, label : 'Referer'}, 
							{value : 3, label : 'Location'}];

	export default {
		props : ['mode'],
		data() {
			return {
				matchObj : {
					rdgrpDirection : 1,
					object : '',
					object_name : '',
					operator : '',
					reg_text : ''
				},
				matchList : [],
				objectOptions : objectOptions,
				objectNameOptions : objectNameOptions,
				objectOperatorOptions : objectOperatorOptions,
				actionOptions : actionOptions,
				CRPolicyForm : {
					name : '',
					actionDirection : 1,
					match : '',
					action : '',
					// elementName : '',
					// elementNameOptions : elementNameOptions,
					replement : '',
					description : ''
				},
				rules : {
					name : [{required: true, message: '不能为空', trigger: 'blur' }],
					object : [{required: true, message: '不能为空', trigger: 'change' }],
					object_name : [{required: true, message: '不能为空', trigger: 'change' }],
					operator : [{required: true, message: '不能为空', trigger: 'change' }],
					reg_text : [{required: true, message: '不能为空', trigger: 'blur' }],
					action : [{required: true, message: '不能为空', trigger: 'change' }],
					replement : [{required: true, message: '不能为空', trigger: 'blur' }],
					description : [{required: true, message: '不能为空', trigger: 'blur' }]
				}
			};
		},
		components :{
			CRPolicyMatchTable : CRPolicyMatchTable
		},
		methods: {
			closeWin () {
				this.$emit('closeWin');
			},
			/* initWin () {
				this.$refs['matchObject'].resetField();
				this.$refs['matchObjectName'].resetField();
				this.$refs['matchOperator'].resetField();
				this.$refs['matchRegtext'].resetField();
			}, */
			addMatch (formName) {
				if(this.$refs[formName]){
					this.$refs[formName].validate((valid) => {
						if (valid) {
							var simpleMatchObj = {
								rdgrpDirection: this.matchObj.rdgrpDirection,
								object: this.matchObj.object,
								object_name: this.matchObj.object_name,
								operator: this.matchObj.operator,
								reg_text: this.matchObj.reg_text
							}
							this.matchList.push(simpleMatchObj);
						} else {
							return false;
						}
					});
				}
			},
			fill (record) {
				record.forEach(element => {
					
				});
			},
			submit () {
				if(this.mode == 'add'){
					this.$refs['CRPolicyForm'].validate((valid) => {
					if (valid) {
						var api = '/api/policy/createObject';
						this.CRPolicyForm.match = this.matchList;

						//this.$qs.stringify(this.CRPolicyForm)      需要formData的时候在传这个
						this.$axios.post(api, this.CRPolicyForm)
							.then((response) => {
								if(response.status == 200){
									this.$emit('closeWin');
									Bus.$emit('loadCRPolicy');
								}
							})
							.catch((error) => {
								console.log(error);
							});
						} else {
							return false;
						}
					});
				}else if(this.mode == 'edit') {
					console.log('asssss');
				}
				
			}
		},
		mounted () {
			Bus.$on('addMatch', () => {
				this.addMatch('CRPolicyMatchForm');
			});
			
			Bus.$emit('fillCRForm', [this.CRPolicyForm, this.matchList]);
		},
		beforeDestroy () {
			Bus.$off('addMatch');
		}
	};
</script>

<style>
	
</style>

<style scoped>
	.el-radio-group {
		position: absolute;
		left: 2px;
	}

	.el-input {
		width:650px;
	}
</style>
