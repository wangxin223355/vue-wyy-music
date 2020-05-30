<!--
 * @Description: 歌单详情歌曲列表组件
 * @Autor: wangxin
 * @Date: 2020-05-30 17:22:25
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-30 21:47:25
-->
<template>
  <ul class="detail-bottom">
    <li class="bottom-top">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li class="item" v-for="item in playList" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>{{ item.al.name }} - {{ item.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DetailBottom',
  props: {
    playList: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variable.scss';
@import '../assets/css/mixin.scss';

.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 100px;
    padding: 20px;
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
      @include bg_img('../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title {
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }
    p {
      @include font_color();
      @include font_size($font_samll);
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}
</style>
