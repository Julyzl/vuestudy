<template>
  <div class="more_part">
    <el-row class="more_top">

      <el-col :span="8" :offset="1">
        <img
          :src="`/api/Public/Upload/${more.img}`"
          alt
          style="width:100%"
          id="bgimg"
          class="bgimg_shadow"
        />
      </el-col>
      <el-col :span="8" :offset="1">
        <el-row>
          <el-col :span="24">
            <!-- 评分 -->
            <el-rate
              v-model="shop_score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="24" class="right_con">
            <!-- 名字 -->
            <div>
              <h1>琴名:{{ more.title }}</h1>
            </div>
            <!-- 介绍 -->
            <div>
              <span>
                {{ more.content }}
              </span>
            </div>
            <!-- 价格 -->
            <div>
              <h4>价格:{{ more.price }}</h4>
            </div>
            <!-- 库存 -->
            <div>
              <h5>库存:{{ more.amount }}</h5>
            </div>
            <!-- 数量 -->
            <div>
              <span>数量:</span>
              <el-button size="mini" @click="handleReduce()">
                <i class="el-icon-minus"></i>
              </el-button>
              <span style="margin:0 1rem">{{ default_number }}</span>
              <el-button size="mini" @click="handleAdd()">
                <i class="el-icon-plus"></i>
              </el-button>
            </div>
            <el-button type="primary" @click="addshop">加入购物车</el-button>
            <el-button type="danger" @click="goback">返回</el-button>
            <div align="right">
              <p style=" font-size: 14px;color:rgba(245,108,108,0.8)">
                Ps:每种琴最多只可购买10把。
              </p>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeid: this.$route.params.id,
      shop_score: 4.4, //评分
      default_number: 1, //数量
      stock: 8, //库存  废弃
      more: {// 数据列表
        img:'load.jpg'  // 默认加载图片
      }  
    };
  },
  created() {
   
    this.axios
      .post("/api/shop/more.php", this.Qs.stringify({ categoryid: this.routeid }))
      .then(res => {
        this.more = res.data[0];
        this.shop_score=parseInt(this.more.star) 
        console.log(this.more);
      });
  },
  methods: {

    goback() {
      this.$router.go(-1); //返回上一次浏览的页面
    },
    handleAdd() {
      // 添加商品操作以及逻辑处理
      if (this.default_number >= this.more.amount) {
        this.$message({
          message: "仓库没有那么琴呢",
          type: "warning"
        });
      } else {
        if (this.default_number == 10) {
          this.$message({
            message: "最多可购买10把！留点琴给其他小伙伴吧！",
            type: "info"
          });
        } else {
          this.default_number++;
        }
      }
    },
    handleReduce() {
      if (this.default_number == 1) {
        this.$message({
          message: "不可以再减了哦!",
          type: "warning"
        });
      } else {
        this.default_number--;
      }
    },
    addshop() {
      if (!this.$store.getters.isLogin) {
        this.$message({
          message: "请先登录再来加入购物车！",
          type: "warning"
        });
        return;
      } else {
        let key=true
        this.$store.getters.tableData.map(el=>{
          if(el.id==this.$route.params.id){
            if(el.number>=10){
              key=false
             return this.$message.warning('最多可购买10把！留点琴给其他小伙伴吧！')
            }
            if(el.number>=el.kc){
               key=false
              return this.$message.warning('库存不够了！！')
            }
          }
        })
        if(key){
        let shopobj = {};
        (shopobj.id = this.$route.params.id),
          (shopobj.number = this.default_number),
          (shopobj.name = this.more.title),
          (shopobj.price = this.more.price);
          shopobj.kc=parseInt( this.more.amount)

        console.log(111);
        this.$store.dispatch("setshopdata", shopobj);
        localStorage.setItem("userMsg", JSON.stringify(this.$store.state));

        console.log(this.$store.getters.tableData);
        this.$message({
          message: "加入购物车成功",
          type: "success"
        });
        }

      }
    }
  }
};
</script>

<style lang="scss" scoped>
.more_part {
  .more_top {
    margin-top: 10%;
  }
  .bgimg_shadow {
    box-shadow: 5px 6px 8px 0px rgba(0, 0, 0, 0.3),
      2px 5px 20px 2px rgba(0, 0, 0, 0.3);
  }
  .more_row_part * {
    margin: 0.5rem 0;
    //    padding: 1rem 0.5rem;
    //    border: 1px solid red;
    background: rgba(232, 232, 232, 0.5);
  }
  .right_con div {
    margin: 1rem 0;
  }
}
</style>
