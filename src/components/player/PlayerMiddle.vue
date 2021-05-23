<template>
  <div class="">
    <swiper :options="swiperOptions" class="banner">
      <!-- 封面 -->
      <swiper-slide class="cd">
        <div class="cd-warpper" ref="cdWarpper">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <p>{{ getFirstLyric() }}</p>
      </swiper-slide>
      <!-- 歌词 -->
      <swiper-slide class="lyric " ref="lyric">
        <ScrollView ref="scrollView">
          <ul>
            <li
              v-for="(value, key) in currentLyric"
              :key="key"
              :class="{ active: currentLineNum === key }"
            >
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
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'currentLyric'])
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
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
      },
      currentLineNum: '0'
    }
  },
  methods: {
    // 获取第一句歌词
    getFirstLyric() {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    // 递归查找上对应歌词
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum]
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  watch: {
    // 监听isPlaying状态改变,封面旋转
    isPlaying(newValue, OLdValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add('active')
      } else {
        this.$refs.cdWarpper.classList.remove('active')
      }
    },
    currentTime(newValue, OLdValue) {
      // // 1.歌词高亮同步
      // const lineNum = Math.floor(newValue) + ''
      // const result = this.currentLyric[lineNum]
      // // 歌词的key中存在相同的时间
      // if (result !== undefined && result !== '') {
      //   this.currentLineNum = lineNum

      //   // 2.歌词滚动同步
      //   const currentLyricTop = document.querySelector('li.active').offsetTop
      //   const lyricHeight = this.$refs.lyric.$el.offsetHeight
      //   if (currentLyricTop > lyricHeight / 2) {
      //     // 开始滚动
      //     this.$refs.scrollView.scrollTo(
      //       0,
      //       lyricHeight / 2 - currentLyricTop,
      //       200
      //     )
      //   }
      // }
      const lineNum = Math.floor(newValue) + ''
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 2.歌词滚动同步
      const currentLyricTop = document.querySelector('li.active').offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        // 开始滚动
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          200
        )
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 200)
      }
    },
    currentLyric(newValue, OLdValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
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
      // 旋转动画
      animation: sport 6s linear infinite;
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
        padding-bottom: 50%;
      }
      &.active {
        color: #fff;
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
