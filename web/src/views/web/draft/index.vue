<template>
  <div class="draftContainer">
    <div class="draftList">
      <div class="listHead">
        我的草稿
      </div>
      <div v-for="item in draftList" :key="item.did" class="item">
        <div class="info">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
        <div class="btns">
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确认删除该草稿吗?无法恢复!"
            @onConfirm="delDraftArticle(item.did)"
          >
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
          <el-button type="warning" size="mini" style="margin-left: 10px" @click="gotoEdit(item.did)">编辑</el-button>
        </div>
      </div>
      <pagination :total="draftTotal" :current-page="searchForm.page_num" @currentChange="currentChange" @handleSizeChange="handleSizeChange" />
    </div>
    <div class="" />
  </div>
</template>

<script>
import { getDraftArticleList, delDraftArticle } from '@/api/draftArticle'
import pagination from '@/components/pagination/pagination'
export default {
  components: {
    pagination
  },
  data() {
    return {
      draftList: [],
      draftTotal: 0,
      searchForm: {
        page_size: 10,
        page_num: 1
      }
    }
  },
  mounted() {
    this.getDraftArticleList()
  },
  methods: {
    gotoEdit(did) {
      this.$router.push({ name: 'handleArticle', query: { did }})
    },
    async delDraftArticle(did) {
      const data = await delDraftArticle({ did })
      if (data.code) {
        this.$message.success('删除成功')
        if (this.searchForm.page_num > 1 && this.draftList.length !== 0) {
          this.getDraftArticleList()
        } else {
          this.searchForm.page_num--
          this.getDraftArticleList()
        }
      }
    },
    async getDraftArticleList() {
      const data = await getDraftArticleList()
      if (data.code === 200) {
        this.draftList = data.data.rows
        this.draftTotal = data.data.count
      }
    },
    handleSizeChange(page_size) {
      this.searchForm.page_size = page_size
      this.getDraftArticleList()
    },
    currentChange(page_num) {
      this.searchForm.page_num = page_num
      this.getDraftArticleList()
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";
.draftContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .draftList {
    border-radius: 6px;
    width: 600px;
    background: #fff;
    padding: 20px;
    .listHead {
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
      color: @defaultColor;
    }
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      border-bottom: 1px solid #eee;
      .info {
        height: 100%;
        flex: 1;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        .title {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-bottom: 15px;
          color:@defaultColor ;
        }
        .time {
          color: #666;
          font-size: 14px;
        }
      }
      .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 120px;
      }
    }
    @media screen and(max-width: 767px) {
      overflow: hidden;
      padding: 5px;
      width: 100%;
      .el-pagination {
        overflow: auto;
      }
    }
  }
}
</style>
