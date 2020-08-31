import mode from './modeType'
export default {
  // 默认播放器的显示
  isFullScreen: false,
  // 迷你播放器的显示
  isShowMiniPlayer: false,
  // 播放图标的切换
  isPlaying: false,
  // 播放模式
  modeType: mode.loop,
  // 列表播放器的显示
  isShowListPlayer: false,
  // 歌曲详情
  songs: [],
  // 当前播放歌曲
  currentSong: {},
  // 当前播放歌曲第几首
  currentIndex: 0,
  // 当前播放的歌词
  currentLyric: {},
  // 进度条点击时间
  currTime: 0
}
