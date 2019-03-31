<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my_bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="userData.query">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 0,
    };
  },
  async created() {
    let res = await this.$axios.get("users", {
      headers: { Authorization: window.sessionStorage.getItem("token") },
      params: this.userData
    });
    console.log(res);
    this.userlist=res.data.data.users;
    this.total=res.data.data.total;
    this.userData.pagenum=res.data.data.pagenum;
    // this.userData.pagesize=res.data.data.pagenum;
  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
  .my_bread {
    height: 40px;
    line-height: 40px;
    background-color: #ddddee;
  }
}
</style>
