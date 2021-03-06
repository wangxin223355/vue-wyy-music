// 导入常量名
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

import { getSongDetail, getSongLvric, getSongUrl } from '../api/index'

export default {
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setListPLayer({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  // 获取歌曲数据
  async getSongDeatil({ commit }, ids) {
    const res = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongUrl({ id: ids.join(',') })
    const list = []
    // 处理歌曲详情数据
    res.songs.forEach((item, index) => {
      const obj = {}
      // 解决歌曲id不对等
      for (let j = 0; j < urls.data.length; j++) {
        const value = urls.data[j]
        if (item.id === value.id) {
          obj.url = value.url
          break
        }
      }
      obj.id = item.id
      obj.name = item.name
      let singer = ''
      item.ar.forEach((item, index) => {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = item.al.picUrl
      list.push(obj)
    })
    commit(SET_SONG_DEATIL, list)
  },
  // 获取歌词
  async getSongLyric({ commit }, id) {
    const result = await getSongLvric({ id })
    let obj = {}
    // 是否有歌词
    if ('lrc' in result) {
      obj = parseLyric(result.lrc.lyric)
    }
    // const obj = parseLyric(result.lrc.lyric)
    commit(SET_SONG_LYRIC, obj)
  },
  delListSongs({ commit }, index) {
    commit(DEL_LIST_SONG, index)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteSong({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}

// 格式化歌词方法
function parseLyric(lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function(lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) {
      return
    }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
