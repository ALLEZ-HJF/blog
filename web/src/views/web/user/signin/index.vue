<template>
  <div class="signinContainer">
    <div class="signinBox">
      <div class="title">
        {{ loginForm.type === 1 ? '用户登录' : loginForm.type === 2 ? '用户注册' : '更改密码' }}
      </div>
      <div>
          <el-form ref="loginForm" :model="loginForm" label-width="80px" label-position="left" :rules="loginRules">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码:" prop="password" v-if="loginForm.type !== 3">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item v-if="loginForm.type === 2 || loginForm.type === 3" label="邮箱:" prop="email">
          <el-input v-model="loginForm.email" autocomplete="off" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input v-model="loginForm.code" autocomplete="off">
            <template slot="append" class="sendCode">
              <span class="sendCode" @click="sendCode">{{ isSend ? '请'+num+'秒后再试' : '点击获取验证码' }}</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="loginForm.type === 3" label="新密码:" prop="newPassword">
          <el-input v-model="loginForm.newPassword" autocomplete="off" placeholder="请输入新密码" show-password />
        </el-form-item>
        <span class="registerText" @click="loginForm.type = 2" v-show="loginForm.type === 1">注册账号</span>
        <span class="registerText" @click="loginForm.type = 1" v-show="loginForm.type === 2 || loginForm.type === 3">前往登录</span>
        <span class="registerText" @click="loginForm.type = 3" v-show="loginForm.type !== 3"  style="margin-right: 15px">忘记密码</span>
        <el-button type="primary" style="width: 100%" :loading="isLoading" :disabled="!isSend" @click="handleLogin">{{ loginForm.type === 2 ? '注册': loginForm.type === 1 ? '登录' : '更改密码' }}</el-button>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendCode, forgetPassword } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code_id: '',
        code: '',
        type: 1,
        newPassword: ''
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
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
      isSend: false,
      isLoading: false,
      num: 120,
      timer: null
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          this.isLoading = true
          let data = ''
          try {
            if (this.loginForm.type === 1) {
              data = await this.$store.dispatch('user/login', this.loginForm)
            } else if (this.loginForm.type === 2) {
               // 注册
              data = await this.$store.dispatch('user/register', this.loginForm)
            } else {
              // 更改密码
              data = await forgetPassword(this.loginForm)
            }
            if (this.loginForm.type !== 3) {
              setToken(data.data.token)
              this.loginForm.code = ''
              this.loginForm.code_id = ''
              setTimeout(() => {
              this.$router.push({name: 'index'})
              window.location.reload()
            }, 1000);
            } else {
              if (data.code === 200) {
                this.$message.success('修改成功')
                this.loginForm.code = ''
                this.loginForm.code_id = ''
                this.loginForm.type = 1
              }
            }
            window.clearInterval(this.timer)
            this.num = 120
            this.isSend = false
            this.isLoading = false
          } catch (error) {
            this.isLoading = false
          }
        }
      })
    },
    async sendCode() {
      if (this.loginForm.username === '') {
        this.$message.info('请输入用户名')
        return false
      }
      if (this.isSend) {
        this.$message.info('请' + this.num + '秒后再试!')
      } else {
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
.signinContainer {
  text-align: center;
  .signinBox {
    margin-top: 15px;
    display: inline-block;
    background-color: #fff;
    border-radius: 3px;
    width: 500px;
    padding: 20px;
    .title {
      font-size: 30px;
      font-weight: 600;
      color: @defaultColor;
      margin-bottom: 15px;
    }

  }
}
</style>
