<template>
  <div class="postgl">
    <el-row>
      <el-col :lg="12" class="textform">
        <span>帖子管理</span>
      </el-col>
    </el-row>
    <el-form :inline="true" class="form-inline" style="padding:15px">
      <el-form-item>
        <el-select v-model="optionValue">
          <el-option value="按昵称查询"></el-option>
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
    <div class="card" v-for="(item, index) in resData" :key="index">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="padding:0">
          <span style="margin:0 10px"
            >{{ item.nickname }} 发表于 {{ item.addtime }}</span
          >
          <span>标题:{{ item.title }}</span>
          <el-button
            style="float: right;"
            type="danger"
            @click="del(index, item.id)"
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
      optionValue: "按昵称查询",
      val: "",
      data: [],
      resData: [],
      total: 0,
      isShow: false
    };
  },
  watch: {
    resData() {
      if (this.resData.length == 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.resData = this.data.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.resData = this.data.slice(start, end);
      }
    },
    del(index, id) {  // 删除帖子
      this.$confirm("确定删除？无法恢复！", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          let post = {};
          post.operate = "delpost";
          post.id = id;
          this.axios
            .post("/api/admin/action.php", this.Qs.stringify(post))
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          this.data.splice(index, 1);
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
        this.total = this.data.length;
        this.resData = this.data.slice(0,13);
        return this.$message.warning("请输入查找内容");
      }
      if (this.optionValue == "按昵称查询") {
        this.resData = this.data.filter(el => {
          return el.nickname.toString().match(this.val.toString());
        });
        this.total = this.resData.length;
      }
      if (this.optionValue == "按标题查询") {
        this.resData = this.data.filter(el => {
          return el.title.toString().match(this.val.toString());
        });
        this.total = this.resData.length;
      }
    }
  },
  created() {
    this.axios.post("/api/admin/bbslist.php").then(res => {
      this.data = res.data;
      this.resData = res.data;
    });
  }
};
</script>

<style lang="scss">
.postgl {
  .setShow {
    display: flex;
    justify-content: center;
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
