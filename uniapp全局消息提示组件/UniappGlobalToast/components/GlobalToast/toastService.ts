import { createApp, h, ref } from 'vue'
import GlobalToast from '@/components/GlobalToast/GlobalToast.vue'

interface ToastOptions {
  message: string
  title?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  icon?: string
  onClick?: () => void
}

interface ToastInstance {
  show: (options: ToastOptions | string) => void
}

let toastInstance: ToastInstance | null = null

function initToast(): void {
  // H5环境通过DOM挂载
  if (process.env.VUE_APP_PLATFORM === 'h5') {
    const container = document.createElement('div')
    document.body.appendChild(container)
    
    const app = createApp({
      setup() {
        const toastRef = ref(null)
        return { toastRef }
      },
      render() {
        return h(GlobalToast, {
          ref: 'toastRef'
        })
      }
    })
    
    const instance = app.mount(container)
    toastInstance = instance.$refs.toastRef
  } 
  // 小程序环境动态插入节点
  else {
    const query = uni.createSelectorQuery()
    query.select('body').node(res => {
      const node = res[0].node
      const container = document.createElement('div')
      node.appendChild(container)
      
      const app = createApp({
        setup() {
          const toastRef = ref(null)
          return { toastRef }
        },
        render() {
          return h(GlobalToast, {
            ref: 'toastRef'
          })
        }
      })
      
      const instance = app.mount(container)
      toastInstance = instance.$refs.toastRef
    }).exec()
  }
}

export function showToast(options: ToastOptions | string): void {
  if (!toastInstance) initToast()
  if (toastInstance && typeof toastInstance.show === 'function') {
    toastInstance.show(options)
  } else {
    console.error('Toast component not properly initialized or show method not available')
  }
}

export const toast = {
  success(message: string, title: string = '成功', onClick?: () => void): void {
    showToast({
      type: 'success',
      message,
      title,
      icon: 'icon-success',
      onClick
    })
  },
  error(message: string, title: string = '错误', onClick?: () => void): void {
    showToast({
      type: 'error',
      message,
      title,
      icon: 'icon-error',
      onClick
    })
  },
  warning(message: string, title: string = '警告', onClick?: () => void): void {
    showToast({
      type: 'warning',
      message,
      title,
      icon: 'icon-warning',
      onClick
    })
  },
  info(message: string, title: string = '提示', onClick?: () => void): void {
    showToast({
      type: 'info',
      message,
      title,
      icon: 'icon-info',
      onClick
    })
  }
}

export default {
  install(app: any): void {
    app.config.globalProperties.$toast = showToast
    app.config.globalProperties.$toastSuccess = toast.success
    app.config.globalProperties.$toastError = toast.error
    app.config.globalProperties.$toastWarning = toast.warning
    app.config.globalProperties.$toastInfo = toast.info
  }
} 