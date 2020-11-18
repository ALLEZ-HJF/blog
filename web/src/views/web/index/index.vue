<template>
  <div class="indexContainer">
    <el-row :gutter="20">
      <el-col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
        <div class="articleList">
          <div v-for="item in articleList" :key="item.aid" class="articleItem">
            <articleItem :item="item" />
          </div>
        </div>
      </el-col>
      <el-col class="hidden-md-and-down" :xl="6" :lg="6">
        <div class="aside">
          <span class="text">排行榜</span>
          <div class="userList">
            <userItem v-for="item in userList" :key="item.uid" :item="item" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import { getUserRankingList } from '@/api/user'
import articleItem from '@/components/article/articleItem.vue'
import userItem from '@/components/user/userItem.vue'

export default {
  components: {
    articleItem,
    userItem
  },
  data() {
    return {
      searchForm: {
        page_num: 1,
        page_size: 10
      },
      articleList: [],
      userList: []
    }
  },
  mounted() {
    this.getArticleList()
    this.getUserRankingList()
  },
  methods: {
    // 作者列表 默认显示前五
    async getUserRankingList() {
      const data = await getUserRankingList({ page_num: 1, page_size: 5 })
      if (data.code === 200) {
        this.userList = data.data
        console.log(this.userList)
      }
    },
    // 文章列表
    async getArticleList() {
      const data = await getArticleList(this.searchForm)
      if (data.code === 200) {
        this.articleList = data.data.rows
      }
    }
  }
}
</script>

<style lang="less" scoped>
.indexContainer {
  margin-top: 15px;
}
.articleList,.aside  {
  background: #ffffff;
  padding: 20px 0;
  border-radius: 2px;
  .text {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
