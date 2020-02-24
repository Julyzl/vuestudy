<template>
  <el-row>
    <el-row>
      <el-col :lg="24" class="textform">
        <span class="bt">商品管理</span>
        <el-button type="primary" icon="el-icon-plus" @click="tjsp">
          添加商品
        </el-button>
      </el-col>
    </el-row>
    <el-form :inline="true" class="form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="按商品编号查询">
          <el-option value="按商品编号查询"></el-option>
          <el-option value="按商品名称查询"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="关键词" v-model="val"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="seek">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      :cell-style="finalCellStyle"
      style="width: 100%"
      max-height="$maxHeight"
      :data="this.shopesArr"
    >
      <el-table-column label="编号" prop="pnumber"></el-table-column>

      <el-table-column label="名字" prop="title"></el-table-column>

      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="数量" prop="amount"></el-table-column>

      <el-table-column label="操作" prop="status">
        <template slot-scope="scope">
          <el-col>
            <el-button
              @click="edit(scope.row)"
              type="primary"
              style="outline:none;margin:0 20px;"
              round
              >编辑</el-button
            >
            <el-button
              @click="del(scope.$index, scope.row)"
              type="primary"
              style="outline:none;margin:0 20px;"
              round
              >删除</el-button
            >
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="marTop"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next,jumper"
      :total="items_length"
      :page-size="14"
    >
    </el-pagination>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      value: "按商品编号查询", //选择搜索方式
      shopes: [], //商品数据
      total: 8, //分页器的页码
      val: "", //搜索的内容
      shopesArr: [],
      items_length: 0
    };
  },
  created() {
    this.axios.post("/api/admin/shopgl.php").then(res => {
      console.log(res.data);
      this.shopes;
      // 商品数量为0 优先展示
      res.data.map(el => {
        if (parseInt(el.amount) == 0) {
          this.shopes.unshift(el);
        }else{
          this.shopes.push(el)
        }
      });
      //根据请求过来的数据改变页码数
      this.items_length = this.shopes.length;
      this.shopesArr = this.shopes.slice(0, 13);
    });
  },
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      // console.log(val);

      if (val == 1) {
        let start = val - 1;
        let end = val + 12;
        this.shopesArr = this.shopes.slice(start, end);
      } else {
        let start = val + 12;
        let end = start + 12;
        this.shopesArr = this.shopes.slice(start, end);
      }
    },
    tjsp() {
      this.$router.push("/admin/addshopgl");
    },
    //商品搜索
    seek() {
      if (this.value == "按商品编号查询") {
        let filterdata = this.shopes.filter(shop => {
          //过滤shopes每一条信息,用（shop）接收并且用箭头函数使用
          console.log(shop);
          return shop.pnumber.match(this.val); //标题和输入框的值是否相等
        });
        this.shopesArr = filterdata;
      } else {
        let filterdata = this.shopes.filter(shop => {
          //过滤shopes每一条信息,用（shop）接收并且用箭头函数使用
          console.log(shop);
          return shop.title.match(this.val); //标题和输入框的值是否相等
        });
        this.shopesArr = filterdata;
      }
    },
    //删除商品
    del(index, e) {
      this.$confirm("删除此商品", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          let post = {};
          post.operate = "delshop";
          post.id = e.id;
          this.axios.post("/api/admin/action.php", this.Qs.stringify(post));
          this.shopesArr.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })

        .catch(r => {
          this.$message({
            type: "info",
            message: "已经取消"
          });
        });
    },
    //商品编辑页面跳转
    edit(e) {
      this.$router.push(`/admin/shopedit/${e.id}`);
    },
    // 设置商品为0时现实的 样式
    finalCellStyle: function({ row, column, rowIndex, columnIndex }) {
      if (row["amount"] == 0) {
        return {
          background: "oldlace"
        };
      } else {
        return {
          background: ""
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.textform {
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  margin: 10px 0;
  border-bottom: 1px solid transparent;
  font-size: 34px;
  font-weight: 500;
}

.el-col {
  padding: 0 15px;
}

.form-inline {
  padding: 0 15px;
}

.marTop {
  margin-top: 15px;
}
.warning-row {
  background: oldlace;
}

.success-row {
  background: #f0f9eb;
}
</style>
