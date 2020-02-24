<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      ref="ruleForm"
    >
      <el-form-item prop="input">
        <el-input
          v-model="ruleForm.input"
          placeholder="标题"
          style="margin:20px 0"
        ></el-input>
      </el-form-item>
      <el-form-item prop="textarea">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          style="margin:20px 0"
          v-model="ruleForm.textarea"
        >
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >发表帖子</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        input: "",
        textarea: ""
      },
      rules: {
        input: [
          { required: true, message: "请填写标题", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "blur"
          }
        ],
        textarea: [
          { required: true, message: "请填写内容", trigger: "blur" },
          {
            min: 50,
            max: 1000,
            message: "长度在 50 到 1000 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let post = {};
          (post.id = this.$store.state.userid),
            (post.content = this.ruleForm.textarea),
            (post.title = this.ruleForm.input);
          if (this.$store.state.isLogin) {
            this.axios.post("/api/BBS/addpost.php", this.Qs.stringify(post))
            .then(res=>{
                this.$message.success("发表成功")
                this.$router.push("/communication")
            });
          } else {
            this.$message.warning("请登录后再来操作！");
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
