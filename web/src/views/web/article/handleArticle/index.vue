<template>
  <div class="articleListContainer">
    <el-card>
      <el-input v-model="article.title" class="title" placeholder="请输入标题">
        <template slot="append">
          <el-popover
            placement="bottom"
            title="封面图片"
            trigger="click"
          >
            <el-upload
              action="upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :file-list="articleImgArr"
              :before-upload="beforeImgUpload"
              :http-request="uploadImg"
              :limit="3"
              :on-remove="removePicture"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-button slot="reference"><i class="el-input__icon el-icon-picture" :style=" articleImgArr.length > 0 ? { color: '#409EFF'} : '' " /></el-button>
          </el-popover>
        </template>
      </el-input>
      <el-input v-model="article.sub_title" class="title subTitle" placeholder="请输入副标题" />
      <Markdown ref="markdown" @saveArticle="saveArticle" />
      <div v-if="categoryList.length > 0" class="categoryBox">
        <div class="text">
          选择分类:
        </div>
        <div v-if="isShowCategory" class="category">
          <selectCategory ref="selectCategory" :select-ids="selectIds" :category-list="categoryList" />
        </div>
      </div>
    </el-card>
    <el-button v-if="!isEdit" type="primary" class="btn" icon="el-icon-s-promotion" @click="handlePublish">发布文章</el-button>
    <el-button v-else type="warning" class="btn" icon="el-icon-edit" @click="editArticle">编辑文章</el-button>
    <el-button v-if="did || !aid" type="warning" class="btn" icon="el-icon-edit" @click="saveArticle">保存草稿</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getArticleByAid, insertArticle, editArticle } from '@/api/article'
import { getDraftArticleInfo, insertDraftArticle, editDraftArticle, delDraftArticle } from '@/api/draftArticle'
import { getCategoryList } from '@/api/category'
import { uploadFile } from '@/api/upload'
import SelectCategory from '@/components/SelectCategory'
import Markdown from '@/components/Markdown'

