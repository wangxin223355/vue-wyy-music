/*
 * @Description: 路由组件
 * @Autor: wangxin
 * @Date: 2020-05-28 12:49:58
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-01 17:41:58
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Recommend = () =>
  import(/* webpackChunkName: "group-foo" */ '../views/Recommend.vue')
const Singer = () =>
  import(/* webpackChunkName: "group-foo" */ '../views/Singer.vue')
const Rank = () =>
  import(/* webpackChunkName: "group-foo" */ '../views/Rank.vue')
const Search = () =>
  import(/* webpackChunkName: "group-foo" */ '../views/Search.vue')
const Detail = () =>
  import(/* webpackChunkName: "group-foo" */ '../views/Detail.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
