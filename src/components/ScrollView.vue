<!--
 * @Description: 滚动组件
 * @Autor: wangxin
 * @Date: 2020-05-29 18:15:35
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-30 22:25:55
-->
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
    /**
     * @description: 初始化iscroll配置
     */
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    /**
     * @description: 创建观察者对象监听滚动高度
     */
    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化，就会执行传入的回调函数
    参数1: mutationList 发生变化的数组
    参数2：observer 观察者对象
    */
    const observer = new MutationObserver((mutationList, observer) => {
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh() // 刷新滚动
      // console.log(this.iscroll.maxScrollY)
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
    /**
     * @description: 提供一个监听滚动距离的方法给外界使用
     * @param {Function} 回调函数
     * @return: {Function} 返回的偏移量
     */
    scrolling(fn) {
      this.iscroll.on('scroll', () => {
        fn(this.iscroll.y)
      })
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
