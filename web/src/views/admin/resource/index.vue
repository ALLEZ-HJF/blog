<template>
  <div>
    <el-card>
      <el-form :model="searchForm" :inline="true" label-width="70px">
        <el-form-item label="类型">
          <el-select v-model="searchForm.resource_type">
            <el-option label="图片" value="img" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="searchForm.uid" type="number" />
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" size="small" icon="el-icon-search" @click="getResourceList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br>
    <el-card>
      <el-table
        v-loading="tableLoading"
        :data="data"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="uid"
          label="用户ID"
          width="100"
        />
        <el-table-column
          prop="resource_name"
          label="资源名称"
          width="200"
        />
        <el-table-column
          prop="resource_url"
          label="资源地址"
          min-width="200"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.state === 'valid'" size="small" type="danger" icon="el-icon-delete" @click="delResource(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :total="resourceTotal" :current-page="searchForm.page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
    </el-card>
  </div>
</template>

<script>
import { getResourceList, delResource } from '@/api/resource'
import pagination from '@/components/pagination/pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      searchForm: {
        resource_type: 'img',
        uid: '',
        page_size: 10,
        page_num: 1
      },
      tableLoading: true,
      resourceTotal: 0,
      data: []
    }
  },
  mounted() {
    this.getResourceList()
  },
  methods: {
    async getResourceList() {
      this.tableLoading = true
      const data = await getResourceList(this.searchForm)
      if (data.code === 200) {
        this.data = data.data.rows
        this.resourceTotal = data.data.count
      }
      this.tableLoading = false
    },
    delResource(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const data = await delResource({ rid: row.rid })
        if (data.code === 200) {
          this.$message.success('删除成功')
          this.getResourceList()
        }
      }).catch(() => {
      })
    },
    handleSizeChange(page_size) {
      this.searchForm.page_size = page_size
      this.getResourceList()
    },
    currentChange(page_num) {
      this.searchForm.page_num = page_num
      this.getResourceList()
    }
  }
}
</script>

<style>

</style>
