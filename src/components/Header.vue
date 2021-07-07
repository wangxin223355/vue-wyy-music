<template>
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left">左边</slot>
    </div>
    <div class="center">
      <slot name="center">中间</slot>
    </div>
    <div class="right">
      <slot name="right">右边</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      // 换肤主题
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
.header {
  // position: relative;
  // z-index: 999;
  width: 100%;
  height: 100px;
  /* @include 指令可以将混入（mixin）引入到文档中 实现了换肤效果 */
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
