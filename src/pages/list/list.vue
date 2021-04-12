<template>
  <div class="local-music-list">
    <div class="top">
      <h2 class="title">播放列表</h2>
      <div class="clear-btn">
        <div class="iconfont-delete"></div>
        <span>清空</span>
      </div>
    </div>
    <div class="song-list-wrap">
      <SongList
        :musicList="list"
        showDeleteButton
        @removeMusicFromIdSuccess="removeMusicFromIdSuccess"
      ></SongList>
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

    const removeMusicFromIdSuccess = () => {
      list.value = $localList.getLocalList();
    };

    return {
      list,
      removeMusicFromIdSuccess,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme/conf.scss";

.local-music-list {
  height: 488px;
  box-sizing: border-box;
  padding: 20px;
  overflow-x: hidden;

  .top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .title {
      font-size: 22px;
      color: $font-color;
    }

    .clear-btn {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      color: $font-color;

      .iconfont-delete {
        font-size: 16px;
        margin-right: 3px;
      }

      &:hover {
        color: $primary-color;
      }
    }
  }

  .song-list-wrap {
    padding: 20px 0;
  }
}
</style>
