<template>
  <div class="userItem" @click="gotoHomePage">
    <avatar :src="item.avatar" />
    <div class="userInfo">
      <span class="nickname">{{ item.nickname }}</span>
      <!-- <span class="introduction">{{ item.introduction }}</span> -->
      <div class="nums">
        <span class="article_count">文章: {{ item.article_count || 0 }}</span>
        <span>阅读: {{ item.article_look_num || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/avatar/index.vue'
export default {
  components: {
    avatar
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    gotoHomePage() {
      this.$router.push({ name: 'homePage', query: { uid: this.item.uid }})
    }
  }
}
</script>

<style lang="less" scoped>
.userItem {
    display: flex;
    padding: 5px 10px;
    border-top: 1px solid #eeeeee;
    transition: background 0.5s;
    align-items: center;
    cursor: pointer;
    &:hover {
        background: #eeeeee;
    }
    .avatarBox {
        margin-right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .userInfo {
        font-size: 12px;
        color: #999999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        justify-content: space-around;
        span {
            margin-bottom: 5px;
        }
        .nickname {
            font-size: 14px;
            color: #333333;
        }
        .nickname,.nums {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .article_count {
          margin-right: 10px;
        }
    }
    &:last-child {
      border-bottom: 1px solid #eeeeee;
    }
}
</style>
