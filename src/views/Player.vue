<!--
 * @Description: 播放器页面
 * @Autor: wangxin
 * @Date: 2020-06-01 19:56:47
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-04 16:01:39
-->
<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
    <MiniPlayer @showList="showList"></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
  </div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
export default {
  name: 'Player',
  methods: {
    showList() {
      this.$refs.listPlayer.show()
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  }
}
</script>
<style scoped lang="scss"></style>
