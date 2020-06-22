import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/userside/Home.vue'
import Login from '../views/Login.vue'
import LabelMange from '../views/userside/labelManage.vue'
import ChartRoom from '../views/userside/chatroom.vue'
// import connect from '../views/kefu/connect.vue'
// import notConnect from '../views/kefu/notConnect.vue'
import kefuChatRoom from '../views/kefu/kefuChatRoom.vue'
import KefuHome from '../views/kefu/kefuHome.vue'
import Share from '../views/share/share.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  },
  {
    path: '/manage',
    name: 'LabelManage',
    component: LabelMange
  },
  {
    path: '/chartRoom',
    name: 'ChartRoom',
    component: ChartRoom
  },
  {
    path: '/kefuHome',
    name: 'KefuHome',
    component: KefuHome
    // children: [
    //   {
    //     path: '/',
    //     redirect: 'connect'
    //   },
    //   {
    //     path: 'connect',
    //     name: 'Connect',
    //     component: connect
    //   },
    //   {
    //     path: 'notConnect',
    //     name: 'NotConnect',
    //     component: notConnect
    //   }
    // ]
  },
  {
    path: '/kefuChatRoom',
    name: 'KefuChatRoom',
    component: kefuChatRoom
  },
  {
    name: '404',
    path: '*',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
