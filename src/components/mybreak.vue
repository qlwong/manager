<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my_bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{sectitle}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{thirdtitle}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["sectitle", "thirdtitle"]
};
</script>

<style>
.my_bread {
  height: 40px;
  line-height: 40px;
  background-color: #ddddee;
  padding-left: 10px;
}
</style>
