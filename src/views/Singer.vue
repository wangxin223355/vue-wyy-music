<template>
  <div class="singer">
    <ScrollView>
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value, index) in list" :key="index">
          <h2 class="group-title">{{ keys[index] }}</h2>
          <ul>
            <li class="group-item" v-for="(obj, i) in list[index]" :key="i">
              <img v-lazy="obj.img1v1Url" alt="" />
              <p>{{ obj.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  data() {
    return {
      keys: [],
      list: []
    }
  },
  created() {
    getAllArtists()
      .then(res => {
        this.keys = res.keys
        this.list = res.list
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    ScrollView
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin.scss';
@import '../assets/css/variable.scss';
.singer {
  position: fixed;
  top: 184px;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper {
    // width: 100%;
    // height: 100%;
    .list-group {
      .group-title {
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
        padding: 10px 20px;
      }
      .group-item {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #ccc;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p {
          @include font_size($font_medium);
          @include font_color();
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
