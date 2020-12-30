<template>
  <div class="container">
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
