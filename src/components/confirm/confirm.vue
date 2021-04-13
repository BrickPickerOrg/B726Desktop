<template>
  <div class="layout-wrap">
    <div class="confirm-wrap">
      <div class="confirm-header">
        <h2>{{ oTitle }}</h2>
      </div>
      <div class="confirm-center">
        {{ oMessage }}
      </div>
      <div class="confirm-footer">
        <div class="cancel-btn" v-if="oShowCancel" @click.stop="oCancelHandle">{{ oCancelText }}</div>
        <div class="confrim-btn" @click.stop="oConfirmHandle">{{ oConfirmText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ['title', 'message', 'showCancel', 'cancelText', 'confirmText', 'cancelHandle', 'confirmHandle'],
  setup(props) {
    const oTitle = computed(() => props.title);
    const oMessage = computed(() => props.message);
    const oShowCancel = computed(() => props.showCancel);
    const oCancelText = computed(() => props.cancelText);
    const oConfirmText = computed(() => props.confirmText);
    const oCancelHandle = computed(() => props.cancelHandle);
    const oConfirmHandle = computed(() => props.confirmHandle);

    return {
      oTitle,
      oMessage,
      oShowCancel,
      oCancelText,
      oConfirmText,
      oCancelHandle,
      oConfirmHandle
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme/conf.scss";

.layout-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($font-second-color, .2);
  z-index: 99;
}

.confirm-wrap {
  background-color: $body-bg;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 10px;
  width: 300px;

  .confirm-header {
    color: $font-color;
    font-size: 20px;
    padding: 10px;
  }

  .confirm-center {
    padding: 20px 10px;
    font-size: 15px;
    color: $font-second-color;
  }

  .confirm-footer {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    .cancel-btn,
    .confrim-btn {
      flex: 1;
      margin: 5px 10px;
      text-align: center;
      background-color: rgba($font-second-color, .15);
      padding: 10px 0;
      border-radius: 5px;
      color: $font-second-color;
      font-size: 13px;
      cursor: pointer;

      &:hover {
        background-color: darken(rgba($font-second-color, .15), 20);
      }
    }

    .confrim-btn {
      background-color: $primary-color;
      color: $body-bg;

      &:hover {
        background-color: darken($primary-color, 5);
      }
    }
  }
}
</style>
