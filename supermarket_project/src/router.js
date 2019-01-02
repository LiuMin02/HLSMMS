import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import VipList from './views/VipList.vue'
import VipAdd from './views/VipAdd.vue'
import UserList from './views/UserList.vue'
import UserAdd from './views/UserAdd.vue'
import classifyAdd from './views/classifyAdd.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/vip',
      component: VipList
    },
    {
      path: '/vip/add',
      component: VipAdd
    },
    {
      path: '/user',
      component: UserList
    },
    {
      path: '/user/add',
      component: UserAdd
    },
    {
      path: '/user/pwdedit',
      component: () => import(/* webpackChunkName: "about" */ './views/UserPwdEdit.vue')
    },
    {
      path: '/config',
      component: () => import(/* webpackChunkName: "about" */ './views/Config.vue')
    },
    {
      path: '/limit',
      component: () => import(/* webpackChunkName: "about" */ './views/Limit.vue')
    },
    {
      path: '/manage',
      component: () => import(/* webpackChunkName: "about" */ './views/Manage.vue')
    },
    {
      path: '/class',
      component: () => import(/* webpackChunkName: "about" */ './views/classifyList.vue')
    },
    {
      path: '/class/add',
      component: () => import(/* webpackChunkName: "about" */ './views/classifyAdd.vue')
    },
    {
      path: '/pro',
      component: () => import(/* webpackChunkName: "about" */ './views/ProManage.vue')
    },
    {
      path: '/pro/add',
      component: () => import(/* webpackChunkName: "about" */ './views/ProAdd.vue')
    },
    {
      path: '/pro/sale',
      component: () => import(/* webpackChunkName: "about" */ './views/saleEchars.vue')
    },
    {
      path: '/pro/stock',
      component: () => import(/* webpackChunkName: "about" */ './views/stockEchars.vue')
    }
  ]
})
