<template>
  <div class="personal_part">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo person_part"
        >
          <router-link to="/admin/adminweb">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/shopgl">
            <el-menu-item index="2">
              <i class="el-icon-s-shop"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/ordergl">
            <el-menu-item index="3">
              <i class="el-icon-s-goods"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/postgl">
            <el-menu-item index="4">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">帖子管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/replygl">
            <el-menu-item index="5">
              <i class="el-icon-s-comment"></i>
              <span slot="title">回复管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin/userlist">
            <el-menu-item index="6">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </router-link>
          <el-menu-item index="7" v-show="isShow">
            <i class="el-icon-user-solid"></i>
            <span slot="title" @click="setModal">注册管理员</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="person_part scroll_part">
        <router-view></router-view>
      </el-col>
    </el-row>
    <adminModal :key="time" :setkey="setkey" />
  </div>
</template>

<script>
import adminModal from "./adminModal";
export default {
  data() {
    return {
      setkey: false,
      time: ""
    };
  },
  components: {
    adminModal
  },
  computed: {
    isShow() {  // 只有超级管理员才有权限注册管理员
      if (JSON.parse(localStorage.getItem("admin")).type == "超级管理员") {
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    setModal() { // 传入不同时间戳，根据key刷新dom
      this.time = new Date().getTime();
      this.setkey = true;
    },
  }
};
</script>

<style lang="scss">
.header_part {
  display: none;
}
.el-menu-item {
  font-size: 20px;
}
.personal_part {
  // position: fixed;
  padding: 0;
  margin: 0;
  height: calc(100vh - 56px);
  overflow: hidden;
  .scroll_part {
    overflow-y: scroll;
  }
  a {
    text-decoration: none;
  }
  //  height: calc(100vh-56px);
  .person_part {
    height: calc(100vh - 56px);
    //   text-align: center
  }
}
</style>
