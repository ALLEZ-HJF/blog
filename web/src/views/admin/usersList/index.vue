<template>
  <div class="userListContainer">
    <div class="searchFormBox">
      <el-card>
        <el-form ref="searchForm" :model="searchForm" size="mini" :inline="true" label-width="80px">
          <el-form-item label="用户ID">
            <el-input v-model="searchForm.uid" type="number" />
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input v-model="searchForm.username" type="text" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="searchForm.phone" type="number" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="searchForm.email" type="email" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.state">
              <el-option value="valid" label="正常" />
              <el-option value="invalid" label="未审核" />
              <el-option value="lock" label="锁定" />
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" icon="el-icon-search" @click="getUserList(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible" width="400px">
      <el-form :model="editUserForm" label-width="80px" size="small">
        <el-form-item label="登录账号">
          <el-input v-model="editUserForm.username" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editUserForm.email" disabled autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editUserForm.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editUserForm.state">
            <el-option value="valid" label="正常" />
            <el-option value="invalid" label="未审核" />
            <el-option value="lock" label="锁定" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editUserForm.password" type="password" autocomplete="off" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-card>
        <el-table
          v-loading="tableLoading"
          :data="userList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="uid"
            label="用户ID"
            width="100"
          />
          <el-table-column
            prop="username"
            label="用户名称"
            width="200"
          />
          <el-table-column
            prop="nickname"
            label="用户昵称"
            width="200"
          />
          <el-table-column
            prop="sex"
            label="性别"
            width="100"
          />
          <el-table-column
            prop="phone"
            label="手机号码"
            width="150"
          />
          <el-table-column
            prop="email"
            label="邮箱"
            width="200"
          />
          <el-table-column
            prop="groupName"
            label="用户组"
            width="100"
          />
          <el-table-column
            fixed="right"
            label="操作"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-button type="warning" size="small" icon="el-icon-edit" @click="showEditUser(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.state === 'valid'" size="small" type="danger" icon="el-icon-delete" @click="delUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination :total="userListTotal" :current-page="searchForm.page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserList, delUser, editUser } from '@/api/user'
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
        state: 'valid',
        page_num: 1,
        page_size: 10
      },
      tableLoading: true,
      userList: [],
      userListTotal: 0,
      editUserForm: {
        uid: '',
        username: '',
        nickname: '',
        email: '',
        password: '',
        state: ''
      },
      editDialogFormVisible: false
    }
  },
  async created() {
    this.getUserList()
  },
  methods: {
    delUser(row) {
      this.$confirm('是否删除该用户? 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const data = await delUser({ uid: row.uid })
        if (data.code === 200) {
          this.$message.success('删除成功')
          this.getUserList()
        }
      })
    },
    async editUser() {
      const data = await editUser(this.editUserForm)
      if (data.code === 200) {
        this.$message.success('修改成功')
        this.editDialogFormVisible = false
        this.getUserList(1)
      }
    },
    showEditUser(row) {
      this.editUserForm = this.filterRow(this.editUserForm, row)
      this.editDialogFormVisible = true
    },
    async getUserList(page_num) {
      if (page_num) {
        this.searchForm.page_num = page_num
      }
      const { data } = await getUserList(this.searchForm)
      this.userList = data.rows
      this.userListTotal = data.count
      this.tableLoading = false
    },
    handleSizeChange(page_size) {
      this.searchForm.page_size = page_size
      this.getUserList()
    },
    currentChange(page_num) {
      this.getUserList(page_num)
    }
  }
}
</script>

<style lang="less" scoped>
.userListContainer {
  .searchFormBox {
    margin-bottom: 15px;
  }
}
</style>
