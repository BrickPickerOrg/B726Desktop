<template>
  <div
    class="volume-controller"
    ref="volumeBox"
    @mousedown="rangeMousedown"
    @mousemove="rangeMousemove"
    @mouseleave="mouseleave"
    @mouseup="mouseup"
  >
    <div class="slide-left" :style="{ width: progress + '%' }"></div>
    <div class="slide-right" :style="{ width: 100 - progress + '%' }"></div>
    <div class="volume-range" :style="{ left: progress - 3 + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
  },

  setup(props, { emit }) {
    const volumeBox = ref<HTMLElement>();
    const mouseDown = ref(false);
    const progress = ref(100); //初始100%音量

    const progressChange = (e: any) => {
      const totalWidth = volumeBox.value?.offsetWidth as number;
      const originX = volumeBox.value?.offsetLeft as number;
      const leftDistance = 10;// 底部播放器到左侧的距离
      const moveX = e.pageX - originX - leftDistance;
      progress.value = (moveX / totalWidth) * 100
      if(progress.value > 100) progress.value = 100
      if(progress.value < 0) progress.value = 0
      emit('volumeChange', progress.value / 100)
    }

    const rangeMousedown = (e: any) => {
      if (e.srcElement.className === 'volume-range') {
        mouseDown.value = true;
        return
      }
      progressChange(e)
    };

    const rangeMousemove = (e: any) => {
      if (mouseDown.value) progressChange(e)
    };

    const mouseleave = () => {
      mouseDown.value = false;
    };

    const mouseup = () => {
      mouseDown.value = false;
    };

    return {
      volumeBox,
      progress,
      rangeMousedown,
      rangeMousemove,
      mouseleave,
      mouseup
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.volume-controller {
  width: 150px;
  height: 40px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .slide-left {
    width: 50px;
    height: 3px;
    background-color: $primary-color;
    border-radius: 5px 0 0 5px;
  }

  .slide-right {
    height: 3px;
    width: 100px;
    background-color: rgba($primary-color, 0.4);
    border-radius: 0 5px 5px 0;
  }

  .volume-range {
    display: none;
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 0;
    border-radius: 50%;
    background-color: $primary-color;
    box-shadow: 0 0 10px 2px rgba($primary-color, 0.6);
    transform: translateY(-50%);
  }

  &:hover {
    .volume-range {
      display: block;
    }
  }
}
</style>
