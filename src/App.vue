<template>
  <div id="app">
    <Header></Header>
    <tab-bar></tab-bar>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
import Header from './components/Header'
import TabBar from './components/TabBar'
import Player from './views/Player'

export default {
  name: 'App',
  components: {
    Header,
    TabBar,
    Player
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
