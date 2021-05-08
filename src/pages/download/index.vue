<template>
  <div class="download-page-container">
    <div class="open-path-dialog-button" @click.stop="openPathDialog">
      选择文件夹
    </div>
    <div class="open-path-dialog-button" @click.stop="openDownloadDirectory">
      打开下载目录
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $store = useStore();
    const openPathDialog = () => {
      $store.dispatch("downloader/openPathDialog", {});
    };
    
    const openDownloadDirectory = () => {
      $store.dispatch("downloader/openDownloadDirectory", {});
    };
    return {
      openPathDialog,
      openDownloadDirectory,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/theme/conf.scss";

.download-page-container {
  height: 570px;
  overflow-x: hidden;
}
</style>
