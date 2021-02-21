<template>
  <div class="userGroupListContainer">
    <!-- 编辑用户 -->
    <el-dialog title="新增用户组" :visible.sync="addDialogFormVisible" width="400px">
      <el-form ref="newGroupForm" size="small" :model="newGroupForm" :rules="rules">
        <el-form-item label="用户组名称" label-width="100px" prop="groupName">
          <el-input v-model="newGroupForm.groupName" type="text" placeholder="请输入用户组名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="insertUserGroup">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户组" :visible.sync="editDialogFormVisible" width="400px">
      <el-form ref="editGroupForm" size="small" :model="editGroupForm" :rules="rules">
        <el-form-item label="用户组名称" label-width="100px" prop="groupName">
          <el-input v-model="editGroupForm.groupName" type="text" placeholder="请输入用户组名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editUserGroup">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-card>
        <el-form size="small" :inline="true">
          <el-form-item label=" ">
            <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="addDialogFormVisible = true">添加用户组</el-button>
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
          :data="userGroupList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="gid"
            label="用户组ID"
            width="100"
          />
          <el-table-column
            prop="groupName"
            label="用户组名称"
            width="200"
          />
          <el-table-column
            fixed="right"
            label="操作"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-button type="warning" size="small" icon="el-icon-edit" @click="showEditUserGroup(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.state === 'valid'" size="small" type="danger" icon="el-icon-delete" @click="delUserGroup(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination :total="userGroupListTotal" :current-page="page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserGroupList, insertUserGroup, editUserGroup, delUserGroup } from '@/api/userGroup'
import pagination from '@/components/pagination/pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      page_num: 1,
      page_size: 10,
      state: 'valid',
      tableLoading: true,
      userGroupList: [],
      userGroupListTotal: 0,
      newGroupForm: {
        groupName: '',
        role: 'admin'
      },
      editGroupForm: {
        gid: '',
        groupName: '',
        role: 'admin'
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
      this.getUserGroupList()
    }
  },
  async created() {
    this.getUserGroupList()
  },
  methods: {
    insertUserGroup() {
      this.$refs.newGroupForm.validate(async(valid) => {
        if (valid) {
          const data = await insertUserGroup(this.newGroupForm)
          if (data.code === 200) {
            this.$message.success('添加成功')
            this.getUserGroupList()
            this.addDialogFormVisible = false
          }
        }
      })
    },
    delUserGroup(row) {
      this.$confirm('是否删除该用户组? 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const data = await delUserGroup({ gid: row.gid })
        if (data.code === 200) {
          this.$message.success('删除成功')
          this.getUserGroupList()
        }
      })
    },
    async editUserGroup() {
      const data = await editUserGroup(this.editGroupForm)
      if (data.code === 200) {
        this.$message.success('修改成功')
        this.editDialogFormVisible = false
        this.getUserGroupList(1)
      }
    },
    showEditUserGroup(row) {
      this.editGroupForm = this.filterRow(this.editGroupForm, row)
      this.editDialogFormVisible = true
    },
    async getUserGroupList(page_num) {
      if (page_num) {
        this.page_num = page_num
      }
      const { data } = await getUserGroupList({ page_num: this.page_num, page_size: this.page_size, state: this.state })
      this.userGroupList = data.rows
      this.userGroupListTotal = data.count
      this.tableLoading = false
    },
    handleSizeChange(page_size) {
      this.page_size = page_size
      this.getUserGroupList()
    },
    currentChange(page_num) {
      this.getUserGroupList(page_num)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
