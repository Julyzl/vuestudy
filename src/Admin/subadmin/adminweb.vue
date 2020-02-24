<template>
  <div class="adminweb_part">
    <div class="setFlex">
      <span>
        <h3>欢迎{{ type }}:{{ username }}</h3>
      </span>
      <span>
        <el-button type="text" @click="loginout">退出</el-button>
      </span>
    </div>
    <el-row>
      <el-row class="row-bg">
        <el-col :md="6">
          <div class="users">
            <div class="sl">{{ totalshow.users }}</div>
            <div class="desc">
              <span>用户总数</span>
            </div>
          </div>
        </el-col>
        <el-col :md="6">
          <div class="shopes">
            <div class="sl">{{ totalshow.shopes }}</div>
            <div class="desc">
              <span>商品总数</span>
            </div>
          </div>
        </el-col>
        <el-col :md="6">
          <div class="orders">
            <div class="sl">{{ totalshow.orders }}</div>
            <div class="desc">
              <span>订单总数</span>
            </div>
          </div>
        </el-col>
        <el-col :md="6">
          <div class="posts">
            <div class="sl">{{ totalshow.posts }}</div>
            <div class="desc">
              <span>帖子总数</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row type="flex" justify="center" class="top">
      <el-col :span="24">
        <div style="height:600px" id="echar1"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      type:'',//管理员类型
      totalshow: {
        users: 0,
        shopes: 0,
        orders: 0,
        posts: 0
      }
    };
  },
  methods: {
    getEchartData1() {  // echart 图 在组建created的时候创建
      var char1 = this.$echarts.init(document.getElementById("echar1"));
      var option = {
        backgroundColor: "#d2d2d2",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
          bottom: "10%"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: this.totalshow.users, name: "用户总数" },
              { value: this.totalshow.orders, name: "订单总数" },
              { value: this.totalshow.posts, name: "帖子总数" },
              { value: this.totalshow.shopes, name: "商品总数" }
            ],
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 1)",
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      char1.setOption(option);
    },
    loginout() {
      this.$router.push("/backadmin");
      localStorage.clear();
    }
  },
  created() {
     // 各项数值赋值
    this.axios.post("/api/admin/adminweb.php").then(res => {
      this.totalshow.users = res.data.users;  // 用户总数
      this.totalshow.orders = res.data.orders; // 订单
      this.totalshow.posts = res.data.posts;  // 帖子总数
      this.totalshow.shopes = res.data.shopes; // 商品总数
      this.getEchartData1();  // 挂载
    });
    this.username = JSON.parse(localStorage.getItem("admin")).username;
    this.type = JSON.parse(localStorage.getItem("admin")).type;
  }
};
</script>

<style lang="scss" scoped>
.adminweb_part {
  .el-main {
    background: #f3f3f3;
  }
  .dbt {
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .bt {
    padding-bottom: 5px;
    margin: 10px 0 20px;
    border-bottom: 1px solid transparent;
    font-size: 36px;
    font-weight: 500;
  }
  .el-col {
    padding: 0 15px;
  }
  .users {
    height: 160px;
    background-color: #f0ad4e;
    color: #fff;
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;
  }
  .shopes {
    height: 160px;
    background-color: #5cb85c;
    color: #fff;
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;
  }
  .orders {
    height: 160px;
    background-color: #4cb1cf;
    color: #fff;
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;
  }
  .posts {
    height: 160px;
    background-color: #487;
    color: #fff;
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;
  }
  .sl {
    font-size: 50px;
    height: 80px;
    line-height: 80px;
  }
  .desc {
    font-size: 18px;
    margin-top: 10px;
  }
  .el-col div:hover {
    color: #2b2e33;
    transition: all 1s;
  }
  .top {
    margin-top: 30px;
  }
  .setFlex {
    display: flex;
    padding: 10px 30px;
    align-items: center;
    button {
      margin: 0 10px;
      outline: none;
      font-size: 18px;
    }
  }
}
</style>
