/*
 * @Description: 项目入口
 * @Autor: wangxin
 * @Date: 2020-05-28 12:49:58
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-07 11:17:28
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'

// 注册懒加载事件并导入loading时背景图片
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading2.png')
})

// 解决移动端300ms延迟
fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
