import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { vueBaberrage } from '../node_modules/vue-baberrage'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import global_ from '@/util/Global.vue'

Vue.prototype.GLOBAL = global_
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.use(vueBaberrage)
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   let isLogin
//   if (token == 'null') {
//     isLogin = false
//   } else {
//     isLogin = true
//   }
//   if (!isLogin) {
//     if (to.path !== '/login') {
//       return next({ path: '/login' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       return next({ path: '/' })
//     }
//     next()
//   }
// })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
