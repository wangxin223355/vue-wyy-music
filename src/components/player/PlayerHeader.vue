<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'PlayerHeader',
  computed: {
    ...mapGetters(['currentSong'])
  },
  methods: {
    ...mapActions(['setFullScreen', 'setMiniPlayer']),
    // 隐藏默认播放器,显示mini播放器
    hiddenNormalPlayer() {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.header {
  position: relative;
  z-index: 999;
  width: 100%;
  height: 100px;
  /* @include 指令可以将混入（mixin）引入到文档中 实现了换肤效果 */
  // @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left {
    /* 自动获取图片 */
    @include bg_img('../../assets/images/down');
  }
  .header-title {
    text-align: center;
    // line-height: 100px;
    color: #ffffff;
    // font-weight: 700;
    /* 设置字体大小 不会随着屏幕的变化而变化 */
    @include font_size($font_medium);
    @include no-wrap();
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      @include font_size($font_medium_s);
    }
  }
}
</style>
