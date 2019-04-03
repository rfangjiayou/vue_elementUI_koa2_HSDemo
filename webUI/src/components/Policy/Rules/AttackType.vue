<template>
    <div id="AttackType">
        <XChart id="attackType" :option="this.attackTypeOption"/>
    </div>
</template>

<script>
// 导入chart组件
import XChart from '../../Chart/chart.vue'

import Bus from '../../../bus/bus.js'

export default {
    data() {
        return {
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
                    categories: ['最高收益配置', '我的智能配置', '客户当前配置'],
                    title: {
                        text: null
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
                    valueSuffix: ' 元',//最后显示值
                    backgroundColor: '#4c4c4c',   // 背景颜色
                    borderColor: '#4c4c4c',         // 边框颜色
                    borderRadius: 3,             // 边框圆角
                    borderWidth: 10,               // 边框宽度
                    shadow: true,                 // 是否显示阴影
                    animation: true,              // 是否启用动画效果
                    useHTML: true,//html
                    //格式化悬浮显示框
                    pointFormat: '总资产<b style="color:#0ac6f2;margin: 0 auto 0 10px">{point.y}</b><br/>',
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
                    enabled: true //不显示图列
                },
                series: [ {
                    name: '',
                    data: [133, 156, 300],
                    color:"#0ac6f2",//设置条形图颜色
                }, {
                    name: '',
                    data: [150, 300, 400],
                    color:"#57c059",//设置条形图颜色
                }]
            }
        }
    },
    components: {
        'XChart' : XChart
    },
    methods : {
        loadAttackType (interval) {
            let url = '/api/systemlog/getAttackType';
            this.$axios.get(url, {
                params : {
                    'interval' : interval
                }
            })
            .then((response) => {

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
        }
    },
    mounted () {
        Bus.$on('loadattacktype', (interval) => {
            this.loadAttackType(interval);
        });
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