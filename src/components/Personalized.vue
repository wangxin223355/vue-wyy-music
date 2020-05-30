<!--
 * @Description: 推荐歌单内容列表组件
 * @Autor: wangxin
 * @Date: 2020-05-29 14:06:35
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-30 23:31:14
-->
<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div
        class="item"
        @click="selectItem(item.id)"
        v-for="item in personalized"
        :key="item.id"
      >
        <img v-lazy="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
        <p class="player el-icon-service" v-show="title == '推荐歌单'">
          {{ item.trackCount }}万
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    // 监听歌单的点击事件
    selectItem(id) {
      // console.log(id)
      this.$emit('select', id)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin.scss';
@import '../assets/css/variable.scss';
.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    h3 {
      @include font_size($font_large);
      font-weight: 700;
      @include font_color();
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      position: relative;
      width: 200px;
      padding-bottom: 20px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
      p {
        @include clamp(2); // 限制为两行
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
        margin-top: 20px;
      }
      .player {
        position: absolute;
        right: 10px;
        top: -15px;
        @include font_size($font_medium_s);
        color: #ffffff !important;
        text-shadow: 2px 0 rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
