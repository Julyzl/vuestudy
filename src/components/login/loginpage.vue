<template>
  <form>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        v-model="userdata.account"
        placeholder="请输入账号"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        v-model="userdata.password"
        placeholder="请输入密码"
      />
    </div>
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
    <div class="form-group">
      <input
        class="form-control"
        v-model="userdata.yzm"
        placeholder="请输入验证码"
      />
    </div>
    <button class="btn btn-block btn_mg" @click.prevent="login">
      确认登录
    </button>
    <div tag="div" @click="ceshi" class="text-center">忘记密码?</div>
  </form>
</template>

<script>
import { gethome } from "@/http/api";
export default {
  data() {
    return {
      userdata: {},
      yzmImg: "/api/yzm.php"
    };
  },
  methods: {
    ceshi() {
      gethome().then(res=>{
        console.log(res);
      })
    },
    changImg() {
      let num = Math.floor(Math.random(0, 1) * 10);
      // 点击切换验证码
      this.yzmImg = "/api/yzm.php?" + num;
    },
    login() {
      // 登录账号和密码不为空
      if (!this.userdata.account || !this.userdata.password) {
        this.$message("请填写完整信息");
        return false;
      }
      // 请求接口
      this.axios
        .post("/api/login/login.php", this.Qs.stringify(this.userdata))
        .then(res => {
          // 如果返回的code为0，说明登录成功
          if (res.data.code == 0) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            // 把用户名的存入vuex状态管理中去(登录成功状态和用户名)
            this.$store.dispatch("setuser", this.userdata.account);
            //登录成功，更改登录状态栏 在action中处理
            //vuex里的信息保存到localStorage里
            localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
            // 跳转链接
            this.$router.push("/person/userinfo");
          } else {
            this.$message({
              message: res.data.message,
              type: "warning"
            });
            // 清除登录状态
            this.$store.dispatch("setuser", null); //登录失败，清空数据
          }
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    //进入这个页面，清空登录状态，并且把localStorage清空
    next(vm => vm.$store.dispatch("setuser", null));
    localStorage.clear(); //退出后把缓存清除
  }
};
</script>

<style lang="scss" scoped>
.btn_mg {
  margin: 2rem 0;
  background-color: #03234c;
  color: #ffffff;
}
.text-center {
  font-weight: bold;
}
.text-center:hover {
  color: skyblue;
  cursor: pointer;
}
</style>
