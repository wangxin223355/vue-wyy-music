<template>
  <Header class="MainHeader">
    <template v-slot:left>
      <div slot="left" class="header-left"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">网易鱼音乐</p>
    </template>
    <template v-slot:right>
      <div class="header-right" @click.stop="accountClick"></div>
    </template>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  methods: {
    accountClick() {
      this.$router.push('/account')
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';
.MainHeader {
  .header-left {
    @include bg_img('../assets/images/logo');
  }
  .header-right {
    @include bg_img('../assets/images/account');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #ffffff;
    font-weight: 700;
    @include font_size($font_medium);
  }
}
</style>
