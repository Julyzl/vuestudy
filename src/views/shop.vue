<template>
  <div class="shop_part ">
    <el-row class="tac">
      <el-col :span="3">
        <!-- 左侧侧边栏 -->

        <el-menu
          default-active="1"
          class="el-menu-vertical-demo person_part"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 搜索框 -->
          <el-input
            v-model="inputvalue"
            prefix-icon="el-icon-location"
            placeholder="请输入内容"
            style="margin-top:10px;width:100%"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>

          <router-link to="/shop/sort/bules">
            <el-menu-item index="1">
              <i class="el-icon-copy-document"></i>
              <span slot="title">布鲁斯口琴</span>
            </el-menu-item></router-link
          >
          <router-link to="/shop/sort/half">
            <el-menu-item index="2">
              <i class="el-icon-wallet"></i>
              <span slot="title">半音阶口琴</span>
            </el-menu-item></router-link
          >
          <router-link to="/shop/sort/polyphony">
            <el-menu-item index="3">
              <i class="el-icon-set-up"></i>
              <span slot="title">复音口琴</span>
            </el-menu-item></router-link
          >
        </el-menu>
      </el-col>
      <el-col :span="21" class="scroll_part person_part">
        <router-view :key="$route.fullPath" :user="ceshi"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      inputvalue: "",
      activeIndex: "1",
      activeIndex2: "1",
      ceshi: "!111"
    };
  },
  methods: {
    search() {
      if(this.inputvalue==''){
        return this.$message.warning('请输入搜索内容')
      }
      // 传 搜索的值，以及给php的命令是search
      this.$router.push({
        path: `/shop/sort/${this.inputvalue}`,
        query: {
          val: this.inputvalue,
          name:'search'
        }
      });
      //  console.log(this.inputvalue);
    }
  }
};
</script>

<style lang="scss">
.shop_part {
  height: calc(100vh - 56px);
  overflow: hidden;
  padding: 0;
  margin: 0;
  a {
    text-decoration: none;
  }
  .scroll_part {
    overflow-y: scroll;
  }
  .person_part {
    height: calc(100vh - 56px);
  }

  .rigth {
    position: fixed;
    right: 5rem;
  }
}
</style>
