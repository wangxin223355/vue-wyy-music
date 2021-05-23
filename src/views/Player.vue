<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import mode from '../store/modeType'
import { getRandomIntInclusive } from '../tools/tools'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Player',
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'currTime',
      'modeType',
      'songs'
    ])
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  data() {
    return {
      totalTime: 0, // 歌曲时长
      currentTime: 0 // 当前播放时长
    }
  },
  mounted() {
    // 获取歌曲时长
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  watch: {
    // 播放
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex() {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration // 重新获取歌曲时长
        if (this.isPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    currTime(newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    }
  },
  methods: {
    ...mapActions(['setCurrentIndex']),
    // 获取当前播放时长
    timeupdate(e) {
      this.currentTime = e.target.currentTime
    },
    // 播放模式
    end() {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        console.log(index)
        this.setCurrentIndex(index)
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
