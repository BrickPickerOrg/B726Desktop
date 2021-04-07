<template>
  <div class="layout-header">
    <History></History>
    <Search></Search>
  </div>
</template>

<script lang="ts">
import History from '@/layout/header/history.vue';
import Search from '@/layout/header/search.vue';
export default {
  components: {
    History,
    Search
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.layout-header {
  height: 60px;
  background-color: $body-bg;
  border-bottom: 1px solid $border-color;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  -webkit-app-region: drag;
}
</style>
