<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-break sectitle="权限管理" thirdtitle="角色列表"></my-break>

    <!-- 表格 -->
    <el-table :data="rightlist" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
      <!-- 使用自定义table的模板来处理内容 -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      rightlist: []
    };
  },
  async created() {
    let res = await this.$axios.get("rights/list");
    this.rightlist = res.data.data;
  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
}
</style>
