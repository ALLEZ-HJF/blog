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

<style scope>
 .el-pagination {
     margin-top: 10px;
 }
 .el-select--mini, .el-input--mini {
    width: auto;
 }
</style>
