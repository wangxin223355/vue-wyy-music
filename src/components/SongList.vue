<!--
 * @Description: 最新音乐组件
 * @Autor: wangxin
 * @Date: 2020-05-29 15:08:55
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-29 20:44:17
-->
<template>
  <div class="song-top">
    <h3>最新音乐</h3>
    <ul class="song-list">
      <li v-for="item in songs" :key="item.id" class="item">
        <img v-lazy="item.song.album.picUrl" alt="" />
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin.scss';
@import '../assets/css/variable.scss';
.song-list {
  width: 100%;
  overflow: hidden;
  .item {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    /*margin-bottom: 20px;*/
    border-bottom: 1px solid #ccc;
    img {
      width: 100px;
      height: 100px;
      border-radius: 20px;
      margin-right: 20px;
    }
    div {
      width: 70%;
      h3 {
        @include font_size($font_large);
        @include font_color();
        @include no-wrap();
      }
      p {
        @include font_size($font_samll);
        @include font_color();
        @include no-wrap();
        opacity: 0.6;
        margin-top: 20px;
      }
    }
  }
}
</style>
