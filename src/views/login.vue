<template>
  <div class="bg">
    <div class="container">
      <div class="row login_box">
        <div class="left_box col-md-5 col-sm-12">
          <div class="row box_middle">
            <img src="../assets/July.png" alt="" class="m-auto" />

            <ul class="navbar-nav col-md-12 nav_row">
              <li>
                <router-link to="/loginpage" class="nav-link "
                  >账号密码登录</router-link
                >
              </li>
              <li>
                <router-link to="/regpage" class="nav-link"
                  >快捷注册</router-link
                >
              </li>
            </ul>
            <hr class="col-md-10" />
            <div class="col-md-12">
              <router-view></router-view>
            </div>
          </div>
        </div>
        <div class="message_box col-md-6 col-sm-12">
          <div class="message_middle">
            <h4 class="text-center rightcode">加入 July口琴小站 V.I.P</h4>
            <p class="message_p">注册成为口琴小站的用户</p>
            <ul>
              <li>快来加入口琴大家庭吧</li>
              <li>即时收到新品发布信息</li>
              <li>这里有你想要的技术分享哦</li>
              <li>可以发布自己创意帖子</li>
              <li>购买自己喜爱的口琴</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {


    //jq代码
    $(function() {
      //点击初始化处理
      $(".nav_row li")
        .eq(0)
        .addClass("addcode")
        .siblings()
        .css("opacity", "0.4");

      $(".nav_row  li").click(function() {
        $(this)
          .addClass("addcode")
          .siblings()
          .removeClass("addcode");

        $(this)
          .css("opacity", "1")
          .siblings()
          .css("opacity", "0.4");
      });
    });
  }
};

//jq代码
// $(function(){
//     // $("nav_row li").eq(0).click(function(){
//     //     console.log(222);
//     // })
//     //点击初始化处理
//  $(".nav_row li").eq(0).addClass("addcode").siblings().css("opacity","0.4")

//   $(".nav_row  li").click(function () {
//     $(this).addClass("addcode").siblings().removeClass("addcode");

//         $(this).css("opacity","1").siblings().css("opacity","0.4")

//    });
// })
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 95vh;
  background: url("../assets/picture1.jpg") no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.container {
  // margin-top:5%;
  padding-top: 5%;
}
.login_box {
  display: flex;
  justify-content: center;
  justify-items: center;
}
.box_middle {
  border-right: 1px solid black;
}
.nav_row {
  display: flex;
  flex-direction: row;
}
.nav_row li {
  width: 50%;
  // border: 1px solid red;
  // border-bottom: 3px solid red;
  text-align: center;
  font-size: 20px;
  font-family: 14px/20px Helvetica, "Helvetica Neue", "Microsoft Yahei", Tahoma,
    Arial, sans-serif, black;
  color: black;
  text-decoration: none;
  // opacity: 0.3;
}
li a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
.message_box {
  height: 50vh;
  //    border: 1px solid khaki;
  display: flex;
  flex-direction: column;
}
.message_middle {
  margin: auto 0;
  transform: translateY(-3rem);
}

.message_p {
  font-size: 14px;
  color: #fff;
  margin-bottom: 15px;
  margin-left: 3rem;
}
.message_box li {
  margin: 5px 0;
  color: white;
  margin-left: 1.5rem;
}

.rightcode {
  margin-bottom: 30px;
  color: #fff;
  font-weight: bolder;
  margin: 15px;
  transform: translateY(-1rem);
}
.addcode {
  opacity: 1;
  border-bottom: 3px solid #303030;
}

@media screen and (max-width: 800px) {
  .message_middle {
    margin: auto 0;
    transform: translateY(1rem);
  }
  .box_middle {
    border-right: none;
  }
  .message_box {
    height: 50vh;
    //    border: 1px solid khaki;
    display: flex;
    flex-direction: column;
  }
  .bg {
    width: 100%;
    height: 130vh;
  }
}
</style>
