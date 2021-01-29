<template>
  <div ref="lineChart" class="lineChart">
    lineChart
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  MarkPointComponent
} from 'echarts/components'
import {
  LineChart
} from 'echarts/charts'
import {
  CanvasRenderer
} from 'echarts/renderers'

echarts.use(
  [TitleComponent, GridComponent, ToolboxComponent, TooltipComponent, LegendComponent, MarkPointComponent, LineChart, CanvasRenderer]
)
export default {
  props: {
    title: {
      type: Object,
      default: () => ({})
    },
    legend: {
      type: Object,
      default: () => ({})
    },
    toolbox: {
      type: Object,
      default: () => ({
        feature: {
          saveAsImage: {}
        }
      })
    },
    tooltip: { // 提示框
      type: Object,
      default: () => ({
        trigger: 'axis'
      })
    },
    grid: {
      type: Object,
      default: () => ({
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      })
    },
    xData: { // 横坐标底部值
      type: Array,
      default: () => []
    },
    yAxis: { // y轴的值
      type: Object,
      default: () => ({
        type: 'value'
      })
    },
    series: { // 数据
      type: Array,
      default: () => []
    },
    chartOption: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {},
      myChart: '',
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: []
      }
    }
  },
  mounted() {
    this.xAxis.data = this.xData
    Object.assign(this.option, this.chartOption, { title: this.title }, { legend: this.legend }, { toolbox: this.toolbox }, { tooltip: this.tooltip }, { grid: this.grid }, { xAxis: this.xAxis }, { yAxis: this.yAxis }, { series: this.series })
    this.initChart()
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.lineChart)
      this.myChart.setOption(this.option)
    },
    updataChart() {
      this.xAxis.data = this.xData
      Object.assign(this.option, this.chartOption, { title: this.title }, { legend: this.legend }, { toolbox: this.toolbox }, { tooltip: this.tooltip }, { grid: this.grid }, { xAxis: this.xAxis }, { yAxis: this.yAxis }, { series: this.series })
      this.myChart.setOption(this.option, true)
    }
  }
}
</script>

<style lang="less" scoped>
.lineChart {
    width: 100%;
    min-height: 300px;
}
</style>
