<template>
    <div id="AttackType"/>
</template>

<script>
// 导入chart组件
import HighCharts from 'highcharts'

import Bus from '../../../bus/bus.js'

export default {
    data() {
        return {
            id : 'AttackType',
            chartObj : '',
            chartData : [],
            attackTypeOption: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: ''
                    }
                },
                credits: {
                    enabled: false//去掉highcharts.com链接
                },
                exporting:{
                    enabled:false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示
                },
                yAxis: {
                    min: 0,//最小
                    // max:500,//最大
                    title: {
                        text: '',
                        align: ''
                    },
                    labels: {
                        overflow: 'justify',
                    // formatter:function(){
                    //   return this.value+'G';//格式化
                    //   }
                    },
                    //allowDecimals: false,
                },
                tooltip: {
                    valueSuffix: ' ',//最后显示值
                    backgroundColor: '#4c4c4c',   // 背景颜色
                    borderColor: '#4c4c4c',         // 边框颜色
                    borderRadius: 3,             // 边框圆角
                    borderWidth: 10,               // 边框宽度
                    shadow: true,                 // 是否显示阴影
                    animation: true,              // 是否启用动画效果
                    useHTML: true,//html
                    //格式化悬浮显示框
                    pointFormat: '攻击次数<b style="color:#0ac6f2;margin: 0 auto 0 10px">{point.y}</b><br/>',
                    style: {                      // 文字内容相关样式
                        color: "#ffffff",
                        fontSize: "12px",
                        fontWeight: "blod",
                        fontFamily: "Courir new",
                        top: '100px',
                        useHTML: true,//html
                    },
                    shape: 'callout'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: false,//是否显示
                            allowOverlap: true // 允许数据标签重叠
                        }
                    }
                },
                legend: {
                    enabled: true //显示图列
                },
                series: []
            }
        }
    },
    components: {
    },
    methods : {
        loadAttackType (interval) {
            let url = '/api/systemlog/getAttackType';
            this.$axios.get(url, {
                params : {
                    'interval' : interval,
                    'groupBy' : 'protection_type'
                }
            })
            .then((response) => {
                if(response.status == 200){
                    this.chartData = response.data.result;
                    this.renderChart(this.chartData);
                }
            })
            .catch((error) => {
                if(error.response && error.response.status == 401){
                    window.location.reload();
                    this.$message = {
                        type: 'error',
                        message: '用户认证失败!'
                    }
                }
                console.log(error);
            });
        },
        initChart () {
            let chart = HighCharts.chart(this.id,this.attackTypeOption);
            this.chartObj = chart;
        },
        renderChart (data) {
            let currentSeries = this.chartObj.series;
            while(currentSeries.length > 0) {
                currentSeries[0].remove(false);
            }
            if(data.length > 0) {
                let categories = [],
                    seriesList = [];

                let series = {
                    name : '攻击类型',
                    data : []
                };
                data.forEach(element => {
                    categories.push(element.protection_type);
                    series.data.push(parseInt(element.hit_count));
                });
                this.chartObj.addSeries(series, false);

                let xAxis = this.chartObj.get();
                xAxis.setCategories(categories, false);
            }
            this.chartObj.redraw();
        }
    },
    mounted () {
        Bus.$on('loadattacktype', (interval) => {
            this.loadAttackType(interval);
        });
        this.initChart();
    },
    beforeDestroy () {
        Bus.$off('loadattacktype');
    }
}
</script>

<style>
    #attackType {
       /*  border-top:1px solid #d0d0d0;
		border-left:1px solid #d0d0d0;
		border-right:1px solid #d0d0d0;
		border-bottom:1px solid #d0d0d0; */
    }
</style>