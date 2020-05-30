<!--
 * @Description: 歌单详情页
 * @Autor: wangxin
 * @Date: 2020-05-30 15:18:20
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-30 22:45:42
-->
<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollView">
        <DetailBottom :playList="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import DetailHeader from '../components/DetailHeader'
import DetailTop from '../components/DetailTop'
import DetailBottom from '../components/DetailBottom'
import ScrollView from '../components/ScrollView'

import { getPlayList } from '../api/index'
export default {
  name: 'Detail',
  data() {
    return {
      // 歌单详情页数据
      playlist: []
    }
  },
  mounted() {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    // console.log(defaultHeight)
    // 获取偏移位
    this.$refs.scrollView.scrolling(offsetY => {
      if (offsetY < 0) {
        // console.log('向上滚动')
        const scale = (20 * Math.abs(offsetY)) / defaultHeight // 得到一个越来越大的值
        this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        // console.log('向下滚动')
        const scale = 1 + offsetY / defaultHeight // 逐渐越来越大于1
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  },
  created() {
    // 获取歌单详情
    getPlayList({ id: this.$route.params.id })
      .then(data => {
        // console.log(data.playlist)
        this.playlist = data.playlist
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin.scss';
.detail {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
