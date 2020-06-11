<!--
 * @Description: 播放器中间轮播组件
 * @Autor: wangxin
 * @Date: 2020-06-01 20:46:33
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-07 21:54:57
-->
<template>
  <div class="">
    <swiper :options="swiperOptions" class="banner">
      <!-- 封面 -->
      <swiper-slide class="cd">
        <div class="cd-warpper" ref="cdWarpper">
          <img src="./1.png" alt="" />
        </div>
        <p>我是歌词</p>
      </swiper-slide>
      <!-- 歌词 -->
      <swiper-slide class="lyric">
        <ScrollView>
          <ul>
            <li>我是歌词1</li>
            <li>我是歌词2</li>
            <li>我是歌词3</li>
            <li>我是歌词4</li>
            <li>我是歌词5</li>
            <li>我是歌词6</li>
            <li>我是歌词7</li>
            <li>我是歌词8</li>
            <li>我是歌词9</li>
            <li>我是歌词10</li>
            <li>我是歌词11</li>
            <li>我是歌词12</li>
            <li>我是歌词13</li>
            <li>我是歌词14</li>
            <li>我是歌词15</li>
            <li>我是歌词16</li>
            <li>我是歌词17</li>
            <li>我是歌词18</li>
            <li>我是歌词19</li>
            <li>我是歌词20</li>
            <li>我是歌词21</li>
            <li>我是歌词22</li>
            <li>我是歌词23</li>
            <li>我是歌词24</li>
            <li>我是歌词25</li>
            <li>我是歌词26</li>
            <li>我是歌词27</li>
            <li>我是歌词28</li>
            <li>我是歌词29</li>
            <li>我是歌词30</li>
            <li>我是歌词31</li>
            <li>我是歌词32</li>
            <li>我是歌词33</li>
            <li>我是歌词34</li>
            <li>我是歌词35</li>
            <li>我是歌词36</li>
            <li>我是歌词37</li>
            <li>我是歌词38</li>
            <li>我是歌词39</li>
            <li>我是歌词40</li>
            <li>我是歌词41</li>
            <li>我是歌词42</li>
            <li>我是歌词43</li>
            <li>我是歌词44</li>
            <li>我是歌词45</li>
            <li>我是歌词46</li>
            <li>我是歌词47</li>
            <li>我是歌词48</li>
            <li>我是歌词49</li>
            <li>我是歌词50</li>
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
  computed: {
    ...mapGetters(['isPlaying'])
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
