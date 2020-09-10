<!-- @format -->

<template>
  <div class="result-container" v-m-loading="true">
    <table>
      <thead>
        <tr>
          <th width="64px"></th>
          <th width="293px">音乐标题</th>
          <th width="84px">歌手</th>
          <th width="194px">专辑</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in musicList" :key="item.id" @dblclick="playCheckMusic(item)">
          <td>
            <div class="flex">
              <Loading v-show="isPlayingMusic(item)" class="voiceprint"></Loading>
              <span v-show="!isPlayingMusic(item)" class="music-index">{{ index + 1 }}</span>
              <a class="music-list-btn iconfont-heart" href="javascript:;"></a>
            </div>
          </td>
          <td>
            <p class="ellipsis-text">{{ item.name }}</p>
          </td>
          <td>
            <p class="ellipsis-text">{{ getSingersName(item.singers) }}</p>
          </td>
          <td>
            <p class="ellipsis-text">{{ item.albumName }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginator :totalPage="totalPage" @changePage="changePage"></Paginator>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { service } from '@/plugins/request';
import useRequests from '@/methods/requests.ts';
import Paginator from '@/components/paginator.vue';
import Loading from '@/components/loading.vue';

interface Singer {
  id: string;
  name: string;
}

export default defineComponent({
  components: {
    Paginator,
    Loading
  },
  setup() {
    const { queryMiGuMusicByKeyword, getLyric } = useRequests();
    const $store = useStore();
    const $route = useRoute();
    const playing = computed(() => $store.state.playing);
    const keyword = computed(() => $route.query.keyword || '');
    let musicList = ref<any>({});
    let totalPage = ref<number>(1);

    const queryMiGuMusic = async (
      params = {
        page: 1
      }
    ) => {
      const { page } = params;
      const queryResult: any = await queryMiGuMusicByKeyword(<string>keyword.value, page);
      musicList.value = queryResult.data;
      totalPage.value = Math.ceil(queryResult.totalCount / 10);
    };

    queryMiGuMusic({
      page: 1
    });

    const getSingersName = (singers: Array<Singer>) => {
      return singers.map(singer => singer['name']).join('/');
    };

    const playCheckMusic = async (song: any) => {
      if (song.platform === 'migu') {
        const songInfo = {
          platform: 'migu',
          name: song.name,
          id: song.id,
          cid: song.lyricId,
          url: song.url,
          singers: song.singers,
          album: {
            id: song.albumId,
            name: song.albumName,
            picUrl: song.picUrl
          }
        };
        $store.dispatch('playing/formatPlaying', songInfo);

        try {
          const lyricResult = await service.get(song.lyricUrl);
          $store.dispatch('playing/setLyric', lyricResult.data);
        } catch (error) {
          throw error;
        }
      }
    };

    const changePage = (page: number) => {
      queryMiGuMusic({
        page
      });
    };

    const isPlayingMusic = (item: any) => {
      return playing.value.id === item.id && playing.value.platform === item.platform;
    };

    watch(keyword, newKeyword => {
      queryMiGuMusic();
    });

    return {
      playing,
      keyword,
      totalPage,
      musicList,
      getSingersName,
      playCheckMusic,
      changePage,
      isPlayingMusic
    };
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/theme/conf.scss';

.result-container {
  table {
    width: 699px;
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
    top: 9px;
    left: -1px;
    display: inline-block;
    width: 20px;
    text-align: left;
    margin-left: 15px;
  }

  .voiceprint {
    position: absolute;
    top: -5px;
    left: -2px;
    transform: scale(0.4);
  }

  p.ellipsis-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .music-list-btn {
    text-decoration: none;
    color: $font-second-color;
    font-size: 15px;
    position: relative;
  }
}
</style>
