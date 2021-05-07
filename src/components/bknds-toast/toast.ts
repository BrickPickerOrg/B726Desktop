import MyToast from './toast.vue'
import { createVNode, render } from 'vue'

interface IOptions {
  message: string
  duration?: number
  onClose?: Function
}

export default {
  install: (app: any): void => {
    //是否存在toast，防止toast在未销毁前，连续单击按钮生成多个toast
    let isToast = false
    //注册全局方法，相当于vue2的Vue.prototype.$myToast
    app.config.globalProperties.$toast = function(opts: IOptions) {
      //如果toast不存在,开始创建toast
      if (!isToast) {
        //将isToast设置为true，在toast未销毁时不执行下面的程序
        isToast = true
        //创建虚拟节点
        let vm: any = createVNode(MyToast)
        //创建div容器
        let container = document.createElement('div')
        //渲染虚拟节点
        render(vm, container)
        //将新创建的div元素添加到<body>元素内部
        document.body.appendChild(container)
        //如果存在opts.message属性，赋值为opts.message的值，否则赋值为空,并传递给MyToast组件内部data方法返回的message属性
        //如果toast.vue使用vue2模式定义数据使用vm.component.data.message传值
        // vm.component.data.message=opts.message || "";
        //如果toast.vue使用vue3模式定义hook的setup使用以下方式传值
        vm.component.props.message = opts.message || ''
        let duration = opts.duration || 2000
        setTimeout(() => {
          //销毁toast
          document.body.removeChild(container)
          //toast销毁后将isToast设置为false
          isToast = false
          //如果onClose方法存在
          if (opts.onClose) {
            //调用onClose方法
            opts.onClose()
          }
        }, duration)
      }
    }
  },
}
