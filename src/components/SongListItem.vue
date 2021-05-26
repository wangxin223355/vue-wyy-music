<template>
  <ul class="song-list">
    <li
      v-for="item in songs"
      :key="item.id"
      class="item"
      @click="selectMusic(item.id)"
    >
      <img v-lazy="item.picUrl" alt="" />
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
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
    ...mapActions(['setFullScreen', 'getSongDeatil']),
    selectMusic(id) {
      this.setFullScreen(true)
      this.getSongDeatil([id])
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
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
      border-radius: 10px;
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
