<template>
  <div>
    <el-card>
      <el-select v-model="role" placeholder="请选择" @change="getRouterList">
        <el-option label="用户" value="user" />
        <el-option label="管理员" value="admin" />
      </el-select>
    </el-card>
    <br>
    <el-card>
      <div>
        <el-button type="primary" size="small" @click="showForm('add')">添加路由</el-button>
      </div>
      <br>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="rid"
        border
        :tree-props="{children: 'child'}"
      >
        <el-table-column
          prop="title"
          label="路由/权限"
          min-width="200px"
        />
        <el-table-column
          prop=""
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_page === 'yes'" type="primary" size="mini" @click="showForm('add', scope.row)">新增</el-button>
            <el-button type="warning" size="mini" @click="showForm('edit', scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="delRouter(scope.row.rid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加路由/权限 -->
    <el-dialog :title="formDialogTitle" :visible.sync="showFormVisable" width="600px">
      <el-form ref="form" :model="form" label-width="80px" inline size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="form.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="form.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否隐藏" prop="hidden">
          <el-select v-model="form.hidden">
            <el-option label="否" :value="false" />
            <el-option label="是" :value="true" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否页面" prop="is_page">
          <el-select v-model="form.is_page">
            <el-option label="否" value="no" />
            <el-option label="是" value="yes" />
          </el-select>
        </el-form-item>
        <el-form-item label="重定向" prop="redirect_name">
          <el-input v-model="form.redirect_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item label="api" prop="api">
          <el-input v-model="form.api" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFormVisable = false">取 消</el-button>
        <el-button type="primary" @click="confirmRouterForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getRouterList, insertRouter, editRouter, delRouter } from '@/api/routers'
export default {
  data() {
    return {
      role: 'user',
      tableData: [],
      formDialogTitle: '新增路由/权限',
      showFormVisable: false,
      isAdd: true,
      form: {
        rid: '',
        title: '',
        path: '',
        name: '',
        icon: '',
        component: '',
        hidden: '',
        is_page: '',
        redirect_name: '',
        sort: '',
        api: '',
        pid: '',
        role: ''
      }
    }
  },
  mounted() {
    this.getRouterList()
  },
  methods: {
    delRouter(rid) {
      this.$confirm('是否删除该路由/权限', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const res = await delRouter({ rid: rid })
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getRouterList()
        }
      }).catch(() => {
      })
    },
    async confirmRouterForm() {
      if (this.isAdd) {
        // 添加
        this.form.role = this.role
        const res = await insertRouter(this.form)
        if (res.code === 200) {
          this.$message.success('添加成功')
          this.getRouterList()
        }
      } else {
        // 修改
        const res = await editRouter(this.form)
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.getRouterList()
        }
      }
      this.showFormVisable = false
    },
    showForm(type, row) {
      if (type === 'add') {
        this.formDialogTitle = '新增路由/权限'
        this.isAdd = true
        this.showFormVisable = true
        for (const key in this.form) {
          this.form[key] = ''
        }
        if (row) {
          this.form.pid = row.rid
        }
      } else {
        this.formDialogTitle = '修改路由/权限'
        this.isAdd = false
        this.form = this.filterRow(this.form, row)
        this.showFormVisable = true
      }
    },
    async getRouterList() {
      const data = await getRouterList({ role: this.role })
      if (data.code === 200) {
        this.tableData = data.data
      }
    }
  }
}
</script>

<style>

</style>
