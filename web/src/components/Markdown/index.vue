<template>
  <div class="markDown">
    <mavon-editor ref="md" v-model="content" :code-style="markdown.codeStyle" :ishljs="true" :toolbars="markdown.toolbars" @change="change" @save="save" @imgAdd="imgAdd" @imgDel="imgDel" />
  </div>
</template>

<script>
import { uploadFile } from '@/api/upload'

export default {
  data() {
    return {
      content: '',
      html: '',
      markdown: {
        codeStyle: 'atelier-estuary-dark',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: false // 预览
        }
      }
    }
  },

  methods: {
    change(value, render) {
      this.html = render
    },
    save(val) { // 保存文章内容
      this.$emit('saveArticle', val)
    },
    intervalSave(val) { // 自动保存
      this.$emit('saveArticle', val)
    },
    async imgAdd(pos, file) { // 添加图片，pos为位置
      const data = await uploadFile({ file: file })
      this.$refs.md.$img2Url(pos, data.data[0])
    },
    imgDel(pos, url) { // 删除图片，并不是修改就会触发，仅支持工具栏操作
    }
  }
}
</script>

<style>

</style>
