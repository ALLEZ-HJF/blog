<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { insertDayData } from '@/api/stat'
export default {
  name: 'App',
  mounted() {
    insertDayData()
  }
}
</script>

<style lang="less">
@import "@/styles/variables.less";
body,html,#app {
  width: 100%;
  height: 100%;
  background: @bgColor;
}
#app {
      font-family: Noto Sans SC;
      font-style: normal;
      font-weight: 400;
      overflow-y: visible;
      overflow-x: hidden;
 }
</style>
