<template>
    <div id='AdminUser' >
		<Tbar v-on:add='openNewOrEditWin' @edit='openNewOrEditWin' @deleteData='deleteData'/>
		<el-dialog title="管理员配置" :visible.sync="dialogVisible"  v-if="dialogVisible" :close-on-click-modal='false' width="450px">
			<AdminUserForm v-on:closeWin='closeWin' :mode='this.mode'/>
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
					prop="username"
					label="管理员名称">
				</el-table-column>
				<el-table-column
					prop="role"
					label="管理员角色"
					:formatter="renderRole">
				</el-table-column>
				<el-table-column
					prop="description"
					label="描述">
				</el-table-column>
    	</el-table>
		<el-footer style='height:35px;'>
			<PageBar :total='this.total'/>
		</el-footer>
    </div>
</template>

<script>
	import Bus from '../../bus/bus.js';
	import PageBar from '../PageBar.vue';
	import Tbar from '../Tbar.vue';
	import AdminUserForm from './AdminUserForm.vue';

  	export default {
		props : [], 
		data() {
			return {
				editBtn : true,
				delBtn : true,
				dialogVisible: false,
				total : '',
				limit : '',
				offset : '',
				mode : '',
				selection : [],
				tableData : []
			}
		},
		
		components : {
			'PageBar' : PageBar,
			'Tbar' : Tbar,
			'AdminUserForm' : AdminUserForm
		},

		methods: {
			openNewOrEditWin (mode) {
				this.mode = mode;
				this.dialogVisible = true;
			},
			fill (formValue) {
				var record = this.selection[0];
				if(record){
					for(var i in record){
						if(formValue.hasOwnProperty(i)){
							formValue[i] = record[i];
						}
                    }
                    formValue.confimePassword = formValue.password;
				}
			},
			closeWin () {
				this.dialogVisible = false;
			},
			loadAdminUser () {
				var url = '/api/login/login';
				Bus.$emit('mask');
                this.$axios.get(url, {
					params : {
						limit : this.limit == '' ? 50 : this.limit,         // 每页多少条
						offset : this.offset == '' ? 0 : this.offset           // 跳过多少条
					}
				})
                .then((response) => {
                    if(response.status == 200){
						this.tableData = response.data.result;
                    	this.total = response.data.total;
						Bus.$emit('btnChange', [true, true]);
						Bus.$emit('unmask');
                    }
                })
                .catch((error) => {
					if(error.response.status == 401){
						window.location.reload();
						this.$message = {
							type: 'error',
                    		message: '用户认证失败!'
						}
					}
                    console.log(error);
                });
            },
			deleteData () {
				var api = '/api/login/login',
                    params = [];
                this.selection.forEach((element) => {
                    params.push({'username' : element.username});
                });
				this.$axios.delete(api, {
					/* headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}, */
					data : params
				})
				.then((response) => {
					if(response.status == 200){
						Bus.$emit('deleteSuccess');
						this.loadAdminUser();
						Bus.$emit('btnChange', [true, true]);
					}
				})
				.catch((error) => {
					Bus.$emit('deleteFail');
					console.log(error);
				});
			},
			handleSelectionChange(selection, row) {
                if(window.sessionStorage.role == 1){
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
                }
			},
			renderRole (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = '系统管理员';
				}else if(cellValue == 2) {
					cellValue = '系统审计员';
				}else if(cellValue == 3) {
					cellValue = '系统游客';
				}
				return cellValue;
			}
		},
		mounted() {
			Bus.$on('loadAdminUser', () => {
				this.loadAdminUser();
			});
			Bus.$on('closeAdminUserForm', () => {
				this.closeWin();
			});
			Bus.$on('fillAdminUserForm', (value) => {
				if(this.mode == 'edit'){
					this.fill(value);
				}
			});
			Bus.$on('sizeChange', (value) => {
				if(value.length > 0){
					this.offset = value[1] * (value[0] - 1);
					this.limit = value[1];
				}
				this.loadAdminUser();
			});
			Bus.$on('currentPageChange', (value) => {
				if(value.length > 0){
					this.offset = value[1] * (value[0] - 1);
					this.limit = value[1];
				}
				this.loadAdminUser();
            });
            this.loadAdminUser();
			// Bus.$emit('CRPolicyMounted');
		},
		beforeDestroy () {
			Bus.$off('loadAdminUser');
			Bus.$off('closeAdminUserForm');
			Bus.$off('fillAdminUserForm');
			Bus.$off('sizeChange');
        	Bus.$off('currentPageChange');
		}
  	}
</script>

<style scoped>
</style>
