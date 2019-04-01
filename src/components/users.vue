<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <my-break sectitle="用户管理" thirdtitle="用户列表"></my-break>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="userData.query" @keyup.native.enter="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="success" plain @click="addFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="stateChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
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
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户的弹框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色的弹框 -->
    <el-dialog title="用户角色" :visible.sync="roleFormVisible">
      <el-form :model="editForm">
        <el-form-item label="当前用户" label-width="100px">{{editUser.username}}</el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="editUser.role_name" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'users',
  data() {
    return {
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 0,
      // 添加用户弹框是否显示
      addFormVisible: false,
      // 添加用户的信息
      addForm: {
        username: "彩虹",
        password: "123456",
        email: "rainbow@qq.com",
        mobile: "12333366666"
      },
      // 修改弹窗是否显示
      editFormVisible: false,
      // 修改用户信息
      editForm: {
        username: "彩虹",
        email: "rainbow@qq.com",
        mobile: "12333366666"
      },
      // 验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      },
      // 角色编辑弹窗是否显示
      roleFormVisible: false,
      // 角色列表
      rolelist: [],
      // 当前编辑的角色信息
      editUser: {}
    };
  },
  methods: {
    async handleEdit(index, row) {
      console.log(index);
      console.log(row);
      // 点击编辑按钮弹出
      this.editFormVisible = true;
      // 调用接口查出对应要编辑的
      let res = await this.$axios.get(`users/${row.id}`);
      // console.log(res);
      this.editForm = res.data.data;
      if (res.data.meta.status === 200) {
        // 成功就弹出编辑框
        this.editFormVisible = true;
      }
    },
    async search() {
      let res = await this.$axios.get("users", {
        params: this.userData
      });
      // console.log(res);
      this.userlist = res.data.data.users;
      this.total = res.data.data.total;
      // 清空输入框
      this.query = "";
    },
    stateChange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    // 提交新增
    submitAdd(formName) {
      //确认时验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 验证成功就发添加用户的请求
          let res = await this.$axios.post("users", this.addForm);
          // 判断提交是否成功
          if (res.data.meta.status === 201) {
            // 提交成功后重新刷新页面
            this.search();
          }
          console.log(res);

          // 关闭弹窗
          this.addFormVisible = false;
        } else {
          this.$message.error("请输入正确数据");
          return false;
        }
      });
    },
    // 提交修改
    async submitEdit(formName) {
      // 调用接口
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      if (res.data.meta.status === 200) {
        this.search();
      }
      // 关闭弹窗
      this.editFormVisible = false;
    },
    // 删除
    delone(row) {
      this.$confirm("确定要永久删除该用户吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 调用接口
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 弹出角色框
    async showRole(row) {
      this.roleFormVisible = true;
      // 保存编辑的用户信息
      this.editUser = row;
      // 获取角色列表
      let res = await this.$axios.get("roles");
      this.rolelist = res.data.data;
    },
    // 分配角色
    async submitRole(formName) {
      // 获取角色id
      // 获取用户id
      let res = await this.$axios.put(`users/${this.editUser.id}/role`, {
        rid: this.editUser.role_name
      });
      if (res.data.meta.status === 200) {
        // 关闭弹窗
        this.roleFormVisible = false;
        // 重新获取数据
        this.search();
      }
    },
    // 页码改变
    currentChange(current) {
      this.userData.pagenum = current;
      this.search();
    },
    // 页容量改变
    sizeChange(size) {
      this.userData.pagesize = size;
      this.search();
    }
  },
  created() {
    this.search();
  }
};
</script>

<style lang='scss'>
.user-container {
  background-color: #eeeeff;
}
</style>
