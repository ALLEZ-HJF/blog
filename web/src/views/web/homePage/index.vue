<template>
  <div class="container">
    <div class="userInfo">
      <div>用户信息:</div>
      <el-row v-if="userInfo">
        <el-col :xl="6" :lg="6" :md="8" :sm="24" :xs="24">
          <div class="userItem avatarBox">
            <div class="avatar">
              <el-image lazy :src="userInfo.avatar" :preview-src-list="[userInfo.avatar]" />
              <el-upload
                v-if="isMy"
                action="upload"
                :limit="1"
                :http-request="uploadFile"
                :on-success="uploadSuccess"
                :show-file-list="false"
                accept=".jpg,.jpeg,.png"
              >
                <el-button size="small" type="primary">上传头像</el-button>
                <div slot="tip" class="el-upload__tip">图片大小不超过2Mb</div>
              </el-upload>
            </div>
          </div>
        </el-col>
        <el-col :xl="18" :lg="18" :md="16" :sm="24" :xs="24" class="info">
          <el-form label-width="60px">
            <el-row :gutter="20">
              <el-col v-if="isMy" :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <el-form-item label="账号">
                  <el-input v-model="userInfo.username" type="text" disabled />
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <el-form-item label="昵称">
                  <el-input v-model="userInfo.nickname" :disabled="!isMy" type="text" @change="editUserInfo($event,'nickname')" />
                </el-form-item>
              </el-col>
              <el-col v-if="isMy" :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <el-form-item label="手机">
                  <el-input v-model="userInfo.phone" type="number" @change="editUserInfo($event,'phone')" />
                </el-form-item>
              </el-col>
              <el-col v-if="isMy" :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <el-form-item label="邮箱">
                  <el-input v-model="userInfo.email" type="email" disabled />
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <el-form-item label="年龄">
                  <el-input v-model="userInfo.age" :disabled="!isMy" type="email" @change="editUserInfo($event,'age')" />
                </el-form-item>
              </el-col>
              <el-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
                <el-form-item label="性别">
                  <el-radio-group v-model="userInfo.sex" :disabled="!isMy">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xl="{span:20,offset:2}" :lg="{span:20,offset:2}" :md="{span:20,offset:2}" :sm="24" :xs="24">
                <el-form-item label="介绍">
                  <el-input v-model="userInfo.introduction" type="textarea" placeholder="这个人好懒,介绍都没得~" :disabled="!isMy" @change="editUserInfo($event,'introduction')" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="articleList">
      <div class="tip">作者文章:</div>
      <template v-for="item in articleList">
        <articleItem :key="item.aid" :item="item" />
      </template>
      <div v-if="articleList.length === 0" class="noMore">暂无文章</div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/api/upload'
import { getUserInfo, editUser } from '@/api/user'
import { setUserInfo } from '@/utils/auth'
import { getArticleList } from '@/api/article'
import articleItem from '@/components/article/articleItem'
export default {
  components: {
    articleItem
  },
  data() {
    return {
      userInfo: {},
      tempInfo: {},
      isMy: true,
      articleList: [],
      searchForm: {
        uid: '',
        page_num: 1,
        page_size: 10
      }
    }
  },
  created() {
    if (this.$route.params.uid) {
      this.searchForm.uid = this.$route.params.uid
      this.isMy = false
    } else {
      this.searchForm.uid = JSON.parse(window.localStorage.getItem('userInfo')).uid
    }
    this.getUserInfo()
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const data = await getArticleList(this.searchForm)
      if (data.code === 200) {
        this.articleList = this.articleList.concat(data.data.rows)
      }
    },
    async editUserInfo(val, type) {
      if (this.isMy) {
        const obj = {}
        obj[type] = val
        obj.uid = this.searchForm.uid
        if (val !== this.tempInfo[type]) {
          if (type === 'phone') {
            const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (!reg.test(val)) {
              this.$message.error('手机号有误,请重新输入')
              this.userInfo.phone = this.tempInfo.phone
              return
            }
          }
          const data = await editUser(obj)
        }
      }
    },
    async getUserInfo() {
      const data = await getUserInfo({ uid: this.searchForm.uid })
      if (data.code === 200) {
        this.userInfo = data.data
        this.tempInfo = JSON.parse(JSON.stringify(data.data))
        if (this.isMy) {
          setUserInfo(this.userInfo)
        }
      }
    },
    uploadFile(param) {
      const file = param.file
      const isLt2M = file.size / 1024 / 1024 < 2
      if (isLt2M) {
        return uploadFile({ file: file })
      } else {
        this.$message.error('图片大小不符合规格')
        return
      }
    },
    uploadSuccess(data) {
      this.userInfo.avatar = data.data[0]
      this.editUserInfo(data.data[0], 'avatar')
      this.$message.success('上传成功')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
    margin-top: 20px;
    background: #ffffff;
    border-radius: 8px;
    padding: 20px;
    .userInfo {
        color: #666666;
        padding-bottom: 15px;
        border-bottom: 5px #eee dotted;
        .avatarBox {
            align-items: flex-start !important;
            .avatar {
                display: flex;
                align-items: center;
                .el-image {
                    width: 100px;
                    height: 100px;
                    margin-right: 20px;
                }
            }
        }
    }
    .articleList {
      margin-top: 20px;
      .tip {
        color: #666666;
        margin-bottom: 10px;
      }
      .noMore {
        text-align: center;
        color: #999999;
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
