<template>
  <div class="userItem">
    <div class="avatar">
      <el-image lazy :src="item.avatar" />
    </div>
    <div class="userInfo">
      <span class="nickname">{{ item.nickname }}</span>
      <span class="introduction">{{ item.introduction }}</span>
      <div>
        <span class="">文章: {{ item.article_count }}</span>
        <span>阅读: {{ item.article_look_num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="less" scoped>
.userItem {
    display: flex;
    padding: 5px;
    border-top: 1px solid #eeeeee;
    transition: background 0.5s;
    cursor: pointer;
    &:hover {
        background: #eeeeee;
    }
    .avatar {
        margin-right: 15px;
        .el-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .userInfo {
        font-size: 12px;
        color: #999999;
        display: flex;
        flex-direction: column;
        span {
            margin-bottom: 5px;
        }
        .nickname {
            font-size: 14px;
            color: #333333;
        }
    }
    &:last-child {
      border-bottom: 1px solid #eeeeee;
    }
}
</style>
