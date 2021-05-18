<template>
  <div class="lyric-area">
    <ul class="lyric">
      <li v-for="lrc in lyricList" :key="lrc.key" :class="currentLrc() ? 'current-lrc' : ''">
        {{ lrc.value }}
      </li>
    </ul>
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

export default defineComponent({
  props: {
    position: {
      type: String,
      default: '00:00'
    }
  },
  setup(props) {
    const $store = useStore();
    const lyric = computed(() => $store.state.playing.lyric);
    const lyricList: any = ref([]);
    const position = computed(() => props.position)

    const formatLyric = () => {
      lyricList.value = []
      for (const key in lyric.value) {
        if (Object.prototype.hasOwnProperty.call(lyric.value, key)) {
          lyricList.value.push({
            time: key,
            value: lyric.value[key],
            key: key + Date.now(),
            current: false,
          });
        }
      }
    };

    watch(lyric.value, () => {
      formatLyric();
    });

    // 获取当前时间该显示的歌词
    const currentLyric = ref("");

    const currentLrc = () => {
      const filterRes = lyricList.value.filter(
        (lrc: any) => lrc.time === position.value
      );
      currentLyric.value =
        filterRes.length > 0 ? filterRes[0] : currentLyric.value;

      // lyricTop.value = `-${currentLrc && currentLrc.offsetTop - 30}px`;
      return currentLyric;
    };

    return {
      lyricList,
      currentLrc,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/theme/conf.scss";

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
</style>
