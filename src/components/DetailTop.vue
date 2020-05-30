<!--
 * @Description: 详情页大图片
 * @Autor: wangxin
 * @Date: 2020-05-30 17:06:45
 * @LastEditors: Seven
 * @LastEditTime: 2020-05-30 17:12:12
-->
<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="path" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
