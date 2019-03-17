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
                :disabled='editBtn'>编辑
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
                this.$emit('add');
            },
            deleteData () {
                this.$emit('deleteData');
            }
        },
        mounted () {
            Bus.$on('btnChange', (val) => {
                this.editBtn = val[0];
                this.delBtn = val[1];
            });
        },
        beforeDestroy () {
			Bus.$off('btnChange');
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
		padding: 7px;
	}
</style>
