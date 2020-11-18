<template>
  <div class="categoryList">
    <template v-for="(item,index) in categoryList">
      <el-popover
        :key="item.cid"
        placement="bottom"
        width="300"
        trigger="hover"
      >
        <span v-for="(subItem,index2) in item.children" :key="subItem.cid" class="subItem" :class="subItem.isSelect ? 'active': ''" @click="handleSelectCategory(index,subItem.cid,subItem.pid,index2)">{{ subItem.name }}</span>
        <span slot="reference" class="item" :class="item.isSelect ? 'active': ''" @click="handleSelectCategory(index,item.cid,item.pid)">{{ item.name }}</span>
      </el-popover>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default: () => []
    },
    selectIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  created() {
    if (this.selectIds.length > 0) {
      this.categoryList.forEach(item => {
        if (this.selectIds.indexOf(item.cid) !== -1) {
          item.isSelect = true
        }
        item.children.forEach(item2 => {
          if (this.selectIds.indexOf(item2.cid) !== -1) {
            item2.isSelect = true
          }
        })
      })
    }
  },
  methods: {
    handleSelectCategory(index, id, pid, index2) {
      if (index2 !== undefined) {
        this.categoryList[index].children[index2].isSelect = !this.categoryList[index].children[index2].isSelect
        for (let i = 0; i < this.categoryList[index].children.length; i++) {
          if (this.categoryList[index].children[i].isSelect) {
            this.categoryList[index].isSelect = true
            break
          } else {
            this.categoryList[index].isSelect = false
          }
        }
      }
      this.$forceUpdate()
    },
    getSelectIds() {
      const arr = []
      this.categoryList.forEach(item => {
        if (item.isSelect) {
          arr.push(item.cid)
        }
        item.children.forEach(item2 => {
          if (item2.isSelect) {
            arr.push(item2.cid)
          }
        })
      })
      return arr.join(',')
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.categoryList {
  width: 100%;
  display: flex;
  flex-direction: row;
  .item {
    cursor: pointer;
    font-size: 16px;
    color: #333333;
    transition: color 0.6s;
    margin-right: 30px;
    outline: none;
    &:hover {
      color: @defaultColor;
    }
    &.active {
      color: @defaultColor;
    }
  }

}
.subItem {
  cursor: pointer;
  font-size: 14px;
  color: #666666;
  display: inline-block;
  padding: 5px 8px;
  border: 1px solid #eee;
  border-radius: 6px;
  transition: all 0.4s;
  margin-right: 10px;
  margin-bottom: 6px;
  &:hover {
    color: #ffffff;
    background: @defaultColor;
  }
  &.active {
    color: #ffffff;
    background: @defaultColor;
  }
}
</style>
