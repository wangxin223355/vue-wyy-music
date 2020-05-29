<!--
 * @Description: 头部组件
 * @Autor: wangxin
 * @Date: 2020-05-28 13:57:42
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-29 18:38:41
-->
<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">网易云音乐</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      // 换肤主题
      themes: ['theme', 'theme1', 'theme2'],
      // 当前主题的索引号
      currentThemesIndex: 0
    }
  },
  methods: {
    /**
     * @description: 点击头部实现换肤效果
     */
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
    @include bg_img('../assets/images/logo');
  }
  .header-right {
    /* 自动获取图片 */
    @include bg_img('../assets/images/account');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #ffffff;
    font-weight: 700;
    /* 设置字体大小 不会随着屏幕的变化而变化 */
    @include font_size($font_medium);
  }
}
</style>
