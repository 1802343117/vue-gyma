import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    //这里放全局参数
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
    ws: localStorage.getItem('ws')
  },
  mutations: {
    //这里是set方法
  },
  getters: {
    //这里是get方法
  }
})
export default store
