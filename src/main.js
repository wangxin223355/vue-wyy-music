import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './assets/css/base.scss' // 导入全局 css 样式

// 注册懒加载事件
Vue.use(VueLazyload, {
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
