<template>
    <div id="home">
        <el-container class="contain home">
            <AsideMenu></AsideMenu>
            <el-container class="content">
                <SectionHeader></SectionHeader>
                <!-- Main -->
                <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <h2>销量统计</h2>
                    </div>
                    <div class="text item">
                        <TabControlEcharts></TabControlEcharts>
                        <div id="main" style="width: 800px;height:400px;"></div>
                    </div>
                </el-card>
                </el-main>
                <!-- Footer -->
                <SectionFooter></SectionFooter>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import AsideMenu from '../components/AsideMenu'
import SectionHeader from '../components/SectionHeader'
import SectionFooter from '../components/SectionFooter'
import TabControlEcharts from '../components/TabControlEcharts'
import echarts from 'echarts'

export default {
    components:{
        AsideMenu,
        SectionHeader,
        SectionFooter,
        TabControlEcharts
    },
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '销售数据统计'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}
</script>
<style>
.el-main {
  background-color: #f9f9f9;
  color: #333;
  padding-top: 0 !important;
}
.el-main .box-card {
  border-radius: 10px;
  width: auto;
  border: 1px solid #ccc;
  background: #fff;
}
.box-card h2 {
  line-height: 50px;
  font-size: 18px;
  padding-left: 20px;
  background: linear-gradient(#eee, #e5e5e5);
}
.el-card__header {
  padding: 0 !important;
  padding-left: 20px;
  line-height: 50px;
}
</style>
