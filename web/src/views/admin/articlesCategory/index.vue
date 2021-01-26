<template>
  <div class="categoryListContainer">
    <!-- 编辑用户 -->
    <el-dialog title="新增分类" :visible.sync="addDialogFormVisible" width="400px">
      <el-form ref="newCategoryForm" size="small" :model="newCategoryForm" :rules="rules">
        <el-form-item label="分类名称" label-width="100px" prop="name">
          <el-input v-model="newCategoryForm.name" type="text" placeholder="请输入分类名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="insertCategory">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改分类" :visible.sync="editDialogFormVisible" width="400px">
      <el-form ref="editCategoryForm" size="small" :model="editCategoryForm" :rules="rules">
        <el-form-item label="用户组名称" label-width="100px" prop="name">
          <el-input v-model="editCategoryForm.name" type="text" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-select v-model="editCategoryForm.state">
            <el-option value="valid" label="正常" />
            <el-option value="lock" label="锁定" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editCategory">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-card>
        <el-form size="small" :inline="true">
          <el-form-item label=" ">
            <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="showInsertCategoryDialog">添加分类</el-button>
          </el-form-item>
          <el-form-item label="状态" label-width="100px">
            <el-select v-model="state">
              <el-option value="valid" label="正常" />
              <el-option value="lock" label="锁定" />
            </el-select>
          </el-form-item>
        </el-form>

        <el-table
          v-loading="tableLoading"
          :data="categoryList"
          row-key="cid"
          border
          style="width: 100%"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="cid"
            label="分类ID"
            width="100"
          />
          <el-table-column
            prop="name"
            label="分类名称"
            width="200"
          />
          <el-table-column
            fixed="right"
            label="操作"
            min-width="300"
          >
            <template slot-scope="scope">
              <el-button v-if="scope.row.state === 'valid' && scope.row.pid === 0" type="success" size="mini" icon="el-icon-circle-plus-outline" @click="insertSubCategory(scope.row)">添加分类</el-button>
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="showEditCategory(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.state === 'valid'" size="mini" type="danger" icon="el-icon-delete" @click="delCategory(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getAdminCategoryList, insertCategory, editCategory, delCategory } from '@/api/category'
export default {
  data() {
    return {
      state: 'valid',
      tableLoading: true,
      categoryList: [],
      newCategoryForm: {
        name: '',
        pid: ''
      },
      editCategoryForm: {
        cid: '',
        name: '',
        state: '',
        pid: ''
      },
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      rules: {
        groupName: {
          required: true, message: '请输入用户组名称', trigger: 'blur'
        }
      }
    }
  },
  watch: {
    state() {
      this.getAdminCategoryList()
    }
  },
  async created() {
    this.getAdminCategoryList()
  },
  methods: {
    insertSubCategory(row) {
      this.addDialogFormVisible = true
      this.newCategoryForm.pid = row.cid
    },
    showInsertCategoryDialog() {
      this.addDialogFormVisible = true
      this.newCategoryForm.pid = 0
    },
    insertCategory() {
      this.$refs.newCategoryForm.validate(async(valid) => {
        if (valid) {
          const data = await insertCategory(this.newCategoryForm)
          if (data.code === 200) {
            this.$message.success('添加成功')
            this.getAdminCategoryList()
            this.addDialogFormVisible = false
            this.$refs.newCategoryForm.resetFields()
          }
        }
      })
    },
    delCategory(row) {
      this.$confirm('是否删除该分类? 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const data = await delCategory({ cid: row.cid })
        if (data.code === 200) {
          this.$message.success('删除成功')
          this.getAdminCategoryList()
        }
      })
    },
    async editCategory() {
      const data = await editCategory(this.editCategoryForm)
      if (data.code === 200) {
        this.$message.success('修改成功')
        this.editDialogFormVisible = false
        this.getAdminCategoryList()
      }
    },
    showEditCategory(row) {
      this.editCategoryForm = this.filterRow(this.editCategoryForm, row)
      this.editDialogFormVisible = true
    },
    async getAdminCategoryList(page_num) {
      const { data } = await getAdminCategoryList({ state: this.state })
      this.categoryList = data.rows
      this.tableLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
