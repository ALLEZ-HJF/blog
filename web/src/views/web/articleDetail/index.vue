<template>
  <div class="articleDetailContainer">
    <el-row :gutter="20">
      <el-col :xl="18" :lg="18" :md="24" :sm="24" :xs="24" class="articleDetail">
        <div class="title">{{ article.title }}</div>
        <div class="subTitle">{{ article.sub_title }}</div>
        <editor v-if="article.content" :content="article.content" :is-only-read="true" />
      </el-col>
      <el-col class="authorDetail  hidden-md-and-down" :xl="6" :lg="6">
        <div v-if="article.user" class="authorInfo">
          <div class="avatar">
            <el-image lazy :src="article.user.avatar" />
          </div>
          <div class="userInfo">
            <span class="nickname">{{ article.user.nickname }}</span>
            <span class="introduction">{{ article.user.introduction }}</span>
          </div>
        </div>
        <div class="authorArticleList">
          <!-- 该作者的文章列表 -->
          <div class="title">
            <span>
              作者文章:
            </span>
            <i class="el-icon-arrow-right" />
          </div>
          <div class="list">
            <template v-for="item in articleList">
              <div v-if="item.aid != aid" :key="item.aid" class="item" @click="gotoDetail(item.aid)">
                <div class="articleInfo">
                  <span class="articleTitle">{{ item.title }}</span>
                  <span class="lookNum">浏览量:&nbsp;&nbsp; {{ item.look_num }}</span>
                </div>
                <i class="el-icon-arrow-right" />
              </div>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getArticleByAid, getArticleList } from '@/api/article'
import Editor from '@/components/Editor'
export default {
  components: {
    Editor
  },
  data() {
    return {
      aid: '',
      article: {},
      articleList: []
    }
  },
  mounted() {
    this.aid = this.$route.params.aid
    this.getArticleDetail()
  },
  methods: {
    gotoDetail(aid) {
      this.$router.push({ name: 'articleDetail', params: { aid: aid }})
    },
    async getArticleDetail() {
      const data = await getArticleByAid({ aid: this.aid })
      if (data.code === 200) {
        this.article = data.data
        this.getArticleList()
      }
    },
    async getArticleList() {
      const data = await getArticleList({ uid: this.article.user.uid, page_num: 1, page_size: 10 })
      if (data.code === 200) {
        this.articleList = data.data.rows
      }
    }
  }
}
</script>

<style lang="less" scoped>
.articleDetail {
  margin-top: 25px;
  background: #fafafa;
  padding-top: 15px;
  .title {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
  }
  .subTitle {
    font-size: 18px;
    color: #666666;
    margin-top: 10px;
  }
}
.authorDetail {
  margin-top: 25px;
  .authorArticleList {
    background: #ffffff;
    border-radius: 6px;
    margin-top: 15px;
    .title {
      border-bottom: 1px solid #eeeeee;
      padding: 15px 15px 10px 15px;
      font-size: 14px;
      color: #666666;
      display: flex;
      justify-content: space-between;
    }
    .list {
      .item {
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:15px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.5s;
        .articleInfo {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .articleTitle {
          margin-bottom: 5px;
        }
        .lookNum {
          font-size: 12px;
          color: #999999;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
  }
  .authorInfo {
    background: #ffffff;
    border-radius: 6px;
    padding: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .avatar {
      .el-image {
        display: block;
        width: 60px;
        height: 60px;
      }
      width: 70px;
      flex-shrink: 0;
    }
    .userInfo {
      flex: 1;
      overflow: hidden;
      font-size: 16px;
      color: #333333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .introduction {
        font-size: 14px;
        color: #999999;
        margin-top: 5px;
      }
    }
  }
}
</style>
