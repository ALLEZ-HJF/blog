<template>
  <!-- 文章回复与评论 -->
  <div class="commentList" :class="{'isSubComment': replys.length > 0}">
    <!-- 评论列表 -->
    <div v-for="(item,index) in list" :key="index" class="item" :class="{'isComment': replys.length === 0}">
      <div class="avatar">
        <el-image lazy :src="item.user.avatar" />
      </div>
      <div class="commentInfo" :class="replys.length > 0 && item.pid === 0 ? 'childrenCommentInfo' : ''">
        <span class="nickname">{{ item.user.nickname }}</span>
        <span class="content">{{ item.content }}</span>
        <div class="menuList">
          <div>
            <span class="createTime">{{ item.create_time }}</span>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该评论吗?"
              @onConfirm="delComment"
            >
              <span v-if=" userInfo && userInfo.uid === item.uid" slot="reference" class="delReply" @click="delData(item)">删除</span>
            </el-popconfirm>
          </div>
          <div v-if="!item.pid && userInfo">
            <span class="reply" @click="showReply(item)">回复</span>
          </div>
        </div>
        <commentInput v-if="aid && item.isShow" :aid="aid" :commid="Number(item.commid)" :rid="item.rid || 0" @insertResult="insertResult" />
        <CommentList v-if="item.replys.length" :aid="aid" :replys="item.replys" :pid="item.pid" />
      </div>
    </div>
    <div v-if="list.length === 0" class="noMore">暂无评论</div>
  </div>
</template>

<script>
import { getCommentByAid, delComment } from '@/api/comment'
import { delReply } from '@/api/reply'
import commentInput from '@/components/comment/commentInput'
import { getUserInfo } from '@/utils/auth'
export default {
  name: 'CommentList',
  components: {
    commentInput
  },
  props: {
    aid: {
      type: Number,
      default: 0
    },
    replys: {
      type: Array,
      default: () => []
    },
    pid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page_num: 1,
      page_size: 10,
      list: [],
      isShowReplyBox: false,
      activeItem: {},
      userInfo: getUserInfo(),
      delObj: {},
      status: 1
    }
  },
  mounted() {
    if (this.replys.length > 0) {
      this.list = this.replys
    } else {
      this.getCommentByAid()
    }
    document.documentElement.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.activeItem.isShow = false
        this.$forceUpdate()
      }
    })
  },
  methods: {
    delComment() {
      if (this.delObj.rid) {
        this.list.forEach(async(item, index) => {
          if (item.rid === this.delObj.rid) {
            try {
              const data = await delReply({ aid: this.aid, rid: this.delObj.rid })
              if (data.code) {
                this.$message.success('删除成功')
                this.list.splice(index, 1)
              }
            } catch (error) {}
          }
        })
      } else {
        // 评论删除
        this.list.forEach(async(item, index) => {
          if (item.commid === this.delObj.commid) {
            try {
              const data = await delComment({ aid: this.aid, commid: this.delObj.commid })
              if (data.code) {
                this.$message.success('删除成功')
                this.list.splice(index, 1)
              }
            } catch (error) {}
          }
        })
      }
    },
    // 删除评论
    delData(item) {
      this.delObj = {}
      this.delObj = item
    },
    insertResult(data) {
      const res = data
      res.user = {}
      res.user.avatar = this.userInfo.avatar
      res.user.nickname = this.userInfo.nickname
      //  回复第一层
      if (data.pid === 0) {
        this.list.forEach(item => {
          if (Number(item.commid) === Number(data.commid)) {
            res.replys = []
            item.replys.unshift(res)
          }
        })
      } else {
        res.replys = []
        this.list.forEach((item, index) => {
          if (Number(item.rid) === Number(res.pid)) {
            this.list[index].replys.unshift(res)
          }
        })
      }
    },
    async getCommentByAid() {
      if (this.status) {
        const data = await getCommentByAid({ aid: this.aid, page_num: this.page_num, page_size: this.page_size })
        if (data.code === 200) {
          this.list = this.list.concat(data.data)
          this.page_num++
          if (data.data.length === 0 || data.data.length < this.page_size) {
            this.status = 0
          }
        }
      }
    },
    showReply(item) {
      this.activeItem.isShow = false
      item.isShow = !item.isShow
      this.activeItem = item
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
  .isComment {
      margin-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
  }
  .isSubComment {
      background: #fafafa !important;
  }
  // 评论
  .commentList {
    margin: 15px 0 15px 0px;
    background: #ffffff;
    padding: 15px;
    border-radius: 4px;
    .noMore {
      text-align: center;
      font-size: 14px;
      color: #999999;
    }
    .item {
      display: flex;
      padding-bottom: 5px;
      .avatar {
        width: 40px;
        height: 40px;
        .el-image {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
        margin-right: 10px;
      }
      .commentInfo {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 14px;
        font-weight: 200;
        .content {
          margin: 8px 0;
        }
        .menuList {
          display: flex;
          justify-content: space-between;
          color: #999999;
          margin-bottom: 15px;
          .reply {
            color: #333333;
            transition: color 0.5s;
            cursor: pointer;
            &:hover {
              color: @defaultColor;
            }
          }
          .delReply {
            margin-left: 15px;
            cursor: pointer;
          }
        }
      }
      .childrenCommentInfo {
        border-bottom: 1px solid #cccccc;
      }
    }
  }
</style>