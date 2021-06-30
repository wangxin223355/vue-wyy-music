<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li
          class="list-group"
          v-for="(value, index) in list"
          :key="index"
          ref="group"
        >
          <h2 class="group-title">{{ keys[index] }}</h2>
          <ul>
            <li
              class="group-item"
              v-for="(obj, i) in list[index]"
              :key="i"
              @click.stop="switchSinger(obj.id)"
            >
              <img v-lazy="obj.img1v1Url" alt="" />
              <p>{{ obj.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <!-- 热门列表 -->
    <ul class="list-keys">
      <li
        v-for="(key, index) in keys"
        :key="key"
        :data-index="index"
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :class="{ active: currentIndex === index }"
      >
        {{ key }}
      </li>
    </ul>
    <div class="fixTitle" v-show="fixTitle !== ''" ref="fixTitle">
      {{ fixTitle }}
    </div>
    <transition>
      <router-view></router-view>
    </transition>
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
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0,
      fixTitleHeight: 0
    }
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this.$refs.group.forEach(group => {
          this.groupsTop.push(group.offsetTop)
        })
      })
    },
    fixTitle() {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  methods: {
    _keydown(index) {
      this.currentIndex = index
      const offsetY = this.groupsTop[index]
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    touchstart(e) {
      const index = parseInt(e.target.dataset.index)
      this._keydown(index)

      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove(e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY =
        (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keydown(index)
    },
    // 跳转到歌手歌曲页面
    switchSinger(id) {
      this.$router.push(`/singer/detail/${id}/singer`)
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
  mounted() {
    // 滚动处理
    this.$refs.scrollView.scrolling(y => {
      this.scrollY = y
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }

      // 处理中间得区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const preTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i

          // 标题吸顶效果
          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          // 2.判断计算的结果是否是 0 - 分组标题高度的值
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }

      // 处理最后一个区域
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  computed: {
    // 吸顶标题
    fixTitle() {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
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
  .list-keys {
    position: fixed;
    right: 10px;
    top: 60%;
    transform: translateY(-50%);
    li {
      @include font_color();
      @include font_size($font_medium_s);
      padding: 3px 0;
      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }
  .fixTitle {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    @include font_size($font_medium);
    color: #fff;
    @include bg_color();
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
