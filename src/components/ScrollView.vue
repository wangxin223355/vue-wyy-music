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
    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化，就会执行传入的回调函数
    参数1: mutationList 发生变化的数组
    参数2：observer 观察者对象
    */
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    // 2.告诉观察者对象我们需要什么内容
    const config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 3.告诉观察者对象，我们需要观察谁，需要观察什么内容
    /*
    参数1：告诉观察者对象我们需要观察谁
    参数2：告诉观察者对象我们需要观察什么内容
    */
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling(fn) {
      this.iscroll.on('scroll', () => {
        fn(this.iscroll.y)
      })
    },
    refresh() {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo(x, y, time) {
      this.iscroll.scrollTo(x, y, time)
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
