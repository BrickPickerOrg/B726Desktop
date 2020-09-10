<!-- @format -->

<template>
  <div class="layout-header">
    <search></search>
  </div>
</template>

<script lang="ts">
import search from '@/components/search.vue';
export default {
  components: {
    search
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';
.layout-header {
  height: 40px;
  background-color: $sidebar-bg;
  border-bottom: 1px solid $border-color;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>
