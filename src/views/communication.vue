<template>
  <div class="container com_part">
    <div class="com_content">
      <div class="com_card">
        <el-input
          placeholder="请输入帖子名字/作者进行查询"
          v-model="searchtype"
          style="margin:1rem 0"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 头部nav -->
        <div class="com_head_part">
          <el-button round @click="addpost">发表帖子</el-button>
          <!-- <el-button round>精品</el-button>  -->
        </div>
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <li v-for="(list, index) in count" :key="index" class="list-item">
              <router-link :to="`/communication/${list.id}`">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span style="padding:10px 0">{{
                      list.title | titlemaxlen
                    }}</span>
                    <span style="float:right">发表时间:{{ list.addtime }}</span>
                  </div>
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <img
                        :src="`/api/Public/Upload/${list.img}`"
                        alt
                        width="80%"
                        height="100px"
                      />
                    </el-col>
                    <el-col :span="16">
                      <span v-text="$options.filters.maxlen(list.content)">
                        {{ list.content }}
                      </span>
                    </el-col>
                    <el-col :span="4">
                      <p>作者:{{ list.nickname }}</p>
                    </el-col>
                  </el-row>
                </el-card>
              </router-link>
            </li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: [],
      loading: false,
      items: [],
      formdata: [],
      searchtype: "",
      dataL: 0, //数组长度
      addnum: 0
    };
  },
  computed: {
    noMore() {
      return this.count.length >= this.dataL;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  filters: {
    // 字数过滤
    titlemaxlen: el => {
      return el.slice(0, 45) + ".......";
    },
    maxlen(el) {
      // console.log(el);
      return el.slice(0, 180) + " ........";
    }
  },
  mounted() {
    // console.log(this,this.$options);
  },
  methods: {
    fiterposts: function() {
      return this.formdata.filter(post => {
        //过滤posts每一条信息,用（post）接收并且用箭头函数使用
        // console.log(post);
        return (
          post.title.match(this.searchtype) ||
          post.nickname.match(this.searchtype)
        ); //标题和输入框的值是否相等
      });
    },
    load() {
      // 延时加载更多，一次5条 
      this.loading = true;
      setTimeout(() => {
        this.addnum += 5;
        let a = this.formdata.slice(0, this.addnum);
        this.count = a;
        console.log(this.count);
        this.loading = false;
      }, 2000);
    },
    addpost() {
      if (!this.$store.state.isLogin) {
        this.$message.warning("请登录后再来操作！");
      } else {
        this.$router.push("/person/addpost");
      }
    }
  },
  created() {
    this.axios.get("/api/BBS/index.php").then(res => {
      this.formdata = res.data;
      this.dataL = res.data.length;
      this.count = res.data.slice(0, 10);
      console.log(this.formdata);
    });
  }
};
</script>

<style lang="scss">
.com_part {
  //         .el-carousel__item h3 {
  //     color: #475669;
  //     font-size: 14px;
  //     opacity: 0.75;
  //     line-height: 150px;
  //     margin: 0;
  //   }
  a {
    text-decoration: none;
  }
  button {
    outline: none;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .box-card:hover {
    background: #f0f8ff;
    cursor: pointer;
  }
  .com_head_part {
    margin-bottom: 1rem;
    * {
      margin: 0 0.5rem;
      width: 7rem;
    }
  }
}
</style>
