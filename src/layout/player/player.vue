<template>
  <div class="player-container">
    <h2 class="player-title">Now Playing</h2>
    <AudioPlayer
      :autoplay="true"
      ref="audioPlayer"
      @onAudioPositionChanged="onAudioPositionChanged"
      @onPlayerStateChanged="onPlayerStateChanged"
    />
    <img :src="playing.cover" class="artist-cover" />
    <div class="artist-text-wrapper">
      <div class="song-name">{{ playing.name }}</div>
      <div class="singer-name">{{ getSingersName(playing.singer) }}</div>
    </div>
    <Lyric :position="position" />
    <div class="slider-wrapper">
      <bknds-slider @onChange="seek" :value="progress * 100" />
      <div class="duration-wrapper">
        <span class="time">{{ position }}</span>
        <span class="time">{{ duration }}</span>
      </div>
    </div>
    <div class="options-wrapper">
      <button
        class="player-options-btn"
        :class="getPlayModeIcon()"
        @click.stop="changePlayMode"
      ></button>
      <button
        class="player-options-btn iconfont-prev"
        @click.stop="prevMusicHandle"
      ></button>
      <button
        class="player-options-btn"
        :class="playing.playState ? 'iconfont-pause' : 'iconfont-play'"
        @click.stop="changePlayState(audioPlayer)"
      ></button>
      <button
        class="player-options-btn iconfont-next"
        @click.stop="nextMusicHandle"
      ></button>
      <!-- <button class="player-options-btn iconfont-heart-line"></button> -->
      <button class="player-options-btn iconfont-list" @click.stop="viewLocalList"></button>
    </div>
    <div class="volume-wrapper">
      <div class="iconfont-volume"></div>
      <bknds-slider :value="initVolume" @onChange="volumeChangeHandle" />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, ref, watch } from "vue";
import { AudioPlayerState, PlayMode } from "@/layout/audio-player/audioPlayer";
import { useRouter } from "vue-router";

import Utils from "@/common/utils";
import usePlayerFn from "@/plugins/player";
import useLocalListHandle from "@/plugins/localList";

import AudioPlayer from "@/layout/audio-player/audioPlayer.vue";
import Lyric from "./lyric.vue";

