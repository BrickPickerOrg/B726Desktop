<template>
  <audio
    :src="audioUrl"
    style="display: none"
    ref="audioPlayer"
    autoplay="autoplay"
    @timeupdate="timeupdateHandle"
    @canplay="canplayHandle"
    @ended="endedHandle"
    @emptied="errorHandle"
    @error="errorHandle"
    @volumechange="volumeChangeHandle"
  ></audio>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { AudioPlayerState, PlayMode } from "./audio_player";
import usePlayerFn from "@/plugins/player";
import useLocalListHandle from "@/plugins/localList";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, { emit }) {
    const audioPlayer = ref<HTMLMediaElement>();
    const audioUrl = ref<string>("");
    const $store = useStore();
    // 从store中获取当前正在播放的歌曲
    const playingSong = computed(() => $store.state.playing);
    // 实例化播放列表
    const $localList = useLocalListHandle();
    const { playCheckMusic } = usePlayerFn();

    // 重新加载音频文件
    const load = (url: string) => {
      if (audioUrl.value === url) return;
      audioUrl.value = url;
      (audioPlayer.value as HTMLMediaElement).load();
      emit("onPlayerStateChanged", AudioPlayerState.PLAYING);
    };

    // 播放音频
    const play = () => {
      (audioPlayer.value as HTMLMediaElement).play();
      emit("onPlayerStateChanged", AudioPlayerState.PLAYING);
    };

    // 暂停音频
    const pause = () => {
      (audioPlayer.value as HTMLMediaElement).pause();
      emit("onPlayerStateChanged", AudioPlayerState.PAUSED);
    };

    const canplayHandle = () => {
      emit("onPlayerStateChanged", AudioPlayerState.CANPLAY);
    };

    // 设置播放进度
    const seek = (progress: number) => {
      const duration = (audioPlayer.value as HTMLMediaElement).duration;
      (audioPlayer.value as HTMLMediaElement).currentTime =
        duration * (progress / 100);
    };

    // 设置播放器音量
    const setVolume = (volume: number) => {
      (audioPlayer.value as HTMLMediaElement).volume = volume;
    };

    // 音量改变时触发
    const volumeChangeHandle = () => {};

    // 播放中
    const timeupdateHandle = (event: Event) => {
      const audioPlayer = event.target as HTMLMediaElement;
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      emit(
        "onAudioPositionChanged",
        duration,
        currentTime,
        currentTime / duration
      );
    };

    // 当发生故障并且文件突然不可用时触发
    const errorHandle = () => {
      console.log("error");
    };

    // 播放结束
    const endedHandle = () => {
      // 默认列表循环
      const mode = localStorage.getItem("playMode") || PlayMode.LOOP.toString();
      console.log(mode)
      if (mode === PlayMode.RANDOM.toString()) {
        // 随机播放
      }
      if (mode === PlayMode.LOOP.toString()) {
        // 列表循环
        const nextMusic = $localList.nextMusic(playingSong.value.id);
        playCheckMusic(nextMusic);
        play();
      }
      if (mode === PlayMode.SINGLE_LOOP.toString()) {
        // 单曲循环
        play();
      }
    };

    return {
      audioUrl,
      audioPlayer,
      load,
      play,
      pause,
      seek,
      canplayHandle,
      setVolume,
      timeupdateHandle,
      errorHandle,
      endedHandle,
      volumeChangeHandle,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/theme/conf.scss";
</style>
