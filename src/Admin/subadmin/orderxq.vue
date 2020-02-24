<template>
  <el-row class="orderxq_part">
	      <el-row>
      <el-col :lg="12" class="textform">
        <span class="bt">订单详情</span>
      </el-col>
    </el-row>
    <el-table
      border
      stripe
      style="width: 100%"
      fixed
      max-height="150"
      :data="this.orderxq.buy"
    >
      <el-table-column label="商品信息" prop="name"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="数量" prop="num"></el-table-column>
    </el-table>

    <el-form  class="flex" style="font-size: 10px">
      <el-form-item label="订单号:" style="fontSize:26px">
        <el-col>
          <h5>{{ orderxq.onumber}}</h5>
        </el-col>
      </el-form-item>
      <el-form-item label="创建时间:">
        <el-col>
          <h5>{{ orderxq.addtime }}</h5>
        </el-col>
      </el-form-item>
      <el-form-item label="收件人:">
        <el-col>
          <h5>
            {{orderxq.receiver}}
          </h5>
        </el-col>
      </el-form-item>
      <el-form-item label="订单状态:">
        <el-col>
          <h5>{{ orderxq.zt}}</h5>
        </el-col>
      </el-form-item>
      <el-form-item label="支付方式:">
        <el-col>
          <h5>{{ orderxq.zfff }}</h5>
        </el-col>
      </el-form-item>
      <el-form-item label="订单金额:">
        <el-col>
          <h5>{{ orderxq.total }}</h5>
        </el-col>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      orderxq: {
        ddh: "", //订单号
        createTime: "", //创建时间
        shippingVo: [], //收件人信息
        statusDesc: "", //订单状态
        paymentTypeDesc: "", //支付方式
        payment: "" //订单金额
      } //订单详情
    };
  },
  created() {
    this.axios
      .post(
        "/api/admin/ordershow.php",
        this.Qs.stringify({ paynum: this.$route.params.id })
      )
      .then(res => {
		this.orderxq = res.data[0];
	
      });
  }
};
</script>

<style lang='scss'  deep>
.orderxq_part{
	.textform {
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  margin: 10px 0 20px;
  border-bottom: 1px solid transparent;
  font-size: 34px;
  font-weight: 500;
}
.el-form-item{
	width: 50%
}
.flex{
	display: flex;
	
}
}

.orderxq_part .el-form-item .el-form-item__label {
	font-size: 30px !important
}
</style>
