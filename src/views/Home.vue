<template>
  <div>
    <div class="container com_part home_part">
      <div class="block">
        <el-carousel height="60vh">
          <el-carousel-item v-for="(item, index) in items" :key="index">
            <img :src="item.img" alt class="imgset" />
            <!-- <img src="@/assets/5.jpg"> -->
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="home_show">
        <h1>热门推荐</h1>

        <el-row type="flex" justify="center" :gutter="40">
          <el-col :span="7" v-for="(item, index) in nices" :key="index">
            <router-link :to="`/shop/more/${item.id}`">
              <el-card class="box-card">
                <img
                  :src="`/api/Public/Upload/${item.img}`"
                  alt
                  class="imgshow"
                />
                <hr />
                <span>NAME:{{ item.title }}</span>
                <h5>RMB:{{ item.price }}</h5>
                <el-button type="text" class="success">+加入购物车</el-button>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <div class="home_show">
        <h1>最新帖子</h1>
        <el-row
          type="flex"
          justify="center"
          v-for="(item, index) in newpost"
          :key="index"
        >
          <el-col :span="24">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ item.title }}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="look(item.id)"
                  >查看</el-button
                >
              </div>
              <div class="text item">
                {{ item.content | titlemaxlen }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <footerNav />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nices: [],
      newpost: [],
      items: [
        { img: require("../assets/bg3.jpg") },
        { img: require("../assets/bg1.jpg") },
        { img: require("../assets/bg2.jpg") },
        { img: require("../assets/bg4.jpg") },
        { img: require("../assets/bg5.jpg") },
        { img: require("../assets/bg6.jpg") }
      ]
    };
  },
  created() {
    this.getnew();
    this.axios.get("/api/home/getnice.php").then(res => {
      this.nices = res.data;
    });
  },
  filters: {
    titlemaxlen: el => {
      return el.slice(0, 45) + ".......";
    }
  },

  methods: {
    getnew() {
      // 获取最新5条的帖子
      this.axios.get("/api/home/getnewpost.php").then(res => {
        this.newpost = res.data;
      });
    },
    look(val) {
      this.$router.push(`/communication/${val}`);
    }
  }
};
</script>

<style lang="scss">
.com_part {
  //         .el-carousel__item h3 {
  //     color: #475669;
  //     font-size: 14px;
  //     opacity: 0.75;
  //     line-height: 150px;
  //     margin: 0;
  //   }
  z-index: 0;
  .imgset {
    width: 100%;
    height: 100%;
  }

  .container {
    padding: 0;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .block {
    margin-bottom: 2rem;
  }
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .home_show h1 {
    margin: 2rem auto;
    text-align: center;
  }
  .home_show img {
    width: 250px;
    height: 250px;
  }
  .home_show .box-card {
    box-shadow: 3px 4px 8px 1px;
    border-radius: 10px;
    margin: 10px 0;
  }
}
</style>
