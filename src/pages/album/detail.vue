<template>
  <div class="detail-container">
    <div class="detail-content-header" v-occupy="occupy">
      <div class="cover-wrap" data-occupy="occupy">
        <mg-image :src="albumDetail.cover" alt="" class="cover-img" />
      </div>
      <div class="detail-content-header-info">
        <span class="name" data-occupy="occupy">{{ albumDetail.albumName }}</span>
        <div class="singer-wrap">
          <div
            class="singer"
            v-for="(singer, index) in albumDetail.singers"
            :key="singer.id"
            @click.stop="viewSingerDetail(singer.id)"
          >
            <span class="line" v-show="index !== 0">/</span>
            <span>{{ singer.name }}</span>
          </div>
        </div>
        <div class="info-button-wrap" data-occupy="occupy">
          <div class="info-button fill-button"><i class="iconfont-play"></i>播放全部</div>
          <div class="info-button"><i class="iconfont-download"></i>全部下载</div>
        </div>
        <span class="intro" data-occupy="occupy">{{ albumDetail.intro }}</span>
      </div>
    </div>
    <div class="detail-songlist">
      <IntroSonglist :songList="albumDetail.songList" :intro="albumDetail.intro"></IntroSonglist>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useApi from '@/methods/api';
import IntroSonglist from '@/views/intro_songlist.vue';

export default defineComponent({
  components: {
    IntroSonglist
  },

  setup() {
    const { getAlbumDetailApi } = useApi();
    const $router = useRouter();
    const $route = useRoute();
    let occupy = ref<Boolean>(true);
    let albumDetail = ref<any>({});

    const getAlbumDetail = async (id: String) => {
      occupy.value = true;
      const albumDetailRes: any = await getAlbumDetailApi({
        id: id as string
      });
      occupy.value = false;
      albumDetail.value = albumDetailRes.data;
    };

    getAlbumDetail($route.query.id as string);

    const viewSingerDetail = (id: string) => {
      $router.push({
        path: `/singer`,
        query: {
          id
        }
      });
    };

    return {
      occupy,
      albumDetail,
      viewSingerDetail
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.detail-container {
  height: 528px;
  overflow-x: hidden;

  .detail-content-header {
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
    padding: 10px;

    .cover-wrap {
      width: 150px;
      height: 150px;
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

    .detail-content-header-info {
      padding: 3px 20px;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: flex-start;

      .name {
        display: inline-block;
        font-size: 23px;
        font-weight: 600;
        color: $font-color;
        min-width: 200px;
        min-height: 25px;
      }

      .intro {
        font-size: 12px;
        color: $font-second-color;
        min-width: 250px;
        min-height: 15px;
        line-height: 1.4em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .singer-wrap {
        display: flex;
        flex-flow: row nowrap;

        .singer {
          font-size: 12px;
          border-radius: 20px;

          span {
            color: rgba($primary-color, 0.7);
            cursor: pointer;

            &:hover {
              color: $primary-color;
            }
          }

          .line {
            margin: 0 2px;
            color: $font-second-color;
          }
        }
      }

      .info-button-wrap {
        display: flex;
        flex-flow: row nowrap;

        .info-button {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          padding: 4px 13px;
          margin: 0 20px 0 0;
          border: 1px solid $font-second-color;
          font-size: 13px;
          font-weight: 500;
          color: $font-second-color;
          border-radius: 40px;
          cursor: pointer;
          line-height: 12px;

          i {
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            font-size: 18px;
            line-height: 20px;
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
