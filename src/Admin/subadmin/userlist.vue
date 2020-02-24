<template>
  <div class="userpost_part">
    <el-row>
      <el-col :lg="12" class="textform">
        <span>用户管理</span>
      </el-col>
    </el-row>
    <el-form :inline="true" class="form-inline" style="padding:15px">
      <el-form-item>
        <el-select v-model="optionValue">
          <el-option value="按昵称查询"></el-option>
          <el-option value="按用户名查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入查找内容" v-model="val"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userlist" style="width: 100%" max-height="$maxHeight">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名:">
              <span>{{ props.row.account }}</span>
            </el-form-item>
            <el-form-item label="昵称:">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="住址:">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="手机号:">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="注册时间:">
              <span>{{ props.row.addtime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickname"> </el-table-column>
      <el-table-column label="用户名" prop="account"> </el-table-column>
      <el-table-column label="注册时间" prop="addtime"> </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :page-size="14"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionValue: "按昵称查询",
      val: "",
      total: 0,
      tableData: [], // 过滤
      userlist: [] //展示
    };
  },
  methods: {
    handleCurrentChange(val) {
      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.userlist = this.tableData.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.userlist = this.tableData.slice(start, end);
      }
    },
    search() {
      if (this.val == "") {
        this.userlist = this.tableData.slice(0,13); //全部展示
        this.total = this.tableData.length;
        this.$message.warning("请选择查询条件");
        return;
      }
      if (this.optionValue == "按昵称查询") {
        this.userlist = this.tableData.filter(el => {
          return el.nickname.toString().match(this.val.toString());
        });
        this.total = this.userlist.length;
      }
      if (this.optionValue == "按用户名查询") {
        this.userlist = this.tableData.filter(el => {
          return el.account.toString().match(this.val.toString());
        });
        this.total = this.userlist.length;
      }
    },
    getApi() {
      this.axios.get("/api/admin/userlist.php").then(res => {
        this.total = res.data.length;
        this.tableData = res.data;
        this.userlist = res.data.slice(0,13);
      });
    }
  },
  created() {
    this.getApi();
  }
};
</script>

<style lang="scss" scoped>
.textform {
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  margin: 10px 0 20px;
  border-bottom: 1px solid transparent;
  font-size: 34px;
  font-weight: 500;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
