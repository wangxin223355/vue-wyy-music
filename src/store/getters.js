export default {
  isFullScreen(state) {
    return state.isFullScreen
  },
  isShowMiniPlayer(state) {
    return state.isShowMiniPlayer
  },
  isPlaying(state) {
    return state.isPlaying
  },
  modeType(state) {
    return state.modeType
  },
  isShowListPlayer(state) {
    return state.isShowListPlayer
  },
  songs(state) {
    return state.songs
  },
  currentSong(state) {
    let obj = {
      id: '',
      name: '',
      singer: '',
      picUrl: null
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentIndex(state) {
    return state.currentIndex
  },
  currentLyric(state) {
    return state.currentLyric
  },
  currTime(state) {
    return state.currTime
  }
}
