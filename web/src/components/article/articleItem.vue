<template>
  <div class="articleItem" @click="gotoDetail">
    <div v-if="isShowBtn" class="btns">
      <i class="el-icon-edit" @click.stop="gotoEditArticle" />
      <i class="el-icon-delete" @click.stop="deleteArticle" />
    </div>
    <div class="articleInfo">
      <div v-if="item.user" class="userInfo">
        <avatar :src="item.user.avatar" />
        <span class="nickname">{{ item.user.nickname }}</span>
      </div>
      <div class="title">{{ item.title }}</div>
      <div v-if="item.sub_title" class="subTitle">{{ item.sub_title }}</div>
      <div class="update_time">{{ item.create_time }}  <span class="look_num">查看次数: {{ item.look_num }}</span>  <span class="look_num">评论: {{ item.comment_num }}</span>  </div>
      <div class="categortyList">
        <span v-for="category in item.categories" :key="category.cid" class="item">{{ category.name }}</span>
      </div>
    </div>
    <div v-if="item.imgs" class="cover  hidden-sm-and-down">
      <template v-for="img in item.imgs.split(',')">
        <el-image :key="img" :src="img" />
      </template>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/avatar/index.vue'
import { delArticle } from '@/api/article.js'
export default {
  components: {
    avatar
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    isShowBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    deleteArticle() {
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const data = await delArticle({ aid: this.item.aid })
        this.$message.success(data.code === 200 ? '删除成功' : '删除失败')
        this.$emit('deleteSuccess', data.code === 200)
      })
    },
    gotoEditArticle() {
      this.$router.push({ name: 'handleArticle', query: { aid: this.item.aid, isEdit: true }})
    },
    gotoDetail() {
      this.$router.push({ name: 'articleDetail', params: { aid: this.item.aid }})
    }
  }
}
</script>
<style lang="less" scoped>
@import "@/styles/variables.less";
.articleItem {
    border-top: 1px solid #eeeeee;
    padding: 20px;
    display: flex;
    height: 180px;
    cursor: pointer;
    overflow: hidden;
    align-items: center;
    transition: background 0.5s;
    position: relative;
    &:hover {
      background: #fafafa;
    }
    .btns {
      position: absolute;
      right: 0;
      top: 5px;
      i {
        padding: 5px 10px;
        border-radius: 2px;
        cursor: pointer;
        color: #fff;
        margin-right: 10px;
        &.el-icon-edit {
          background: @defaultWarningColor;
        }
         &.el-icon-delete {
          background: @defaultDangerColor;
        }
      }
    }
    .articleInfo {
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-around;
      flex-shrink: 0;
      .userInfo {
        display: flex;
        align-items: center;
        .avatarBox {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .nickname {
          font-size: 14px;
          color: #666666;
        }
      }
      .title {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        margin-top: 5px;
        height: auto;
      }
      .subTitle {
        font-size: 14px;
        color: #666666;
        margin: 8px 0;
      }
      .title,.subTitle {
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap
      }
      .update_time {
        font-size: 12px;
        color: #999999;
        .look_num {
            margin-left: 15px;
        }
      }
      .categortyList {
        font-size: 12px;
        width: 100%;
        margin-top: 15px;
        .item {
          margin-right: 8px;
          padding: 5px;
          background: @defaultColor;
          border-radius: 5px;
          color: #ffffff;
        }
      }
      @media screen and (max-width: 768px){
        .title {
          font-size: 16px;
        }
        .subTitle {
          font-size: 14px;
          margin: 5px 0;
        }
        .userInfo {
          .avatarBox {
            width: 30px;
            height: 30px;
          }
        }
        .categortyList {
          margin-top: 8px;
          .item {
            padding: 2px;
          }
        }
      }
    }
    .cover {
      width: 30%;
      display: flex;
      justify-content: space-around;
      .el-image {
        display: block;
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }
    }
    &:last-child {
      border-bottom: 1px solid #eeeeee;
    }
  }
@media screen and (max-width: 768px) {
    .articleItem {
      height: 125px;
    }
}
</style>
