<template>
  <div id="app" onselectstart="return false;">
    <div class="app-container">
      <div class="layout-center">
        <div class="layout-sidebar-wrapper">
          <LayoutSidebar></LayoutSidebar>
        </div>
        <div class="layout-main-wrapper">
          <LayoutHeader></LayoutHeader>
          <router-view />
        </div>
      </div>
      <div class="layout-bottom">
        <LayoutFooter></LayoutFooter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { provideRequest } from '@/plugins/request';
import LayoutHeader from '@/layout/header/header.vue';
import LayoutFooter from '@/layout/footer/footer.vue';
import LayoutSidebar from '@/layout/sidebar/sidebar.vue';

export default {
  setup() {
    // 注册全局request请求
    provideRequest();
  },
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutSidebar
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/styles.scss';

body {
  background: rgb(121, 121, 121);
}

.app-container {
  display: flex;
  flex-flow: column nowrap;
  width: 1000px;
  /* height: 600px; */
  background: $body-bg;
  margin: 0 auto;
  border-radius: 18px;
  overflow: hidden;

  .layout-center {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;

    .layout-sidebar-wrapper {
      width: 200px;
      background-color: $sidebar-bg;
      border-right: 1px solid $border-color;
    }

    .layout-main-wrapper {
      flex: 1;
    }
  }

  .layout-bottom {
    height: 70px;
    background: $player-bg;
  }
}
</style>
