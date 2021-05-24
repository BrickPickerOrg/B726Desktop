<template>
  <div class="wrap" ref="wrapNode">
    <div class="box" :style="{ transform: 'translateX(' + distance + 'px)' }">
      <div class="marquee">{{ propsText }}</div>
      <div ref="copyNode" class="copy" v-show="showCopyNode">{{ propsText }}</div>
    </div>
    <!-- 用来计算宽度的 -->
    <div ref="computedNode" class="node">{{ propsText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const wrapNode = ref<HTMLElement>();
    const computedNode = ref<HTMLElement>();
    const propsText = computed(() => props.text);
    const distance = ref<number>(0);
    const showCopyNode = ref<boolean>(true);

    const doAnimate = () => {
      let wrapWidth: number = (wrapNode.value as HTMLElement).getBoundingClientRect().width;
      let textWidth: number = (computedNode.value as HTMLElement).getBoundingClientRect().width;
      if (textWidth < wrapWidth) {
        showCopyNode.value = false;
        return false;
      }

      setInterval(() => {
        distance.value = distance.value - 1;
        if (-distance.value >= textWidth) distance.value = 26;
      }, 60);
    };

    onMounted(() => {
      doAnimate();
    });

    return {
      showCopyNode,
      propsText,
      distance,
      wrapNode,
      computedNode
    };
  }
});
</script>

<style lang="scss" scoped>
.wrap {
  overflow: hidden;

  .box {
    width: 90000%;

    div {
      float: left;
    }

    .marquee {
      margin: 0 26px 0 0;
    }
  }

  .node {
    position: absolute;
    z-index: -999;
    top: -999999px;
  }
}
</style>
