<!--
 * @Description: 最新音乐组件
 * @Autor: wangxin
 * @Date: 2020-05-29 15:08:55
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-05 17:04:49
-->
<template>
  <div class="songs">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <ul class="song-list">
      <li
        v-for="item in songs"
        :key="item.id"
        class="item"
        @click="selectMusic"
      >
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
import { mapActions } from 'vuex'
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
  },
  methods: {
    ...mapActions(['setFullScreen']),
    selectMusic() {
      this.setFullScreen(true)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.songs {
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    h3 {
      @include font_size($font_large);
      font-weight: 700;
      @include font_color();
    }
  }
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
}
</style>
