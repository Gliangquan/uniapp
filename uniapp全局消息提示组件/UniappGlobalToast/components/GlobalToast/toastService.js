import { showToast } from '@/components/GlobalToast/toast.js'

// 创建一个全局函数，可以在任何地方调用
export function showGlobalToast(message, duration) {
  showToast(message, duration)
}

// 为了兼容性，也导出一个默认对象
export default {
  show: showGlobalToast
} 