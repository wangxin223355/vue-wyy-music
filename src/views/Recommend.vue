<template>
  <!-- 可视区域 -->
  <div class="recommend">
    <!-- 容器区域 -->
    <div class="recommend-container">
      <ScrollView>
        <!-- 插槽内容 -->
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
      banners: [], // 轮播图
      personalized: [], // 推荐歌单
      albums: [], // 最新专辑
      songs: []
    }
  },
  created() {
    getBanner()
      .then(data => {
        this.banners = data.banners
      })
      .catch(err => {
        console.log(err)
      })
    // 获取推荐歌单数据
    getPersonalized()
      .then(data => {
        this.personalized = data.result
      })
      .catch(err => {
        console.log(err)
      })
    // 获取最新专辑数据
    getNewAlbum()
      .then(data => {
        this.albums = data.albums.splice(0, 6)
      })
      .catch(err => {
        console.log(err)
      })

    // 获取最新音乐数据
    getNewSong()
      .then(data => {
        this.songs = data.result
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 跳转到歌单详情页面
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
  .recommend-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
// 过渡动画
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
