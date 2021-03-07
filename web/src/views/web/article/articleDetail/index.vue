<template>
  <div class="articleDetailContainer">
    <el-row :gutter="20">
      <el-col :xl="18" :lg="18" :md="18" :sm="24" :xs="24" class="articleDetail">
        <div v-if="article.user" class="authorInfo " @click="gotoHomePage(article.user.uid)">
          <avatar :src="article.user.avatar" />
          <div class="userInfo">
            <span class="nickname">{{ article.user.nickname }}</span>
            <span class="introduction">{{ article.user.introduction }}</span>
            <span class="lookNum">阅读: &nbsp;&nbsp; {{ article.look_num }}</span>
          </div>
        </div>
        <div v-if="article.imgs" class="imgsBox">
          <img v-for="src in article.imgs.split(',')" :key="src" :src="src">
        </div>
        <div class="title">{{ article.title }}</div>
        <div class="subTitle">{{ article.sub_title }}</div>
        <div class="content" v-html="content" />
        <div class="comment">
          <!-- 评论 -->
          <div v-if="userInfo && article.user" class="commentBox">
            <avatar :src="article.user.avatar" />
            <commentInput v-if="aid" :aid="aid" @insertResult="insertResult" />
          </div>
          <commentList v-if="aid" ref="commentList" :aid="aid" />
        </div>
      </el-col>
      <el-col class="authorDetail  hidden-sm-and-down" :xl="6" :lg="6" :md="6">
        <div v-if="article.user" class="authorInfo" @click="gotoHomePage(article.user.uid)">
          <avatar :src="article.user.avatar" />
          <div class="userInfo">
            <span class="nickname">{{ article.user.nickname }}</span>
            <span class="introduction">{{ article.user.introduction }}</span>
            <span class="lookNum">阅读: &nbsp;&nbsp; {{ article.look_num }}</span>
          </div>
        </div>
        <div class="authorArticleList">
          <!-- 该作者的文章列表 -->
          <div class="title">
            <span>
              作者文章:
            </span>
          </div>
          <div class="list">
            <template v-for="item in articleList">
              <div v-if="item.aid != aid" :key="item.aid" class="item" @click="gotoDetail(item.aid)">
                <div class="articleInfo">
                  <span class="articleTitle">{{ item.title }}</span>
                  <span class="lookNum">阅读:&nbsp;&nbsp; {{ item.look_num }}</span>
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
import { getArticleByAid, getArticleList, addArticleLookNum } from '@/api/article'
import commentInput from '@/components/comment/commentInput'
import commentList from '@/components/comment/commentList'
import marked from 'marked'
import avatar from '@/components/avatar/index.vue'
import 'highlight.js/scss/atelier-estuary-dark.scss'
import hljs from 'highlight.js' // 导入代码高亮文件
export default {
  components: {
    commentList,
    commentInput,
    avatar
  },
  data() {
    return {
      aid: '',
      article: {},
      content: '',
      articleList: [],
      page_num: 1,
      page_size: 10,
      userInfo: this.$store.state.user.userInfo
    }
  },
  mounted() {
    this.aid = Number(this.$route.params.aid)
    this.getArticleDetail()
    this.$nextTick(() => {
      const el = document.getElementsByClassName('main')[0]
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
        this.$refs.commentList.getCommentByAid()
      }, 1000)
    },
    // 返回的评论数据
    insertResult(data) {
      const res = data
      res.user = {}
      res.user.avatar = this.userInfo.avatar
      res.user.nickname = this.userInfo.nickname
      res.replys = []
      this.$refs.commentList.list.unshift(res)
    },
    gotoHomePage(uid) {
      this.$router.push({ name: 'homePage', query: { uid: uid }})
    },
    gotoDetail(aid) {
      this.$router.push({ name: 'articleDetail', params: { aid: aid }})
    },
    // 添加浏览量
    async addArticleLookNum() {
      const data = await addArticleLookNum({ aid: this.aid })
      if (data.code === 200) {
        this.article.look_num++
      }
    },
    async getArticleDetail() {
      const data = await getArticleByAid({ aid: this.aid })
      if (data.code === 200) {
        this.article = data.data
        this.content = marked(this.article.content)
        this.getArticleList()
        this.addArticleLookNum()
        this.highlighthandle()
      }
    },
    async getArticleList() {
      const data = await getArticleList({ uid: this.article.user.uid, page_num: 1, page_size: 10, state: 'valid' })
      if (data.code === 200) {
        this.articleList = data.data.rows
      }
    },
    async highlighthandle() {
      await hljs
      const highlight = document.querySelectorAll('code,pre')
      highlight.forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
}
</script>
<style lang="less">
.content {
  padding: 15px;
  .hljs {
    margin-bottom: 10px;
    border-radius: 4px;
  }
  pre {
    margin-top: 15px;
  }
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}

.avatarBox {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  margin-right: 15px
}
</style>
<style lang="less" scoped>
@import "@/styles/variables.less";
@media screen and(max-width: 992px) {
  .articleDetailContainer > .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    .articleDetail {
      border-radius: 0;
      padding: 0 !important;
      .authorInfo  {
        display: flex;
      }
    }
  }
}
.articleDetail {
  background: #ffffff;
  padding-top: 15px;
  border-radius: 6px;
  .imgsBox {
    > img {
      margin: 0 auto;
      display: block;
      margin-bottom: 20px;
      max-width: 100%;
    }
  }
  .title {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
    height: auto;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-left: 10px;
  }
  .subTitle {
    font-size: 18px;
    color: #666666;
    margin-top: 10px;
    margin-left: 15px;
  }
  .content {
    line-height: 1.5;
    font-size: 14px;
    color: #333333;
  }
  .comment {
    border-top: 1px solid #ccc;
  }
  // 一级回复
  .commentBox {
    padding: 10px 15px;
    background: #eeeeee;
    border-radius: 4px;
    display: flex;
    margin-top: 20px;
    .avatarBox {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }
  .authorInfo  {
    display: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    .avatarBox {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .userInfo {
      .nickname {
        font-size: 14px;
      }
      .introduction {
        font-size: 12px;
      }
    }
  }
}
.authorDetail {
  cursor: pointer;
  .authorArticleList {
    background: #ffffff;
    border-radius: 6px;
    margin-top: 15px;
    .title {
      border-bottom: 1px solid #eeeeee;
      padding: 15px 15px 10px 10px;
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
}
.authorInfo {
  background: #ffffff;
  border-radius: 6px;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
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
      margin: 5px 0;
    }
    .lookNum {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>

<style lang="less">
.el-textarea {
    min-height: 40px;
  > textarea {
    min-height: 40px;
    line-height: 1.2;
    padding: 10px 15px;
  }
}
</style>
