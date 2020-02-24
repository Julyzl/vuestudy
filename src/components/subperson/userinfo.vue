<template>
  <div class="userinfo_part">
    <el-row type="flex" justify="center">
      <el-col tag="div" :span="3">
        <img
          :src="`/api/Public/Upload/${formLabelAlign.img}`"
          alt=""
          class="circlehead"
        />
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="8">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
          :rules="rules"
          ref="formLabelAlign"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="formLabelAlign.nickname"
              :disabled="isshow"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="formLabelAlign.email"
              :disabled="isshow"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input
              v-model="formLabelAlign.sex"
              :disabled="isshow"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input
              v-model="formLabelAlign.tel"
              :disabled="isshow"
            ></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input
              v-model="formLabelAlign.address"
              :disabled="isshow"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="1" v-show="!isshow">
        <el-button type="primary" icon="el-icon-back" @click="changeshow1"
          >返回</el-button
        >
      </el-col>
      <el-col :span="3" :offset="2" v-show="!isshow">
        <el-button type="danger" @click="comfirmchang('formLabelAlign')"
          >确认修改</el-button
        >
      </el-col>
      <el-col :span="3" :offset="2" v-show="isshow">
        <el-button type="danger" @click="changeshow">修改信息</el-button>
      </el-col>
      <el-col :span="5">
        <el-upload
          class="upload-demo"
          v-show="!isshow"
          action="/api/user/userEidt.php"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :onError="uploadError"
          :before-remove="beforeRemove"
          :onSuccess="uploadSuccess"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :data="upLoadData"
        >
          <el-button type="primary">更换头像</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  Vpassword,
  Vaccnout,
  Vtel,
  Vemail,
  Vsex,
  Vchart
} from "../../util/valide";

export default {
  data() {
    return {
      labelPosition: "right",
      fileList: [], //头像列表
      upLoadData: {
        userid: "", //上传图片额外参数
        imgUrl:''
      },
      formLabelAlign: {
        img:'1.jpg'
      },
      isshow: true,
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [{ validator: Vemail, trigger: "blur" }],
        tel: [{ validator: Vtel, trigger: "blur" }],
        sex: [{ validator: Vsex, trigger: "blur" }],
        address: [
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          },
          { validator: Vchart, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   头像验证
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadError(response, file) {
      this.$message.warning("上传失败");
    },
    uploadSuccess(response, file) {
      console.log(response);
      this.$message.info(response);
      this.getapi(); //重新刷新页面
    }, //上传成功回调
    //视窗改变
    changeshow() {
      this.isshow = false;
      //  console.log(this.formLabelAlign);
    },
    changeshow1() {
      this.isshow = true;
      this.getapi();
    },
    comfirmchang(formName) {  // 修改信息
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$confirm("确认修改您的信息", "你将要的执行的操作如下", {
            type: "waring"
          })
            .then(r => {
              let post = this.formLabelAlign;
              post.operate = "update";
              this.axios
                .post("/api/user/userEidt.php", this.Qs.stringify(post))
                .then(res => {
                  this.$message.success(res.data);
                      this.isshow = true;
                });
            })

            .catch(r => {
              this.getapi();
              this.$message({
                type: "info",
                message: "已经取消"
              });
                  this.isshow = true;
            });
        } else {
          return false;
        }
      });
  
    },
    getapi() {
      //获取数据
      this.axios
        .post(
          "/api/user/userEidt.php",
          this.Qs.stringify({
            account: this.$store.getters.username,
            getmessage: true
          })
        )
        .then(res => {
          var fn = [];
          for (var key in res.data) {
            fn.push(res.data[key]);
            res.data[key].num = key;
          }
          // console.log(fn);
          this.formLabelAlign = fn[0];
          this.upLoadData.userid = this.formLabelAlign.id;
          this.upLoadData.imgUrl = this.formLabelAlign.img  // 传旧的图片名字，修改时删掉旧的
          this.$store.dispatch("setuserid", this.formLabelAlign.id); //把用户id存在vuex
          localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
          console.log(this.$store.state.userid);
        });
    }
  },
  created() {
    this.getapi();
  }
};
</script>

<style lang="scss" scoped>
::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: "";
}
.userinfo_part {
  .circlehead {
    border-radius: 50%;
    width: 220px;
    height: 220px;
    margin-top: 20px;
  }
  .el-row {
    // margin-top: 1rem;;
    margin-bottom: 3rem;
  }
  .upload-demo {
    width: 98px;
    height: 40px;
  }
}
</style>
