<template>
    <div id='CRPolicyMatchTable'>
		<el-row>
			<el-col :span="17">
				<el-table
					:data="tableData"
					stripe
					size='mini'
					style="width: 100%; height:180px;">
					<el-table-column
						prop="rdgrpDirection"
						label="方向"
						:formatter="renderDirection">
					</el-table-column>
					<el-table-column
						prop="object"
						label="匹配项"
						:formatter="renderObject">
					</el-table-column>
					<el-table-column
						prop="object_name"
						label="元素"
						:formatter="renderObjectName">
					</el-table-column>
					<el-table-column
						prop="operator"
						label="操作符"
						:formatter="renderOperator">
					</el-table-column>
					<el-table-column
						prop="reg_text"
						label="匹配文本">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="120">
						<template slot-scope="scope">
							<el-button
							@click.native.prevent="deleteRow(scope.$index, tableData)"
							type="text"
							size="mini">
							移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="2" style='margin:0px 0px 0px 10px;'>
				<el-row style='margin:0px 0px 10px 0px;'>
					<el-button 
						type="success" 
						size="mini" 
						icon="el-icon-plus" 
						plain
						@click='addMatch'>添加
					</el-button>
				</el-row>
			</el-col>
		</el-row>
    </div>
</template>

<script>
	import Bus from '../../../bus/bus.js';

	export default {
		props : ['matchList'], 
		data() {
			return {
				tableData: this.matchList,
				selectlistRow : []
			}
		},
		methods : {
			renderDirection (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = '请求';
				}else if(cellValue == 2) {
					cellValue = '响应';
				}
				return cellValue;
			},
			renderObject (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = 'URL';
				}else if(cellValue == 2) {
					cellValue = '头部';
				}else if(cellValue == 3) {
					cellValue = '响应体';
				}
				return cellValue;
			},
			renderObjectName (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = 'Host';
				}else if(cellValue == 2) {
					cellValue = 'Referer';
				}else if(cellValue == 3) {
					cellValue = 'Location';
				}else if(cellValue == 4) {
					cellValue = 'Content-type';
				}
				return cellValue;
			},
			renderOperator (row, column, cellValue, index) {
				if(cellValue == 1){
					cellValue = '匹配';
				}else if(cellValue == 2) {
					cellValue = '不匹配';
				}else if(cellValue == 3) {
					cellValue = '存在';
				}else if(cellValue == 4) {
					cellValue = '不存在';
				}
				return cellValue;
			},
			addMatch () {
				Bus.$emit('addMatch',[this.matchIndex]);
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
		}
	}
</script>

<style scoped>
    .el-table{
        border-top:1px solid #d0d0d0;
		border-left:1px solid #d0d0d0;
		border-right:1px solid #d0d0d0;
		border-bottom:1px solid #d0d0d0;
        margin: 0px 0px 20px 0px;
    }
</style>
