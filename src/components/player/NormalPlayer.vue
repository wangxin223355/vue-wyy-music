<!--
 * @Description: 默认播放器界面
 * @Autor: wangxin
 * @Date: 2020-06-04 08:49:49
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-07 17:02:32
-->

<template>
  <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img src="./1.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  computed: {
    ...mapGetters(['isFullScreen'])
  },
  methods: {
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
