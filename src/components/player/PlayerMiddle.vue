<template>
  <div class="">
    <swiper :options="swiperOptions" class="banner">
      <swiper-slide class="cd">
        <div class="cd-warpper" ref="cdWarpper">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <p>{{ getFirstLyric() }}</p>
      </swiper-slide>
      <swiper-slide class="lyric">
        <ScrollView>
          <ul>
            <li v-for="(value, index) in currentLyric" :key="index">
              {{ value }}
            </li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import ScrollView from '../ScrollView'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  data() {
    return {
      // swiper轮播图配置
      swiperOptions: {
        pagination: {
          // 如果需要分页器
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', // 需设置.my-bullet样式
          bulletActiveClass: 'my-bullet-active' // 激活状态的类名
        },
        observer: true, // 发生修改时，自动初始化swiper
        observeParents: true, // 当Swiper的父元素变化时，自动更新swiper
        observeSlideChildren: true // 子slide更新时，swiper是否更新
      }
    }
  },
  methods: {
    // 获取第一句歌词
    getFirstLyric() {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'currentLyric'])
  },
  watch: {
    // 监听isPlaying状态改变
    isPlaying(newValue, OLdValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add('active')
      } else {
        this.$refs.cdWarpper.classList.remove('active')
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';

.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-warpper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #ffffff;
      overflow: hidden;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin-top: 50px;
      text-align: center;
      @include font_size($font_large);
      @include font_color();
    }
  }
  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 100px;
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import '../../assets/css/mixin.scss';

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #fff;
  margin: 0 20px;
  transition: all 0.2s;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
