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
    <el-card style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>访问统计</span>
      </div>
      <el-row class="visitData">
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
      </el-row>
    </el-card>
    <br>
    <el-card>
      <div slot="header" class="clearfix">
        <span>访问数据</span>
      </div>
      <span>选择日期:</span>
      <el-date-picker
        v-model="getVisitDayForm.time"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        size="small"
        style="margin-left: 20px"
        :clearable="false"
        @change="getVisitDataList"
      />
      <el-table
        :data="visitDataList"
        style="width: 100%;margin-top:15px"
        border
        stripe
      >
        <el-table-column
          prop="ip"
          label="IP"
          width="180"
        />
        <el-table-column
          prop="browser"
          label="浏览器信息"
          min-width="300"
        />
        <el-table-column
          prop="create_time"
          label="访问时间"
        />
      </el-table>
      <pagination :total="visitDataTotal" :current-page="getVisitDayForm.page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import { getVisitData, getSummaryData, getVisitDataList } from '@/api/stat'
import lineChart from '@/components/chart/lineChart/index.vue'
import pagination from '@/components/pagination/pagination'
import { getFormatDate } from '@/utils'
export default {
  components: {
    lineChart,
    pagination
  },
  data() {
    return {
      summaryObject: {},
      date: [getFormatDate(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)), getFormatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000))],
      visitChartSeries: [],
      visitChartXData: [],
      visitChartTitle: {
        text: '七日访问量',
        textStyle: {
          fontSize: 16
        }
      },
      showVisitDataLineChart: false,
      userInfo: this.$store.state.user.userInfo,
      socket: null,
      showSystemInfo: true,
      systemInfo: {
        cpuInfo: {},
        memoryInfo: {},
        info: {}
      },
      timeXData: [],
      yAxis: {
        type: 'value',
        min: 0,
        max: 100
      },
      cpuChartData: [{
        name: 'CPU使用率',
        type: 'line',
        smooth: true,
        data: [],
        areaStyle: {}
      }],
      memoryChartData: [{
        name: '内存使用率',
        type: 'line',
        smooth: true,
        data: []
      }],
      getVisitDayForm: {
        time: getFormatDate(),
        page_size: 10,
        page_num: 1
      },
      visitDataList: [],
      visitDataTotal: 0
    }
  },

  computed: {},

  mounted() {
    this.getVisitData()
    this.getSummaryData()
    this.getVisitDataList()
  },
  methods: {
    currentChange(page_num) {
      this.getVisitDayForm.page_num = page_num
      this.getVisitDataList()
    },
    handleSizeChange(page_size) {
      this.getVisitDayForm.page_size = page_size
      this.getVisitDataList()
    },
    async getVisitDataList() {
      const data = await getVisitDataList(this.getVisitDayForm)
      if (data.code === 200) {
        this.visitDataList = data.data.rows
        this.visitDataTotal = data.data.count
      }
    },
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
      background-color: #FFFFFF;
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
