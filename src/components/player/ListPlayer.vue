<!--
 * @Description: 播放列表组件
 * @Autor: wangxin
 * @Date: 2020-06-04 15:11:42
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-10 16:37:22
-->
<template>
  <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
    <div class="list-player" v-show="isShow">
      <div class="player-warpper">
        <div class="play-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.modeType == 0">顺序播放</p>
            <p v-else-if="this.modeType == 1">单曲播放</p>
            <p v-else-if="this.modeType == 2">随机播放</p>
          </div>
          <div class="top-right">
            <div class="del"></div>
          </div>
        </div>
        <div class="play-middle">
          <ScrollView>
            <ul>
              <li class="item">
                <div class="item-left">
                  <div class="item-play"></div>
                  <p>演员</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
                </div>
              </li>
              <li class="item">
                <div class="item-left">
                  <div class="item-play"></div>
                  <p>演员</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
                </div>
              </li>
              <li class="item">
                <div class="item-left">
                  <div class="item-play" ref="play" @click="play"></div>
                  <p>演员</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="play-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'

export default {
  name: 'ListPlayer',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    ...mapActions(['setIsPlaying', 'setModeType']),

    // 显示播放列表
    show() {
      this.isShow = true
    },

    // 关闭播放列表
    hidden() {
      this.isShow = false
    },

    /**
     * @description: 播放列表进入动画
     * @param {Object} el 触发动画的元素
     * @param {Function} done 动画函数已经执行完毕
     */
    enter(el, done) {
      Velocity(
        el,
        'transition.slideUpIn',
        {
          duration: 500
        },
        function() {
          done()
        }
      )
    },

    /**
     * @description: 播放列表离开动画
     * @param {Object} el 触发动画的元素
     * @param {Function} done 动画函数已经执行完毕
     */
    leave(el, done) {
      Velocity(
        el,
        'transition.slideDownOut',
        {
          duration: 500
        },
        function() {
          done()
        }
      )
    },

    // 修改播放列表的播放图标
    play() {
      this.setIsPlaying(!this.isPlaying)
    },

    // 修改播放列表的播放模式
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType'])
  },
  watch: {
    // 监听isPlaying是否变化，并修改图标
    isPlaying(newValue, OldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },

    // 监听modeType的改变，修改图标
    modeType(newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    }
  },
  components: {
    ScrollView
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin.scss';
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-warpper {
    .play-top {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img('../../assets/images/small_loop');
          }
          &.one {
            @include bg_img('../../assets/images/small_one');
          }
          &.random {
            @include bg_img('../../assets/images/small_shuffle');
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del');
        }
      }
    }
    .play-middle {
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../assets/images/small_pause');
            &.active {
              @include bg_img('../../assets/images/small_play');
            }
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_favorite');
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close');
          }
        }
      }
    }
    .play-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_medium);
        color: #ffffff;
      }
    }
  }
}
</style>