<template>
  <div class="song-list-container">
    <table>
      <thead>
        <tr>
          <th v-if="!hideList.includes('index')" width="64px"></th>
          <th v-if="!hideList.includes('cover')" width="30px">封面</th>
          <th v-if="!hideList.includes('name')">歌曲名</th>
          <th v-if="!hideList.includes('singer')">歌手</th>
          <th v-if="!hideList.includes('album')">专辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in musicList" :key="item.id" @dblclick="playCheckMusic(item)">
          <td v-if="!hideList.includes('index')">
            <div class="flex">
              <mg-loading v-show="isPlayingMusic(item)" class="voiceprint" />
              <span v-show="!isPlayingMusic(item)" class="music-index">{{ index + 1 }}</span>
              <a class="music-list-btn iconfont-heart-line" href="javascript:;"></a>
            </div>
          </td>
          <td v-if="!hideList.includes('cover')">
            <div class="cover-wrap">
              <mg-image :src="item.cover" alt="" class="cover-img" />
            </div>
          </td>
          <td v-if="!hideList.includes('name')">
            <p class="ellipsis-text" style="max-width: 250px" :title="item.songName">
              {{ item.songName }}
            </p>
          </td>
          <td v-if="!hideList.includes('singer')">
            <p class="ellipsis-text" style="max-width: 100px" :title="getSingersName(item.singers)">
              <span
                class="singer"
                v-for="(singer, index) in item.singers"
                :key="singer.id"
                @click.stop="viewSingerDetail(singer.id)"
                ><span v-show="index !== 0">/</span>{{ singer.name }}</span
              >
            </p>
          </td>
          <td v-if="!hideList.includes('album')">
            <p class="ellipsis-text album-name" style="max-width: 170px" :title="getAlbumName(item.album)" @click.stop="viewAlbumDetail(item.album.id)">
              {{ getAlbumName(item.album) }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import usePlayerFn from '@/methods/player.ts';
import { SONG_LIST_ITEMS_PLACEHOLDR } from './placeholder_data';

export default defineComponent({
  props: {
    musicList: {
      type: Array,
      default: () => SONG_LIST_ITEMS_PLACEHOLDR
    },
    hideList: {
      type: Array,
      default: () => [] // ['index', 'cover', 'name', 'singer', 'album']
    }
  },

  setup(props) {
    const { getSingersName, getAlbumName, playCheckMusic } = usePlayerFn();
    const $router = useRouter();
    const $store = useStore();
    const playing = computed(() => $store.state.playing);

    const isPlayingMusic = (item: any) => {
      return playing.value.id === item.id && playing.value.platform === item.platform;
    };

    const viewSingerDetail = (id: string) => {
      $router.push({
        path: `/singer`,
        query: {
          id
        }
      });
    };

    const viewAlbumDetail = (id: string) => {
      $router.push({
        path: `/albumDetail`,
        query: {
          id
        }
      });
    };

    return {
      playing,
      getSingersName,
      getAlbumName,
      playCheckMusic,
      isPlayingMusic,
      viewSingerDetail,
      viewAlbumDetail
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.song-list-container {
  overflow-x: hidden;

  table {
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
    word-wrap: break-word;

    tbody tr {
      cursor: default;

      &:nth-child(even) {
        background: rgba($font-second-color, 0.1);
      }

      &:hover {
        background: rgba($font-second-color, 0.2);
      }
    }

    th,
    td {
      position: relative;
      padding: 9px;
      font-size: 12px;
      text-align: left;
      color: $font-second-color;
      vertical-align: middle;
    }
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    padding-left: 30px;
  }

  .music-index {
    position: absolute;
    top: 50%;
    left: -1px;
    transform: translateY(-50%);
    display: inline-block;
    width: 20px;
    text-align: left;
    margin-left: 15px;
  }

  .cover-wrap {
    width: 25px;

    img {
      width: 100%;
      border-radius: 30px;
    }
  }

  .voiceprint {
    position: absolute;
    top: 50%;
    left: -2px;
    transform: translateY(-50%) scale(0.4);
  }

  .singer {
    cursor: pointer;

    span {
      display: inline-block;
      margin: 0 2px;
      color: $font-second-color;
      font-size: 12px;
      transform: scale(0.8);
    }

    &:hover {
      color: $primary-color;

      span {
        color: $font-second-color;
      }
    }
  }

  .album-name {
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }
  }

  .music-list-btn {
    text-decoration: none;
    color: $font-second-color;
    font-size: 22px;
    position: relative;
  }
}
</style>
