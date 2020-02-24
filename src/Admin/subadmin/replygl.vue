<template>
  <div class="postgl">
    <el-row>
      <el-col :lg="12" class="textform">
        <span>回复管理</span>
      </el-col>
    </el-row>
    <el-form :inline="true" class="form-inline" style="padding:15px">
      <el-form-item>
        <el-select v-model="optionValue">
          <el-option value="按内容查询"></el-option>
          <el-option value="按昵称查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入查找内容" v-model="val"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="card" v-for="(item, index) in relist" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="padding:0">
          <span style="margin:0 10px"
            >{{ item.nickname }} 发表于 {{ item.addtime }}</span
          >
          <el-button
            style="float: right;"
            type="danger"
            @click="del(item.id, index)"
            >删除</el-button
          >
        </div>
        <div class="text item">
          {{ item.content }}
        </div>
      </el-card>
    </div>
    <div class="setShow" v-show="isShow">
      没有检索到内容
    </div>
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
      optionValue: "按内容查询",
      val: "",
      replydata: [], // 存储原始数据
      relist: [],
      total: 0,
      isShow: false
    };
  },
  watch: {
    relist() {
      if (this.relist.length == 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {  // 分页
      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.relist = this.replydata.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.relist = this.replydata.slice(start, end);
      }
    },
    del(rows, index) {  // 删除帖子
      this.$confirm("确定删除？无法恢复！", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          this.axios
            .post(
              "/api/admin/replygl.php",
              this.Qs.stringify({ operate: "del", id: rows })
            )
            .then(res => {
              console.log(index);
              this.replydata.splice(index, 1);
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
    search() {
      if (this.val == "") {
        this.total = this.replydata.length;
        this.relist = this.replydata.slice(0,13);
        return this.$message.warning("请输入查找内容");
      }
      if (this.optionValue == "按内容查询") {
        this.relist = this.replydata.filter(el => {
          return el.content.toString().match(this.val.toString());
        });
        this.total = this.relist.length;
      }
      if (this.optionValue == "按昵称查询") {
        this.relist = this.replydata.filter(el => {
          return el.nickname.toString().match(this.val.toString());
        });
        this.total = this.relist.length;
      }
    }
  },
  created() {
    this.axios.post("/api/admin/replygl.php").then(res => {
      var fn = [];
      for (var key in res.data) {
        fn.push(res.data[key]);
        res.data[key].num = key;
      }
      console.log(fn);
      this.replydata = fn;
      this.total = this.replydata.length;
      this.relist = this.replydata;
    });
  }
};
</script>

<style lang="scss">
.postgl {
  .setShow{
    display: flex;
    justify-content: center
  }
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
  .card {
    margin: 8px 0;
  }
}
.el-card__header {
  padding: 10px 20px 0 20px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
