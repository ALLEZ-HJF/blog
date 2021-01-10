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

<style>
body,html,#app {
  width: 100%;
  height: 100%;
}
</style>
