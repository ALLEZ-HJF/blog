<template>
  <div class="comment" :class="commid || rid ? 'childComment' : ''">
    <el-input v-model="comment.content" type="textarea" autosize placeholder="请输入评论..." @focus="commentFocus" />
    <div v-if="isShowCommentToolBar" class="commentToolBar">
      <div class="menuList">
        <!-- <div class="menu">
          <i class="el-icon-picture" />
          <span>图片</span>
        </div> -->
      </div>
      <el-button type="primary" size="small" @click="insertComment">评论</el-button>
    </div>
  </div>
</template>

<script>
import { insertComment } from '@/api/comment'
import { insertReply } from '@/api/reply'
export default {
  props: {
    aid: {
      type: Number,
      default: 0
    },
    commid: {
      type: Number,
      default: 0
    },
    rid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isShowCommentToolBar: false,
      isShowInput: true,
      comment: {
        content: '',
        aid: '',
        commid: '',
        pid: ''
      }
    }
  },
  created() {
    this.comment.aid = this.aid
    if (this.commid) {
      this.isShowCommentToolBar = true
      this.comment.commid = this.commid
    }
    if (this.rid) {
      this.comment.pid = this.rid
    }
  },
  mounted() {
    document.documentElement.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        if (!this.commid) {
          this.isShowCommentToolBar = false// 点击其他区域关闭
        }
      } else {
        this.isShowCommentToolBar = true
      }
    })
  },
  methods: {
    // 发布评论
    async insertComment() {
      let data = ''
      if (this.commid) {
        data = await insertReply(this.comment)
      } else {
        data = await insertComment(this.comment)
      }
      if (data.code === 200) {
        this.$message.success(this.commid ? '回复成功' : '评论成功')
        this.comment.content = ''
        this.$emit('insertResult', data.data)
      }
    },
    // 评论获得焦点
    commentFocus(event) {
      this.isShowCommentToolBar = true
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.comment {
    flex: 1;
    display: flex;
    flex-direction: column;
    .commentToolBar {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .menuList {
        flex: 1;
        .menu {
        font-size: 14px;
        color: @defaultColor;
        cursor: pointer;
        display: flex;
        align-items: center;
        }
        .el-icon-picture {
        font-size: 18px;
        margin-right: 8px;
        }
    }
    .el-button {
        flex-shrink: 0;
    }
    }
}
.childComment {
  background: #ffffff;
  border-radius: 4px;
  padding: 15px;
}
</style>
