<template>
  <div class="articleItem" @click="gotoDetail">
    <div class="articleInfo">
      <div class="userInfo">
        <el-image class="avatar" :src="item.user.avatar" lazy />
        <span class="nickname">{{ item.user.nickname }}</span>
      </div>
      <div class="title">{{ item.title }}</div>
      <div v-if="item.sub_title" class="subTitle">{{ item.sub_title }}</div>
      <div class="update_time">{{ item.update_time }}  <span class="look_num">查看次数: {{ item.look_num }}</span>  <span class="look_num">评论: {{ item.comment_num }}</span>  </div>
    </div>
    <div v-if="item.imgs" class="cover  hidden-sm-and-down">
      <el-image v-for="img in item.imgs.split(',')" :key="img" :src="img" lazy />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    gotoDetail() {
      this.$router.push({ name: 'articleDetail', params: { aid: this.item.aid }})
    }
  }
}
</script>
<style lang="less" scoped>
.articleItem {
    border-top: 1px solid #eeeeee;
    padding: 20px;
    display: flex;
    height: 150px;
    cursor: pointer;
    overflow: hidden;
    align-items: center;
    transition: background 0.5s;
    &:hover {
      background: #fafafa;
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
        .avatar {
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
        font-size: 22px;
        font-weight: 500;
        color: #333333;
        margin-top: 5px;
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
</style>
