<template>
  <div class="repage_part">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo_form">
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" placeholder="登录账户"></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="ruleForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmpass">
        <el-input
          v-model="ruleForm.confirmpass"
          placeholder="确认密码"
          type="password"
        >
          ></el-input
        >
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="tel">
        <el-input v-model="ruleForm.tel" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { isEmail, isMobile, Vpassword, Vaccnout } from "../../util/valide";
export default {
  data() {
    const checkEm = (rule, value, callback) => {
      if (!isEmail(value)) {
        return callback(new Error("输入正确邮箱"));
      }
      return callback();
    };
    const checkPh = (rule, value, callback) => {
      if (!isMobile(value)) {
        return callback(new Error("输入正确手机号"));
      }
      return callback();
    };
    const comfirmP = (rule, value, callback) => {
      if (value != this.ruleForm.password) {
        return callback(new Error("密码不一致"));
      }
      return callback();
    };
    return {
      ruleForm: {
        account: "",
        nickname: "",
        password: "",
        email: "",
        sex: "",
        tel: "",
        confirmpass: ""
      },
      rules: {
        account: [{ validator: Vaccnout, trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEm, trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPh, trigger: "blur" }
        ],
        password: [{ validator: Vpassword, trigger: "blur" }],
        confirmpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: comfirmP, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {   // 是否通过表单验证
        if (valid) {   // 通过表单验证
          this.axios
            .post("/api/login/register.php", this.Qs.stringify(this.ruleForm)) // 请求接口，传入注册信息
            .then(res => {
              if (res.data.code == 0) {  // 0代表注册成功
                this.$message.success("注册成功，快去登录吧！");  // 提示信息
                this.resetForm(formName);
              } else {
                this.$message.error("失败，请重新尝试");
              }
            });
        } else {
          return false; // 验证表单，提示错误信息
        }
      });
    },
    resetForm(formName) {
      // 清空input框的值
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  color: black;
  font-size: 16px;
}
::v-deep .el-form-item__labe::before {
  content: "";
  display: none;
}
::v-deep .el-radio__label {
  font-size: 16px;
  color: black;
}
</style>
