<template>
  <div class="layoutContainer">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="16" :offset="4">
            <div class="left">
              <img class="logoImg" src="@/assets/logo.png">
              <div class="navMenu">
                <router-link class="menu active" tag="a" :to="{ name: 'web/index' }">首页</router-link>
                <router-link class="menu" tag="a" :to="{ name: 'web/index' }">文章</router-link>
                <router-link class="menu" tag="a" :to="{ name: 'web/index' }">问答</router-link>
              </div>
            </div>
            <div class="right">
              <el-input class="rightMenu" size="small" prefix-icon="el-icon-search" placeholder="请输入内容回车搜索" />
              <el-button class="rightMenu" size="small" type="primary">写文章</el-button>
              <el-button class="rightMenu" plain size="small" type="primary">登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3" class="main">
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

<style lang="less">
@import "@/styles/variables.less";
.layoutContainer {
  height: 100%;
  .el-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-header {
      background: @headerBgColor;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
      height: 70px !important;
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
          .logoImg {
            display: block;
            width: 120px;
            height: 60px;
            cursor: pointer;
          }
          .navMenu {
            color: @defaultColor;
            display: flex;
            .menu {
              margin-left: 50px;
              font-size: 16px;
              &:hover {
                color: @defaultColor;
              }
            }
            .active {
              color: @defaultColor;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          .rightMenu {
            margin-right: 10px;
          }
          .el-input {
            margin-right: 50px;
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
