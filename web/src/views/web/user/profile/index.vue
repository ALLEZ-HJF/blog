<template>
  <div class="profileContainer">
    <div class="profile">
      <div class="avatarBox">
        <el-image
          :src="userInfo.avatar"
          :preview-src-list="[userInfo.avatar]"
        />
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          accept="image/jpg,image/jpeg,image/png"
          :auto-upload="true"
          :show-file-list="false"
          :multiple="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :http-request="uploadImg"
        >
          <el-button slot="trigger" size="small" type="primary">上传头像</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png文件，且不超过2Mb</div>
        </el-upload>
      </div>
      <div class="info">
        <div class="item">
          <span class="tip">用户名</span>
          <el-input v-model="userInfo.username" disabled type="text" />
        </div>
        <div class="item">
          <span class="tip">邮箱</span>
          <el-input v-model="userInfo.email" disabled type="email" />
        </div>
        <div class="item">
          <span class="tip">昵称</span>
          <el-input v-model="userInfo.nickname" type="text" />
        </div>
        <div class="item">
          <span class="tip">性别</span>
          <el-radio-group v-model="userInfo.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </div>
        <div class="item">
          <span class="tip">电话</span>
          <el-input v-model="userInfo.phone" type="number" />
        </div>
        <div class="item">
          <span class="tip">密码</span>
          <el-input v-model="userInfo.password" type="password" show-password />
        </div>
        <div class="item">
          <span class="tip">介绍</span>
          <el-input v-model="userInfo.introduction" type="textarea" />
        </div>
        <el-button type="primary" @click="editUserInfo">修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/upload'
import { editUser } from '@/api/user'
export default {
  data() {
    return {
      userInfo: this.$store.state.user.userInfo,
      phone: this.$store.state.user.userInfo.phone
    }
  },
  methods: {
    async editUserInfo() {
      if (this.userInfo.phone && this.phone !== this.userInfo.phone) {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (!reg.test(this.userInfo.phone)) {
          this.$message.error('手机号码格式错误')
          return false
        }
      } else {
        delete this.userInfo.phone
      }
      const res = await editUser(this.userInfo)
      if (res.code === 200) {
        if (this.userInfo.password) {
          this.$message.success('修改成功,请重新登录')
          this.$router.push({ name: 'index' })
          setTimeout(() => {
            window.localStorage.removeItem('token')
            window.location.reload()
          }, 1000)
        } else {
          this.$message.success('修改成功')
          this.$store.dispatch('user/getUserInfo')
        }
      }
    },
    async beforeUpload(file) {
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error('上传失败,文件过大')
        return false
      }
    },
    async uploadImg(params) {
      const file = params.file
      const data = await uploadFile({ file: file })
      if (data.code === 200) {
        return data.data
      } else {
        this.$message.success('上传失败')
        return false
      }
    },
    async uploadSuccess(data) {
      this.userInfo.avatar = data[0]
      const res = await editUser({ uid: this.userInfo.uid, avatar: data[0] })
      if (res.code === 200) {
        this.$message.success('修改成功')
        this.$store.dispatch('user/getUserInfo')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profileContainer {
  display: flex;
  justify-content: center;
  .profile {
    width: 1000px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    .avatarBox {
      width: 200px;
      position: relative;
      text-align: center;
      .el-image {
        width: 150px;
        height: 150px;
        border-radius: 10px;
        border: 5px solid #eee;
      }
    }
    .info {
      width: 800px;
      padding: 0 20px;
      .item {
        height: 80px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
        span {
          display: inline-block;
          width: 80px;
        }
      }
      .el-button {
        float: right;
        margin-top: 10px;
      }
    }

    @media screen and (max-width: 1024px) {
      width: 700px;
      margin-top: 15px;
    }
     @media screen and (max-width: 767px) {
      margin-top: 0px;
      border-radius: 0;
      width: 100%;
      flex-direction: column;
      align-items: center;
      .avatarBox {
        width: auto;
        .el-image {
          width: 100px;
          height: 100px;
        }
      }
       .info {
         width: 100%;
         font-size: 14px;
         margin-top: 10px;
         .item {
           height: 50px;
           span {
             width: 60px;
           }
         }
       }
    }
  }
}
</style>
