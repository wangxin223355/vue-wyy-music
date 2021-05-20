<template>
  <div class="player-bottom">
    <!-- 进度条 -->
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progerssClick">
        <div class="progress-line" ref="progerssLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleToatlTime">00:00</span>
    </div>
    <!-- 按钮 -->
    <div class="bottom-control">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="Play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  computed: {
    ...mapGetters(['isPlaying', 'modeType', 'currentIndex'])
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime'
    ]),
    Play() {
      this.setIsPlaying(!this.isPlaying)
    },
    // 歌曲切换
    prev() {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    // 模式切换
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    // 进度条点击
    progerssClick(e) {
      // 1.计算进度条的位置
      const normalLeft = e.target.offsetLeft
      const eventLeft = e.pageX
      const clickLeft = eventLeft - normalLeft
      const progerssWidth = e.target.offsetWidth
      const value = clickLeft / progerssWidth
      this.$refs.progerssLine.style.width = value * 100 + '%'

      // 2.计算当前应该从什么时候啊开始播放
      const currentTime = this.totalTime * value
      this.setCurrentTime(currentTime)
    },
    formartTime(time) {
      // 2.得到两个时间之间的差值(秒)
      const differSecond = time
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24))
      day = day >= 10 ? day : '0' + day
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor((differSecond / (60 * 60)) % 24)
      hour = hour >= 10 ? hour : '0' + hour
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor((differSecond / 60) % 60)
      minute = minute >= 10 ? minute : '0' + minute
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60)
      second = second >= 10 ? second : '0' + second
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }
    }
  },
  watch: {
    // 监听isPlaying是否发生改变，并修改图标
    isPlaying(newValue, oldValue) {
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
    },
    // 歌曲时长
    totalTime(newValue, oldValue) {
      const time = this.formartTime(newValue)
      this.$refs.eleToatlTime.innerHTML = time.minute + ':' + time.second
    },
    // 播放时长
    currentTime(newValue, oldValue) {
      const time = this.formartTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second

      const value = (newValue / this.totalTime) * 100
      this.$refs.progerssLine.style.width = value + '%'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background-color: #ffffff;
      .progress-line {
        position: relative;
        width: 0%; // 控制进度条
        height: 100%;
        background-color: #cccccc;
        .progress-dot {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ffffff;
        }
      }
    }
  }
  .bottom-control {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img('../../assets/images/loop');
      }
      &.one {
        @include bg_img('../../assets/images/one');
      }
      &.random {
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev {
      @include bg_img('../../assets/images/prev');
    }
    .play {
      @include bg_img('../../assets/images/play');
      &.active {
        @include bg_img('../../assets/images/pause');
      }
    }
    .next {
      @include bg_img('../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../assets/images/un_favorite');
    }
  }
}
</style>
