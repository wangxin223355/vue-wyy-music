<!--
 * @Description: 推荐页面
 * @Autor: wangxin
 * @Date: 2020-05-28 16:55:29
 * @LastEditors: Seven
 * @LastEditTime: 2020-06-07 11:24:09
-->
<template>
  <div class="recommend">
    <div class="recommend-container">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="'personalized'"
          ></Personalized>
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="'albums'"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong
} from '../api/index'
import Banner from '../components/recommend/Banner'
import Personalized from '../components/recommend/Personalized'
import SongList from '../components/recommend/SongList'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Recommend',
  data() {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created() {
    // 获取轮播图数据
    getBanner()
      .then(data => {
        // console.log(data)
        this.banners = data.banners
      })
      .catch(err => {
        console.log(err)
      })

    // 获取推荐歌单数据
    getPersonalized()
      .then(data => {
        // console.log(data.result)
        this.personalized = data.result
      })
      .catch(err => {
        console.log(err)
      })

    // 获取最新专辑数据
    getNewAlbum()
      .then(data => {
        // console.log(data.albums.splice(0, 6))
        this.albums = data.albums.splice(0, 6)
      })
      .catch(err => {
        console.log(err)
      })

    // 获取最新音乐数据
    getNewSong()
      .then(data => {
        // console.log(data.result)
        this.songs = data.result
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    /**
     * @description: 跳转到详情页
     */
    fatherSelectItem(id, type) {
      this.$router.push({
        path: `recommend/detail/${id}/${type}`
      })
    }
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  }
}
</script>
<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  // overflow: hidden;
  .recommend-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: all 0.5s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: all 0.5s;
}
</style>
