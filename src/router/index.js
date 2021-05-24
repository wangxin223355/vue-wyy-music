import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// const Recommend = resolve => {
//   import('../views/Recommend.vue').then(module => {
//     resolve(module)
//   })
// }
// const Singer = resolve => {
//   import('../views/Singer.vue').then(module => {
//     resolve(module)
//   })
// }
// const Rank = resolve => {
//   import('../views/Rank.vue').then(module => {
//     resolve(module)
//   })
// }
// const Search = resolve => {
//   import('../views/Search.vue').then(module => {
//     resolve(module)
//   })
// }
// const Detail = resolve => {
//   import('../views/Detail.vue').then(module => {
//     resolve(module)
//   })
// }
const Recommend = () => import('../views/Recommend.vue')
const Singer = () => import('../views/Singer.vue')
const Rank = () => import('../views/Rank.vue')
const Search = () => import('../views/Search.vue')
const Detail = () => import('../views/Detail.vue')
const Account = () => import('../views/Account.vue')

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
  { path: '/search', component: Search },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
