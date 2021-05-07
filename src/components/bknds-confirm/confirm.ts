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

      vm.component.props = Object.assign(vm.component.props, opts)
   
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
