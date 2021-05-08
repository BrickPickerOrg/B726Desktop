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
import {
  defineComponent
} from "vue";
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
  padding: 50px 0 0 0;

  .menu-item {
    font-size: 12px;

    .menu-link {
      position: relative;
      padding: 6px 15px;
      margin: 0 0 13px 0;
      color: $font-second-color;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      background-color: rgba($card-color, 0);

      .icon {
        position: relative;
        top: 1px;
        display: block;
        width: 30px;
        height: 20px;
        font-weight: 600;
        font-size: 18px;
        margin-right: 5px;
        text-align: center;
        color: $primary-color;
      }

      .text {
        font-weight: 500;
        font-size: 13px;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 0;
        display: block;
        background-image: linear-gradient(90deg, transparent, rgba($font-color, 0.2));
        box-sizing: border-box;
        border-right: 0px solid $primary-color;
        transition: all 300ms;
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
        transition: all 700ms;
      }

      &.router-link-active {
        color: $font-color;

        &::before {
          width: 150px;
          border-right: 2px solid $primary-color;
        }
      }
    }

    &:hover {
      .menu-link {
        background-color: $card-color;
        transition: all 700ms;
      }
    }
  }
}
</style>
