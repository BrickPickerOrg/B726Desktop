<template>
  <div id="app" onselectstart="return false;">
    <div class="app-container">
      <div class="layout-sidebar-wrapper">
        <LayoutSidebar></LayoutSidebar>
      </div>
      <div class="layout-center-wrapper">
        <LayoutHeader></LayoutHeader>
        <router-view></router-view>
      </div>
      <div class="layout-player-wrapper">
        <LayoutPlayer></LayoutPlayer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { provideRequest } from "@/plugins/request";
import { useStore } from "vuex";
import LayoutHeader from "@/layout/header/header.vue";
import LayoutPlayer from "@/layout/player/player.vue";
import LayoutSidebar from "@/layout/sidebar/sidebar.vue";

export default {
  setup() {
    // 注册全局request请求
    provideRequest();

    const $store = useStore();
    // 注册download事件监听
    $store.dispatch("downloader/init");

    const container = ref<HTMLElement>();
    const layoutFooter = ref();

    return {
      container,
      layoutFooter,
    };
  },

  components: {
    LayoutHeader,
    LayoutPlayer,
    LayoutSidebar,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/styles.scss";

body {
  background: transparent;
  overflow: hidden;
}

.app-container {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  width: 1040px;
  background-color: $background-color;
  /* border: 2px solid $primary-color; */
  border-radius: 10px 10px 7px 7px;
  box-sizing: border-box;
  overflow: hidden;

  .layout-sidebar-wrapper {
    width: 150px;
    border-right: 1px solid $border-color;
  }

  .layout-center-wrapper {
    flex: 1;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 5px 10px 5px;
  }

  .layout-player-wrapper {
    border-left: 1px solid $border-color;
    width: 220px;
  }
}
</style>
