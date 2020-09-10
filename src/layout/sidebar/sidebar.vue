<!-- @format -->

<template>
  <div class="layout-sidebar-wrapper">
    <ul class="sidebar-list">
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {};
</script>
<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.layout-sidebar-wrapper {
  border-right: 1px solid $border-color;
  background-color: $sidebar-bg;
}

.sidebar-list {
  list-style: none;
}
</style>
