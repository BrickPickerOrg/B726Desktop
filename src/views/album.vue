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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { PLAYLIST_ITEMS_PLACEHOLDR } from './placeholder_data';

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
      viewAlbumDetail
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme/conf.scss';

.album-item-wrap {
  position: relative;
  padding-left: 20px;
  width: 115px;
  height: 155px;
  border: 1px solid #fff;
  background-image: url('https://cdnmusic.migu.cn/v3/static/img/index/album-cover-gold.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  margin-bottom: 20px;

  .cover-img-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 115px;
    height: 115px;
    border-radius: 3px;
    overflow: hidden;

    img {
      display: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
