<template>
  <div class="dashboardContainer">
    <el-row class="statList" :gutter="20">
      <el-col class="item" :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <div class="numBox">
          <div>新增文章</div>
          <div>{{ summaryObject.newArticleCount }}</div>
        </div>
        <div class="iconBox">
          <i class="icon el-icon-s-claim" />
        </div>
      </el-col>
      <el-col class="item" :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <div class="numBox">
          <div>未审核文章</div>
          <div>{{ summaryObject.invalidArticleCount }}</div>
        </div>
        <div class="iconBox">
          <i class="icon el-icon-s-check" />
        </div>
      </el-col>
      <el-col class="item" :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <div class="numBox">
          <div>新增用户</div>
          <div>{{ summaryObject.newUser }}</div>
        </div>
        <div class="iconBox">
          <i class="icon el-icon-user-solid" />
        </div>
      </el-col>
      <el-col class="item" :xl="6" :lg="6" :md="6" :sm="12" :xs="24">
        <div class="numBox">
          <div>今日访问人数</div>
          <div>
            {{ this.visitTodayNum[this.visitTodayNum.length - 1] }}
          </div>
        </div>
        <div class="iconBox">
          <i class="icon el-icon-s-data" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { getDayData, getSummaryData } from '@/api/stat'
export default {

  components: {},
  data() {
    return {
      summaryObject: {},
      visitTodayNum: 0,
      dayData: []
    }
  },

  computed: {},

  mounted() {
    this.getDayData()
    this.getSummaryData()
  },

  methods: {
    async getDayData() {
      const data = await getDayData()
      this.visitTodayNum = data.data.data
      this.dayData = data.data
    },
    async getSummaryData() {
      const data = await getSummaryData()
      this.summaryObject = data.data
    }
  }
}

</script>
<style lang="less" scoped>
.dashboardContainer {
  padding: 20px;
  .statList {
    .item {
      border-radius: 8px;
      box-shadow:  0 0 5px rgba(0, 0, 0, 0.2);
      padding: 20px;
      display: flex;
      height: 150px;
      &>div {
        flex: 1;
        text-align: center;
      }
      .numBox {
        font-size: 24px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: center;
      }
      .iconBox {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          font-size: 80px;
          color: #666666;
        }
      }
    }
  }
}
</style>
