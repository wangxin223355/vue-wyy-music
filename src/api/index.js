/*
 * @Description: 处理请求接口
 * @Autor: wangxin
 * @Date: 2020-05-29 09:30:45
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-30 16:51:24
 */
import Network from './network'

// 各种请求
export const getBanner = () => Network.get('banner?type=2') // 轮播图
export const getPersonalized = () => Network.get('personalized?limit=6') // 推荐内容
export const getNewAlbum = () => Network.get('album/newest') // 最新专辑
export const getNewSong = () => Network.get('personalized/newsong') // 最新音乐
export const getPlayList = data => Network.get('playlist/detail', data) // 歌单详情
