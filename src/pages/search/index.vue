<template>
  <div class="result-container">
    <SongList :musicList="musicList.items" :hideList="['cover']"></SongList>
    <Paginator :totalPage="totalPage" v-show="totalPage > 1" @changePage="changePage"></Paginator>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import useApi from '@/plugins/api';
import SongList from '@/views/songList.vue';
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

    const queryMiGuMusic = async (page = 1) => {
      const queryRes: any = await queryMiGuMusicByKeywordApi({
        text: keyword.value as string,
        page: page
      });
      musicList.value = queryRes.data;
      totalPage.value = Math.ceil(queryRes.data.totalCount / 20);
    };

    const changePage = (page: number) => {
      queryMiGuMusic(page);
    };

    watch(keyword, () => {
      queryMiGuMusic();
    });

    queryMiGuMusic();

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
  height: 580px;
  overflow-x: hidden;
}
</style>
