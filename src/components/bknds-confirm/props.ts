export const props = {
  title: {
    type: String,
    default: '提示',
  },
  message: {
    type: String,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  cancelHandle: {
    type: Function,
  },
  confirmHandle: {
    type: Function,
  },
}
