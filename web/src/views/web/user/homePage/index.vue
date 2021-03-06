<template>
  <div class="container">
    <el-col class="userInfo" :xl="{span:16, offset: 4}" :lg="{span:18, offset: 3}" :md="{span:18, offset: 3}" :sm="24" :xs="24">
      <avatar :src="userInfo.avatar" />
      <div class="info">
        <span class="nickname">
          {{ userInfo.nickname }}
        </span>
        <span class="create_time">
          加入时间：{{ userInfo.create_time }}
        </span>
        <div v-if="isMy" class="editBtn">
          <el-button plain size="small" @click="gotoProfile">编辑资料</el-button>
        </div>
      </div>
      <div class="introduction">
        <div class="cricleBox">
          <span class="cricle blue" />
          <span class="cricle yellow" />
          <span class="cricle red" />
        </div>
        <div class="content">
          {{ userInfo.introduction || '这人太懒了~' }}
        </div>
      </div>
    </el-col>
    <el-col :xl="{span:16, offset: 4}" :lg="{span:18, offset: 3}" :md="{span:18, offset: 3}" :sm="24" :xs="24">
      <div class="articleList">
        <div v-if="isMy" class="stateMenu">
          <span v-for="(menu, index) in stateList" :key="menu.state" class="menu" :class="index === stateIndex ? 'active' : '' " @click="getArticleList(menu.state, index)">{{ menu.text }}</span>
        </div>
        <template v-for="item in articleList">
          <articleItem :key="item.aid" :item="item" :is-show-btn="isMy" @deleteSuccess="deleteSuccess" />
        </template>
        <div v-if="articleList.length === 0" class="noMore">暂无文章</div>
        <pagination :current-page="searchForm.page_num" :total="articleListTotal" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
      </div>
    </el-col>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getArticleList } from '@/api/article'
import articleItem from '@/components/article/articleItem'
import pagination from '@/components/pagination/pagination'
import avatar from '@/components/avatar/index.vue'

export default {
  components: {
    articleItem,
    pagination,
    avatar
  },
  data() {
    return {
      userInfo: {},
      isMy: true,
      articleList: [],
      articleListTotal: 0,
      searchForm: {
        uid: '',
        page_num: 1,
        page_size: 10,
        state: 'valid'
      },
      stateList: [
        {
          state: 'valid',
          text: '已审核'
        },
        {
          state: 'invalid',
          text: '未审核'
        },
        {
          state: 'lock',
          text: '不通过'
        }
      ],
      stateIndex: 0
    }
  },
  created() {
    if (this.$route.query.uid) {
      this.searchForm.uid = this.$route.query.uid
      if (Number(this.$route.query.uid) !== this.$store.state.user.userInfo.uid) {
        this.isMy = false
      }
    } else {
      this.searchForm.uid = this.$store.state.user.userInfo.uid
    }
    this.getUserInfo()
    this.getArticleList()
  },
  methods: {
    deleteSuccess(flag) {
      if (flag) {
        this.getArticleList()
      }
    },
    async getArticleList(state, index) {
      if (state) {
        this.searchForm.state = state
        this.stateIndex = index
      }
      const data = await getArticleList(this.searchForm)
      if (data.code === 200) {
        this.articleList = data.data.rows
        this.articleListTotal = data.data.count
      }
    },
    async getUserInfo() {
      const data = await getUserInfo({ uid: this.searchForm.uid })
      if (data.code === 200) {
        this.userInfo = data.data
      }
    },
    gotoProfile() {
      this.$router.push({ name: 'profile' })
    },
    currentChange(page_num) {
      this.searchForm.page_num = page_num
      this.getArticleList()
    },
    handleSizeChange(page_size) {
      this.searchForm.page_size = page_size
      this.getArticleList()
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.container {
    .userInfo {
      height: 150px;
      padding: 20px;
      display: flex;
      align-items: center;
      background-color: #ffffff;
      margin-bottom: 10px;
      border-radius: 8px;
      .avatarBox {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 30px;
        z-index: 1;
      }
      .info {
          display: flex;
          flex-direction: column;
          width: 35%;
          .nickname {
            font-size: 24px;
            color: #333333;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .create_time {
            font-size: 15px;
            color: #666666;
          }
          .editBtn {
            margin-top: 10px;
          }
        }
      .introduction {
        height: 100%;
        flex: 1;
        background-color: #eee;
        border-radius: 6px;
        font-size: 13px;
        color: #333333;
        .cricleBox {
          height: 20%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 15px;
          background-color: #e1e1e1;
          border-radius: 6px 6px 0 0;
          .cricle {
            display: inline-block;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            margin-left: 10px;
            &.blue {
              background-color: @defaultColor;
            }
            &.yellow {
              background-color: @defaultWarningColor;
            }
            &.red {
              background-color: @defaultDangerColor;
            }
          }
        }
        .content {
          height: 80%;
          padding: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .articleList {
      border-radius: 8px;
      background: #ffffff;
      margin-bottom: 15px;
      padding-bottom: 10px;
      overflow: hidden;
      .noMore {
        text-align: center;
        color: #999999;
      }
      .el-pagination {
        text-align: center;
        overflow: auto;
      }
      .stateMenu {
        padding: 10px 0 10px 10px;
        .menu {
          color: #333333;
          margin-right: 10px;
          cursor: pointer;
        }
        .active {
          color: @defaultColor;
        }
      }
    }
    @media screen and(max-width: 767px) {
        .userInfo {
          padding: 10px;
          .avatarBox {
            width: 70px;
            height: 70px;
            margin-right: 10px;
          }
          .info {
            margin-top: 0;
            .nickname {
              font-size: 18px;
            }
            .create_time {
              font-size: 12px;
            }
          }
          .introduction {
            height: 80%;
          }
        }
    }
}
</style>

<style lang="less">
@media screen and (max-width: 992px) {
.userInfo {
    .info {
      margin-top: 15px;
      .el-form-item {
        margin-bottom: 10px;
        height: 35px;
        .el-input {
          height: 35px;
          >input {
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
