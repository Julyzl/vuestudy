<template>
  <div class="container-full singlecomm_part">
    <el-row>
      <el-col :span="21" :offset="3">
        <el-page-header @back="goback" :content="title"></el-page-header>
      </el-col>
      <el-col :span="21" :offset="3">
        <el-col :span="21">
          <el-col :span="24" class="single_border">
            <el-col
              :span="4"
              style="border-right:1px solid #d2d2d2;padding:1rem;min-height:-webkit-fill-available;display: flex;flex-direction: column; align-items: center;"
            >
              <img
                :src="`/api/Public/Upload/${this.postdata.img}`"
                alt
                width="150rem"
                height="150rem"
              />

              <div class="autor">
                <p>作者：{{ this.postdata.nickname }}</p>
                <span>{{ this.postdata.addtime }}</span>
              </div>
            </el-col>
            <el-col :span="20" style="padding:1rem">
              <span>
                <p style="text-indent:50px;font-size:22px">
                  {{ this.postdata.content }}
                </p>
              </span>
            </el-col>
          </el-col>

          <!-- 评论模块 -->
          <el-col :span="24" style="margin:1rem 0">
            <el-col :span="21">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea_part"
              ></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button
                type="primary"
                icon="el-icon-s-promotion"
                style="padding:1.5rem"
                @click="addly"
                >在此评论</el-button
              >
            </el-col>
          </el-col>

          <!-- 评论展示模块 -->
          <el-col :span="24">
            <el-card
              class="box-card"
              v-for="(o, index) in comment"
              :key="index"
            >
              <el-row>
                <el-col :span="3">
                  <div style="height:;padding:0.5rem;">
                    <img
                      :src="`/api/Public/Upload/${o.img}`"
                      alt=""
                      width="120rem"
                      height="120rem"
                      style="border-radius:25px;"
                    />
                  </div>
                </el-col>
                <el-col :span="21" style="padding:1rem">
                  <div>
                    <p>{{ o.nickname }}</p>
                    <p>{{ o.content }}</p>
                    <p>
                      时间{{ o.addtime }}
                      <el-button type="text" @click="comm_show(o)"
                        >回复</el-button
                      >
                    </p>
                    <el-input
                      v-model="o.input"
                      placeholder="请输入内容"
                      v-show="o.isopen"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-edit-outline"
                        @click="reply(o)"
                        >确认回复</el-button
                      >
                    </el-input>
                    <el-divider></el-divider>
                  </div>
                  <div v-show="comm_key">
                    <el-collapse>
                      <el-collapse-item
                        v-show="o.reply.length > 0"
                        title="查看回复"
                      >
                        <div v-for="(item, index) in o.reply" :key="index">
                          <div v-if="true">
                            <span>{{ item.nickname }}:</span
                            ><span>{{ item.content }}</span>
                          </div>
                          <div v-else>
                            没有更多评论了
                          </div>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thisid: this.$route.params.id,
      input: "",
      postdata: {
        img: "load.jpg"
      },
      condition: false,
      title: "",
      backmessage: "",
      textarea_part: "", //文本框数据
      comm_key: true, //评论更多开关  每条数据判断是否存在2条以上，存在就显示更多，每个独立开关，单独设置新的key
      comment: []
    };
  },
  methods: {
    addly() {
      // 增加留言
      if (!this.$store.getters.isLogin) {
        this.$message({
          message: "请先登录在进行操作！",
          type: "warning"
        });
        return;
      }
      if (this.textarea_part == "") {
        this.$message.warning("请输入留言内容");
      } else {
        var post = {};
        post.operate = "addly";
        post.content = this.textarea_part;
        post.id = this.postdata.id;
        post.userid = this.$store.state.userid;
        post.reid = this.$route.params.id; // 回复的是这个帖子的id
        this.axios.post("/api/BBS/getcom.php", this.Qs.stringify(post));
        this.getcom(); //刷新页面
      }
    },
    reply(data) {
      // 增加回复
      if (!this.$store.getters.isLogin) {
        this.$message({
          message: "请先登录在进行操作！",
          type: "warning"
        });
        return;
      }
      if (data.input == "") {
        this.$message.warning("请输入留言内容");
      } else {
        let post = {};
        post.operate = "reply";
        post.startid = data.id; // 回复的是楼层的id
        post.content = data.input;
        post.userid = this.$store.state.userid;
        post.reid = this.$route.params.id; // 回复的是这个帖子的id
        this.axios
          .post("/api/BBS/getcom.php", this.Qs.stringify(post))
          .then(res => {
            this.$message.success(res.data);
          });
        this.getcom(); //获取新数据
        this.input = ""; //清空输入栏
      }
    },
    goback() {
      this.$router.go(-1);
    },
    comm_show(o) {
      //是否显示回复框
      // console.log(o);
      if (o.isopen == false) {
        o.isopen = true;
      } else {
        o.isopen = false;
      }
    },
    getcom() {
      // 获取留言和回复
      this.axios
        .post(
          "/api/BBS/getcom.php",
          this.Qs.stringify({ operate: "get", reid: this.$route.params.id })
        )
        .then(res => {
          console.log(res);
          // 两层循环
          var fn = [];
          for (var key in res.data) {
            if (res.data[key]["startid"] == 0) {
              //如果 srartid 为0 ，说明是楼层
              fn.push(res.data[key]);
              res.data[key].num = key;
              res.data[key].isopen = false;
              res.data[key].input = "";
              // 消息回复体
              var refn = [];
              for (var reply in res.data) {
                // 属于这个楼层的id加入楼层的数组中去
                if (res.data[key]["id"] == res.data[reply]["startid"]) {
                  refn.push(res.data[reply]);
                }
              }
              res.data[key].reply = refn;
            }
            // console.log(res.data[key]['startid']);
          }
          this.comment = fn;
          // console.log(this.comment);
        });
    },
    getpost() {
      this.axios
        .post(
          "/api/BBS/getcompost.php",
          this.Qs.stringify({ operate: "get", reid: this.$route.params.id })
        )
        .then(res => {
          this.postdata = res.data;
          this.title = this.postdata.title;
        });
    }
  },
  created() {
    this.getcom();
    this.getpost();
  }
};
</script>

<style lang="scss" scoped>
.singlecomm_part {
  // background: url('../../assets/') no-repeat   ;
  button {
    outline: none;
  }
  .single_border {
    margin: 1rem 0;
    border: 1px solid #d2d2d2;
    height: 35rem;
  }
  .bottom {
    position: relative;
    height: 100%;
  }
  .bottom div {
    float: right;
    * {
      margin: 0 0.3rem;
    }
  }
  .autor {
    // position: absolute;
    // bottom: 0;
    padding: 10px;
    text-align: center;
    margin-top: 30px;
  }
  .box-card {
    span {
      font-size: 19px;
    }
  }
}
</style>
