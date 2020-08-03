<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio"></audio>
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
    ...mapGetters(['currentSong', 'isPlaying', 'currentIndex'])
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
        if (this.isPlaying) {
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  data() {
    return {
      totalTime: 0
    }
  },
  mounted() {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  }
}
</script>
<style scoped lang="scss"></style>
