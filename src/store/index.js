import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import mode from './modeType'

Vue.use(Vuex)
const state = {
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
  currentLyric: {}
}

export default new Vuex.Store({
  // state:用于保存全局共享的数据
  state: state,
  // mutations:用于保存修改全局共享的数据的方法
  mutations: mutations,
  // actions:用于保存触发motations中保存的方法的方法
  actions: actions,
  // getters:获取全局共享数据
  getters: getters,
  modules: {}
})
