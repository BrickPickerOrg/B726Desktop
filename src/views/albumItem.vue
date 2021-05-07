<template>
  <div :class="digital ? 'digital-item-wrap' : 'album-item-wrap'" v-occupy="ownOccupy">
    <!-- <div class="cover-img-wrap" data-occupy="occupy"> -->
    <div class="cover-img-wrap" @click.stop="viewAlbumDetail(ownAlbum.id)">
      <bknds-image :src="ownAlbum.coverUrl" :alt="ownAlbum.albumName" class="cover-img" />
      <div class="digital-tag" v-if="digital">数字专辑</div>
      <span class="update-time">{{ ownAlbum.time }}</span>
    </div>
    <!-- <div class="playlist-name" data-occupy="occupy"> -->
    <div class="playlist-name">
      <bknds-text :text="ownAlbum.albumName" />
    </div>
    <div class="singers-name">
      <bknds-text :text="getSingersName(ownAlbum.singers)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import usePlayerFn from '@/plugins/player';

export default defineComponent({
  props: {
    album: {
      type: Object,
      default: () => {}
    },
    digital: {
      type: Boolean,
      default: false
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

.album-item-wrap,
.digital-item-wrap {
  position: relative;
  width: 165px;
  height: 175px;
  background-image: url('https://cdnmusic.migu.cn/v3/static/img/index/album-cover-gold.png');
  background-size: 135px auto;
  background-repeat: no-repeat;
  background-position: 13px 5px;
  margin-bottom: 20px;
  padding-top: 155px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 200ms;

  .cover-img-wrap {
    position: absolute;
    top: 4px;
    left: 0;
    width: 137px;
    height: 137px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .playlist-name {
    margin-right: 20px;
    color: $font-color;
    font-size: 13px;
    margin-bottom: 5px;
  }

  .singers-name {
    margin-right: 20px;
    color: $font-second-color;
    font-size: 12px;
  }

  .digital-tag {
    position: absolute;
    top: 3px;
    left: 3px;
    background-color: rgba($primary-color, 0.8);
    padding: 4px 5px;
    font-size: 12px;
    border-radius: 6px 0 6px 0;
    color: $body-bg;
  }

  .update-time {
    position: absolute;
    bottom: 2px;
    right: 0;
    background-color: rgba($body-bg, 0.9);
    padding: 4px 6px;
    font-size: 12px;
    border-radius: 16px;
    color: $font-color;
    transform: scale(0.8);
  }

  &:hover {
    background-position: 23px 5px;
  }
}

.album-item-wrap {
  background-image: url('https://cdnmusic.migu.cn/v3/static/img/index/album-cover.png');
}
</style>
