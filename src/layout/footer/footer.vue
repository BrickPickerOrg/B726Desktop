<template>
  <div class="progress">
    <div class="loaded" :style="{ width: progress + '%' }"></div>
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
      <mg-loading v-show="playing.id" class="voiceprint" />
      <img :src="playing.cover" class="artist-cover" />
      <div class="artist-text-wrapper">
        <span class="artist-name">{{ playing.name }} - {{ getSingersName(playing.singer) }}</span>
        <span class="current-lyric">{{ getCurrentLyric() }}</span>
      </div>
      <div class="duration-wrapper">
        <span class="time">{{ position }}</span>
        <span>/</span>
        <span class="time">{{ duration }}</span>
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
        <button class="player-options-btn iconfont-heart-line"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, reactive, defineComponent, ref, onMounted, watch } from 'vue';
import { AudioPlayerState } from '@/layout/player/audio_player';
import AudioPlayer from '@/layout/player/audio_player.vue';
import Utils from '@/common/utils';
import usePlayerFn from '@/methods/player.ts';

export default defineComponent({
  components: {
    AudioPlayer
  },
  setup() {
    const { getSingersName } = usePlayerFn();
    const $store = useStore();
    const playing = computed(() => $store.state.playing);

    const duration = ref<string>('00:00');
    const position = ref<string>('00:00');
    const progress = ref<number>(0);

    watch(playing.value, (nowPlaying) => {
      load(nowPlaying.url);
    });

    // 获取当前时间该显示的歌词
    let currentLyric = '';
    const getCurrentLyric = () => {
      currentLyric = playing.value.lyric[position.value] || currentLyric;
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

    const onAudioPositionChanged = (_duration: number, _position: number, _progress: number) => {
      duration.value = Utils.formatSeconds(_duration || 0);
      position.value = Utils.formatSeconds(_position || 0);
      progress.value = _progress * 100;
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
      duration,
      position,
      progress,
      getCurrentLyric,
      changePlayState,
      load,
      play,
      pause,
      onAudioPositionChanged,
      onPlayerStateChanged,
      getSingersName
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

.voiceprint {
  transform: scale(0.7);
}

.player-container {
  height: 70px;

  .artist-info-wrapper {
    box-sizing: border-box;
    padding: 5px;
  height: 70px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    .artist-cover {
      width: 40px;
      height: 40px;
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
      margin-bottom: 6px;
      font-size: 12px;
      color: $font-color;
    }

    .current-lyric {
      display: block;
      font-size: 13px;
      color: #8b919f;
      word-break: keep-all;
      white-space: nowrap;
      width: 350px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .duration-wrapper {
      font-size: 13px;
      color: $font-second-color;
      transform: scale(0.8);

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
      color: rgba($font-second-color, 0.7) ;
      margin: 0 10px;
      cursor: pointer;
      outline: none;
      font-weight: 700;

      &.iconfont-pause,
      &.iconfont-play {
        font-size: 39px;
        color: $primary-color;
        margin: 0;
      }
    }
  }
}
</style>