export default {
  components: {
    SelectCategory,
    Markdown
  },
  data() {
    return {
      aid: '',
      did: '', // 草稿id
      categoryList: [],
      article: {
        aid: '',
        cids: '',
        title: '',
        sub_title: '',
        content: '',
        imgs: '',
        state: ''
      },
      selectIds: [],
      dialogVisible: false,
      dialogImageUrl: '',
      articleImgArr: [],
      isEdit: false,
      isShowCategory: false
    }
  },
  async created() {
    if (!this.$store.state.user.userInfo) {
      this.$message.error('请登录')
      this.$router.push({name: 'signin'})
      return
    }
    this.isEdit = this.$route.query.isEdit
    this.aid = this.$route.query.aid
    this.getCategoryList()
    if (this.$route.query.did) {
      this.did = this.$route.query.did
      // 获取草稿文章
      this.getDraftArticleInfo()
    }
  },
  methods: {
    // 保存
    async saveArticle() {
      this.article.content = this.$refs.markdown.content
      if (this.article.content && this.article.title && !this.article.aid) {
        if (this.did) {
          // 修改草稿
          this.article.did = this.did
          this.article.cids = this.$refs['selectCategory'].getSelectIds()
          const data = await editDraftArticle(this.article)
          if (data.code === 200) {
            this.$message.success('修改草稿成功')
          }
        } else {
          // 保存草稿
          this.article.cids = this.$refs['selectCategory'].getSelectIds()
          const data = await insertDraftArticle(this.article)
          if (data.code === 200) {
            this.did = data.data.did
            this.$message.success('保存成功')
          }
        }
      }
    },
    async getDraftArticleInfo() {
      const data = await getDraftArticleInfo({ did: this.did })
      if (data.code === 200) {
        this.$refs.markdown.content = data.data.content
        this.article.content = data.data.content
        this.article.title = data.data.title
        this.article.sub_title = data.data.sub_title
        this.article.imgs = data.data.imgs
        this.article.cids = data.data.cids
        const imgArr = []
        if (data.data.imgs !== 'null' && data.data.imgs) {
          data.data.imgs.split(',').forEach(item => {
            imgArr.push({ uid: new Date().getTime(), url: item })
          })
        }
        this.articleImgArr = imgArr
        this.$nextTick(() => {
          this.selectIds = data.data.cids !== 'null' ? data.data.cids ? data.data.cids.split(',') : [] : []
          this.selectIds = this.selectIds.map(x => Number(x))
          this.isShowCategory = true
        })
      }
    },
    // 编辑文章
    async editArticle() {
      const imgArr = []
      this.articleImgArr.forEach(item => {
        imgArr.push(item.url)
      })
      const reqObj = {
        aid: this.article.aid,
        uid: this.article.uid,
        cids: this.$refs['selectCategory'].getSelectIds(),
        title: this.article.title,
        sub_title: this.article.sub_title,
        content: this.$refs.markdown.content,
        imgs: imgArr.join(',')
      }
      const data = await editArticle(reqObj)
      if (data.code === 200) {
        this.$message.success(data.msg)
        setTimeout(() => {
          this.$router.back()
        }, 1500)
      }
    },
    removePicture(file, fileList) {
      this.articleImgArr = fileList
    },
    async uploadImg(params) {
      const file = params.file
      const data = await uploadFile({ file: file })
      if (data.code === 200) {
        this.$message.success('添加成功')
        this.articleImgArr.push({ url: data.data[0] })
        if (this.did) {
          this.article.imgs = this.articleImgArr.map(x => x.url).join(',')
        }
      }
    },
    beforeImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async handlePublish() {
      // 发布文章
      if (!this.article.title) {
        this.$message.info('请输入文章标题')
      } else if (!this.$refs.markdown.content) {
        this.$message.info('请输入文章内容')
      } else {
        // 发布
        const cids = this.$refs['selectCategory'].getSelectIds()
        const imgArr = []
        this.articleImgArr.forEach(item => {
          imgArr.push(item.url)
        })
        this.article.imgs = imgArr.join(',')
        if (cids === '') {
          this.$message.info('请选择文章类型')
          return
        }
        this.article.cids = cids
        this.article.content = this.$refs.markdown.content
        // 判断文章中的图片是否有图片 仅支持上传图片
        let reg = /!\[((.+?)|)\]\((.+?)\)/ig
        let contentImgs = this.article.content.match(reg)
        // 如果有不是本服务器的图片则不通过验证
        let isPass = true
        if (contentImgs !== null) {
          let imgReg = /uploads\/[0-9]*\./
          contentImgs.forEach(img => {
            if (!imgReg.test(img)) {
              isPass = false
            }
          })
        } 
        if (isPass) {
          const data = await insertArticle(this.article)
          if (data.code === 200) {
            this.$message.success(data.msg)
            // 删除草稿
            if (this.did) {
              delDraftArticle({ did: this.did })
            }
            setTimeout(() => {
              this.$router.push({name: 'homePage'})
            }, 1500)
          }
        } else {
          this.$message.error('暂不支持网络图片!,如有需要请手动上传.')
        }
      }
    },
    async getCategoryList() {
      const data = await getCategoryList({ state: 'valid' })
      if (data.code === 200) {
        this.categoryList = data.data.rows
        if (this.aid) {
          this.getArticleByAid()
        }
        if (!this.aid && !this.did) {
          this.isShowCategory = true
        }
      }
    },
    async getArticleByAid() {
      const data = await getArticleByAid({ aid: this.aid })
      if (data.code === 200) {
        if (data.data.user.uid === this.$store.state.user.userInfo.uid) {
          this.article = data.data
          this.$refs.markdown.content = data.data.content
          this.article.categories.forEach(item => {
            this.selectIds.push(item.cid)
          })
          if (this.article.imgs) {
            const imgArr = this.article.imgs.split(',')
            imgArr.forEach(item => {
              this.articleImgArr.push({ url: item })
            })
          }
          this.isShowCategory = true
          this.$forceUpdate()
        } else {
          this.$message.error("无法修改他人文章")
          this.$router.push({name: 'homePage'})
        }
      }
    }
  }
}
</script>

<style lang="less">
.title {
  margin-bottom: 10px;
  height: 60px;
  .el-input__icon {
    font-size: 26px;
    cursor: pointer;
  }
  .el-input-group__append {
    background: #ffffff;
    border: none;
  }
  > input {
    height: 60px;
    font-size: 22px;
    color: #333333;
    border: none;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0;
    &::-webkit-input-placeholder {
      color: #333333;
    }
  }
  &.subTitle {
    height: 40px;
    > input {
      height: 40px;
      font-size: 16px;
      color: #999999;
      &::-webkit-input-placeholder {
      color: #999999;
    }
    }
  }
}
</style>

<style lang="less" scoped>
.btn {
  float: right;
  margin: 20px 10px;
}
.categoryBox {
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eeeeee;
  .text {
    width: 80px;
    color: #999999;
    font-size: 16px;
    flex-shrink: 0;
    margin-right: 30px;
  }
  .category {
    flex: 1;
  }
}

#tinymce {
  min-height: 600px;
  margin-top: 25px;
  background: #fafafa;
  border-radius: 5px;
  padding: 15px;
  color: #666;
}
</style>
