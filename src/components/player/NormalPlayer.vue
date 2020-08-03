<template>
  <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isFullScreen', 'currentSong'])
  },
  methods: {
    ...mapActions(['getSongLyric']),
    /**
     * @description: 默认播放器进入动画
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
     * @description: 默认播放器离开动画
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
    }
  },
  watch: {
    // 监听当前歌曲是否发生了变化
    currentSong(newValue, oldValue) {
      if (newValue.id === '') {
        return
      }
      this.getSongLyric(newValue.id)
    }
  },
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  @include bg_sub_color();
  .player-warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>
