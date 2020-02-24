<template>
  <div class="pay_part">
    <el-row type="flex" justify="space-around" class="paytop">
      <el-col :span="4">
        <img :src="wxpay" alt="" />
        <el-button
          type="primary"
          v-show="key"
          style="height: 60px;width:400px;font-size:20px;margin-top:10px"
          @click="onpay"
          >扫码完成支付</el-button
        >
      </el-col>
      <el-col :span="5">
        <div class="flex">
          <div>
            <span>收货人:</span>
            <span>{{ paydata.receiver }}</span>
          </div>
          <div>
            <span> E-mail:</span>
            <span> {{ paydata.email }}</span>
          </div>

          <div>
            <span>送货方式:</span>
            <span>{{ paydata.shff }}</span>
          </div>

          <div>
            <span>支付方式:</span>
            <span>{{ paydata.zfff }}</span>
          </div>

          <div>
            <span>备注:</span>
            <span>{{ paydata.leaveword || "无" }}</span>
          </div>

          <div>
            <span>收货地址:</span>
            <span>收货地址:{{ paydata.address }}</span>
          </div>
        </div>

        <h4>订单创建时间：{{ paydata.addtime }}</h4>
        <h3>订单状态：{{ paydata.zt }}</h3>
        <h1>总金额：{{ paydata.total }}</h1>
      </el-col>
      <el-col :span="7">
        <el-col>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="名字"> </el-table-column>
            <el-table-column prop="price" label="单价"> </el-table-column>
            <el-table-column prop="num" label="数量"> </el-table-column>
          </el-table>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import wx from "../assets/wx.png";
import zfb from "../assets/zfb.jpg";

export default {
  data() {
    return {
      wxpay: wx,
      input: "",
      key: false,
      tableData: [],
      paydata: {},

    };
  },
  methods: {
    onpay() {
      this.$confirm("已确认信息，并且付款", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          //  收款对象，订单的的id为传值
          let post = {};
          (post.operate = "sk"), (post.paynum = this.$route.params.id);
          console.log(post);
          this.axios
            .post("/api/cart/action.php", this.Qs.stringify(post))
            .then(res => {
              this.getapi();
              this.$message({
                type: "info",
                message: res.data
              });
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
    getapi() {
      this.axios
        .post(
          "/api/cart/ordershow.php",
          this.Qs.stringify({ paynum: this.$route.params.id })
        )
        .then(res => {
          // console.log(res.data[0]);
          this.tableData = res.data[0].buy;
          this.paydata = res.data[0];
          // 订单的状态决定是否展示收款码和收款按钮
          if (this.paydata.zt == "未作任何处理") {
            this.key = true;
          }
          if (this.paydata.zfff == "支付宝") {
            this.wxpay = zfb;
          } else {
            this.wxpay = wx;
          }
          console.log(this.paydata);
        });
    }
  },
  created() {
    this.getapi();
  }
};
</script>

<style lang="scss" scoped>
.pay_part {
  .paytop {
    margin-top: 80px;
  }
  .paytop img {
    width: 400px;
  }
  .flex span {
    display: inline-block;
    width: 100%;
    font-size: 22px;
  }
  .flex div {
    margin: 10px 0;
    border-bottom: 1px dotted black;
  }
  h1,
  h3,
  h4 {
    margin: 20px 0;
  }
}
</style>
