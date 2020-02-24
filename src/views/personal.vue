<template>
    <div class="personal_part ">
        <el-row class="tac">
  <el-col :span="4">
    <el-menu
      default-active="3"
      class="el-menu-vertical-demo person_part" 
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>个人信息</span>
        </template>
          <router-link to="/person/userinfo"><el-menu-item index="1-1">我的信息</el-menu-item></router-link>
          <router-link to="/person/forgetpass"><el-menu-item index="1-2">修改密码</el-menu-item></router-link>
      </el-submenu>

<el-submenu index="2">
      <template slot="title">
          <i class="el-icon-menu"></i>
        <span slot="title">社区信息</span>
        </template>
     <router-link to="/person/userissue"><el-menu-item index="2-1">我的评论</el-menu-item></router-link>
     <router-link to="/person/userpost"><el-menu-item index="2-2">我的帖子</el-menu-item></router-link>

</el-submenu>

<el-submenu index='3'>
    <template slot="title">
  <i class="el-icon-goods"></i>
        <span slot="title">订单</span>
    </template>
 <router-link to="/person/usercar"><el-menu-item index="3-1">我的购物车</el-menu-item></router-link>
 <router-link to="/person/userpay"><el-menu-item index="3-2">我的订单</el-menu-item></router-link>
</el-submenu>
    </el-menu>
  </el-col>
  <el-col :span="20"  class="person_part scroll_part">
 <router-view></router-view>
  </el-col>
        </el-row>

    </div>
</template>


<script>
export default {
    data() {
        return {
            
        }
    },
      created() {
    // localStorage.getItem("userMsg") &&
    //   this.$store.replaceState(
    //     Object.assign(this.$store.state, JSON.parse(localStorage.getItem("userMsg")))
    //   );
    //在页面刷新时将vuex里的信息保存到localStorage里
    // window.addEventListener("beforeunload", () => {
    //   localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
    // });
  },

}
</script>


<style lang="scss" >
.el-submenu__title{
  font-size: 20px
}
.personal_part{
    // position: fixed;
 padding:0;
 margin: 0;
  height: calc(100vh - 56px);
   overflow: hidden;
  .scroll_part{
     overflow-y: scroll;
  } 
a{
  text-decoration: none;
}
//  height: calc(100vh-56px);
.person_part{
  height: calc(100vh - 56px);
//   text-align: center


}
}
</style>