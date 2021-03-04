<template>
  <div class="aboutContainer">
    <img class="aboutImg" src="@/assets/about.jpg" alt="">
    <div class="headText">
      关于
    </div>
    <div class="aboutItem">
      <div class="text">
        <span>【</span>关于小何<span>】</span>
      </div>
      <div class="content">
        珠海前端码农一名，目前专研前端开发，同时正在学习后端<br>
      </div>
    </div>
    <div class="aboutItem">
      <div class="text">
        <span>【</span>联系方式<span>】</span>
      </div>
      <div class="content">
        邮箱:&nbsp;254534216@qq.com
      </div>
    </div>
    <div class="aboutItem">
      <div class="text">
        <span>【</span>关于博客<span>】</span>
      </div>
      <div class="content">
        用来记录学习中用到的代码以及记录生活琐事(后续开发),欢迎各位朋友在本博客发布文章噢
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}

</script>
<style lang="less" scoped>
@import "@/styles/variables.less";
.aboutContainer {
  background-color: #fff;
  padding: 20px;
  border-radius: 3px;
  .aboutImg {
    width: 100%;
    margin-bottom: 15px;
  }
  .headText {
    font-size: 22px;
    font-weight: 600;
    background: #eee;
    padding: 10px;
    border-left: 5px solid @defaultColor;
  }
  .aboutItem {
    margin-top: 15px;
    .text {
      span {
        color: @defaultColor;
      }
    }
    .content {
      font-size: 14px;
      color: #666666;
      margin-top: 10px;
      padding-left: 10px;
    }
  }
}
</style>
