<template>
  <div class="local-music-list">
    <h2 class="title">播放列表</h2>
    <div class="song-list-wrap">
      <SongList :musicList="list" showDeleteButton></SongList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SongList from "@/views/song_list.vue";
import useLocalListHandle from "@/plugins/localList";

export default defineComponent({
  components: {
    SongList,
  },

  setup() {
    const $localList = useLocalListHandle();
    const list = ref($localList.getLocalList());
    return {
      list,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme/conf.scss";

.local-music-list {
  height: 528px;
  box-sizing: border-box;
  padding: 20px;
  overflow-x: hidden;
  
  .title {
    font-size: 22px;
    color: $font-color;
  }

  .song-list-wrap {
    padding: 20px 0;
  }
}
</style>
