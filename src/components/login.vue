<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form
        label-position="top"
        label-width="80px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')">登录</el-button>
          <el-button type="success" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){

        }else{
          this.$message.error('数据类型错误,根据提示重写');
          return false;
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box {
    width: 550px;
    height: 420px;
    border-radius: 10px;
    /* 怪异盒模型 */
    box-sizing: border-box;
    padding: 35px;
    background-color: #fff;
    .my_btn {
      width: 100%;
    }
  }
}
</style>