/*
 * @Description: mutations
 * @Autor: wangxin
 * @Date: 2020-06-05 16:27:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-14 19:17:07
 */
import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DEATIL,
  SET_SONG_LYRIC,
  DEL_LIST_SONG,
  SET_CURRENT_INDEX
} from './mutations-type'

export default {
  /**
   * @description: 控制默认播放器的显示
   * @param {Bollean} flag 是否隐藏
   */
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },

  /**
   * @description: 控制mini播放器的显示
   * @param {Bollean} flag 是否隐藏
   */
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },

  /**
   * @description: 控制播放图标的切换
   * @param {Bollean} flag 是否播放
   */
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },

  /**
   * @description: 控制播放模式的切换
   * @param {Bollean} flag 模式
   */
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag
  },
  /**
   * @description: 控制播放列表的显示
   * @param {Bollean} flag 是否显示
   */
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag
  },
  /**
   * @description: 获取歌曲数据
   * @param {Array} list 获取的歌曲数据
   */
  [SET_SONG_DEATIL](state, list) {
    state.songs = list
  },
  /**
   * @description: 获取歌词
   * @param {Array} lyric 获取的歌词数据
   */
  [SET_SONG_LYRIC](state, lyric) {
    state.currentLyric = lyric
  },
  /**
   * 删除列表歌曲
   */
  [DEL_LIST_SONG](state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1)
    } else {
      state.songs = []
    }
    if (index < state.currentIndex) {
      state.currentIndex -= 1
    }
    if (state.songs.length === 0) {
      state.isShowListPlayer = false
      state.isShowMiniPlayer = false
      state.isFullScreen = false
    }
  },
  /**
   * 修改当前播放歌曲
   */
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      state.currentIndex = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      state.currentIndex = 0
    } else {
      state.currentIndex = index
    }
  }
}
