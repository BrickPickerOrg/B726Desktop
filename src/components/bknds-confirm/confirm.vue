<template>
  <div class="layout-wrap">
    <div class="bknds-confirm-wrap">
      <div class="bknds-confirm-header">
        <h2>{{ propsObj.title }}</h2>
      </div>
      <div class="bknds-confirm-center">
        {{ propsObj.message }}
      </div>
      <div class="bknds-confirm-footer">
        <div
          class="bknds-cancel-btn"
          v-if="propsObj.showCancel"
          @click.stop="propsObj.cancelHandle"
        >
          {{ propsObj.cancelText }}
        </div>
        <div class="bknds-confrim-btn" @click.stop="propsObj.confirmHandle">
          {{ propsObj.confirmText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { props } from "./props";

export default {
  props,
  setup(props) {
    const propsObj = computed(() => props);
    return {
      propsObj
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./confirm";
</style>
