<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left" @click.stop="back"></div>
    </template>
    <template v-slot:center>
      <ul class="header-title">
        <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
          我喜欢的
        </li>
        <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
          最近听的
        </li>
      </ul>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'AccountHeader',
  data() {
    return {
      switchNum: 0
    }
  },
  components: {
    Header
  },
  methods: {
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
