<template>
  <div class="singer-container">
    <div class="singer-content-header" v-occupy="occupy">
      <div class="avatar-wrap" data-occupy="occupy">
        <bknds-image :src="singerDetail.avatar" alt="" class="avatar-img" />
      </div>
      <div class="singer-content-header-info">
        <span class="name" data-occupy="occupy">{{ singerDetail.name }}</span>
        <div class="info-button-wrap" data-occupy="occupy">
          <div class="info-button fill-button" @click.stop="playAll"><i class="iconfont-play"></i>播放全部</div>
          <div class="info-button"><i class="iconfont-download"></i>全部下载</div>
        </div>
        <span class="intro" data-occupy="occupy">{{ singerDetail.intro }}</span>
      </div>
    </div>
    <div class="singer-songlist">
      <IntroSonglist :songList="singerAllSong" :intro="singerDetail.intro"></IntroSonglist>
    </div>
    <Paginator :totalPage="totalPage" @changePage="changePage"></Paginator>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import useApi from '@/plugins/api';
import IntroSonglist from '@/views/introSongList.vue';
import Paginator from '@/layout/paginator.vue';
import usePlayerFn from '@/plugins/player';

export default defineComponent({
  components: {
    IntroSonglist,
    Paginator
  },

  setup() {
    const { getSingerDetailApi, getSingerAllSongApi } = useApi();
    const { playAllList } = usePlayerFn();
    const $route = useRoute();
    let occupy = ref<boolean>(true);
    let singerDetail = ref<any>({});
    let singerAllSong = ref<any>([]);
    let page = ref<number>(1);
    let totalPage = ref<number>(1);

    const getSingerDetail = async (id: string) => {
      occupy.value = true;
      const singerDetailRes: any = await getSingerDetailApi({
        id: id as string
      });
      occupy.value = false;
      singerDetail.value = singerDetailRes.data;
    };

    const playAll = () => {
      playAllList(singerAllSong.value)
    }

    const getSingerAllSong = async (id: string, page: number) => {
      const singerAllSongRes: any = await getSingerAllSongApi({
        id: id as string,
        page: page as number
      });
      singerAllSong.value = singerAllSongRes.data.songlist;
      totalPage.value = singerAllSongRes.data.total;
    };

    const changePage = (page: number) => {
      getSingerAllSong($route.query.id as string, page)
    };

    getSingerDetail($route.query.id as string);
    getSingerAllSong($route.query.id as string, page.value)

    return {
      occupy,
      singerDetail,
      singerAllSong,
      playAll,
      totalPage,
      changePage
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.singer-container {
  height: 580px;
  overflow-x: hidden;

  .singer-content-header {
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
    padding: 20px 10px;

    .avatar-wrap {
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

    .singer-content-header-info {
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
            color: $background-color;
            background-color: $primary-color;
          }
        }
      }
    }
  }
}
</style>
