<template>
  <div class="avatarBox">
    <el-image :src="src || defaultAvatar" fit="cover" :preview-src-list="[src || defaultAvatar]" class="avatar" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultAvatar: require('@/assets/image/avatar/defaultAvatar.jpeg')
    }
  }
}

</script>
<style lang="less">
.avatarBox {
  display: inline-block;
  .avatar {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
