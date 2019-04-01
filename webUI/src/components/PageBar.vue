<template>
    <div id='PageBar'>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 50, 100]"
            :page-size='limit'
            layout="total, ->, sizes, prev, pager, next, jumper"
            :total="parseInt(this.total)">
        </el-pagination>
    </div>
</template>

<script>
    import Bus from '../bus/bus.js';

    export default {
        props : ['total'],
        data() {
            return {
                currentPage: '',
                limit : ''
            };
        },
        methods: {
            handleSizeChange(val) {
                this.limit = val;
                Bus.$emit('sizeChange', [this.currentPage, val]);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                Bus.$emit('currentPageChange', [val, this.limit]);
            }
        },
        created () {
            this.limit = 50;
            this.currentPage = 1;
        }
    }
</script>

<style scoped>
	.el-pagination{
		padding: 3px;
	}
</style>
