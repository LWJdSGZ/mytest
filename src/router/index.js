import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/main'
import Console from './console.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',//'hash',history
  routes: [
    {
      path: '/',
      redirect: 'index',
      name: 'homeIndex',
      component: Main,
      children: [
        { path: 'index', name: 'index', component: (resolve) => { require(['@/views/home/home.vue'], resolve); } }
      ]
    },
    ...Console,

    {
      path: '/comment',
      name: '/comment',
      component: Main,
      children: [
        { path: 'index/comment-list', name: 'comment-list', component: (resolve) => { require(['@/views/comment/index/comment-list.vue'], resolve); } },
        { path: 'comment/comment', name: 'comment', component: (resolve) => { require(['@/views/comment/comment/comment.vue'], resolve); } }
      ]
    },
    {
      path: '/rbac',
      name: '/rbac',
      component: Main,
      children: [
        { path: 'role-permission', name: 'role-permission', component: (resolve) => { require(['@/views/rbac/role-permission.vue'], resolve); } },
        { path: 'role-table', name: 'role-table', component: (resolve) => { require(['@/views/rbac/role-table.vue'], resolve); } },
        { path: 'role-users', name: 'role-users', component: (resolve) => { require(['@/views/rbac/role-users.vue'], resolve); } },
        { path: 'role-authorizations', name: 'role-authorizations', component: (resolve) => { require(['@/views/rbac/role-authorizations.vue'], resolve); } }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  console.log("path",to, from)
  /*console.log("location",location)*/
  document.title = "云首页"
  next();
})

export default router
