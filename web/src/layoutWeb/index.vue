<template>
  <div class="layoutContainer">
    <el-container>
      <el-header>
        <el-row>
          <el-col :xl="{span:16,offset:4}" :lg="{span:16,offset:4}" :md="{span:16,offset:4}" :sm="{span:24,offset:0}" :xs="{span:24,offset:0}">
            <div class="left">
              <img class="logoImg" src="@/assets/logo.png">
              <div class="navMenu">
                <router-link class="menu active" tag="a" :to="{ name: 'index' }">首页</router-link>
              </div>
            </div>
            <div class="right">
              <el-input v-if="isShowSearch" v-model="searchText" class="rightMenu hidden-sm-and-down" size="small" prefix-icon="el-icon-search" placeholder="请输入内容回车搜索" @change="search" />
              <el-button v-if="userInfo" class="rightMenu" size="small" type="primary">写文章</el-button>
              <el-button v-if="!userInfo" class="rightMenu" plain size="small" type="primary" @click="showLoginDialog">登录</el-button>
              <div v-if="userInfo">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-avatar :src="userInfo.avatar" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人主页</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <div class="categoryListBox">
        <el-row>
          <el-col :xl="{span:16,offset:4}" :lg="{span:16,offset:4}" :md="{span:16,offset:4}" :sm="{span:24,offset:0}" :xs="{span:24,offset:0}">
            <selectCategory ref="selectCategory" :select-ids="selectIds" :category-list="categoryList" />
          </el-col>
        </el-row>
      </div>
      <el-main>
        <el-row>
          <el-col :xl="{span:16,offset:4}" :lg="{span:16,offset:4}" :md="{span:16,offset:4}" :sm="{span:24,offset:0}" :xs="{span:24,offset:0}" class="main">
            <router-view :key="$route.fullPath" ref="main" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog title="用户登录" :visible.sync="loginDialogFormVisible" width="400px">
      <el-form ref="loginForm" :model="loginForm" label-width="80px" label-position="left" :rules="loginRules">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item v-if="isNoAccount" label="邮箱:" prop="email">
          <el-input v-model="loginForm.email" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input v-model="loginForm.code" autocomplete="off">
            <template slot="append" class="sendCode">
              <span class="sendCode" @click="sendCode">{{ isSend ? '请'+num+'秒后再试' : '点击获取验证码' }}</span>
            </template>
          </el-input>
        </el-form-item>
        <span class="registerText" @click="isNoAccount = !isNoAccount">{{ isNoAccount ? '前往登陆' : '注册账号' }}</span>
        <el-button type="primary" style="width: 100%" :loading="isLoading" :disabled="!isSend" @click="login">登录&nbsp;/&nbsp;注册</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login, sendCode, register } from '@/api/user'
import { setToken, setUserInfo, getUserInfo } from '@/utils/auth'
import SelectCategory from '@/components/SelectCategory'
import { getCategoryList } from '@/api/category'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    SelectCategory
  },
  data() {
    return {
      loginDialogFormVisible: false,
      loginForm: {
        username: '',
        password: '',
        code_id: '',
        isLogin: true
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 20, message: '用户名长度在 5 到 20 个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      isSend: false,
      isNoAccount: false,
      isLoading: false,
      num: 120,
      userInfo: getUserInfo(),
      selectIds: [],
      categoryList: [],
      timer: null,
      searchText: '',
      isShowSearch: false
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.name !== 'index') {
          this.isShowSearch = false
        } else {
          this.isShowSearch = true
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
    this.getCategoryList()
  },
  methods: {
    ...mapActions('article', ['resetArticleList', 'getArticleList']),
    search(val) {
      this.articleListSearchForm.page_num = 1
      this.articleListSearchForm.page_size = 10
      this.articleListSearchForm.title = val
      this.articleListSearchForm.status = 1
      this.resetArticleList().then(async(res) => {
        const data = await this.getArticleList()
        if (data.count === this.articleList.length) {
          this.articleListSearchForm.status = 0
        }
      })
    },
    async getCategoryList() {
      const data = await getCategoryList({ state: 'valid' })
      if (data.code === 200) {
        this.categoryList = data.data.rows
      }
    },
    login() {
      this.isLoading = true
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          let data = ''
          if (!this.isNoAccount) {
            data = await login(this.loginForm)
          } else {
            // 注册
            data = await register(this.loginForm)
          }
          setToken(data.data.token)
          setUserInfo(data.data.data)
          this.userInfo = data.data.data
          this.loginDialogFormVisible = false
          if (this.timer) {
            window.clearInterval(this.timer)
            this.num = 120
            this.isSend = false
          }
        }
      })
    },
    showLoginDialog() {
      this.loginDialogFormVisible = true
    },
    async sendCode() {
      if (this.loginForm.username === '') {
        this.$message.info('请输入用户名')
        return false
      }
      if (this.isSend) {
        this.$message.info('请' + this.num + '秒后再试!')
      } else {
        if (this.isNoAccount) {
          this.loginForm.isLogin = false
        }
        const resData = await sendCode(this.loginForm)
        this.loginForm.code_id = resData.data
        this.isSend = true
        this.timer = window.setInterval(() => {
          --this.num
          if (this.num === 0) {
            this.isSend = false
            this.num = 120
            window.clearInterval(this.timer)
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less">
@import "@/styles/variables.less";
.layoutContainer {
  height: 100%;
  .el-container {
    height: 100%;
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
      height: 70px !important;
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
              &:hover {
                color: @defaultColor;
              }
            }
            .active {
              color: @defaultColor;
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
    .el-main {
      flex: 1;
      background: @bgColor;
      padding: 0;
    }
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

</style>
