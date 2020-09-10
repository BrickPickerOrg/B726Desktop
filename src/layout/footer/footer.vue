<!-- @format -->

<template>
  <div class="progress">
    <div class="loaded" :style="{ width: _progress + '%' }"></div>
  </div>
  <div class="player-container">
    <div class="audio-player-wrapper">
      <AudioPlayer
        :autoplay="true"
        ref="audioPlayer"
        @onAudioPositionChanged="onAudioPositionChanged"
        @onPlayerStateChanged="onPlayerStateChanged"
      ></AudioPlayer>
    </div>
    <div class="artist-info-wrapper">
      <img :src="playing.picUrl" class="artist-cover" />
      <div class="artist-text-wrapper">
        <span class="artist-name">{{ playing.name }} {{ playing.singer }}</span>
        <span class="current-lyric">{{ getCurrentLyric() }}</span>
      </div>
      <div class="duration-wrapper">
        <span class="time">{{ _position }}</span>
        <span>·</span>
        <span class="time">{{ _duration }}</span>
      </div>
      <div class="options-wrapper">
        <button class="player-options-btn iconfont-circle-single"></button>
        <button class="player-options-btn iconfont-prev"></button>
        <button
          class="player-options-btn"
          :class="playing.playState ? 'iconfont-pause' : 'iconfont-play'"
          @click="changePlayState(audioPlayer)"
        ></button>
        <button class="player-options-btn iconfont-next"></button>
        <button class="player-options-btn iconfont-heart"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, reactive, defineComponent, ref, onMounted, watch } from 'vue';
import { AudioPlayerState } from '@/components/player/audio_player';
import AudioPlayer from '@/components/player/audio_player.vue';
import Utils from '@/common/utils';

export default defineComponent({
  components: {
    AudioPlayer
  },
  setup() {
    const $store = useStore();
    const playing = computed(() => $store.state.playing);

    const _duration = ref<string>('00:00');
    const _position = ref<string>('00:00');
    const _progress = ref<number>(0);

    watch(playing.value, nowPlaying => {
      load(nowPlaying.url);
    });

    // 获取当前时间该显示的歌词
    let currentLyric = '';
    const getCurrentLyric = () => {
      currentLyric = playing.value.lyric[_position.value] || currentLyric;
      return currentLyric;
    };

    const audioPlayer: any = ref(null);

    const load = (url: string) => {
      audioPlayer.value.load(url);
    };

    const play = () => {
      audioPlayer.value.play();
      $store.dispatch('playing/setPlayState', true);
    };

    const pause = () => {
      audioPlayer.value.pause();
      $store.dispatch('playing/setPlayState', false);
    };

    const changePlayState = () => {
      if (!playing.value.url) return;
      !playing.value.playState ? play() : pause();
    };

    const onAudioPositionChanged = (duration: number, position: number, progress: number) => {
      _duration.value = Utils.formatSeconds(duration || 0);
      _position.value = Utils.formatSeconds(position || 0);
      _progress.value = progress * 100;
    };

    // 音频播放状态改变
    const onPlayerStateChanged = (state: AudioPlayerState) => {
      // 开始播放
      if (state == AudioPlayerState.PLAYING) {
        $store.dispatch('playing/setPlayState', true);
      }
      // 暂停播放
      if (state == AudioPlayerState.PAUSED) {
        $store.dispatch('playing/setPlayState', false);
      }
      // 播放完毕
      if (state == AudioPlayerState.COMPLETED) {
        console.log('播放完毕');
      }
      // 停止播放
      if (state == AudioPlayerState.STOPPED) {
        $store.dispatch('playing/setPlayState', false);
        console.log('停止播放');
      }
    };

    return {
      playing,
      audioPlayer,
      _duration,
      _position,
      _progress,
      getCurrentLyric,
      changePlayState,
      load,
      play,
      pause,
      onAudioPositionChanged,
      onPlayerStateChanged
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.progress {
  display: flex;
  flex-flow: row nowrap;
  height: 2px;
  background-color: rgba($border-color, 0.5);

  .loaded {
    height: 2px;
    background-color: $primary-color;
  }
}

.player-container {
  height: 50px;

  .artist-info-wrapper {
    box-sizing: border-box;
    padding: 5px;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    .artist-cover {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      margin: 10px 0 10px 10px;
    }

    .artist-text-wrapper {
      box-sizing: border-box;
      padding: 5px;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: flex-start;
    }

    .artist-name {
      display: block;
      margin-bottom: 2px;
      font-size: 13px;
      color: $font-color;
    }

    .current-lyric {
      display: block;
      font-size: 12px;
      color: $font-second-color;
    }

    .duration-wrapper {
      font-size: 12px;
      color: $font-color;
      transform: scale(0.8);

      span.time {
        display: inline-block;
        width: 35px;
        text-align: center;
        color: $font-second-color;
        font-weight: 600;
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
      font-size: 18px;
      color: $font-second-color;
      margin: 0 10px;
      cursor: pointer;
      outline: none;

      &.iconfont-pause,
      &.iconfont-play {
        font-size: 34px;
        color: $primary-color;
        margin: 0;
      }
    }
  }
}
</style>
