<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init" />
  </div>
</template>

<script>
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
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: '',
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        plugins: 'print preview searchreplace autolink directionality visualblocks visualchars  image link media template code codesample table charmap hr pagebreak nonbreaking  insertdatetime advlist lists wordcount imagetools textpattern help autosave autoresize   ',
        toolbar: `undo redo  code  preview print | forecolor backcolor bold italic link  | image codesample | alignleft aligncenter alignright | \
                        styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                        table  charmap  hr `,
        menubar: false,
        inline: true, // 开启内联模式
        min_height: 300,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        importcss_append: true,
        autosave_ask_before_unload: false,
        images_upload_handler: async function(blobInfo, success, failure, progress) {
          const file = blobInfo.blob()
          if (file.size / 1024 / 1024 > 2) {
            failure('文件过大')
          } else {
            const data = await uploadFile({ file: file })
            if (data.code === 200) {
              success(data.data[0])
            } else {
              failure('上传失败')
            }
          }
        },
        setup: (editor) => {
          editor.on('input change undo redo execCommand KeyUp', (e) => {
            this.$emit('getContent', editor.getContent())
          })
        }
      }
    }
  },
  mounted() {
    if (this.content) {
      this.value = this.content
    }
    tinymce.init({})
  }
}
</script>

<style lang="less" scoped>
#tinymce {
  min-height: 600px;
  margin-top: 25px;
  background: #fafafa;
  border-radius: 5px;
  padding: 15px;
  color: #666;
}
</style>
