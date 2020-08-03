<!--
 * @Description: 迷你播放器组件
 * @Autor: wangxin
 * @Date: 2020-06-04 09:36:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-14 12:13:08
-->
<template>
  <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-warpper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.picUrl" ref="cdImg" alt="" />
          <div class="player-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="Play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPLayer'
    ]),

    // 显示播放列表
    showList() {
      this.setListPLayer(true)
    },

    // 显示默认播放器,隐藏mini播放器
    showNormalPlayer() {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },

    /**
     * @description: mini播放器进入动画
     * @param {Object} el 触发动画的元素
     * @param {Function} done 动画函数已经执行完毕
     */
    enter(el, done) {
      Velocity(
        el,
        'transition.shrinkIn',
        {
          duration: 500
        },
        function() {
          done()
        }
      )
    },

    /**
     * @description: mini播放器离开动画
     * @param {Object} el 触发动画的元素
     * @param {Function} done 动画函数已经执行完毕
     */
    leave(el, done) {
      Velocity(
        el,
        'transition.shrinkOut',
        {
          duration: 500
        },
        function() {
          done()
        }
      )
    },

    // 修改mini播放器页面的播放图标
    Play() {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters(['isShowMiniPlayer', 'isPlaying', 'currentSong'])
  },
  watch: {
    // 监听isPlaying是否发生改变，并修改图标
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cdImg.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cdImg.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';

.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150px;
  .player-warpper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left {
      padding-left: 30px;
      display: flex;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 3s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
      }
      .player-title {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/play');
        &.active {
          @include bg_img('../../assets/images/pause');
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list');
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
