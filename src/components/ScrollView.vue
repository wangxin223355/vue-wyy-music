<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// 导入可以监听滚动位置版本的iscroll
import IScroll from 'iscroll/build/iscroll-probe'

export default {
  name: 'ScrollView',
  mounted() {
    // 初始化iscroll配置
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: false,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // 创建观察者对象监听滚动高度
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    const config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    scrolling(fn) {
      this.iscroll.on('scroll', () => {
        fn(this.iscroll.y)
      })
    },
    refresh() {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
