<template>
  <div id="app">
 <headerNav  class="headerapp"/>
    <router-view />
  </div>
</template>

<script>
import header from "./views/header"

export default {
  data() {
    return {
      
    }
  },
    components: {
    // footerNav:()=>import("./views/footer.vue"),
    headerNav:header
  },
    created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 
  // console.log(JSON.parse(sessionStorage.getItem("store")).isLogin);
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }


}

</script>


<style lang="scss">
$maxHeight:calc(100vh - 56px);

*{
  margin: 0;
  padding: 0;

}
#app{
  .headerapp{
  // position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;

}
min-width:1280px;
}

</style>
