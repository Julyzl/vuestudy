<template>
  <el-row>
    <el-row>
      <el-col :lg="12" class="textform">
        <span>编辑商品</span>
      </el-col>
    </el-row>
    <el-form label-width="80px">
      <el-form-item label="商品名称">
        <el-col :span="12">
          <el-input v-model="shopname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-col :span="12">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入描述"
            v-model="shopcontent"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品编号">
        <el-input
          v-model="shopid"
          placeholder="请输入商品编号"
          maxlength="6"
          oninput="value=value.replace(/[^\d.]/g,'')"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="value" placeholder="请选择品类">
          <el-option
            v-for="item in sort"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            v-model="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐">
        <el-select v-model="isnice">
          <el-option value="推荐"></el-option>
          <el-option value="不推荐"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="price"
          placeholder="价格"
          controls-position="right"
          :min="0"
          :max="999999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="星星评价">
        <el-input-number
          v-model="star"
          controls-position="right"
          :min="0"
          :max="5"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number
          v-model="repertory"
          placeholder="库存"
          controls-position="right"
          :min="0"
          :max="999999"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <img :src="`/api/Public/Upload/${img}`" alt="" class="setimg" />
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="upload-demo"
          action="null"
          :on-remove="handleRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="upLoadData"
          :on-change="imgBroadcastChange"
          :auto-upload="false"
        >
          <el-button type="primary">更换图片</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="warning" @click="routergo">返回</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      isnice: "", //是否推荐
      upLoadData: {
        userid: "" //上传图片额外参数
      },
      sort: [
        { name: "布鲁斯", id: 1 },
        { name: "半音阶", id: 2 },
        { name: "复音", id: 3 }
      ], //一级下拉菜单的数据

      value: "", //一级下拉菜单的value
      val: "", //二级下拉菜单的value
      price: 0, //商品价格
      repertory: 0, //商品库存
      fileList: [], //上传图片列表
      shopname: "", //商品名称
      shopcontent: "", //商品描述
      star: 0,
      shopid: "",
      img: null
    };
  },
  methods: {
    submit() {
      if (
        this.shopid == "" ||
        this.shopname == "" ||
        this.shopcontent == "" ||
        this.price == 0 ||
        this.repertory == 0
      ) {
        return this.$message.warning("请输入完整信息");
      }

      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("id", this.$route.params.id);
      formData.append("title", this.shopname);
      let categoryid = 0;
      if (this.value == 1) {
        categoryid = 1;
      } else if (this.value == 2) {
        categoryid = 2;
      } else {
        categoryid = 3;
      }
      console.log(this.value);
      console.log(categoryid);
      formData.append("categoryid", categoryid);
      formData.append("pnumber", this.shopid);
      formData.append("amount", this.repertory);
      formData.append("price", this.price);
      let isnice = 0;
      if (this.isnice == "推荐") {
        isnice = 1;
      }
      formData.append("isnice", isnice);
      formData.append("content", this.shopcontent);
      formData.append("star", this.star);
      formData.append("oldUrl", this.img);

      this.$confirm("确认修改商品信息", "你将要的执行的操作如下", {
        type: "waring"
      })
        .then(r => {
          this.axios.post("/api/admin/shopedit.php", formData).then(res => {
            console.log(res.data);
            this.$message({
              type: "success",
              message: "修改成功"
            });
            // this.$router.go(-1);
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

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //图片逻辑

    imgBroadcastChange(file, fileList) {
      // debugger
      this.file = file.raw;
      this.fileName = file.name;
      console.log(this.file, this.fileName);
    },
    handleRemove(file, fileList) {
      this.file = null; //移除文件的时候清空图片地址
    },
    getapi() {
      let post = {};
      post.operate = "getshopid";
      post.id = this.$route.params.id;
      this.axios
        .post("/api/admin/action.php", this.Qs.stringify(post))
        .then(res => {
          this.shopname = res.data[0].title; //商品名称
          this.shopcontent = res.data[0].content; //描述
          this.price = res.data[0].price;
          if (res.data[0].isnice == 1) {
            this.isnice = "推荐";
          } else {
            this.isnice = "不推荐";
          }
          if (res.data[0].categoryid == 1) {
            this.value = "布鲁斯";
          }
          if (res.data[0].categoryid == 2) {
            this.value = "半音阶";
          }
          if (res.data[0].categoryid == 3) {
            this.value = "复音";
          }

          this.repertory = res.data[0].amount; //库存
          this.shopid = res.data[0].pnumber;
          this.star = res.data[0].star;
          this.img = res.data[0].img;
          console.log(this.value);
        });
    },
    routergo() {
      this.$router.go(-1);
    }
  },

  created() {
    this.getapi();
  }
};
</script>

<style scoped>
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
.setimg {
  width: 150px;
  height: 150px;
}
</style>
