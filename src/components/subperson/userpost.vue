<template>
  <div>
    <el-form :inline="true" class="form-inline" style="padding:15px">
      <el-form-item>
        <el-select v-model="optionValue">
          <el-option value="按标题查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入查找内容" v-model="val"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" style="width: 100%" max-height="$maxHeight">
      <el-table-column fixed prop="addtime" label="日期" width="300">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="300"> </el-table-column>
      <el-table-column prop="content" label="内容" width="500">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="400">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="check(scope.$index, tableData4)"
            type="text"
            size="small"
          >
            查看
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
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
      optionValue: "按标题查询",
      val: "", //搜索的内容
      tableData4: [],
      list:[],
      total:0
    };
  },
  methods: {
        handleCurrentChange(val) {
      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.list = this.tableData4.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.list = this.tableData4.slice(start, end);
      }
    },
    deleteRow(index, rows) {
      //  console.log(rows[0].id);//删除的id号
      this.$confirm("确定删除这条帖子？", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          this.axios
            .post(
              "/api/user/mypost.php",
              this.Qs.stringify({ operate: "del", id: rows[0].id })
            )
            .then(res => {
              rows.splice(index, 1);
              this.$message({
                type: "success",
                message: res.data
              });
            });
        })
        .catch(r => {
          this.$message({
            type: "info",
            message: "已经取消"
          });
        });
    },
    check(index, rows) {
     this.$router.push(`/communication/${rows[0].id}`)
    },
    search() {
        if (this.val == "") {
        this.total = this.tableData4.length;
        this.list = this.tableData4;
        return this.$message.warning("请输入查找内容");
      }
      this.list = this.tableData4.filter(post => {
        //过滤posts每一条信息,用（post）接收并且用箭头函数使用
        return post.title.match(this.val); //标题和输入框的值是否相等
      });
      this.total = this.list.length;
    }
  },
  created() {
    this.axios
      .post(
        "/api/user/mypost.php",
        this.Qs.stringify({ id: this.$store.state.userid })
      )
      .then(res => {
        var fn = [];
        for (var key in res.data) {
          fn.push(res.data[key]);
          res.data[key].num = key;
        }
        console.log(fn);
        this.tableData4 = fn;
        this.list=this.tableData4
        this.total=this.tableData4.length
      });
  }
};
</script>

<style lang="scss" scoped></style>
