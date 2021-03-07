<template>
  <div class="indexContainer">
    <div class="masterArticleBox">
      <div v-for="(item,index) in articleList" :key="item.aid" class="article " :class="index % 6 === 0 ? 'bigArticle' : ''" @click="gotoDetail(item.aid)">
        <el-image v-if="item.imgs" fit="cover" :src="item.imgs.split(',')[0]" />
        <el-image v-else fit="cover" :src="noCoverImg" />
        <div class="info">
          <div class="categortyList">
            <span v-for="category in item.categories" :key="category.cid" class="item">{{ category.name }}</span>
          </div>
          <h2 class="title">{{ item.title }}</h2>
          <span class="subTitle">{{ item.sub_title }}</span>
          <div class="metaBox">
            <div class="userInfo" @click.stop="gotoHomePage(item.user.uid)">
              <avatar :src="item.user.avatar" />
              <span class="nickname">{{ item.user.nickname }}</span>
            </div>
            <div class="meta">
              <span class="lookNum el-icon-chat-dot-round">&nbsp;{{ item.comment_num }}</span>
              <span class="commentNum el-icon-view">&nbsp;{{ item.look_num }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="$store.state.article.articleTotal"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import avatar from '@/components/avatar/index.vue'

export default {
  components: {
    avatar
  },
  data() {
    return {
      noCoverImg: require('@/assets/image/cover/noCover.jpg')
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
    this.articleListSearchForm.is_recommend = true
    this.articleListSearchForm.title = ''
    this.getArticleList()
  },
  methods: {
    gotoHomePage(uid) {
      this.$router.push({ name: 'homePage', query: { uid: uid }})
    },
    gotoDetail(id) {
      this.$router.push({ name: 'articleDetail', params: { aid: id }})
    },
    currentChange(page_num) {
      this.articleListSearchForm.page_num = page_num
      this.getArticleList()
    },
    // 文章列表
    async getArticleList() {
      await this.$store.dispatch('article/resetArticleList')
      this.articleListSearchForm.is_recommend = true
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
.indexContainer {
  margin-top: 15px;
  .el-pagination {
    text-align: center;
  }
  .masterArticleBox {
    display: flex;
    flex-wrap: wrap;
    .article {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      flex: 1 1 300px;
      margin: 0 15px 30px;
      background-color: #ffffff;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s;
      .el-image {
          height: 200px;
          border-radius: 3px 3px 0 0;
      }
      .info {
        width: 100%;
        padding: 15px;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin: 10px 0;
          height: auto;
        }
        .subTitle {
          font-size: 14px;
          color: #666666;
          line-height: 1.4;
          flex: 1;
        }
        .metaBox {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .userInfo {
            display: flex;
            align-items: center;
            .nickname {
              font-size: 14px;
              margin-left: 5px;
              color: #666666;
            }
            .avatarBox {
              width: 30px;
              height: 30px;
            }
          }
          .meta {
            font-size: 16px;
            color: #666666;
            display: flex;
            align-items: center;
            span {
              margin-left: 10px;
            }
          }
        }
        .categortyList {
          font-size: 12px;
          width: 100%;
          margin-top: 15px;
          .item {
            border-radius: 5px;
            color: #999999;
            margin-right: 5px;
          }
        }
      }
      &:hover {
        transform: scale(1.02);
      }
    }
    .bigArticle {
      flex: 1 1 100%;
      flex-direction: row;
        .el-image {
          flex: 1;
          height: 300px;
          border-radius: 3px 0 0 3px;
        }
        .info {
          width: 350px;
        }
    }
    @media screen and(max-width: 767px) {
      .bigArticle {
        flex: 1 1 300px;
        flex-direction: column;
        .el-image {
          height: 200px;
        }
        .info  {
          width: 100%;
        }
      }
      .article {
        margin:  0 5px 10px;
        .info {
          padding: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .articleList {
      padding: 0;
    }
    >.el-row {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
}

</style>
