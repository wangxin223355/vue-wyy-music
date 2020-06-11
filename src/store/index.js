/*
 * @Description: Vuex组件
 * @Autor: wangxin
 * @Date: 2020-05-28 12:49:58
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-10 16:03:09
 */
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
  modeType: mode.loop
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
