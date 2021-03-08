<template>
  <div class="articleListContainer">
    <div class="searchFormBox">
      <el-card>
        <el-form ref="searchForm" :model="searchForm" size="mini" :inline="true" label-width="60px">
          <el-form-item label="文章ID">
            <el-input v-model="searchForm.aid" type="number" />
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input v-model="searchForm.uid" type="number" />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="searchForm.title" type="text" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.state">
              <el-option value="valid" label="已审核" />
              <el-option value="invalid" label="未审核" />
              <el-option value="lock" label="锁定" />
              <el-option value="delete" label="已删除" />
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" icon="el-icon-search" @click="adminGetArticleList(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div>
      <el-card>
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" style="margin-bottom: 15px" @click="gotoPublish">发布文章</el-button>
        <el-table
          v-loading="tableLoading"
          :data="articleList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="aid"
            label="文章ID"
            width="100"
          />
          <el-table-column
            prop="user.uid"
            label="用户ID"
            width="100"
          />
          <el-table-column
            prop="user.username"
            label="用户名称"
            width="150"
          />
          <el-table-column
            prop="user.nickname"
            label="用户昵称"
            width="150"
          />
          <el-table-column
            prop="title"
            label="标题"
            min-width="100"
          />
          <el-table-column
            prop="look_num"
            label="浏览量"
            width="100"
          />
          <el-table-column
            prop="category_str"
            label="分类"
            min-width="100"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="260"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.state !== 'valid'" type="success" size="small" icon="el-icon-check" @click="gotoPublish(scope.row)">审核</el-button>
              <el-button v-if="scope.row.state === 'valid' && !scope.row.is_recommend" type="success" size="small" icon="el-icon-check" @click="recommendArticle(scope.row.aid, true)">推荐</el-button>
              <el-button v-if="scope.row.state === 'valid' && scope.row.is_recommend" type="warning" size="small" icon="el-icon-remove-outline" @click="recommendArticle(scope.row.aid, false)">取消</el-button>
              <el-button type="warning" size="small" icon="el-icon-edit" @click="gotoPublish(scope.row,true)">编辑</el-button>
              <el-button v-if="scope.row.state === 'valid'" size="small" type="danger" icon="el-icon-delete" @click="adminDelArticle(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination :total="articleListTotal" :current-page="searchForm.page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
      </el-card>
    </div>
  </div>
</template>
<script>
import { adminGetArticleList, adminDelArticle, setArticleRecommend } from '@/api/article'
import pagination from '@/components/pagination/pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      searchForm: {
        uid: '',
        username: '',
        phone: '',
        email: '',
        state: 'invalid',
        page_num: 1,
        page_size: 10
      },
      tableLoading: true,
      articleList: [],
      articleListTotal: 0
    }
  },
  async created() {
    this.adminGetArticleList()
  },
  methods: {
    recommendArticle(aid, flag) {
      let message = '是否将该文章设置为推荐文章?'
      if (!flag) {
        message = '确定取消该推荐文章吗?'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(async() => {
        const data = await setArticleRecommend({ aid: aid, is_recommend: flag })
        if (data.code === 200) {
          if (flag) {
            this.$message.success('设置成功')
          } else {
            this.$message.success('取消成功')
          }
          this.adminGetArticleList()
        }
      }).catch(() => {

      })
    },
    gotoPublish(row, isEdit) {
      if (row) {
        this.$router.push({ path: '/admin/articles/handleArticle', query: { aid: row.aid, isEdit: isEdit }})
      } else {
        this.$router.push({ name: '/admin/articles/handleArticle' })
      }
    },
    adminDelArticle(row) {
      this.$confirm('是否删除该文章? 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const data = await adminDelArticle({ aid: row.aid })
        if (data.code === 200) {
          this.$message.success('删除成功')
          this.adminGetArticleList()
        }
      })
    },
    async adminGetArticleList(page_num) {
      this.tableLoading = true
      if (page_num) {
        this.searchForm.page_num = page_num
      }
      const { data } = await adminGetArticleList(this.searchForm)
      this.articleList = data.rows
      this.articleList.forEach(item => {
        const arr = []
        item.categories.forEach(item2 => {
          arr.push(item2.name)
        })
        item.category_str = arr.join(',')
      })
      this.articleListTotal = data.count
      this.tableLoading = false
    },
    handleSizeChange(page_size) {
      this.searchForm.page_size = page_size
      this.adminGetArticleList()
    },
    currentChange(page_num) {
      this.adminGetArticleList(page_num)
    }
  }
}
</script>

<style lang="less" scoped>
.articleListContainer {
  .searchFormBox {
    margin-bottom: 15px;
  }
}
</style>
