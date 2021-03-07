<template>
  <div class="indexContainer">
    <el-row :gutter="25">
      <el-col class="categoryBox" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
        <div class="categoryList">
          <div v-for="(item, index) in categoryList" :key="item.cid" class="item" :class="index === categoryIndex ? 'active': ''" @click="selectCategory(index)">
            {{ item.name }}
          </div>
        </div>
        <div v-if="categoryIndex >= 0" class="categoryList child">
          <div v-for="item in categoryList[categoryIndex].children" :key="item.cid" class="item" :class="item.cid === articleListSearchForm.cids ? 'active': ''" @click="searchArticle(item.cid)">
            {{ item.name }}
          </div>
        </div>
      </el-col>
      <el-col class="articleBox" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
        <div class="searchMenu">
          <span v-for="(item,index) in menuList" :key="item.sortKey" :class="index === menuIndex ? 'active': ''" class="item" @click="changeSortKey(item.sortKey, index)">{{ item.title }}</span>
        </div>
        <div v-if="articleList.length > 0" class="articleList">
          <div v-for="item in articleList" :key="item.aid" class="articleItem">
            <articleItem :item="item" />
          </div>
        </div>
        <div v-else class="noMore">暂无更多</div>
        <pagination v-show="articleList.length !== 0" :total="$store.state.article.articleTotal" :current-page="articleListSearchForm.page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
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
import { getCategoryList } from '@/api/category'

import articleItem from '@/components/article/articleItem.vue'
import userItem from '@/components/user/userItem.vue'
import pagination from '@/components/pagination/pagination'

export default {
  components: {
    articleItem,
    userItem,
    pagination
  },
  data() {
    return {
      userList: [],
      menuList: [
        {
          title: '最新',
          sortKey: 'create_time'
        },
        {
          title: '最热门',
          sortKey: 'look_num'
        }
      ],
      menuIndex: 0,
      categoryList: [],
      categoryIndex: -1
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
    this.$store.dispatch('article/resetArticleList')
    this.articleListSearchForm.is_recommend = ''
    this.getArticleList()
    this.getUserRankingList()
    this.getCategoryList()
  },
  destroyed() {
    this.articleListSearchForm.cids = ''
    this.articleListSearchForm.sortKey = ''
    this.articleListSearchForm.page_num = 1
    this.articleListSearchForm.page_size = 10
  },
  methods: {
    searchArticle(cid) {
      this.$store.dispatch('article/resetArticleList')
      if (cid !== this.articleListSearchForm.cids) {
        this.articleListSearchForm.cids = cid
      } else {
        this.articleListSearchForm.cids = ''
      }
      this.getArticleList()
    },
    selectCategory(index) {
      this.categoryIndex = index
    },
    async getCategoryList() {
      const data = await getCategoryList({ state: 'valid' })
      if (data.code === 200) {
        // 处理数据结构
        this.categoryList = data.data.rows
      }
    },
    currentChange(page_num) {
      this.articleListSearchForm.page_num = page_num
      this.getArticleList()
    },
    handleSizeChange(page_size) {
      this.articleListSearchForm.page_size = page_size
      this.getArticleList()
    },
    changeSortKey(sortKey, index) {
      this.articleListSearchForm.sortKey = sortKey
      this.articleListSearchForm.page_num = 1
      this.menuIndex = index
      this.getArticleList()
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
      await this.$store.dispatch('article/resetArticleList')
      this.articleListSearchForm.state = 'valid'
      const data = await this.$store.dispatch('article/getArticleList', this.articleListSearchForm)
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.indexContainer {
  .categoryBox {
    padding-left: 0 !important;
    padding-right: 0 !important;
    .categoryList {
      display: flex;
      flex-wrap: wrap;
      .item {
        padding: 5px 10px;
        background-color: #ffffff;
        color: #666666;
        border-radius: 6px;
        margin-right: 15px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .active {
        background-color: @defaultColor;
        color: #ffffff;
      }
    }
    .child {
      margin-bottom: 10px;
      .item {
        font-size: 12px !important;
        color: #999999;
      }
      .active {
        color: #ffffff;
      }
    }
  }
  .articleBox {
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    .searchMenu {
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
    .categoryBox {
      .categoryList {
        margin-top: 5px;
        margin-left: 5px;
        .item {
          margin-bottom: 5px;
          font-size: 14px;
        }
      }
    }
    .articleList {
      padding: 0;
      .articleItem {
        padding: 0;
      }
    }
    >.el-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
}

</style>
