import Confirm from './confirm.vue'
import { createVNode, render } from 'vue'

interface ConfirmOptions {
  title?: string
  message: string
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
  cancelHandle?: Function
  confirmHandle?: Function
}

export default {
  install: (app: any): void => {
    app.config.globalProperties.$confirm = (opts: ConfirmOptions) => {
      const vm: any = createVNode(Confirm)
      const container = document.createElement('div')
      render(vm, container)
      document.body.appendChild(container)
   
      vm.component.props.title = opts.title || '提示'
      vm.component.props.message = opts.message || ''
      vm.component.props.showCancel = opts.showCancel || true
      vm.component.props.cancelText = opts.cancelText || '取消'
      vm.component.props.confirmText = opts.confirmText || '确定'
      vm.component.props.cancelHandle = () => {
        document.body.removeChild(container)
        if (opts.cancelHandle) opts.cancelHandle()
      }
      vm.component.props.confirmHandle = () => {
        document.body.removeChild(container)
        if (opts.confirmHandle) opts.confirmHandle()
      }
    }
  },
}
