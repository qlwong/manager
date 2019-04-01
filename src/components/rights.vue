<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-break sectitle="权限管理" thirdtitle="角色列表"></my-break>
    
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="email" label="路径" width="180"></el-table-column>
      <el-table-column prop="email" label="层级" width="180"></el-table-column>
     
    </el-table>
    
  
  </div>
</template>

<script>
export default {
    name:'rights',
  data() {
    return {}
  },
  methods: {
  
   
   
  },
 
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
}
</style>
