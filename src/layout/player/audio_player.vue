<template>
  <audio
    :src="audioUrl"
    style="display: none"
    ref="audioPlayer"
    loop="false"
    autoplay="autoplay"
    @timeupdate="timeupdateHandle"
    @canplay="canplayHandle"
    @emptied="errorHandle"
    @error="errorHandle"
    @ended="endedHandle"
    @volumechange="volumeChangeHandle"
  ></audio>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';
import { AudioPlayerState } from './audio_player';
import Utils from '@/common/utils';

export default defineComponent({
  setup(props, { emit }: SetupContext) {
    const audioPlayer = ref<HTMLMediaElement>();
    const audioUrl = ref<String>('');

    // 重新加载音频文件
    const load = (url: String) => {
      if (audioUrl.value === url) return;
      audioUrl.value = url;
      (audioPlayer.value as HTMLMediaElement).load();
      emit('onPlayerStateChanged', AudioPlayerState.PLAYING);
    };

    // 播放音频
    const play = () => {
      (audioPlayer.value as HTMLMediaElement).play();
      emit('onPlayerStateChanged', AudioPlayerState.PLAYING);
    };

    // 暂停音频
    const pause = () => {
      (audioPlayer.value as HTMLMediaElement).pause();
      emit('onPlayerStateChanged', AudioPlayerState.PAUSED);
    };

    const canplayHandle = (event: Event) => {
      const audioPlayer = event.target as HTMLMediaElement;
      emit('onPlayerStateChanged', AudioPlayerState.CANPLAY);
    };

    // 设置播放进度 progress 值0到1
    const seek = (progress: number) => {
      const duration = (audioPlayer.value as HTMLMediaElement).duration;
      (audioPlayer.value as HTMLMediaElement).currentTime = duration * ( progress / 100);
    };

    const timeupdateHandle = (event: Event) => {
      const audioPlayer = event.target as HTMLMediaElement;
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      emit('onAudioPositionChanged', duration, currentTime, currentTime / duration);
    };

    // 当发生故障并且文件突然不可用时触发
    const errorHandle = () => {};

    // 播放结束
    const endedHandle = () => {};

    // 音量改变时触发
    const volumeChangeHandle = () => {};

    return {
      audioUrl,
      audioPlayer,
      load,
      play,
      pause,
      seek,
      canplayHandle,
      timeupdateHandle,
      errorHandle,
      endedHandle,
      volumeChangeHandle
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';
</style>
