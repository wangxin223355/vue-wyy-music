<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate"></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/player/NormalPlayer'
import MiniPlayer from '../components/player/MiniPlayer'
import ListPlayer from '../components/player/ListPlayer'
import { mapGetters } from 'vuex'

export default {
  name: 'Player',
  computed: {
    ...mapGetters(['currentSong', 'isPlaying', 'currentIndex', 'currTime'])
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
    // 获取歌曲播放时长
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  watch: {
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
    // 获取当前播放时长
    timeupdate(e) {
      this.currentTime = e.target.currentTime
    }
  }
}
</script>
<style scoped lang="scss"></style>
