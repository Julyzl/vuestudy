<template>
  <div class="userpay_part">
    <el-form :inline="true" class="form-inline" style="padding:15px">
      <el-form-item>
        <el-select v-model="optionValue">
          <el-option value="按订单号查询"></el-option>
          <el-option value="按商品查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入查找内容" v-model="val"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="font-size:16px"
    >
      <el-tab-pane label="所有" name="all">
        <div class="card" v-for="(item, index) in list" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">单价{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="first">
        <div class="card" v-for="(item, index) in list" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="second">
        <div class="card" v-for="(item, index) in list" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="reback(item.id)" type="danger" class="setBtn"
              >退货</el-button
            >
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已发货" name="third">
        <div class="card" v-for="(item, index) in list" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="reback(item.id)" type="danger" class="setBtn"
              >退货</el-button
            >
            <el-button @click="sure(item.id)" type="primary" class="setBtn"
              >确认收货</el-button
            >
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="完成订单" name="fourth">
        <div class="card" v-for="(item, index) in list" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="reback(item.id)" type="danger" class="setBtn"
              >退货</el-button
            >
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的退货" name="back">
        <div class="card" v-for="(item, index) in reverse" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查询结果" name="fifth">
        <div class="card" v-for="(item, index) in result" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="cancelorder(item.id)"
                >取消订单</el-button
              >
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                v-show="isshow(item.zt)"
                @click="gotopay(item.onumber)"
                >去付款</el-button
              >
              <span>订单号:{{ item.onumber }}</span>
              <span style="float:right">订单状态:{{ item.zt }}</span>
              <span style="float:right">总金额:{{ item.total }}</span>
            </div>
            <div v-for="(o, index) in item.buy" :key="index" class="text item">
              <el-row type="flex" justify="center" align="middle">
                <el-col :span="6">
                  <img
                    :src="`/api/Public/Upload/${o.img}`"
                    alt=""
                    srcset=""
                    class="orderimg"
                /></el-col>

                <el-col :span="6">名字：{{ o.name }}</el-col>
                <el-col :span="6">数量：{{ o.num }}</el-col>
                <el-col :span="6">{{ o.price }}</el-col>
              </el-row>
            </div>
            <el-button @click="chekan(item.id)" type="success" class="setBtn"
              >查看</el-button
            >
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :page-size="14"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "all",
      isopen: true,
      optionValue: "按订单号查询",
      val: "",
      order: [],
      total: 20,
      watchdata: [],
      list: [],
      result: [] // 查询结果
    };
  },
  watch: { // 监听每个订单的状态，赋予不同的值
    activeName() {
      if (this.activeName == "all") {
        this.watchdata = this.order;
        // this.list=[]
      }
      if (this.activeName == "first") {
        this.watchdata = this.wait;
      }
      if (this.activeName == "second") {
        this.watchdata = this.waitfahuo;
      }
      if (this.activeName == "third") {
        this.watchdata = this.fahuo;
      }
      if (this.activeName == "fourth") {
        this.watchdata = this.payoff;
      }
      if (this.activeName == "back") {
        this.watchdata = this.back;
      }
      this.total = this.watchdata.length;

      this.list = this.watchdata;
    }
  },
  computed: { // 根据订单状态遍历不同的data
    wait() {
      return this.order.filter(el => {
        return el.zt == "未作任何处理";
      });
    },
    waitfahuo() {
      return this.order.filter(el => {
        return el.zt == "已收款";
      });
    },
    fahuo() {
      return this.order.filter(el => {
        return el.zt == "已发货";
      });
    },
    payoff() {
      return this.order.filter(el => {
        return el.zt == "已收货";
      });
    },
    back() {
      return this.order.filter(el => {
        return el.zt == "已退货" || el.zt == "退货中";
      });
    },
    reverse(){
      return this.list.reverse()
    }
  },
  methods: {
    handleCurrentChange(val) { // 分页
      console.log(val);
      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.list = this.watchdata.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.list = this.watchdata.slice(start, end);
      }
    },
    isshow(data) { // 未付款的订单显示付款和取消按钮
      if (data == "未作任何处理") {
        return true;
      } else {
        return false;
      }
    },
    gotopay(number) {  // 付款
      this.$router.push(`/person/topay/${number}`);
    },
    search() {  // 搜索
      this.activeName = "fifth";
      if (this.optionValue == "按订单号查询") {
        this.result = this.order.filter(el => {
          return el.onumber.toString().match(this.val.toString());
        });
      }
      if (this.optionValue == "按商品查询") {
        this.result = [];
        this.order.filter(el => {
          el.buy.map(i => {
            if (i.name.toString().match(this.val.toString())) {
              this.result.push(el);
            }
          });

          // return el.title.toString().match(this.val.toString());
        });
      }
    },
    cancelorder(id) {  // 删除订单
      this.$confirm("确定删除这个订单吗？", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          this.axios
            .post("/api/cart/del.php", this.Qs.stringify({ id: id }))
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
            });
        })
        .catch(r => {
          this.$message({
            type: "info",
            message: "已经取消"
          });
        });
    },
    handleClick(tab, event) {
      // console.log(this.list);
    },
    chekan(val) {
      this.$router.push(`/person/orderxq/${val}`);
    },
    sure(val) { //确认收货
      this.$confirm("确认收货", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          let post = {};
          post.operate = "sure";
          post.id = val;
          this.axios
            .post("/api/order/action.php", this.Qs.stringify(post))
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "收货成功"
                });
              }
            });
        })
        .catch(r => {
          this.getapi();
          this.$message({
            type: "info",
            message: "已经取消"
          });
        });
    },
    reback(val) { // 申请退货
      this.$confirm("申请退货", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          let post = {};
          post.operate = "reback";
          post.id = val;
          this.axios
            .post("/api/order/action.php", this.Qs.stringify(post))
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "已发起申请退货，等待管理员同意"
                });
              }
            });
        })
        .catch(r => {
          this.$message({
            type: "info",
            message: "已经取消"
          });
        });
    }
  },

  created() {
    let post = {};
    post.operate = "get";
    post.account = this.$store.state.username;
    this.axios
      .post("/api/order/ordergl.php", this.Qs.stringify(post))
      .then(res => {
        var fn = [];
        for (var key in res.data) {
          fn.push(res.data[key]);
          res.data[key].num = key;
        }
        this.order = fn;
        this.list = this.order;
        this.total = this.order.length;
      });
  }
};
</script>

<style lang="scss">
// .text {
//   font-size: 14px;
// }
.userpay_part {
  .setBtn {
    float: right;
    margin: 0 10px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix span {
    margin: 0 10px;
  }
  .orderimg {
    width: 100px;
    height: 100px;
  }
  // .clearfix:before,
  // .clearfix:after {
  //   display: table;
  //   content: "";
  // }
  // .clearfix:after {
  //   clear: both
  // }

  // .box-card {
  //   // width: 480px;
  // }
}
.el-tabs__item {
  font-size: 25px;
}
</style>
