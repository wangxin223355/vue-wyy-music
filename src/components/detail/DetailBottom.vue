<template>
  <ul class="detail-bottom">
    <!-- 播放全部 -->
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <!-- 歌曲列表 -->
    <li
      class="item"
      v-for="item in playList"
      :key="item.id"
      @click="selectMusic(item.id)"
    >
      <h3>{{ item.name }}</h3>
      <p>{{ item.al.name }} - {{ item.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'getSongDeatil']),
    selectMusic(id) {
      this.setFullScreen(true)
      this.getSongDeatil([id])
    },
    selectAllMusic() {
      this.setFullScreen(true)
      const ids = this.playList.map(item => {
        return item.id
      })
      this.getSongDeatil([ids])
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';

.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 100px;
    padding: 10px 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #cccccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon {
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title {
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }
    p {
      @include font_color();
      @include font_size($font_samll);
      opacity: 0.8;
    }
  }
}
</style>
