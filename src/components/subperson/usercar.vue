<template>
  <div>
    <el-row>
      <el-col :lg="12" class="textform">
        <span>我的购物车</span>
      </el-col>
    </el-row>
    <el-table
      :data="VuextableData"
      show-summary
      style="width: 100%"
      :summary-method="getSummaries"
    >
      <el-table-column prop="name" label="口琴"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="number" label="数量">
        <template slot-scope="scope">
          <el-input
          disabled=""
            v-model="scope.row.number"
            style="width:60px "
            maxlength="2"
            oninput="value=value.replace(/[^\d.]/g,'')"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-row style="dispaly:flex">
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
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="success"
      round
      icon="el-icon-search"
      style="width:150px;height: 60px; padding:20px ;margin:20px;font-size:20px;line-height:-20px;outline:none"
      @click="jiesuan"
      >结算</el-button
    >
    <el-button
      type="danger"
      round
      icon="el-icon-delete-solid"
      @click="clearCart"
      style="width:170px;height: 60px; padding:20px ;margin:20px;font-size:20px;line-height:10px;outline:none"
      >清空购物车</el-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    jiesuan() { // 结算
      this.$router.push("/person/userpaied");
    },
    clearCart(value) { // 清空购物车
      this.$store.dispatch("clearShop");
    },
    handleAdd(index, row) {
      //增加数据
      if (row.number >= 10) {
        return this.$message.warning("最多可购买10把！留点琴给其他小伙伴吧！");
      }
      if (row.number >= row.kc) {
        return this.$message.warning("库存不够了！！");
      }

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
      this.$store.dispatch("setShopTotal", getsum[1]);
      return getsum;
    }
  },
  data() {
    return {
      //   VuextableData: [  ]
    };
  },
  computed: {
    VuextableData() {
      return this.$store.getters.tableData;
    }
  }
};
</script>

<style lang="scss" scoped>
.tr {
  height: 80px;
  font-size: 22px;
}
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
</style>
