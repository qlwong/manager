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
          <el-button type="danger" round @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my_container">
      <el-aside width="200px" class="my_aside">
        <el-menu default-active="users" router class="el-menu-vertical-demo">
          <el-submenu :index="item.id+''" v-for="item in menuslist">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="it.path" v-for="it in item.children" >
              <span class="el-icon-menu"></span>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      menuslist: []
    };
  },
  methods: {
    logout() {
      // 退出登录
      // 删除token
      window.sessionStorage.removeItem("token");
      // 页面跳转到登录页,编程式导航
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if (window.sessionStorage.getItem("token")) {
    } else {
      // 没有token.弹出提示
      this.$message.error("请登录");
      this.$router.push("/login");
    }
  },
  async created() {
    // 请求页面左侧的数据
    let res = await this.$axios.get("menus");
    this.menuslist = res.data.data;
  }
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
      background-color: white;
    }
    .my_main {
      background-color: #e8edf3;
      padding-top: 0;
    }
  }
}
</style>