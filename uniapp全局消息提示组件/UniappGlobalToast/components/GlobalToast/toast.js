import { createApp, h, ref } from 'vue'
import GlobalToast from '@/components/GlobalToast/GlobalToast.vue'

let toastInstance = null

function initToast() {
  // H5环境通过DOM挂载
  if (process.env.VUE_APP_PLATFORM === 'h5') {
    const container = document.createElement('div')
    document.body.appendChild(container)
    
    const app = createApp({
      setup() {
        const toastRef = ref(null)
        
        return {
          toastRef
        }
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
          
          return {
            toastRef
          }
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

// 支持多种调用方式
export function showToast(options) {
  if (!toastInstance) initToast()
  if (toastInstance && typeof toastInstance.show === 'function') {
    toastInstance.show(options)
  } else {
    console.error('Toast component not properly initialized or show method not available')
  }
}

// 快捷方法
export const toast = {
  success(message, title = '成功', onClick) {
    showToast({
      type: 'success',
      message,
      title,
      icon: 'icon-success',
      onClick
    })
  },
  error(message, title = '错误', onClick) {
    showToast({
      type: 'error',
      message,
      title,
      icon: 'icon-error',
      onClick
    })
  },
  warning(message, title = '警告', onClick) {
    showToast({
      type: 'warning',
      message,
      title,
      icon: 'icon-warning',
      onClick
    })
  },
  info(message, title = '提示', onClick) {
    showToast({
      type: 'info',
      message,
      title,
      icon: 'icon-info',
      onClick
    })
  }
}

// 挂载到Vue原型
export default {
  install(app) {
    app.config.globalProperties.$toast = showToast
    app.config.globalProperties.$toastSuccess = toast.success
    app.config.globalProperties.$toastError = toast.error
    app.config.globalProperties.$toastWarning = toast.warning
    app.config.globalProperties.$toastInfo = toast.info
  }
}