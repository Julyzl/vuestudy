<template>
  <div class="header_part">
    <nav class="navbar navbar-expand navbar-light bg-light minW ">
      <router-link class="py-2" to="/">
        <router-link to="/home"
          ><img src="../assets/July.png" class="nav_logo" />
        </router-link>
      </router-link>
      <ul class="navbar-nav nav_left">
        <li><router-link to="/home" class="nav-link">主页</router-link></li>
        <li><router-link to="/shop" class="nav-link">商店</router-link></li>
        <li>
          <router-link to="/communication" class="nav-link">社区</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li>
          <el-popover
            ref="popover4"
            placement="bottom-end"
            width="500"
            trigger="click"
          >
            <el-table
              :data="VuextableData"
              empty-text="购物车里还没有东西，快去购物把！"
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column
                width="70"
                property="number"
                label="数量"
              ></el-table-column>
              <el-table-column
                width="100"
                property="name"
                label="名称"
              ></el-table-column>
              <el-table-column
                width="100"
                property="price"
                label="价格"
              ></el-table-column>
              <el-table-column width="200" label="操作">
                <template slot-scope="scope">
                  <el-button
                    round
                    size="mini"
                    @click="handleAdd(scope.$index, scope.row)"
                  >
                    <i class="el-icon-plus"></i>
                  </el-button>
                  <el-button
                    round
                    size="mini"
                    @click="handleReduce(scope.$index, scope.row)"
                  >
                    <i class="el-icon-minus"></i>
                  </el-button>
                  <el-button
                    round
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <router-link to="/person/usercar">
              <el-button v-show="isshow">结算</el-button></router-link
            >
          </el-popover>
          <el-button
            round
            v-popover:popover4
            icon="el-icon-arrow-down"
            v-show="isLogin"
          >
            购物车
          </el-button>
        </li>
        <li>
          <router-link to="/login" class="nav-link" v-show="!isLogin"
            >登录</router-link
          >
        </li>
        <router-link to="/loginpage">
          <el-button round v-show="isLogin" @click="loginout"
            >退出</el-button
          ></router-link
        >
        <li class="nav-link" v-show="isLogin">{{ username }}</li>
        <li>
          <router-link to="/personal" class="nav-link" v-show="isLogin"
            >个人中心</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleAdd(index, row) {
      //增加数据
      if (row.number >= 10) {
        return this.$message.warning("最多可购买10把！留点琴给其他小伙伴吧！");
      }
      if (row.number >= row.kc) {
        return this.$message.warning("库存不够了！！");
      }
      console.log(index, row);
      // console.log(index, row);
      row.number++;
    },
    handleReduce(index, row) {
      //减少数量
      row.number--;
      if (row.number <= 0) {
        this.handleDelete(index); //如果数量减少到0就删除
      }
    },
    handleDelete(index, row) {
      //删除所在行
      this.VuextableData.splice(index, 1);
    },
    getSummaries(param) {
      //   console.log(param);
      let getsum = [];
      getsum[0] = "总价:";
      getsum[1] = 0;
      param.data.forEach((el, index) => {
        let a = el.number;
        getsum[1] += el.number * el.price; //价格*数量得到总价
      });
      getsum[3] = "买单";
      return getsum;
    },
    loginout() {
      localStorage.clear(); //退出后把缓存清除
    }
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    VuextableData() {
      return this.$store.getters.tableData;
    },
    isshow() {
      // 是否展示结算按钮
      if (this.$store.getters.tableData.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    // console.log(this.$store.state);
    // 刷新页面时，将存在localstorage的vuex重新赋值
    this.$store.replaceState(
      Object.assign(
        this.$store.state,
        JSON.parse(localStorage.getItem("userMsg"))
      )
    );

    //在页面加载时读取localStorage里的状态信息
    //  localStorage.clear()
  },
  beforeMount() {}
};
</script>

<style lang="scss">
@media (min-width: 0px) {
  .minW {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
}

// @media (min-width: 992px){
//   .navbar-expand-lg {
//     -ms-flex-flow: row nowrap;
//     flex-flow: row nowrap;
//     -ms-flex-pack: start;
//     justify-content: flex-start;
// }
// }

.minW {
  // min-width: 1028px;
}

.header_part {
  min-width: 1000px;
  .nav_left {
    margin-left: 10rem;
  }
  .nav_logo {
    position: absolute;
    top: -1rem;
  }
}
</style>
