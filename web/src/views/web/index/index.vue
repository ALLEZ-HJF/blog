<template>
  <div class="indexContainer">
    <el-row :gutter="25">
      <el-col class="articleBox" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
        <div class="menu">
          <span v-for="(item,index) in menuList" :key="item.sortKey" :class="index === menuIndex ? 'active': ''" class="item" @click="getArticleList(item.sortKey, index)">{{ item.title }}</span>
        </div>
        <div v-if="articleList.length > 0" class="articleList">
          <div v-for="item in articleList" :key="item.aid" class="articleItem">
            <articleItem :item="item" />
          </div>
        </div>
        <div v-if="articleList.length === 0 || articleListSearchForm.status === 0" class="noMore">暂无更多</div>
      </el-col>
      <el-col class="hidden-sm-and-down" :xl="6" :lg="6" :md="6">
        <div class="aside">
          <span class="text">作者排行榜</span>
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
      userList: [],
      menuList: [
        {
          title: '仅看博主',
          sortKey: 'is_master'
        },
        {
          title: '最新',
          sortKey: 'create_time'
        },
        {
          title: '最热门',
          sortKey: 'look_num'
        }
      ],
      menuIndex: 0
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
    async getArticleList(sortKey, index) {
      if (this.menuIndex === index) return
      this.menuIndex = index || 0
      this.articleListSearchForm.page_num = 1
      await this.$store.dispatch('article/resetArticleList')
      if (sortKey === 'is_master' || sortKey == null) {
        this.articleListSearchForm.is_master = true
        this.articleListSearchForm.sortKey = ''
      } else {
        this.articleListSearchForm.is_master = false
        this.articleListSearchForm.sortKey = sortKey
      }
      const data = await this.$store.dispatch('article/getArticleList', this.articleListSearchForm)
      if (data.count === this.articleList.length) {
        this.articleListSearchForm.status = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.articleBox {
  background: #ffffff;
  border-radius: 6px;
  .menu {
    padding: 10px 0;
    .item {
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      margin-right: 15px;
      margin-left: 5px;
      &.active {
        color: @defaultColor;
        border-bottom: 2px solid @defaultColor;
      }
    }
  }
}
.aside  {
  padding-top: 10px;
  background: #ffffff;
  border-radius: 6px;
  .text {
    font-size: 14px;
    margin-left: 5px;
  }
  .userList {
    margin-top: 8px;
  }
}
.noMore {
  text-align: center;
  font-size: 14px;
  color: #999;
  background: #ffffff;
  padding: 20px 0;
  border-radius: 6px;
}
@media screen and (max-width: 768px) {
  .articleList {
    padding: 0;
  }
}
</style>
