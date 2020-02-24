import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/home",
      name: "homelink",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/communication",
      name: "communicationlink",
      component: () => import("./views/communication.vue"),
      props: true
    },
    {
      path: "/communication/:id",
      name: "communicationmorelink",
      component: () => import("./components/subcomm/singlecomm.vue")
    },

    {
      path: "/shop",
      name: "shoplink",
      component: () => import("./views/shop.vue"),
      redirect: "/shop/sort/bules",
      children: [{
          path: "/shop/sort/:id1",
          name: "sortlink",
          component: () => import("./views/sort.vue"),
          props: true
        },
        // {path:"/shop/polyphony",name:"polyphonylink",component:()=>import("./components/subshop/polyphony.vue")},
        // {path:"/shop/half",name:"halflink",component:()=>import("./components/subshop/half.vue")},
        {
          path: "/shop/more/:id",
          name: "morelink",
          component: () => import("./components/subshop/more.vue"),
          props: true
        },
      ]
    },
    {
      path: "/personal",
      name: "personallink",
      component: () => import("./views/personal.vue"),
      redirect: "/person/userinfo",
      children: [{
          path: "/person/userinfo",
          name: "userinfo",
          component: () => import("./components/subperson/userinfo.vue")
        },
        {
          path: "/person/userpay",
          name: "userpay",
          component: () => import("./components/subperson/userpay.vue")
        },
        {
          path: "/person/userissue",
          name: "userissue",
          component: () => import("./components/subperson/userissue.vue")
        },
        {
          path: "/person/forgetpass",
          name: "forgetpass",
          component: () => import("./components/subperson/forgetpass.vue")
        },
        {
          path: "/person/userpost",
          name: "userpost",
          component: () => import("./components/subperson/userpost.vue")
        },
        {
          path: "/person/usercar",
          name: "usercar",
          component: () => import("./components/subperson/usercar.vue")
        },
        {
          path: "/person/userpaied",
          name: "userpaied",
          component: () => import("./components/subperson/userpaied.vue")
        },
        {
          path: "/person/addpost",
          name: "addpost",
          component: () => import("./components/subperson/addpost.vue")
        },
        {
          path: "/person/topay/:id",
          name: "topay",
          component: () => import("./views/topay.vue"),
          props: true
        },
        {
          path: "/person/orderxq/:id",
          name: "orderxq",
          component: () => import("./components/subperson/orderxq.vue"),
          props: true
        }
      ],
      meta: {
        requireAuth: true
      }



    },

    {
      path: "/login",
      name: "Loginlink",
      component: () => import("./views/login.vue"),
      redirect: "/loginpage",
      children: [{
          path: '/loginpage',
          name: "loginpagelink",
          component: () => import('./components/login/loginpage.vue')
        },
        {
          path: '/regpage',
          name: "regpagelink",
          component: () => import('./components/login/regpage.vue')
        },
      ]
    },
    {
      path: "/admin",
      name: "adminlink",
      component: () => import("./Admin/admin.vue"),
      redirect: "/admin/adminweb",
      children: [{
          path: '/admin/shopgl',
          name: "shopgllink",
          component: () => import('./Admin/subadmin/shopgl.vue')
        },
        {
          path: '/admin/userlist',
          name: "userlistlink",
          component: () => import('./Admin/subadmin/userlist.vue')
        },
        {
          path: '/admin/ordergl',
          name: "ordergllink",
          component: () => import('./Admin/subadmin/ordergl.vue')
        },
        {
          path: '/admin/adminweb',
          name: "adminweblink",
          component: () => import('./Admin/subadmin/adminweb.vue')
        },
        {
          path: '/admin/addshopgl',
          name: "addshopgllink",
          component: () => import('./Admin/subadmin/addshopgl.vue')
        },
        {
          path: '/admin/replygl',
          name: "replygllink",
          component: () => import('./Admin/subadmin/replygl.vue')
        },
        {
          path: '/admin/postgl',
          name: "postgllink",
          component: () => import('./Admin/subadmin/postgl.vue')
        },
        {
          path: '/admin/orderxq/:id',
          name: "orderxqlink",
          component: () => import('./Admin/subadmin/orderxq.vue'),
          props: true
        },
        {
          path: '/admin/shopedit/:id',
          name: "shopeditlink",
          component: () => import('./Admin/subadmin/shopedit.vue'),
          props: true
        },

      ],
      meta: {
        requireAdmin: true, // 判断是否需要登录
      },


    },
{
  path:'/backadmin',
  name:'backadmin',
  component:()=>import('./Admin/adminLogin.vue')
}

  ]
})
router.beforeEach((to, from, next) => {

  if (to.matched.some(res => res.meta.requireAdmin)) {
    if (localStorage.getItem("admin") && JSON.parse(localStorage.getItem("admin")).isLogin == true) {
      next()
    }else{
      alert('请先登录，在进行操作哦！');
      next({
        path: '/backadmin',
      })
    }
  }

  if (to.matched.some(res => res.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.getItem("userMsg") && JSON.parse(localStorage.getItem("userMsg")).isLogin == true) { // 判断当前的islogin
      next();
    } else {
      alert('请先登录，在进行操作哦！');
      next({
        path: '/loginpage',
      })
    }
  } else {
    next();
  }
});


export default router