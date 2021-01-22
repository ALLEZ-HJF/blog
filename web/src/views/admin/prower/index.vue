<template>
  <div>
    <el-card>
      <el-select v-model="gid" @change="changeUserGroup">
        <el-option v-for="item in userGroupList" :key="item.gid" :label="item.groupName" :value="item.gid" />
      </el-select>
    </el-card>
    <br>
    <el-card>
      <el-tree
        ref="prowerTree"
        :data="routerList"
        show-checkbox
        node-key="rid"
        :default-checked-keys="prowerList"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        :check-strictly="true"
      />
      <el-button type="primary" size="small" style="margin-top: 10px;" @click="editPowerByGid">分配权限</el-button>
    </el-card>
  </div>
</template>

<script>
import { getUserGroupList } from '@/api/userGroup'
import { getPowerByGid, editPowerByGid } from '@/api/userGroupPrower'

export default {
  data() {
    return {
      userGroupList: [],
      gid: '',
      routerList: [],
      prowerList: [],
      defaultProps: {
        children: 'child',
        label: 'title'
      }
    }
  },
  mounted() {
    this.getUserGroupList()
  },
  methods: {
    async editPowerByGid() {
      const obj = {
        rid_str: this.$refs.prowerTree.getCheckedKeys().join(','),
        gid: this.gid
      }
      const data = await editPowerByGid(obj)
      if (data.code === 200) {
        this.$message.success('分配成功')
      }
    },
    async changeUserGroup() {
      // 获取权限列表
      const data = await getPowerByGid({ gid: this.gid })
      if (data.code === 200) {
        this.routerList = data.data.router
        this.prowerList = data.data.data
      }
    },
    async getUserGroupList() {
      const data = await getUserGroupList()
      if (data.code === 200) {
        this.userGroupList = data.data.rows
        if (!this.gid) {
          this.gid = this.userGroupList[0].gid
        }
        this.changeUserGroup()
      }
    }
  }
}
</script>

<style>

</style>
