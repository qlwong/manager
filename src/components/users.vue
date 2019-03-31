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
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch @change="stateChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleDelete(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <el-button size="mini" type="warning" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
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
      total: 0
    };
  },
  methods: {
    handleDelete(index, row) {},
    async search() {
      let res = await this.$axios.get("users", {
        params: this.userData
      });
      console.log(res);
      this.userlist = res.data.data.users;
      this.total = res.data.data.total;
    },
    stateChange(row){
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`)
    }
  },
  created() {
    this.search()
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
