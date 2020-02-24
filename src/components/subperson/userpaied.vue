<template>
  <div class="cart">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="收货人:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱:" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="送货方式" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择送货方式">
          <el-option label="站点自提" value="站点自提"></el-option>
          <el-option label="普通快递" value="普通快递"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮寄地址:" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="支付形式" prop="pay">
        <el-select v-model="ruleForm.pay" placeholder="请选择支付方式">
          <el-option label="支付宝" value="支付宝"></el-option>
          <el-option label="微信" value="微信"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="bz">
        <el-input v-model="ruleForm.bz"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交订单</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    //手机号检验
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        //引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };

    //邮箱检验
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      ruleForm: {
        name: "",
        region: "站点自提",
        tel: "",
        address: "",
        bz: "",
        pay: "支付宝",
        email: ""
      },
      rules: {
        address: [
          { required: true, message: "请输入收货地址", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        name: [
          { required: true, message: "请输入收件人", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
          { required: true, validator: checkphone, trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.$store.state.shoptotal);
          var a = this.$store.state.tableData;
          let num = "";
          let id = "";
          // 分割操作 重新拼接插入数据库
          a.map(el => {
            num += `${el.number}@`;
            id += `${el.id}@`;
          });
          if (a.length == 0){
            this.$message.warning('请购买商品后再来提交订单')
             return false;
          };
          // 传给后台的对象
          this.ruleForm.kqnum = num;
          this.ruleForm.kqid = id;
          this.ruleForm.id = this.$store.state.userid;
          this.ruleForm.account = this.$store.state.username;
          this.ruleForm.total = this.$store.state.shoptotal;
          this.axios.post(
            "/api/cart/save.php",
            this.Qs.stringify(this.ruleForm)
          ).then(res=>{
            //提交订单后清除购物车跳转页面  后台返回订单号
            this.$store.dispatch("clearShop");
            this.$router.push(`/person/topay/${res.data}`)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    let post = {};
    post.operate = "get";
    post.id = this.$store.state.userid;
    this.axios
      .post("/api/cart/getmsg.php", this.Qs.stringify(post))
      .then(res => {
        this.ruleForm.name = res.data.nickname;
        this.ruleForm.tel = res.data.tel;
        this.ruleForm.address = res.data.address;
        this.ruleForm.email = res.data.email;
      });
  }
};
</script>

<style lang="scss" scoped>
.cart {
  margin-top: 50px;
}
</style>