export default defineComponent({
  components: {
    AudioPlayer,
    Lyric,
  },

  setup() {
    const { getSingersName, playCheckMusic } = usePlayerFn();
    const { prevMusic, nextMusic } = useLocalListHandle();

    const $store = useStore();
    const $router = useRouter();

    // 正在播放的歌曲信息
    const playing = computed(() => $store.state.playing);

    // 播放器audio实例
    const audioPlayer: any = ref(null);

    const initVolume = ref(40)

    // 本地无记录 默认列表循环播放
    const modeString =
      localStorage.getItem("playMode") || PlayMode.LOOP.toString();
    const playMode = ref(modeString);

    // 歌曲总时长
    const duration = ref<string>("00:00");
    // 歌曲当前时间
    const position = ref<string>("00:00");
    // 进度条进度
    const progress = ref<number>(0);

    watch(playing.value, (nowPlaying) => {
      load(nowPlaying.url);
    });

    // 重新加载歌曲信息
    const load = (url: string) => {
      audioPlayer.value.load(url);
    };

    const play = () => {
      audioPlayer.value.play();
      $store.dispatch("playing/setPlayState", true);
    };

    const pause = () => {
      audioPlayer.value.pause();
      $store.dispatch("playing/setPlayState", false);
    };

    const changePlayState = () => {
      if (!playing.value.url) return;
      !playing.value.playState ? play() : pause();
    };

    // 调整歌曲进度
    const seek = (progress: number) => {
      audioPlayer.value.seek(progress);
    };

    // 播放进度改变事件
    const onAudioPositionChanged = (
      _duration: number,
      _position: number,
      _progress: number
    ) => {
      duration.value = Utils.formatSeconds(_duration || 0);
      position.value = Utils.formatSeconds(_position || 0);
      progress.value = _progress;
    };

    // 音频播放状态改变
    const onPlayerStateChanged = (state: AudioPlayerState) => {
      // 开始播放
      if (state == AudioPlayerState.PLAYING) {
        $store.dispatch("playing/setPlayState", true);
      }
      // 暂停播放
      if (state == AudioPlayerState.PAUSED) {
        $store.dispatch("playing/setPlayState", false);
      }
      // 播放完毕
      if (state == AudioPlayerState.COMPLETED) {
        console.log("播放完毕");
      }
      // 停止播放
      if (state == AudioPlayerState.STOPPED) {
        $store.dispatch("playing/setPlayState", false);
        console.log("停止播放");
      }
    };

    // 调节音频音量大小
    const volumeChangeHandle = (volume: number) => {
      audioPlayer.value.setVolume(volume);
    };

    // 跳转播放列表
    const viewLocalList = () => {
      $router.push(`/localList`);
    };

    // 改变循环模式
    const changePlayMode = () => {
      if (playMode.value === PlayMode.LOOP.toString()) {
        localStorage.setItem("playMode", PlayMode.SINGLE_LOOP.toString());
        playMode.value = PlayMode.SINGLE_LOOP.toString();
        return;
      }
      if (playMode.value === PlayMode.SINGLE_LOOP.toString()) {
        localStorage.setItem("playMode", PlayMode.LOOP.toString());
        playMode.value = PlayMode.LOOP.toString();
        return;
      }
    };

    // 获取循环播放模式对应ICON
    const getPlayModeIcon = () => {
      if (playMode.value === PlayMode.LOOP.toString())
        return "iconfont-circle-list";
      if (playMode.value === PlayMode.SINGLE_LOOP.toString())
        return "iconfont-circle-single";
    };

    // 播放上一首
    const prevMusicHandle = () => {
      const prev = prevMusic(playing.value.id);
      playCheckMusic(prev);
    };

    // 播放下一首
    const nextMusicHandle = () => {
      const next = nextMusic(playing.value.id);
      playCheckMusic(next);
    };

    return {
      initVolume,
      playing,
      audioPlayer,
      duration,
      position,
      progress,
      changePlayState,
      load,
      play,
      pause,
      seek,
      onAudioPositionChanged,
      onPlayerStateChanged,
      getSingersName,
      volumeChangeHandle,
      viewLocalList,
      getPlayModeIcon,
      changePlayMode,
      prevMusicHandle,
      nextMusicHandle,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/theme/conf.scss";

.player-container {
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .player-title {
    color: $font-color;
    padding: 30px 0 20px;
    font-size: 11px;
  }

  .artist-cover {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    margin: 10px;
  }

  .artist-text-wrapper {
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .song-name {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      color: $font-color;
      text-align: center;
    }

    .singer-name {
      display: block;
      margin-bottom: 6px;
      font-size: 12px;
      color: $font-second-color;
      text-align: center;
    }
  }

  .slider-wrapper {
    width: 100%;
    padding: 5px 15px;
    box-sizing: border-box;
  }

  .duration-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 10px;
    color: $font-color;

    span.time {
      display: inline-block;
      width: 35px;
      text-align: center;
      color: $font-second-color;
      font-weight: 400;
    }
  }

  .options-wrapper {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;
  }

  .player-options-btn {
    border: none;
    background: transparent;
    font-size: 23px;
    color: rgba($font-second-color, 0.7);
    margin: 0 10px;
    cursor: pointer;
    outline: none;
    font-weight: 500;

    &:hover {
      color: $font-color;
    }

    &.iconfont-pause,
    &.iconfont-play {
      font-size: 39px;
      color: $primary-color;
      margin: 0;

      &:hover {
        color: darken($primary-color, 5);
      }
    }

    &.iconfont-list {
      margin: 0 0 0 10px;
    }
  }

  .lyric-area {
    flex: 1;
    overflow: hidden;
    font-size: 11px;
    text-align: center;
    color: $font-second-color;
    line-height: 1.5em;

    li {
      margin: 10px 0;
    }
  }

  .volume-wrapper {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 15px 20px 5px;
    box-sizing: border-box;

    .iconfont-volume {
      color: $font-second-color;
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
</style>
