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
  background-color: $card-color;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  -webkit-app-region: drag;
}
</style>
