<template>
  <div>
    <el-row type="flex" justify="center" style="margin-top:100px">
      <el-col :span="6">
        <el-form label-width="80px">
          <el-form-item label="旧密码">
            <el-input v-model="formLabelAlign.oldpass"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="formLabelAlign.newpass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input  type="password" v-model="formLabelAlign.confirmpass"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="danger" @click="comfirmchang">确认修改密码</el-button>
      <el-button type="danger" @click="goback">返回</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: {}
    };
  },
  methods: {
     goback(){
      this.$router.go(-1); //返回上一次浏览的页面
    },
    comfirmchang() {
      this.isshow = true;
      this.$confirm("确认修改您的信息", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          this.formLabelAlign.repass = true;
          this.formLabelAlign.useraccount = this.$store.getters.username; //把vuex里面的东西传过去，账户
          this.axios
            .post("/api/user/userEidt.php", this.Qs.stringify(this.formLabelAlign))
            .then(res => {
              this.$message(res.data);
            });
        })
        .catch(r => {
          this.$message({
            type: "info",
            message: "已经取消"
          });
        });
    },
  }
};
</script>

<style lang="scss" scoped></style>
