export const props = {
  // progress 线宽
  lineWidth: {
    type: String,
    default: '3',
  },
  // progress 颜色
  color: {
    type: String,
  },
  // progress 轨道颜色
  trackColor: {
    type: String,
    default: '#d8d8d8',
  },
  // progress 值
  value: {
    type: Number,
    default: 0,
  },
  // 是否显示label
  label: {
    type: Boolean,
    default: false,
  },
  // circle 的尺寸
  size: {
    type: String,
    default: '40',
  },
  // circle的原点
  rotate: {
    type: Number,
    default: 0,
  },
  // 是否显示 circle 轨道
  track: {
    type: Boolean,
    default: true,
  },
}
