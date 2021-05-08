<template>
  <div class="player-container">
    <h2 class="player-title">Now Playing</h2>
    <AudioPlayer :autoplay="true" ref="audioPlayer" @onAudioPositionChanged="onAudioPositionChanged" @onPlayerStateChanged="onPlayerStateChanged"></AudioPlayer>
    <img :src="playing.cover" class="artist-cover" />
    <div class="artist-text-wrapper">
      <div class="song-name">{{ playing.name }}</div>
      <div class="singer-name">{{ getSingersName(playing.singer) }}</div>
    </div>
    <div class="lyric-area">
      <ul class="lyric">
        <li v-for="signleLrc in lrc" :key="signleLrc.key" :class="currentLrc() ? 'current-lrc' : ''">
          {{ signleLrc.value }}
        </li>
      </ul>
    </div>
    <div class="slider-wrapper">
      <bknds-slider @onChange="seek" />
      <div class="duration-wrapper">
        <span class="time">{{ position }}</span>
        <span class="time">{{ duration }}</span>
      </div>
    </div>
    <div class="options-wrapper">
      <button class="player-options-btn" :class="getPlayModeIcon()" @click.stop="changePlayMode"></button>
      <button class="player-options-btn iconfont-prev" @click.stop="prevMusicHandle"></button>
      <button class="player-options-btn" :class="playing.playState ? 'iconfont-pause' : 'iconfont-play'" @click.stop="changePlayState(audioPlayer)"></button>
      <button class="player-options-btn iconfont-next" @click.stop="nextMusicHandle"></button>
      <button class="player-options-btn iconfont-heart-line"></button>
      <!-- <button class="player-options-btn iconfont-list" @click.stop="viewLocalList"></button> -->
    </div>
    <div class="volume-wrapper">
      <div class="iconfont-volume"></div>
      <bknds-slider :value="40" @onChange="volumeChangeHandle" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  useStore
} from "vuex";
import {
  computed,
  defineComponent,
  ref,
  watch
} from "vue";
import {
  AudioPlayerState,
  PlayMode
} from "@/layout/audio-player/audioPlayer";
import {
  useRouter
} from "vue-router";

import Utils from "@/common/utils";
import usePlayerFn from "@/plugins/player";
import useLocalListHandle from "@/plugins/localList";

import AudioPlayer from "@/layout/audio-player/audioPlayer.vue";

export default defineComponent({
  components: {
    AudioPlayer,
  },

  setup() {
    const {
      getSingersName,
      playCheckMusic
    } = usePlayerFn();
    const {
      prevMusic,
      nextMusic
    } = useLocalListHandle();

    const $store = useStore();
    const $router = useRouter();
    const playing = computed(() => $store.state.playing);
    // 播放器audio实例
    const audioPlayer: any = ref(null);

    // 默认列表循环播放
    const playMode = ref(
      localStorage.getItem("playMode") || PlayMode.LOOP.toString()
    );

    const duration = ref < string > ("00:00");
    const position = ref < string > ("00:00");
    const progress = ref(0);

    const mouseDown = ref(false);

    const lrc: any = ref([]);

    const formatLyric = (playing:any) => {
      lrc.value = []
      for (const key in playing.lyric) {
        if (Object.prototype.hasOwnProperty.call(playing.lyric, key)) {
          lrc.value.push({
            time: key,
            value: playing.lyric[key],
            key: key + Date.now(),
            current: false,
          });
        }
      }
    };

    watch(playing.value, (nowPlaying) => {
      load(nowPlaying.url);
      formatLyric(nowPlaying);
    });

    // 获取当前时间该显示的歌词
    const currentLyric = ref("");

    const currentLrc = () => {
      const filterRes = lrc.value.filter(
        (lrc: any) => lrc.time === position.value
      );
      currentLyric.value =
        filterRes.length > 0 ? filterRes[0] : currentLyric.value;

      // lyricTop.value = `-${currentLrc && currentLrc.offsetTop - 30}px`;
      return currentLyric;
    };

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

    const seek = (progress: number) => {
      audioPlayer.value.seek(progress);
    };

    const changePlayState = () => {
      if (!playing.value.url) return;
      !playing.value.playState ? play() : pause();
    };

    const onAudioPositionChanged = (
      _duration: number,
      _position: number,
      _progress: number
    ) => {
      if (!mouseDown.value) {
        duration.value = Utils.formatSeconds(_duration || 0);
        position.value = Utils.formatSeconds(_position || 0);
        progress.value = _progress * 100;
      }
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

    // 改变播放模式
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

    const getPlayModeIcon = () => {
      if (playMode.value === PlayMode.LOOP.toString())
        return "iconfont-circle-list";
      if (playMode.value === PlayMode.SINGLE_LOOP.toString())
        return "iconfont-circle-single";
    };

    // 上一首
    const prevMusicHandle = () => {
      const prev = prevMusic(playing.value.id);
      playCheckMusic(prev);
    };

    // 下一首
    const nextMusicHandle = () => {
      const next = nextMusic(playing.value.id);
      playCheckMusic(next);
    };

    return {
      playing,
      audioPlayer,
      duration,
      position,
      progress,
      currentLrc,
      lrc,
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
