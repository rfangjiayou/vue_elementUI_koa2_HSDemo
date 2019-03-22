<template>
    <div id='PageBar'>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 50, 100]"
            :page-size="50"
            layout="total, ->, sizes, prev, next, jumper"
            :total="parseInt(this.total)">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props : ['total'],
        methods: {
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
            }
        },
        data() {
            return {
                currentPage: 1
            };
        }
    }
</script>

<style scoped>
	.el-pagination{
		padding: 3px;
	}
</style>
