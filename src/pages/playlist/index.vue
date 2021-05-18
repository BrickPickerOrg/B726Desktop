<template>
  <div class="playlist-items-container">
    <div class="playlist-items-header">
      <div class="playlist-items-header-top">
        <div
          class="playlist-type"
          :class="tagId === type.id ? 'checked' : ''"
          v-for="type in playlistTypes"
          @click.stop="changeTag(type.id)"
          :key="type.id"
        >
          {{ type.name }}
        </div>
      </div>
      <div class="playlist-items-header-bottom">
        <div class="title">精选歌单</div>
        <div class="sort-wrap">
          <div
            class="link-btn"
            :class="sort === 'latest' ? 'active' : ''"
            @click.stop="changeSort('latest')"
          >
            最新
          </div>
          <div
            class="link-btn"
            :class="sort === 'recommend' ? 'active' : ''"
            @click.stop="changeSort('recommend')"
          >
            精选
          </div>
        </div>
      </div>
    </div>
    <PlaylistItems :items="playlistItems" :occupy="occupy"></PlaylistItems>
    <Paginator :page="page" :totalPage="totalPage" @changePage="changePage"></Paginator>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LIST_ITEMS_PLACEHOLDR, PLAYLIST_TYPES } from './playlist';
import useApi from '@/plugins/api';
import Paginator from '@/layout/paginator.vue';
import PlaylistItems from '@/views/playlistItems.vue';

export default defineComponent({
  components: {
    Paginator,
    PlaylistItems
  },

  setup() {
    const { getPlaylistItemsApi } = useApi();
    const $router = useRouter();
    const $route = useRoute();

    let occupy = ref<boolean>(true);
    let playlistItems = ref<any>(LIST_ITEMS_PLACEHOLDR);
    let playlistTypes = ref<any>(PLAYLIST_TYPES);
    let sort = ref<any>($route.query.sort || 'latest');
    let page = ref<any>($route.query.page || 1);
    let tagId = ref<any>($route.query.tagId || '');
    let totalPage = ref<number>(120);

    const getListByTopType = async ({ sort = 'latest', page = 1, tagId = '' }) => {
      occupy.value = true;
      const playlistItemsRes: any = await getPlaylistItemsApi({
        sort,
        page,
        tagId
      });
      occupy.value = false;
      playlistItems.value = playlistItemsRes.data.playlist;
    };

    // watch(() => $route.query, () => {
    //   getListByTopType({
    //     sort: sort.value,
    //     page: page.value,
    //     tagId: tagId.value
    //   });
    // });

    getListByTopType({
      sort: sort.value,
      page: page.value,
      tagId: tagId.value
    });

    const viewPlaylistDetail = (playlist: { id: string }) => {
      $router.push({
        path: `/playlistDetail`,
        query: {
          id: playlist.id
        }
      });
    };

    const changePage = (page: number) => {
      playlistItems.value = LIST_ITEMS_PLACEHOLDR;
      getListByTopType({
        sort: sort.value,
        tagId: tagId.value,
        page
      });
    };

    const changeSort = (newSort: string) => {
      sort.value = newSort;
      getListByTopType({
        sort: newSort,
        page: 1
      });
    };

    const changeTag = (newTagId: string) => {
      tagId.value = newTagId;
      getListByTopType({
        page: page.value,
        tagId: newTagId
      });
    };

    return {
      page,
      sort,
      tagId,
      occupy,
      playlistTypes,
      playlistItems,
      viewPlaylistDetail,
      totalPage,
      changePage,
      changeSort,
      changeTag
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.playlist-items-container {
  height: 580px;
  overflow-x: hidden;
  padding: 10px 20px 0 20px;
  box-sizing: border-box;

  .playlist-items-header-top {
    padding-bottom: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    .playlist-type {
      width: 120px;
      height: 20px;
      line-height: 20px;
      padding: 6px;
      margin: 5px 0;
      background-color: $card-color;
      color: $font-second-color;
      text-align: center;
      font-size: 13px;
      border-radius: 3px;
      cursor: pointer;
      transition: all 500ms;

      &:hover,
      &.checked {
        background-color: $primary-color;
        color: $font-color;
      }
    }
  }

  .playlist-items-header-bottom {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 15px 0;

    .title {
      font-size: 20px;
      color: $font-color;
    }

    .sort-wrap {
      width: 80px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .link-btn {
        font-size: 13px;
        color: $font-color;
        cursor: pointer;

        &:hover,
        &.active {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
