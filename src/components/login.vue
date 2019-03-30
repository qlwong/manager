<template>
    <div class="login">
       <div class="box">
           <el-form label-position="top" label-width="80px" >
       <el-form-item label="用户名">
     <el-input ></el-input>
     </el-form-item>
    <el-form-item label="密码">
    <el-input ></el-input>
     </el-form-item>
    <el-form-item>
    <el-button type="primary" class="my_btn">登录</el-button>
    
  </el-form-item>
</el-form>
       </div>

    </div>
</template>
<script>
  export default {
    name:'login',
}
</script>
<style lang="scss">
    .login{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #324152;
            .box{
                width: 550px;
                height: 420px;
                border-radius: 10px;
                /* 怪异盒模型 */
                box-sizing: border-box;
                padding: 35px;
                background-color: #fff;
                .my_btn{
                width: 100%;
            }
            }
        }
</style>