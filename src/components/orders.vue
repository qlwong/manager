<template>
  <div class="users-container">
    <!-- 面包屑 -->
    <my-bread sectitle="订单管理" thirdtitle="订单列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格（元）" width="180"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <template slot-scope="scope">
          <el-button type="danger" plain v-if="scope.row.pay_status==='0'">未付款</el-button>
          <el-button type="success" plain v-else>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间"></el-table-column>

      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button type="primary" size="mini" icon="el-icon-edit" plain @click="roleFormVisible=true"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="orderData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
    <!-- 订单编辑弹框 -->
     <!-- 编辑角色的弹框 -->
    <el-dialog title="修改地址" :visible.sync="roleFormVisible">
      <el-form :model="editForm">
        <el-form-item label="省市区" label-width="100px">
           <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
         <el-input placeholder="请输入详细地址"></el-input>
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
// 导入省市区数据
import options from '../assets/city_data2017_element.js'
export default {

  name: "orders",
  data() {
    return {
      orderList: [{}, {}],
      orderData: {
        pagenum: 1,
        pagesize: 10,
      },
      total:10,
      // 弹框显示是否
      roleFormVisible:false,
      // 省市去数据
      options,
      // 省市级选中的字段
      selectedOptions2:[],
    };
  },
  methods: {
   
    // 调接口渲染页面
    async search() {
      let res = await this.$axios.get("orders", {
        params: this.orderData
      });
      // console.log(res);
      this.orderList = res.data.data.goods;
      this.orderData.pagenum = res.data.data.pagenum;
      this.total = res.data.data.total;
    },
    // 当前页改变
    currentChange(current) {
      this.orderData.pagenum = current;
      this.search();
    },
    // 页容量改变
    sizeChange(size) {
      this.orderData.pagesize = size;
      this.search();
    }
  },
  created() {
    this.search();
    
  }
};
</script>

<style lang='scss'>
.users-container {
  background-color: #e9eef3;
}
</style>
