<!--
 * @Description: 主页面
 * @Autor: wangxin
 * @Date: 2020-05-28 12:49:58
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-29 18:38:19
-->
<template>
  <div id="app">
    <Header></Header>
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from './components/Header'
import TabBar from './components/TabBar'

export default {
  name: 'App',
  methods: {
    // myFn(data) {
    //   document.documentElement.setAttribute('data-theme', data)
    // }
  },
  components: {
    Header,
    TabBar
  }
}
</script>
<style lang="scss" scoped>
@import './assets/css/variable.scss';
.theme {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
