<template>
  <div class="articleListContainer">
    <editor id="tinymce" v-model="tinymceHtml" :init="init" />
  </div>
</template>
<script>
import { getArticleByAid } from '@/api/article'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import Editor from '@tinymce/tinymce-vue'
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
        // skin_url: 'tinymce/skins/ui/oxide-dark', // 暗色系
        height: 300
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
        console.log(this.articleDetail)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
