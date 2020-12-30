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
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-button slot="reference"><i class="el-input__icon el-icon-picture" :style=" articleImgArr.length > 0 ? { color: '#409EFF'} : '' " /></el-button>
          </el-popover>
        </template>
      </el-input>
      <el-input v-model="article.sub_title" class="title subTitle" placeholder="请输入副标题" />
      <Markdown ref="markdown" />
      <div v-if="categoryList.length > 0" class="categoryBox">
        <div class="text">
          选择分类:
        </div>
        <div v-if="categoryList.length > 0 && !aid || selectIds.length" class="category">
          <selectCategory ref="selectCategory" :select-ids="selectIds" :category-list="categoryList" />
        </div>
      </div>
    </el-card>
    <el-button v-if="!isEdit" type="primary" class="btn" @click="handlePublish">发布文章</el-button>
    <el-button v-else type="warning" class="btn" @click="editArticle">编辑文章</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getArticleByAid, insertArticle, editArticle } from '@/api/article'
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
      isEdit: false
    }
  },
  async created() {
    if (this.$route.query.isEdit) {
      this.isEdit = this.$route.query.isEdit
    }
    this.getCategoryList()
  },
  methods: {
    // 获取富文本返回的值
    getContent(content) {
      this.article.content = content
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
        imgs: imgArr.join(','),
        state: this.article.state
      }
      const data = await editArticle(reqObj)
      if (data.code === 200) {
        this.$message.success('修改成功')
      }
    },
    async uploadImg(params) {
      const file = params.file
      const data = await uploadFile({ file: file })
      if (data.code === 200) {
        this.$message.success('添加成功')
        this.articleImgArr.push({ url: data.data[0] })
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
        const data = await insertArticle(this.article)
        if (data.code === 200) {
          this.$message.success('发布成功')
          setTimeout(() => {
            this.$router.back()
          }, 1500)
        }
      }
    },
    async getCategoryList() {
      const data = await getCategoryList({ state: 'valid' })
      if (data.code === 200) {
        this.categoryList = data.data.rows
        if (this.$route.query.aid) {
          this.aid = this.$route.query.aid
          this.getArticleByAid()
        }
      }
    },
    async getArticleByAid() {
      const data = await getArticleByAid({ aid: this.aid })
      if (data.code) {
        this.article = data.data
        this.article.categories.forEach(item => {
          this.selectIds.push(item.cid)
        })
        if (this.article.imgs) {
          const imgArr = this.article.imgs.split(',')
          imgArr.forEach(item => {
            this.articleImgArr.push({ url: item })
          })
        }
        this.$forceUpdate()
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
.articleListContainer {
  margin-top: 20px;
}
.btn {
  float: right;
  margin: 20px 0;
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
