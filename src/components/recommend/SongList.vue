<template>
  <div class="songs">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongListItem :songs="songs"></SongListItem>
  </div>
</template>

<script>
import SongListItem from '../SongListItem'
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
  components: {
    SongListItem
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
}
</style>
