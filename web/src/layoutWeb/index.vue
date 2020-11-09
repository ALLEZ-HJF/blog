<template>
  <div class="layoutContainer">
    <el-container>
      <el-header>
        <el-row>
          <el-col :xl="4" :lg="4" :md="4" :sm="0" :xs="0"></el-col>
          <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
            <div class="left">
              <img class="logoImg" src="@/assets/logo.png">
              <div class="navMenu">
                <router-link class="menu active" tag="a" :to="{ name: 'web/index' }">首页</router-link>
              </div>
            </div>
            <div class="right">
              <el-input class="rightMenu" size="small" prefix-icon="el-icon-search" placeholder="请输入内容回车搜索" />
              <el-button class="rightMenu" size="small" type="primary">写文章</el-button>
              <el-button class="rightMenu" plain size="small" type="primary" @click="showLoginDialog">登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3" class="main">
            <router-view />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog title="用户登录" :visible.sync="loginDialogFormVisible" width="400px">
      <el-form :model="loginForm" ref="loginForm" label-width="80px" label-position="left" :rules="loginRules" >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email" v-if="isNoAccount">
          <el-input v-model="loginForm.email" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input v-model="loginForm.code" autocomplete="off">
            <template slot="append" class="getCode">
              <span class="getCode" @click="getCode">{{ isSend ? '请'+num+'秒后再试' : '点击获取验证码' }}</span> 
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="login">登录&nbsp;/&nbsp;注册</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      loginDialogFormVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 20, message: '用户名长度在 6 到 20 个字符之间', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      isSend: false,
      isNoAccount: false,
      timer: null,
      num: 120
    }
  },
  methods: {
    login() {
      login()
    },
    showLoginDialog() {
      this.loginDialogFormVisible = true
    },
    getCode() {
      if (this.loginForm.username === '') {
        return false
      }
      if (this.isSend) {
        this.$message.info('请' + this.num + '秒后再试!')
      } else {
        this.isSend = true
        this.timer = window.setInterval(()=>{
          --this.num
          if (this.num === 0) {
            this.isSend = false
            this.num = 120
            window.clearInterval(this.timer)
          }
        },1000)
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
        }
      }
    }
    .el-main {
      flex: 1;
      background: @bgColor;
    }
    
  }
}
.getCode {
    color: @defaultColor;
    cursor: pointer;
}
</style>
