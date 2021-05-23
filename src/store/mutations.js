import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DEATIL,
  SET_SONG_LYRIC,
  DEL_LIST_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'

export default {
  // 控制默认播放器的显示
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  // 控制mini播放器的显示
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  // 控制播放图标的切换
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag
  },
  // 控制播放模式的切换
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag
  },
  // 控制播放列表的显示
  [SET_LIST_PLAYER](state, flag) {
    state.isShowListPlayer = flag
  },
  // 获取的歌曲数据
  [SET_SONG_DEATIL](state, list) {
    state.songs = list
  },
  //  获取歌词
  [SET_SONG_LYRIC](state, lyric) {
    state.currentLyric = lyric
  },
  // 删除列表歌曲
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
  // 切换歌曲
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      state.currentIndex = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      state.currentIndex = 0
    } else {
      state.currentIndex = index
    }
  },
  [SET_CURRENT_TIME](state, time) {
    state.currTime = time
  },
  [SET_FAVORITE_SONG](state, song) {
    const res = state.favoriteList.find(item => {
      return item === song
    })
    if (res === undefined) {
      state.favoriteList.push(song)
    }
  },
  [SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG](state, song) {
    const res = state.historyList.find(item => {
      return item === song
    })
    if (state.historyList.length > 30) {
      state.historyList.splice(0, 1)
    }
    if (res === undefined) {
      state.historyList.push(song)
    }
  },
  [SET_HISTORY_LIST](state, list) {
    state.historyList = list
  }
}
