<template>
  <view class="container">
    <button @click="showBasicToast">基础提示</button>
    <button @click="showSuccessToast">成功提示</button>
    <button @click="showErrorToast">错误提示</button>
    <button @click="showWarningToast">警告提示</button>
    <button @click="showInfoToast">信息提示</button>
    <button @click="showCustomToast">自定义提示</button>
    <button @click="showClickableToast">可点击提示</button>
  </view>
</template>

<script>
import { showToast } from '@/components/GlobalToast/toast.js'

export default {
  methods: {
    showBasicToast() {
      this.$toast('这是一个基础提示')
    },
    showSuccessToast() {
      this.$toastSuccess('操作成功完成！')
    },
    showErrorToast() {
      this.$toastError('操作失败，请重试！')
    },
    showWarningToast() {
      this.$toastWarning('请注意这个重要信息！')
    },
    showInfoToast() {
      this.$toastInfo('这是一条提示信息')
    },
    showCustomToast() {
      showToast({
        type: 'info',
        title: '自定义标题',
        message: '这是一条自定义样式的提示信息',
        duration: 3000,
        icon: 'icon-info'
      })
    },
    showClickableToast() {
      this.$toastInfo('点击我试试！', '提示', () => {
        uni.showModal({
          title: '提示',
          content: '你点击了Toast！',
          showCancel: false
        })
      })
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
  background-color: #c2c2c2;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
}
button:active {
  opacity: 0.8;
}
</style> 