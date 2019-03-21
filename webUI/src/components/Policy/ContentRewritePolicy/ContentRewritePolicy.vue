<template>
    <div id='ContentRewritePolicy' v-loading="this.pictLoading" element-loading-spinner="el-icon-loading" element-loading-text="加载中">
		<Tbar v-on:add='openNewOrEditWin' @edit='openNewOrEditWin' @deleteData='deleteData'/>
		<el-dialog title="内容改写策略配置" :visible.sync="dialogVisible"  v-if="dialogVisible" :close-on-click-modal='false' width="950px">
			<CRPolicyForm ref='CRPolicyContainer' v-on:closeWin='closeWin' :mode='this.mode'/>
		</el-dialog>
        <el-table
			ref="multipleTable"
			:data="tableData"
			stripe
			tooltip-effect="dark"
			size='mini'
			style="width: 100%"
			@select='handleSelectionChange'
			@select-all='handleSelectionChange'>
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="id"
					label="ID"
					width=180>
				</el-table-column>
				<el-table-column
					prop="name"
					label="名称">
				</el-table-column>
				<el-table-column
					prop="actionDirection"
					label="方向"
					:formatter="renderDirection">
				</el-table-column>
				<el-table-column
					prop="action"
					label="动作"
					:formatter="renderAction">
				</el-table-column>
				<el-table-column
					prop="description"
					label="描述">
				</el-table-column>
    	</el-table>
		<el-footer style='height:35px;'>
			<PageBar/>
		</el-footer>
    </div>
</template>

<script>
	import Bus from '../../../bus/bus.js';
	import PageBar from '../../PageBar.vue';
	import Tbar from '../../Tbar.vue';
	import CRPolicyForm from './CRPolicyForm.vue';

  	export default {
		props : {

		}, 
		data() {
			return {
				editBtn : true,
				delBtn : true,
				dialogVisible: false,
				pictLoading : false,
				mode : '',
				selection : [],
				tableData : []
			}
		},
		
		components : {
			'PageBar' : PageBar,
			'Tbar' : Tbar,
			'CRPolicyForm' : CRPolicyForm
		},

		methods: {
			handleSelectionChange(selection, row) {
				this.selection = selection;
				if(selection.length > 0){
					this.delBtn = false;
				}else{
					this.delBtn = true;
				}

				if(selection.length == 1){
					this.editBtn = false;
				}else{
					this.editBtn = true;
				}
				Bus.$emit('btnChange', [this.editBtn, this.delBtn]);
			},
			openNewOrEditWin (mode) {
				this.mode = mode;
				this.dialogVisible = true;
			},
			fill (formValue, matchList) {
				var record = this.selection[0];
				if(record){
					for(var i in record){
						if(formValue.hasOwnProperty(i) && i != 'match'){
							formValue[i] = record[i];
						}
					}
					var match = JSON.parse(record.match);
					if(Array.isArray(match)){
						//不能改变matchList的引用
						match.forEach(element => {
							matchList.push(element);
						});
					}else{
						matchList.push(match);
					}
				}
			},
			closeWin () {
				this.dialogVisible = false;
			},
			deleteData () {
				var api = '/api/policy/deleteObject',
					params = this.selection;
				this.$axios.delete(api, {
					/* headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, */
					data : params
				})
				.then((response) => {
					if(response.status == 200){
						Bus.$emit('loadCRPolicy');
						Bus.$emit('btnChange', [true, true]);
					}
				})
				.catch((error) => {
					console.log(error);
				});
			},
			renderData (value) {
				this.tableData = value;
				this.pictLoading = false;
			},
			renderDirection (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = '请求';
				}else if(cellValue == 2) {
					cellValue = '响应';
				}
				return cellValue;
			},
			renderAction (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = 'URL';
				}else if(cellValue == 2) {
					cellValue = '头部';
				}else if(cellValue == 3) {
					cellValue = '响应体';
				}
				return cellValue;
			}
		},
		mounted() {
			Bus.$on('crpolicyLoadSuccess', (val) => {
				this.renderData(val);
			});
			Bus.$on('fillCRForm', (value) => {
				if(this.mode == 'edit'){
					this.fill(value[0], value[1]);
				}
			});
		},
		beforeDestroy () {
			Bus.$off('crpolicyLoadSuccess');
			Bus.$off('fillCRForm');
		}
  	}
</script>

<style scoped>
	.el-footer {
		position : absolute;
		left : 200px;
		right : 0px;
		bottom : 0px;
		background-color:white;
		color: #333;
		text-align: right;
		border-top:1px solid #d0d0d0;
		border-left:1px solid #d0d0d0;
		border-right:1px solid #d0d0d0;
	}
</style>
