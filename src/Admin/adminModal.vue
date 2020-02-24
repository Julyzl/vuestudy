<template>
  <div>
    <el-dialog title="注册管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="管理员账号"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="管理员密码"
          :label-width="formLabelWidth"
          prop="pass"
        >
          <el-input v-model="form.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confrim"
        >
          <el-input v-model="form.confrim" type="password"></el-input>
        </el-form-item>
        <el-form-item label="管理等级" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="超级管理员" value="shanghai"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVip('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isEmail, isMobile, Vpassword, Vaccnout } from "../util/valide";

export default {
  data() {
    // 两次密码校验
    const comfirmP = (rule, value, callback) => {
      if (value != this.form.pass) {
        return callback(new Error("密码不一致"));
      }
      return callback();
    };
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        type: "管理员",
        pass: "",
        confrim: ""
      },
      rules: {
        name: [{ validator: Vaccnout, trigger: "blur" }],
        pass: [{ validator: Vpassword, trigger: "blur" }],
        confrim: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: comfirmP, trigger: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  props: ["setkey"],
  created() {
    console.log(111);
    this.dialogFormVisible = this.setkey;
    // console.log(this.setkey);
  },
  methods: {
    addVip(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.operate = "addVip";
          this.axios
            .post("/api/admin/action.php", this.Qs.stringify(this.form))
            .then(res => {
              this.$message.info(res.data);
            });
        }
      });

      //   this.dialogFormVisible = false
    }
  }
};
</script>
