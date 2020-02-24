<template>
  <div class="bules_part">
    <el-row :gutter="0">
      <el-col :span="6" v-for="(item, index) in items" :key="index">
        <el-card :body-style="{ padding: '10px' }" style="margin-top:10px">
          <router-link :to="`/shop/more/${item.id}`">
            <img :src="`/api/Public/Upload/${item.img}`" class="image"
          /></router-link>
          <div style="padding: 14px;">
            <span>NAME:{{ item.title }}</span>
            <div class="bottom clearfix  ">
              <span>RMB:{{ item.price }}</span>
              <el-button
                type="text"
                class="button"
                icon="el-icon-plus"
                @click="addshop(item)"
                >加入</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="setShow" v-show="isShow">
      没有检索到内容
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center">
      <el-col :span="3">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="12"
            :current-page="1"
            layout="prev, pager, next"
            :total="items_length"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getrouteid: this.$route.params.id1,
      newitems: [],
      items_length: null,
      items: [],
      isShow: false
    };
  },
  props: ["user"],
  created() {
    // console.log(aa);
    let post = {};
    post.categoryid = this.getrouteid;
    // console.log(this.$route.params);
    if (this.$route.query.name && this.$route.query.name == "search") {
      post.search = true;
      post.name = this.$route.query.val;
    } else {
      post.sort = true;
    }

    this.axios
      .post("/api/shop/goods.php", this.Qs.stringify(post))
      .then(res => {
        var fn = [];
        for (var key in res.data) {
          fn.push(res.data[key]);
          res.data[key].num = key;
        }

        this.items = fn;
        if (this.items.length == 0) {
          this.isShow = true;
        }
      });
  },
  mounted() {
    this.newitems = this.items.slice(0, 12);
    this.items_length = this.items.length;
    this.handleSizeChange();
  },
  methods: {
    // 添加商品
    addshop(item) {
      // 是否为登录状态，只有登录才可以购物
      if (!this.$store.getters.isLogin) {
        this.$message({
          message: "请先登录再来加入购物车！",
          type: "warning"
        });
        return;
      } else {
        let key = true;
        this.$store.getters.tableData.map(el => {
          if (el.id == item.id) {
            if (el.number >= 10) {
              key = false;
              return this.$message.warning(
                "最多可购买10把！留点琴给其他小伙伴吧！"
              );
            }
            if (el.number >= el.kc) {
              key = false;
              return this.$message.warning("库存不够了！！");
            }
          }
        });
        if (key) {
          // 定义一个商品信息对象，传入vuex做处理
          let shopobj = {};
          (shopobj.id = item.id),
            (shopobj.number = 1),
            (shopobj.name = item.title),
            (shopobj.price = item.price);
          shopobj.kc = parseInt(item.amount);

          console.log(111);
          this.$store.dispatch("setshopdata", shopobj);
          localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
          this.$message({
            message: "加入购物车成功",
            type: "success"
          });
        }
      }
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      if (val == 1) {
        let start = val - 1;
        let end = val + 11;
        this.newitems = this.items.slice(start, end);
      } else {
        let start = val + 11;
        let end = start + 11;
        this.newitems = this.items.slice(start, end);
      }

      //    console.log(newitems);
      // console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.bules_part {
  .setShow {
    display: flex;
    justify-content: center;
  }
  .bules_center {
    display: flex;
    justify-content: space-around;
    // justify-items: flex-end;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 400px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
