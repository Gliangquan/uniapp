<template>
  <view class="container">
    <button @click="showToastVue">Vue方式调用提示</button>
    <button @click="showToastJs">JS方式调用提示</button>
  </view>
</template>

<script>
import { showGlobalToast } from './toastService'

export default {
  methods: {
    // Vue方式调用
    showToastVue() {
      this.$toast('Vue方式调用成功！')
    },
    // JS方式调用
    showToastJs() {
      showGlobalToast('JS方式调用成功！')
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}
button {
  margin-bottom: 20px;
}
</style> 