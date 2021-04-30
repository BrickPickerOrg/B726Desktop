<template>
  <div class="history-wrapper">
    <div class="history-btn iconfont-back" @click="change(-1)"></div>
    <div class="history-btn iconfont-go" @click="change(1)"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const $router = useRouter();
    const state = computed(() => window.history.state);
    const change = (step: number) => {
      $router.go(step);
    };

    return {
      state,
      change
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.history-wrapper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  .history-btn {
    width: 40px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 18px;
    color: rgba($font-color, 0.3);

    &:hover {
      color: rgba($font-color, 0.6);
    }
  }
}
</style>
