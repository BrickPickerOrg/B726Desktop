<template>
  <div class="top-container">
    <div class="top-sidebar-wrap">
      <div class="top-item" v-for="top in topTypes" :key="top.topName">
        <div class="top-title">{{ top.topName }}</div>
        <div
          class="types-item"
          v-for="type in top.types"
          :class="checkedTopType.typeCode === type.typeCode ? 'active' : 'normal'"
          :key="type.typeCode"
          @click.stop="checkTopType(type)"
        >
          {{ type.typeName }}
        </div>
      </div>
    </div>
    <div class="top-content" v-occupy="occupy">
      <div class="top-content-header">
        <div class="cover-wrap" data-occupy="occupy">
          <mg-image :src="topMusicInfo.cover" alt="" class="cover-img" />
          <mg-image :src="topMusicInfo.coverMask" alt="" class="cover-img-mask" />
        </div>
        <div class="top-content-header-info">
          <span class="top-name" data-occupy="occupy">{{ checkedTopType.typeName }}</span>
          <div class="info-button-wrap" data-occupy="occupy">
            <div class="info-button fill-button" @click.stop="playAll"><i class="iconfont-play"></i>全部播放</div>
            <div class="info-button"><i class="iconfont-download"></i>全部下载</div>
          </div>
        </div>
      </div>
      <div class="top-list">
        <SongList :musicList="topMusicInfo.items" :hideList="['album']"></SongList>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useApi from '@/plugins/api';
import TOP_DATA from '@/layout/sidebar/top';
import SongList from '@/views/songList.vue';
import usePlayerFn from '@/plugins/player';

export default defineComponent({
  components: {
    SongList
  },

  setup() {
    const { getListByTopTypeApi } = useApi();
    const { playAllList } = usePlayerFn();
    let occupy = ref<Boolean>(true);
    let topTypes = ref<any>(TOP_DATA);
    let checkedTopType = ref<any>(topTypes.value[0]['types'][0]);
    let topMusicInfo = ref<any>({});

    const getListByTopType = async (type: string) => {
      occupy.value = true;
      const topListRes: any = await getListByTopTypeApi({ type: type });
      occupy.value = false;
      topMusicInfo.value = topListRes.data;
    };

    // 选择排行榜类型
    const checkTopType = (topType: { typeName: string; typeCode: string }) => {
      checkedTopType.value = topType;
      getListByTopType(topType['typeCode']);
    };

    const playAll = () => {
      playAllList(topMusicInfo.value.items)
    }

    getListByTopType(checkedTopType.value['typeCode']);

    return {
      occupy,
      topTypes,
      checkedTopType,
      topMusicInfo,
      playAll,
      checkTopType
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.top-container {
  height: 488px;
  overflow-x: hidden;
  display: flex;
  flex-flow: row nowrap;

  .top-sidebar-wrap {
    flex-shrink: 0;
    width: 150px;
    overflow-x: hidden;
    border-right: 1px solid $border-color;

    .top-item {
      padding: 5px;
      font-size: 14px;
      color: $font-color;
    }

    .top-title {
      padding: 5px;
    }

    .types-item {
      color: $font-second-color;
      padding: 10px;
      font-size: 13px;
      cursor: pointer;

      &:hover,
      &.active {
        color: $primary-color;
      }
    }
  }

  .top-content {
    height: 488px;
    overflow-x: hidden;
  }

  .top-content-header {
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
    padding: 10px;

    .cover-wrap {
      width: 120px;
      height: 120px;
      position: relative;
      overflow: hidden;
      border-radius: 7px;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .top-content-header-info {
      padding: 3px 20px;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: flex-start;

      .top-name {
        display: inline-block;
        font-size: 33px;
        font-weight: 600;
        color: $font-color;
      }

      .info-button-wrap {
        display: flex;
        flex-flow: row nowrap;

        .info-button {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          padding: 5px 15px;
          margin: 2px 20px 0 0;
          border: 1px solid $font-second-color;
          font-size: 13px;
          font-weight: 600;
          color: $font-second-color;
          border-radius: 40px;
          cursor: pointer;

          i {
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            font-size: 20px;
          }

          &.fill-button {
            border: 1px solid $primary-color;
            color: $body-bg;
            background-color: $primary-color;
          }
        }
      }
    }
  }
}
</style>
