<template>
  <div class="layoutContainer">
    <el-container>
      <el-header>
        <el-row>
          <el-col :xl="{span:18,offset:3}" :lg="{span:18,offset:3}" :md="{span:24,offset:0}" :sm="{span:24,offset:0}" :xs="{span:24,offset:0}">
            <div class="left">
              <router-link tag="a" :to="{ name: 'index' }">
                <img class="logoImg" src="@/assets/logo.png">
              </router-link>
              <div class="navMenu">
                <span v-for="(menu, index) in menuList" :key="menu.name" class="menu" :class="currMenu === index ? 'active' : ''" @click="goToPage(menu.name,index)">{{ menu.title }}</span>
                <!-- <router-link  tag="a" :to="{ name: menu.name }"></router-link> -->
                <el-dropdown @command="goToPage">
                  <span class="el-dropdown-link">
                    {{ pathName }}<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="menu in menuList" :key="menu.name" :command="menu.name" :disabled="$route.name === menu.name">{{ menu.title }}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="right">
              <el-input v-if="isShowSearch" v-model="searchText" class="rightMenu hidden-sm-and-down" size="small" prefix-icon="el-icon-search" placeholder="请输入内容回车搜索" @change="search" />
              <el-button v-if="userInfo" class="rightMenu writeBtn" size="small" type="primary" @click="goToPage('handleArticle')">写文章</el-button>
              <el-button v-if="userInfo" class="rightMenu writeBtn" size="small" @click="goToPage('draft')">草稿</el-button>
              <el-button v-if="!userInfo" class="rightMenu" plain size="small" type="primary" @click="goToPage('signin')">登录</el-button>
              <div v-if="userInfo">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    <el-avatar :src="userInfo.avatar || defaultAvatar" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="write">写文章</el-dropdown-item>
                    <el-dropdown-item command="homePage">个人主页</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <div class="main">
        <router-view :key="$route.fullPath" ref="main" />
      </div>
    </el-container>
    <footer class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021024815号</a>
    </footer>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      userInfo: '',
      selectIds: [],
      categoryList: [],
      timer: null,
      searchText: '',
      isShowSearch: false,
      isShowCategory: false,
      pathName: '推荐',
      menuList: [],
      currMenu: 0,
      defaultAvatar: require('@/assets/image/avatar/defaultAvatar.jpeg')
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        switch (val.name) {
          case 'indexContent':
            this.currMenu = 0
            this.pathName = '推荐'
            break
          case 'articleList':
            this.currMenu = 1
            this.pathName = '用户文章'
            break
          case 'about':
            this.currMenu = 2
            this.pathName = '关于我'
            break
        }
        if (val.name !== 'articleList') {
          this.isShowSearch = false
          this.isShowCategory = false
        } else {
          this.isShowSearch = true
          this.isShowCategory = true
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters(['articleListSearchForm', 'articleList'])
  },
  created() {
    this.menuList = this.$store.state.permission.addRoutes[0].children.filter(menu => !menu.hidden)
    if (getToken()) {
      // 有登录记录 获取userInfo
      this.userInfo = this.$store.state.user.userInfo
    }
  },
  methods: {
    ...mapActions('article', ['resetArticleList', 'getArticleList']),
    handleCommand(command) {
      if (command === 'write') {
        this.$router.push({ name: 'handleArticle' })
      } else if (command === 'homePage') {
        // 前往个人中心
        this.$router.push({ name: 'homePage', params: {}})
      } else {
        // 退出
        this.$message.success('退出成功')
        this.$store.dispatch('user/reset')
        this.$router.push({ name: 'index' })
        window.localStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    },
    goToPage(name, index) {
      if (index === 0) {
        this.pathName = '推荐'
      } else if (index === 1) {
        this.pathName = '用户文章'
      } else {
        this.pathName = '关于我'
      }
      this.currMenu = index || 0
      this.$router.push({ name: name })
    },
    getSearchCids(data) {
      this.search('', data)
    },
    search(val, cids) {
      this.articleListSearchForm.page_num = 1
      this.articleListSearchForm.page_size = 10
      this.articleListSearchForm.title = val
      this.articleListSearchForm.status = 1
      this.articleListSearchForm.cids = cids
      this.resetArticleList().then(async(res) => {
        const data = await this.getArticleList()
        if (data.count === this.articleList.length) {
          this.articleListSearchForm.status = 0
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "@/styles/variables.less";
.layoutContainer {
  height: 100%;
  .el-container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    .categoryListBox {
      padding: 15px;
      background: @headerBgColor;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .item {
        color: #999;
        font-size: 15px;
        &:hover,&.active {
          color: @defaultColor;
        }
      }
    }
    .el-header {
      background: @headerBgColor;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
      height: 70px;
      .el-row,
      .el-col {
        height: 100%;
      }
      .el-col {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .logoImg {
            display: block;
            width: 120px;
            height: 60px;
            cursor: pointer;
          }
          .navMenu {
            color: @defaultColor;
            display: flex;
            .menu {
              margin-left: 50px;
              font-size: 16px;
              color: #666666;
              cursor: pointer;
              transition: color 0.5s;
              &:hover {
                color: @defaultColor;
              }
            }
            .active {
              color: @defaultColor;
            }
            .el-dropdown-link {
              color:  @defaultColor;
              font-size: 16px;
              font-weight: 600;
              margin-left: 10px;
              display: none;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          .rightMenu {
            margin-right: 10px;
          }
          .el-input {
            margin-right: 50px;
          }
          .el-avatar {
            margin-left: 25px;
            cursor: pointer;
          }
        }
      }
    }
    .main {
      margin: 0 auto;
      width: 1120px;
      padding: 15px 0;
    }
    @media screen and(max-width: 992px) {
      .main {
        width: 100%;
        padding: 0;
      }
      .el-header {
        padding: 0;
      }
    }
  }
  .footer {
    background-color: #FFFFFF;
    height: 40px;
    text-align: center;
    color: #666666;
    font-size: 14px;
    padding: 10px;
  }
}
.sendCode {
    color: @defaultColor;
    cursor: pointer;
}
.registerText {
  color: @defaultColor;
  float: right;
  margin-bottom: 15px;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .menu {
    display: none;
  }
  .writeBtn {
    display: none;
  }
  .el-header {
    height: 60px !important;
  }
  .logoImg {
    transform: scale(0.8);
  }
  .el-dropdown-link {
    display: block !important;
  }
}

</style>
