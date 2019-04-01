<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-break sectitle="权限管理" thirdtitle="角色列表"></my-break>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="3">
        <el-button type="success" plain @click="addFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="email" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            size="mini"
            @click="delone(scope.row)"
            type="danger"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            @click="showRole(scope.row)"
            size="mini"
            type="warning"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  
  </div>
</template>

<script>
export default {
    name:'roles',
  data() {
    return {}
  },
 
  
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
}
</style>
