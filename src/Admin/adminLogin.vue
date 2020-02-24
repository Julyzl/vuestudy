<template>
  <div class="adminLogin_part">
    <div>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="7" class="setFont"><h2>管理员登录界面</h2></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="5" class="setInput">
          <el-input v-model="account" placeholder="请输入账号"></el-input>
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
          <div style="display:flex">
            <img :src="yzmImg" alt="" />
            <el-button
              type="text"
              style="outline:none;margin:0 10px;font-size:20px"
              @click="changImg"
            >
              换一个验证码
            </el-button>
          </div>
          <el-input v-model="yzm" placeholder="输入验证码"></el-input>

          <el-button
            type="primary"
            round
            style="width:100%;outline:none;margin-top:30px"
            @click="login"
          >
            点击登录</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      yzmImg: "/api/yzm.php",
      yzm: ""
    };
  },
  methods: {
    changImg() {
      let num = Math.floor(Math.random(0, 1) * 10);
      // 点击切换验证码
      this.yzmImg = "/api/yzm.php?" + num;
    },
    login() {
      if (this.account == "" || this.password == "") {
        return this.$message.warning("账号密码不可为空");
      }
      let post = {};
      post.username = this.account;
      post.password = this.password;
      post.yzm=this.yzm
      this.axios
        .post("/api/admin/login.php", this.Qs.stringify(post))
        .then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            console.log(res);
            this.$message.success(res.data.msg);
            localStorage.setItem(
              "admin",
              JSON.stringify({
                isLogin: true,
                username: res.data.username,
                type: res.data.type
              })
            );
            this.$router.push(`/admin`);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    }
  },
  created() {},
    beforeRouteEnter(to, from, next) {
      next()
    //进入这个页面，清空登录状态，并且把localStorage清空
    localStorage.clear(); //退出后把缓存清除
  }
};
</script>

<style lang="scss">
.header_part {
  display: none;
}
.adminLogin_part {
  min-width: 1028px;
  background: url("../assets/5.jpg") no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  .setFont {
    text-align: center;
    margin-top: 50px;
    color: #ff6600;
  }
  .setInput {
    input {
      margin: 15px 0;
    }
  }
}
</style>
