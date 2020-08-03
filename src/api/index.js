/*
 * @Description: 处理请求接口
 * @Autor: wangxin
 * @Date: 2020-05-29 09:30:45
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-11 22:37:42
 */
import Network from './network'

// 轮播图
export const getBanner = () => Network.get('banner?type=2')
// 推荐内容
export const getPersonalized = () => Network.get('personalized?limit=6')
// 最新专辑
export const getNewAlbum = () => Network.get('album/newest')
// 最新音乐
export const getNewSong = () => Network.get('personalized/newsong')
// 歌单详情
export const getPlayList = data => Network.get('playlist/detail', data)
// 专辑内容
export const getAlbum = data => Network.get('album', data)
// 歌曲详情
export const getSongDetail = data => Network.get('song/detail', data)
// 歌词
export const getSongLvric = data => Network.get('lyric', data)
// 歌曲地址
export const getSongUrl = data => Network.get('song/url', data)
