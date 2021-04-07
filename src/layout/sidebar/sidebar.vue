<template>
  <div class="sidebar-container">
    <ul class="sidebar-wrap fadeIn">
      <li v-for="(item, index) in sidebarData" :key="index" class="menu-item">
        <router-link :to="`/${item.path}`" v-if="item.path" class="menu-link">
          <i :class="`icon iconfont-${item.icon}`"></i>
          <span class="text">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MENU from "./menu";

export default defineComponent({
  setup() {
    const sidebarData = MENU;
    return {
      sidebarData,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/theme/conf.scss";

.sidebar-container {
  padding: 20px 0 0 0;
  .menu-item {
    margin: 15px 0;
    font-size: 13px;

    .menu-link {
      position: relative;
      padding: 10px 15px;
      color: $sidebar-font-color;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;

      .icon {
        display: block;
        width: 30px;
        height: 20px;
        font-weight: 600;
        font-size: 18px;
        margin-right: 5px;
        text-align: center;
      }

      .text {
        font-weight: 500;
        font-size: 13px;
      }

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0;
        display: block;
        content: "";
        border-left: 4px solid transparent;
        transition: all 600ms;
      }

      &.router-link-active {
        color: $primary-color;
        &::after {
          width: 100%;
          border-left: 4px solid $primary-color;
          background-image: linear-gradient(
            to right,
            rgba($primary-color, 0.4),
            rgba($primary-color, 0.1),
            transparent,
            transparent
          );
        }
      }
    }

    &:hover {
      .menu-link {
        color: $primary-color;
      }
    }
  }
}
</style>
