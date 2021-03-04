<template>
  <!-- 分页 -->
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :current-page="currentPage"
    @current-change="currentChange"
    @size-change="handleSizeChange"
  />
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    currentChange(page_num) {
      this.$emit('currentChange', page_num)
    },
    handleSizeChange(page_size) {
      this.$emit('handleSizeChange', page_size)
    }
  }
}
</script>

<style>
 .el-pagination {
     margin: 10px 0;
 }
</style>
<style>
@media screen and (max-width: 767px) {
  .el-pagination__total , .el-pagination__sizes, .el-pagination__jump {
      display:  none !important;
  }
}
</style>
