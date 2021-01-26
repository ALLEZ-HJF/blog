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
              {{ this.visitTodayNum[this.visitTodayNum.length - 1] }}
            </div>
          </div>
          <div class="iconBox">
            <i class="icon el-icon-s-data" />
          </div>
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
}
</style>
