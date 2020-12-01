<template>
  <div class="result-container">
    <SongList :musicList="musicList.items" :hideList="['cover']"></SongList>
    <Paginator :totalPage="totalPage" v-show="totalPage > 1" @changePage="changePage"></Paginator>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useApi from '@/methods/api.ts';
import SongList from '@/views/song_list.vue';
import Paginator from '@/layout/paginator.vue';

export default defineComponent({
  components: {
    SongList,
    Paginator
  },

  setup() {
    const { queryMiGuMusicByKeywordApi } = useApi();
    const $route = useRoute();
    const keyword = computed(() => $route.query.keyword || '');
    let musicList = ref<any>({});
    let totalPage = ref<number>(1);

    const queryMiGuMusic = async (params = { page: 1 }) => {
      const { page } = params;
      const queryRes: any = await queryMiGuMusicByKeywordApi({
        text: <string>keyword.value,
        page: page
      });
      musicList.value = queryRes.data;
      totalPage.value = Math.ceil(queryRes.data.totalCount / 20);
    };

    queryMiGuMusic({ page: 1 });

    const changePage = (page: number) => {
      queryMiGuMusic({ page });
    };

    watch(keyword, (newKeyword) => {
      queryMiGuMusic();
    });

    return {
      keyword,
      totalPage,
      musicList,
      changePage
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.result-container {
  height: 509px;
  overflow-x: hidden;

  table {
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
    }
  }

  .flex {
    display: flex;
    flex-flow: row nowrap;
    padding-left: 30px;
  }

  .music-index {
    position: absolute;
    top: 12px;
    left: -1px;
    display: inline-block;
    width: 20px;
    text-align: left;
    margin-left: 15px;
  }

  .voiceprint {
    position: absolute;
    top: -2px;
    left: -2px;
    transform: scale(0.4);
  }

  .music-list-btn {
    text-decoration: none;
    color: $font-second-color;
    font-size: 17px;
    position: relative;
  }
}
</style>





