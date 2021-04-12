<template>
  <div id="app" onselectstart="return false;">
    <div
      class="app-container"
      ref="container"
      @mousedown="rangeMousedown"
      @mousemove="rangeMousemove"
      @mouseleave="mouseleave"
      @mouseup="mouseup"
    >
      <div class="layout-center">
        <div class="layout-sidebar-wrapper">
          <LayoutSidebar></LayoutSidebar>
        </div>
        <div class="layout-main-wrapper">
          <LayoutHeader></LayoutHeader>
          <router-view></router-view>
        </div>
      </div>
      <div class="layout-bottom">
        <LayoutFooter
          ref="layoutFooter"
          :moveProgress="moveProgress"
        ></LayoutFooter>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { provideRequest } from "@/plugins/request";
import LayoutHeader from "@/layout/header/header.vue";
import LayoutFooter from "@/layout/footer/footer.vue";
import LayoutSidebar from "@/layout/sidebar/sidebar.vue";

export default {
  setup() {
    // 注册全局request请求
    provideRequest();

    const container = ref<HTMLElement>();
    const layoutFooter = ref();

    const mouseDown = ref(false);
    const originX = ref(0);
    const moveProgress = ref(0);

    const rangeMousedown = (e: any) => {
      if (e.srcElement.className === "range") {
        mouseDown.value = true;
        originX.value = container.value?.offsetLeft as number;
        layoutFooter.value.rangeMousedown();
      }
    };

    const rangeMousemove = (e: any) => {
      if (mouseDown.value) {
        const totalWidth = container.value?.offsetWidth as number;
        const leftDistance = 10;// 底部播放器到左侧的距离
        const moveX = e.pageX - originX.value - leftDistance;
        moveProgress.value = (moveX / totalWidth) * 100;
        layoutFooter.value.rangeMousemove();
      }
    };

    const mouseleave = () => {
      mouseDown.value = false;
      layoutFooter.value.rangeMouseleave();
    };

    const mouseup = () => {
      mouseDown.value = false;
      layoutFooter.value.rangeMouseup();
    };

    return {
      container,
      rangeMousedown,
      rangeMousemove,
      mouseleave,
      mouseup,
      moveProgress,
      layoutFooter,
    };
  },

  components: {
    LayoutHeader,
    LayoutFooter,
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
  position: relative;
  padding-bottom: 70px;
  display: flex;
  flex-flow: column nowrap;
  width: 1200px;
  /* background: $body-bg; */
  background-image: linear-gradient(45deg, $gradient-bg-s, $gradient-bg-c, $gradient-bg-e);
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;

  .layout-center {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;

    .layout-sidebar-wrapper {
      width: 200px;
    }

    .layout-main-wrapper {
      background-color: $card-color;
      flex: 1;
      margin:10px 10px 20px 10px;
      box-sizing: border-box;
      border-radius: 20px;
      padding:5px 10px 5px;
    }
  }

  .layout-bottom {
    height: 70px;
    background: $player-bg;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    border-radius: 20px;
  }
}
</style>
