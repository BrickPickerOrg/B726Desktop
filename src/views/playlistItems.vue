<template>
  <div class="playlist-items-content" v-occupy="ownOccupy">
    <div class="playlist-item" v-for="playlist in items" :key="playlist.id">
      <div class="cover-img-wrap" @click.stop="viewPlaylistDetail(playlist)" data-occupy="occupy">
        <bknds-image :src="playlist.cover" :alt="playlist.name" class="cover-img" />
        <div class="cover-icon"><i class="iconfont-play"></i></div>
        <span class="playcount"><i class="iconfont-headset"></i> {{ playlist.playcount }}</span>
      </div>
      <div class="playlist-name" data-occupy="occupy" @click.stop="viewPlaylistDetail(playlist)">
        {{ playlist.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { PLAYLIST_ITEMS_PLACEHOLDR } from './placeholderData';

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => PLAYLIST_ITEMS_PLACEHOLDR
    },
    occupy: {
      type: Boolean,
      default: true
    },
  },

  setup(props) {
    const ownOccupy = computed(() => props.occupy);
    const $router = useRouter();
    const viewPlaylistDetail = (playlist: { id: string }) => {
      $router.push({
        path: `/playlistDetail`,
        query: {
          id: playlist.id
        }
      });
    };

    return {
      ownOccupy,
      viewPlaylistDetail,
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme/conf.scss';
.playlist-items-content {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 40px;

  .playlist-item {
    margin-top: 20px;
    width: 145px;
    box-sizing: border-box;
    margin: 10px;

    .cover-img-wrap {
      width: 145px;
      height: 145px;
      position: relative;
      top: 0;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 10px;
      transition: all 350ms;

      img.cover-img {
        width: 100%;
        height: 100%;
        transition: all 350ms;
      }

      .cover-icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($font-second-color, 0.3);
        opacity: 0;
        transition: all 350ms;

        i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 50px;
          color: $body-bg;
        }
      }

      .playcount {
        padding: 3px 5px;
        position: absolute;
        bottom: 10px;
        right: 5px;
        background-color: rgba($font-color, 0.7);
        color: $body-bg;
        border-radius: 20px;
        font-size: 12px;
        transition: all 350ms;
        opacity: 1;

        i {
          font-size: 14px;
          color: $body-bg;
        }
      }

      &:hover {
        top: -5px;

        img.cover-img {
          width: 100%;
          height: 100%;
          transform: scale(1.5);
          transform-origin: (0, 0);
        }

        .cover-icon {
          opacity: 1;
        }

        .playcount {
          opacity: 0;
        }
      }
    }

    .playlist-name {
      font-size: 12px;
      display: -webkit-box;
      overflow: hidden;
      line-height: 1.3em;
      font-weight: 500;
      color: $font-color;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
