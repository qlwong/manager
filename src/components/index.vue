<template>
  <el-container class="index-container">
    <el-header class="my_header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/index.png" alt>
        </el-col>
        <el-col :span="19">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <el-button type="danger" round>退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my_container">
      <el-aside width="200px" class="my_aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">    
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <span class="el-icon-menu"></span> 选项1
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my_main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "index"
};
</script>
<style lang="scss">
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .my_header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
  .my_container {
    flex: 1;
    .my_aside {
      background-color: yellowgreen;
    }
    .my_main {
      background-color: skyblue;
    }
  }
}
</style>