import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/css/base.scss' // 导入全局 css 样式
// 导入插件
import Loading from './plugin/loading/index'
// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
  title: '正在加载...'
})

// 注册懒加载事件
Vue.use(VueLazyload, {
  // 设置加载的占位图片
  loading: require('./assets/images/loading.png')
})

// 解决移动端300ms延迟
fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
