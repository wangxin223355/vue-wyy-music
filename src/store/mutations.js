/*
 * @Description: mutations
 * @Autor: wangxin
 * @Date: 2020-06-05 16:27:39
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-10 16:06:19
 */
import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE
} from './mutations-type'
export default {
  /**
   * @description: 控制默认播放器的显示
   * @param {Bollean} flag 是否隐藏
   */
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag
  },

  /**
   * @description: 控制mini播放器的显示
   * @param {Bollean} flag 是否隐藏
   */
  [SET_MINI_PLAYER](state, flag) {
    state.isShowMiniPlayer = flag
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
  }
}
