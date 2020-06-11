<!--
 * @Description: 歌单详情页
 * @Autor: wangxin
 * @Date: 2020-05-30 15:18:20
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-07 11:25:03
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
import DetailHeader from '../components/detail/DetailHeader'
import DetailTop from '../components/detail/DetailTop'
import DetailBottom from '../components/detail/DetailBottom'
import ScrollView from '../components/ScrollView'

import { getPlayList, getAlbum } from '../api/index'
export default {
  name: 'Detail',
  data() {
    return {
      playlist: {}
    }
  },
  mounted() {
    // 下拉上拉修改背景图片状态
    const defaultHeight = this.$refs.top.$el.offsetHeight
    // 获取偏移量
    this.$refs.scrollView.scrolling(offsetY => {
      if (offsetY < 0) {
        // console.log('向上滚动')
        // const scale = (20 * Math.abs(offsetY)) / defaultHeight // 得到一个越来越大的值
        // this.$refs.top.$el.style.filter = `blur(${scale}px)` 高斯模糊耗费性能 移动端建议不用
        // 采用添加蒙版的方式
        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
      } else {
        // console.log('向下滚动')
        const scale = 1 + offsetY / defaultHeight // 逐渐越来越大于1
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  },
  created() {
    // 获取歌单详情内容
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then(data => {
          // console.log(data.playlist)
          this.playlist = data.playlist
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'albums') {
      getAlbum({ id: this.$route.params.id })
        .then(data => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
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
