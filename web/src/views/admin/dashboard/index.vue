<template>
  <div class="dashboardContainer">
    <el-row class="statList" :gutter="20">
      <el-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
        <div class="item">
          <div class="numBox">
            <div>新增文章</div>
            <div>{{ summaryObject.newArticleCount }}</div>
          </div>
          <div class="iconBox">
            <i class="icon el-icon-s-claim" />
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
        <div class="item">
          <div class="numBox">
            <div>未审核文章</div>
            <div>{{ summaryObject.invalidArticleCount }}</div>
          </div>
          <div class="iconBox">
            <i class="icon el-icon-s-check" />
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
        <div class="item">
          <div class="numBox">
            <div>新增用户</div>
            <div>{{ summaryObject.newUser }}</div>
          </div>
          <div class="iconBox">
            <i class="icon el-icon-user-solid" />
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :lg="6" :md="6" :sm="12" :xs="12">
        <div class="item">
          <div class="numBox">
            <div>今日访问人数</div>
            <div>
              {{ summaryObject.tadayVisitCount }}
            </div>
          </div>
          <div class="iconBox">
            <i class="icon el-icon-s-data" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :xl="16" :lg="16" :md="24" :sm="24" :xs="24" class="visitData">
        <span>选择日期:</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          style="margin-bottom: 20px"
          value-format="yyyy-MM-dd"
          @change="selectDate"
        />
        <lineChart v-if="showVisitDataLineChart" ref="visitDataLineChart" :title="visitChartTitle" :x-data="visitChartXData" :series="visitChartSeries" />
      </el-col>
      <el-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
        <!-- <lineChart /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { getVisitData, getSummaryData } from '@/api/stat'
import lineChart from '@/components/chart/lineChart/index.vue'
export default {
  components: {
    lineChart
  },
  data() {
    return {
      summaryObject: {},
      date: [new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), new Date(new Date().getTime() - 24 * 60 * 60 * 1000)],
      visitChartSeries: [],
      visitChartXData: [],
      visitChartTitle: {
        text: '七日访问量',
        textStyle: {
          fontSize: 16
        }
      },
      showVisitDataLineChart: false
    }
  },

  computed: {},

  mounted() {
    this.getVisitData()
    this.getSummaryData()
    const websocket = new WebSocket('ws://localhost:3000/api_v1/systemInfo/admin/data')
    websocket.addEventListener('open', () => {
    })
  },
  methods: {
    // 选择日期获取
    selectDate() {
      this.getVisitData()
    },
    async getVisitData() {
      const searchForm = {}
      this.visitChartSeries = []
      if (!this.date || !this.date.length) {
        return
      }
      searchForm.start_time = this.date[0]
      searchForm.end_time = this.date[1]
      const data = await getVisitData(searchForm)
      this.visitChartXData = data.data.time
      this.visitChartSeries.push({
        name: '访问人数',
        type: 'line',
        data: data.data.data,
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
      })
      if (!this.showVisitDataLineChart) {
        this.showVisitDataLineChart = true
      } else {
        this.visitChartTitle.text = searchForm.start_time + '--' + searchForm.end_time + '访问量'
        this.$nextTick(() => {
          this.$refs.visitDataLineChart.updataChart()
        })
      }
    },
    async getSummaryData() {
      const data = await getSummaryData()
      this.summaryObject = data.data
    }
  }
}

</script>
<style lang="less" scoped>
@import '@/styles/variables.less';
.dashboardContainer {
  padding: 20px;
  .statList {
    .item {
      border-radius: 8px;
      box-shadow:  0 0 5px rgba(0, 0, 0, 0.2);
      padding: 20px;
      display: flex;
      justify-content: space-between;
      height: 150px;
      margin-bottom: 10px;
      .numBox {
        font-size: 22px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        color: #333;
        flex: 1;
        >div:last-child {
          margin-top: 20px;
          color: @defaultColor;
          font-weight: bold;
        }
      }
      .iconBox {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          font-size: 80px;
          color: @defaultColor;
        }
      }
      @media screen and (max-width: 1240px) {
        padding: 10px;
        .numBox {
          font-size: 20px;
          margin-right: 10px;
        }
        .iconBox {
          .icon {
            font-size: 60px;
          }
        }
      }
      @media screen and (max-width: 767px) {
         padding: 5px;
         height: 100px;
        .numBox {
          font-size: 16px;
          margin-right: 0px;
        }
        .iconBox {
          .icon {
            font-size: 50px;
          }
        }
      }
    }
  }
  .visitData {
    span {
      font-size: 16px;
      color: #333;
      margin-right: 20px;
    }
  }
}
</style>
