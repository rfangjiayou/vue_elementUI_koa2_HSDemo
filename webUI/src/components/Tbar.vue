<template>
    <div id='Tbar'>
		<el-row>
			<el-button 
                type="success" 
                size="mini" 
                icon="el-icon-plus" 
                plain
                @click='add'>新建
            </el-button>
			<el-button 
                type="primary" 
                size="mini" 
                icon="el-icon-edit" 
                plain 
                :disabled='editBtn'
                @click='edit'>编辑
            </el-button>
			<el-button 
                type="danger" 
                size="mini" 
                icon="el-icon-delete" 
                plain 
                :disabled='delBtn'
                @click='deleteData'>删除
            </el-button>
		</el-row>
    </div>
</template>

<script>
    import Bus from '../bus/bus.js'

  	export default {
		data() {
			return {
                editBtn : true,
				delBtn : true
            }
        },
        methods : {
            add () {
                this.$emit('add', 'add');
            },
            edit () {
                this.$emit('edit', 'edit');
            },
            deleteData () {
                this.$confirm('此操作将永久删除条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal : false,
                    type: 'warning'
                })
                .then((action) => {
                    if(action == 'confirm'){
                        this.$emit('deleteData');
                    }
                })
                .catch(() => {
                    /* this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  */         
                });
            }
        },
        mounted () {
            Bus.$on('btnChange', (val) => {
                this.editBtn = val[0];
                this.delBtn = val[1];
            });
            Bus.$on('addSuccess', () => {
                this.$message({
                    type: 'success',
                    message: '新建成功!'
                });
            });
            Bus.$on('addFail', () => {
                this.$message({
                    type: 'error',
                    message: '新建失败!'
                });
            });
            Bus.$on('editSuccess', () => {
                this.$message({
                    type: 'success',
                    message: '编辑成功!'
                });
            });
            Bus.$on('editFail', () => {
                this.$message({
                    type: 'error',
                    message: '编辑失败!'
                });
            });
            Bus.$on('deleteSuccess', () => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            });
            Bus.$on('deleteFail', () => {
                this.$message({
                    type: 'error',
                    message: '删除失败!'
                });
            });
        },
        beforeDestroy () {
			Bus.$off('btnChange');
			Bus.$off('addSuccess');
			Bus.$off('addFail');
			Bus.$off('editSuccess');
			Bus.$off('editFail');
			Bus.$off('deleteSuccess');
			Bus.$off('deleteFail');
		}
  	}
</script>

<style scoped>
    .el-row {
		/* border-top:1px solid #d0d0d0;
		border-left:1px solid #d0d0d0;
		border-right:1px solid #d0d0d0; */
		border-bottom:1px solid #d0d0d0;
		text-align: left;
		background-color:white;
		padding: 10px;
	}
</style>
