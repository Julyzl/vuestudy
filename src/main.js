import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import footer from './views/footer.vue'
import echarts from 'echarts'
import axios from 'axios'
import http from './http/http'
import qs from 'qs'
window.axios = axios
Vue.prototype.Http = http
Vue.prototype.$echarts = echarts
    //配置vue原型，在任何组件中都可以使用，不用在配置import
Vue.prototype.axios = axios
Vue.prototype.Qs = qs
Vue.component("footerNav", footer)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')