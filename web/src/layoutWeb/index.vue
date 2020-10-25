<template>
  <div class="layoutContainer">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="16" :offset="4">
            <div class="left">
              <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" lazy />
              <div class="navMenu">
                <router-link tag="a" :to="{ name: 'web/index' }">首页</router-link>
              </div>
            </div>
            <div class="right" />
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="16" :offset="4">
            <router-view />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scope>
@import "@/style/variables.less";
.layoutContainer {
  height: 100%;
  .el-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-header {
      background: @headerBgColor;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
      height: 80px !important;
      .el-row,
      .el-col {
        height: 100%;
      }
      .el-col {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .el-image {
            display: block;
            width: 120px;
            height: 70px;
          }
          .navMenu {
            color: @defaultColor;
            display: flex;
          }
        }
      }
    }
    .el-main {
      flex: 1;
      background: @bgColor;
    }
  }
}
</style>
