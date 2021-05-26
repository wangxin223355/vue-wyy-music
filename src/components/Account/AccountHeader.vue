<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <ul class="header-title">
      <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
        我喜欢的
      </li>
      <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
        最近听的
      </li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'AccountHeader',
  data() {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      currentThemesIndex: 0,
      switchNum: 0
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
    },
    switchItem(item) {
      this.switchNum = item
      this.$emit('switchItem', item)
    }
  }
  // props: {
  //   title: {
  //     type: String,
  //     default: '',
  //     required: true
  //   }
  // }
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    /* 设置字体大小 不会随着屏幕的变化而变化 */
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;

      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
