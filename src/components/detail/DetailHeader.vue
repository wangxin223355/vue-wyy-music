<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left" @click.stop="back"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">{{ title }}</p>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
  methods: {
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
