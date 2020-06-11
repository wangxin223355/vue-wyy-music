<!--
 * @Description: 轮播图组件
 * @Autor: wangxin
 * @Date: 2020-05-29 09:43:35
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-07 11:28:10
-->
<template>
  <div>
    <!-- 网络获取的数据建议在swiper上加上v-if="数据.length>0"判断是否加载完成 -->
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
      class="banner"
      v-if="banners.length > 0"
    >
      <swiper-slide v-for="item in banners" :key="item.bannerId" class="item">
        <a :href="item.url">
          <img v-lazy="item.pic" alt="" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Banner',
  props: {
    /* 接收的轮播图数据 */
    banners: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  data() {
    return {
      // swiper轮播图配置
      swiperOptions: {
        pagination: {
          // 如果需要分页器
          el: '.swiper-pagination'
        },
        loop: true, // 循环模式选项
        autoplay: {
          delay: 1000, // 自动切换的时间间隔
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
        },
        observer: true, // 发生修改时，自动初始化swiper
        observeParents: true, // 当Swiper的父元素变化时，自动更新swiper
        observeSlideChildren: true // 子slide更新时，swiper是否更新
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped lang="scss">
.banner {
  .item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
@import '../../assets/css/mixin.scss';
/* 如果想覆盖swiper样式 style样式标签不能有scoped属性 */
.banner {
  /* 分页器样式设置 */
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
