<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem
          :songs="switchNum === 0 ? favoriteList : historyList"
        ></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../ScrollView'
import SongListItem from '../SongListItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AccountBottom',
  props: {
    switchNum: {
      type: Number,
      default: 0,
      require: true
    }
  },
  computed: {
    ...mapGetters(['favoriteList', 'historyList'])
  },
  methods: {
    ...mapActions(['setFullScreen', 'getSongDeatil', 'setCurrentIndex']),
    // ...mapMutations(['SET_SONG_DETAIL']),
    selectAllMusic() {
      // this.setFullScreen(true)
      let ids = []
      if (this.switchNum === 0) {
        ids = this.favoriteList.map(item => {
          return item.id
        })
        // this.SET_SONG_DEATIL(this.favoriteList)
      } else {
        ids = this.historyList.map(item => {
          return item.id
        })
        // this.SET_SONG_DETAIL(this.historyList)
      }
      this.getSongDeatil([ids])
      this.setFullScreen(true)
      this.setCurrentIndex(0)
    }
  },
  components: {
    ScrollView,
    SongListItem
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  .bottom-play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    @include border-color();
    border-radius: 30px;
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
