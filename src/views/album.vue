<template>
  <div class="album-item-wrap" v-occupy="ownOccupy">
    <!-- <div class="cover-img-wrap" data-occupy="occupy"> -->
    <div class="cover-img-wrap">
      <mg-image :src="ownAlbum.coverUrl" :alt="ownAlbum.albumName" class="cover-img" />
      <div class="digital-tag">数字专辑</div>
      <span class="update-time"><i class="iconfont-headset"></i> {{ ownAlbum.time }}</span>
    </div>
    <!-- <div class="playlist-name" data-occupy="occupy"> -->
    <div class="playlist-name">
      <mg-text :text="ownAlbum.albumName" />
    </div>
    <div class="singers-name">
      <mg-text :text="getSingersName(ownAlbum.singers)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { PLAYLIST_ITEMS_PLACEHOLDR } from './placeholder_data';
import usePlayerFn from '@/methods/player.ts';

export default defineComponent({
  props: {
    album: {
      type: Object,
      default: () => {}
    },
    occupy: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const { getSingersName } = usePlayerFn();
    const ownAlbum = computed(() => props.album);
    const ownOccupy = computed(() => props.occupy);
    const $router = useRouter();

    const viewAlbumDetail = (id: string) => {
      $router.push({
        path: `/albumDetail`,
        query: {
          id
        }
      });
    };

    return {
      ownAlbum,
      ownOccupy,
      getSingersName,
      viewAlbumDetail
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme/conf.scss';

.album-item-wrap {
  position: relative;
  width: 135px;
  height: 155px;
  background-image: url('https://cdnmusic.migu.cn/v3/static/img/index/album-cover-gold.png');
  background-size: 115px auto;
  background-repeat: no-repeat;
  background-position: 13px 5px;
  margin-bottom: 20px;
  padding-top: 135px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 200ms;

  .cover-img-wrap {
    position: absolute;
    top: 4px;
    left: 0;
    width: 117px;
    height: 117px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .playlist-name {
    color: $font-color;
    font-size: 13px;
    margin-bottom: 5px;
  }

  .singers-name {
    color: $font-second-color;
    font-size: 12px;
  }

  &:hover {
    background-position: 23px 5px;
  }
}
</style>
