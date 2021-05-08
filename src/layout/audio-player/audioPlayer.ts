export enum AudioPlayerState {
  STOPPED, //停止播放
  PLAYING, //开始播放
  PAUSED, //暂停播放
  POSITION_CHANGED, //正在播放
  COMPLETED, //播放完毕
  CANPLAY //播放完毕
}

export enum PlayMode {
  RANDOM, //随机播放
  LOOP, //列表循环
  SINGLE_LOOP, //单曲循环
}