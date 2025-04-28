<template>
  <view class="toast-wrapper" :class="{ 'toast-wrapper-show': visible }">
    <view :class="['toast', `toast-${type}`]" @click="handleClick">
      <view class="toast-icon" v-if="icon">
        <text :class="icon"></text>
      </view>
      <view class="toast-content">
        <text class="toast-title" v-if="title">{{ title }}</text>
        <text class="toast-message">{{ message }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'GlobalToast',
  data() {
    return {
      visible: false,
      message: '',
      title: '',
      type: 'info',
      icon: '',
      timer: null,
      onClick: null
    }
  },
  methods: {
    show(options) {
      // 支持字符串直接传入消息
      if (typeof options === 'string') {
        options = { message: options }
      }
      
      // 合并默认配置
      const config = {
        message: '',
        title: '',
        type: 'info',
        duration: 2000,
        icon: '',
        onClick: null,
        ...options
      }
      
      // 清除之前的定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      
      // 设置新的状态
      this.message = config.message
      this.title = config.title
      this.type = config.type
      this.icon = config.icon
      this.onClick = config.onClick
      
      // 显示动画
      this.visible = true
      
      // 设置自动关闭
      this.timer = setTimeout(() => {
        this.visible = false
      }, config.duration)
    },
    handleClick() {
      if (typeof this.onClick === 'function') {
        this.onClick()
      }
    }
  }
}
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  transform: translateY(-150%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-wrapper-show {
  transform: translateY(0);
}

.toast {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 24rpx 40rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  width: 20%;
  margin-top: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-wrapper-show .toast {
  width: 80%;
}

.toast-icon {
  font-size: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.toast-title {
  font-size: 28rpx;
  font-weight: 500;
}

.toast-message {
  font-size: 26rpx;
  opacity: 0.9;
}

/* 类型样式 */
.toast-success {
  background: rgba(52, 199, 89, 0.9);
}

.toast-error {
  background: rgba(255, 59, 48, 0.9);
}

.toast-warning {
  background: rgba(255, 149, 0, 0.9);
}

.toast-info {
  background: rgba(0, 122, 255, 0.9);
}

/* 图标样式 */
.icon-success::before {
  content: "✓";
}

.icon-error::before {
  content: "✕";
}

.icon-warning::before {
  content: "⚠";
}

.icon-info::before {
  content: "ℹ";
}
</style>