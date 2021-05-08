<template>
  <div
    class="slider-box"
    ref="sliderBox"
    @mousedown="rangeMousedown"
    @mousemove="rangeMousemove"
    @mouseleave="mouseMoveStop"
    @mouseup="mouseMoveStop"
  >
    <div class="slide-left" :style="{ width: progress + '%' }"></div>
    <div class="slide-right" :style="{ width: 100 - progress + '%' }"></div>
    <div class="slide-range" :style="{ left: progress - 3 + '%' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { props } from './props';

export default defineComponent({
  props,
  setup(props, { emit }) {
    const sliderBox = ref<HTMLElement>();
    const mouseDown = ref(false);
    const progress = ref(props.modelValue);

    const progressChange = (e: any) => {
      const totalWidth = sliderBox.value?.offsetWidth as number;
      const originX = sliderBox.value?.offsetLeft as number;
      const moveX = e.pageX - originX;
      progress.value = (moveX / totalWidth) * 100
      if(progress.value > 100) progress.value = 100
      if(progress.value < 0) progress.value = 0
      emit('onChange', progress.value / 100)
    }

    const rangeMousedown = (e: any) => {
      if (e.srcElement.className === 'slide-range') {
        mouseDown.value = true;
        return
      }
      progressChange(e)
    };

    const rangeMousemove = (e: any) => {
      if (mouseDown.value) progressChange(e)
    };

    const mouseMoveStop = () => {
      mouseDown.value = false;
    };

    return {
      sliderBox,
      progress,
      rangeMousedown,
      rangeMousemove,
      mouseMoveStop,
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.slider-box {
  width: 100%;
  height: 20px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .slide-left {
    width: 50px;
    height: 2px;
    background-color: $primary-color;
  }

  .slide-right {
    height: 2px;
    width: 100px;
    background-color: rgba($primary-color, 0.4);
  }

  .slide-range {
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
    .slide-range {
      display: block;
    }
  }
}
</style>
