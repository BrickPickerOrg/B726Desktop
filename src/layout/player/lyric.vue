<template>
  <div class="lyric-area">
    <ul
      class="lyric"
      ref="lyricListNode"
      :style="{ top: lyricStyleTop + 'px' }"
    >
      <li
        v-for="lrc in formattingLyric"
        :key="lrc.key"
        :class="lrc.current ? 'current' : ''"
      >
        {{ lrc.value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, ref, watch } from "vue";

type Lrc = {
  time: string;
  value: string;
  key: string;
  current: boolean;
};

export default defineComponent({
  props: {
    position: {
      type: String,
      default: "00:00",
    },
  },

  setup(props) {
    const $store = useStore();

    const lyricListNode = ref<HTMLElement>();

    // store中的歌词数据
    const lyric = computed(() => $store.state.lyric);
    // 格式化的歌词数据
    const formattingLyric = ref<Array<Lrc>>([]);
    const position = computed(() => props.position);

    const lyricStyleTop = ref(0);

    // 格式化歌词数据
    const formatLyric = () => {
      formattingLyric.value = [];
      const lrc = lyric.value.lrc;
      lyricStyleTop.value = 0;
      for (const key in lrc) {
        if (Object.prototype.hasOwnProperty.call(lrc, key)) {
          formattingLyric.value.push({
            time: key,
            value: lrc[key],
            key: key + Date.now(),
            current: false,
          });
        }
      }
    };

    const resetLrcCurrentState = () => {
      formattingLyric.value.forEach((lrc: any) => {
        lrc.current = false;
      });
    };

    // 获取展示当前歌词要调整的高度
    const getLyricStyleTop = () => {
      const lyric = lyricListNode.value as HTMLElement;
      const nodes = lyric.getElementsByClassName("current");
      const baseTop = 320;
      if (nodes[0]) {
        const top = (nodes[0] as HTMLElement).getBoundingClientRect().top;
        lyricStyleTop.value = -(top - lyricStyleTop.value - baseTop);
      }
    };

    watch(lyric.value, () => {
      formatLyric();
    });

    watch(position, (val) => {
      const currentLrc: Array<Lrc> = formattingLyric.value.filter(
        (lrc: Lrc) => lrc.time === val
      );
      if (currentLrc.length > 0) {
        getLyricStyleTop();
        resetLrcCurrentState();
        currentLrc[0].current = true;
      }
    });

    return {
      lyricListNode,
      formattingLyric,
      lyricStyleTop,
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

  .lyric {
    position: relative;
    transition: all 0.5s;
  }

  li {
    margin: 10px 0;
    transition: all 0.5s;

    &.current {
      color: $font-color;
      font-size: 13px;
    }
  }
}
</style>
