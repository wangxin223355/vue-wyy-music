<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <p class="header-title">{{ title }}</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data() {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      currentThemesIndex: 0
    }
  },
  methods: {
    changeTheme() {
      this.currentThemesIndex++
      if (this.currentThemesIndex >= this.themes.length) {
        this.currentThemesIndex = 0
      }
      document.documentElement.setAttribute(
        'data-theme',
        this.themes[this.currentThemesIndex]
      )
    },
    back() {
      // window.history.back()
      this.$router.go(-1)
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
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
  @include bg_color();
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
    @include bg_img('../../assets/images/back');
  }
  .header-right {
    /* 自动获取图片 */
    @include bg_img('../../assets/images/more');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #ffffff;
    font-weight: 700;
    /* 设置字体大小 不会随着屏幕的变化而变化 */
    @include font_size($font_medium);
    @include no-wrap();
  }
}
</style>
