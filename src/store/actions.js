/*
 * @Description: actions
 * @Autor: wangxin
 * @Date: 2020-06-05 16:28:28
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-10 16:08:03
 */
import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE
} from './mutations-type'
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
  }
}
