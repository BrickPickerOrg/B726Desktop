<template>
  <div class="bknds-progress">
    <div
      class="bknds-progress-circle"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <svg
        class="bknds-progress-circle__svg"
        :style="{ transform: `rotate(${rotate - 90}deg)` }"
        :viewBox="circleProps.viewBox"
      >
        <circle
          v-if="track"
          class="bknds-progress-circle__background"
          :cx="size / 2"
          :cy="size / 2"
          :r="circleProps.radius"
          fill="transparent"
          :stroke-width="lineWidth"
          :style="{
            strokeDasharray: circleProps.perimeter,
            stroke: trackColor,
          }"
        ></circle>
        <circle
          class="bknds-progress-circle__certain"
          :cx="size / 2"
          :cy="size / 2"
          :r="circleProps.radius"
          fill="transparent"
          :stroke-width="lineWidth"
          :style="{
            strokeDasharray: circleProps.strokeDasharray,
            stroke: color,
          }"
        ></circle>
      </svg>
      <div class="bknds-progress-circle__label" v-if="label" v-bind="$attrs">
        <slot>
          {{ circleProps.roundValue }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { props } from "./props";

export default defineComponent({
  props,
  setup(props) {
    const circleProps = computed(() => {
      const { size, lineWidth, value } = props;
      const viewBox = `0 0 ${size} ${size}`;
      const roundValue = value > 100 ? 100 : Math.round(value);
      const radius = (parseFloat(size) - parseFloat(lineWidth)) / 2;
      const perimeter = 2 * Math.PI * radius;
      const strokeDasharray = `${(roundValue / 100) * perimeter}, ${perimeter}`;

      return {
        viewBox,
        radius,
        strokeDasharray,
        perimeter,
        roundValue: `${roundValue}%`,
      };
    });
    return {
      circleProps,
    };
  },
});
</script>

<style lang="scss">
@import "./progress";
</style>
