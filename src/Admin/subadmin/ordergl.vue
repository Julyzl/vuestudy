<template>
  <el-row>
    <el-row>
      <el-col :lg="12" class="ordergl">
        <span>订单管理</span>
      </el-col>
    </el-row>
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-select v-model="value">
          <el-option value="按订单号查询"></el-option>
          <el-option value="按收件人查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入内容" v-model="val"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="chaxun">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName" @tab-click="handleC" style="font-size:20px">
      <el-tab-pane label="所有" name="all">
        <el-table
          border
          style="width: 100%"
          fixed
          max-height="$maxHeight"
          :data="orderlist"
        >
          <el-table-column
            label="订单号"
            width="200"
            prop="onumber"
          ></el-table-column>

          <el-table-column
            label="收件人"
            width="200"
            prop="receiver"
          ></el-table-column>

          <el-table-column label="订单状态" width="200" prop="zt">
          </el-table-column>
          <el-table-column
            label="付款方式"
            width="200"
            prop="zfff"
          ></el-table-column>
          <el-table-column
            label="订单总价"
            width="200"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="电话"
            width="200"
            prop="tel"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="addtime"
            width="200"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="marginTop"
          @current-change="hqys"
          background
          layout="prev, pager, next,jumper"
          :total="this.total"
          :page-size="14"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="wait">
        <el-table
          border
          style="width: 100%"
          fixed
          max-height="$maxHeight"
          :data="this.waitlist"
        >
          <el-table-column
            label="订单号"
            width="200"
            prop="onumber"
          ></el-table-column>

          <el-table-column
            label="收件人"
            width="200"
            prop="receiver"
          ></el-table-column>

          <el-table-column label="订单状态" width="200" prop="zt">
            <template slot-scope="scope">
              <el-button
                @click="sendShop(scope.$index, scope.row)"
                type="text"
                size="small"
                >待发货，点击发货</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="付款方式"
            width="200"
            prop="zfff"
          ></el-table-column>
          <el-table-column
            label="订单总价"
            width="200"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="电话"
            width="200"
            prop="tel"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="addtime"
            width="200"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已发货" name="done">
        <el-table
          border
          style="width: 100%"
          fixed
          max-height="$maxHeight"
          :data="this.donelist"
        >
          <el-table-column
            label="订单号"
            width="200"
            prop="onumber"
          ></el-table-column>

          <el-table-column
            label="收件人"
            width="200"
            prop="receiver"
          ></el-table-column>

          <el-table-column label="订单状态" width="200" prop="zt">
          </el-table-column>
          <el-table-column
            label="付款方式"
            width="200"
            prop="zfff"
          ></el-table-column>
          <el-table-column
            label="订单总价"
            width="200"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="电话"
            width="200"
            prop="tel"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="addtime"
            width="200"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="退货申请" name="back">
        <el-table
          border
          style="width: 100%"
          fixed
          max-height="$maxHeight"
          :data="reback"
        >
          <el-table-column
            label="订单号"
            width="200"
            prop="onumber"
          ></el-table-column>

          <el-table-column
            label="收件人"
            width="200"
            prop="receiver"
          ></el-table-column>

          <el-table-column label="订单状态" width="200" prop="zt">
          </el-table-column>
          <el-table-column label="是否退货 " width="200" prop="zt">
            <template slot-scope="scope">
              <el-button
                @click="sendBack(scope.$index, scope.row)"
                type="text"
                size="small"
                >同意退货</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            label="订单总价"
            width="200"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="电话"
            width="200"
            prop="tel"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="addtime"
            width="200"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已退货" name="backdone">
        <el-table
          border
          style="width: 100%"
          fixed
          max-height="$maxHeight"
          :data="doneback"
        >
          <el-table-column
            label="订单号"
            width="200"
            prop="onumber"
          ></el-table-column>

          <el-table-column
            label="收件人"
            width="200"
            prop="receiver"
          ></el-table-column>

          <el-table-column label="订单状态" width="200" prop="zt">
          </el-table-column>
          <el-table-column
            label="付款方式"
            width="200"
            prop="zfff"
          ></el-table-column>

          <el-table-column
            label="订单总价"
            width="200"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="电话"
            width="200"
            prop="tel"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="addtime"
            width="200"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="查询显示" name="show">
        <el-table
          border
          style="width: 100%"
          fixed
          max-height="$maxHeight"
          :data="this.showlist"
        >
          <el-table-column
            label="订单号"
            width="200"
            prop="onumber"
          ></el-table-column>

          <el-table-column
            label="收件人"
            width="200"
            prop="receiver"
          ></el-table-column>

          <el-table-column label="订单状态" width="200" prop="zt">
          </el-table-column>
          <el-table-column
            label="付款方式"
            width="200"
            prop="zfff"
          ></el-table-column>
          <el-table-column
            label="订单总价"
            width="200"
            prop="total"
          ></el-table-column>
          <el-table-column
            label="电话"
            width="200"
            prop="tel"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="addtime"
            width="200"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="请填写发货信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>订单号：{{ modal_number }}</span>
      <el-input v-model="kdsort" placeholder="快递类型"></el-input>
      <el-input v-model="kdNum" placeholder="快递编号"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendOK">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      activeName: "all",
      value: "按订单号查询",
      val: "", //搜索的订单号
      allList: [],
      orderlist: [], //订单数据
      waitlist: [], //发货订单数据
      donelist: [], //已经发货
      showlist: [], // 查询显示
      doneback: [], //完成退款
      reback: [], //退款中
      total: 10, //页数
      modal_number: 0, //模态框订单号
      kdsort: "顺丰",
      kdNum: "",
      index: null //被操作的数据的index
    };
  },
  created() {
    //获取订单list
    this.axios.get("/api/admin/orderlist.php").then(res => {
      // console.log(res);
      this.allList = res.data;
      this.orderlist = res.data.slice(0, 13);
      this.total = res.data.length;
      // 根据订单状态分类展示
      this.waitlist = res.data.filter(i => {
        return i.zt == "已收款";
      });
      this.donelist = res.data.filter(i => {
        return i.zt == "已发货";
      });
      this.reback = res.data.filter(i => {
        return i.zt == "退货中";
      });
      this.doneback = res.data.filter(i => {
        return i.zt == "已退货";
      });
      console.log(res.data);
    });
  },
  methods: {
    //点击页数获取相对应的订单list
    hqys(val) {
      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.orderlist = this.allList.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.orderlist = this.allList.slice(start, end);
      }
    },
    handleC(tab, event) {
      //切换
      // console.log(tab, event);
    },
    //搜索
    chaxun(data) {
      if (this.val == "") {
        this.$message.error("请输入内容");
        return;
      }
      if (this.value == "按订单号查询") {
        this.activeName = "show";
        this.showlist = this.orderlist.filter(el => {
          return el.onumber.toString().match(this.val);
        });
      } else {
        this.activeName = "show";
        this.showlist = this.orderlist.filter(el => {
          console.log(el.receiver);
          return el.receiver.toString().match(this.val);
        });
        console.log(this.showlist);
      }
    },
    handleClick(e) {
      // console.log(e);  // 查看订单详情，跳转
      this.$router.push("/admin/orderxq/" + e.id + "");
    },
    sendShop(index, e) {
      //   this.$router.push("/admin/orderxq/" + e.id + "");

      this.modal_number = e.onumber;
      this.centerDialogVisible = true;
      this.index = index;   // 发货的id，存在这个组建的data，模态框出现调用
      console.log(this.index);
    },
    sendOK() {
// 确认发货的信息并且执行发货操作
      let post = {};
      post.operate = "sendkd";
      post.kdsort = this.kdsort;
      post.kdNum = this.kdNum;
      post.onumber = this.modal_number;
      this.axios
        .post("/api/admin/action.php", this.Qs.stringify(post))
        .then(i => {
          this.$message.info(i.data.msg);
          this.waitlist.splice(this.index, 1);
        });
      this.centerDialogVisible = false;
    },
    sendBack(index, e) {// 退款操作
      
      this.$confirm("同意买家申请退货", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          let post = {};
          post.operate = "sendBack";
          post.id = e.id;
          this.axios
            .post("/api/admin/action.php", this.Qs.stringify(post))
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("已同意退货请求");
                this.reback.splice(index, 1);
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
  }
};
</script>

<style lang="scss" scoped >
.ordergl {
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
.marginTop {
  margin-top: 15px;
}
</style>
