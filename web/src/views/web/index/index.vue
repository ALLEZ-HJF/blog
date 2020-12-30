<template>
  <div class="indexContainer">
    <el-row :gutter="20">
      <el-col style="margin-bottom: 20px" :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
        <div v-if="articleList.length > 0" class="articleList">
          <div v-for="item in articleList" :key="item.aid" class="articleItem">
            <articleItem :item="item" />
          </div>
        </div>
        <div v-if="articleList.length === 0 || articleListSearchForm.status === 0" class="noMore">暂无更多</div>
      </el-col>
      <el-col class="hidden-md-and-down" :xl="6" :lg="6">
        <div class="aside">
          <span class="text">排行榜</span>
          <div v-if="userList.length > 0" class="userList">
            <userItem v-for="item in userList" :key="item.uid" :item="item" />
          </div>
          <div v-else class="noMore">暂无数据</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
      userList: []
    }
  },
  computed: {
    articleList() {
      return this.$store.getters.articleList
    },
    articleListSearchForm() {
      return this.$store.getters.articleListSearchForm
    }
  },
  mounted() {
    if (this.articleList.length === 0) {
      this.getArticleList()
    }
    this.getUserRankingList()
    this.$nextTick(() => {
      const el = document.getElementsByClassName('el-main')[0]
      el.onscroll = (e) => {
        if (el.scrollHeight - (el.scrollTop + el.offsetHeight) < 200) {
          this.handleMethod()
        }
      }
    })
  },
  methods: {
    handleMethod() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.articleListSearchForm.status) {
          this.articleListSearchForm.page_num++
          this.getArticleList()
        }
      }, 1000)
    },
    // 作者列表 默认显示前五
    async getUserRankingList() {
      const data = await getUserRankingList({ page_num: 1, page_size: 5 })
      if (data.code === 200) {
        this.userList = data.data
      }
    },
    // 文章列表
    async getArticleList() {
      const data = await this.$store.dispatch('article/getArticleList', this.articleListSearchForm)
      if (data.count === this.articleList.length) {
        this.articleListSearchForm.status = 0
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
.noMore {
  text-align: center;
  font-size: 14px;
  color: #999;
  background: #ffffff;
  padding: 20px 0;
  border-radius: 2px;
}
@media screen and (max-width: 768px) {
  .indexContainer {
    margin-top: 0;
  }
  .articleList {
    padding: 0;
  }
}
</style>
