<template>
    <div id="Severity"/>
</template>

<script>
// 导入chart组件
import HighCharts from 'highcharts'

import Bus from '../../../bus/bus.js'

export default {
    data() {
        return {
            id : 'Severity',
            chartObj : '',
            chartData : [],
            total : 0,
            attackTypeOption: {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
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
                    /* formatter:function(){
                      return 2222+'G';//格式化
                      } */
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
                    pie: {
                        size : '60%',
                        dataLabels: {
                            enabled: true,//是否显示
                            allowOverlap: true // 允许数据标签重叠
                        }
                    }
                },
                legend: {
                    enabled: true, //显示图列
                    itemStyle : {
                        cursor : 'default'
                    },
                    itemMarginBottom : 3,
                    labelFormat : '{name}: {y}',
                    align : 'center',
                    layout : 'horizontal',
                    margin : 0,
                    verticalAlign : 'bottom' //top
                },
                series: []
            }
        }
    },
    components: {
    },
    methods : {
        loadSeverity (interval) {
            let url = '/api/systemlog/getSeverity';
            this.$axios.get(url, {
                params : {
                    'interval' : interval,
                    'groupBy' : 'severity'
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
            this.total = 0;
            if(data.length > 0) {
                let series = {
                    name : '',
                    color : '',
                    data : []
                };
                data.forEach(element => {
                    let point = {
                        name : '',
                        color : '',
                        y : ''
                    }
                    if(element.severity == 0){
                        point.name = '低';
                        point.color = '#4C9EDF';
                    }else if(element.severity == 1) {
                        point.name = '中';
                        point.color = '#E4CB11';
                    }else if(element.severity == 2) {
                        point.name = '高';
                        point.color = '#EE8A07';
                    }else if(element.severity == 3) {
                        point.name = '严重';
                        point.color = '#D83C3D';
                    }
                    point.y = parseInt(element.hit_count);
                    series.data.push(point);

                    this.total += parseInt(point.y);
                });
                this.chartObj.addSeries(series, false);
            }
            this.chartObj.redraw();
        }
    },
    mounted () {
        Bus.$on('loadseverity', (interval) => {
            this.loadSeverity(interval);
        });
        this.initChart();
    },
    beforeDestroy () {
        Bus.$off('loadseverity');
    }
}
</script>

<style>
</style>