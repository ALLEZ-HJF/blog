<template>
  <div class="articleListContainer">
    <el-card>
      <el-input class="title" placeholder="请输入标题" />
      <el-input class="title subTitle" placeholder="请输入副标题" />
      <editor id="tinymce" v-model="tinymceHtml" :init="init" />
    </el-card>
    <el-button type="primary" class="btn">发布</el-button>
  </div>
</template>
<script>
import { getArticleByAid } from '@/api/article'
import { uploadFile } from '@/api/upload'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/template'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/table'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/help'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/textpattern'

export default {
  components: {
	  Editor
  },
  data() {
    return {
      aid: '',
      articleDetail: {},
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        plugins: 'print preview searchreplace autolink directionality visualblocks visualchars  image link media template code codesample table charmap hr pagebreak nonbreaking  insertdatetime advlist lists wordcount imagetools textpattern help autosave autoresize   ',
        toolbar: `undo redo  code  preview print | forecolor backcolor bold italic link  | image | alignleft aligncenter alignright | \
                  styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                  table  charmap  hr `,
        min_height: 300,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        importcss_append: true,
        autosave_ask_before_unload: false,
        images_upload_handler: async function(blobInfo, success, failure, progress) {
          const file = blobInfo.blob()
          const data = await uploadFile({ file: file })
          if (data.code === 200) {
            success(data.data[0])
          } else {
            failure('上传失败')
          }
        }
      },
      tinymceHtml: ''
    }
  },
  async created() {
    if (this.$route.query.aid) {
      this.aid = this.$route.query.aid
      this.getArticleByAid()
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    async getArticleByAid() {
      const data = await getArticleByAid({ aid: this.aid })
      if (data.code) {
        this.articleDetail = data.data
      }
    }
  }
}
</script>

<style lang="less">
.title {
  margin-bottom: 10px;
  height: 60px;
  > input {
     height: 60px;
     font-size: 22px;
  }
  &.subTitle {
    height: 40px;
     > input {
       height: 40px;
       font-size: 16px;
    }
  }
}
</style>

<style lang="less" scoped>
.btn {
  float: right;
  margin-top: 20px;
}
</style>
